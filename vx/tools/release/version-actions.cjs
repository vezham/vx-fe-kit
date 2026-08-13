const { join } = require('node:path')

const { updateJson } = require('@nx/devkit')
const jsRelease = require('@nx/js/src/release/version-actions')

const JsVersionActions = jsRelease.default ?? jsRelease

class VxVersionActions extends JsVersionActions {
  async updateProjectVersion(tree, newVersion) {
    const logMessages = await super.updateProjectVersion(tree, newVersion)
    const vxConfigPath = join(this.projectGraphNode.data.root, 'vx.config.json')

    if (!tree.exists(vxConfigPath)) {
      return logMessages
    }

    updateJson(tree, vxConfigPath, json => ({
      ...json,
      core: {
        ...json.core,
        version: newVersion
      }
    }))

    return [
      ...logMessages,
      `✍️  New version ${newVersion} written to VX config: ${vxConfigPath}`
    ]
  }
}

module.exports = VxVersionActions
module.exports.afterAllProjectsVersioned = jsRelease.afterAllProjectsVersioned
