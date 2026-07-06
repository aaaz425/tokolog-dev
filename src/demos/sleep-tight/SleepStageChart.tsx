import { SLEEP_TIGHT_COLORS } from './colors';
import type { SleepStageSegment, SleepStageType } from './mockData';

interface SleepStageChartProps {
  stages: SleepStageSegment[];
  startLabel: string;
  endLabel: string;
}

const STAGE_LEVEL: Record<SleepStageType, number> = { AWAKE: 3, LIGHT: 2, REM: 1, DEEP: 0 };
const STAGE_COLOR: Record<SleepStageType, string> = {
  AWAKE: '#FFFFFF',
  LIGHT: SLEEP_TIGHT_COLORS.sub1,
  REM: SLEEP_TIGHT_COLORS.sub2,
  DEEP: SLEEP_TIGHT_COLORS.sub1Vr,
};

const CHART_WIDTH = 300;
const CHART_HEIGHT = 80;

export function SleepStageChart({ stages, startLabel, endLabel }: SleepStageChartProps) {
  const totalMinutes = stages[stages.length - 1].endMinute;
  const xFor = (minute: number) => (minute / totalMinutes) * CHART_WIDTH;
  const yFor = (level: number) => ((3 - level) / 3) * CHART_HEIGHT;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        width="100%"
        height={CHART_HEIGHT}
        preserveAspectRatio="none"
      >
        {stages.map((stage, i) => {
          const y = yFor(STAGE_LEVEL[stage.stageType]);
          const x1 = xFor(stage.startMinute);
          const x2 = xFor(stage.endMinute);
          const next = stages[i + 1];
          return (
            <g key={`${stage.stageType}-${stage.startMinute}`}>
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke={STAGE_COLOR[stage.stageType]}
                strokeWidth={2}
              />
              {next && (
                <line
                  x1={x2}
                  y1={y}
                  x2={x2}
                  y2={yFor(STAGE_LEVEL[next.stageType])}
                  stroke={STAGE_COLOR[next.stageType]}
                  strokeWidth={2}
                />
              )}
            </g>
          );
        })}
      </svg>
      <div className="flex justify-between font-body text-[10px] text-[rgba(255,255,255,0.6)] mt-1">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}
