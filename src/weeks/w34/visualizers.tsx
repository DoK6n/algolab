// @ts-nocheck
import { useState } from 'react';
import { W34_T } from './theme';

function W34_StackViz() {
  const [stack, setStack] = useState([3, 7, 2]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [flash, setFlash] = useState(null);

  const push = () => {
    const v = parseInt(input);
    if (isNaN(v)) return;
    setStack(s => [...s, v]);
    setMsg(`push(${v}) → 스택 맨 위에 추가`);
    setFlash("push");
    setInput("");
    setTimeout(() => setFlash(null), 600);
  };

  const pop = () => {
    if (!stack.length) { setMsg("스택이 비어있습니다!"); return; }
    const v = stack[stack.length - 1];
    setStack(s => s.slice(0, -1));
    setMsg(`pop() → ${v} 꺼냄`);
    setFlash("pop");
    setTimeout(() => setFlash(null), 600);
  };

  const peek = () => {
    if (!stack.length) { setMsg("스택이 비어있습니다!"); return; }
    setMsg(`peek() → ${stack[stack.length - 1]} (꺼내지 않음)`);
  };

  return (
    <div style={{ background: "#080b07", border: `1px solid ${W34_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-end", flexWrap: "wrap" }}>
        {/* Stack diagram */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 120 }}>
          <div style={{ color: W34_T.muted, fontSize: 12, marginBottom: 4 }}>← TOP</div>
          {stack.length === 0
            ? <div style={{ color: W34_T.muted, padding: 12, border: `1px dashed ${W34_T.border}`, borderRadius: 6 }}>비어있음</div>
            : [...stack].reverse().map((v, i) => (
              <div key={i} style={{
                width: 100, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                background: i === 0 && flash === "push" ? W34_T.accent + "44"
                          : i === 0 && flash === "pop" ? W34_T.danger + "44"
                          : W34_T.card,
                border: `2px solid ${i === 0 ? W34_T.accent : W34_T.border}`,
                borderRadius: 6, color: W34_T.text, fontWeight: i === 0 ? 700 : 400,
                transition: "all 0.3s", fontFamily: "monospace", fontSize: 16
              }}>{v}</div>
            ))}
          <div style={{ width: 100, height: 6, background: W34_T.border, borderRadius: 3, marginTop: 4 }} />
          <div style={{ color: W34_T.muted, fontSize: 11 }}>BOTTOM</div>
        </div>
        {/* Controls */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && push()}
              placeholder="숫자 입력"
              style={{ padding: "8px 12px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
                color: W34_T.text, borderRadius: 8, width: 100, fontFamily: "monospace" }} />
            <button onClick={push}
              style={{ padding: "8px 16px", background: W34_T.accent, border: "none", color: "#000",
                borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>push</button>
            <button onClick={pop}
              style={{ padding: "8px 16px", background: W34_T.danger, border: "none", color: "#fff",
                borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>pop</button>
            <button onClick={peek}
              style={{ padding: "8px 16px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
                color: W34_T.text, borderRadius: 8, cursor: "pointer" }}>peek</button>
          </div>
          {msg && <div style={{ color: W34_T.accent, background: W34_T.accent + "15", border: `1px solid ${W34_T.accent}33`,
            padding: "8px 14px", borderRadius: 8, fontSize: 13, fontFamily: "monospace" }}>{msg}</div>}
          <div style={{ marginTop: 12, color: W34_T.muted, fontSize: 12 }}>
            크기: {stack.length} | LIFO (Last In First Out)
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── QUEUE VISUALIZER ─────────────────── */
function W34_QueueViz() {
  const [queue, setQueue] = useState([5, 2, 8]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const enqueue = () => {
    const v = parseInt(input);
    if (isNaN(v)) return;
    setQueue(q => [...q, v]);
    setMsg(`enqueue(${v}) → 맨 뒤에 추가`);
    setInput("");
  };

  const dequeue = () => {
    if (!queue.length) { setMsg("큐가 비어있습니다!"); return; }
    setMsg(`dequeue() → ${queue[0]} 꺼냄 (맨 앞에서)`);
    setQueue(q => q.slice(1));
  };

  return (
    <div style={{ background: "#080b07", border: `1px solid ${W34_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: W34_T.accent3, fontSize: 12 }}>← dequeue (앞)</span>
        <span style={{ color: W34_T.accent2, fontSize: 12 }}>enqueue (뒤) →</span>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ color: W34_T.accent3, fontSize: 20, marginRight: 4 }}>▶</div>
        {queue.length === 0
          ? <div style={{ color: W34_T.muted, padding: "12px 24px", border: `1px dashed ${W34_T.border}`, borderRadius: 8 }}>비어있음</div>
          : queue.map((v, i) => (
            <div key={i} style={{
              minWidth: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
              background: i === 0 ? W34_T.accent3 + "33" : W34_T.card,
              border: `2px solid ${i === 0 ? W34_T.accent3 : i === queue.length - 1 ? W34_T.accent2 : W34_T.border}`,
              borderRadius: 8, color: W34_T.text, fontWeight: 700, fontFamily: "monospace", fontSize: 16
            }}>{v}</div>
          ))}
        <div style={{ color: W34_T.accent2, fontSize: 20, marginLeft: 4 }}>▶</div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && enqueue()}
          placeholder="숫자"
          style={{ padding: "8px 12px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
            color: W34_T.text, borderRadius: 8, width: 80, fontFamily: "monospace" }} />
        <button onClick={enqueue}
          style={{ padding: "8px 16px", background: W34_T.accent2, border: "none", color: "#000",
            borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>enqueue</button>
        <button onClick={dequeue}
          style={{ padding: "8px 16px", background: W34_T.accent3, border: "none", color: "#000",
            borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>dequeue</button>
        {msg && <span style={{ color: W34_T.accent, fontSize: 13, padding: "8px 0", fontFamily: "monospace" }}>{msg}</span>}
      </div>
    </div>
  );
}

/* ─────────────────── DEQUE VISUALIZER ─────────────────── */
function W34_DequeViz() {
  const [deque, setDeque] = useState([4, 7, 1]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const appendleft = () => { const v = parseInt(input); if (isNaN(v)) return; setDeque(d => [v, ...d]); setMsg(`appendleft(${v})`); setInput(""); };
  const append = () => { const v = parseInt(input); if (isNaN(v)) return; setDeque(d => [...d, v]); setMsg(`append(${v})`); setInput(""); };
  const popleft = () => { if (!deque.length) return; setMsg(`popleft() → ${deque[0]}`); setDeque(d => d.slice(1)); };
  const pop = () => { if (!deque.length) return; setMsg(`pop() → ${deque[deque.length - 1]}`); setDeque(d => d.slice(0, -1)); };

  return (
    <div style={{ background: "#080b07", border: `1px solid ${W34_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 14, overflowX: "auto" }}>
        <div style={{ color: W34_T.accent4, fontSize: 14 }}>⟵ 앞</div>
        {deque.map((v, i) => (
          <div key={i} style={{
            minWidth: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
            background: W34_T.card, border: `2px solid ${i === 0 ? W34_T.accent4 : i === deque.length - 1 ? W34_T.purple : W34_T.border}`,
            borderRadius: 8, color: W34_T.text, fontWeight: 700, fontFamily: "monospace", fontSize: 16
          }}>{v}</div>
        ))}
        <div style={{ color: W34_T.purple, fontSize: 14 }}>뒤 ⟶</div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder="숫자"
          style={{ padding: "8px 12px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
            color: W34_T.text, borderRadius: 8, width: 80, fontFamily: "monospace" }} />
        <button onClick={appendleft} style={{ padding: "6px 12px", background: W34_T.accent4 + "cc", border: "none", color: "#fff", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>appendleft</button>
        <button onClick={popleft} style={{ padding: "6px 12px", background: W34_T.accent4 + "44", border: `1px solid ${W34_T.accent4}`, color: W34_T.accent4, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>popleft</button>
        <button onClick={append} style={{ padding: "6px 12px", background: W34_T.purple + "cc", border: "none", color: "#fff", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>append</button>
        <button onClick={pop} style={{ padding: "6px 12px", background: W34_T.purple + "44", border: `1px solid ${W34_T.purple}`, color: W34_T.purple, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>pop</button>
      </div>
      {msg && <div style={{ marginTop: 10, color: W34_T.accent, fontFamily: "monospace", fontSize: 13 }}>{msg}</div>}
    </div>
  );
}

/* ─────────────────── HEAP VIZ ─────────────────── */
function W34_HeapViz() {
  const [heap, setHeap] = useState([1, 3, 2, 9, 5, 7]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const push = () => {
    const v = parseInt(input);
    if (isNaN(v)) return;
    const h = [...heap, v];
    // bubble up
    let i = h.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (h[parent] > h[i]) { [h[parent], h[i]] = [h[i], h[parent]]; i = parent; }
      else break;
    }
    setHeap(h);
    setMsg(`heappush(${v}) → 최솟값: ${h[0]}`);
    setInput("");
  };

  const pop = () => {
    if (!heap.length) return;
    const h = [...heap];
    const min = h[0];
    h[0] = h[h.length - 1];
    h.pop();
    let i = 0;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < h.length && h[l] < h[smallest]) smallest = l;
      if (r < h.length && h[r] < h[smallest]) smallest = r;
      if (smallest !== i) { [h[smallest], h[i]] = [h[i], h[smallest]]; i = smallest; }
      else break;
    }
    setHeap(h);
    setMsg(`heappop() → ${min} 꺼냄, 새 최솟값: ${h[0] ?? "없음"}`);
  };

  const getPos = (i, n) => {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (Math.pow(2, level) - 1);
    const totalInLevel = Math.pow(2, level);
    const x = ((posInLevel + 0.5) / totalInLevel) * 300;
    const y = level * 54 + 20;
    return { x, y };
  };

  const lines = heap.map((_, i) => {
    if (i === 0) return null;
    const parent = Math.floor((i - 1) / 2);
    const p1 = getPos(parent, heap.length);
    const p2 = getPos(i, heap.length);
    return <line key={`l${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={W34_T.border} strokeWidth={2} />;
  });

  const nodes = heap.map((v, i) => {
    const { x, y } = getPos(i, heap.length);
    return (
      <g key={`n${i}`}>
        <circle cx={x} cy={y} r={18} fill={i === 0 ? W34_T.accent + "33" : W34_T.card} stroke={i === 0 ? W34_T.accent : W34_T.border} strokeWidth={2} />
        <text x={x} y={y + 5} textAnchor="middle" fill={W34_T.text} fontSize={13} fontWeight={i === 0 ? 700 : 400} fontFamily="monospace">{v}</text>
      </g>
    );
  });

  const svgHeight = heap.length > 0 ? Math.floor(Math.log2(heap.length)) * 54 + 60 : 60;

  return (
    <div style={{ background: "#080b07", border: `1px solid ${W34_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <svg width="300" height={svgHeight} style={{ display: "block", margin: "0 auto 12px" }}>
        {lines}
        {nodes}
      </svg>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && push()}
          placeholder="숫자"
          style={{ padding: "8px 12px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
            color: W34_T.text, borderRadius: 8, width: 80, fontFamily: "monospace" }} />
        <button onClick={push} style={{ padding: "8px 16px", background: W34_T.accent, border: "none", color: "#000", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>heappush</button>
        <button onClick={pop} style={{ padding: "8px 16px", background: W34_T.danger, border: "none", color: "#fff", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>heappop</button>
        {msg && <span style={{ color: W34_T.accent, fontSize: 13, fontFamily: "monospace" }}>{msg}</span>}
      </div>
    </div>
  );
}

/* ─────────────────── HASHMAP VIZ ─────────────────── */
function W34_HashMapViz() {
  const [entries, setEntries] = useState([["apple", 3], ["banana", 1], ["cherry", 5]]);
  const [key, setKey] = useState("");
  const [val, setVal] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [found, setFound] = useState(null);

  const add = () => {
    if (!key) return;
    setEntries(e => {
      const filtered = e.filter(([k]) => k !== key);
      return [...filtered, [key, val]];
    });
    setKey(""); setVal(""); setFound(null);
  };

  const search = () => {
    const e = entries.find(([k]) => k === searchKey);
    setFound(e ? e[1] : "❌ 없음");
  };

  const bucketSize = 5;
  const hash = (k) => k.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % bucketSize;
  const buckets = Array.from({ length: bucketSize }, (_, i) => entries.filter(([k]) => hash(k) === i));

  return (
    <div style={{ background: "#080b07", border: `1px solid ${W34_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* Buckets */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ color: W34_T.muted, fontSize: 12, marginBottom: 8 }}>해시 버킷 (크기 {bucketSize})</div>
          {buckets.map((bucket, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 28, height: 34, background: W34_T.card, border: `1px solid ${W34_T.border}`,
                borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                color: W34_T.muted, fontSize: 11, fontFamily: "monospace" }}>{i}</div>
              {bucket.map(([k, v]) => (
                <div key={k} style={{ padding: "4px 10px", background: W34_T.accent + "22",
                  border: `1px solid ${W34_T.accent}55`, borderRadius: 6, fontSize: 12, color: W34_T.accent,
                  fontFamily: "monospace" }}>{k}: {v}</div>
              ))}
              {bucket.length === 0 && <div style={{ color: W34_T.muted, fontSize: 12 }}>—</div>}
            </div>
          ))}
        </div>
        {/* Controls */}
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ color: W34_T.muted, fontSize: 12, marginBottom: 8 }}>추가</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            <input value={key} onChange={e => setKey(e.target.value)} placeholder="key"
              style={{ width: 80, padding: "6px 10px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
                color: W34_T.text, borderRadius: 6, fontFamily: "monospace", fontSize: 12 }} />
            <input value={val} onChange={e => setVal(e.target.value)} placeholder="value"
              style={{ width: 60, padding: "6px 10px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
                color: W34_T.text, borderRadius: 6, fontFamily: "monospace", fontSize: 12 }} />
            <button onClick={add} style={{ padding: "6px 12px", background: W34_T.accent2, border: "none",
              color: "#000", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12 }}>추가</button>
          </div>
          <div style={{ color: W34_T.muted, fontSize: 12, marginBottom: 8 }}>탐색 O(1)</div>
          <div style={{ display: "flex", gap: 6 }}>
            <input value={searchKey} onChange={e => setSearchKey(e.target.value)} placeholder="key"
              style={{ width: 100, padding: "6px 10px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
                color: W34_T.text, borderRadius: 6, fontFamily: "monospace", fontSize: 12 }} />
            <button onClick={search} style={{ padding: "6px 12px", background: W34_T.accent3, border: "none",
              color: "#000", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12 }}>탐색</button>
          </div>
          {found !== null && <div style={{ marginTop: 10, color: W34_T.accent, fontFamily: "monospace", fontSize: 13 }}>
            → {found}
          </div>}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── TWO POINTER VIZ ─────────────────── */
function W34_TwoPtrViz() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [target, setTarget] = useState(11);
  const [step, setStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(-1);

  const run = () => {
    const s = [];
    let l = 0, r = arr.length - 1;
    while (l < r) {
      const sum = arr[l] + arr[r];
      s.push({ l, r, sum, found: sum === target });
      if (sum === target) break;
      else if (sum < target) l++;
      else r--;
    }
    setSteps(s);
    setIdx(0);
    setStep(s[0]);
  };

  const next = () => {
    const ni = Math.min(idx + 1, steps.length - 1);
    setIdx(ni);
    setStep(steps[ni]);
  };

  const prev = () => {
    const ni = Math.max(idx - 1, 0);
    setIdx(ni);
    setStep(steps[ni]);
  };

  return (
    <div style={{ background: "#080b07", border: `1px solid ${W34_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ color: W34_T.text, fontSize: 13 }}>합 = <strong style={{ color: W34_T.accent }}>{target}</strong> 인 쌍 찾기:</span>
        <select value={target} onChange={e => { setTarget(Number(e.target.value)); setSteps([]); setIdx(-1); setStep(null); }}
          style={{ padding: "6px 10px", background: W34_T.card, border: `1px solid ${W34_T.border}`, color: W34_T.text, borderRadius: 6 }}>
          {[7, 9, 11, 13, 15, 17].map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={run} style={{ padding: "6px 16px", background: W34_T.accent, border: "none", color: "#000", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>실행</button>
        {steps.length > 0 && <>
          <button onClick={prev} style={{ padding: "6px 10px", background: W34_T.card, border: `1px solid ${W34_T.border}`, color: W34_T.text, borderRadius: 6, cursor: "pointer" }}>◀</button>
          <button onClick={next} style={{ padding: "6px 10px", background: W34_T.card, border: `1px solid ${W34_T.border}`, color: W34_T.text, borderRadius: 6, cursor: "pointer" }}>▶</button>
          <span style={{ color: W34_T.muted, fontSize: 12 }}>{idx + 1}/{steps.length}</span>
        </>}
      </div>
      <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
        {arr.map((v, i) => {
          const isL = step && i === step.l;
          const isR = step && i === step.r;
          const bg = isL ? W34_T.accent3 + "44" : isR ? W34_T.accent4 + "44" : W34_T.card;
          const border = isL ? W34_T.accent3 : isR ? W34_T.accent4 : W34_T.border;
          return (
            <div key={i} style={{ width: 44, height: 44, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", background: bg,
              border: `2px solid ${border}`, borderRadius: 8, transition: "all 0.25s" }}>
              <div style={{ color: W34_T.text, fontWeight: 700, fontFamily: "monospace" }}>{v}</div>
              {isL && <div style={{ fontSize: 9, color: W34_T.accent3 }}>L</div>}
              {isR && <div style={{ fontSize: 9, color: W34_T.accent4 }}>R</div>}
            </div>
          );
        })}
      </div>
      {step && (
        <div style={{ padding: "10px 14px", background: step.found ? W34_T.accent + "15" : W34_T.card,
          border: `1px solid ${step.found ? W34_T.accent : W34_T.border}`, borderRadius: 8, fontSize: 13, fontFamily: "monospace" }}>
          arr[{step.l}]({arr[step.l]}) + arr[{step.r}]({arr[step.r]}) = {step.sum}
          {step.found
            ? <span style={{ color: W34_T.accent, marginLeft: 10 }}>✅ 발견!</span>
            : step.sum < target
              ? <span style={{ color: W34_T.muted, marginLeft: 10 }}>→ 합이 작음, L++</span>
              : <span style={{ color: W34_T.muted, marginLeft: 10 }}>→ 합이 큼, R--</span>}
        </div>
      )}
    </div>
  );
}

/* ─────────────────── SLIDING WINDOW VIZ ─────────────────── */
function W34_SlidingWindowViz() {
  const arr = [2, 1, 5, 1, 3, 2, 6, 4, 1, 3];
  const [k, setK] = useState(3);
  const [winIdx, setWinIdx] = useState(0);
  const maxStart = arr.length - k;

  const maxSum = Math.max(...Array.from({ length: arr.length - k + 1 }, (_, i) =>
    arr.slice(i, i + k).reduce((a, b) => a + b, 0)));

  const curSum = arr.slice(winIdx, winIdx + k).reduce((a, b) => a + b, 0);

  return (
    <div style={{ background: "#080b07", border: `1px solid ${W34_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ color: W34_T.text, fontSize: 13 }}>윈도우 크기 k =</span>
        <input type="range" min={1} max={5} value={k} onChange={e => { setK(Number(e.target.value)); setWinIdx(0); }}
          style={{ width: 100, accentColor: W34_T.accent2 }} />
        <span style={{ color: W34_T.accent2, fontWeight: 700 }}>{k}</span>
      </div>
      <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
        {arr.map((v, i) => {
          const inWin = i >= winIdx && i < winIdx + k;
          return (
            <div key={i} style={{ width: 40, height: 48, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", background: inWin ? W34_T.accent2 + "33" : W34_T.card,
              border: `2px solid ${inWin ? W34_T.accent2 : W34_T.border}`, borderRadius: 8,
              transition: "all 0.25s", gap: 2 }}>
              <div style={{ color: W34_T.text, fontWeight: inWin ? 700 : 400, fontFamily: "monospace" }}>{v}</div>
              <div style={{ fontSize: 9, color: W34_T.muted }}>{i}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <button onClick={() => setWinIdx(Math.max(0, winIdx - 1))}
          style={{ padding: "6px 12px", background: W34_T.card, border: `1px solid ${W34_T.border}`, color: W34_T.text, borderRadius: 6, cursor: "pointer" }}>◀</button>
        <button onClick={() => setWinIdx(Math.min(maxStart, winIdx + 1))}
          style={{ padding: "6px 12px", background: W34_T.card, border: `1px solid ${W34_T.border}`, color: W34_T.text, borderRadius: 6, cursor: "pointer" }}>▶</button>
        <span style={{ color: W34_T.muted, fontSize: 12 }}>시작 인덱스: {winIdx}</span>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 13, fontFamily: "monospace" }}>
        <span>현재 합: <strong style={{ color: W34_T.accent2 }}>{curSum}</strong></span>
        <span>최대 합: <strong style={{ color: W34_T.accent }}>{maxSum}</strong> {curSum === maxSum && "← ✅ 최대!"}</span>
      </div>
    </div>
  );
}

/* ─────────────────── SECTIONS ─────────────────── */

export { W34_StackViz, W34_QueueViz, W34_DequeViz, W34_HeapViz, W34_HashMapViz, W34_TwoPtrViz, W34_SlidingWindowViz };
