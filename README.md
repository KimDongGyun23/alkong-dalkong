# 알콩달콩

우리 가족의 건강 관리 서비스

<br/><br/>

## 프로젝트 개요

- **기간**:  2024.07.27 ~ 2024.11.01
- **참여 분야**: 기획, 프론트엔드
- **배포**: [**alkong-dalkong.vercel.app**](https://alkong-dalkong.vercel.app/)

<br/><br/>

## 프로젝트 배경

현대 사회에서 체계적으로 건강을 관리하는 것은 매우 중요하다. 다양한 의료 시스템과 서비스들이 존재하지만, 어르신들의 경우 이를 쉽게 이용하기는 어렵다. 병원 일정이나 복약 시간 등 중요한 정보들을 놓치기 쉬우며, 병원을 방문할 때에도 의사에게 전달해야 할 중요한 정보들을 놓치는 경우도 많다. 

<br/>

이에, 가족들이 어르신들의 병원 일정과 복약 기록을 함께 관리할 수 있는 서비스를 고안하게 되었다. 특히, 놓쳐서는 안되는 정보들을 직접 기입할 수 있으며, 기입한 내용을 의사에게 전달만 하면 되도록 생각해보았다. 가족 간의 건강 정보를 공유하고 서로를 챙기며, 보다 따뜻하고 체계적인 건강 관리가 가능하다.

<br/><br/>

## 주요 기능

- 로그인 / 회원가입
- 가족 그룹 생성
- 가족 간 진료 일정 등록 및 관리 (캘린더)
- 복약 정보 등록 및 알림
- 건강 수치 기록 및 차트
- PWA

<br/><br/>

## 사용 기술

| 분야 | 기술 스택 |
| --- | --- |
| **Frontend** | Next.js, TypeScript |
| **상태 관리** | TanStack Query, Zustand |
| **스타일링** | Tailwind CSS |
| **폼 관리** | React Hook Form, Zod |
| **기타** | Vercel, Storybook, Husky, Day.js, Recharts, react-calendar |

<br/><br/>

## 폴더 구조

```
src/
├── app               # 폰트 및 이미지
├── business/         # 도메인별 커스텀 훅
├── components/       # UI 컴포넌트
│   ├── container/    # 페이지별 클라이언트 컴포넌트
│   ├── domain/       # 도메인별 UI 컴포넌트
│   └── view/         # 공통 UI 컴포넌트
├── hooks/            # 커스텀 훅
├── store/            # 상태 관리 및 서버 상태 캐싱
│   ├── queries/      # TanStack Query 관련 정의
│   └── stores/       # Zustand 상태 관리
├── types/            # 타입 선언
└── utility/          # 공용 유틸리티 모음
    ├── constants/    # 상수
    ├── utils/        # 공용 유틸 함수
    └── styles/       # Tailwind 전역 스타일

```
