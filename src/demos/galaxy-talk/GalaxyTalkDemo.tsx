'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ChatScreen } from './ChatScreen';
import { HomeScreen } from './HomeScreen';
import { MatchScreen } from './MatchScreen';

type Screen = 'home' | 'match' | 'chat';

export function GalaxyTalkDemo() {
  const [screen, setScreen] = useState<Screen>('home');
  const [myConcern, setMyConcern] = useState('');
  const [myMbti, setMyMbti] = useState('');

  useEffect(() => {
    toast('UI만 재현한 목업 데모에요. 일부 기능은 작동하지 않아요.');
  }, []);

  if (screen === 'match') {
    return <MatchScreen onAccept={() => setScreen('chat')} onCancel={() => setScreen('home')} />;
  }

  if (screen === 'chat') {
    return <ChatScreen myConcern={myConcern} myMbti={myMbti} onLeave={() => setScreen('home')} />;
  }

  return (
    <HomeScreen
      onStartMatch={({ concern, preferredMbti }) => {
        setMyConcern(concern);
        setMyMbti(preferredMbti);
        setScreen('match');
      }}
    />
  );
}
