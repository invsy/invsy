---
outline: deep
---

# Basic Next.js AI Chat

*Want to view the full code? Check out the <a href="https://github.com/invsy/invsy-docs/tree/main/fixtures/basic-nextjs-ai-chat" target="_blank">basic-nextjs-ai-chat</a> repository on GitHub.*

### Create a new Next.js project
Next.js recommends <a href="https://nextjs.org/docs/getting-started/installation" target="_blank">starting a new Next.js</a> app using `create-next-app`, which sets up everything automatically for you. To create a project, run:

```shell
npx create-next-app@latest
```

Accept all the defaults.

### Environment Variables
Create `.env.local` file in the root of your project and add the following variables:

```text
OPENAI_API_KEY=xxxxxx

INVSY_API_KEY=xxxxxx
INVSY_PROJECT_ID=xxxxxx
```

Get your Invsy secret key and project ID from the <a href="https://dash.invsy.com" target="_blank">Invsy dashboard</a>

### Install packages & create the Invsy instance
Install the `invsy`, `ai` and `@ai-sdk/openai` SDKs by running:


:::tabs
== npm
```shell
npm add invsy ai @ai-sdk/openai
```
== pnpm
```shell
pnpm add invsy ai @ai-sdk/openai
```
== yarn
```shell
yarn add invsy ai @ai-sdk/openai
```
== bun
```shell
bun add invsy ai @ai-sdk/openai
```
:::

Then create the Invsy instance in a new file `./src/libs/invsy.ts`:

<<< @/../fixtures/basic-nextjs-ai-chat/src/libs/invsy.ts

### Update the root page
Replace the contents of `./src/page.tsx` with the following code:

<<< @/../fixtures/basic-nextjs-ai-chat/src/app/page.tsx

### Create the `ChatUI` component

<<< @/../fixtures/basic-nextjs-ai-chat/src/components/chat-ui.tsx

### Create the chat page
Create a new file `./src/app/[chat_id]/page.tsx` and add the following code:

<<< @/../fixtures/basic-nextjs-ai-chat/src/app/[chat_id]/page.tsx

### Create the chat API
Create a new file `./src/app/api/chat/[chat_id]/route.ts` and add the following code:

<<< @/../fixtures/basic-nextjs-ai-chat/src/app/api/chat/[chat_id]/route.ts

Run `npm run dev` and navigate to `http://localhost:3000` in your browser. Add a prompt in the input field and click submit. You should see the AI response in the chat window.

Refresh the page and you should see the chat history!

**Congradulations!** You have successfully created a basic AI chat app using Next.js and Invsy. You can now customize the chat UI and add more features to your app.
