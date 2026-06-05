# tokolog Design System

라이트모드 단일 기준. Tailwind CSS 유틸리티 클래스 기반으로 작성한다.  
시드 컬러 `#121212` 기반의 모노크롬 팔레트 + Manrope / Inter 폰트 조합.

---

## 1. Color Palette

| 역할 | 정확한 색상값 | Tailwind 클래스 |
|------|-------------|----------------|
| **Primary** — 주요 액션, 강조, 핵심 인터랙티브 | `#000000` | `bg-black` / `text-black` |
| **Secondary** — 보조 UI, 세컨더리 버튼, 은은한 액센트 | `#424242` | `bg-[#424242]` / `text-[#424242]` |
| **Neutral** — 배경, 서피스 | `#F5F5F5` | `bg-neutral-100` |
| 카드 배경 | `#FFFFFF` | `bg-white` |
| Sidebar 배경 (PC) | `#000000` | `bg-black` |
| Primary 텍스트 | `#000000` | `text-black` |
| Secondary 텍스트 | `#424242` | `text-[#424242]` |
| Muted 텍스트 / 날짜 | `#9CA3AF` | `text-gray-400` |
| 카드 테두리 | `#E5E7EB` | `border-gray-200` |
| Primary 버튼 배경 | `#000000` | `bg-black` |
| Primary 버튼 텍스트 | `#FFFFFF` | `text-white` |

### 타입 배지 색상

| 타입 | 배경 | Tailwind |
|------|------|----------|
| 회사 (company) | `#000000` | `bg-black text-white` |
| 개인 (personal) | `#2563EB` | `bg-blue-600 text-white` |
| 진행중 (ongoing) | `#059669` | `bg-emerald-600 text-white` |

---

## 2. Typography

### 폰트 패밀리

| 용도 | 폰트 | 특성 |
|------|------|------|
| **Headline** — 제목, 페이지 헤더 | **Manrope** | 모던·기하학적, 임팩트 강조 |
| **Body** — 본문, 설명 | **Inter** | 가독성 우선, 모든 화면 크기 대응 |
| **Label** — UI 요소, 태그, 배지 | **Inter** | Body와 통일 |

