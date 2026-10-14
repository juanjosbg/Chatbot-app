# AI Chatbot App

A real-time AI chat application built with **React, TypeScript and Vite**. Users sign in, create multiple conversations and chat with an LLM. Every message is stored in **Firebase Firestore**, so conversations persist across sessions and can be analyzed later.

**Live demo:** [chatbot-app on Vercel](https://chatbot-app-1-2j4tp9oag-juanjosbgs-projects.vercel.app/)

![Screenshot](./docs/screenshot.png)

---

## Features

- **Multi-provider AI layer.** A single `aiService` routes requests to **OpenAI** or **Hugging Face**, so models can be swapped without touching the UI.
- **Authentication** with Firebase Auth (sign up, login, protected routes).
- **Multiple conversations** with a sidebar to switch, create and resume chats.
- **Persistent history** in Firestore for every user and conversation.
- **Global state** managed with Zustand (separate stores for chats and messages).
- **Responsive UI** with Tailwind CSS and Flowbite, plus toast notifications.

## Tech stack

| Layer | Tools |
|---|---|
| Front-end | React 19, TypeScript, Vite, React Router |
| UI | Tailwind CSS, Flowbite, Headless UI, Heroicons |
| State | Zustand |
| AI | OpenAI API, Hugging Face Inference API |
| Back-end as a service | Firebase Auth, Firestore |

## Architecture

```
src/
├── components/   Chat UI: ChatList, ChatWindow, MessageList, MessageInput, AuthModal
├── hooks/        useAuth, useChat, useChatStore, useMessagesStore
├── services/     aiService (router), openaiService, huggingfaceService
├── config/       Firebase setup
├── pages/        Home, Register
├── routes/       App routes
└── types/        Shared chat types
```

The UI never calls a model directly. Components use the `useChat` hook, which calls `aiService`, which picks the provider. Adding a new model means adding one service file.

## Getting started

```bash
git clone https://github.com/juanjosbg/Chatbot-app.git
cd Chatbot-app
npm install
cp .env.example .env   # add your keys
npm run dev
```

### Environment variables

```
VITE_OPENAI_API_KEY=
VITE_HF_API_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

## Roadmap

- [ ] Streaming responses (token by token)
- [ ] Model selector in the UI
- [ ] Move API calls to a serverless function so keys never reach the browser
- [ ] Markdown and code highlighting in answers

## Author

**Juan José Borrero** · [Portfolio](https://profile-juanjose.vercel.app/) · [GitHub](https://github.com/juanjosbg)
