# Video Script — 15–16 minutes

**Deck:** `slides/short-story-se-for-llm-agents.pptx` (18 slides)
**Target:** 15:00–16:00. The rubric says *no less than 15 minutes*, so pace for ~15:45 and don't rush the closing.

**How to use this:** these are talking points, not a teleprompter. Speak them in your own words — it will sound far better and the examiner can tell. Timings are cumulative and show where you should be when each slide comes up. The same text is in the deck's speaker notes, so you can present from Presenter View instead of reading this file.

**Recording tips**
- Zoom or OBS, screen share on the deck in Presenter View, webcam in the corner if you like.
- Do a 30-second test recording first and check the audio level.
- If you fluff a line, pause two seconds and say it again — easy to cut, and much faster than restarting.
- Keep the PDF (`short-story-se-for-llm-agents.pdf`) open as a backup in case PowerPoint misbehaves mid-record.

---

## Slide 1 — Title · 0:00 → 0:50

Open on the title. Don't read it; use it.

> "There's a genre of paper that has become almost a monthly ritual — *LLM agents for software engineering*. Agents localize bugs. Agents write patches. Agents generate tests. There's a SWE-bench number near the end and it's higher than last month's.
>
> The paper I want to talk about today does something different, and it announces it in a single clause buried in the introduction. It treats the agent system *itself* as the software under development.
>
> That's *Software Engineering for LLM-Based Agents: A Lifecycle-Oriented Survey* — Ge and colleagues, arXiv 2611.23260, October 2026. 79 pages, 355 papers. And by the end I want to convince you that its sharpest contribution isn't the taxonomy at all."

**Pace note:** this slide sets the hook. Slow and deliberate.

---

## Slide 2 — The paper at a glance · 0:50 → 2:00

> "Quick orientation on scale. 355 papers in the main collection. 79 pages, four figures. Five lifecycle stages, one research question each. Ten authors — and this is a serious list; Yang Liu and Zhi Jin are very senior software engineering researchers.
>
> But the thing that makes this paper different from the twenty other agent surveys published this year is the framing clause at the bottom of the slide.
>
> *The agent system itself is the software under development.* Not a research artifact. Not a benchmark entry. A system with stakeholders, interfaces, failure modes, an on-call rotation, and a version number that somebody is going to bump on a Tuesday afternoon.
>
> That single move changes what counts as a result."

---

## Slide 3 — Two questions that sound alike · 2:00 → 3:10

> "Here's the inversion, side by side.
>
> On the left, the well-trodden question: agents *for* software engineering. Can an agent fix this GitHub issue, write these tests, review this diff? The system under study is your codebase. The agent is the tool.
>
> On the right, this survey's question: software engineering *for* agents. How do you specify, design, build, test and maintain the agent itself? The system under study *is* the agent. The agent is the product.
>
> It sounds like a small pivot. It is not. Everything downstream — what you measure, what counts as a bug, what you put in code review — changes depending on which box you're standing in."

---

## Slide 4 — Three properties that break classical SE · 3:10 → 4:40

> "So why did this question become urgent now?
>
> The authors point out that public engineering guidance for agents is basically a tuning loop: pick a target task, pick a workflow or an autonomous design, then tune prompts, tools and execution strategy against task outcomes, latency and cost. That loop is genuinely good at producing a demo. It is also, at a lot of companies, the entire methodology.
>
> What the loop doesn't cover is three properties that make agents hostile to classical software engineering.
>
> **One — execution varies run to run.** The same input doesn't reliably produce the same trajectory. Your test suite is now sampling from a distribution rather than checking a function.
>
> **Two — failures straddle a boundary.** When the agent does the wrong thing, the cause might be the model's decision or the tool it called. Classical debugging assumes you can localize a fault to a line of code. Here the fault may be a judgment.
>
> **Three — previously accepted behaviour is fragile.** Change a prompt, swap a model version, let an upstream tool alter its interface, and things that passed yesterday fail today — with no diff in your repository to blame.
>
> That third one is the one I think the industry has least internalized. We have a mature mental model for *the dependency updated and broke us*. We have almost none for *the dependency is a frontier model and its disposition shifted.*"

---

## Slide 5 — The taxonomy · 4:40 → 6:00

