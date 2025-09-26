import { execSync } from 'child_process'
import { releaseChangelog, releasePublish, releaseVersion } from 'nx/release'
import * as yargs from 'yargs'

const NS = '[vezham] TOOLS/release'

;(async () => {
  const options = await yargs
    .version(false) // don't use the default meaning of version in yargs
    .option('version', {
      description:
        'Explicit version specifier to use, if overriding conventional commits',
      type: 'string',
      default: ''
    })
    .option('dryRun', {
      alias: 'd',
      description:
        'Whether or not to perform a dry-run of the release process, defaults to true',
      type: 'boolean',
      default: false
    })
    .option('verbose', {
      description:
        'Whether or not to enable verbose logging, defaults to false',
      type: 'boolean',
      default: false
    })
    .option('firstRelease', {
      alias: 'fr',
      description: 'firstRelease',
      type: 'boolean',
      default: false
    })
    .parseAsync()
  console.log(NS, '[data] options: ', JSON.stringify(options))

  console.log(NS, 'init releaseVersion')
  let op_version = ''
  // Get current branch
  const currentBranch = execSync('git branch --show-current').toString().trim()
  if (currentBranch !== 'timeline') {
    op_version = `-${currentBranch}`
  }

  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    // specifier: `0.0.0-${op_version}-canary`,
    specifier: options.version,
    dryRun: options.dryRun,
    verbose: options.verbose,
    firstRelease: options.firstRelease
  })
  // console.log(NS, '[data] projectsVersionData: ', JSON.stringify(projectsVersionData))

  console.log(NS, 'init releaseChangelog')
  await releaseChangelog({
    versionData: projectsVersionData,
    version: workspaceVersion,
    dryRun: options.dryRun,
    verbose: options.verbose,
    firstRelease: options.firstRelease
  })

  // The returned number value from releasePublish will be zero if all projects are published successfully, non-zero if not
  console.log(NS, 'init releasePublish')
  const publishResult = await releasePublish({
    access: 'public',
    dryRun: options.dryRun,
    verbose: options.verbose,
    firstRelease: options.firstRelease
  })
  // console.log(NS, '[data] publishResult: ', JSON.stringify(publishResult))

  process.exit(
    Object.values(publishResult).every(result => result.code === 0) ? 0 : 1
  )
  // process.exit(0)
})()
