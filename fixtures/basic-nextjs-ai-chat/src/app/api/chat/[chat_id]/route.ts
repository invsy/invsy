import {createOpenAI, openai} from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import { invsy } from "@/libs/invsy";
import { InvsyChatPartial } from "invsy";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request, { params }: { params: { chat_id: string } }) {
    const { messages } = await req.json();

    const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_API_BASE
    })

    const result = await streamText({
        model: openai('gpt-4-turbo'),
        system: 'You are a helpful assistant.',
        messages: convertToCoreMessages(messages),
        // You can determine message role by checking toolCalls, toolResults etc.
        async onFinish({ text, toolCalls, toolResults }) {
            messages.push({
                role: 'assistant',
                content: text
            })

            const payload: InvsyChatPartial = {
                id: params.chat_id,
                messages
            }

            // Update the chat title
            if (messages.length <= 2) {
                payload.meta = {
                    // Get the content of the first message and limit to 100 chars
                    title: messages[0].content.slice(0, 100),
                }
            }

            await invsy.save(payload);

        },
    });

    return result.toDataStreamResponse();
}