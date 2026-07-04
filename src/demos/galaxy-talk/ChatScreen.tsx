'use client';

import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, LogOut, MicOff, Send, SmilePlus, VideoOff } from 'lucide-react';
import { toast } from 'sonner';
import { useMotionSafe } from '@/hooks/useMotionSafe';
import {
  INITIAL_MESSAGES,
  MATCHED_USER,
  MBTI_TAG_STYLES,
  MY_NAME,
  PARTNER_NAME,
  REACTION_EMOJIS,
  getTemperatureStyle,
  type ChatMessage,
} from './mockData';

const MY_CONCERN_FALLBACK = '새로운 팀 프로젝트가 너무 부담스러워요.';
const MY_MBTI_FALLBACK = 'INFP';
const MY_ENERGY = 42;

function MbtiChip({ mbti }: { mbti: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full font-body text-xs font-medium ${
        MBTI_TAG_STYLES[mbti] ?? MBTI_TAG_STYLES.ISTJ
      }`}
    >
      {mbti}
    </span>
  );
}

function TemperatureChip({ energy }: { energy: number }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full font-body text-xs font-medium ${getTemperatureStyle(
        energy
      )}`}
    >
      {energy}°C
    </span>
  );
}

let reactionSeq = 0;

function ReactionButton() {
  const [open, setOpen] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; emoji: string }[]>([]);
  const motionSafe = useMotionSafe();

  const send = (emoji: string) => {
    setOpen(false);
    if (!motionSafe) return;
    reactionSeq += 1;
    const id = reactionSeq;
    setBursts((prev) => [...prev, { id, emoji }]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 900);
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="리액션 보내기"
        className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
      >
        <SmilePlus size={16} className="text-white" />
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 flex flex-col gap-1 bg-white rounded-full p-1.5 shadow-lg z-10">
          {REACTION_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => send(emoji)}
              aria-label={`${emoji} 반응 보내기`}
              className="w-8 h-8 flex items-center justify-center text-base hover:scale-110 transition-transform cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.span
            key={b.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -50, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute bottom-full right-1 text-xl pointer-events-none"
          >
            {b.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface PersonPanelProps {
  name: string;
  concern: string;
  mbti: string;
  energy: number;
  controls?: ReactNode;
}

function PersonPanel({ name, concern, mbti, energy, controls }: PersonPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="aspect-video w-full rounded-lg bg-slate-800 flex items-center justify-center mb-3 flex-shrink-0">
        <span className="font-heading text-sm text-white/40">video</span>
      </div>
      <div className="flex-1 min-h-0 bg-slate-300 w-full rounded-lg p-4 relative flex flex-col overflow-y-auto">
        <div className="absolute -top-14 right-3">
          <ReactionButton />
        </div>
        <h1 className="font-heading text-xl font-bold text-slate-800 mb-3">{name}</h1>
        <div className="mb-4">
          <h2 className="font-body text-sm font-semibold text-slate-700 mb-1">
            나누고 싶은 이야기
          </h2>
          <p className="font-body text-sm text-slate-600 line-clamp-4 mb-2">{concern}</p>
          <div className="flex gap-1.5">
            <MbtiChip mbti={mbti} />
            <TemperatureChip energy={energy} />
          </div>
        </div>
        {controls}
      </div>
    </div>
  );
}

interface ChatScreenProps {
  myConcern: string;
  myMbti: string;
  onLeave: () => void;
}

export function ChatScreen({ myConcern, myMbti, onLeave }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), from: 'me', text: input.trim() }]);
    setInput('');
  };

  return (
    <div className="w-full h-full bg-slate-950 p-4 md:p-8 grid grid-cols-1 md:grid-cols-[minmax(200px,1fr)_minmax(300px,1.5fr)_minmax(200px,1fr)] gap-6">
      <PersonPanel
        name={PARTNER_NAME}
        concern={MATCHED_USER.concern}
        mbti={MATCHED_USER.mbti}
        energy={MATCHED_USER.energy}
      />

      <div className="flex flex-col gap-3 h-full min-h-0 order-first md:order-none">
        <button
          onClick={() => toast('AI 도움 기능은 이 데모에서 제공하지 않아요.')}
          className="rounded-lg bg-white/5 hover:bg-white/10 p-3 flex items-center gap-3 flex-shrink-0 text-left transition-colors cursor-pointer"
        >
          <Bot size={20} className="text-accent-500 flex-shrink-0" />
          <p className="font-body text-xs text-white/70">
            도움이 필요하신가요? AI에게 도움을 요청하세요!
          </p>
        </button>
        <div className="flex-1 min-h-0 overflow-y-auto rounded-md bg-white/5 p-3 space-y-2">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <span
                className={`font-body text-xs px-3 py-1.5 rounded-full max-w-[75%] ${
                  m.from === 'me' ? 'bg-accent-600 text-white' : 'bg-white/10 text-white/85'
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="메시지를 작성해주세요"
            className="flex-1 border border-white/15 bg-white/5 rounded-md px-3 py-2 font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent-500 transition-colors"
          />
          <button
            onClick={send}
            aria-label="전송"
            className="flex items-center justify-center bg-accent-600 text-white w-9 h-9 rounded-full hover:bg-accent-500 transition-colors flex-shrink-0 cursor-pointer"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <PersonPanel
        name={MY_NAME}
        concern={myConcern || MY_CONCERN_FALLBACK}
        mbti={myMbti || MY_MBTI_FALLBACK}
        energy={MY_ENERGY}
        controls={
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => toast('마이크 켜기는 이 데모에서 제공하지 않아요.')}
              aria-label="마이크 켜기"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-400/50 text-slate-700 transition-colors cursor-pointer"
            >
              <MicOff size={16} />
            </button>
            <button
              onClick={() => toast('비디오 켜기는 이 데모에서 제공하지 않아요.')}
              aria-label="비디오 켜기"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-400/50 text-slate-700 transition-colors cursor-pointer"
            >
              <VideoOff size={16} />
            </button>
            <button
              onClick={onLeave}
              className="flex items-center justify-center gap-1.5 bg-slate-700 text-white font-body text-xs font-medium px-3 py-2 rounded-full hover:bg-slate-600 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              나가기
            </button>
          </div>
        }
      />
    </div>
  );
}
