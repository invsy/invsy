// #region createClient
import { Invsy } from "invsy"

export const invsy = new Invsy({
    token: 'INVSY_API_KEY!',
    projectId: 'INVSY_PROJECT_ID',
    userId: "user1"
})
// #endregion createClient

// #region createChat
const { id } = await invsy.create({
    title: 'My first chat'
})
// #endregion createChat

// #region getChat
const chat = await invsy.get(id)
// #endregion getChat

// #region listChats
const chats = await invsy.list();
// #endregion listChats

// #region saveChat
const messages = [
    {
      role: 'user',
      content: 'Hello!'
    }, {
        role: 'assistant',
        content: 'Hello, welcome to Invsy!'
    }
]
// Update meta title, use the first message as the chat title
const title = chat.messages[0].content.substring(0, 100);

const updatedChat = await invsy.save({
        meta: {
        title
    },
    messages
});
// #endregion saveChat

// #region deleteChat
await invsy.delete('CHAT_ID');
// #endregion deleteChat

// #region deleteAllChats
await invsy.deleteAll();
// #endregion deleteAllChats