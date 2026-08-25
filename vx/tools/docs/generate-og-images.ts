import { generateDocsOgImages, loadVxDocsConfig } from '@vx/config/docs'

async function main() {
  const projectRoot = process.argv[2] ?? process.cwd()
  const { docs, i18n } = loadVxDocsConfig(projectRoot)
  const count = await generateDocsOgImages(projectRoot, docs, i18n)

  console.log(`Generated ${count} OG images for ${projectRoot}`)
}

void main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
