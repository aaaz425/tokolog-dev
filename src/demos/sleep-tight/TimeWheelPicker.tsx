'use client';

import '@ncdai/react-wheel-picker/style.css';
import { WheelPicker, WheelPickerWrapper, type WheelPickerOption } from '@ncdai/react-wheel-picker';
import { sevenSegment } from './fonts/seven-segment';
import { SLEEP_TIGHT_COLORS } from './colors';

type Period = '오전' | '오후';

export interface TimeWheelValue {
  period: Period;
  hour: number;
  minute: number;
}

interface TimeWheelPickerProps {
  value: TimeWheelValue;
  onChange: (value: TimeWheelValue) => void;
}

const OPTION_HEIGHT = 52;

// @ncdai/react-wheel-picker는 각 컬럼을 실제 3D 원통으로 렌더링한다(perspective:2000px 고정).
// 컬럼 자체의 실제 높이(Ce)는 optionItemHeight/visibleCount로부터 라이브러리 내부에서
// 계산되며(this.height = round(U*2 + optionItemHeight*0.25)), 우리가 지정한 컨테이너
// 높이(OPTION_HEIGHT*5)와 다르다. 가운데 강조 박스/콜론을 정확히 그 중심에 맞추려면
// 같은 공식으로 중심 좌표를 직접 계산해야 한다(퍼센트로 눈대중하면 어긋난다).
const VISIBLE_COUNT = 20; // 라이브러리 기본값(우리는 별도로 지정하지 않음)
const WHEEL_ANGLE_DEG = 360 / VISIBLE_COUNT;
const CENTER_DEPTH = OPTION_HEIGHT / Math.tan((WHEEL_ANGLE_DEG * Math.PI) / 180);
const COLUMN_HEIGHT = Math.round(CENTER_DEPTH * 2 + OPTION_HEIGHT * 0.25);
const HIGHLIGHT_CENTER_PX = COLUMN_HEIGHT / 2;

// 가운데(선택된) 항목은 optionItem 레이어에서 translateZ(CENTER_DEPTH)로 뷰어 쪽으로
// 밀려나 있어, perspective 투영 때문에 실제 선언한 font-size보다 다음 배율만큼
// 화면에 더 크게 보인다. highlightItem(강조 오버레이)에는 이 변형이 없으므로,
// 두 레이어가 같은 값을 보여줄 때 optionItem 쪽을 그 배율만큼 미리 작게 선언해야
// 픽셀이 정확히 겹쳐서 가장자리에 흐릿한 잔상(고스팅)이 생기지 않는다.
// MAGNIFICATION ≈ 1.087 (OPTION_HEIGHT=52 기준) — highlightItem 24px면 optionItem은
// 24/1.087≈22px, highlightItem 20px면 optionItem은 20/1.087≈18px.
const UNSELECTED_CLASS = 'text-[rgba(135,168,255,0.6)]';
const SELECTED_CLASS = 'text-white';
const DIGIT_FONT_CLASS = `font-bold ${sevenSegment.className}`;

const PERIOD_SELECTED_SIZE = 'text-xl leading-none';
const PERIOD_UNSELECTED_SIZE = 'text-[18px] leading-none';
const DIGIT_SELECTED_SIZE = 'text-2xl leading-none';
const DIGIT_UNSELECTED_SIZE = 'text-[22px] leading-none';

const PERIOD_OPTIONS: WheelPickerOption<Period>[] = [
  { value: '오전', label: '오전' },
  { value: '오후', label: '오후' },
];
const HOUR_OPTIONS: WheelPickerOption<number>[] = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1).padStart(2, '0'),
}));
const MINUTE_OPTIONS: WheelPickerOption<number>[] = Array.from({ length: 60 }, (_, i) => ({
  value: i,
  label: String(i).padStart(2, '0'),
}));

export function TimeWheelPicker({ value, onChange }: TimeWheelPickerProps) {
  return (
    <div
      className="relative -mx-5"
      style={{
        height: OPTION_HEIGHT * 5,
        background: `linear-gradient(180deg, ${SLEEP_TIGHT_COLORS.gray01}, #000000, ${SLEEP_TIGHT_COLORS.gray01})`,
      }}
    >
      <div
        className="absolute pointer-events-none rounded-lg z-10"
        style={{
          width: 236,
          height: OPTION_HEIGHT,
          top: HIGHLIGHT_CENTER_PX,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(58,110,255,0.16)',
        }}
      />
      <WheelPickerWrapper className="w-[236px]! mx-auto h-full">
        <WheelPicker
          options={PERIOD_OPTIONS}
          value={value.period}
          onValueChange={(period) => onChange({ ...value, period })}
          optionItemHeight={OPTION_HEIGHT}
          classNames={{
            optionItem: `font-bold ${PERIOD_UNSELECTED_SIZE} ${UNSELECTED_CLASS}`,
            highlightItem: `font-bold ${PERIOD_SELECTED_SIZE} ${SELECTED_CLASS}`,
          }}
        />
        <WheelPicker
          options={HOUR_OPTIONS}
          value={value.hour}
          onValueChange={(hour) => onChange({ ...value, hour })}
          infinite
          optionItemHeight={OPTION_HEIGHT}
          classNames={{
            optionItem: `${DIGIT_FONT_CLASS} ${UNSELECTED_CLASS} ${DIGIT_UNSELECTED_SIZE}`,
            highlightItem: `${DIGIT_FONT_CLASS} ${SELECTED_CLASS} ${DIGIT_SELECTED_SIZE}`,
          }}
        />
        <div className="relative h-full px-1 z-20">
          <span
            className={`absolute text-white ${sevenSegment.className}`}
            style={{
              fontSize: 36,
              top: HIGHLIGHT_CENTER_PX,
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            :
          </span>
        </div>
        <WheelPicker
          options={MINUTE_OPTIONS}
          value={value.minute}
          onValueChange={(minute) => onChange({ ...value, minute })}
          infinite
          optionItemHeight={OPTION_HEIGHT}
          classNames={{
            optionItem: `${DIGIT_FONT_CLASS} ${UNSELECTED_CLASS} ${DIGIT_UNSELECTED_SIZE}`,
            highlightItem: `${DIGIT_FONT_CLASS} ${SELECTED_CLASS} ${DIGIT_SELECTED_SIZE}`,
          }}
        />
      </WheelPickerWrapper>
    </div>
  );
}
