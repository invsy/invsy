---
outline: deep
---

# Getting started

This guide will instruct you through setting up Invsy in your project.

The Invsy SDK provides a predictable and intuitive interface for interacting with the [Invsy API](https://api.invsy.com/ui). This guide will instruct you through setting up Invsy, creating and storing a chat.


## Installation
Install the SDK with npm, pnpm, yarn..

:::tabs
== npm
```shell
npm add invsy
```
== pnpm
```shell
pnpm add invsy
```
== yarn
```shell
yarn add invsy
```
== bun
```shell
bun add invsy
```
:::


## Create client
To begin, import the [Invsy class](/sdk/create-client). You can create a reusable client by defining a const/function that takes environment variables as input and returns a new instance of the Invsy class. This approach encapsulates the client logic and makes it easy to reuse across your application.

Check out the guides on using [environment variables](/guides/basic-nextjs-ai-chat) for different frameworks.

<<< @/../fixtures/snippets/core.ts#createClient

## Create a chat
To [create a chat](/sdk/create-chat), you can use the `create` method. This method takes optional chat meta as input and returns a promise that resolves to the created chat object.

<<< @/../fixtures/snippets/core.ts#createChat

## Save the chat
To [save the chat](/sdk/save-chat), you can use the `save` method. This method takes a chat object as input and returns a promise that resolves to the stored chat object.

<<< @/../fixtures/snippets/core.ts#saveChat

## Get a chat
To [get a chat](/sdk/get-chat), you can use the `get` method. This method takes a chat ID as input and returns a promise that resolves to the chat object.

<<< @/../fixtures/snippets/core.ts#getChat