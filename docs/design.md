# tokolog Design System

라이트모드 단일 기준. Tailwind CSS 유틸리티 클래스 기반으로 작성한다.
슬레이트(slate) 뉴트럴 팔레트 + 은은한 블루 포인트 컬러 + Pretendard 폰트.
전체 UI는 플랫(flat)한 미니멀 스타일을 기본으로 하고, **애플 스타일 글래스모피즘(반투명 + backdrop-blur)은 프로젝트 상세 모달 하나에만** 적용해 그 순간을 특별하게 만든다. 배경에 그라디언트나 블러 블롭을 깔지 않는다 — 글래스 효과는 모달이 리스트 화면 위로 뜰 때 뒤에 깔리는 반투명 오버레이만으로 표현한다.

---

## 1. Color Palette

### 뉴트럴 — Tailwind 기본 `slate` 스케일 (별도 토큰 정의 불필요)

| 역할 | 정확한 색상값 | Tailwind 클래스 |
|------|-------------|----------------|
| Page 배경 (base) | `#F8FAFC` | `bg-slate-50` |
| 서피스 (연한 배경, 태그 bg) | `#F1F5F9` | `bg-slate-100` |
| 카드 배경 | `#FFFFFF` | `bg-white` |
| 카드 테두리 / 구분선 | `#E2E8F0` | `border-slate-200` |
| 비활성 보더 | `#CBD5E1` | `border-slate-300` |
| Muted 텍스트 / 날짜 | `#94A3B8` | `text-slate-400` |
| Secondary 텍스트 (설명/부제) | `#475569` | `text-slate-600` |
| Primary 텍스트 (제목) | `#1E293B` | `text-slate-800` |
| Sidebar 배경 (PC) | `#0F172A` | `bg-slate-900` |

### 포인트 — `accent-*` (신규 `@theme` 토큰)

| 역할 | 정확한 색상값 | Tailwind 클래스 |
|------|-------------|----------------|
| 소프트 틴트 (hover bg) | `#EFF6FF` | `bg-accent-50` |
| 포인트 기본 (링크 hover, 포커스, personal 배지) | `#3B82F6` | `bg-accent-500` / `text-accent-500` |
| 포인트 강조 (Primary 버튼) | `#2563EB` | `bg-accent-600` |

> accent 컬러는 화면당 1~2곳으로 사용을 제한한다 ("은은함"은 채도가 아니라 사용 빈도로 지킨다).

### 글래스모피즘 서피스 — **프로젝트 상세 모달 전용**

다른 어떤 컴포넌트(리스트 카드, Sidebar, TopNav, 일반 Modal)에도 `backdrop-blur`를 쓰지 않는다. 오직 프로젝트 카드를 클릭했을 때 뜨는 상세 모달에만 적용한다.

| 역할 | Tailwind 클래스 |
|------|----------------|
| 모달 오버레이 (배경 딤) | `bg-slate-950/50` |
| 모달 카드 배경 (반투명) | `bg-white/80 backdrop-blur-xl` |
| 모달 카드 테두리 | `border-white/60` |
| 모달 카드 그림자 | `shadow-xl` |

### 타입 배지 색상

| 타입 | 배경 | Tailwind |
|------|------|----------|
| 회사 (company) | `#1E293B` | `bg-slate-800 text-white` |
| 팀 (team) | `#64748B` | `bg-slate-500 text-white` |
| 개인 (personal) | `#3B82F6` | `bg-accent-500 text-white` |

### Error / Destructive (변경 없음)

| 역할 | 정확한 색상값 | Tailwind 클래스 |
|------|-------------|----------------|
| 폼 유효성 에러 텍스트 | `#EF4444` | `text-red-500` |
| Error 보더 | `#EF4444` | `border-red-400` |

---

## 2. Typography

### 폰트 패밀리

단일 패밀리 **Pretendard** (한국어 최적화 변수 폰트, weight 45~920)를 사용한다. `font-heading`/`font-body` 유틸리티 이름은 유지하되 두 변수 모두 같은 Pretendard 폰트를 가리키며, 위계는 **font-weight로만** 구분한다.

