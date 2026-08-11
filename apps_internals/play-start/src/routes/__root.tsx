import { createRootRoute } from '@tanstack/react-router'

import { defineConfig } from '@vx/start/tanstack'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: 'Home | Vezham Play Start'
      },
      {
        name: 'description',
        content: 'single app to manage your Vezham Play Start'
      }
    ]
    // links: [
    //   {
    //     rel: 'stylesheet',
    //     href: appCss
    //   }
    // ]
  }),
  component: defineConfig
})
