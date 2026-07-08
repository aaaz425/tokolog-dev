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

const VISIBLE_COUNT = 20; // 라이브러리 기본값(우리는 별도로 지정하지 않음)
const WHEEL_ANGLE_DEG = 360 / VISIBLE_COUNT;
const CENTER_DEPTH = OPTION_HEIGHT / Math.tan((WHEEL_ANGLE_DEG * Math.PI) / 180);
const COLUMN_HEIGHT = Math.round(CENTER_DEPTH * 2 + OPTION_HEIGHT * 0.25);
const HIGHLIGHT_CENTER_PX = COLUMN_HEIGHT / 2;

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
        background: `linear-gradient(180deg, ${SLEEP_TIGHT_COLORS.gray01}, #000000, ${SLEEP_TIGHT_COLORS.gray01})`,
      }}
    >
      <WheelPickerWrapper className="w-[236px]! mx-auto h-full">
        <WheelPicker
          options={PERIOD_OPTIONS}
          value={value.period}
          onValueChange={(period) => onChange({ ...value, period })}
          optionItemHeight={OPTION_HEIGHT}
          classNames={{
            optionItem: `font-bold ${PERIOD_UNSELECTED_SIZE} ${UNSELECTED_CLASS}`,
            highlightItem: `font-bold ${PERIOD_SELECTED_SIZE} ${SELECTED_CLASS}`,
            highlightWrapper: 'bg-[#091229] rounded-l-lg',
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
            highlightWrapper: 'bg-[#091229]',
          }}
        />

        <div className="relative flex items-center justify-center" style={{ width: 20 }}>
          <div
            className="absolute inset-y-0 left-0 right-0 bg-[#091229] z-10"
            style={{
              top: HIGHLIGHT_CENTER_PX - OPTION_HEIGHT / 2,
              height: OPTION_HEIGHT,
            }}
          />
          <span
            className={`absolute z-20 text-white ${sevenSegment.className}`}
            style={{
              fontSize: 36,
              top: HIGHLIGHT_CENTER_PX,
              left: '50%',
              transform: 'translate(-50%, -60%)',
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
            highlightWrapper: 'bg-[#091229] rounded-r-lg',
          }}
        />
      </WheelPickerWrapper>
    </div>
  );
}