### Pretendard 로드 (next/font/local)

```bash
npm install pretendard
```

```tsx
// src/app/layout.tsx
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

// <html lang="ko" className={pretendard.variable}>
```

### globals.css 폰트 매핑

```css
@import 'tailwindcss';

@theme inline {
  --font-heading: var(--font-pretendard);
  --font-body: var(--font-pretendard);
}
```

### 타이포그래피 스케일

| 용도 | 크기 | 굵기 | Tailwind |
|------|------|------|----------|
| 페이지 제목 (Projects) | 36px | 700 | `font-heading text-4xl font-bold` |
| 카드 제목 | 16px | 600 | `font-heading text-base font-semibold` |
| 사이드바 로고 | 16px | 700 | `font-heading text-base font-bold` |
| 페이지 부제 | 14px | 400 | `font-body text-sm text-slate-600` |
| 카드 설명 | 14px | 400 | `font-body text-sm text-slate-600` |
| 사이드바 메뉴 | 14px | 500 | `font-body text-sm font-medium` |
| 기술 태그 | 12px | 500 | `font-body text-xs font-medium` |
| 날짜 | 12px | 400 | `font-body text-xs text-slate-400` |
| 배지 | 12px | 500 | `font-body text-xs font-medium` |

---

## 3. Spacing

스페이싱 레벨 **2 (일반)** — 빽빽하거나 과하지 않은 균형 잡힌 여백. (기존 기준 유지, 변경 없음)

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

라운드니스 레벨 **1 (미세한 둥근 처리)** — 과하지 않은 은은한 처리. (기존 기준 유지, 변경 없음)

| 컴포넌트 | Radius | Tailwind |
|----------|--------|----------|
| 버튼 (pill 형태) | 9999px | `rounded-full` |
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
│  솔리드   │  bg-slate-50 (플랫)           │
└──────────┴──────────────────────────────┘
```
- 사이드바: `w-[220px] min-h-screen bg-slate-900 border-r border-slate-800 fixed`
- 메인: `ml-[220px] min-h-screen bg-slate-50 px-8 py-6`
- 카드 그리드: `grid grid-cols-3 gap-5`

### 모바일 레이아웃 (< 1024px)
```
┌──────────────────────────────┐
│  Top Nav Bar (solid)         │
├──────────────────────────────┤
│  페이지 제목 + 부제           │
│  액션 버튼 행 (flex gap-3)   │
│  카드 목록 (1열)              │
└──────────────────────────────┘
```
- 상단 네비: `flex items-center justify-between px-4 h-14 bg-white border-b border-slate-200`
- 메인: `px-4 py-6 bg-slate-50`
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
<button className="flex items-center gap-2 bg-accent-600 text-white font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-accent-500 transition-colors cursor-pointer">
  + New Project
</button>

// Secondary (outlined)
<button className="flex items-center gap-2 border border-slate-300 text-slate-700 font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer">
  Filter
</button>
```

모바일에서 버튼 두 개는 `flex gap-3`으로 나란히 배치.

### Card (List — Flat)

리스트에 나열되는 카드(ProjectCard, BlogCard 등)는 항상 플랫하다. 글래스 효과를 쓰지 않는다.

```tsx
<div className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
  {/* 썸네일 */}
  <div className="aspect-video bg-slate-100 overflow-hidden">
    <img src={...} className="w-full h-full object-cover" />
  </div>
  {/* 콘텐츠 */}
  <div className="p-4">
    <div className="flex items-center justify-between mb-2">
      <TypeBadge type={project.type} />
      <span className="font-body text-xs text-slate-400">{period}</span>
    </div>
    <h3 className="font-heading text-base font-semibold text-slate-800 mb-1">{title}</h3>
    <p className="font-body text-sm text-slate-600 line-clamp-2 mb-3">{description}</p>
    <div className="flex flex-wrap gap-1">{/* 기술 태그 */}</div>
  </div>
</div>
```

