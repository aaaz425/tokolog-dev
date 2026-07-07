import type { CoachCardData } from './mockData';

interface CoachCardProps {
  data: CoachCardData;
  priority?: boolean;
}

export function CoachCard({ data, priority }: CoachCardProps) {
  return (
    <div className="w-full text-left">
      <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-2">
        <img
          src={data.image}
          alt={data.title}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))' }}
        />
        <p className="absolute left-3 right-3 bottom-3 font-body text-xs text-white leading-snug">
          {data.description}
        </p>
      </div>

      <div className="flex items-center justify-between mb-1">
        <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">{data.title}</span>
        <span className="w-20 h-1.5 rounded-full bg-[#3a3a3c] overflow-hidden">
          <span
            className="block h-full rounded-full bg-[#409cff]"
            style={{ width: `${data.percent}%` }}
          />
        </span>
      </div>
      <p className="font-body text-base font-bold text-white mb-0.5">{data.percent}%</p>
      <p className="font-body text-xs text-[rgba(255,255,255,0.6)]">
        {data.value.toLocaleString()}
        {data.unit} / {data.target.toLocaleString()}
        {data.unit}
      </p>
    </div>
  );
}
