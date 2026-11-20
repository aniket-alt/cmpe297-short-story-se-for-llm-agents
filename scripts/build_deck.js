const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/9394dcd7-a052-4177-862e-788535c9858e_af87bf8b-86fd-4b12-9a1e-2a4971bf50b1/pptx/scripts/apply_theme.js");

const FIG = "/home/claude/short-story/figures";
const OUT = "/home/claude/short-story/slides/short-story-se-for-llm-agents.pptx";

const THEME = {
  name: "Agent Engineering",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "0B0B0B", lt1: "FFFFFF",
    dk2: "12284C", lt2: "F4F7FB",
    accent1: "2A78D6", accent2: "EB6834", accent3: "184F95",
    accent4: "1BAF7A", accent5: "898781", accent6: "52514E",
    hlink: "2A78D6", folHlink: "6250D6",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";            // 13.3 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.author = "CMPE 297 Short Story";
pres.title = "Software Engineering for LLM-Based Agents";
const C = pres.SchemeColor;

const W = 13.3, H = 7.5, M = 0.7;

/* ----------------------------- layouts ----------------------------- */
pres.defineSlideMaster({
  title: "TITLE_DARK",
  background: { color: THEME.colors.dk2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 2.25, w: W - 2 * M, h: 1.9,
        fontSize: 42, bold: true, color: C.background1, valign: "bottom", align: "left" }, text: " " } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 4.3, w: W - 2 * M - 1.0, h: 1.5,
        fontSize: 17, color: "CADCFC", valign: "top" }, text: " " } },
  ],
});

pres.defineSlideMaster({
  title: "SECTION",
  background: { color: THEME.colors.lt2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 2.9, w: W - 2 * M, h: 1.2,
        fontSize: 40, bold: true, color: C.text2, valign: "middle", align: "left" }, text: " " } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 4.15, w: W - 2 * M - 1.5, h: 1.0,
        fontSize: 16, color: THEME.colors.accent6, valign: "top" }, text: " " } },
  ],
});

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.45, w: W - 2 * M, h: 0.85,
        fontSize: 32, bold: true, color: C.text2, valign: "middle", align: "left" }, text: " " } },
    { text: { text: "CMPE 297 · Short Story · arXiv:2611.23260",
        options: { x: M, y: H - 0.52, w: 6.5, h: 0.3, fontSize: 10, color: THEME.colors.accent5,
          isTextBox: true, margin: 0 } } },
    { placeholder: { options: { name: "slideNumber", type: "sldNum", x: W - M - 0.6, y: H - 0.52,
        w: 0.6, h: 0.3, fontSize: 10, color: THEME.colors.accent5, align: "right" } } },
  ],
});

pres.defineSlideMaster({
  title: "FIGURE",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.4, w: W - 2 * M, h: 0.7,
        fontSize: 30, bold: true, color: C.text2, valign: "middle", align: "left" }, text: " " } },
    { text: { text: "CMPE 297 · Short Story · arXiv:2611.23260",
        options: { x: M, y: H - 0.52, w: 6.5, h: 0.3, fontSize: 10, color: THEME.colors.accent5,
          isTextBox: true, margin: 0 } } },
    { placeholder: { options: { name: "slideNumber", type: "sldNum", x: W - M - 0.6, y: H - 0.52,
        w: 0.6, h: 0.3, fontSize: 10, color: THEME.colors.accent5, align: "right" } } },
  ],
});

/* ----------------------------- helpers ----------------------------- */
let n = 0;
function card(s, x, y, w, h, fill, name) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: fill },
    objectName: name || `card${++n}`,
  });
}
function outlineCard(s, x, y, w, h, stroke, name) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.1, fill: { color: "FFFFFF" },
    line: { color: stroke, width: 1.5 }, objectName: name || `ocard${++n}`,
  });
}
function numBadge(s, x, y, label, color) {
  s.addShape(pres.shapes.OVAL, { x, y, w: 0.42, h: 0.42, fill: { color },
    line: { color }, objectName: `badge${++n}` });
  s.addText(label, { x, y, w: 0.42, h: 0.42, fontSize: 15, bold: true,
    color: "FFFFFF", align: "center", valign: "middle", isTextBox: true, margin: 0 });
}

/* ============================== SLIDES ============================== */

// 1 — Title
pres.addSection({ title: "Opening" });
let s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "Opening" });
s.addText("We taught agents to build software.\nNobody taught us to build agents.",
  { placeholder: "title" });