### Badge / Type Tag

```tsx
const typeStyles = {
  company:  'bg-slate-800 text-white',
  team:     'bg-slate-500 text-white',
  personal: 'bg-accent-500 text-white',
};

<span className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${typeStyles[type]}`}>
  {label}
</span>
```

### Tech Stack Tag

```tsx
<span className="font-body text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
  {tag}
</span>
```

### Input / Form

```tsx
<input className="w-full border border-slate-200 rounded-md px-3 py-2 font-body text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-colors" />

<textarea className="w-full border border-slate-200 rounded-md px-3 py-2 font-body text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 resize-none transition-colors" />

<select className="w-full border border-slate-200 rounded-md px-3 py-2 font-body text-sm text-slate-800 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20" />
```

### 프로젝트 상세 모달 (Glassmorphism — 유일한 글래스 적용처)

프로젝트 카드를 클릭하면 상세 페이지로 이동하는 대신, 리스트 위에 글래스 카드가 모달로 뜬다. Next.js **Intercepting Routes**로 구현해 클릭 시엔 모달, 직접 URL 접속·새로고침 시엔 동일한 내용의 풀페이지가 열리도록 분기한다.

```
src/app/projects/
├── layout.tsx              # {children} + {modal} 슬롯 렌더
├── page.tsx                 # 목록 (플랫 카드)
├── [slug]/page.tsx          # 풀페이지 상세 (플랫 카드, 직접 접속/새로고침용)
├── [slug]/demo/page.tsx     # 데모 (변경 없음)
└── @modal/
    ├── default.tsx          # 병렬 슬롯 기본값 — null 반환
    └── (.)[slug]/page.tsx   # 인터셉트된 모달 (글래스 카드)
```

풀페이지(`[slug]/page.tsx`)와 모달(`@modal/(.)[slug]/page.tsx`)은 공통 컴포넌트 `src/components/ProjectDetailCard.tsx`를 `glass` prop으로 분기해서 공유한다 — 마크업 중복을 피한다.

```tsx
// src/components/ProjectDetailCard.tsx
interface ProjectDetailCardProps {
  project: Project;
  glass?: boolean;
}

export function ProjectDetailCard({ project, glass = false }: ProjectDetailCardProps) {
  const cardStyle = glass
    ? 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl'
    : 'bg-white border border-slate-200 shadow-sm';

  return <div className={`rounded-lg overflow-hidden ${cardStyle}`}>{/* 본문 */}</div>;
}
```

```tsx
// src/components/ProjectModal.tsx ('use client')
const [view, setView] = useState<'detail' | 'demo'>('detail');
const isDemo = view === 'demo';

<div
  className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 ${isDemo ? '' : 'p-4'}`}
  onClick={isDemo ? undefined : close}
>
  <motion.div
    layout
    transition={{ type: 'spring', stiffness: 300, damping: 32 }}
    className={
      isDemo
        ? 'relative w-full h-full overflow-y-auto rounded-none bg-slate-50'
        : 'relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg'
    }
    onClick={(e) => e.stopPropagation()}
  >
    {isDemo ? (
      <>
        <div className="max-w-3xl mx-auto p-6 md:p-10">
          <DemoLoader slug={project.slug} />
        </div>
        <DemoControls onBack={() => setView('detail')} onClose={close} />
      </>
    ) : (
      <>
        <button onClick={close} aria-label="닫기" className="absolute top-4 right-4 z-10 ...">
          <X size={18} />
        </button>
        <ProjectDetailCard project={project} glass onDemoClick={() => setView('demo')} />
      </>
    )}
  </motion.div>
</div>
```

