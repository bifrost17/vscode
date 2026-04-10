# Open Cowork

사내 LLM 기반 AI 문서작업 데스크톱 앱. VS Code를 포크하여 비개발자용으로 경량화하고, Claude Code 에이전트 엔진을 연결한다.

## 배경

Claude Cowork는 Electron 데스크톱 앱(클라이언트)에서 Hyper-V VM(서버)으로 요청을 보내는 클라이언트-서버 아키텍처다. VM 안에는 Claude Code 엔진이 기동되어 있고, 클라이언트-서버 간 API는 결국 **텍스트 + 파일 입출력**으로 추상화된다.

이 구조는 VS Code + Claude Code 확장의 구조와 본질적으로 동일하다. 따라서 Electron 앱을 처음부터 만드는 대신 **VS Code를 포크**하여 비개발자 전용으로 재구성한다.

## 접근 방식

**Cursor 모델 참고**: Cursor가 VS Code를 포크하여 개발자용 AI 코딩 도구를 만든 것처럼, Open Cowork는 VS Code를 포크하여 **비개발자용 AI 문서작업 도구**를 만든다.

1. **덜어낼 것** — 디버거, Git UI, 터미널 직접 노출, 빌드 태스크, 확장 마켓플레이스 등 개발자 전용 기능
2. **유지할 것** — 파일 탐색기, 에디터/미리보기, 탭/패널 레이아웃, 검색, 설정 UI
3. **추가할 것** — AI 대화 패널(Chat/Cowork), 권한 승인 UI, 스케줄 사이드바, 프로젝트 마법사
4. **연결할 것** — Claude Code 에이전트 엔진(VM 내부) ↔ 포크된 VS Code

## 아키텍처

```
┌──────────────────────────────────┐
│  Open Cowork (VS Code Fork)     │  Windows 데스크톱
│  - 비개발자용 경량 UI            │
│  - AI 대화 패널                  │
│  - 파일 탐색기 / 미리보기        │
└──────────┬───────────────────────┘
           │ stdio (텍스트 + 파일)
┌──────────▼───────────────────────┐
│  Hyper-V VM (Ubuntu 22.04)      │
│  ┌─────────────────────────────┐ │
│  │ Claude Code Engine          │ │
│  │ - 에이전틱 루프, 40+ 도구   │ │
│  │ - 메모리, 스킬, 훅, 권한    │ │
│  │ - LLM Provider Adapter      │ │
│  │   (OpenAI 호환 API)         │ │
│  └─────────────────────────────┘ │
└──────────┬───────────────────────┘
           │ OpenAI API
┌──────────▼───────────────────────┐
│  사내 LLM (vLLM + Qwen3.5)     │
└──────────────────────────────────┘
```

## 핵심 원칙

- **Engine-as-Base**: Claude Code 엔진을 그대로 활용. 재구현하지 않는다.
- **LLM Abstraction**: Anthropic API → OpenAI 호환 API 어댑터로 사내 LLM 연결.
- **Non-Developer First**: 비개발자가 문서작업에 사용. CLI 지식 불필요.
- **Data Locality**: 모든 데이터는 로컬 저장. 외부 전송 없음.

## 대상 사용자

비개발자. 문서작업(Excel, PPT, Word, PDF, 데이터 분석)이 주 용도.

## 플랫폼

Windows 10/11 Pro (Hyper-V 필수). macOS 미지원.

## 기술 스택

- **클라이언트**: VS Code Fork (Electron + TypeScript)
- **에이전트 엔진**: Claude Code (TypeScript, Bun 런타임)
- **VM**: Hyper-V, Ubuntu 22.04, VirtioFS
- **LLM**: vLLM + Qwen3.5 (OpenAI 호환 API)

## 참고 자료

- [VS Code 소스](https://github.com/microsoft/vscode)
- [VS Code 공식 문서](docs/vscode-docs/)
- [Open Cowork 전체 명세서](open-cowork-full-spec.md)
