# ILCEC 2027 flyer – 사진 넣는 방법

이 폴더에 아래 파일명으로 사진을 넣으면 `../index.html`이 자동으로 인식해서
일러스트/플레이스홀더 대신 사진을 보여줍니다. 파일이 없으면 지금처럼 플레이스홀더가 나옵니다.

| 파일명 | 슬롯 | 권장 규격 | 포토코리아(phoko.visitkorea.or.kr) 검색어 |
|---|---|---|---|
| `hero-seoul.jpg` | 상단 파노라마 (전체 폭) | 가로형, 3:1 비율, 2400 px 이상 | `서울 야경`, `남산 서울타워`, `서울 스카이라인` |
| `myeongdong.jpg` | 좌측 하단 (가로) | 가로형, 약 3:1, 1600 px 이상 | `명동 야경`, `명동 거리`, `명동성당` |
| `gyeongbokgung.jpg` | 우측 하단 왼쪽 | 4:3 또는 정방형, 1200 px 이상 | `경복궁 근정전`, `경복궁 가을` |
| `hangang.jpg` | 우측 하단 오른쪽 | 4:3 또는 정방형, 1200 px 이상 | `한강 반포대교 야경`, `한강 유람선` |

## 출처 표기

한국관광공사 포토코리아 사진은 공공누리 제1유형(출처표시)입니다. 사진을 넣은 뒤
`index.html` 하단 `Photo credits` 문구의 `photographer name`을 다운로드 페이지에 표시된
작가명으로 바꿔 주세요. 형식 예시:

```
© Korea Tourism Organization Photo Korea – 김지호 / 이범수
```

호텔 외관·연회장 사진은 로얄호텔 세일즈팀에 직접 요청하고, 사용 시
`© Royal Hotel Seoul` 로 표기합니다.

## PDF 다시 만들기

```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless=new --no-sandbox \
  --no-pdf-header-footer --virtual-time-budget=3000 \
  --print-to-pdf=../../ILCEC_2027_First_Announcement_DRAFT.pdf "file://$PWD/../index.html"
```

일반 Chrome에서는 `index.html`을 열고 인쇄 → PDF로 저장(용지 A4, 여백 없음, 배경 그래픽 켜기)으로도 됩니다.
최종본을 만들 때는 `<body class="final">` 로 바꾸면 DRAFT 리본이 사라집니다.
