# Chat Application

This project is a chat application built with React, TypeScript, and Vite for real-time data streaming from Mocked Backend.

## Getting Started

To get started with the project, follow these steps:

1. **Install dependencies**:
   ```sh
   npm install
   ```

2. **Setting Mocked Back-End URL**

    To set the mocked back-end URL, update the `URLs` enum in the `src/queries/urls.ts` file. like following:

    ```typescript
    export enum URLs {
        CHAT_RESPONSE = 'http://localhost:1994/stream'
    }
    ```

3. **Run the Application**:

    ```sh
    npm run dev
    ```

This will start the development server at `http://localhost:5173/`.

## Running Tests

To run the tests for the application, use the following command:

```sh
npm run test
```