s.addText([
  { text: "Software Engineering for LLM-Based Agents: A Lifecycle-Oriented Survey", options: { bold: true, breakLine: true } },
  { text: "Ge, Feng, Sun, Shi, Chen, Fang, Zhao, Chen, Liu & Jin  ·  arXiv:2611.23260  ·  October 2026", options: { fontSize: 14 } },
], { placeholder: "body" });
s.addShape(pres.shapes.RECTANGLE, { x: M, y: 1.75, w: 1.1, h: 0.09,
  fill: { color: THEME.colors.accent2 }, line: { color: THEME.colors.accent2 }, objectName: "titleMark" });
s.addNotes("Opening. The title is the thesis: an enormous literature on agents FOR software engineering, almost none on software engineering FOR agents. This survey is the first systematic attempt at the second question. 355 papers, 79 pages, five lifecycle stages.");

// 2 — The paper at a glance
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Opening" });
s.addText("The paper at a glance", { placeholder: "title" });
const stats = [
  ["355", "papers in the\nmain collection"],
  ["79", "pages, 4 figures"],
  ["5", "lifecycle stages\n(RQ1–RQ5)"],
  ["10", "authors, incl.\nYang Liu & Zhi Jin"],
];
stats.forEach((st, i) => {
  const x = M + i * 3.07;
  card(s, x, 1.65, 2.8, 1.85, THEME.colors.lt2, `stat${i}`);
  s.addText(st[0], { x, y: 1.78, w: 2.8, h: 0.95, fontSize: 48, bold: true,
    color: THEME.colors.accent1, align: "center", valign: "middle", isTextBox: true, margin: 0 });
  s.addText(st[1], { x, y: 2.72, w: 2.8, h: 0.7, fontSize: 12.5, color: THEME.colors.accent6,
    align: "center", valign: "top", isTextBox: true, margin: 0 });
});
card(s, M, 3.85, W - 2 * M, 2.4, "FDF0EA", "thesisCard");
s.addText("The thesis, in one clause", { x: M + 0.35, y: 4.05, w: 8, h: 0.35, fontSize: 13,
  bold: true, color: THEME.colors.accent2, charSpacing: 1, isTextBox: true, margin: 0 });
s.addText("It treats the agent system itself as the software under development.",
  { x: M + 0.35, y: 4.45, w: W - 2 * M - 0.7, h: 0.6, fontSize: 24, bold: true,
    color: C.text2, isTextBox: true, margin: 0 });
s.addText("Not a research artifact. Not a benchmark entry. A system with stakeholders, interfaces, failure modes, an on-call rotation and a version number.",
  { x: M + 0.35, y: 5.15, w: W - 2 * M - 0.7, h: 0.8, fontSize: 14.5, color: THEME.colors.accent6,
    isTextBox: true, margin: 0 });
s.addNotes("Scale first: 355 papers, 79 pages, a strong author list — Yang Liu and Zhi Jin are very senior SE researchers. But the thing that makes this paper different is the framing clause: the agent IS the software under development. That single move changes what counts as a result.");

// 3 — The inversion
pres.addSection({ title: "The framing" });
s = pres.addSlide({ masterName: "FIGURE", sectionTitle: "The framing" });
s.addText("Two questions that sound alike", { placeholder: "title" });
s.addImage({ path: `${FIG}/fig5_inversion.png`, x: 0.95, y: 1.35, w: 11.4, h: 4.56 });
s.addNotes("Every monthly 'LLM agents for SE' paper asks the left question: can an agent fix this issue, write these tests. The system under study is YOUR codebase and the agent is the tool. This survey flips it. The system under study is the agent, and the agent is the product. Small pivot in words, large pivot in consequences.");

// 4 — Why it got urgent
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The framing" });
s.addText("Three properties that break classical SE", { placeholder: "title" });
const props = [
  ["1", "Execution varies run to run",
   "The same input does not reliably produce the same trajectory. Your test suite is sampling from a distribution, not checking a function."],
  ["2", "Failures straddle a boundary",
   "The cause may be the model's decision or the tool it called. Classical debugging assumes you can localize a fault to code. Here it may be a judgment."],
  ["3", "Accepted behaviour is fragile",
   "Change a prompt, swap a model version, let a tool interface shift — and yesterday's passing behaviour fails today, with no diff in your repo to blame."],
];
props.forEach((p, i) => {
  const y = 1.6 + i * 1.62;
  outlineCard(s, M, y, W - 2 * M, 1.4, "E1E0D9", `prop${i}`);
  numBadge(s, M + 0.35, y + 0.28, p[0], i === 2 ? THEME.colors.accent2 : THEME.colors.accent1);
  s.addText(p[1], { x: M + 1.0, y: y + 0.2, w: 10.2, h: 0.4, fontSize: 18, bold: true,
    color: C.text2, isTextBox: true, margin: 0 });
  s.addText(p[2], { x: M + 1.0, y: y + 0.63, w: 10.4, h: 0.68, fontSize: 13.5,
    color: THEME.colors.accent6, isTextBox: true, margin: 0 });
});
s.addNotes("Why this is urgent now. Public guidance for building agents is a tuning loop: pick a task, pick a design, tune prompts and tools against outcomes, latency and cost. That loop makes demos. These three properties are what the loop does not cover. The third is the one industry has least internalized — we understand 'the dependency updated and broke us', we have no model for 'the dependency is a frontier model and its disposition shifted'.");

