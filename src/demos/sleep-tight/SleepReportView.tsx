import { Clock } from 'lucide-react';
import { AnomalySection } from './AnomalySection';
import { SLEEP_TIGHT_COLORS } from './colors';
import {
  CHART_END_LABEL,
  CHART_START_LABEL,
  SLEEP_REPORT_STATS,
  SLEEP_STAGE_SEQUENCE,
  type SleepStageType,
} from './mockData';
import { SleepStageChart } from './SleepStageChart';

interface StatRow {
  label: string;
  value: string;
}

function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}분`;
  if (m === 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
}

function stageTotals(stages: typeof SLEEP_STAGE_SEQUENCE) {
  const totals: Record<SleepStageType, number> = { AWAKE: 0, REM: 0, LIGHT: 0, DEEP: 0 };
  for (const stage of stages) totals[stage.stageType] += stage.endMinute - stage.startMinute;
  return totals;
}

const STAGE_SUMMARY_META: { type: SleepStageType; label: string; color: string }[] = [
  { type: 'AWAKE', label: '비수면', color: '#FFFFFF' },
  { type: 'REM', label: '렘수면', color: SLEEP_TIGHT_COLORS.sub2 },
  { type: 'LIGHT', label: '얕은수면', color: SLEEP_TIGHT_COLORS.sub1 },
  { type: 'DEEP', label: '깊은수면', color: SLEEP_TIGHT_COLORS.sub1Vr },
];

export function SleepReportView() {
  const totals = stageTotals(SLEEP_STAGE_SEQUENCE);
  const grandTotal = SLEEP_STAGE_SEQUENCE[SLEEP_STAGE_SEQUENCE.length - 1].endMinute;
  const stats = SLEEP_REPORT_STATS;

  const statRows: StatRow[] = [
    { label: '누워 있던 시간', value: stats.layTime },
    { label: '실제 수면 시간', value: stats.actualSleep },
    { label: '잠드는 데 걸린 시간', value: stats.latency },
    { label: '잠에서 깬 횟수', value: stats.awakenCount },
  ];

  return (
    <div className="flex flex-col gap-5 px-5 pt-6">
      <p className="font-body text-sm text-[rgba(255,255,255,0.87)]">
        {stats.monthDay}에는 총{' '}
        <span className="text-base font-bold text-[#7a6ff0]">{stats.totalSleepLabel}</span> 동안
        잤습니다.
      </p>

      <div className="rounded-lg bg-[#2c2c2e] p-4">
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-body text-xs text-[rgba(255,255,255,0.6)] mb-1">취침 시간</p>
            <p className="font-body text-base font-semibold text-white">{stats.bedTime}</p>
          </div>
          <div>
            <p className="font-body text-xs text-[rgba(255,255,255,0.6)] mb-1">기상 시간</p>
            <p className="font-body text-base font-semibold text-white">{stats.wakeTime}</p>
          </div>
        </div>
        <div className="space-y-2">
          {statRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">{row.label}</span>
              <span className="font-body text-base font-semibold text-[#7a6ff0]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-body text-sm font-bold text-white">수면 단계</h2>
      <SleepStageChart
        stages={SLEEP_STAGE_SEQUENCE}
        startLabel={CHART_START_LABEL}
        endLabel={CHART_END_LABEL}
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-[#dcddeb]" />
          <span className="font-body text-[11px] text-white">수면 단계별 시간</span>
        </div>
        <div className="rounded-lg bg-[#2c2c2e] p-4 grid grid-cols-2 gap-3">
          {STAGE_SUMMARY_META.map(({ type, label, color }) => {
            const minutes = totals[type];
            const percent = Math.round((minutes / grandTotal) * 100);
            return (
              <div key={type} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: color }} />
                  <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">{label}</span>
                </div>
                <span className="font-body text-sm font-bold" style={{ color }}>
                  {percent}%
                </span>
                <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">
                  {formatMinutes(minutes)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <AnomalySection />
    </div>
  );
}
