export const MBTI_TYPES = [
  'ENFJ',
  'ENFP',
  'ENTJ',
  'ENTP',
  'ESFJ',
  'ESFP',
  'ESTJ',
  'ESTP',
  'INFJ',
  'INFP',
  'INTJ',
  'INTP',
  'ISFJ',
  'ISFP',
  'ISTJ',
  'ISTP',
] as const;

export const MBTI_TAG_STYLES: Record<string, string> = {
  INTJ: 'bg-purple-200 text-purple-800',
  INTP: 'bg-indigo-200 text-indigo-800',
  ENTJ: 'bg-blue-200 text-blue-800',
  ENTP: 'bg-cyan-200 text-cyan-800',
  INFJ: 'bg-teal-200 text-teal-800',
  INFP: 'bg-emerald-200 text-emerald-800',
  ENFJ: 'bg-green-200 text-green-800',
  ENFP: 'bg-lime-200 text-lime-800',
  ISTJ: 'bg-slate-200 text-slate-800',
  ISFJ: 'bg-zinc-200 text-zinc-800',
  ESTJ: 'bg-gray-200 text-gray-800',
  ESFJ: 'bg-stone-200 text-stone-800',
  ISTP: 'bg-amber-200 text-amber-800',
  ISFP: 'bg-yellow-200 text-yellow-800',
  ESTP: 'bg-orange-200 text-orange-800',
  ESFP: 'bg-red-200 text-red-800',
};

export function getTemperatureStyle(energy: number): string {
  if (energy <= 0) return 'bg-blue-300 text-blue-900';
  if (energy <= 10) return 'bg-blue-200 text-blue-800';
  if (energy <= 20) return 'bg-green-200 text-green-800';
  if (energy <= 25) return 'bg-yellow-200 text-yellow-800';
  if (energy <= 30) return 'bg-orange-300 text-orange-800';
  return 'bg-red-400 text-red-900';
}

export interface WaitingCandidate {
  userId: string;
  concern: string;
  mbti: string;
  minutesAgo: number;
}

export const WAITING_CANDIDATES: WaitingCandidate[] = [
  { userId: 'p1', concern: '취업 준비가 너무 막막해요.', mbti: 'INFP', minutesAgo: 4 },
  { userId: 'p2', concern: '새로운 팀에 적응하기가 힘들어요.', mbti: 'ESTJ', minutesAgo: 2 },
  { userId: 'p3', concern: '자기계발을 꾸준히 못 하겠어요.', mbti: 'ISTJ', minutesAgo: 6 },
  { userId: 'p4', concern: '인간관계에서 자꾸 상처받아요.', mbti: 'ENFP', minutesAgo: 1 },
  { userId: 'p5', concern: '진로를 아직도 못 정했어요.', mbti: 'INTJ', minutesAgo: 5 },
];

export interface MatchedUser {
  concern: string;
  mbti: string;
  energy: number;
  similarity: number;
}

export const MATCHED_USER: MatchedUser = {
  concern: '새로운 도전 앞에서 자꾸 위축돼요.',
  mbti: 'ISTJ',
  energy: 88,
  similarity: 92,
};

export const PARTNER_NAME = '루나리아 여행자';
export const MY_NAME = '솔라리스 여행자';

export interface ChatMessage {
  id: string;
  from: 'me' | 'partner';
  text: string;
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', from: 'partner', text: '안녕하세요! 비슷한 고민이시라고 들었어요.' },
  { id: '2', from: 'me', text: '네 안녕하세요, 반가워요 :)' },
  { id: '3', from: 'partner', text: '저도 새로운 도전 앞에서 늘 위축되곤 해요.' },
];

export const REACTION_EMOJIS = ['❤️', '👍', '🤣', '😥', '😡', '😱'];