> "Now the taxonomy, which is the core of the paper.
>
> The organizing move is unglamorous and I think exactly right. Rather than inventing a novel taxonomy of agent concerns, they map the literature onto the software lifecycle that every engineer already knows: requirements engineering, architecture and design, implementation and integration, testing and assurance, maintenance and evolution. One research question per stage, RQ1 through RQ5.
>
> And each stage is *defined* by the engineering concerns they searched for. Architecture and design means decomposition, responsibilities, interfaces, contracts, interaction topology, reference architectures, design patterns. Testing and assurance means oracles, coverage, benchmarks, verification, reliability, safety, failure diagnosis, regression. These are ordinary software engineering words pointed at a new kind of system.
>
> A paper lands in a stage when at least one of its engineering contributions addresses that stage, so papers can and do span several.
>
> I want to flag the discipline here, because it's easy to miss. It would have been far more citable to coin five new words. Using the boring ones is what makes this legible to a working engineering organization — and it's what makes the next slide mean anything."

---

## Slide 6 — The distribution is the finding · 6:00 → 7:20

> "Map 355 papers onto those five stages and you get the shape of a field's attention.
>
> Testing and assurance appears in 215 papers. Architecture and design, 127. Implementation and integration, 76. Maintenance and evolution, 49. Requirements engineering — 26.
>
> Testing outweighs requirements by roughly eight to one.
>
> Before you read that as an indictment, note the caveat the survey itself attaches, which I think is honest: these counts describe *research contributions*, not what practitioners spend their days on. Nobody publishes a paper about the requirements workshop they ran on Tuesday. Publication bias is real and it points exactly this way.
>
> But even discounting for that, the curve tells you something. We've built an enormous apparatus for measuring whether agents succeed, and a comparatively tiny one for stating what success was supposed to mean. We're extremely good at grading an exam we never quite wrote."

---

## Slide 7 — Stages 1 and 2 · 7:20 → 8:50

> "Let me walk the stages quickly, two at a time.
>
> **Requirements engineering — 26 papers for the hardest question.** The work that exists is mostly about making implicit expectations explicit; one representative thread codes interview accounts into trust themes, refines them with domain experts, and maps the resulting explicit requirements through to design. Recognizably classical requirements engineering, pointed at a new system.
>
> The agent-specific wrinkle is **action boundaries** — not just what the agent should accomplish, but what it's *permitted* to do and with whose authority. For a traditional application the permission model is a security concern you can bolt on afterwards. For an agent that composes tool calls at runtime, the boundary determines behaviour. It's a functional requirement. Twenty-six papers is not a lot of thinking about that.
>
> **Architecture and design — 127 papers**, and this is where the field has been most inventive. The familiar concerns: decomposition, responsibility allocation, interfaces, contracts. But the striking thread treats the architecture itself as something to *search* rather than design. The survey describes evolutionary approaches where a crossover operation inherits one parent system's topology while recombining agent attributes, and mutation can change the topology outright.
>
> You're not hand-drawing the org chart for your multi-agent system. You're evolving a population of org charts and keeping whatever scores. That's a genuinely new idea in software architecture — and I'll come back to why it worries me."

---

## Slide 8 — Stage 3 · 8:50 → 10:05

> "Stage three: implementation and integration. Only 76 papers, and I'd argue this is where industrial pain is highest relative to research attention.
>
> The part I'd put in front of any team shipping agents is the treatment of the Model Context Protocol. Two complementary empirical studies are highlighted. One examines issues reported against MCP integrations and surfaces incomplete tool descriptions and breaking integration changes as a recurring practical burden. The other treats tool descriptions explicitly as **an integration artifact in their own right**.
>
> Sit with that framing for a second, because it's the most immediately useful idea in the paper.
>
> In a conventional system, the interface contract is the type signature and the docstring is a courtesy. In an agent system, the natural-language description *is* the contract — it's the thing the model reads to decide whether and how to call your tool. A vague description isn't poor documentation. It's a bug in the interface.
>
> I've never seen a team treat tool descriptions with the review rigour they apply to a public API schema. They should. That's adoptable next sprint.
>
> The survey also notes approaches like EnCompass and Agent Spec that work by separating distinct implementation decisions rather than entangling them in prompt text — essentially the agent-era version of *stop putting configuration in your source code*."

---

## Slide 9 — Stage 4 · 10:05 → 11:25

