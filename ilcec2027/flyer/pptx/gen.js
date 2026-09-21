// ILCEC 2027 First Announcement – two-page (front / back) A4 flyer as an editable PPTX.
// Usage: node gen.js <output.pptx>   then   python3 fixph.py <output.pptx>
const pptxgen = require("pptxgenjs");
const path = require("path");

const OUT = process.argv[2] || "ILCEC_2027_First_Announcement_DRAFT.pptx";
const HERE = __dirname;

// ---- palette ----
const NAVY = "1B2450", NAVY2 = "2C3A7A", INK = "262B3D", MUTED = "5B6079";
const ACCENT = "D8432F", LINE = "CFD4EA", SLOT = "E3E6F4", WHITE = "FFFFFF";
const FONT = "Arial";

const pres = new pptxgen();
pres.defineLayout({ name: "A4P", width: 8.27, height: 11.69 });
pres.layout = "A4P";
pres.author = "ILCEC 2027 Organizing Committee";
pres.title = "ILCEC 2027 First Announcement (draft)";

// ---- geometry (inches) ----
const M = 0.47;                 // page margin (12 mm)
const W = 8.27 - 2 * M;         // content width
const COL_W = 3.52, COL_GAP = W - 2 * COL_W;
const LX = M, RX = M + COL_W + COL_GAP;
const HERO_H1 = 1.9, HERO_H2 = 1.58;

// Picture placeholders live on the layout so the user can click-to-insert / right-click → Change Picture.
pres.defineSlideMaster({
  title: "FRONT",
  background: { color: WHITE },
  objects: [
    { placeholder: { options: { name: "hero", type: "pic", x: M, y: 0.43, w: W, h: HERO_H1 } } },
    { placeholder: { options: { name: "photo1", type: "pic", x: LX, y: 7.62, w: COL_W, h: 1.28 } } },
    { placeholder: { options: { name: "photo2", type: "pic", x: LX, y: 8.98, w: COL_W, h: 0.96 } } },
    { placeholder: { options: { name: "photo3", type: "pic", x: RX, y: 9.18, w: 1.71, h: 0.76 } } },
    { placeholder: { options: { name: "photo4", type: "pic", x: RX + 1.81, y: 9.18, w: 1.71, h: 0.76 } } },
  ],
});
pres.defineSlideMaster({
  title: "BACK",
  background: { color: WHITE },
  objects: [
    { placeholder: { options: { name: "hero", type: "pic", x: M, y: 0.43, w: W, h: HERO_H2 } } },
    { placeholder: { options: { name: "photo1", type: "pic", x: LX, y: 8.55, w: COL_W, h: 1.4 } } },
  ],
});

// ---- helpers ----
const tbd = (label) => ({ text: `[${label}]`, options: { color: ACCENT, bold: true } });
const B = (t) => ({ text: t, options: { bold: true, color: NAVY } });
const T = (t) => ({ text: t });
const BR = { text: "", options: { breakLine: true } };
const nl = (t) => ({ text: t, options: { breakLine: true } });

function H(slide, text, x, y, w) {
  slide.addText(text, { x, y, w, h: 0.22, fontFace: FONT, fontSize: 8.6, bold: true, color: ACCENT, margin: 0, isTextBox: true, valign: "top" });
}
function P(slide, runs, x, y, w, h, opts = {}) {
  slide.addText(runs, Object.assign({ x, y, w, h, fontFace: FONT, fontSize: 7.6, color: INK, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 2 }, opts));
}
function photoSlot(slide, x, y, w, h, title, sub, key) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.06, fill: { color: SLOT }, line: { color: LINE, width: 0.5, dashType: "dash" } });
  slide.addText([
    { text: title, options: { bold: true, color: NAVY, fontSize: 7.6, breakLine: true } },
    { text: sub, options: { color: MUTED, fontSize: 6.4, breakLine: true } },
    { text: key, options: { color: ACCENT, fontSize: 6.2, bold: true } },
  ], { x: x + 0.08, y, w: w - 0.16, h, fontFace: FONT, margin: 0, isTextBox: true, valign: "bottom", paraSpaceAfter: 1 });
  slide.addText("Click the picture icon to insert a photo", { x: x + 0.08, y: y + 0.05, w: w - 0.16, h: 0.18, fontFace: FONT, fontSize: 6, italic: true, color: MUTED, margin: 0, isTextBox: true, valign: "top" });
}

