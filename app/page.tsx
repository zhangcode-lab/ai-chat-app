"use client";
import { useState } from "react";
export default function Home() {
  const[input,setInput] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">我的聊天助手</h1>
      <div className="w-full max-w-md p-4 border rounded-lg bg-gray-50 text-gray-500">
        这里将显示聊天记录...
      </div>
      <input
        type="text"
        placeholder="输入消息..."
        className="mt-4 w-full max-w-md p-2 border rounded-lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </main>
  );
}