// 5 — Taxonomy figure
pres.addSection({ title: "The taxonomy" });
s = pres.addSlide({ masterName: "FIGURE", sectionTitle: "The taxonomy" });
s.addText("The taxonomy: five stages, borrowed deliberately", { placeholder: "title" });
s.addImage({ path: `${FIG}/fig6_lifecycle.png`, x: 0.55, y: 1.55, w: 12.2, h: 4.96 });
s.addNotes("The organizing move is unglamorous and exactly right. Rather than coining five new words, they map the literature onto the lifecycle every engineer already knows: requirements, architecture and design, implementation and integration, testing and assurance, maintenance and evolution. One research question per stage, RQ1 through RQ5. A paper lands in a stage if at least one of its contributions addresses it, so papers span stages.");

// 6 — Distribution
s = pres.addSlide({ masterName: "FIGURE", sectionTitle: "The taxonomy" });
s.addText("The distribution is the finding", { placeholder: "title" });
s.addImage({ path: `${FIG}/fig1_stage_coverage.png`, x: 1.5, y: 1.3, w: 8.3, h: 4.8 });
card(s, 10.05, 1.9, 2.6, 3.4, "FDF0EA", "ratioCard");
s.addText("8:1", { x: 10.05, y: 2.25, w: 2.6, h: 1.1, fontSize: 54, bold: true,
  color: THEME.colors.accent2, align: "center", valign: "middle", isTextBox: true, margin: 0 });
s.addText("testing over\nrequirements", { x: 10.05, y: 3.35, w: 2.6, h: 0.75, fontSize: 14,
  bold: true, color: C.text2, align: "center", isTextBox: true, margin: 0 });
s.addText("We are very good at grading an exam we never quite wrote.",
  { x: 10.2, y: 4.2, w: 2.3, h: 0.95, fontSize: 12, italic: true,
    color: THEME.colors.accent6, align: "center", isTextBox: true, margin: 0 });
s.addNotes("Map 355 papers onto the five stages and you get the shape of a field's attention. Testing 215, architecture 127, implementation 76, maintenance 49, requirements 26. Roughly eight to one. The survey is honest about the caveat: these are research contributions, not what practitioners do all day — nobody publishes the requirements workshop they ran. But even discounting publication bias, the curve says something. Enormous apparatus for measuring whether agents succeed; tiny one for stating what success means.");

// 7 — Stage 1 & 2
pres.addSection({ title: "Walking the stages" });
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Walking the stages" });
s.addText("Stages 1 and 2: specify it, then shape it", { placeholder: "title" });
[[0, "1", "Requirements Engineering", "26 papers", THEME.colors.accent2,
  [["Stakeholder elicitation", "Code interview accounts into trust themes, refine with experts, map explicit requirements through to design."],
   ["Action boundaries", "Not just what it should accomplish — what it is permitted to do, and with whose authority. For an agent this is a functional requirement, not a bolt-on security concern."]]],
 [1, "2", "Architecture & Design", "127 papers", THEME.colors.accent1,
  [["Decomposition & contracts", "Responsibilities, interfaces, interaction topology, reference architectures, design patterns."],
   ["Topology as search", "Evolutionary methods where crossover inherits one parent's topology while recombining agent attributes; mutation can change the topology outright."]]],
].forEach(([i, num, name, count, col, items]) => {
  const x = M + i * 6.1;
  outlineCard(s, x, 1.55, 5.8, 4.55, "E1E0D9", `stage${i}`);
  numBadge(s, x + 0.35, 1.85, num, col);
  s.addText(name, { x: x + 0.95, y: 1.82, w: 4.6, h: 0.35, fontSize: 18, bold: true,
    color: C.text2, isTextBox: true, margin: 0 });
  s.addText(count, { x: x + 0.95, y: 2.18, w: 4.6, h: 0.3, fontSize: 13, bold: true,
    color: col, isTextBox: true, margin: 0 });
  items.forEach((it, j) => {
    const y = 2.75 + j * 1.6;
    s.addText(it[0], { x: x + 0.35, y, w: 5.1, h: 0.32, fontSize: 14.5, bold: true,
      color: col, isTextBox: true, margin: 0 });
    s.addText(it[1], { x: x + 0.35, y: y + 0.34, w: 5.1, h: 1.2, fontSize: 12.5,
      color: THEME.colors.accent6, isTextBox: true, margin: 0 });
  });
});
s.addNotes("Requirements: 26 papers for the hardest question. The agent-specific wrinkle is action boundaries — for a normal app the permission model is bolt-on, for an agent composing tool calls at runtime it determines behaviour. Architecture: this is where the field has been most inventive. The striking thread treats the architecture itself as something to search rather than design. My worry: an architecture you searched for is one nobody can explain. We traded that away once with neural nets; worth being deliberate about doing it again at the system level.");

