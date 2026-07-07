'use client';

import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export const GRAY_BUTTON_ENABLED_CLASS = 'bg-white/[0.06] text-[#3a6eff] cursor-pointer';
export const GRAY_BUTTON_DISABLED_CLASS =
  'bg-white/[0.02] text-[rgba(255,255,255,0.3)] cursor-not-allowed';

interface BackBarProps {
  onBack: () => void;
}

export function BackBar({ onBack }: BackBarProps) {
  return (
    <button
      onClick={onBack}
      aria-label="뒤로 가기"
      className="flex h-12 w-12 flex-shrink-0 items-center px-3 cursor-pointer text-white"
    >
      <ChevronLeft size={24} />
    </button>
  );
}

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

export function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-1 px-5 py-2">
      <Icon size={20} className="text-white" />
      <h1 className="font-body text-base font-semibold text-white">{title}</h1>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value?: string;
  danger?: boolean;
  onClick: () => void;
}

export function InfoRow({ label, value, danger, onClick }: InfoRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between px-5 py-2.5 text-left cursor-pointer"
    >
      <span
        className={`font-body text-sm ${danger ? 'text-[#ff453a]' : 'text-[rgba(255,255,255,0.87)]'}`}
      >
        {label}
      </span>
      <span className="flex items-center gap-1">
        {value && <span className="font-body text-sm text-[rgba(255,255,255,0.6)]">{value}</span>}
        <ChevronRight size={16} className="text-[rgba(255,255,255,0.6)]" />
      </span>
    </button>
  );
}

interface CompleteButtonProps {
  enabled: boolean;
  onClick: () => void;
  label?: string;
}

export function CompleteButton({ enabled, onClick, label = '완료' }: CompleteButtonProps) {
  return (
    <button
      disabled={!enabled}
      onClick={onClick}
      className={`h-12 w-full rounded-md font-body text-base font-semibold ${
        enabled ? GRAY_BUTTON_ENABLED_CLASS : GRAY_BUTTON_DISABLED_CLASS
      }`}
    >
      {label}
    </button>
  );
}

interface GrayActionButtonProps {
  onClick: () => void;
  label: string;
  textClassName?: string;
}

export function GrayActionButton({
  onClick,
  label,
  textClassName = 'text-[#3a6eff]',
}: GrayActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-12 w-full rounded-md bg-white/[0.06] font-body text-base font-semibold cursor-pointer ${textClassName}`}
    >
      {label}
    </button>
  );
}

interface TextLinkButtonProps {
  onClick: () => void;
  label: string;
}

export function TextLinkButton({ onClick, label }: TextLinkButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-12 w-full font-body text-base font-semibold text-[rgba(255,255,255,0.6)] cursor-pointer"
    >
      {label}
    </button>
  );
}

interface SolidButtonProps {
  onClick: () => void;
  label: string;
}

export function SolidButton({ onClick, label }: SolidButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-12 w-full rounded-md bg-[#1a4fff] font-body text-base font-semibold text-white cursor-pointer"
    >
      {label}
    </button>
  );
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between px-5 py-2.5">
      <span className="font-body text-sm text-[rgba(255,255,255,0.87)]">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        aria-label={label}
        aria-pressed={checked}
        className="relative h-7 w-[52px] flex-shrink-0 rounded-full cursor-pointer transition-colors"
        style={{ backgroundColor: checked ? '#1A4FFF' : '#48484A' }}
      >
        <span
          className="absolute top-0.5 h-6 w-6 rounded-full bg-white transition-all"
          style={{ left: checked ? 'calc(100% - 26px)' : '2px' }}
        />
      </button>
    </div>
  );
}

interface FlowScreenProps {
  onBack?: () => void;
  children: ReactNode;
}

/** 서브 화면 공통 레이아웃: 상단 뒤로가기 + 스크롤 영역 */
export function FlowScreen({ onBack, children }: FlowScreenProps) {
  return (
    <div className="relative flex h-full flex-col bg-[#1c1c1e]">
      {onBack && <BackBar onBack={onBack} />}
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
