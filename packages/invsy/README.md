<h1 align="center"> ✨ invsy </h1>
<section align="center" id="shieldio-badges">
<a href="https://www.npmjs.com/package/invsy"><img alt="npm"  src="https://img.shields.io/npm/dw/invsy?style=flat-square"></a>
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/invsy/invsy?style=flat-square">
<img alt="GitHub commit activity (branch)" src="https://img.shields.io/github/commit-activity/w/invsy/invsy/main?style=flat-square">
</section>

Effortlessly manage chat history with the [Vercel AI SDK](https://sdk.vercel.ai/).

## Installation

```bash
npm add invsy
```

## Examples
- Basic chatbot - coming soon!
- [Next.js AI Chatbot with tool calls and React Server Components](https://github.com/invsy/invsy-nextjs-example)

## Usage
To use the Invsy SDK, you need to create an account on [Invsy](https://dash.invsy.com/). Once you have created an account, you will be able to create a new project and get the API keys.

### Server
To be used with your project's secret key. Never expose this key to the client.
```javascript
import { InvsyServer } from 'invsy';

export const invsy = new InvsyServer(
	process.env.INVSY_SECRET_API_KEY,
	process.env.INVSY_PROJECT_ID,
	'USER_ID_HERE'
)
```

### Client
To be used with your project's public key. This key can be exposed to the client as it is whitelisted against a hostname.
```javascript
import { InvsyClient } from 'invsy';

export const invsy = new InvsyServer(
	'INVSY_PUBLIC_API_KEY',
	'INVSY_PROJECT_ID',
	'USER_ID_HERE'
)
```

### Creates a new chat.

```javascript
const { id } = await invsy.new({
    title: 'New chat',
    path: '/',
    share_path: '/'
})
```

### Get chat by id

```javascript
await invsy.get(id)
```

### Lists all chats for the current user and project.

```javascript
await invsy.list()
```

### Get chat by id

```javascript
const chat = await invsy.retrieve(id)
```

### Modifies an existing chat's meta

```javascript
const chat = await invsy.updateMeta(id, {
    some_meta: 'Updated meta'
})
```

### Save chat with messages

```javascript
await invsy.save(chat)
```

### Delete chat by id

```javascript
await invsy.delete(id)
```

## Delete all chats

```javascript
await invsy.deleteAll()
```