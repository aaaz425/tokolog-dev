'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { HomeScene } from './HomeScene';
import { MBTI_TYPES } from './mockData';

const DEFAULT_CONCERN = '새로운 팀 프로젝트가 너무 부담스러워요.';
const DEFAULT_MBTI = 'ISTJ';

const selectClass =
  'w-full border border-slate-200 rounded-md px-3 py-2 font-body text-sm text-slate-800 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20';
const labelClass = 'font-body text-xs font-medium text-slate-600 mb-1 block';

interface MatchStartValues {
  concern: string;
  preferredMbti: string;
}

interface HomeScreenProps {
  onStartMatch: (values: MatchStartValues) => void;
}

export function HomeScreen({ onStartMatch }: HomeScreenProps) {
  const [matchDialogOpen, setMatchDialogOpen] = useState(false);
  const [concern, setConcern] = useState(DEFAULT_CONCERN);
  const [preferredMbti, setPreferredMbti] = useState(DEFAULT_MBTI);

  const handleMatchSubmit = () => {
    if (concern.trim().length < 10) return;
    onStartMatch({ concern: concern.trim(), preferredMbti });
  };

  return (
    <div className="relative w-full h-full">
      <HomeScene
        onOpenMatchingForm={() => setMatchDialogOpen(true)}
        onOpenFeedbackForm={() => toast('피드백 기능은 이 데모에서 제공하지 않아요.')}
        onOpenMyPageNotice={() => toast('마이페이지는 이 데모에서 제공하지 않아요.')}
      />

      {matchDialogOpen && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl border border-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <h2 className="font-heading text-base font-semibold text-slate-800">
                매칭 프로필을 작성해주세요
              </h2>
              <button
                onClick={() => setMatchDialogOpen(false)}
                aria-label="닫기"
                className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="font-body text-sm text-slate-600">
                나의 고민과 원하는 상대방의 MBTI를 입력해주세요.
              </p>
              <div>
                <label className={labelClass} htmlFor="concern">
                  고민을 적어주세요
                </label>
                <textarea
                  id="concern"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  placeholder="고민을 10자 이상 100자 이하로 입력해주세요."
                  maxLength={100}
                  rows={3}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 font-body text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 resize-none transition-colors"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="preferredMbti">
                  어떤 마음을 가진 상대가 필요하신가요?
                </label>
                <select
                  id="preferredMbti"
                  value={preferredMbti}
                  onChange={(e) => setPreferredMbti(e.target.value)}
                  className={selectClass}
                >
                  <option value="">잘 모르겠어요</option>
                  {MBTI_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleMatchSubmit}
                disabled={concern.trim().length < 10}
                className="w-full bg-accent-600 text-white font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                매칭 시작
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
