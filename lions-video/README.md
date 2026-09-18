# LIONS 칼리지 설명회 · SPEL 연구 소개 영상

1학년 대상 설명회용 무음 영상(1280×720, 24 fps, 약 85초). 노동규 교수님 자료와 같은
포맷을 따릅니다: 상단 제목, **실제 영상 × 시뮬레이션** 병렬 패널, 우측 실시간 판독 카드,
하단 한 줄 메시지, 재생 진행 바. 색·폰트는 연구실 홈페이지(`css/style.css`)의 라이트 테마
토큰(ink #191d26, accent #3452e0, 스펙트럼 그라데이션, Pretendard)을 그대로 씁니다.

## 구성 (타임라인)

| 시간 | 장면 | 실제 영상 | 시뮬레이션 / 시각화 |
|---|---|---|---|
| 0:00–0:07 | 연구실 소개 (로고 · LIGHT/ENERGY/MOTION/INTELLIGENCE · 저널 표지) | – | – |
| 0:07–0:19 | CLCE 원리: 당기면 색이 변하는 고무 | (합성 애니메이션) | 나선 피치 ↓ → λ = n·P ↓, 반사 스펙트럼 |
| 0:19–0:33 | 다중 픽셀 광소자 | Adv. Mater. 2023 보충 영상 3 (실험) | 픽셀별 설계 계수 → 국소 변형률 → 색 |
| 0:33–0:47 | 광 암호화 / 광학 위장 | Adv. Mater. 2023 보충 영상 10 (카멜레온) | 두께 제어 단면도, 적외선 → 가시광 진입 |
| 0:47–1:03 | 수치해석 · 시뮬레이션 · AI 설계 | 보충 영상 3 (FEM), 색→변형률 복원 검증 영상 | FDTD / FEA / ML 도구 카드 |
| 1:03–1:19 | CLCE 바이오 센서 | CLCE_tracking (MATLAB CIE 색 추적), ACS AMI 2023 보충 영상 S3 (손가락 섬유 센서, 색+저항) | 변형률 시간 기록 (클립 굽힘 주기에 동기화) |
| 1:19–1:24 | 마무리 (Join us · spel.hanyang.ac.kr) | – | – |

## 파일

- `index.html` – 영상 본체. 브라우저로 열면 자동 재생 미리보기, 렌더러가 `window.seek(t)`로 프레임 단위 구동.
  타임라인은 상단 `SCENES`, 클립 재생 설정은 `CLIPS`에서 수정.
- `prepare-clips.sh` – `clips/src/*.mp4`를 크롭·리사이즈해 JPEG 프레임 시퀀스(`clips/<name>/f0001.jpg…`)로 추출.
  브라우저 코덱에 의존하지 않고 프레임을 정확히 동기화하기 위한 방식.
- `render.mjs` – Playwright(Chromium)로 프레임을 캡처하고 ffmpeg로 MP4 인코딩.
- `clips/src/` – 원본 클립. `wearable-joint.mp4`는 외부 논문 보충 영상(ACS Appl. Mater. Interfaces 15, 16063 (2023), SI Video S3)이므로 화면 하단에 출처를 표기함.

## 다시 렌더링하기

```bash
cd lions-video
./prepare-clips.sh                     # 클립을 바꾸거나 크롭을 수정했을 때만
NODE_PATH=$(npm root -g) node render.mjs            # → out/spel-lions.mp4
NODE_PATH=$(npm root -g) node render.mjs --stills 5,30   # 특정 시점 정지 화면만
```

요구 사항: Node 18+, `npm i -g playwright && npx playwright install chromium`, `ffmpeg`
(다른 경로면 `FFMPEG=/path/to/ffmpeg`). 폰트는 Pretendard(`npm pack pretendard` → `dist/web/static`의
`pretendard-dynamic-subset.css`와 `woff2-dynamic-subset/`를 `fonts/pretendard/`에 두고 css 이름을
`pretendard.css`로) 를 우선 쓰고, 없으면 Noto Sans KR(`fonts/nskr.css`) → 시스템 폰트 순으로 대체합니다.

## 클립 교체 방법

1. 새 mp4를 `clips/src/`에 넣고 `prepare-clips.sh`에 한 줄 추가(크롭/스케일은 패널 크기에 맞춤:
   세로 패널 392×498, 가로 패널 600×400 등).
2. `index.html`의 `CLIPS`에 `{ dir, fps, count, speed, loop }`를 등록하고,
   해당 장면의 `<img class="clip" id="…">` 크기를 맞춤.
3. 장면 애니메이션(변형률 곡선 `strain2`, `strain3` 등)은 클립의 인장·이완 타이밍에 맞춰 조정.