// 8 — Stage 3
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Walking the stages" });
s.addText("Stage 3: the tool description is the API", { placeholder: "title" });
card(s, M, 1.5, W - 2 * M, 1.5, THEME.colors.dk2, "quoteCard");
s.addText("In a conventional system the interface contract is the type signature and the docstring is a courtesy.\nIn an agent system the natural-language description IS the contract.",
  { x: M + 0.45, y: 1.68, w: W - 2 * M - 0.9, h: 1.15, fontSize: 19, bold: true,
    color: "FFFFFF", valign: "middle", isTextBox: true, margin: 0 });
[["MCP issue study", "Examines issues reported against Model Context Protocol integrations. Surfaces incomplete tool descriptions and breaking integration changes as a recurring practical burden.", "Oyelayo et al., 2026"],
 ["Tool descriptions as artifact", "Treats the description itself as an integration artifact in its own right — something to review, version and test.", "Hasan et al., 2026"],
 ["EnCompass / Agent Spec", "Separate distinct implementation decisions rather than entangling them in prompt text. The agent-era version of “stop putting config in your source code.”", "discussed in §4.3"],
].forEach((it, i) => {
  const x = M + i * 4.08;
  outlineCard(s, x, 3.3, 3.8, 2.6, "E1E0D9", `ii${i}`);
  s.addText(it[0], { x: x + 0.3, y: 3.5, w: 3.2, h: 0.55, fontSize: 15, bold: true,
    color: THEME.colors.accent1, isTextBox: true, margin: 0 });
  s.addText(it[1], { x: x + 0.3, y: 4.08, w: 3.2, h: 1.45, fontSize: 12.5,
    color: THEME.colors.accent6, isTextBox: true, margin: 0 });
  s.addText(it[2], { x: x + 0.3, y: 5.52, w: 3.2, h: 0.28, fontSize: 10.5, italic: true,
    color: THEME.colors.accent5, isTextBox: true, margin: 0 });
});
s.addText("Only 76 papers — the stage where industrial pain is highest relative to research attention.",
  { x: M, y: 6.1, w: W - 2 * M, h: 0.35, fontSize: 13.5, italic: true,
    color: THEME.colors.accent2, isTextBox: true, margin: 0 });
s.addNotes("This is the part I'd put in front of any team shipping agents today. A vague tool description is not poor documentation — it is a bug in the interface, because the description is what the model reads to decide whether and how to call the tool. I have never seen a team review tool descriptions with the rigour they apply to a public API schema. They should. This is adoptable next sprint.");

// 9 — Stage 4
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Walking the stages" });
s.addText("Stage 4: four ways to test a system that improvises", { placeholder: "title" });
[["Trace-based attribution", "Locate the responsible agent and the decisive error step using annotated failure trajectories.", "Fault localization, reborn for traces", "BLACK BOX"],
 ["Constraint-guided diagnosis", "Check constraints over the trajectory and use violation evidence to identify the critical failure.", "Assertions, lifted to behaviour", "BLACK BOX"],
 ["Contract-based regression", "Separate execution from grading; assess the first attempt against a colocated evaluation contract.", "“First attempt” is the load-bearing word", "BLACK BOX"],
 ["Activation-based detection", "Detect deviations from benign activation patterns inside the model.", "The only one that opens the box", "WHITE BOX"],
].forEach((it, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * 6.1, y = 1.55 + row * 2.4;
  const isWhite = it[3] === "WHITE BOX";
  outlineCard(s, x, y, 5.8, 2.15, isWhite ? THEME.colors.accent2 : "E1E0D9", `ta${i}`);
  s.addText(it[3], { x: x + 0.3, y: y + 0.18, w: 2.2, h: 0.25, fontSize: 9.5, bold: true,
    charSpacing: 1, color: isWhite ? THEME.colors.accent2 : THEME.colors.accent5,
    isTextBox: true, margin: 0 });
  s.addText(it[0], { x: x + 0.3, y: y + 0.45, w: 5.2, h: 0.35, fontSize: 16.5, bold: true,
    color: C.text2, isTextBox: true, margin: 0 });
  s.addText(it[1], { x: x + 0.3, y: y + 0.84, w: 5.2, h: 0.75, fontSize: 12.5,
    color: THEME.colors.accent6, isTextBox: true, margin: 0 });
  s.addText(it[2], { x: x + 0.3, y: y + 1.65, w: 5.2, h: 0.3, fontSize: 12, italic: true,
    color: isWhite ? THEME.colors.accent2 : THEME.colors.accent1, isTextBox: true, margin: 0 });
});
s.addText("264 contributions — the largest stage, organized as problem → approach → key idea → representative studies.",
  { x: M, y: 6.4, w: W - 2 * M, h: 0.35, fontSize: 13, italic: true,
    color: THEME.colors.accent6, isTextBox: true, margin: 0 });
