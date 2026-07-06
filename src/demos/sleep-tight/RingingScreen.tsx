import { formatClock, formatDate } from './dateFormat';

interface RingingScreenProps {
  ringDate: Date;
  onDismiss: () => void;
}

export function RingingScreen({ ringDate, onDismiss }: RingingScreenProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#dfdfe5] px-6">
      <p className="font-body text-base text-[#1c1c1e] mb-6">{formatDate(ringDate)}</p>
      <p className="font-body text-[32px] font-semibold text-[#1a4fff] mb-8">
        {formatClock(ringDate)}
      </p>
      <img src="/demos/sleep-tight/wake_up.png" alt="" className="w-40 mb-10" />
      <button
        onClick={onDismiss}
        className="w-full h-[52px] rounded-[6px] bg-[#1a4fff] text-white font-body text-base font-medium cursor-pointer"
      >
        알람 끄기
      </button>
    </div>
  );
}
