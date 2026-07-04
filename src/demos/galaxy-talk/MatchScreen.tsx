'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, CirclePause, SkipForward } from 'lucide-react';
import { useMotionSafe } from '@/hooks/useMotionSafe';
import { CARD_HOVER_TRANSITION } from '@/lib/motion';
import { MatchScene } from './MatchScene';
import { WarpScene } from './WarpScene';
import { MATCHED_USER, WAITING_CANDIDATES, type WaitingCandidate } from './mockData';

const WARP_DURATION_MS = 4000;
const ARRIVAL_INTERVAL_MS = 900;
const MATCH_DELAY_AFTER_LAST_MS = 3500;

interface MatchScreenProps {
  onAccept: () => void;
  onCancel: () => void;
}

export function MatchScreen({ onAccept, onCancel }: MatchScreenProps) {
  const [warping, setWarping] = useState(true);
  const [candidates, setCandidates] = useState<WaitingCandidate[]>([]);
  const [matched, setMatched] = useState(false);
  const [cycle, setCycle] = useState(0);
  const motionSafe = useMotionSafe();

  useEffect(() => {
    const warpTimer = setTimeout(() => setWarping(false), WARP_DURATION_MS);
    return () => clearTimeout(warpTimer);
  }, []);

  useEffect(() => {
    if (warping) return;
    setCandidates([]);
    setMatched(false);
    const timers: ReturnType<typeof setTimeout>[] = [];

    WAITING_CANDIDATES.forEach((candidate, index) => {
      timers.push(
        setTimeout(
          () => setCandidates((prev) => [...prev, candidate]),
          ARRIVAL_INTERVAL_MS * (index + 1)
        )
      );
    });

    timers.push(
      setTimeout(
        () => setMatched(true),
        ARRIVAL_INTERVAL_MS * WAITING_CANDIDATES.length + MATCH_DELAY_AFTER_LAST_MS
      )
    );

    return () => timers.forEach(clearTimeout);
  }, [cycle, warping]);

  const handlePass = () => setCycle((c) => c + 1);

  if (warping) {
    return <WarpScene />;
  }

  return (
    <div className="relative w-full h-full">
      <MatchScene candidates={candidates} />

      {!matched && (
        <p className="absolute bottom-8 inset-x-0 text-center font-body text-sm text-white/70">
          비슷한 고민을 가진 상대를 찾고 있어요... ({candidates.length}명 대기 중)
        </p>
      )}

      {matched && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-60 p-4">
          <motion.div
            initial={motionSafe ? { opacity: 0, scale: 0.94 } : undefined}
            animate={{ opacity: 1, scale: 1 }}
            transition={CARD_HOVER_TRANSITION}
            className="bg-white rounded-lg w-full max-w-md shadow-xl border border-slate-200 p-5"
          >
            <h2 className="font-heading text-base font-semibold text-slate-800 mb-3">
              대화 상대를 찾았어요!
            </h2>
            <div className="space-y-1 mb-4">
              <p className="font-body text-sm text-slate-600">
                상대의 고민: {MATCHED_USER.concern}
              </p>
              <p className="font-body text-sm text-slate-600">상대의 성향: {MATCHED_USER.mbti}</p>
              <p className="font-body text-sm text-slate-600">
                상대의 온도: {MATCHED_USER.energy}°C
              </p>
              <p className="font-body text-sm text-slate-600">
                유사도 점수: {MATCHED_USER.similarity}%
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onAccept}
                className="flex-1 flex items-center justify-center gap-1.5 bg-accent-600 text-white font-body text-sm font-medium px-3 py-2 rounded-full hover:bg-accent-500 transition-colors cursor-pointer"
              >
                <CircleCheckBig size={16} />
                매칭 성사
              </button>
              <button
                onClick={handlePass}
                className="flex-1 flex items-center justify-center gap-1.5 border border-slate-300 text-slate-700 font-body text-sm font-medium px-3 py-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <SkipForward size={16} />
                매칭 거절
              </button>
              <button
                onClick={onCancel}
                className="flex-1 flex items-center justify-center gap-1.5 border border-slate-300 text-slate-700 font-body text-sm font-medium px-3 py-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CirclePause size={16} />
                매칭 취소
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
