export enum ChatResponseStatus {
    START = 'start',
    DATA = 'data', 
    END = 'end'
}

export interface ChatResponse {
    status: ChatResponseStatus;
    data: string | null;
    message: string | null;
}

export interface ChatEntry {
    body: string;
    sender: 'user' | 'bot';
    date: Date;
}