### index.css에 Google Fonts 추가

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
@import "tailwindcss";
```

### tailwind.config 폰트 설정

```ts
theme: {
  extend: {
    fontFamily: {
      heading: ['Manrope', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
  },
}
```

### 타이포그래피 스케일

| 용도 | 크기 | 굵기 | Tailwind |
|------|------|------|----------|
| 페이지 제목 (Projects) | 36px | 700 | `font-heading text-4xl font-bold` |
| 카드 제목 | 16px | 600 | `font-heading text-base font-semibold` |
| 사이드바 로고 | 16px | 700 | `font-heading text-base font-bold` |
| 페이지 부제 | 14px | 400 | `font-body text-sm text-[#424242]` |
| 카드 설명 | 14px | 400 | `font-body text-sm text-[#424242]` |
| 사이드바 메뉴 | 14px | 500 | `font-body text-sm font-medium` |
| 기술 태그 | 12px | 500 | `font-body text-xs font-medium` |
| 날짜 | 12px | 400 | `font-body text-xs text-gray-400` |
| 배지 | 12px | 500 | `font-body text-xs font-medium` |

---

## 3. Spacing

스페이싱 레벨 **2 (일반)** — 빽빽하거나 과하지 않은 균형 잡힌 여백.

| 용도 | 값 |
|------|----|
| 카드 내부 패딩 | `p-4` (16px) |
| 컴포넌트 간 간격 | `gap-4` ~ `gap-5` (16~20px) |
| 섹션 패딩 (메인) | `px-6 py-6` ~ `px-8 py-6` |
| 인라인 요소 간격 | `gap-2` (8px) |
| 버튼 패딩 | `px-4 py-2` |
| 폼 필드 간격 | `space-y-4` |

---

## 4. 형태 (Shape / Radius)

라운드니스 레벨 **1 (미세한 둥근 처리)** — 과하지 않은 은은한 처리.

| 컴포넌트 | Radius | Tailwind |
|----------|--------|----------|
| 버튼 (pill 형태, 디자인 이미지 기준) | 9999px | `rounded-full` |
| 카드 | 8px | `rounded-lg` |
| 모달 패널 | 8px | `rounded-lg` |
| 입력 필드 / Select | 6px | `rounded-md` |
| 배지 / 타입 태그 | 9999px | `rounded-full` |
| 기술 스택 태그 | 4px | `rounded` |
| 사이드바 메뉴 활성 항목 | 6px | `rounded-md` |

---

## 5. Layout

### PC 레이아웃 (≥ 1024px)
```
┌──────────┬──────────────────────────────┐
│ Sidebar  │  Main Content                │
│  220px   │  flex-1, px-8, py-6          │
│  고정     │  bg-neutral-100              │
└──────────┴──────────────────────────────┘
```
- 사이드바: `w-[220px] min-h-screen bg-black fixed`
- 메인: `ml-[220px] min-h-screen bg-neutral-100 px-8 py-6`
- 카드 그리드: `grid grid-cols-3 gap-5`

### 모바일 레이아웃 (< 1024px)
```
┌──────────────────────────────┐
│  Top Nav Bar (white)         │
├──────────────────────────────┤
│  페이지 제목 + 부제           │
│  액션 버튼 행 (flex gap-3)   │
│  카드 목록 (1열)              │
└──────────────────────────────┘
```
- 상단 네비: `flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200`
- 메인: `px-4 py-6 bg-neutral-100`
- 카드 그리드: `grid grid-cols-1 gap-4`

### Breakpoint
| 구간 | 카드 열 수 |
|------|-----------|
| 모바일 `< 640px` | 1열 |
| 태블릿 `sm: 640px~` | 2열 |
| 데스크톱 `lg: 1024px~` | 3열 + 사이드바 |

---

## 6. Components

### Button

```tsx
// Primary
<button className="flex items-center gap-2 bg-black text-white font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-[#424242] transition-colors">
  + New Project
</button>

// Secondary (outlined)
<button className="flex items-center gap-2 border border-black text-black font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-neutral-100 transition-colors">
  Filter
</button>
```

모바일에서 버튼 두 개는 `flex gap-3`으로 나란히 배치.

### Card

```tsx
<div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
  {/* 썸네일 */}
  <div className="aspect-video bg-gray-100 overflow-hidden">
    <img src={...} className="w-full h-full object-cover" />
  </div>
  {/* 콘텐츠 */}
  <div className="p-4">
    <div className="flex items-center justify-between mb-2">
      <TypeBadge type={project.type} />
      <span className="font-body text-xs text-gray-400">{period}</span>
    </div>
    <h3 className="font-heading text-base font-semibold text-black mb-1">{title}</h3>
    <p className="font-body text-sm text-[#424242] line-clamp-2 mb-3">{description}</p>
    <div className="flex flex-wrap gap-1">{/* 기술 태그 */}</div>
  </div>
</div>
```

### Badge / Type Tag

```tsx
const typeStyles = {
  company:  'bg-black text-white',
  personal: 'bg-blue-600 text-white',
  ongoing:  'bg-emerald-600 text-white',
};

<span className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${typeStyles[type]}`}>
  {label}
</span>
```

### Tech Stack Tag

```tsx
<span className="font-body text-xs font-medium bg-gray-100 text-[#424242] px-2 py-0.5 rounded">
  {tag}
</span>
```

### Input / Form

```tsx
<input className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors" />

<textarea className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black resize-none transition-colors" />

<select className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black focus:outline-none focus:border-black" />
```

### Modal

```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
      <h2 className="font-heading text-base font-semibold text-black">{title}</h2>
      <button className="text-gray-400 hover:text-black transition-colors"><X size={18} strokeWidth={2} /></button>
    </div>
    <div className="p-5">{/* 본문 */}</div>
  </div>
</div>
```

### Sidebar (PC 전용, `hidden lg:flex`)

```tsx
<aside className="fixed left-0 top-0 w-[220px] min-h-screen bg-black flex flex-col px-4 py-5">
  <div className="flex items-center gap-2 mb-8">
    <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-black text-xs font-bold font-heading">M</div>
    <span className="font-heading text-white text-base font-bold">MyStack</span>
  </div>
  <nav className="flex flex-col gap-1">
    {/* 활성 메뉴 */}
    <a className="flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm font-medium text-white bg-white/10">
      Projects
    </a>
    {/* 비활성 메뉴 */}
    <a className="flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
      Experience
    </a>
  </nav>
</aside>
```

### Top Nav Bar (모바일 전용, `lg:hidden`)

```tsx
<header className="flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 lg:hidden">
  <span className="font-heading text-base font-bold text-black">MyStack</span>
  <div className="flex items-center gap-3 text-[#424242]">
    {/* 검색, 알림, 설정, 아바타 아이콘 */}
  </div>
</header>
```

---

## 7. Interaction States

| 상태 | 처리 방식 |
|------|----------|
| 카드 hover | `hover:shadow-md transition-shadow` |
| 버튼 hover (primary) | `hover:bg-[#424242]` |
| 버튼 hover (secondary) | `hover:bg-neutral-100` |
| 사이드바 메뉴 hover | `hover:text-white hover:bg-white/5` |
| 사이드바 메뉴 active | `text-white bg-white/10` |
| Input focus | `focus:border-black` |
| disabled | `opacity-50 cursor-not-allowed` |
| 클릭 가능한 모든 요소 | `cursor-pointer` — `<button>`, `<a>`, 카드 등 onClick이 있는 요소 필수 |

모든 전환에 `transition-colors` 또는 `transition-shadow` 적용.

---

## 8. Icons

- 아이콘은 **lucide-react**만 사용한다 (`import { IconName } from 'lucide-react'`)
- 크기: 기본 `size={16}`, 강조 `size={18}`, 대형 `size={20}`
- stroke: 기본 `strokeWidth={2}`
- 이모지는 장식 텍스트에만 허용 (UI 액션 아이콘으로는 사용 불가)
- 텍스트 기호(`×`, `←`, `→` 등)는 사용 금지

### 자주 쓰는 아이콘 매핑

| 용도 | 아이콘 |
|------|--------|
| 닫기 / 삭제 | `X` |
| 뒤로가기 | `ArrowLeft` |
| 앞으로 / CTA | `ArrowRight` |
| 추가 | `Plus` |
| 편집 | `Pencil` |

---

## 9. Do / Don't

**Do**
- Headline/제목은 항상 `font-heading` (Manrope) 사용
- Body/설명/레이블은 항상 `font-body` (Inter) 사용
- 색상은 `#000000`, `#424242`, `#F5F5F5` 3가지 기반으로만 조합
- 버튼은 `rounded-full`, 카드/모달은 `rounded-lg`, 입력은 `rounded-md`
- 간격은 4px 단위 기준 (`gap-2`, `gap-4`, `gap-5`, `p-4`, `px-6`)

**Don't**
- 임의의 hex 색상 `style={{ color: '#...' }}`으로 직접 사용 금지
- indigo 계열 색상 신규 추가 금지 (기존 컴포넌트는 순차 마이그레이션)
- `rounded-xl` / `rounded-2xl` 신규 사용 금지 (라운드니스 1 기준 위반)
- Manrope/Inter 외 다른 폰트 추가 금지
- 사이드바와 Top Nav 동시 렌더링 금지 (`lg:hidden` / `hidden lg:flex` 분기 필수)