s.addNotes("Four approaches worth stealing as a menu. Note the split: three treat the agent as a black box and interrogate its trace; one opens it up. The black-box three are deployable today, the white-box one is where the interesting research is. And on contract-based regression — 'first attempt' is doing enormous work. If you let an agent retry until it passes, you have measured persistence, not capability.");

// 10 — Stage 5
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Walking the stages" });
s.addText("Stage 5: the sleeping giant", { placeholder: "title" });
card(s, M, 1.6, 5.3, 3.1, THEME.colors.lt2, "meBig");
s.addText("49", { x: M, y: 1.85, w: 5.3, h: 1.5, fontSize: 90, bold: true,
  color: THEME.colors.accent2, align: "center", valign: "middle", isTextBox: true, margin: 0 });
s.addText("papers on maintenance and evolution", { x: M, y: 3.35, w: 5.3, h: 0.45, fontSize: 16,
  bold: true, color: C.text2, align: "center", isTextBox: true, margin: 0 });
s.addText("…for the stage that, in every other kind of software,\nconsumes most of total lifetime cost.",
  { x: M + 0.3, y: 3.85, w: 4.7, h: 0.7, fontSize: 12.5, italic: true,
    color: THEME.colors.accent6, align: "center", isTextBox: true, margin: 0 });
s.addText("What the stage covers", { x: 6.5, y: 1.65, w: 6, h: 0.35, fontSize: 13, bold: true,
  charSpacing: 1, color: THEME.colors.accent1, isTextBox: true, margin: 0 });
s.addText([
  { text: "Monitoring and observability", options: { bullet: true, breakLine: true } },
  { text: "Anomaly detection", options: { bullet: true, breakLine: true } },
  { text: "Root-cause localization and resolution", options: { bullet: true, breakLine: true } },
  { text: "Incident analysis, repair, rollback", options: { bullet: true, breakLine: true } },
  { text: "Impact analysis, version management, re-validation", options: { bullet: true } },
], { x: 6.5, y: 2.1, w: 6.1, h: 2.1, fontSize: 14, color: THEME.colors.accent6,
  paraSpaceAfter: 7, isTextBox: true, margin: 0 });
card(s, 6.5, 4.35, 6.1, 1.65, "FDF0EA", "meWarn");
s.addText("The maintenance reckoning hasn't arrived yet", { x: 6.8, y: 4.5, w: 5.6, h: 0.35,
  fontSize: 14.5, bold: true, color: THEME.colors.accent2, isTextBox: true, margin: 0 });
s.addText("Every agent in production is accruing an un-studied burden: prompts drifting from the model they were tuned against, tool interfaces mutating upstream, memory stores silently accumulating stale or poisoned entries.",
  { x: 6.8, y: 4.88, w: 5.5, h: 1.0, fontSize: 12, color: THEME.colors.accent6,
    isTextBox: true, margin: 0 });
s.addNotes("Classical AIOps vocabulary applied to a system whose normal behaviour is a distribution rather than a trace. Forty-nine papers. The agent field hasn't had its maintenance reckoning because most agents are young. That will change, and the literature is not ready. The adjacent memory-security survey is already documenting attacks that live in persistent memory across sessions.");

