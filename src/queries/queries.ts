import { URLs } from './urls';
import { ChatResponse } from './interfaces';

interface StreamHandlers {
    handleStream: (data: ChatResponse) => void;
    handleComplete: () => void;
}

export const fetchChatStreamResponse = async ({
    handleStream,
    handleComplete,
}: StreamHandlers): Promise<void> => {
    // const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    try {
        const response = await fetch(URLs.CHAT_RESPONSE);

        if (!response.body) {
            throw new Error('Error: No response body found');
        }

        const stream = new ReadableStream({
           async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    throw new Error('Error: No reader found');
                }

                const read = async () => {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            handleComplete();
                            controller.close();
                            break;
                        }
                        // Read the data and parse it as JSON
                        const chunk = decoder.decode(value);
                        const jsonString = chunk.replace('data: ', '').trim();
                        const line = JSON.parse(jsonString);
                        
                        // On stream start, move to next line to start reading
                        if (line.status === 'start') {
                            continue;
                        }

                        // When status is end, close the stream
                        if (line.status === 'end') {
                            handleComplete();
                            controller.close();
                            break;
                        }

                        // TODO: Transform the data per line before streaming to UI
                        handleStream(line);

                        controller.enqueue(value);
                    }
                };

                read().catch(error => {
                    console.error('Stream processing error:', error);
                    controller.error(error);
                });
            }
        });

        // Consume the stream to keep it alive
        const reader = stream.getReader();
        reader.read().then(function processText({ done }) {
            if (done) {
                return;
            }
            reader.read().then(processText);
        });

    } catch (error) {
        console.error(error as string);
    }
};