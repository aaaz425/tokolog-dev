'use client';

import { useState } from 'react';
import { MessageCircle, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  BackBar,
  CompleteButton,
  FlowScreen,
  GrayActionButton,
  InfoRow,
  SectionHeader,
  SolidButton,
  TextLinkButton,
} from './MyPageShared';

export interface MyPageProfile {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: 'male' | 'female';
  nationality: string;
}

const NATIONALITY_OPTIONS = ['대한민국', '미국', '일본', '중국', '홍콩', '기타'];

const SELECT_CLASS =
  'h-12 rounded-md border border-[#636366] bg-transparent px-3 font-body text-sm text-white outline-none focus:border-[#dcddeb]';

interface MyPageInfoFlowProps {
  profile: MyPageProfile;
  onUpdateProfile: (patch: Partial<MyPageProfile>) => void;
  onClose: () => void;
}

type InfoStep =
  | 'root'
  | 'name'
  | 'birthdate'
  | 'gender'
  | 'nationality'
  | 'oauth'
  | 'logout'
  | 'withdraw'
  | 'withdraw-confirm';

function notAvailable() {
  toast('이 데모에서 제공하지 않아요.');
}

export function MyPageInfoFlow({ profile, onUpdateProfile, onClose }: MyPageInfoFlowProps) {
  const [step, setStep] = useState<InfoStep>('root');
  const toRoot = () => setStep('root');

  if (step === 'root') {
    return (
      <FlowScreen onBack={onClose}>
        <div className="flex items-center gap-1 px-5 py-2">
          <User size={20} className="text-white" />
          <h1 className="font-body text-base font-semibold text-white">{profile.name} 님의 정보</h1>
        </div>
        <div className="pt-2">
          <InfoRow label="이름" value={profile.name} onClick={() => setStep('name')} />
          <InfoRow
            label="생년월일"
            value={`${profile.birthYear}.${profile.birthMonth}.${profile.birthDay}`}
            onClick={() => setStep('birthdate')}
          />
          <InfoRow
            label="성별"
            value={profile.gender === 'male' ? '남자' : '여자'}
            onClick={() => setStep('gender')}
          />
          <InfoRow
            label="국적"
            value={profile.nationality}
            onClick={() => setStep('nationality')}
          />
          <div className="my-2 h-2 bg-[#48484a]" />
          <InfoRow label="간편 로그인" value="카카오" onClick={() => setStep('oauth')} />
          <InfoRow label="로그아웃" onClick={() => setStep('logout')} />
          <InfoRow label="SLEEP TIGHT 탈퇴하기" danger onClick={() => setStep('withdraw')} />
        </div>
      </FlowScreen>
    );
  }

  if (step === 'name') {
    return (
      <NameStep initialName={profile.name} onBack={toRoot} onUpdateProfile={onUpdateProfile} />
    );
  }

  if (step === 'birthdate') {
    return <BirthdateStep profile={profile} onBack={toRoot} onUpdateProfile={onUpdateProfile} />;
  }

  if (step === 'gender') {
    return <GenderStep profile={profile} onBack={toRoot} onUpdateProfile={onUpdateProfile} />;
  }

  if (step === 'nationality') {
    return <NationalityStep profile={profile} onBack={toRoot} onUpdateProfile={onUpdateProfile} />;
  }

  if (step === 'oauth') {
    return (
      <FlowScreen onBack={toRoot}>
        <SectionHeader icon={User} title="간편로그인" />
        <p className="px-5 py-2 font-body text-xs text-[rgba(255,255,255,0.6)]">
          현재 카카오 계정과 간편 로그인이 연동되어 있습니다.
        </p>
        <div className="mt-7 flex flex-col items-center gap-2.5">
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#fee500]">
            <MessageCircle size={26} className="text-[#3c1e1e]" fill="currentColor" />
            <span className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#409cff] text-[9px] text-white">
              ✓
            </span>
          </span>
          <span className="font-body text-xs text-[rgba(255,255,255,0.87)]">카카오</span>
        </div>
      </FlowScreen>
    );
  }

  if (step === 'logout') {
    return (
      <FlowScreen onBack={toRoot}>
        <p className="pt-8 text-center font-body text-lg font-semibold text-white">
          정말 로그아웃하시겠습니까?
        </p>
        <div className="mt-auto flex flex-col gap-1 px-5 pt-10 pb-6">
          <GrayActionButton
            onClick={() => {
              notAvailable();
              onClose();
            }}
            label="로그아웃"
          />
          <TextLinkButton onClick={toRoot} label="이전으로 돌아가기" />
        </div>
      </FlowScreen>
    );
  }

  if (step === 'withdraw') {
    return (
      <FlowScreen onBack={toRoot}>
        <p className="pt-8 text-center font-body text-lg font-semibold text-white">
          정말 SLEEP TIGHT를
          <br />
          <span className="text-[#ff453a]">탈퇴</span>하시겠습니까?
        </p>
        <div className="mt-auto flex flex-col gap-1 px-5 pt-10 pb-6">
          <GrayActionButton
            onClick={() => setStep('withdraw-confirm')}
            label="SLEEP TIGHT 탈퇴하기"
            textClassName="text-[#ff453a]"
          />
          <TextLinkButton onClick={toRoot} label="이전으로 돌아가기" />
        </div>
      </FlowScreen>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#1c1c1e] px-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span className="text-6xl">🌙</span>
        <p className="font-body text-sm leading-relaxed text-white">
          당신의 밤이 편안하길 바래요
          <br />
          그래도, 가끔은 저희가 생각날지도 몰라요
          <br />
          <br />
          <span className="text-[#3a6eff]">90일</span> 내에 돌아온다면
          <br />
          저희는 다시 만날 수 있어요
        </p>
      </div>
      <div className="flex w-full flex-col gap-1 pb-6">
        <SolidButton onClick={notAvailable} label="다시 회원가입하기" />
        <TextLinkButton onClick={notAvailable} label="앱 종료하기" />
      </div>
    </div>
  );
}

function NameStep({
  initialName,
  onBack,
  onUpdateProfile,
}: {
  initialName: string;
  onBack: () => void;
  onUpdateProfile: (patch: Partial<MyPageProfile>) => void;
}) {
  const [name, setName] = useState(initialName);
  const enabled = name.trim().length > 0 && name !== initialName;

  return (
    <FlowScreen onBack={onBack}>
      <div className="flex h-full flex-col">
        <h1 className="px-5 py-2 font-body text-base font-semibold text-white">
          이름을 입력해주세요
        </h1>
        <div className="px-5 pt-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 w-full rounded-md border border-[#636366] bg-transparent px-4 font-body text-sm text-white outline-none focus:border-[#dcddeb]"
          />
        </div>
        <div className="mt-auto px-5 pb-6">
          <CompleteButton
            enabled={enabled}
            onClick={() => {
              onUpdateProfile({ name: name.trim() });
              onBack();
            }}
          />
        </div>
      </div>
    </FlowScreen>
  );
}

function BirthdateStep({
  profile,
  onBack,
  onUpdateProfile,
}: {
  profile: MyPageProfile;
  onBack: () => void;
  onUpdateProfile: (patch: Partial<MyPageProfile>) => void;
}) {
  const [year, setYear] = useState(profile.birthYear);
  const [month, setMonth] = useState(profile.birthMonth);
  const [day, setDay] = useState(profile.birthDay);
  const enabled =
    year !== profile.birthYear || month !== profile.birthMonth || day !== profile.birthDay;

  return (
    <FlowScreen onBack={onBack}>
      <div className="flex h-full flex-col">
        <h1 className="px-5 py-2 font-body text-base font-semibold text-white">
          생년월일을 입력해주세요
        </h1>
        <div className="flex gap-2 px-5 pt-3">
          <select value={year} onChange={(e) => setYear(e.target.value)} className={SELECT_CLASS}>
            <option value={year}>{year}</option>
            {Array.from({ length: 80 }, (_, i) => String(2010 - i)).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={SELECT_CLASS}>
            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select value={day} onChange={(e) => setDay(e.target.value)} className={SELECT_CLASS}>
            {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-auto px-5 pb-6">
          <CompleteButton
            enabled={enabled}
            onClick={() => {
              onUpdateProfile({ birthYear: year, birthMonth: month, birthDay: day });
              onBack();
            }}
          />
        </div>
      </div>
    </FlowScreen>
  );
}

function GenderStep({
  profile,
  onBack,
  onUpdateProfile,
}: {
  profile: MyPageProfile;
  onBack: () => void;
  onUpdateProfile: (patch: Partial<MyPageProfile>) => void;
}) {
  const [gender, setGender] = useState(profile.gender);
  const enabled = gender !== profile.gender;

  return (
    <FlowScreen onBack={onBack}>
      <div className="flex h-full flex-col">
        <h1 className="px-5 py-2 font-body text-base font-semibold text-white">
          성별을 선택해주세요.
        </h1>
        <div className="flex gap-5 px-5 pt-3">
          {(['male', 'female'] as const).map((value) => {
            const selected = gender === value;
            return (
              <button
                key={value}
                onClick={() => setGender(value)}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <span
                  className="flex h-3 w-3 items-center justify-center rounded-full border"
                  style={{
                    borderColor: selected ? '#1A4FFF' : '#A6A6A6',
                    backgroundColor: selected ? '#1A4FFF' : 'transparent',
                  }}
                >
                  {selected && <span className="h-[5px] w-[5px] rounded-full bg-white" />}
                </span>
                <span className="font-body text-sm text-white">
                  {value === 'male' ? '남자' : '여자'}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-auto px-5 pb-6">
          <CompleteButton
            enabled={enabled}
            onClick={() => {
              onUpdateProfile({ gender });
              onBack();
            }}
          />
        </div>
      </div>
    </FlowScreen>
  );
}

function NationalityStep({
  profile,
  onBack,
  onUpdateProfile,
}: {
  profile: MyPageProfile;
  onBack: () => void;
  onUpdateProfile: (patch: Partial<MyPageProfile>) => void;
}) {
  const [nationality, setNationality] = useState(profile.nationality);
  const enabled = nationality !== profile.nationality;

  return (
    <FlowScreen onBack={onBack}>
      <div className="flex h-full flex-col">
        <h1 className="px-5 py-2 font-body text-base font-semibold text-white">
          국적을 선택해주세요
        </h1>
        <div className="px-5 pt-3">
          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className={`w-full ${SELECT_CLASS}`}
          >
            {NATIONALITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-auto px-5 pb-6">
          <CompleteButton
            enabled={enabled}
            onClick={() => {
              onUpdateProfile({ nationality });
              onBack();
            }}
          />
        </div>
      </div>
    </FlowScreen>
  );
}
