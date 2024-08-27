---
outline: deep
---

# Example using Next.js .env and Clerk

```ts
import { auth } from '@clerk/nextjs/server'
import { Invsy } from 'invsy'

const { userId } = auth()

export const invsy = new Invsy(
    process.env.INVSY_API_KEY,
    process.env.INVSY_PROJECT_ID,
    userId
);
```
