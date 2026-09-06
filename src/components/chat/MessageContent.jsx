/**
 * Renders an assistant answer written in a light markdown-ish syntax into a
 * clean, scannable hierarchy — paragraphs, `-`/`•` bullet lists, `1.` numbered
 * lists, `##` headings, ```code``` blocks, `inline code`, `**bold**` and
 * `*italic*`. No dependency; the KB / model stays easy to author.
 */

function renderInline(text, keyPrefix) {
  const nodes = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={`${keyPrefix}-c${i}`} className="msg-content__code-inline">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(<em key={`${keyPrefix}-i${i}`}>{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseBlocks(src) {
  const lines = src.split("\n");
  const blocks = [];
  let para = [];
  let list = null; // { ordered, items }
  let inCode = false;
  let codeLines = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ") });
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push({ type: list.ordered ? "ol" : "ul", items: list.items });
      list = null;
    }
  };

  for (const raw of lines) {
    const fence = raw.match(/^\s*```(\w*)\s*$/);
    if (fence) {
      if (inCode) {
        blocks.push({ type: "code", code: codeLines.join("\n") });
        inCode = false;
        codeLines = [];
      } else {
        flushPara();
        flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(raw);
      continue;
    }

    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    const heading = line.match(/^#{1,3}\s+(.*)/);
    const bullet = line.match(/^[-•]\s+(.*)/);
    const numbered = line.match(/^\d+\.\s+(.*)/);

    if (heading) {
      flushPara();
      flushList();
      blocks.push({ type: "h", text: heading[1] });
    } else if (bullet) {
      flushPara();
      if (list && list.ordered) flushList();
      if (!list) list = { ordered: false, items: [] };
      list.items.push(bullet[1]);
    } else if (numbered) {
      flushPara();
      if (list && !list.ordered) flushList();
      if (!list) list = { ordered: true, items: [] };
      list.items.push(numbered[1]);
    } else {
      flushList();
      para.push(line);
    }
  }
  if (inCode && codeLines.length) blocks.push({ type: "code", code: codeLines.join("\n") });
  flushPara();
  flushList();
  return blocks;
}

export default function MessageContent({ text }) {
  const blocks = parseBlocks(text);
  return (
    <div className="msg-content">
      {blocks.map((b, i) => {
        if (b.type === "h") {
          return (
            <h4 key={i} className="msg-content__h">
              {renderInline(b.text, `h${i}`)}
            </h4>
          );
        }
        if (b.type === "code") {
          return (
            <pre key={i} className="msg-content__code">
              <code>{b.code}</code>
            </pre>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="msg-content__ul">
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it, `u${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "ol") {
          return (
            <ol key={i} className="msg-content__ol">
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it, `o${i}-${j}`)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i} className="msg-content__p">
            {renderInline(b.text, `p${i}`)}
          </p>
        );
      })}
    </div>
  );
}
