# Chat Application

실시간 채팅 애플리케이션입니다.  
사용자와 AI 챗봇 간의 대화를 지원합니다.   

## 주요 기능

- 🤖 AI 어시스턴트와의 대화 로컬 저장
- 💬 이전 대화 내용을 첨부한 채팅 인터페이스
- ⚡ 스트리밍 응답 지원
- 📑 마크다운 지원
- 🌓 다크 모드 테마 지원
- 📱 반응형 디자인
- ⌨️ 키보드 설정 (Enter: 전송, Shift+Enter: 줄바꿈)
- 🔄 자동 스크롤
- ⚠️ 에러 처리 및 재시도 기능

## 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4
- **상태 관리**: Context API, React Hooks
- **API 통신**: Fetch API
- **패키지 매니저**: pnpm
- **테스트**: Jest

## 시작하기

### 설치

1. 저장소 클론
```bash
git clone https://github.com/yourusername/assignment-interx.git
cd assignment-interx
```

2. 의존성 설치
```bash
pnpm install
```

3. 개발 서버 실행
```bash
pnpm dev
```

4. 브라우저에서 `http://localhost:3000` 접속

### 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 환경 변수들을 설정해주세요:

```env
NEXT_PUBLIC_CHAT_API_URL=your_api_url
NEXT_PUBLIC_CHAT_API_KEY=your_api_key
NEXT_PUBLIC_CHAT_MODEL=your_model_name
```

이 환경 변수들은 애플리케이션이 정상적으로 작동하기 위해 필수적입니다.

## 프로젝트 구조

```
src/
├── app/                 # Next.js 앱 라우터
│   └── api/             # API 라우트 (프록시)
├── components/          # React 컴포넌트
│   ├── Message.tsx      # 메시지 컴포넌트
│   ├── MessageList.tsx  # 메시지 목록 컴포넌트
│   └── ...
├── config/              
│   └── env.ts           # 환경 변수 객체 관리
├── context/             
│   └── ThemeContext.tsx # 테마 상태 (Context API)
├── sample/              # 샘플 메시지 데이터
│   ├── messages_sample.json 
│   └── ...
├── hooks/               # 커스텀 훅
│   └── useChat.ts       # 채팅 관련 로직
├── services/            # API 서비스
│   └── chatService.ts   # 채팅 API 통신
├── types/               # TypeScript 타입 정의
└── utils/               
    ├── markdownRenderer.ts # 마크다운 파싱
    └── ...
```

## 테스트

### 단위 테스트

- Jest를 사용한 단위 테스트를 실행합니다.
- 테스트코드는 `__test__` 폴더 내에 위치해 있습니다.

```bash
pnpm test
# 혹은
pnpm test:watch
```

## 컴포넌트 설명

### MessageList
- 메시지 목록을 표시하는 메인 컴포넌트
- 자동 스크롤 기능 포함
- 최초 로딩, 응답 로딩 상태 및 에러 응답 재전송 처리

### Message
- 개별 메시지를 표시하는 컴포넌트
- 사용자/AI 메시지 구분
- 마크다운 지원

### NewMessageForm
- 메시지 입력 폼
- 키보드 단축키 지원

## 스타일링
- Tailwind CSS: 유틸리티 클래스 기반 스타일 프레임워크 사용

## 상태관리

### Context API
- **ThemeContext**: 상태 관리 
  - 상태 토글
    1. 다크 모드: 시스템 테마 감지 및 동기화
    2. 메시지 stream 출력
  - 로컬 스토리지에 유저 설정 저장

### Custom Hooks
- **useChat**: 채팅 관련 상태 및 로직 관리
  - 메시지 목록 상태
  - 로딩 상태
  - 에러 상태
  - 메시지 전송 및 수신 로직
  - 스트리밍 응답 처리