// 11 — Leaderboard landscape
pres.addSection({ title: "The leaderboard" });
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The leaderboard" });
s.addText("What the leaderboards actually measure", { placeholder: "title" });
const rows = [
  [{ text: "Benchmark", options: { bold: true } }, { text: "What it tests", options: { bold: true } },
   { text: "Scale", options: { bold: true } }, { text: "Scoring", options: { bold: true } }],
  ["SWE-bench Verified", "Repository-level issue resolution", "500 human-filtered GitHub issues", "% resolved by test suite"],
  ["SWE-bench Pro", "Harder, broader repositories", "public + held-out splits", "resolve rate"],
  ["GAIA", "Tool-using general assistance", "466 questions, 300 held out", "answer match"],
  ["tau-bench / tau²", "Policy-bound customer-service tool use", "165 tasks (115 retail, 50 airline)", "state match, pass^k"],
  ["OSWorld", "GUI / computer use", "369 tasks on a real OS", "task success"],
  ["Terminal-Bench", "Command-line task completion", "—", "task success"],
];
s.addTable(rows, {
  x: M, y: 1.5, w: W - 2 * M, colW: [2.6, 3.7, 3.3, 2.3],
  fontSize: 12.5, fontFace: "Calibri", color: THEME.colors.accent6,
  border: { type: "solid", color: "E1E0D9", pt: 1 },
  fill: { color: "FFFFFF" }, rowH: 0.42, valign: "middle",
  margin: 0.08,
});
card(s, M, 4.75, W - 2 * M, 1.15, "FDF0EA", "lbWarn");
s.addText([
  { text: "The boards disagree with each other — and the disagreement is the interesting part.  ", options: { bold: true, color: THEME.colors.accent2 } },
  { text: "GAIA and OSWorld-Verified now sit above their published human baselines, so they no longer separate frontier agents at all.", options: { color: THEME.colors.accent6 } },
], { x: M + 0.35, y: 4.95, w: W - 2 * M - 0.7, h: 0.75, fontSize: 13, isTextBox: true, margin: 0 });
s.addNotes("Depending on which board you read and when, the top SWE-bench Verified entry sits anywhere from the high 70s to the mid 90s. The harder benchmarks are the ones still doing work — SWE-bench Pro around 61.5 percent, OSWorld 2.0 around 20. Treat all of these as point-in-time snapshots; they move weekly.");

// 12 — pass^k
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The leaderboard" });
s.addText("The metric nobody defaults to", { placeholder: "title" });
[[0, "pass@k", "Did it succeed AT LEAST ONCE in k attempts?", "Rewards a lucky explorer.", "Marketing", THEME.colors.accent5, "F4F4F2"],
 [1, "pass^k", "Did it succeed EVERY TIME across k attempts?", "Rewards a dependable system.", "The metric", THEME.colors.accent1, "EEF5FD"],
].forEach(([i, name, q, reward, verdict, col, bg]) => {
  const x = M + i * 6.1;
  card(s, x, 1.6, 5.8, 3.6, bg, `pk${i}`);
  s.addText(name, { x: x + 0.4, y: 1.85, w: 5.0, h: 0.75, fontSize: 40, bold: true,
    color: col, isTextBox: true, margin: 0 });
  s.addText(q, { x: x + 0.4, y: 2.7, w: 5.0, h: 0.75, fontSize: 15, bold: true,
    color: C.text2, isTextBox: true, margin: 0 });
  s.addText(reward, { x: x + 0.4, y: 3.5, w: 5.0, h: 0.4, fontSize: 14,
    color: THEME.colors.accent6, isTextBox: true, margin: 0 });
  s.addText(verdict, { x: x + 0.4, y: 4.35, w: 5.0, h: 0.5, fontSize: 20, bold: true,
    italic: true, color: col, isTextBox: true, margin: 0 });
});
s.addText("These measure opposite virtues. For anything you intend to deploy, pass^k is the metric and pass@k is marketing. That reliability needed a new notation — rather than being the obvious thing to report — tells you where the field's defaults were.",
  { x: M, y: 5.5, w: W - 2 * M, h: 0.9, fontSize: 14, color: THEME.colors.accent6,
    isTextBox: true, margin: 0 });
s.addNotes("tau-bench's reliability metric asks whether an agent succeeds on the SAME task across k independent attempts. Standard pass@k asks whether it succeeded at least once. Opposite virtues. Any agent you put in front of a user needs to work on Tuesday as well as it worked in the demo.");

// 13 — Harness ablation
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The leaderboard" });
s.addText("The ablation that should change how you build", { placeholder: "title" });
s.addText("A benchmark score is not a property of a model. It is a property of a model–harness pairing.",
  { x: M, y: 1.4, w: W - 2 * M, h: 0.4, fontSize: 16, bold: true, italic: true,
    color: THEME.colors.accent1, isTextBox: true, margin: 0 });
[["Structured tools", "HELPS", true], ["Task-specific subagents", "HELPS", true],
 ["Context compression", "CAN HURT", false], ["General-purpose subagents", "CAN HURT", false],
].forEach((it, i) => {
  const x = M + i * 3.07;
  const col = it[2] ? THEME.colors.accent4 : THEME.colors.accent2;
  outlineCard(s, x, 2.05, 2.8, 1.45, col, `ab${i}`);
  s.addText(it[1], { x, y: 2.22, w: 2.8, h: 0.4, fontSize: 15, bold: true, charSpacing: 1,
    color: col, align: "center", isTextBox: true, margin: 0 });
  s.addText(it[0], { x: x + 0.2, y: 2.72, w: 2.4, h: 0.7, fontSize: 15, bold: true,
    color: C.text2, align: "center", valign: "top", isTextBox: true, margin: 0 });
});
card(s, M, 4.3, W - 2 * M, 1.95, THEME.colors.dk2, "mechCard");
s.addText("The mechanism", { x: M + 0.45, y: 4.5, w: 5, h: 0.3, fontSize: 12, bold: true,
  charSpacing: 1, color: "CADCFC", isTextBox: true, margin: 0 });
