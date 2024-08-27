import type { CoreMessage } from 'ai';

interface ResponseError {
	code: number;
	message: string;
}

export interface ApiResponse<T> {
	result: T;
	success: boolean;
	errors?: ResponseError[];
	messages?: string[];
}

export interface Chat {
	id: string;
	user_id: string;
	messages: CoreMessage[];
	meta: Record<string, string>;
	created_at?: Date;
}

class Invsy {
	protected readonly token: string;
	protected readonly projectId: string;
	protected readonly userId: string;
	protected readonly baseURL: string = 'https://api.invsy.com';

	/**
	 * Creates an instance of Invsy.
	 * @param token - The API token for authentication.
	 * @param projectId - The project ID.
	 * @param userId - The user ID.
	 */
	constructor(token: string, projectId: string, userId: string) {
		this.token = token;
		this.projectId = projectId;
		this.userId = userId;
	}

	/**
	 * Makes an HTTP request to the specified URL with the given options.
	 * @param url - The URL to request.
	 * @param options - The request options.
	 * @returns The response data.
	 */
	protected async request<T>(url: string, options: RequestInit): Promise<T> {
		const response = await fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${this.token}`,
				'Content-Type': 'application/json',
			},
		});

		const data: ApiResponse<T> = await response.json();

		if (!data.success) {
			const errorMessage = data.errors?.[0]?.message || 'An error occurred';
			throw new Error(errorMessage);
		}

		return data.result;
	}

	/**
	 * Creates a new chat.
	 * @param meta - Metadata for the chat.
	 * @returns The created chat.
	 */
	async create(meta: Record<string, string | number>): Promise<Chat> {
		return this.request<Chat>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats`, {
			method: 'POST',
			body: JSON.stringify(meta),
			cache: 'no-cache'
		});
	}

	/**
	 * Modifies an existing chat's meta.
	 * @param chatId - The ID of the chat to modify.
	 * @param meta - Metadata for the chat.
	 * @returns The modified chat.
	 */
	async updateMeta(chatId: string, meta: Record<string, string | number>): Promise<Chat> {
		return this.request<Chat>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats/${chatId}`, {
			method: 'PATCH',
			body: JSON.stringify(meta),
			cache: 'no-cache'
		});
	}

	/**
	 * Retrieves a chat by its ID.
	 * @param chatId - The ID of the chat to retrieve.
	 * @returns The chat.
	 */
	async get(chatId: string): Promise<Chat> {
		return this.request<Chat>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats/${chatId}`, {
			method: 'GET',
		});
	}

	/**
	 * Lists all chats for the current user and project.
	 * @returns The list of chats.
	 */
	async list(): Promise<Chat[]> {
		return this.request<Chat[]>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats`, {
			method: 'GET',
		});
	}

	/**
	 * Updates a chat with a new message.
	 * @returns The updated chat.
	 * @param chat
	 */

	async save(chat: Chat): Promise<Chat> {
		return this.request<Chat>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats/${chat.id}`, {
			method: 'PUT',
			body: JSON.stringify(chat),
		})
	}

	/**
	 * Deletes a chat by its ID.
	 * @param chatId - The ID of the chat to delete.
	 * @returns A response indicating success or failure.
	 */
	async delete(chatId: string): Promise<void> {
		return this.request<void>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats/${chatId}`, {
			method: 'DELETE',
		});
	}

	/**
	 * Deletes all chats for the current user and project.
	 * @returns A response indicating success or failure.
	 */
	async deleteAll(): Promise<void> {
		return this.request<void>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats`, {
			method: 'DELETE',
		});
	}
}

/**
 * Client-side Invsy API. Never use your secret key in client-side code. Only use your public key.
 */
export class InvsyClient extends Invsy {
	constructor(publicKey: string, projectId: string, userId: string) {
		super(publicKey, projectId, userId);
	}
}

/**
 * Server-side Invsy API. Use your secret key in server-side code.
 */
export class InvsyServer extends Invsy {
	constructor(privateKey: string, projectId: string, userId: string) {
		super(privateKey, projectId, userId);
	}
}