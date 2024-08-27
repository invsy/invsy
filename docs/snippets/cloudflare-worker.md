---
outline: deep
---

# Example using Cloudflare cxt.env

```ts
import { Invsy } from 'invsy'

export const invsy = (env: Env, userId: string) => {
    return new Invsy(
        env.INVSY_API_KEY,
        env.INVSY_PROJECT_ID,
        userId
    )
}
```
