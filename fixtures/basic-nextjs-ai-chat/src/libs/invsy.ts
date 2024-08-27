import { Invsy } from "invsy"

// Add your own auth logic
export const userId = "user1"

export const invsy = new Invsy({
    token: process.env.INVSY_API_KEY!,
    projectId: process.env.INVSY_PROJECT_ID!,
    userId
})