function header(slide, heroH) {
  const bottom = 0.43 + heroH;
  slide.addImage({ placeholder: "hero", path: path.join(HERE, "hero.png"), x: M, y: 0.43, w: W, h: heroH });
  slide.addText("SEOUL  ·  KOREA  ·  2027", {
    x: M + 0.18, y: bottom - 0.33, w: 2.1, h: 0.25, fontFace: FONT, fontSize: 8, bold: true, color: WHITE, charSpacing: 3,
    margin: [0, 6, 0, 6], isTextBox: true, valign: "middle", fill: { color: NAVY, transparency: 45 }, line: { color: WHITE, width: 0.5, transparency: 45 },
  });
  slide.addImage({ path: path.join(HERE, "motif.png"), x: 6.55, y: 0.02, w: 1.55, h: 1.55 });
  slide.addImage({ path: path.join(HERE, "motif2.png"), x: 5.08, y: bottom - 0.21, w: 0.55, h: 0.55 });

  const ty = bottom + 0.17;
  slide.addText("International Liquid Crystal\nElastomer Conference", {
    x: M, y: ty, w: 4.75, h: 0.95, fontFace: FONT, fontSize: 25, bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "bottom", lineSpacingMultiple: 0.95,
  });
  slide.addText([
    { text: "ILCEC 2027", options: { fontSize: 15, bold: true, color: ACCENT, breakLine: true } },
    { text: "on ", options: { fontSize: 10.5, bold: true, color: NAVY2 } },
    { text: "[DD–DD Month 2027]", options: { fontSize: 10.5, bold: true, color: ACCENT, breakLine: true } },
    { text: "in Seoul, Republic of Korea", options: { fontSize: 10.5, bold: true, color: NAVY2 } },
  ], { x: 5.62, y: ty, w: 2.25, h: 0.95, fontFace: FONT, margin: 0, isTextBox: true, valign: "bottom", lineSpacingMultiple: 1.1 });

  // DRAFT tag (delete for the final version)
  slide.addText("DRAFT · TBD", {
    x: 6.75, y: 0.05, w: 1.15, h: 0.24, fontFace: FONT, fontSize: 7.5, bold: true, color: WHITE, charSpacing: 2, align: "center", valign: "middle",
    fill: { color: ACCENT }, margin: 0, isTextBox: true,
  });
  return ty + 0.95;
}

function intro(slide, y, size, h) {
  slide.addText([
    T("The International Liquid Crystal Elastomer Conference (ILCEC) will be held in "),
    B("2027 at the Royal Hotel Seoul, Myeongdong"),
    T(", in the heart of Seoul, Republic of Korea. Following ILCEC 2025 in Tampere, ILCEC 2027 will bring together chemists, physicists and engineers to share fundamental advances and application opportunities for this exciting class of materials. The conference will cover, but is not limited to, dynamic and multiresponsive LCEs, soft mechanics and actuation, 4D printing, feedback-driven and autonomous motion, tunable photonics, and novel behaviour and functions of LCEs. Contributions on related stimuli-responsive soft materials are also welcome. We hope you will consider joining us in Seoul!"),
  ], { x: M, y, w: W, h, fontFace: FONT, fontSize: size, color: NAVY2, margin: 0, isTextBox: true, valign: "top", lineSpacingMultiple: 1.12 });
  return y + h;
}

