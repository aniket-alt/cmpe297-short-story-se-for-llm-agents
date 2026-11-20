"""Build a Medium-paste-ready HTML version of the article.

Medium cannot render markdown, and has no table support at all. So:
  - image markdown  -> a visible placeholder telling you which file to drop in
  - markdown tables -> a placeholder pointing at the rendered table image
Everything else (headings, bold, italics, links, lists, blockquotes) survives
a copy-paste into the Medium editor.
"""
import re
import subprocess

SRC = "/home/claude/short-story/article/medium-article.md"
MID = "/home/claude/short-story/article/_medium_paste.md"
OUT = "/home/claude/short-story/article/medium-paste.html"

TABLE_IMAGES = [
    ("fig7_stage_scope.png", "What each stage means in an agent context"),
    ("fig8_benchmarks.png", "What the major agent leaderboards actually measure"),
]

PH = ('\n<div class="imgph"><span class="tag">UPLOAD IMAGE</span>'
      '<strong>{fn}</strong><br><span class="cap">Caption: {alt}</span></div>\n')

md = open(SRC).read()

# 1. image markdown -> placeholder
def img_sub(m):
    alt, path = m.group(1), m.group(2)
    fn = path.rsplit("/", 1)[-1]
    return PH.format(fn=fn, alt=alt)

md = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", img_sub, md)

# 2. markdown tables -> placeholder (consume contiguous pipe-rows)
table_re = re.compile(r"(?:^\|.*\|[ \t]*\n)+", re.MULTILINE)
tables_found = []

def table_sub(m):
    i = len(tables_found)
    tables_found.append(m.group(0))
    if i < len(TABLE_IMAGES):
        fn, cap = TABLE_IMAGES[i]
        return PH.format(fn=fn, alt=cap) + "\n"
    return m.group(0)

md = table_re.sub(table_sub, md)

open(MID, "w").write(md)
print(f"tables replaced: {min(len(tables_found), len(TABLE_IMAGES))} of {len(tables_found)}")

html = subprocess.run(
    ["pandoc", "-f", "markdown+smart", "-t", "html", MID],
    capture_output=True, text=True, check=True).stdout

PAGE = """<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Medium paste version</title>
<style>
 body {{ font: 19px/1.65 Georgia, 'Times New Roman', serif; color: #1a1a1a;
        max-width: 740px; margin: 48px auto; padding: 0 24px; }}
 h1 {{ font: bold 40px/1.2 -apple-system, 'Segoe UI', Helvetica, sans-serif; margin: 40px 0 8px; }}
 h3 {{ font: 400 24px/1.35 -apple-system, 'Segoe UI', Helvetica, sans-serif;
       color: #5c5c5c; margin: 0 0 28px; }}
 h2 {{ font: bold 30px/1.3 -apple-system, 'Segoe UI', Helvetica, sans-serif; margin: 44px 0 12px; }}
 hr {{ border: none; border-top: 1px solid #e3e3e3; margin: 36px 0; }}
 blockquote {{ border-left: 3px solid #1a1a1a; margin: 24px 0; padding-left: 20px;
               font-style: italic; color: #4a4a4a; }}
 .imgph {{ background: #eef5fd; border: 2px dashed #2a78d6; border-radius: 8px;
           padding: 18px 20px; margin: 30px 0;
           font: 15px/1.5 -apple-system, 'Segoe UI', Helvetica, sans-serif; color: #12284c; }}
 .imgph .tag {{ display: inline-block; background: #2a78d6; color: #fff; font-size: 11px;
                font-weight: bold; letter-spacing: 1px; padding: 3px 8px; border-radius: 4px;
                margin-right: 10px; vertical-align: 2px; }}
 .imgph .cap {{ color: #52514e; font-size: 14px; }}
 table {{ border-collapse: collapse; width: 100%; font-size: 15px;
          font-family: -apple-system, 'Segoe UI', Helvetica, sans-serif; margin: 24px 0; }}
 th, td {{ border: 1px solid #e1e0d9; padding: 8px 10px; text-align: left; }}
 th {{ background: #f4f7fb; }}
 .banner {{ background: #fdf0ea; border-radius: 8px; padding: 16px 20px; margin-bottom: 36px;
            font: 15px/1.6 -apple-system, 'Segoe UI', Helvetica, sans-serif; color: #52514e; }}
 @media print {{ .banner {{ display: none; }} }}
</style></head><body>
<div class="banner"><strong>How to use this file.</strong> Select all (Ctrl/Cmd&nbsp;+&nbsp;A),
copy, and paste into a new Medium story. Headings, bold, italics, links, lists and blockquotes
carry over. Then replace each blue block by dragging in the named image from
<code>figures/</code> and typing the caption underneath it. Delete this banner after pasting
if it comes along.</div>
{body}
</body></html>"""

open(OUT, "w").write(PAGE.format(body=html))
print("wrote", OUT)
