export interface WeekDay {
  day: string;
  date: number;
  hasReport: boolean;
}

export const WEEK_DAYS: WeekDay[] = [
  { day: '월', date: 18, hasReport: true },
  { day: '화', date: 19, hasReport: true },
  { day: '수', date: 20, hasReport: true },
  { day: '목', date: 21, hasReport: false },
  { day: '금', date: 22, hasReport: false },
  { day: '토', date: 23, hasReport: false },
  { day: '일', date: 24, hasReport: false },
];

export const DEFAULT_SELECTED_INDEX = 2;

export const ANALYSIS_HEADER_TITLE = '5/20-21 수';

export interface SleepReportStats {
  monthDay: string;
  totalSleepLabel: string;
  bedTime: string;
  wakeTime: string;
  layTime: string;
  actualSleep: string;
  latency: string;
  awakenCount: string;
}

export const SLEEP_REPORT_STATS: SleepReportStats = {
  monthDay: '5월 20일',
  totalSleepLabel: '8시간 2분',
  bedTime: '오후 11:30',
  wakeTime: '오전 07:32',
  layTime: '8시간 32분',
  actualSleep: '8시간 11분',
  latency: '17분',
  awakenCount: '3회',
};

export type SleepStageType = 'AWAKE' | 'REM' | 'LIGHT' | 'DEEP';

export interface SleepStageSegment {
  stageType: SleepStageType;
  startMinute: number;
  endMinute: number;
}

export const SLEEP_STAGE_SEQUENCE: SleepStageSegment[] = [
  { stageType: 'AWAKE', startMinute: 0, endMinute: 8 },
  { stageType: 'LIGHT', startMinute: 8, endMinute: 45 },
  { stageType: 'DEEP', startMinute: 45, endMinute: 120 },
  { stageType: 'LIGHT', startMinute: 120, endMinute: 150 },
  { stageType: 'REM', startMinute: 150, endMinute: 190 },
  { stageType: 'LIGHT', startMinute: 190, endMinute: 240 },
  { stageType: 'REM', startMinute: 240, endMinute: 280 },
  { stageType: 'LIGHT', startMinute: 280, endMinute: 400 },
  { stageType: 'DEEP', startMinute: 400, endMinute: 440 },
  { stageType: 'LIGHT', startMinute: 440, endMinute: 470 },
  { stageType: 'AWAKE', startMinute: 470, endMinute: 482 },
];

export const CHART_START_LABEL = '11:30';
export const CHART_END_LABEL = '07:31';

export interface DiaryEntry {
  day: string;
  note: string;
}

export const DIARY_ENTRIES: DiaryEntry[] = [
  { day: '월', note: '늦게까지 커피를 마셔서 그런지 잠들기까지 오래 걸렸다.' },
  { day: '수', note: '스트레스 받는 일이 있어서 자주 뒤척였다.' },
  { day: '토', note: '주말이라 늦잠을 잤더니 컨디션이 훨씬 좋다.' },
];

export interface CoachCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  value: number;
  target: number;
  unit: string;
  percent: number;
}

export const COACH_CARDS: CoachCardData[] = [
  {
    id: 'momentum',
    title: '에너지 소비량',
    description:
      '지난 하루보다 700kcal 더 많은 2500kcal을 소모해볼까요? 규칙적인 에너지 소비는 깊은 잠, 즉 서파 수면의 비율을 높이는 데 효과적이랍니다.',
    image: '/demos/sleep-tight/momentum.jpg',
    value: 0,
    target: 2500,
    unit: 'kcal',
    percent: 0,
  },
  {
    id: 'walk',
    title: '걸음 수',
    description:
      '전날 4000보를 걸으셨는데 7000보까지 조금만 더 힘내보는 건 어떨까요? 걸음수를 늘리면 생체 시계가 안정되어 수면 효율이 높아집니다.',
    image: '/demos/sleep-tight/walk.jpg',
    value: 0,
    target: 7000,
    unit: '보',
    percent: 0,
  },
  {
    id: 'water',
    title: '수분 섭취량',
    description: '어제보다 300ml 부족했어요. 자기 전 마지막 물 한 잔이 숙면에 도움이 될 수 있어요.',
    image: '/demos/sleep-tight/water.jpg',
    value: 0,
    target: 2000,
    unit: 'ml',
    percent: 0,
  },
  {
    id: 'caffeine',
    title: '카페인 섭취',
    description:
      '오후 2시 이후 카페인 섭취가 확인돼요. 카페인은 잠들기까지 걸리는 시간을 늘릴 수 있어요.',
    image: '/demos/sleep-tight/caffeine.jpg',
    value: 0,
    target: 400,
    unit: 'mg',
    percent: 0,
  },
];

export const DEFAULT_ALARM = { hour: 7, minute: 15, period: '오전' as const };