- 닫기(디테일 뷰): 오버레이 클릭, X 버튼, `Escape` 키 모두 `router.back()`으로 처리 (모달 콘텐츠 클릭은 `stopPropagation`으로 닫히지 않게 막는다).
- "Demo" 클릭은 라우트 이동이 아니라 **모달 내부 뷰 전환**(`view` state)이다. 같은 `motion.div`가 `layout` prop으로 카드 크기의 박스에서 풀스크린으로 자동 확장 애니메이션된다 — 별도의 `layoutId` 매칭 없이, 같은 컴포넌트 인스턴스이기 때문에 프레이머모션이 레이아웃 변화를 자동으로 감지해 애니메이션한다.
- 데모 뷰는 몰입감을 위해 제목/설명/뒤로가기 텍스트/상시 X 버튼을 렌더링하지 않는다 — 대신 `DemoControls`(패턴 5 참고)가 그 역할을 대체한다.
- `/projects/[slug]/demo` 풀페이지 라우트(직접 접속·새로고침용)는 인터셉트 대상이 아니며 이 모달 내부 뷰 전환과 무관하게 독립적으로 동작한다.
- **Parallel routes 함정**: 모달이 열린 채로 이 프로젝트의 하위 경로(과거엔 `/demo`로 실제 이동했음)로 client 네비게이션하면 `@modal` 슬롯이 새 URL과 매치되지 않아도 이전 콘텐츠를 그대로 들고 있는 Next.js 특성이 있다. `ProjectModal`은 `usePathname()`으로 자기 경로(`/projects/${project.slug}`)와 다르면 스스로 `null`을 반환해 방어한다.

### Phone Frame (모바일 앱 재현 데모 전용)

Flutter/React Native 등 네이티브 앱은 데모 페이지에 그대로 못 띄운다. **비디오 임베드가 아니라 웹으로 재현(포팅)한다** — 핵심 화면·인터랙션을 React 컴포넌트로 다시 만들어 `src/demos/`에 추가하고 `DemoLoader.tsx`의 `DEMOS` 맵에 슬러그로 등록한다(TodoApp 데모와 동일한 절차). 백엔드 없이 프론트엔드만으로 완결되어야 하며, 단순 CRUD는 `localStorage` 동기화(TodoApp 방식), 실제 API 호출 흐름(로딩/에러 등)까지 보여줘야 하면 `MSW`로 fetch를 가로챈다.

재현한 데모가 모바일 앱임을 시각적으로 드러내려면 `PhoneFrame`으로 감싼다:

```tsx
// src/components/PhoneFrame.tsx
<div className="mx-auto w-full max-w-[280px] aspect-[9/19.5] rounded-[2.5rem] border-8 border-slate-800 bg-slate-950 shadow-xl overflow-hidden">
  <div className="w-full h-full overflow-y-auto">{children}</div>
</div>
```

```tsx
// 사용 예 — src/demos/SomeFlutterAppDemo.tsx
export function SomeFlutterAppDemo() {
  return <PhoneFrame>{/* 재현한 모바일 화면 */}</PhoneFrame>;
}
```

`max-w-[280px]`로 상한을 두되 `w-full`로 좁은 화면에서 줄어들게 해 반응형을 보장한다. 웹 앱을 재현한 데모(TodoApp 등)는 감싸지 않는다 — 원본이 데스크톱/반응형 웹이면 넓은 카드 그대로 두는 게 자연스럽다.

### 풀스크린 몰입형 데모 (3D/공간 앱 재현 전용)

원본이 3D 캔버스나 전체 화면 앱(예: `w-dvw h-dvh`로 뷰포트를 그대로 채우는 서비스)이라 카드 안에 작게 넣으면 원본의 몰입감이 죽는 경우, 데모 뷰의 기본 `max-w-3xl mx-auto p-6 md:p-10` 여백 래퍼를 건너뛰고 뷰포트를 그대로 채운다.

`Project` 타입에 `fullscreenDemo?: boolean`을 추가해 표시한다:

```tsx
// src/data/projects.ts
{ slug: 'galaxy-talk', /* ... */ hasDemo: true, fullscreenDemo: true }
```

