# PPTX 버전 다시 만들기

`../../ILCEC_2027_First_Announcement_DRAFT.pptx`는 이 폴더의 `gen.js`(pptxgenjs)로 생성합니다.

```bash
cd ilcec2027/flyer/pptx
npm install pptxgenjs
node gen.js ../../ILCEC_2027_First_Announcement_DRAFT.pptx
python3 fixph.py ../../ILCEC_2027_First_Announcement_DRAFT.pptx   # 사진 자리를 그림 개체 틀(picture placeholder)로 표시
```

- `hero.png` : 상단 스카이라인 일러스트 (`../index.html`의 SVG를 2400×792로 렌더링한 것)
- `motif.png`, `motif2.png` : 네마틱 디렉터 필드 장식 (투명 배경)

PowerPoint에서 직접 고칠 때는 파일을 열어 빨간 대괄호 항목을 바꾸고,
사진 자리의 그림 아이콘을 눌러 사진을 넣은 뒤, 우상단 DRAFT 태그를 지우면 됩니다.