s.addText("Effective harnesses regularize exploration and tool use.\nThey narrow the space rather than enriching it.",
  { x: M + 0.45, y: 4.82, w: W - 2 * M - 0.9, h: 0.75, fontSize: 19, bold: true,
    color: "FFFFFF", isTextBox: true, margin: 0 });
s.addText("The instinct when an agent underperforms is to add — another subagent, another retrieval step, another reflection pass. The additions that work are the ones that constrain.",
  { x: M + 0.45, y: 5.6, w: W - 2 * M - 0.9, h: 0.55, fontSize: 13.5, color: "CADCFC",
    isTextBox: true, margin: 0 });
s.addText("Source: Beyond the Model — Demystifying Harness Effects in SE Agents, arXiv:2609.32459. Gains are conditional on model capability and task type.",
  { x: M, y: 6.35, w: W - 2 * M, h: 0.3, fontSize: 10.5, italic: true,
    color: THEME.colors.accent5, isTextBox: true, margin: 0 });
s.addNotes("This is the single most actionable empirical result I found reading around the survey. Using a stripped-down harness as a controlled testbed, they isolate which components actually contribute. If you take one engineering lesson from this whole talk, make it this one: scaffolding is not scaffolding if it does not hold a shape.");

// 14 — Evidence audit
pres.addSection({ title: "The audit" });
s = pres.addSlide({ masterName: "FIGURE", sectionTitle: "The audit" });
s.addText("The survey's sharpest contribution: it grades the evidence", { placeholder: "title" });
s.addImage({ path: `${FIG}/fig2_evidence_levels.png`, x: 1.3, y: 1.3, w: 8.4, h: 4.85 });
card(s, 10.0, 2.0, 2.65, 3.3, "FDF0EA", "evCard");
s.addText("7%", { x: 10.0, y: 2.35, w: 2.65, h: 1.1, fontSize: 54, bold: true,
  color: THEME.colors.accent2, align: "center", valign: "middle", isTextBox: true, margin: 0 });
s.addText("of coded contributions rise above benchmark-style, task-level evaluation",
  { x: 10.2, y: 3.45, w: 2.25, h: 1.5, fontSize: 13, bold: true, color: C.text2,
    align: "center", isTextBox: true, margin: 0 });
s.addNotes("Most surveys catalogue what the literature claims. This one grades how well each claim is supported, coding contributions on an evidence scale from E1 up to E4 where higher means stronger. 464 at E2. Fourteen at E3. Twenty-three at E4. Thirty-seven out of 501 above benchmark-style evaluation.");

// 15 — Per-stage evidence
s = pres.addSlide({ masterName: "FIGURE", sectionTitle: "The audit" });
s.addText("Near-universal evaluation, near-absent rigour", { placeholder: "title" });
s.addImage({ path: `${FIG}/fig3_evaluation_funnel.png`, x: 1.1, y: 1.25, w: 8.0, h: 4.6 });
[["230 of 264", "testing contributions stop at E2"],
 ["0 of 26", "requirements contributions reach E4"],
 ["11 of 26", "requirements contributions ship a fetchable artifact"],
].forEach((it, i) => {
  const y = 1.5 + i * 1.55;
  card(s, 9.4, y, 3.25, 1.3, THEME.colors.lt2, `pe${i}`);
  s.addText(it[0], { x: 9.6, y: y + 0.15, w: 2.9, h: 0.45, fontSize: 21, bold: true,
    color: THEME.colors.accent1, isTextBox: true, margin: 0 });
  s.addText(it[1], { x: 9.6, y: y + 0.62, w: 2.9, h: 0.6, fontSize: 12,
    color: THEME.colors.accent6, isTextBox: true, margin: 0 });
});
s.addNotes("Almost every paper runs its method on a benchmark — excellent hygiene. Almost no paper runs a controlled comparison, and vanishingly few observe anything in the field over time. We have built a culture where 'we evaluated it' means 'we got a number on a task set'. Reasonable for a three-year-old field. Terrible for a field whose output is being deployed with tool access and action authority.");