function footer(slide) {
  slide.addShape(pres.shapes.LINE, { x: M, y: 10.12, w: W, h: 0, line: { color: LINE, width: 0.75 } });
  ["Host institution logo", "Society / sponsor logo", "Seoul CVB / KTO logo"].forEach((t, i) => {
    const x = M + i * 1.12;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 10.24, w: 1.02, h: 0.38, rectRadius: 0.04, fill: { color: WHITE }, line: { color: LINE, width: 0.75, dashType: "dash" } });
    slide.addText(t, { x, y: 10.24, w: 1.02, h: 0.38, fontFace: FONT, fontSize: 6.2, color: MUTED, align: "center", valign: "middle", margin: 0, isTextBox: true });
  });
  slide.addText([
    { text: "Photo credits: ", options: { bold: true, color: NAVY2 } },
    { text: "© Korea Tourism Organization Photo Korea – photographer name (fill in when images are inserted).", options: { breakLine: true } },
    { text: "Skyline illustration: ILCEC 2027 organizing committee." },
  ], { x: 4.3, y: 10.2, w: 3.5, h: 0.46, fontFace: FONT, fontSize: 6.1, color: MUTED, align: "right", valign: "middle", margin: 0, isTextBox: true });
}

// shared right-column blocks
function chairs(slide, y) {
  H(slide, "Chairs", LX, y, COL_W);
  P(slide, [tbd("Chair name"), T(", "), tbd("Affiliation"), BR, tbd("Co-chair name"), T(", "), tbd("Affiliation")], LX, y + 0.22, COL_W, 0.34);
  return y + 0.62;
}
function contact(slide, y) {
  H(slide, "Contact", LX, y, COL_W);
  P(slide, [tbd("Coordinator name"), T(", conference coordinator"), BR, { text: "[ilcec2027@___.ac.kr]", options: { bold: true, color: ACCENT } }], LX, y + 0.22, COL_W, 0.34);
  return y + 0.62;
}
function venueBlocks(slide, y) {
  H(slide, "Venue", RX, y, COL_W);
  P(slide, [T("The conference takes place at the "), B("Royal Hotel Seoul"), T(" (61 Myeongdong-gil, Jung-gu) in the heart of Myeongdong, Seoul's most vibrant shopping and dining district, next to Myeongdong Cathedral and a few minutes' walk from Myeongdong and Euljiro 1-ga subway stations. Seoul is a city of 10 million where 600-year-old royal palaces and hanok villages sit beside a global hub of semiconductor, display and soft-materials research. Gyeongbokgung Palace, Bukchon Hanok Village, Namsan and the Cheonggyecheon stream are all within easy reach of the venue.")], RX, y + 0.22, COL_W, 1.2);
  y += 1.46;
  H(slide, "Getting there", RX, y, COL_W);
  P(slide, [T("Incheon International Airport (ICN) is linked to Seoul Station by the AREX express train (about 45 min); the venue is then one subway stop or a 10-minute taxi ride away.")], RX, y + 0.22, COL_W, 0.42);
  y += 0.66;
  H(slide, "Accommodation", RX, y, COL_W);
  P(slide, [T("A block of rooms at a conference rate will be pre-reserved at the Royal Hotel Seoul. Myeongdong offers a very wide range of hotels and guesthouses at every price level within walking distance of the venue; details will follow in the 2nd announcement.")], RX, y + 0.22, COL_W, 0.55);
  y += 0.78;
  slide.addText([
    { text: "Social program ", options: { bold: true, color: ACCENT, fontSize: 8.6 } },
    { text: "(tentative)", options: { bold: true, color: MUTED, fontSize: 7 } },
  ], { x: RX, y, w: COL_W, h: 0.22, fontFace: FONT, margin: 0, isTextBox: true, valign: "top" });
  P(slide, [
    B("Welcome reception"), T(" on "), tbd("Day 1"), BR,
    nl("Welcome reception at the conference hotel on the first evening."),
    B("Conference dinner"), T(" on "), tbd("Day 3"), BR,
    nl("Korean banquet in the city centre with a traditional performance."),
    B("Cultural afternoon"), T(" on "), tbd("Day 4"), BR,
    T("Gyeongbokgung Palace and Bukchon Hanok Village, or a Han River evening cruise."),
  ], RX, y + 0.22, COL_W, 1.1, { paraSpaceAfter: 1 });
  return y + 1.36;
}

