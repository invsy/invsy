import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Invsy",
  description: "Store, retrieve and optimize your AI conversations",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'SDK', link: '/sdk/create-client' },
      { text: 'Guides', link: '/guides/basic-nextjs-ai-chat' },
      { text: 'Pricing', link: '/pricing' },
      { text: 'Sign in ⚡', link: 'https://dash.invsy.com', target: '_blank' }
    ],

    sidebar: [
      {
        text: 'Getting started',
        link: '/getting-started'
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Basic Next.js AI Chat',
            link: '/guides/basic-nextjs-ai-chat'
          }
        ]
      },
      {
        text: 'SDK',
        items: [
          { text: 'Create client', link: '/sdk/create-client' },
          { text: 'Create chat', link: '/sdk/create-chat' },
          { text: 'Save chat', link: '/sdk/save-chat' },
          { text: 'Get chat', link: '/sdk/get-chat' },
          { text: 'List chats', link: '/sdk/list-chats' },
          { text: 'Delete chat', link: '/sdk/delete-chat' },
          { text: 'Delete all chats', link: '/sdk/delete-all-chats' },
        ]
      },
      {
        text: "Snippets",
        items: [
          { text: "Next.js with CLerk", link: "/snippets/nextjs-with-clerk" },
          { text: "Cloudflare Worker cxt.env", link: "/snippets/cloudflare-worker" }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/invsy/invsy' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/invsy' }
    ]
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  }
})
