const WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

export function formatDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}월 ${day}일 ${WEEKDAYS[date.getDay()]}`;
}

export function formatClock(date: Date) {
  const rawHour = date.getHours();
  const period = rawHour < 12 ? '오전' : '오후';
  const hour = rawHour % 12 === 0 ? 12 : rawHour % 12;
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${period} ${String(hour).padStart(2, '0')}:${minute}`;
}