// ================= PAGE 1 – FRONT =================
{
  const s = pres.addSlide({ masterName: "FRONT" });
  let y = header(s, HERO_H1);
  y = intro(s, y + 0.17, 8.6, 1.1);
  y += 0.18;
  const top = y;

  // left column
  y = chairs(s, top);
  y = contact(s, y);
  H(s, "Important dates", LX, y, COL_W);
  ["2nd announcement with keynote speakers and key dates", "Abstract submission opens", "Abstract submission deadline", "Early-bird registration deadline"]
    .forEach((t, i) => {
      const yy = y + 0.22 + i * 0.16;
      P(s, [tbd("TBD")], LX, yy, 0.7, 0.16);
      P(s, [T(t)], LX + 0.75, yy, COL_W - 0.75, 0.16);
    });
  photoSlot(s, LX, 7.62, COL_W, 1.28, "Myeongdong at night", "Street-level view of the Myeongdong shopping district, a short walk from the venue.", "Photo Korea search: 명동 야경");
  photoSlot(s, LX, 8.98, COL_W, 0.96, "Namsan & N Seoul Tower", "City view from Namsan, 20 min on foot or by cable car from Myeongdong.", "Search: 남산 서울타워 야경");

  // right column
  venueBlocks(s, top);
  photoSlot(s, RX, 9.18, 1.71, 0.76, "Gyeongbokgung Palace", "Royal palace, 15 min from Myeongdong.", "Search: 경복궁 근정전");
  photoSlot(s, RX + 1.81, 9.18, 1.71, 0.76, "Han River at dusk", "Banpo Bridge fountain / river cruise.", "Search: 한강 반포대교 야경");

  footer(s);
  s.addNotes(
    "ILCEC 2027 First Announcement – FRONT page (draft).\n" +
    "Replace every red [bracketed] item. Click the empty picture icons to insert photos (Photo Korea, phoko.visitkorea.or.kr, KOGL type 1, credit required). " +
    "Right-click the top illustration → Change Picture to swap in a Seoul panorama. Delete the red DRAFT tag before release."
  );
}

// ================= PAGE 2 – BACK =================
{
  const s = pres.addSlide({ masterName: "BACK" });
  let y = header(s, HERO_H2);
  y = intro(s, y + 0.13, 9.3, 1.16);
  y += 0.13;
  const top = y;

  // left column
  y = chairs(s, top);
  H(s, "Organizing committee", LX, y, COL_W);
  P(s, [tbd("Member"), T(", "), tbd("Affiliation"), BR, tbd("Member"), T(", "), tbd("Affiliation"), BR, tbd("Member"), T(", "), tbd("Affiliation")], LX, y + 0.22, COL_W, 0.48);
  y += 0.76;
  H(s, "International program committee", LX, y, COL_W);
  const ipc = [];
  for (let i = 0; i < 6; i++) { ipc.push(tbd("Member"), T(", "), tbd("Affiliation, Country")); if (i < 5) ipc.push(BR); }
  P(s, ipc, LX, y + 0.22, COL_W, 0.94);
  y += 1.22;
  y = contact(s, y);
  H(s, "Webpage", LX, y, COL_W);
  P(s, [{ text: "[https://ilcec2027.___]", options: { bold: true, color: ACCENT, underline: true } }], LX, y + 0.22, COL_W, 0.2);
  photoSlot(s, LX, 8.55, COL_W, 1.4, "Bukchon Hanok Village", "Traditional hanok quarter between Gyeongbokgung and Changdeokgung palaces.", "Search: 북촌한옥마을");

  // right column
  y = venueBlocks(s, top);
  H(s, "Topics", RX, y, COL_W);
  P(s, [
    nl("· Synthesis, alignment and processing of LCEs and LC networks"),
    nl("· Photo-, thermo-, electro- and magneto-actuation; soft robotics"),
    nl("· Soft mechanics, instabilities, defects and topology"),
    nl("· 4D printing and microfabrication"),
    nl("· Feedback-driven, autonomous and self-oscillating motion"),
    nl("· Tunable photonics, stretchable and wearable devices"),
    T("· Theory, modelling and data-driven design"),
  ], RX, y + 0.22, COL_W, 0.96, { paraSpaceAfter: 1 });

  footer(s);
  s.addNotes("ILCEC 2027 First Announcement – BACK page (draft). Committee lists, webpage, venue details and topics. Same editing rules as the front page.");
}

pres.writeFile({ fileName: OUT }).then((f) => console.log("wrote", f));