`ProjectModal.tsx`와 `/projects/[slug]/demo/page.tsx` 양쪽에서 이 플래그를 보고 래퍼 유무를 분기한다:

```tsx
{project.fullscreenDemo ? (
  <DemoLoader slug={project.slug} />
) : (
  <div className="max-w-3xl mx-auto p-6 md:p-10">
    <DemoLoader slug={project.slug} />
  </div>
)}
```

데모 컴포넌트 쪽(`src/demos/*/`) 최상위 엘리먼트는 `aspect-video` 같은 카드형 크기 제한 대신 `w-full h-full`로 부모(모달의 `w-full h-full` 레이어)를 그대로 채운다. 여러 화면(3D 홈 → 대기 → 채팅 등)을 오가는 데모는 탭으로 화면을 고르게 하지 않고, 원본처럼 클릭·제출 등 실제 인터랙션으로 다음 화면으로 넘어가게 한다 — 탭 스위처는 원본에 없는 탐색 방식이라 몰입을 깬다.

### 일반 Form Modal (Flat)

프로젝트 상세 모달 외의 다른 모달(폼 등)은 플랫로 유지한다.

```tsx
<div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-lg w-full max-w-md shadow-xl border border-slate-200">
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
      <h2 className="font-heading text-base font-semibold text-slate-800">{title}</h2>
      <button className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"><X size={18} strokeWidth={2} /></button>
    </div>
    <div className="p-5">{/* 본문 */}</div>
  </div>
</div>
```

### Sidebar (PC 전용, `hidden lg:flex`, Flat)

```tsx
<aside className="fixed left-0 top-0 w-[220px] min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col px-4 py-5">
  <div className="flex items-center gap-2 mb-8">
    <div className="w-7 h-7 rounded-md bg-accent-500 flex items-center justify-center text-white text-xs font-bold font-heading">T</div>
    <span className="font-heading text-white text-base font-bold">tokolog</span>
  </div>
  <nav className="flex flex-col gap-1">
    {/* 활성 메뉴 */}
    <a className="flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm font-medium text-white bg-white/10 cursor-pointer">
      Projects
    </a>
    {/* 비활성 메뉴 */}
    <a className="flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
      Blog
    </a>
  </nav>
</aside>
```

### Top Nav Bar (모바일 전용, `lg:hidden`, Flat)

```tsx
<header className="flex items-center justify-between px-4 h-14 bg-white border-b border-slate-200 lg:hidden">
  <span className="font-heading text-base font-bold text-slate-800">tokolog</span>
  <div className="flex items-center gap-3 text-slate-600">
    {/* 검색, 알림, 설정, 아바타 아이콘 */}
  </div>
</header>
```

---

## 7. Interaction States

| 상태 | 처리 방식 |
|------|----------|
| 카드 hover (리스트, 플랫) | `hover:shadow-md transition-shadow` |
| 버튼 hover (primary) | `hover:bg-accent-500` |
| 버튼 hover (secondary) | `hover:bg-slate-100` |
| 사이드바 메뉴 hover | `hover:text-white hover:bg-white/5` |
| 사이드바 메뉴 active | `text-white bg-white/10` |
| Input focus | `focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20` |
| disabled | `opacity-50 cursor-not-allowed` |
| 클릭 가능한 모든 요소 | `cursor-pointer` 필수 |

`<button>`은 Tailwind Preflight에 의해 기본값이 `cursor: default`다. onClick이 있는 모든 `<button>`, `<a>`/`<Link>`, 클릭 가능한 `<div>`에 **반드시 `cursor-pointer`를 명시적으로 추가**한다. 리뷰 시 `grep -rn "<button" src | grep -v cursor-pointer`로 누락 여부를 검증한다.

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
| 데모 실행 | `Play` |

---

## 9. Do / Don't

