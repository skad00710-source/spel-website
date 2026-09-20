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

// picture placeholders live on the master so the user can click-to-replace
pres.defineSlideMaster({
  title: "FLYER",
  background: { color: WHITE },
  objects: [
    { placeholder: { options: { name: "hero", type: "pic", x: M, y: 0.43, w: W, h: 1.9 } } },
    { placeholder: { options: { name: "photo1", type: "pic", x: LX, y: 8.62, w: COL_W, h: 1.32 } } },
    { placeholder: { options: { name: "photo2", type: "pic", x: RX, y: 9.18, w: 1.71, h: 0.76 } } },
    { placeholder: { options: { name: "photo3", type: "pic", x: RX + 1.81, y: 9.18, w: 1.71, h: 0.76 } } },
  ],
});

const slide = pres.addSlide({ masterName: "FLYER" });

// ---- helpers ----
const tbd = (label) => ({ text: `[${label}]`, options: { color: ACCENT, bold: true } });
const H = (text, x, y, w) => slide.addText(text, {
  x, y, w, h: 0.22, fontFace: FONT, fontSize: 8.6, bold: true, color: ACCENT, margin: 0, isTextBox: true, valign: "top",
});
const P = (runs, x, y, w, h, opts = {}) => slide.addText(runs, Object.assign({
  x, y, w, h, fontFace: FONT, fontSize: 7.6, color: INK, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 2,
}, opts));
const B = (t) => ({ text: t, options: { bold: true, color: NAVY } });
const T = (t) => ({ text: t });
const BR = { text: "", options: { breakLine: true } };
const nl = (t) => ({ text: t, options: { breakLine: true } });

// ---- hero: illustration in the picture placeholder (right-click → Change Picture to swap) ----
slide.addImage({ placeholder: "hero", path: path.join(HERE, "hero.png"), x: M, y: 0.43, w: W, h: 1.9 });
slide.addText("SEOUL  ·  KOREA  ·  2027", {
  x: M + 0.18, y: 2.0, w: 2.1, h: 0.25, fontFace: FONT, fontSize: 8, bold: true, color: WHITE, charSpacing: 3,
  margin: [0, 6, 0, 6], isTextBox: true, valign: "middle", fill: { color: NAVY, transparency: 45 }, line: { color: WHITE, width: 0.5, transparency: 45 },
});
// nematic director-field motifs
slide.addImage({ path: path.join(HERE, "motif.png"), x: 6.55, y: 0.02, w: 1.55, h: 1.55 });
slide.addImage({ path: path.join(HERE, "motif2.png"), x: 5.08, y: 2.12, w: 0.55, h: 0.55 });

// ---- title ----
slide.addText("International Liquid Crystal\nElastomer Conference", {
  x: M, y: 2.5, w: 4.75, h: 0.95, fontFace: FONT, fontSize: 25, bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "bottom", lineSpacingMultiple: 0.95,
});
slide.addText([
  { text: "ILCEC 2027", options: { fontSize: 15, bold: true, color: ACCENT, breakLine: true } },
  { text: "on ", options: { fontSize: 10.5, bold: true, color: NAVY2 } },
  { text: "[DD–DD Month 2027]", options: { fontSize: 10.5, bold: true, color: ACCENT, breakLine: true } },
  { text: "in Seoul, Republic of Korea", options: { fontSize: 10.5, bold: true, color: NAVY2 } },
], { x: 5.62, y: 2.5, w: 2.25, h: 0.95, fontFace: FONT, margin: 0, isTextBox: true, valign: "bottom", lineSpacingMultiple: 1.1 });

// ---- intro ----
slide.addText([
  T("The International Liquid Crystal Elastomer Conference (ILCEC) will be held in "),
  B("2027 at the Royal Hotel Seoul, Myeongdong"),
  T(", in the heart of Seoul, Republic of Korea. Following ILCEC 2025 in Tampere, ILCEC 2027 will bring together chemists, physicists and engineers to share fundamental advances and application opportunities for this exciting class of materials. The conference will cover, but is not limited to, dynamic and multiresponsive LCEs, soft mechanics and actuation, 4D printing, feedback-driven and autonomous motion, tunable photonics, and novel behaviour and functions of LCEs. Contributions on related stimuli-responsive soft materials are also welcome. We hope you will consider joining us in Seoul!"),
], { x: M, y: 3.62, w: W, h: 1.1, fontFace: FONT, fontSize: 8.6, color: NAVY2, margin: 0, isTextBox: true, valign: "top", lineSpacingMultiple: 1.12 });

// ================= LEFT COLUMN =================
let y = 4.9;
H("Chairs", LX, y, COL_W);
P([tbd("Chair name"), T(", "), tbd("Affiliation"), BR, tbd("Co-chair name"), T(", "), tbd("Affiliation")], LX, y + 0.22, COL_W, 0.34);

y = 5.52;
H("Organizing committee", LX, y, COL_W);
P([tbd("Member"), T(", "), tbd("Affiliation"), BR, tbd("Member"), T(", "), tbd("Affiliation"), BR, tbd("Member"), T(", "), tbd("Affiliation")], LX, y + 0.22, COL_W, 0.48);

y = 6.28;
H("International program committee", LX, y, COL_W);
P([T("To be announced with the 2nd announcement.")], LX, y + 0.22, COL_W, 0.2);

y = 6.76;
H("Contact", LX, y, COL_W);
P([tbd("Coordinator name"), T(", conference coordinator"), BR, { text: "[ilcec2027@___.ac.kr]", options: { bold: true, color: ACCENT } }], LX, y + 0.22, COL_W, 0.34);

