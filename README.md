# Short Story — Software Engineering for LLM-Based Agents

**CMPE 297 · Short Story Assignment (individual)**
**Author:** Aniket Anil Naik
**Term:** Fall 2026

A short story on **_Software Engineering for LLM-Based Agents: A Lifecycle-Oriented Survey_** — a 79-page, 355-paper survey that inverts the question most agent research asks. Instead of *what can agents do for software engineering*, it asks *what does it take to engineer the agent itself*, and then grades how well the field's claims are actually supported.

---

## Submission links

| Deliverable | Link |
|---|---|
| **Medium article** | [Link](https://medium.com/@aniketanil.naik/we-spent-two-years-teaching-agents-to-build-software-nobody-taught-us-to-build-agents-7bf16c0048df) |
| **SlideShare deck** | `<paste SlideShare URL here>` |
| **YouTube video** (15+ min) | `<paste YouTube URL here>` |
| **GitHub repo** (this directory) | `<paste public GitHub URL here>` |

> Also add the GitHub link to the class spreadsheet.

---

## The paper

| | |
|---|---|
| **Title** | Software Engineering for LLM-Based Agents: A Lifecycle-Oriented Survey |
| **Authors** | Yifei Ge, Yalin Feng, Weisong Sun, Junjie Shi, Zhenpeng Chen, Chunrong Fang, Zhihong Zhao, Zhenyu Chen, Yang Liu, Zhi Jin |
| **arXiv** | [2611.23260](https://arxiv.org/abs/2611.23260) |
| **Submitted** | 3 October 2026 (cs.SE) |
| **Size** | 79 pages, 4 figures, 355-paper main collection |

**Why this paper.** Published inside the assignment's 3–6 month window, from a strong SE research group, and squarely on the rubric's named topics — AI engineering, agents, tool use, evaluation, and LLMOps. Critically, it has a clean five-part taxonomy *and* a quantitative evidence audit, which gives the article real architecture-and-metrics substance rather than a survey-of-a-survey.

---

## What the survey says, in one page

### The inversion

The organizing claim is that the agent system itself is the software under development — not a research artifact, not a benchmark entry, but a delivered system with stakeholders, interfaces, failure modes and a maintenance burden. Three properties make that unusually hard:

1. **Execution varies run to run** — the same input doesn't reliably produce the same trajectory.
2. **Failures straddle a boundary** — the cause may be the model's decision *or* the tool it called.
3. **Accepted behaviour is fragile** — prompt, model or interface changes can break what previously passed, with no diff in your repository.

### The taxonomy

Five software lifecycle stages, one research question each (RQ1–RQ5):

| Stage | Papers | Scope |
|---|---:|---|
| Requirements Engineering (RE) | 26 | Intended behaviour, constraints, acceptance conditions, action boundaries |
| Architecture & Design (A&D) | 127 | Decomposition, responsibilities, interfaces, contracts, interaction topology, reference architectures, patterns |
| Implementation & Integration (I&I) | 76 | Frameworks, SDKs, harnesses, protocols, orchestration, tool and environment integration |
| Testing & Assurance (T&A) | 215 | Test models, oracles, coverage, benchmarks, verification, reliability, safety, failure diagnosis, regression |
| Maintenance & Evolution (M&E) | 49 | Deployment, observability, monitoring, incident analysis, repair, rollback, re-validation |

Papers can span stages; a paper counts in a stage when at least one of its engineering contributions addresses it. **Testing outweighs requirements by roughly 8:1.**

### Techniques worth knowing

- **Testing & assurance** — four named approaches: *trace-based attribution* (locate the responsible agent and decisive error step from annotated failure trajectories), *constraint-guided diagnosis* (check trajectory constraints, use violation evidence), *contract-based regression* (separate execution from grading; assess the first attempt against a colocated evaluation contract), and *activation-based detection* (spot deviations from benign activation patterns — the only white-box approach of the four).
- **Implementation & integration** — tool descriptions are treated as a first-class integration artifact; MCP issue studies surface incomplete descriptions and breaking interface changes as a recurring burden. EnCompass and Agent Spec separate distinct implementation decisions rather than entangling them in prompt text.
- **Architecture & design** — topology as a *search* problem: evolutionary methods where crossover inherits one parent's topology while recombining agent attributes, and mutation can change the topology itself.

### The evidence audit — the sharpest finding

Contributions are coded on an evidence scale from E1 to E4 (higher = stronger):

- **E2: 464 · E3: 14 · E4: 23** — only ~7% rises above benchmark-style, task-level evaluation.
- Of 264 testing contributions, 242 are directly evaluated but **230 stop at E2**.
- In requirements, 20 of 26 are directly evaluated, four reach E3, and **none reaches E4**.
- Reproducibility is thin at the low end: only **11 of 26** requirements contributions report an available or partly-available persistent artifact.

**Near-universal evaluation; near-absent rigour.**

---

## Repository contents

```
.
├── README.md                   ← you are here
├── article/
│   ├── medium-article.md       ← full article text (~3,600 words), source of truth
│   └── medium-paste.html       ← open in a browser, select-all, paste into Medium
├── slides/
│   ├── short-story-se-for-llm-agents.pptx   ← 18-slide deck (SlideShare source)
│   └── short-story-se-for-llm-agents.pdf    ← PDF export
├── figures/
│   ├── fig1_stage_coverage.png      ← papers per lifecycle stage
│   ├── fig2_evidence_levels.png     ← E2 / E3 / E4 distribution
│   ├── fig3_evaluation_funnel.png   ← contributions vs. directly evaluated, by stage
│   ├── fig4_artifacts.png           ← persistent-artifact availability in RE
│   ├── fig5_inversion.png / .svg    ← "agents for SE" vs "SE for agents"
│   ├── fig6_lifecycle.png / .svg    ← the five-stage taxonomy
│   ├── fig7_stage_scope.png / .svg  ← stage scope table (Medium has no tables)
│   └── fig8_benchmarks.png / .svg   ← benchmark table (Medium has no tables)
├── video-script.md             ← timed presentation script with speaker notes
└── scripts/
    ├── make_figures.py         ← regenerates fig1–fig4 (matplotlib)
    └── build_deck.js           ← regenerates the deck (pptxgenjs)
```

All six figures were generated by the author from numbers reported in the surveyed papers — none are reproduced from the source PDFs. The scripts are included so every figure is reproducible.

### Reproducing the artifacts

```bash
python3 scripts/make_figures.py                        # fig1–fig4
rsvg-convert -w 2000 figures/fig5_inversion.svg -o figures/fig5_inversion.png
rsvg-convert -w 2000 figures/fig6_lifecycle.svg -o figures/fig6_lifecycle.png
node scripts/build_deck.js                             # rebuilds the .pptx
```

Requires `matplotlib`, `librsvg` (`rsvg-convert`), and `pptxgenjs`.

---

## Supporting papers

The article pulls in material from several adjacent recent surveys and studies, as the rubric asks:

| Paper | arXiv | Used for |
|---|---|---|
| A Survey on Evaluation of LLM-based Agents | [2503.16416](https://arxiv.org/abs/2503.16416) | Benchmark dimensions, metric taxonomy |
| Beyond the Model: Demystifying Harness Effects in SE Agents | [2609.32459](https://arxiv.org/abs/2609.32459) | **The harness ablation** — which scaffolding components help vs. hurt |
| When Agent Evaluation Becomes Unreliable | [2610.16067](https://arxiv.org/abs/2610.16067) | Oracle failures; the harness as system under test |
| From Question Answering to Task Completion: Agent System and Harness Design | [2606.20683](https://arxiv.org/abs/2606.20683) | Model–harness pairing; benchmark landscape |
| A Survey on Long-Term Memory Security in LLM Agents | [2604.16548](https://arxiv.org/abs/2604.16548) | Maintenance-stage risk; persistent-memory attacks |
| Log Analysis for LLM-Based Agents: A Lifecycle-Oriented Survey | [2611.23281](https://arxiv.org/abs/2611.23281) | Agent observability |
| Large Language Model-Based Agents for Software Engineering | [2409.02977](https://arxiv.org/abs/2409.02977) | The "agents for SE" counterpart being inverted |

### A note on benchmark numbers

Leaderboard figures quoted in the article and deck are **point-in-time snapshots** from publicly published leaderboards and move quickly — and different boards genuinely disagree, which the article treats as a finding rather than noise. They are included to convey magnitude and the scaffolding-confound problem, not as current rankings.

---

## Originality

The article was written from scratch for this assignment. No text is copied from the surveyed papers or from any existing Medium post; all source material is paraphrased and all direct quotation is avoided. Figures are original, generated from reported numbers by the included scripts. Commentary sections ("My two cents", "What I'd want next") are the author's own analysis.

---

## Submission checklist

- [ ] Fill in the four links at the top of this README
- [ ] Publish the article on Medium — open `article/medium-paste.html` in a browser, select-all, paste into a new story, then drag in the eight images where the blue blocks appear
- [ ] Upload the deck to SlideShare (`.pptx` or `.pdf`)
- [ ] Record the 15+ minute walkthrough using `video-script.md`
- [ ] Upload the video to YouTube and add the link here
- [ ] Push this repo **public** and verify it opens without a login
- [ ] Add the GitHub, Medium and SlideShare links to the class spreadsheet