**Do**
- Headline/Body/Label 모두 `font-heading`/`font-body` (Pretendard) 사용, 위계는 font-weight로만 구분
- 뉴트럴은 `slate-*`, 포인트는 `accent-*`만 사용
- accent 컬러는 화면(뷰포트)당 1~2곳으로 제한해 은은함 유지
- `backdrop-blur`는 **프로젝트 상세 모달에만** 적용, 그 외 모든 컴포넌트(리스트 카드·Sidebar·TopNav·일반 폼 모달)는 플랫 유지
- 버튼은 `rounded-full`, 카드/모달은 `rounded-lg`, 입력은 `rounded-md`
- 간격은 4px 단위 기준 (`gap-2`, `gap-4`, `gap-5`, `p-4`, `px-6`)
- 호버·클릭 가능한 모든 요소에 `cursor-pointer` 명시
- 리스트↔상세 화면 전환에 모달이 필요하면 Next.js Intercepting Routes로 구현해 직접 URL 접속 시에도 동일 콘텐츠가 열리도록 한다

**Don't**
- `#000000` / `#424242` 등 구 팔레트 하드코딩 재도입 금지
- 임의의 hex 색상 `style={{ color: '#...' }}`으로 직접 사용 금지
- accent 컬러 남용 금지 (버튼마다 파란색 도배 금지)
- `rounded-xl` / `rounded-2xl` 신규 사용 금지 (라운드니스 1 기준 위반)
- Pretendard 외 다른 폰트 추가 금지
- 프로젝트 상세 모달 외의 곳에 `backdrop-blur` 확산 금지 (배경에 그라디언트/블롭을 깔아 글래스 효과를 연출하지 않는다)
- 사이드바와 Top Nav 동시 렌더링 금지 (`lg:hidden` / `hidden lg:flex` 분기 필수)

---

## 10. Motion

`framer-motion`을 사용한다. 모든 모션은 **interaction-triggered**(hover/tap/click) 또는 **mount-once**(진입 시 1회)만 허용하고, 반복/루프 애니메이션(`repeat`, `repeatType`, 무한 keyframe)은 프로젝트 전체에서 금지한다. "은은함"은 진폭이 아니라 재생 빈도로 지킨다.

### 공유 모듈

| 목적 | 위치 |
|------|------|
| transition/variants 상수 | `src/lib/motion.ts` |
| `prefers-reduced-motion` 분기 훅 | `src/hooks/useMotionSafe.ts` |
| 카드 hover + 그리드 진입 겸용 wrapper | `src/components/motion/MotionCardSurface.tsx` |
| pill 버튼 hover/tap wrapper | `src/components/motion/MotionPill.tsx` |

새 모션 값이 필요하면 컴포넌트에 인라인으로 쓰지 않고 `src/lib/motion.ts`에 상수로 먼저 추가한다.

### 패턴 1 — 활성 인디케이터 (Shared Layout Animation)

메뉴/탭의 활성 표시는 색상 즉시 스위칭 대신 `layoutId` 기반 공유 레이아웃 애니메이션을 사용한다. 인디케이터는 활성 항목 안에서만 조건부 렌더링하고(`{isActive && <motion.div layoutId="..." />}`), 텍스트는 `relative z-10`으로 그 위에 얹는다.

| 위치 | layoutId | 형태 |
|------|----------|------|
| PC 사이드바 | `sidebar-active-pill` | 배경 필 (`inset-0`) |
| 모바일 TopNav | `topnav-active-underline` | 하단 밑줄 |
| 프로젝트 필터 탭 | `project-filter-pill` | 배경 필 |
| 블로그 태그 필터 | `blog-filter-pill` | 배경 필 |

사이드바/TopNav처럼 `lg:hidden`·`hidden lg:flex`로 CSS 상 숨김 처리될 뿐 DOM에는 동시에 존재하는 두 트리는 **반드시 서로 다른 `layoutId`**를 쓴다.

전환 프리셋: `PILL_TRANSITION = { type: 'spring', stiffness: 500, damping: 40 }` — 오버슈트가 거의 없는 스냅감.

### 패턴 2 — 카드 hover

