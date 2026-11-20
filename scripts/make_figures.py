"""Generate figures for the CMPE 297 short story article.

Data source: Ge et al., "Software Engineering for LLM-Based Agents:
A Lifecycle-Oriented Survey", arXiv:2611.23260.
All numbers are taken directly from the survey text.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

OUT = "/home/claude/short-story/figures"

# ---- palette (validated reference palette, light mode) ----
SURFACE = "#fcfcfb"
INK = "#0b0b0b"
INK2 = "#52514e"
MUTED = "#898781"
GRID = "#e1e0d9"
BASE = "#c3c2b7"
BLUE = "#2a78d6"
ORANGE = "#eb6834"
AQUA = "#1baf7a"
BLUE_LT = "#9ec5f4"
BLUE_DK = "#184f95"

plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "figure.facecolor": SURFACE,
    "axes.facecolor": SURFACE,
    "savefig.facecolor": SURFACE,
    "text.color": INK,
    "axes.labelcolor": INK2,
    "xtick.color": MUTED,
    "ytick.color": MUTED,
    "axes.edgecolor": BASE,
})


def strip(ax, keep=("left",)):
    for s in ("top", "right", "bottom", "left"):
        ax.spines[s].set_visible(s in keep)


# ---------------------------------------------------------------
# Figure 1 - stage coverage across the 355-paper corpus
# ---------------------------------------------------------------
def fig1():
    stages = ["Requirements\nEngineering", "Maintenance\n& Evolution",
              "Implementation\n& Integration", "Architecture\n& Design",
              "Testing\n& Assurance"]
    vals = [26, 49, 76, 127, 215]

    fig, ax = plt.subplots(figsize=(9, 5.2))
    bars = ax.barh(stages, vals, height=0.62, color=BLUE, zorder=3)
    # highlight the extremes
    bars[-1].set_color(BLUE_DK)
    bars[0].set_color(ORANGE)

    for b, v in zip(bars, vals):
        ax.text(v + 4, b.get_y() + b.get_height() / 2, str(v),
                va="center", ha="left", fontsize=13, color=INK, fontweight="bold")

    ax.set_xlim(0, 245)
    ax.set_xlabel("Papers in the corpus addressing this stage", fontsize=10.5)
    ax.set_title("Where agent-engineering research actually lives",
                 fontsize=15, fontweight="bold", color=INK, pad=34, loc="left")
    ax.text(0, 1.018, "355-paper corpus; a paper counts in a stage if at least one "
            "of its contributions addresses it",
            transform=ax.transAxes, fontsize=9.5, color=MUTED, va="bottom")
    ax.xaxis.grid(True, color=GRID, lw=0.8, zorder=0)
    ax.set_axisbelow(True)
    strip(ax)
    ax.tick_params(axis="y", length=0, labelsize=10.5, labelcolor=INK)
    ax.tick_params(axis="x", length=0, labelsize=9.5)
    fig.text(0.012, 0.015, "Data: Ge et al., arXiv:2611.23260", fontsize=8.5, color=MUTED)
    fig.tight_layout(rect=[0, 0.03, 1, 0.99])
    fig.savefig(f"{OUT}/fig1_stage_coverage.png", dpi=200)
    plt.close(fig)


# ---------------------------------------------------------------
# Figure 2 - evidence strength across the whole corpus
# ---------------------------------------------------------------
def fig2():
    labels = ["E2", "E4", "E3"]
    vals = [464, 23, 14]
    order = [0, 2, 1]  # E2, E3, E4
    labels = [labels[i] for i in order]
    vals = [vals[i] for i in order]

    fig, ax = plt.subplots(figsize=(9, 5.2))
    cols = [BLUE, ORANGE, ORANGE]
    bars = ax.bar(labels, vals, width=0.5, color=cols, zorder=3)
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + 10, str(v),
                ha="center", fontsize=15, fontweight="bold", color=INK)

    ax.set_ylim(0, 520)
    ax.set_ylabel("Coded contributions", fontsize=10.5)
    ax.set_title("Almost all of the evidence sits at one level",
                 fontsize=15, fontweight="bold", color=INK, pad=34, loc="left")
    ax.text(0, 1.018, "Evidence strength rises from E1 to E4. E3 and E4 together account "
            "for 37 of 501 coded contributions — about 7%.",
            transform=ax.transAxes, fontsize=9.5, color=MUTED, va="bottom")
    ax.yaxis.grid(True, color=GRID, lw=0.8, zorder=0)
    ax.set_axisbelow(True)
    strip(ax, keep=("bottom",))
    ax.tick_params(axis="x", length=0, labelsize=13, labelcolor=INK)
    ax.tick_params(axis="y", length=0, labelsize=9.5)
    fig.text(0.012, 0.015, "Data: Ge et al., arXiv:2611.23260", fontsize=8.5, color=MUTED)
    fig.tight_layout(rect=[0, 0.03, 1, 0.99])
    fig.savefig(f"{OUT}/fig2_evidence_levels.png", dpi=200)
    plt.close(fig)


# ---------------------------------------------------------------
# Figure 3 - the evaluation funnel, stage by stage
# ---------------------------------------------------------------
def fig3():
    stages = ["Requirements\nEngineering", "Testing &\nAssurance", "Maintenance\n& Evolution"]
    total = [26, 264, 54]
    evaluated = [20, 242, 47]

    import numpy as np
    x = np.arange(len(stages))
    w = 0.34

    fig, ax = plt.subplots(figsize=(9, 5.2))
    b1 = ax.bar(x - w / 2 - 0.012, total, w, label="Contributions in stage",
                color=BLUE_LT, zorder=3)
    b2 = ax.bar(x + w / 2 + 0.012, evaluated, w, label="Directly evaluated",
                color=BLUE, zorder=3)

    for bars in (b1, b2):
        for b in bars:
            ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 5,
                    f"{int(b.get_height())}", ha="center", fontsize=11.5,
                    fontweight="bold", color=INK)

    ax.set_xticks(x)
    ax.set_xticklabels(stages, fontsize=10.5, color=INK)
    ax.set_ylim(0, 300)
    ax.set_ylabel("Contributions", fontsize=10.5)
    ax.set_title("Direct evaluation is near-universal — rigour is not",
                 fontsize=15, fontweight="bold", color=INK, pad=34, loc="left")
    ax.text(0, 1.018, "Of the 264 Testing contributions, 230 stop at E2. "
            "No Requirements contribution reaches E4.",
            transform=ax.transAxes, fontsize=9.5, color=MUTED, va="bottom")
    ax.yaxis.grid(True, color=GRID, lw=0.8, zorder=0)
    ax.set_axisbelow(True)
    strip(ax, keep=("bottom",))
    ax.tick_params(axis="x", length=0)
    ax.tick_params(axis="y", length=0, labelsize=9.5)
    leg = ax.legend(frameon=False, fontsize=10, loc="upper left",
                    bbox_to_anchor=(0.0, 0.98))
    for t in leg.get_texts():
        t.set_color(INK2)
    fig.text(0.012, 0.015, "Data: Ge et al., arXiv:2611.23260", fontsize=8.5, color=MUTED)
    fig.tight_layout(rect=[0, 0.03, 1, 0.99])
    fig.savefig(f"{OUT}/fig3_evaluation_funnel.png", dpi=200)
    plt.close(fig)


# ---------------------------------------------------------------
# Figure 4 - reproducibility: persistent artifacts in Requirements
# ---------------------------------------------------------------
def fig4():
    fig, ax = plt.subplots(figsize=(9, 3.4))
    ax.axis("off")

    total = 26
    have = 11
    cols = 13
    for i in range(total):
        r, c = divmod(i, cols)
        filled = i < have
        ax.add_patch(FancyBboxPatch(
            (c * 1.0, -r * 1.0), 0.82, 0.82,
            boxstyle="round,pad=0,rounding_size=0.12",
            facecolor=BLUE if filled else "#ffffff",
            edgecolor=BLUE if filled else BASE, lw=1.6))

    ax.set_xlim(-0.4, cols)
    ax.set_ylim(-2.1, 1.9)
    ax.text(0, 1.55, "11 of 26", fontsize=24, fontweight="bold", color=INK)
    ax.text(0, 1.12, "Requirements-stage contributions that ship a persistent "
            "artifact you can actually fetch",
            fontsize=10.5, color=INK2)
    ax.text(0, -1.5, "Filled = artifact available or partly available.   "
            "Data: Ge et al., arXiv:2611.23260", fontsize=8.8, color=MUTED)
    fig.tight_layout()
    fig.savefig(f"{OUT}/fig4_artifacts.png", dpi=200)
    plt.close(fig)


if __name__ == "__main__":
    fig1(); fig2(); fig3(); fig4()
    print("figures written")
