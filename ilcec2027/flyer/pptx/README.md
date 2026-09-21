# PPTX 버전 다시 만들기

`../../ILCEC_2027_First_Announcement_DRAFT.pptx`는 이 폴더의 `gen.js`(pptxgenjs)로 생성하고 `fixph.py`로 마무리합니다.

```bash
cd ilcec2027/flyer/pptx
npm install pptxgenjs
node gen.js ../../ILCEC_2027_First_Announcement_DRAFT.pptx
python3 fixph.py ../../ILCEC_2027_First_Announcement_DRAFT.pptx   # 사진 자리를 그림 개체 틀로 표시 + 사진 모서리 둥글게
```

## 글꼴 (중요)

PPT는 PDF와 같은 **Manrope(제목·소제목)** 와 **Inter(본문)** 글꼴을 씁니다. 두 글꼴이 설치되어 있지 않은 PC에서는
PowerPoint가 다른 글꼴로 바꿔 보여 줄바꿈이 달라집니다. `fonts/` 폴더의 TTF 4개를 더블클릭해 설치한 뒤 PPT를 여세요
(둘 다 SIL Open Font License, 무료·상업용 가능). Google Fonts에서도 같은 글꼴을 받을 수 있습니다.

- `fonts/Manrope-Regular.ttf`, `fonts/Manrope-Bold.ttf`
- `fonts/Inter-Regular.ttf`, `fonts/Inter-Bold.ttf`

## 파일 설명

- `photos/` : 각 사진 자리 비율에 맞춰 미리 자른 사진 (PowerPoint는 사진을 칸에 맞춰 늘리므로 비율이 맞아야 함)
- `wash.jpg` : 페이지 모서리의 옅은 색 번짐 배경
- `motif.png`, `motif2.png` : 네마틱 디렉터 필드 장식 (투명 배경)

## PowerPoint에서 직접 고칠 때

1. 빨간 글씨(연분홍 바탕) 항목을 실제 값으로 바꿉니다.
2. 사진은 우클릭 → 그림 바꾸기로 포토코리아 원본(고해상도)으로 교체합니다.
3. 우상단 빨간 DRAFT 리본 상자를 삭제합니다.
4. 파일 → 내보내기 → PDF (A4)로 저장합니다.
