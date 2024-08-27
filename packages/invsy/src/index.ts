import type { Message } from 'ai';

interface InvsyResponseError {
	code: number;
	message: string;
}

export interface InvsyApiResponse<T> {
	result: T;
	success: boolean;
	errors?: InvsyResponseError[];
	messages?: string[];
}

export interface InvsyChat {
	id: string;
	user_id: string;
	messages: Message[];
	meta?: Record<string, string>;
	created_at?: Date;
}

export interface InvsyChatPartial {
	id: string;
	messages: Message[];
	meta?: Record<string, string>;
}

type InvsyProviderSettings = {
	token: string;
	projectId: string;
	userId: string;
	debug?: boolean;
}

export class Invsy {
	protected readonly token: string;
	protected readonly projectId: string;
	protected readonly userId: string;
	protected readonly baseURL: string = 'https://api.invsy.com';
	protected readonly debug: boolean = false;

	/**
	 * Creates an instance of Invsy.
	 * @param {InvsyProviderSettings} settings - The settings for the Invsy instance.
	 * @throws {Error} If token, projectId, or userId is missing.
	 */
	constructor({ token, projectId, userId, debug }: InvsyProviderSettings) {
		if (!token) throw new Error('Invsy: Missing token');
		if (!projectId) throw new Error('Invsy: Missing projectId');
		if (!userId) throw new Error('Invsy: Missing userId');

		this.token = token;
		this.projectId = projectId;
		this.userId = userId;
		this.debug = debug || false;
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
				'Content-Type': 'application/json'
			},
		});

		if (this.debug) console.log('invsy response', response);

		const data: InvsyApiResponse<T> = await response.json();

		if (this.debug) console.log('invsy data', data);

		if (!data.success) {
			const errorMessage = data.errors?.[0]?.message || 'An error occurred';
			throw new Error(errorMessage);
		}

		return data.result;
	}

	/**
	 * Creates a new chat with optional meta
	 * @param {Record<string, string | number>} [meta] - Metadata for the chat.
	 * @returns {Promise<InvsyChat>} The created chat.
	 * @throws {Error} If the chat creation fails.
	 * @example
	 * const chat = await invsy.create({ name: 'My Chat' });
	 * console.log(chat.id);
	 */
	async create(meta?: Record<string, string | number>): Promise<InvsyChat> {

		const url = `${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats`;

		if (meta) {
			return this.request<InvsyChat>(url, {
				method: 'POST',
				body: JSON.stringify({ meta })
			});
		}

		return this.request<InvsyChat>(url, {
			method: 'POST'
		});
	}

	/**
	 * Retrieve a chat by ID.
	 * @param {string} chatId - The ID of the chat to retrieve.
	 * @returns {Promise<InvsyChat>} The retrieved chat.
	 * @throws {Error} If the chat is not found or the request fails.
	 */
	async get(chatId: string): Promise<InvsyChat> {
		return this.request<InvsyChat>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats/${chatId}`, {
			method: 'GET'
		});
	}

	/**
	 * Lists all chats for the current user and project.
	 * @returns {Promise<InvsyChat[]>} An array of chats.
	 * @throws {Error} If the request fails.
	 */
	async list(): Promise<InvsyChat[]> {
		return this.request<InvsyChat[]>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats`, {
			method: 'GET'
		});
	}

	/**
	 * Updates a chat with a new message or metadata.
	 * @param {InvsyChatPartial} chat - The partial chat object to update.
	 * @returns {Promise<InvsyChat>} The updated chat.
	 * @throws {Error} If the chat update fails.
	 */
	async save(chat: InvsyChatPartial): Promise<InvsyChat> {
		return this.request<InvsyChat>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats/${chat.id}`, {
			method: 'PUT',
			body: JSON.stringify(chat)
		})
	}

	/**
	 * Deletes a chat by its ID.
	 * @param {string} chatId - The ID of the chat to delete.
	 * @returns {Promise<void>}
	 * @throws {Error} If the deletion fails.
	 */
	async delete(chatId: string): Promise<void> {
		return this.request<void>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats/${chatId}`, {
			method: 'DELETE'
		});
	}

	/**
	 * Deletes all chats for the current user and project.
	 * @returns {Promise<void>}
	 * @throws {Error} If the deletion fails.
	 */
	async deleteAll(): Promise<void> {
		return this.request<void>(`${this.baseURL}/projects/${this.projectId}/users/${this.userId}/chats`, {
			method: 'DELETE'
		});
	}
}