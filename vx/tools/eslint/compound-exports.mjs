import path from 'node:path'
import ts from 'typescript'

const unwrap = node => {
  while (
    node &&
    (ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node))
  )
    node = node.expression
  return node
}

const getSlots = (initializer, bindings) => {
  let node = unwrap(initializer)
  if (node && ts.isCallExpression(node)) {
    if (
      bindings.has('Object') ||
      node.expression.getText() !== 'Object.assign' ||
      node.arguments.length !== 2 ||
      !ts.isIdentifier(node.arguments[0])
    )
      return []
    node = unwrap(node.arguments[1])
  }
  if (!node || !ts.isObjectLiteralExpression(node)) return []
  const slots = []
  const names = new Set()
  for (const property of node.properties) {
    if (
      !ts.isPropertyAssignment(property) &&
      !ts.isShorthandPropertyAssignment(property)
    )
      return []
    if (!ts.isIdentifier(property.name)) return []
    if (names.has(property.name.text)) return []
    names.add(property.name.text)
    const value = ts.isShorthandPropertyAssignment(property)
      ? property.name
      : unwrap(property.initializer)
    if (!value || !ts.isIdentifier(value)) return []
    slots.push([property.name.text, value.text])
  }
  return slots
}

// vx-bot/NOTE: Inspect source syntax without importing/evaluating application or dependency code.
export const createCompoundResolver = filename => {
  const config = ts.findConfigFile(path.dirname(filename), ts.sys.fileExists)
  const options = config
    ? ts.getParsedCommandLineOfConfigFile(
        config,
        {},
        {
          ...ts.sys,
          readDirectory: () => [],
          onUnRecoverableConfigFileDiagnostic: () => undefined
        }
      )?.options
    : {}
  const modules = new Map()
  const active = new Set()
  const resolve = (source, importer) => {
    const resolved = ts.resolveModuleName(
      source,
      importer,
      {
        ...options,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        allowJs: true
      },
      ts.sys
    ).resolvedModule?.resolvedFileName
    if (!resolved) return undefined
    if (/\.d\.[cm]?ts$/.test(resolved)) {
      const implementation = resolved.replace(
        /\.d\.(ts|mts|cts)$/,
        (_, ext) => ({ ts: '.js', mts: '.mjs', cts: '.cjs' })[ext]
      )
      return ts.sys.fileExists(implementation) ? implementation : undefined
    }
    return resolved
  }
  const inspect = file => {
    if (!file || active.has(file) || active.size > 12 || modules.size > 512)
      return new Map()
    if (modules.has(file)) return modules.get(file)
    const source = ts.sys.readFile(file)
    if (!source) return new Map()
    const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
    if (tree.parseDiagnostics.length) return new Map()
    active.add(file)
    const bindings = new Map()
    const imports = new Map()
    const initializers = new Map()
    const exports = new Map()
    const stars = new Map()
    const symbol = name => {
      if (!bindings.has(name)) {
        const imported = imports.get(name)
        const value = imported?.source.startsWith('.')
          ? inspect(resolve(imported.source, file)).get(imported.name)
          : undefined
        bindings.set(name, value ?? { id: `${file}#${name}`, slots: [] })
      }
      return bindings.get(name)
    }
    for (const statement of tree.statements) {
      if (ts.isImportDeclaration(statement)) {
        const clause = statement.importClause
        if (!clause || clause.isTypeOnly) continue
        if (clause.name)
          imports.set(clause.name.text, {
            source: statement.moduleSpecifier.text,
            name: 'default'
          })
        const named = clause.namedBindings
        if (named && ts.isNamedImports(named)) {
          for (const item of named.elements)
            if (!item.isTypeOnly)
              imports.set(item.name.text, {
                source: statement.moduleSpecifier.text,
                name: (item.propertyName ?? item.name).text
              })
        } else if (named)
          imports.set(named.name.text, {
            source: statement.moduleSpecifier.text,
            name: '*'
          })
      }
      const exported = statement.modifiers?.some(
        m => m.kind === ts.SyntaxKind.ExportKeyword
      )
      const defaultExport = statement.modifiers?.some(
        m => m.kind === ts.SyntaxKind.DefaultKeyword
      )
      if (ts.isVariableStatement(statement)) {
        for (const decl of statement.declarationList.declarations) {
          if (!ts.isIdentifier(decl.name)) continue
          const value = symbol(decl.name.text)
          value.mutable = !(
            statement.declarationList.flags & ts.NodeFlags.Const
          )
          if (statement.declarationList.flags & ts.NodeFlags.Const)
            initializers.set(decl.name.text, decl.initializer)
          if (exported) exports.set(decl.name.text, value)
        }
      } else if (statement.name && ts.isIdentifier(statement.name)) {
        const value = symbol(statement.name.text)
        if (
          exported &&
          !defaultExport &&
          (ts.isFunctionDeclaration(statement) ||
            ts.isClassDeclaration(statement))
        )
          exports.set(statement.name.text, value)
      }
    }
    for (const [name, initializer] of initializers) {
      symbol(name).slots = getSlots(
        initializer,
        new Set([...bindings.keys(), ...imports.keys()])
      ).map(([slot, local]) => [slot, symbol(local).id])
    }
    for (const statement of tree.statements) {
      if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) continue
      const source = statement.moduleSpecifier?.text
      // vx-bot/NOTE: Follow local barrels only; avoid recursively traversing unrelated dependency graphs.
      const imported = source?.startsWith('.')
        ? inspect(resolve(source, file))
        : new Map()
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const item of statement.exportClause.elements) {
          if (item.isTypeOnly) continue
          const local = (item.propertyName ?? item.name).text
          exports.set(
            item.name.text,
            source ? imported.get(local) : symbol(local)
          )
        }
      } else if (!statement.exportClause) {
        for (const [name, value] of imported) {
          if (name === 'default') continue
          stars.set(
            name,
            stars.has(name) && stars.get(name)?.id !== value?.id
              ? undefined
              : value
          )
        }
      }
    }
    const result = new Map([...stars, ...exports])
    active.delete(file)
    modules.set(file, result)
    return result
  }
  return source => {
    const exported = inspect(resolve(source, filename))
    const replacements = new Map()
    for (const [root, compound] of exported) {
      if (!/^[A-Z]\w*$/.test(root)) continue
      for (const [slot, id] of compound?.slots ?? []) {
        if (!/^[A-Z]\w*$/.test(slot)) continue
        for (const [name, value] of exported) {
          if (
            name !== root &&
            value?.id === id &&
            !value.mutable &&
            !value.slots.length
          )
            replacements.set(name, `${root}.${slot}`)
        }
      }
    }
    return replacements
  }
}
