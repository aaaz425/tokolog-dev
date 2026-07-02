'use client';

import { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const INITIAL_TODOS: Todo[] = [
  { id: '1', text: '리액트 프로젝트 셋업', done: true },
  { id: '2', text: 'Tailwind CSS 적용', done: true },
  { id: '3', text: '컴포넌트 작성', done: false },
  { id: '4', text: 'Zustand 스토어 연결', done: false },
];

export function TodoAppDemo() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTodo = (id: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/55 backdrop-blur-xl rounded-lg border border-white/50 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold text-slate-800">오늘의 할 일</h2>
          {todos.length > 0 && (
            <span className="font-body text-xs text-slate-400">
              {doneCount}/{todos.length} 완료
            </span>
          )}
        </div>

        <div className="flex gap-2 mb-5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="새 할 일 추가..."
            className="flex-1 border border-slate-200 rounded-md px-3 py-2 font-body text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-colors"
          />
          <button
            onClick={addTodo}
            className="flex items-center justify-center bg-accent-600 text-white w-9 h-9 rounded-full hover:bg-accent-500 transition-colors flex-shrink-0 cursor-pointer"
            aria-label="추가"
          >
            <Plus size={16} />
          </button>
        </div>

        <ul className="space-y-1.5">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100/60 group"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                  todo.done
                    ? 'bg-accent-600 border-accent-600'
                    : 'border-slate-300 hover:border-accent-500'
                }`}
                aria-label={todo.done ? '완료 취소' : '완료'}
              >
                {todo.done && <Check size={12} strokeWidth={3} className="text-white" />}
              </button>
              <span
                className={`flex-1 font-body text-sm transition-colors ${
                  todo.done ? 'line-through text-slate-400' : 'text-slate-800'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-800 transition-all cursor-pointer"
                aria-label="삭제"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <li className="py-8 text-center font-body text-sm text-slate-400">
              할 일을 추가해보세요.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