> "Stage four — testing and assurance. The largest stage, 264 contributions, and the survey organizes it into a four-column table: engineering problem, approach, key idea, representative studies. I'd hand that straight to a QA lead as a menu. Four approaches stand out.
>
> **Trace-based attribution.** Given an annotated failure trajectory, identify which agent and which decisive step is responsible. Fault localization reborn for systems where the line of code is a decision point in a trace.
>
> **Constraint-guided diagnosis.** Define constraints over the trajectory, check them, and use the violation evidence to pin down the critical failure. Essentially assertions, lifted from program state to agent behaviour.
>
> **Contract-based regression.** Separate execution from grading, and assess the *first attempt* against an evaluation contract that lives beside the task. 'First attempt' is doing enormous work in that sentence — if you let an agent retry until it passes, you've measured persistence, not capability.
>
> **Activation-based detection.** Watch for deviations from benign activation patterns. The white-box option: instead of judging the output, inspect the model's internals for signs it's gone off the rails.
>
> Notice the split. Three of these treat the agent as a black box and interrogate its trace. One opens it up. The black-box three are deployable today; the white-box one is where the interesting research is."

---

## Slide 10 — Stage 5 · 11:25 → 12:15

> "Stage five — maintenance and evolution. Monitoring, anomaly detection, root-cause localization, resolution. Classical AIOps vocabulary, applied to a system whose normal behaviour is a distribution rather than a trace.
>
> Forty-nine papers. For the stage that, in every other kind of software, consumes the majority of total lifetime cost.
>
> The agent field hasn't had its maintenance reckoning yet, because most agents are young. But every agent in production right now is accruing an un-studied burden — prompts drifting away from the model they were tuned against, tool interfaces mutating upstream, memory stores silently accumulating stale or poisoned entries. The adjacent memory-security literature is already documenting attacks that live in persistent memory across sessions.
>
> The reckoning is coming and the literature is behind it."

---

## Slide 11 — The leaderboards · 12:15 → 13:05

> "So that's the taxonomy. Let me talk about state of the art, because any survey like this invites the question: what's actually winning, and how do we know?
>
> Here's the honest answer in late 2026: the leaderboards disagree with each other, and the disagreement is the interesting part.
>
> Depending on which board you consult and when, the top SWE-bench Verified entry sits anywhere from the high 70s to the mid 90s. GAIA's official leaderboard was topped at 94% in October. And here's the thing — both GAIA and OSWorld-Verified now sit *above* their published human baselines, which means they've stopped discriminating between frontier agents at all. The benchmarks still doing real work are the harder ones: SWE-bench Pro topping out around 61%, OSWorld 2.0 around 20%.
>
> Treat every number on this slide as a point-in-time snapshot. They move weekly."

---

## Slide 12 — pass^k · 13:05 → 13:50

> "Two things on that table deserve more attention than the numbers do. The first is this metric.
>
> tau-bench reports pass-to-the-k — whether an agent succeeds on the *same* task across k independent attempts. Standard pass-at-k asks whether it succeeded *at least once*.
>
> These measure opposite virtues. Pass-at-k rewards a lucky explorer. Pass-to-the-k rewards a dependable one. For anything you intend to actually deploy, pass-to-the-k is the metric and pass-at-k is marketing.
>
> And the fact that we had to invent a new notation to express *does it work every time* — rather than that being the obvious thing to report — tells you something about where the field's defaults were."

---

## Slide 13 — The harness ablation · 13:50 → 14:45

> "The second thing, and this is the most actionable empirical result I found reading around this survey.
>
> A benchmark score is not a property of a model. It's a property of a *model–harness pairing* — the context policy, the tool interfaces, the control loop, the verification procedure, the retry budget. Same model, different scaffolding, different score. Which is exactly why two leaderboards can both be honest and still disagree.
>
> Work dissecting harness effects in software engineering agents used a stripped-down harness as a controlled testbed to isolate which components actually contribute. Structured tools help. Task-specific subagents help. Context compression can hurt. General-purpose subagents can hurt. And the gains are conditional — a component that helps a weaker model can be dead weight on a stronger one.
>
> Their trajectory analysis points at the mechanism: effective harnesses *regularize* exploration and tool use. They narrow the space rather than enriching it.
>
> If you take one engineering lesson from this whole talk, make it that one. The instinct when an agent underperforms is to *add* — another subagent, another retrieval step, another reflection pass. The additions that actually work are the ones that constrain. Scaffolding isn't scaffolding if it doesn't hold a shape."

---

## Slide 14 — The evidence audit · 14:45 → 15:35

> "Now the part that I think is the paper's sharpest contribution, and where it earns its 79 pages.
>
> Most surveys catalogue what a literature *claims*. This one grades **how well each claim is supported**, coding contributions onto an evidence scale from E1 up to E4, where higher means stronger.
>
> 464 contributions at E2. Fourteen at E3. Twenty-three at E4.
>
> Roughly seven percent of the coded corpus rises above benchmark-style, task-level evaluation."