리스트 카드는 `MotionCardSurface`로 감싸 `whileHover={{ y: -4 }}`를 적용한다. 기존 `hover:shadow-md transition-shadow` (Tailwind, box-shadow 담당)는 그대로 병행 — transform과 box-shadow는 서로 다른 속성이라 충돌하지 않는다. 전환 프리셋: `CARD_HOVER_TRANSITION = { type: 'spring', stiffness: 400, damping: 30 }`.

### 패턴 3 — 그리드 진입 (Stagger, mount-once)

`ProjectsGrid`/`BlogGrid`의 그리드 컨테이너에 `variants={GRID_CONTAINER_VARIANTS} initial="hidden" animate="show"`를 걸고, 개별 카드(`MotionCardSurface`)는 `variants={GRID_ITEM_VARIANTS}`만 지정해 부모 상태를 상속받는다. 필터 전환 시 그리드 자체를 리마운트(`key={filter}` 등)하지 않는다 — 기존에 보이던 카드는 리플레이되지 않고, 필터링으로 새로 나타나는 카드만 자연스럽게 mount 애니메이션을 탄다.

### 패턴 4 — 버튼 hover/tap

Pill 모양 CTA/액션 버튼(랜딩 CTA, `ProjectDetailCard`의 Demo/GitHub/배포)은 `MotionPill`로 감싸 `whileHover={{ scale: 1.03 }}` / `whileTap={{ scale: 0.97 }}`를 적용한다. `Link`/`<a>`는 그대로 두고 내부 `motion.span`만 시각/모션을 담당한다.

### 패턴 5 — 몰입형 오토하이드 컨트롤

프로젝트 상세 모달의 데모 풀스크린 뷰처럼 "체험 자체"가 중요한 화면에서는 상시 노출되는 UI 크롬(제목, 설명, 버튼)이 몰입을 방해한다. 이럴 때는 `DemoControls` 패턴을 쓴다:

- `mousemove` / `touchstart` / `keydown` 이벤트 하나로 표시 여부를 제어한다. 데스크톱 hover 전용, 모바일 tap 전용으로 분기하지 않는다 — 이벤트 리스너 하나가 두 플랫폼을 동시에 커버한다.
- 진입 시 잠깐(약 2초) 완전히 보였다가 옅어지는 것으로 시작한다. 처음부터 완전히 숨기면 컨트롤의 존재 자체를 못 찾는 discoverability 문제가 생긴다.
- 마지막 인터랙션 후 일정 시간(2.5초)이 지나면 자동으로 옅어진다.
- opacity 전환은 `useState` + `setTimeout`으로 제어하는 단발성 fade이며, 반복 재생되는 애니메이션이 아니므로 "반복/루프 금지" 원칙에 위배되지 않는다.
- 터치 타겟은 최소 44px(예: `w-11 h-11`)를 지킨다.
- 위치는 화면 모서리 고정(`fixed`)이라 뷰포트 크기와 무관하게 항상 도달 가능해야 한다.

### 접근성

모든 모션 컴포넌트는 `useMotionSafe()`로 `prefers-reduced-motion`을 확인하고, `false`(reduced 선호)일 때는 애니메이션 props를 생략한다. 단, **인디케이터 자체(배경/밑줄)는 reduced-motion에서도 정적으로 표시**한다 — 정보 자체가 사라지면 안 된다.

### Do / Don't (Motion)

**Do**
- `layoutId` 인디케이터는 활성 항목 안에서만 조건부 렌더링
- 모든 모션 값은 `src/lib/motion.ts`에서 가져다 쓴다
- `useMotionSafe()`로 reduced-motion 분기

**Don't**
- `repeat`/`repeatType`/무한 keyframe 애니메이션 금지
- 스크롤 트리거 parallax, 배경 블롭/파티클, 텍스트 typewriter 금지 (9. Do/Don't의 글래스모피즘 제한과 같은 이유 — 장식 남용 금지)
- 같은 화면에서 동시에 보이는 두 요소가 같은 `layoutId`를 갖지 않도록 한다
