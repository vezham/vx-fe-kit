export type ExplorePrompt = {
  id: string
  title: string
  description: string
}

export type ExploreCategory = {
  id: string
  title: string
  subtitle: string
  prompts: ExplorePrompt[]
}

export type RQExplore = Record<string, never>

export type ExploreResponse = ExploreCategory[]
