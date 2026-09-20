"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Home() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-black">我的 AI 聊天助手</h1>

      <div className="w-full max-w-md h-96 overflow-y-auto p-4 border rounded-lg bg-white mb-4 flex flex-col gap-3 shadow-sm">
        {messages.length === 0 ? (
          <span className="text-gray-400 text-center mt-10">开始和 AI 对话吧...</span>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-100 text-black self-start'
              }`}
            >
              <span className="font-bold mr-2">
                {message.role === 'user' ? '我:' : 'AI:'}
              </span>
              {message.parts.map((part, index) =>
                part.type === 'text' ? (
                  <span key={`${message.id}-${index}`}>{part.text}</span>
                ) : null,
              )}
            </div>
          ))
        )}
        {status === 'streaming' && <span className="text-gray-400">AI 正在思考...</span>}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const text = input.trim();

          if (!text || status !== 'ready') {
            return;
          }

          sendMessage({ text });
          setInput('');
        }}
        className="w-full max-w-md flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="输入你的问题..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          disabled={status !== 'ready'}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          发送
        </button>
      </form>
    </main>
  );
}