// 16 — Two cents
pres.addSection({ title: "My read" });
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "My read" });
s.addText("My two cents", { placeholder: "title" });
[["The counts argue against the field's own priorities", "8:1 testing over requirements, in a domain whose central difficulty is that nobody can say precisely what correct behaviour is. We are optimizing the measurement of an underspecified target."],
 ["“Tool descriptions are an integration artifact” is free to adopt", "Put them in code review. Version them. Test that the description matches the implementation's actual contract. Next sprint, not next year."],
 ["Architecture search needs a governance answer first", "Evolved topologies will beat hand-designed ones. But “we searched for it” is not an answer to “why did it do that” — and agent systems are exactly the ones auditors will ask about."],
 ["Maintenance is the sleeping giant", "49 papers. Every deployed agent is accruing drift in prompts, tool interfaces and memory stores. The reckoning is coming and the literature is behind it."],
].forEach((it, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * 6.1, y = 1.6 + row * 2.4;
  outlineCard(s, x, y, 5.8, 2.15, "E1E0D9", `tc${i}`);
  numBadge(s, x + 0.32, y + 0.25, String(i + 1), THEME.colors.accent2);
  s.addText(it[0], { x: x + 0.95, y: y + 0.2, w: 4.6, h: 0.75, fontSize: 15.5, bold: true,
    color: C.text2, isTextBox: true, margin: 0 });
  s.addText(it[1], { x: x + 0.35, y: y + 1.05, w: 5.1, h: 0.95, fontSize: 12.5,
    color: THEME.colors.accent6, isTextBox: true, margin: 0 });
});
s.addNotes("Four opinions. On the fourth — the memory-security literature is already documenting attacks that persist across sessions in agent memory, which is a maintenance problem wearing a security costume. Also worth defending the survey against an obvious criticism: someone will say a lifecycle framing is conservative. I think that gets it backwards. The lifecycle isn't a claim about what agents ARE; it's a checklist of what every deployed system eventually NEEDS. The gaps are visible precisely because somebody insisted on counting all five stages.");

// 17 — What's next
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "My read" });
s.addText("Three studies this survey makes obviously necessary", { placeholder: "title" });
[["A longitudinal study of a production agent", "Six months, one real system. Every prompt change, model upgrade and tool-interface break logged, with behaviour re-validated after each.", "Would produce more E4 evidence than the entire current corpus contains."],
 ["A requirements notation for action boundaries", "Between a permission manifest and a behavioural spec: expressive enough to state “may read these, may write those only on confirmation, may never do that”.", "And checkable against a trace."],
 ["An honest harness-controlled leaderboard", "Fix the scaffolding, vary the model. Then fix the model, vary the scaffolding. Report both axes.", "Until this exists, every headline agent number is confounded."],
].forEach((it, i) => {
  const y = 1.6 + i * 1.65;
  outlineCard(s, M, y, W - 2 * M, 1.45, "E1E0D9", `nx${i}`);
  numBadge(s, M + 0.35, y + 0.3, String(i + 1), THEME.colors.accent1);
  s.addText(it[0], { x: M + 1.0, y: y + 0.17, w: 7.0, h: 0.4, fontSize: 17, bold: true,
    color: C.text2, isTextBox: true, margin: 0 });
  s.addText(it[1], { x: M + 1.0, y: y + 0.6, w: 7.0, h: 0.7, fontSize: 12.5,
    color: THEME.colors.accent6, isTextBox: true, margin: 0 });
  s.addText(it[2], { x: M + 8.4, y: y + 0.42, w: 3.2, h: 0.75, fontSize: 12.5, italic: true,
    bold: true, color: THEME.colors.accent2, isTextBox: true, margin: 0 });
});
s.addNotes("Three concrete gaps. The first is the one I'd fund — a single six-month longitudinal study of one production agent would move the evidence distribution more than another fifty benchmark papers.");

// 18 — Close
pres.addSection({ title: "Close" });
s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "Close" });
s.addText("The leaderboards are climbing fast.\nThe scaffolding underneath them\nis thinner than it looks.", { placeholder: "title" });
s.addText([
  { text: "A strong survey tells you what a field knows. An unusually strong one tells you how well it knows it.", options: { italic: true, breakLine: true } },
  { text: "arXiv:2611.23260  ·  Article, slides and sources in the GitHub repo", options: { fontSize: 13 } },
], { placeholder: "body" });
s.addShape(pres.shapes.RECTANGLE, { x: M, y: 1.45, w: 1.1, h: 0.09,
  fill: { color: THEME.colors.accent2 }, line: { color: THEME.colors.accent2 }, objectName: "closeMark" });
s.addNotes("Closing. 37 contributions above E2 out of 501. We know a great deal about measuring agents on tasks, considerably less about specifying them, and almost nothing that would survive contact with an evidence standard borrowed from a mature engineering discipline. Worth knowing which one you're standing on. Thank you.");

/* ----------------------------- write ----------------------------- */
(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("deck written:", OUT);
})();
