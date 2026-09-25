import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { getFirebaseDeployFile } from './firebase.ts'
import type {
  DeployFile,
  GenerateDeployConfigOptions,
  VxAppConfig,
  VxDeployConfig
} from './types.ts'
import { getVercelDeployFile } from './vercel.ts'

export type { GenerateDeployConfigOptions } from './types.ts'

const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(file, 'utf8')) as T

const writeDeployFile = ({ path: file, content }: DeployFile) => {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, content)
}

const findWorkspaceRoot = (projectRoot: string) => {
  let currentDir = path.resolve(projectRoot)

  while (true) {
    if (existsSync(path.join(currentDir, 'nx.json'))) {
      return currentDir
    }

    const parentDir = path.dirname(currentDir)

    if (parentDir === currentDir) {
      return process.cwd()
    }

    currentDir = parentDir
  }
}

const loadJsonConfig = <T>(projectRoot: string, fileName: string) => {
  const configFile = path.resolve(projectRoot, fileName)

  return existsSync(configFile) ? readJson<T>(configFile) : undefined
}

const getDeployFiles = (
  appConfig: VxAppConfig,
  deployConfig: VxDeployConfig,
  projectRoot: string
): DeployFile[] => {
  const workspaceRoot = findWorkspaceRoot(projectRoot)

  return deployConfig.providers.map(provider => {
    if (provider === 'firebase') {
      return getFirebaseDeployFile(
        workspaceRoot,
        projectRoot,
        appConfig,
        deployConfig
      )
    }

    if (provider === 'vercel') {
      return getVercelDeployFile(workspaceRoot, projectRoot, deployConfig)
    }

    throw new Error(`Unsupported deploy provider "${provider}"`)
  })
}

export const generateDeployConfig = (
  options: GenerateDeployConfigOptions = {}
) => {
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd())
  const appConfig = loadJsonConfig<VxAppConfig>(projectRoot, 'vx.app.json')
  const deployConfig = loadJsonConfig<VxDeployConfig>(
    projectRoot,
    'vx.deploy.json'
  )

  if (!appConfig || !deployConfig) {
    return []
  }

  const files = getDeployFiles(appConfig, deployConfig, projectRoot)

  for (const file of files) {
    writeDeployFile(file)
  }

  return files.map(file => file.path)
}