---

## Slide 15 — Per-stage evidence · 15:35 → 16:15

> "The per-stage breakdown sharpens it.
>
> Of the 264 testing contributions, 242 are directly evaluated — that's excellent hygiene — but 230 of them stop at E2. In requirements engineering, 20 of 26 are directly evaluated, four reach E3, and *none* reaches E4. And on reproducibility: in that same stage only 11 of 26 report a persistent artifact that's available or even partly available. Fewer than half.
>
> Let me translate that out of survey-speak. The field has near-universal *evaluation* and near-absent *rigour*. Almost every paper runs its method on a benchmark. Almost no paper runs a controlled comparison, and vanishingly few observe anything in the field over time.
>
> We've built a culture where 'we evaluated it' means 'we got a number on a task set,' and we've collectively agreed to let that stand in for evidence. That's a reasonable place for a three-year-old field to be. It's a terrible place for a field whose output is being deployed into production with tool access and action authority."

---

## Slide 16 — My two cents · 16:15 → 17:10

Compress if you're running long — points 1 and 4 are the keepers.

> "Four opinions.
>
> **One.** The survey's own counts argue against its own field's priorities. Eight-to-one testing over requirements, in a domain where the central difficulty is that nobody can say precisely what correct behaviour *is*. We're optimizing the measurement of an underspecified target.
>
> **Two.** 'Tool descriptions are an integration artifact' is the cheapest good idea in the paper. Put them in code review. Version them. Write tests that assert the description matches the implementation's actual contract. Most teams could do that next sprint.
>
> **Three.** The architecture-search direction needs a governance answer before it needs a performance answer. Evolved topologies will beat hand-designed ones — that's how search usually goes. But 'we searched for this architecture' is not an answer to 'why did the system do that,' and agent systems are precisely the ones regulators and incident reviewers will ask about. We traded away explainability once with neural networks. Worth being deliberate about doing it again at the system level.
>
> **Four.** Maintenance is the sleeping giant. Forty-nine papers against a burden that compounds silently in every deployed system.
>
> And one defence of the survey against an obvious criticism. Someone will say a lifecycle framing is conservative — that agents are a new kind of artifact and shoehorning them into requirements-design-build-test-maintain misses what's novel. I think that gets it backwards. The lifecycle isn't a claim about what agents *are*. It's a checklist of what every deployed system eventually *needs*. The stages with 26 and 49 papers are visible as gaps precisely because somebody insisted on counting all five."

---

## Slide 17 — Three studies · 17:10 → 17:50

> "Three studies this survey makes obviously necessary, and nobody has run.
>
> **A longitudinal study of a production agent.** Six months, one real system, every prompt change, model upgrade and tool-interface break logged, with behaviour re-validated after each. That single study would produce more E4 evidence than the entire current corpus contains.
>
> **A requirements notation for action boundaries.** Something between a permission manifest and a behavioural specification — expressive enough to state *may read these, may write those only with confirmation, may never do that* — and checkable against a trace.
>
> **An honest harness-controlled leaderboard.** Fix the scaffolding, vary the model. Then fix the model, vary the scaffolding. Report both axes. Until that exists, every headline agent number is confounded."

---

## Slide 18 — Close · 17:50 → 18:20

Slow down. Land it.

> "To close.
>
> A strong survey tells you what a field knows. An unusually strong one tells you how well it knows it. Ge and colleagues do the second thing, and the answer is: we know a great deal about measuring agents on tasks, considerably less about specifying them, and almost nothing — 37 contributions above E2, out of 501 — that would survive contact with an evidence standard borrowed from any mature engineering discipline.
>
> The leaderboards are climbing fast. The scaffolding underneath them is thinner than it looks.
>
> Worth knowing which one you're standing on. Thank you."

---

## Timing summary

| Section | Slides | Ends at |
|---|---|---|
| Opening & framing | 1–4 | 4:40 |
| The taxonomy | 5–6 | 7:20 |
| Walking the five stages | 7–10 | 12:15 |
| Leaderboards & the ablation | 11–13 | 14:45 |
| The evidence audit | 14–15 | 16:15 |
| My read & close | 16–18 | 18:20 |

**Full read-through lands around 18 minutes.** That is deliberate padding — you will speed up on camera, and the rubric floor is 15 minutes. If you come in under 15, slow the stage walk (slides 7–10) and expand your own commentary on slide 16; those are the easiest places to add substance rather than filler.
