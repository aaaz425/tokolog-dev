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

export const SCALE_LABELS = [
  '매우 나쁨',
  '나쁨',
  '조금 나쁨',
  '보통',
  '조금 좋음',
  '좋음',
  '매우 좋음',
];

export interface SleepDiaryStats {
  monthDay: string;
  totalSleepLabel: string;
  sleepTime: string;
  wakeTime: string;
  wakeCount: number;
  sleepLatency: string;
  sleepQuality: number;
}

export const SLEEP_DIARY_STATS: SleepDiaryStats = {
  monthDay: '5월 20일',
  totalSleepLabel: '8시간 2분',
  sleepTime: '오후 11:30',
  wakeTime: '오전 07:32',
  wakeCount: 2,
  sleepLatency: '17',
  sleepQuality: 7,
};

export type WakeAwareness = 'no' | 'normal' | 'yes';
export const WAKE_AWARENESS_OPTIONS: { value: WakeAwareness; label: string }[] = [
  { value: 'no', label: '아니오' },
  { value: 'normal', label: '보통' },
  { value: 'yes', label: '네' },
];

export type WakeMethod = 'alarm' | 'byPerson' | 'self' | 'noise' | 'other';
export const WAKE_METHOD_OPTIONS: { value: WakeMethod; label: string }[] = [
  { value: 'alarm', label: '알람' },
  { value: 'byPerson', label: '누군가 깨움' },
  { value: 'self', label: '스스로 일어남' },
  { value: 'noise', label: '소음' },
  { value: 'other', label: '기타' },
];

// TODO: 실제 커버 이미지로 교체 가능. 같은 경로에 파일을 덮어쓰면 코드 변경 없이 반영됨.
export const MUSIC_COVER = '/demos/sleep-tight/music/cover-placeholder.svg';

export interface MusicTrack {
  id: string;
  title: string;
  cover: string;
}

export interface MusicCategoryData {
  key: string;
  label: string;
  description: string;
  tracks: MusicTrack[];
}

export const MUSIC_CATEGORIES: MusicCategoryData[] = [
  {
    key: 'cozy',
    label: '아늑한',
    description: '음악과 함께 잠에 빠져들어보세요.',
    tracks: [
      { id: 'cozy_music_1', title: 'cozy_music_1', cover: MUSIC_COVER },
      { id: 'cozy_music_2', title: 'cozy_music_2', cover: MUSIC_COVER },
    ],
  },
  {
    key: 'nature',
    label: '자연',
    description: '음악과 함께 편안한 휴식을 취해보세요.',
    tracks: [
      { id: 'nature_music_1', title: 'nature_music_1', cover: MUSIC_COVER },
      { id: 'nature_music_2', title: 'nature_music_2', cover: MUSIC_COVER },
    ],
  },
  {
    key: 'dreamy',
    label: '몽환적인',
    description: '음악과 함께 상상의 나래를 펼쳐보세요.',
    tracks: [
      { id: 'dreamy_music_1', title: 'dreamy_music_1', cover: MUSIC_COVER },
      { id: 'dreamy_music_2', title: 'dreamy_music_2', cover: MUSIC_COVER },
    ],
  },
  {
    key: 'mystic',
    label: '신비로운',
    description: '음악과 함께 새로운 영감을 얻어보세요.',
    tracks: [
      { id: 'mystic_music_1', title: 'mystic_music_1', cover: MUSIC_COVER },
      { id: 'mystic_music_2', title: 'mystic_music_2', cover: MUSIC_COVER },
    ],
  },
  {
    key: 'healing',
    label: '치유',
    description: '음악과 함께 마음에 위로를 받아보세요.',
    tracks: [
      { id: 'healing_music_1', title: 'healing_music_1', cover: MUSIC_COVER },
      { id: 'healing_music_2', title: 'healing_music_2', cover: MUSIC_COVER },
    ],
  },
];

export const MYPAGE_USER_NAME = '홍길동';

export interface AnomalyEvent {
  id: string;
  label: string;
  count: number;
  startTime: string;
  endTime: string;
  /** 30개 파형 막대 중 이상 구간으로 강조할 [시작, 끝) 인덱스 범위 */
  highlightRange: [number, number];
}

export const ANOMALY_EVENTS: AnomalyEvent[] = [
  {
    id: 'snore',
    label: '코골이',
    count: 1,
    startTime: '04:30:17',
    endTime: '04:30:27',
    highlightRange: [10, 22],
  },
  {
    id: 'cough',
    label: '기침',
    count: 1,
    startTime: '04:37:25',
    endTime: '04:37:25',
    highlightRange: [13, 17],
  },
  {
    id: 'sleep-talk',
    label: '잠꼬대',
    count: 1,
    startTime: '06:20:57',
    endTime: '06:21:07',
    highlightRange: [12, 21],
  },
];

export const WAVEFORM_BAR_COUNT = 30;
export const WAVEFORM_HEIGHTS = Array.from(
  { length: WAVEFORM_BAR_COUNT },
  (_, i) => 0.2 + Math.abs(Math.sin(i * 1.3)) * 0.7
);

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
