# Invsy SDK ⚡💬

Effortlessly manage chat history with the [Vercel AI SDK](https://sdk.vercel.ai/). Visit https://invsy.com to signup.

## Installation

```bash
npm add invsy
```

## Examples
Coming soon!

## Usage
To use the Invsy SDK, you need to create an account on [Invsy](https://dash.invsy.com/). Once you have created an account, you will be able to create a new project and get the API keys.

### Server

```javascript
import { InvsyServer } from 'invsy';

export const invsy = new InvsyServer(
	process.env.INVSY_SECRET_API_KEY,
	process.env.INVSY_PROJECT_ID,
	'USER_ID_HERE'
)
```

### Client

```javascript
import { InvsyClient } from 'invsy';

export const invsy = new InvsyServer(
	'INVSY_PUBLIC_API_KEY',
	'INVSY_PROJECT_ID',
	'USER_ID_HERE'
)
```

### Create a new chat

```javascript
const createChat = async () => {
	try {
		// create a new chat and get the id
		const { id } = await invsy.create({
			title: 'New chat',
			path: '/',
			share_path: '/'
		})
	} catch (error) {
		console.error(error)
	}	
}
```

### Get all chats for user

```javascript
const getChatHistory = async () => {
    try {
        const history = await invsy.list()
    } catch (error) {
        console.error(error)
    }	
}
```

### Get chat by id

```javascript
const getChatById = async (id) => {
    try {
        const chat = await invsy.retrieve(id)
    } catch (error) {
        console.error(error)
    }	
}
```

### Update chat

```javascript
const updateChat = async (id) => {
    try {
        const chat = await invsy.modify(id, {
            some_meta: 'Updated meta'
        })
    } catch (error) {
        console.error(error)
    }	
}
```

### Add message to chat

```javascript
const addMessage = async (id, message) => {
    try {
        const message = await invsy.update(id, message)
    } catch (error) {
        console.error(error)
    }	
}
```

### Delete chat

```javascript
const deleteChat = async (id) => {
    try {
        await invsy.delete(id)
    } catch (error) {
        console.error(error)
    }	
}
```

## Delete all chats

```javascript
const deleteAllChats = async () => {
    try {
        await invsy.deleteAll()
    } catch (error) {
        console.error(error)
    }	
}
```