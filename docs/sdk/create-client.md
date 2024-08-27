---
outline: deep
---

# Create client

The Invsy client is a JavaScript library that allows you to interact with the Invsy API. This guide will instruct you through setting up Invsy in your project.

<<< @../../fixtures/snippets/core.ts#createClient

### Parameters
- `token`: The API token for authentication. This is required to authenticate your requests to the Invsy API.
- `projectId`: The project ID associated with your Invsy account. This identifies the specific project you are working on.
- `userId`: The user ID of the user making the request. This is used to track and manage user-specific data and actions. Refer the user ID guidelines below.

### User ID Guidelines

To ensure the security and integrity of our system, we have specific guidelines for creating and using user IDs. Please adhere to the following rules when creating or submitting a user ID.

##### Allowed Characters

Your user ID must only contain the following characters:

- **Alphanumeric Characters**:
    - Uppercase letters: `A-Z`
    - Lowercase letters: `a-z`
    - Digits: `0-9`
- **Special Characters**:
    - Hyphen: `-`
    - Underscore: `_`

##### Examples of Valid User IDs

- `john_doe`
- `JaneDoe123`
- `user-001`
- `test_user-42`
- `user_2kl3hBKut2FIkgqZbitG1IYxcF1`

##### Examples of Invalid User IDs

- `john.doe` (contains a period)
- `Jane@Doe` (contains an @ symbol)
- `user#001` (contains a hash symbol)
- `test user` (contains a space)