y = 7.38;
H("Webpage", LX, y, COL_W);
P([{ text: "[https://ilcec2027.___]", options: { bold: true, color: ACCENT, underline: true } }], LX, y + 0.22, COL_W, 0.2);

y = 7.86;
H("Important dates", LX, y, COL_W);
[
  "2nd announcement with keynote speakers and key dates",
  "Abstract submission opens",
  "Abstract submission deadline",
  "Early-bird registration deadline",
].forEach((t, i) => {
  const yy = y + 0.22 + i * 0.16;
  P([tbd("TBD")], LX, yy, 0.7, 0.16);
  P([T(t)], LX + 0.75, yy, COL_W - 0.75, 0.16);
});

// photo slot 1 (under the empty picture placeholder)
photoSlot(LX, 8.62, COL_W, 1.32, "Myeongdong at night", "Street-level view of the Myeongdong shopping district, a short walk from the venue.", "Photo Korea search: 명동 야경");

// ================= RIGHT COLUMN =================
y = 4.9;
H("Venue", RX, y, COL_W);
P([T("The conference takes place at the "), B("Royal Hotel Seoul"), T(" (61 Myeongdong-gil, Jung-gu) in the heart of Myeongdong, Seoul's most vibrant shopping and dining district, next to Myeongdong Cathedral and a few minutes' walk from Myeongdong and Euljiro 1-ga subway stations. Seoul is a city of 10 million where 600-year-old royal palaces and hanok villages sit beside a global hub of semiconductor, display and soft-materials research. Gyeongbokgung Palace, Bukchon Hanok Village, Namsan and the Cheonggyecheon stream are all within easy reach of the venue.")], RX, y + 0.22, COL_W, 1.2);

y = 6.36;
H("Getting there", RX, y, COL_W);
P([T("Incheon International Airport (ICN) is linked to Seoul Station by the AREX express train (about 45 min); the venue is then one subway stop or a 10-minute taxi ride away.")], RX, y + 0.22, COL_W, 0.42);

y = 7.02;
H("Accommodation", RX, y, COL_W);
P([T("A block of rooms at a conference rate will be pre-reserved at the Royal Hotel Seoul. Myeongdong offers a very wide range of hotels and guesthouses at every price level within walking distance of the venue; details will follow in the 2nd announcement.")], RX, y + 0.22, COL_W, 0.55);

y = 7.8;
slide.addText([
  { text: "Social program ", options: { bold: true, color: ACCENT, fontSize: 8.6 } },
  { text: "(tentative)", options: { bold: true, color: MUTED, fontSize: 7 } },
], { x: RX, y, w: COL_W, h: 0.22, fontFace: FONT, margin: 0, isTextBox: true, valign: "top" });
P([
  B("Welcome reception"), T(" on "), tbd("Day 1"), BR,
  nl("Welcome reception at the conference hotel on the first evening."),
  B("Conference dinner"), T(" on "), tbd("Day 3"), BR,
  nl("Korean banquet in the city centre with a traditional performance."),
  B("Cultural afternoon"), T(" on "), tbd("Day 4"), BR,
  T("Gyeongbokgung Palace and Bukchon Hanok Village, or a Han River evening cruise."),
], RX, y + 0.22, COL_W, 1.1, { paraSpaceAfter: 1 });

// photo slots 2 & 3
photoSlot(RX, 9.18, 1.71, 0.76, "Gyeongbokgung Palace", "Royal palace, 15 min from Myeongdong.", "Search: 경복궁 근정전");
photoSlot(RX + 1.81, 9.18, 1.71, 0.76, "Han River at dusk", "Banpo Bridge fountain / river cruise.", "Search: 한강 반포대교 야경");

// ================= FOOTER =================
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

// DRAFT tag (delete this text box for the final version)
slide.addText("DRAFT · TBD", {
  x: 6.75, y: 0.05, w: 1.15, h: 0.24, fontFace: FONT, fontSize: 7.5, bold: true, color: WHITE, charSpacing: 2, align: "center", valign: "middle",
  fill: { color: ACCENT }, margin: 0, isTextBox: true,
});

slide.addNotes(
  "ILCEC 2027 First Announcement – draft.\n" +
  "How to use: (1) Replace every red [bracketed] item. (2) Click the empty picture icons to insert photos " +
  "(Photo Korea, phoko.visitkorea.or.kr, KOGL type 1, credit required). Right-click the top illustration → Change Picture to swap in a Seoul panorama. " +
  "(3) Delete the red DRAFT tag. (4) Export as PDF (File → Export → PDF, A4)."
);

function photoSlot(x, y, w, h, title, sub, key) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.06, fill: { color: SLOT }, line: { color: LINE, width: 0.5, dashType: "dash" } });
  slide.addText([
    { text: title, options: { bold: true, color: NAVY, fontSize: 7.6, breakLine: true } },
    { text: sub, options: { color: MUTED, fontSize: 6.4, breakLine: true } },
    { text: key, options: { color: ACCENT, fontSize: 6.2, bold: true } },
  ], { x: x + 0.08, y, w: w - 0.16, h, fontFace: FONT, margin: 0, isTextBox: true, valign: "bottom", paraSpaceAfter: 1 });
  slide.addText("Click the picture icon to insert a photo", { x: x + 0.08, y: y + 0.05, w: w - 0.16, h: 0.18, fontFace: FONT, fontSize: 6, italic: true, color: MUTED, margin: 0, isTextBox: true, valign: "top" });
}

pres.writeFile({ fileName: OUT }).then((f) => console.log("wrote", f));
