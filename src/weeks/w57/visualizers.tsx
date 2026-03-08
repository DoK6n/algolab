// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { W57_T } from './theme';

const W57_GRAPH_NODES = {
  1: { x: 150, y: 60 },
  2: { x: 60,  y: 160 },
  3: { x: 240, y: 160 },
  4: { x: 30,  y: 270 },
  5: { x: 130, y: 270 },
  6: { x: 260, y: 270 },
};
const W57_GRAPH_EDGES = [[1,2],[1,3],[2,4],[2,5],[3,5],[3,6]];
const W57_GRAPH_ADJ = { 1:[2,3], 2:[1,4,5], 3:[1,5,6], 4:[2], 5:[2,3], 6:[3] };

function W57_GraphSVG({ visited = [], current = null, queue = [], path = [], nodeColor, edgeColor }) {
  const getNC = (n) => {
    if (n === current) return W57_T.accent;
    if (nodeColor && nodeColor[n]) return nodeColor[n];
    if (visited.includes(n)) return W57_T.green;
    if (queue.includes(n)) return W57_T.warn;
    return W57_T.nodeBorder;
  };

  return (
    <svg viewBox="0 0 300 330" style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto" }}>
      {W57_GRAPH_EDGES.map(([a, b], i) => {
        const bothVisited = visited.includes(a) && visited.includes(b);
        const inPath = path.some(([x,y]) => (x===a&&y===b)||(x===b&&y===a));
        return (
          <line key={i}
            x1={W57_GRAPH_NODES[a].x} y1={W57_GRAPH_NODES[a].y}
            x2={W57_GRAPH_NODES[b].x} y2={W57_GRAPH_NODES[b].y}
            stroke={inPath ? W57_T.accent : bothVisited ? W57_T.green + "88" : W57_T.border}
            strokeWidth={inPath ? 3 : 2}
          />
        );
      })}
      {Object.entries(W57_GRAPH_NODES).map(([n, {x,y}]) => {
        const nc = getNC(Number(n));
        return (
          <g key={n}>
            <circle cx={x} cy={y} r={22}
              fill={nc === W57_T.nodeBorder ? W57_T.node : nc + "33"}
              stroke={nc} strokeWidth={2.5}
              style={{ transition: "all 0.35s" }}
            />
            <text x={x} y={y+5} textAnchor="middle" fill={W57_T.text}
              fontSize={14} fontWeight={700} fontFamily="monospace">{n}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ══════════════════════════════ DFS VISUALIZER ══════════════════════════════ */
function W57_DFSViz() {
  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const buildSteps = () => {
    const s = [{ visited: [], stack: [1], current: null, msg: "시작: 스택에 노드 1 추가" }];
    const visited = [];
    const stack = [1];
    while (stack.length) {
      const node = stack.pop();
      if (visited.includes(node)) {
        s.push({ visited: [...visited], stack: [...stack], current: node, msg: `노드 ${node} 이미 방문 — 스킵` });
        continue;
      }
      visited.push(node);
      s.push({ visited: [...visited], stack: [...stack], current: node, msg: `노드 ${node} 방문! 스택: [${stack.join(",")}]` });
      const neighbors = [...(W57_GRAPH_ADJ[node] || [])].reverse();
      for (const nb of neighbors) {
        if (!visited.includes(nb)) {
          stack.push(nb);
          s.push({ visited: [...visited], stack: [...stack], current: node, msg: `인접 노드 ${nb} → 스택에 push` });
        }
      }
    }
    s.push({ visited: [...visited], stack: [], current: null, msg: `완료! 방문 순서: ${visited.join(" → ")}` });
    return s;
  };

  const start = () => { const s = buildSteps(); setSteps(s); setIdx(0); };
  const step = steps[idx] || { visited: [], stack: [], current: null, msg: "" };

  useEffect(() => {
    if (running && steps.length) {
      timerRef.current = setInterval(() => {
        setIdx(p => { if (p >= steps.length - 1) { setRunning(false); return p; } return p + 1; });
      }, 700);
    }
    return () => clearInterval(timerRef.current);
  }, [running, steps]);

  return (
    <div style={{ background: "#07080e", border: `1px solid ${W57_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 auto" }}>
          <W57_GraphSVG visited={step.visited} current={step.current} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: W57_T.muted, fontSize: 12, marginBottom: 4 }}>스택 (LIFO)</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {step.stack.length === 0
                ? <span style={{ color: W57_T.muted, fontSize: 12 }}>비어있음</span>
                : [...step.stack].reverse().map((n, i) => (
                  <div key={i} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                    background: i === 0 ? W57_T.accent + "33" : W57_T.card, border: `2px solid ${i === 0 ? W57_T.accent : W57_T.border}`,
                    borderRadius: 6, color: W57_T.text, fontWeight: 700, fontFamily: "monospace", fontSize: 13 }}>{n}</div>
                ))}
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: W57_T.muted, fontSize: 12, marginBottom: 4 }}>방문 순서</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {step.visited.map((n, i) => (
                <span key={i} style={{ color: W57_T.green, fontFamily: "monospace", fontSize: 13 }}>
                  {i > 0 && "→"} {n}
                </span>
              ))}
            </div>
          </div>
          {step.msg && (
            <div style={{ padding: "8px 12px", background: W57_T.card, borderLeft: `3px solid ${W57_T.accent}`,
              borderRadius: "0 8px 8px 0", fontSize: 13, color: W57_T.text, fontFamily: "monospace" }}>
              {step.msg}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        <button onClick={start} style={{ padding: "7px 16px", background: W57_T.accent, border: "none", color: "#fff", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>🔴 시작</button>
        <button onClick={() => setIdx(p => Math.max(0, p - 1))} disabled={idx <= 0}
          style={{ padding: "7px 12px", background: W57_T.card, border: `1px solid ${W57_T.border}`, color: W57_T.text, borderRadius: 8, cursor: "pointer" }}>◀</button>
        <button onClick={() => setIdx(p => Math.min(steps.length - 1, p + 1))} disabled={idx >= steps.length - 1}
          style={{ padding: "7px 12px", background: W57_T.card, border: `1px solid ${W57_T.border}`, color: W57_T.text, borderRadius: 8, cursor: "pointer" }}>▶</button>
        <button onClick={() => setRunning(r => !r)} disabled={!steps.length}
          style={{ padding: "7px 14px", background: running ? W57_T.danger : W57_T.green, border: "none", color: "#000", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>
          {running ? "⏸" : "▶ 자동"}
        </button>
        {steps.length > 0 && <span style={{ color: W57_T.muted, fontSize: 12, alignSelf: "center" }}>{idx + 1}/{steps.length}</span>}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12 }}>
        <span><span style={{ color: W57_T.accent }}>●</span> 현재</span>
        <span><span style={{ color: W57_T.green }}>●</span> 방문</span>
        <span><span style={{ color: W57_T.warn }}>●</span> 큐/스택</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════ BFS VISUALIZER ══════════════════════════════ */
function W57_BFSViz() {
  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const buildSteps = () => {
    const s = [{ visited: [], queue: [1], current: null, level: {1:0}, msg: "시작: 큐에 노드 1 추가 (레벨 0)" }];
    const visited = [1];
    const queue = [1];
    const level = {1: 0};
    while (queue.length) {
      const node = queue.shift();
      s.push({ visited: [...visited], queue: [...queue], current: node, level: {...level}, msg: `노드 ${node} (레벨 ${level[node]}) 방문!` });
      for (const nb of (W57_GRAPH_ADJ[node] || [])) {
        if (!visited.includes(nb)) {
          visited.push(nb);
          queue.push(nb);
          level[nb] = level[node] + 1;
          s.push({ visited: [...visited], queue: [...queue], current: node, level: {...level}, msg: `인접 노드 ${nb} → 큐에 enqueue (레벨 ${level[nb]})` });
        }
      }
    }
    s.push({ visited: [...visited], queue: [], current: null, level: {...level}, msg: `완료! BFS 방문 순서: ${visited.join(" → ")}` });
    return s;
  };

  const start = () => { const s = buildSteps(); setSteps(s); setIdx(0); };
  const step = steps[idx] || { visited: [], queue: [], current: null, level: {}, msg: "" };

  useEffect(() => {
    if (running && steps.length) {
      timerRef.current = setInterval(() => {
        setIdx(p => { if (p >= steps.length - 1) { setRunning(false); return p; } return p + 1; });
      }, 700);
    }
    return () => clearInterval(timerRef.current);
  }, [running, steps]);

  const levelColors = ["#e8645a", "#f0a500", "#4fc4cf", "#52d68a"];

  return (
    <div style={{ background: "#07080e", border: `1px solid ${W57_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 auto" }}>
          <W57_GraphSVG
            visited={step.visited}
            current={step.current}
            queue={step.queue}
            nodeColor={Object.fromEntries(Object.entries(step.level || {}).map(([n, l]) => [n, step.visited.includes(Number(n)) ? levelColors[l] || W57_T.green : W57_T.nodeBorder]))}
          />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: W57_T.muted, fontSize: 12, marginBottom: 4 }}>큐 (FIFO) — 앞 ← 뒤</div>
            <div style={{ display: "flex", gap: 4 }}>
              {step.queue.length === 0
                ? <span style={{ color: W57_T.muted, fontSize: 12 }}>비어있음</span>
                : step.queue.map((n, i) => (
                  <div key={i} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                    background: i === 0 ? W57_T.warn + "33" : W57_T.card,
                    border: `2px solid ${i === 0 ? W57_T.warn : W57_T.border}`,
                    borderRadius: 6, color: W57_T.text, fontWeight: 700, fontFamily: "monospace", fontSize: 13 }}>{n}</div>
                ))}
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: W57_T.muted, fontSize: 12, marginBottom: 4 }}>레벨별 탐색</div>
            {[0,1,2].map(l => {
              const nodes = Object.entries(step.level || {}).filter(([,lv]) => lv === l).map(([n]) => Number(n));
              return nodes.length ? (
                <div key={l} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                  <span style={{ color: levelColors[l], fontSize: 11, minWidth: 50 }}>레벨 {l}:</span>
                  {nodes.map(n => <span key={n} style={{ color: step.visited.includes(n) ? levelColors[l] : W57_T.muted, fontFamily: "monospace", fontSize: 13 }}>{n}</span>)}
                </div>
              ) : null;
            })}
          </div>
          {step.msg && (
            <div style={{ padding: "8px 12px", background: W57_T.card, borderLeft: `3px solid ${W57_T.w6}`,
              borderRadius: "0 8px 8px 0", fontSize: 13, color: W57_T.text, fontFamily: "monospace" }}>
              {step.msg}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        <button onClick={start} style={{ padding: "7px 16px", background: W57_T.w6, border: "none", color: "#000", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>🟠 시작</button>
        <button onClick={() => setIdx(p => Math.max(0, p - 1))} disabled={idx <= 0}
          style={{ padding: "7px 12px", background: W57_T.card, border: `1px solid ${W57_T.border}`, color: W57_T.text, borderRadius: 8, cursor: "pointer" }}>◀</button>
        <button onClick={() => setIdx(p => Math.min(steps.length - 1, p + 1))} disabled={idx >= steps.length - 1}
          style={{ padding: "7px 12px", background: W57_T.card, border: `1px solid ${W57_T.border}`, color: W57_T.text, borderRadius: 8, cursor: "pointer" }}>▶</button>
        <button onClick={() => setRunning(r => !r)} disabled={!steps.length}
          style={{ padding: "7px 14px", background: running ? W57_T.danger : W57_T.green, border: "none", color: "#000", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>
          {running ? "⏸" : "▶ 자동"}
        </button>
        {steps.length > 0 && <span style={{ color: W57_T.muted, fontSize: 12, alignSelf: "center" }}>{idx + 1}/{steps.length}</span>}
      </div>
    </div>
  );
}

/* ══════════════════════════════ DIJKSTRA VIZ ══════════════════════════════ */
const W57_DJ_NODES = { 1:{x:150,y:50}, 2:{x:60,y:150}, 3:{x:240,y:150}, 4:{x:30,y:260}, 5:{x:150,y:260}, 6:{x:270,y:260} };
const W57_DJ_EDGES = [[1,2,2],[1,3,4],[2,3,1],[2,4,7],[3,5,3],[4,5,1],[4,6,8],[5,6,2]];
const W57_DJ_ADJ = {
  1:[[2,2],[3,4]], 2:[[1,2],[3,1],[4,7]], 3:[[1,4],[2,1],[5,3]],
  4:[[2,7],[5,1],[6,8]], 5:[[3,3],[4,1],[6,2]], 6:[[4,8],[5,2]]
};

function W57_DijkstraViz() {
  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(-1);

  const buildSteps = () => {
    const INF = Infinity;
    const dist = {1:0,2:INF,3:INF,4:INF,5:INF,6:INF};
    const visited = new Set();
    const s = [{ dist:{...dist}, visited:[], current:null, msg:"초기화: dist[1]=0, 나머지=∞" }];

    for (let iter = 0; iter < 6; iter++) {
      // pick min dist unvisited
      let u = null;
      for (const [n, d] of Object.entries(dist)) {
        if (!visited.has(Number(n)) && (u === null || d < dist[u])) u = Number(n);
      }
      if (u === null || dist[u] === INF) break;
      visited.add(u);
      s.push({ dist:{...dist}, visited:[...visited], current:u, msg:`노드 ${u} 선택 (dist=${dist[u] === INF ? "∞" : dist[u]})` });

      for (const [v, w] of (W57_DJ_ADJ[u] || [])) {
        if (!visited.has(v) && dist[u] + w < dist[v]) {
          const old = dist[v];
          dist[v] = dist[u] + w;
          s.push({ dist:{...dist}, visited:[...visited], current:u,
            msg:`dist[${v}] 갱신: ${old===INF?"∞":old} → ${dist[v]} (via ${u})` });
        }
      }
    }
    s.push({ dist:{...dist}, visited:[...visited], current:null, msg:"완료!" });
    return s;
  };

  const start = () => { const s = buildSteps(); setSteps(s); setIdx(0); };
  const step = steps[idx] || { dist:{}, visited:[], current:null, msg:"" };

  const getNC = (n) => {
    if (n === step.current) return W57_T.accent;
    if (step.visited.includes(n)) return W57_T.green;
    return W57_T.nodeBorder;
  };

  return (
    <div style={{ background: "#07080e", border: `1px solid ${W57_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <svg viewBox="0 0 310 300" style={{ width: "100%", maxWidth: 310, flex: "0 0 auto" }}>
          {W57_DJ_EDGES.map(([a,b,w], i) => {
            const ax = W57_DJ_NODES[a].x, ay = W57_DJ_NODES[a].y;
            const bx = W57_DJ_NODES[b].x, by = W57_DJ_NODES[b].y;
            const mx = (ax+bx)/2, my = (ay+by)/2;
            return (
              <g key={i}>
                <line x1={ax} y1={ay} x2={bx} y2={by} stroke={W57_T.border} strokeWidth={2} />
                <rect x={mx-10} y={my-9} width={20} height={16} rx={4} fill={W57_T.surface} />
                <text x={mx} y={my+4} textAnchor="middle" fill={W57_T.w6} fontSize={11} fontWeight={700} fontFamily="monospace">{w}</text>
              </g>
            );
          })}
          {Object.entries(W57_DJ_NODES).map(([n,{x,y}]) => {
            const nc = getNC(Number(n));
            const d = step.dist[Number(n)];
            return (
              <g key={n}>
                <circle cx={x} cy={y} r={22} fill={nc===W57_T.nodeBorder ? W57_T.node : nc+"33"} stroke={nc} strokeWidth={2.5} style={{transition:"all 0.3s"}} />
                <text x={x} y={y+1} textAnchor="middle" fill={W57_T.text} fontSize={13} fontWeight={700} fontFamily="monospace">{n}</text>
                {d !== undefined && (
                  <text x={x} y={y+14} textAnchor="middle" fill={nc===W57_T.nodeBorder?W57_T.muted:nc} fontSize={10} fontFamily="monospace">
                    {d===Infinity?"∞":d}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ color: W57_T.muted, fontSize: 12, marginBottom: 8 }}>최단 거리 테이블 (노드 1 기준)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[1,2,3,4,5,6].map(n => {
              const d = step.dist[n];
              const isVisited = step.visited && step.visited.includes(n);
              return (
                <div key={n} style={{ display:"flex", gap:8, alignItems:"center",
                  padding:"4px 10px", background: n===step.current ? W57_T.accent+"22" : isVisited ? W57_T.green+"11" : W57_T.card,
                  borderRadius:6, border:`1px solid ${n===step.current?W57_T.accent:isVisited?W57_T.green:W57_T.border}`,
                  transition:"all 0.3s" }}>
                  <span style={{ color:W57_T.text, fontFamily:"monospace", minWidth:40 }}>노드 {n}</span>
                  <span style={{ color: d===Infinity?W57_T.muted:W57_T.w6, fontFamily:"monospace", fontWeight:700 }}>
                    {d===undefined||d===Infinity ? "∞" : d}
                  </span>
                  {isVisited && <span style={{color:W57_T.green,fontSize:11}}>✓ 확정</span>}
                </div>
              );
            })}
          </div>
          {step.msg && (
            <div style={{ marginTop:10, padding:"8px 12px", background:W57_T.card, borderLeft:`3px solid ${W57_T.w6}`,
              borderRadius:"0 8px 8px 0", fontSize:12, color:W57_T.text, fontFamily:"monospace" }}>
              {step.msg}
            </div>
          )}
        </div>
      </div>
      <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
        <button onClick={start} style={{padding:"7px 16px",background:W57_T.w6,border:"none",color:"#000",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13}}>⚡ 시작</button>
        <button onClick={() => setIdx(p => Math.max(0,p-1))} disabled={idx<=0}
          style={{padding:"7px 12px",background:W57_T.card,border:`1px solid ${W57_T.border}`,color:W57_T.text,borderRadius:8,cursor:"pointer"}}>◀</button>
        <button onClick={() => setIdx(p => Math.min(steps.length-1,p+1))} disabled={idx>=steps.length-1}
          style={{padding:"7px 12px",background:W57_T.card,border:`1px solid ${W57_T.border}`,color:W57_T.text,borderRadius:8,cursor:"pointer"}}>▶</button>
        {steps.length>0 && <span style={{color:W57_T.muted,fontSize:12,alignSelf:"center"}}>{idx+1}/{steps.length}</span>}
      </div>
    </div>
  );
}

/* ══════════════════════════════ FLOYD VIZ ══════════════════════════════ */
function W57_FloydViz() {
  const n = 4;
  const INF = 999;
  const initDist = [
    [0,   3,   INF, 7  ],
    [8,   0,   2,   INF],
    [5,   INF, 0,   1  ],
    [2,   INF, INF, 0  ],
  ];
  const [dist, setDist] = useState(initDist.map(r => [...r]));
  const [k, setK] = useState(-1);
  const [highlight, setHighlight] = useState(null);
  const [msg, setMsg] = useState("플로이드-워셜: 모든 쌍 최단 경로");
  const [done, setDone] = useState(false);

  const reset = () => { setDist(initDist.map(r=>[...r])); setK(-1); setMsg("플로이드-워셜: 모든 쌍 최단 경로"); setDone(false); setHighlight(null); };

  const nextK = () => {
    if (done) return;
    const nk = k + 1;
    if (nk >= n) { setDone(true); setMsg("완료! 모든 쌍의 최단 경로가 계산되었습니다."); return; }
    const nd = dist.map(r => [...r]);
    let updated = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (nd[i][nk] + nd[nk][j] < nd[i][j]) {
          nd[i][j] = nd[i][nk] + nd[nk][j];
          updated++;
        }
      }
    }
    setDist(nd);
    setK(nk);
    setHighlight(nk);
    setMsg(`경유 노드 ${nk+1}: ${updated}개 경로 갱신됨`);
  };

  const cell = (v) => v === INF ? "∞" : v;

  return (
    <div style={{ background: "#07080e", border: `1px solid ${W57_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", fontFamily: "monospace", fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ padding: "6px 12px", color: W57_T.muted, border: `1px solid ${W57_T.border}` }}>i\j</th>
              {[1,2,3,4].map(j => (
                <th key={j} style={{ padding: "6px 12px", color: j-1===highlight ? W57_T.w6 : W57_T.text,
                  border: `1px solid ${W57_T.border}`, background: j-1===highlight ? W57_T.w6+"22" : "transparent" }}>
                  {j}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dist.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: "6px 12px", color: i===highlight ? W57_T.w6 : W57_T.text,
                  border: `1px solid ${W57_T.border}`, background: i===highlight ? W57_T.w6+"22" : "transparent", fontWeight: 700 }}>
                  {i+1}
                </td>
                {row.map((v, j) => (
                  <td key={j} style={{ padding: "6px 14px", textAlign: "center",
                    border: `1px solid ${W57_T.border}`,
                    background: (i===highlight||j===highlight) && i!==j ? W57_T.w6+"11" : "transparent",
                    color: v === 0 ? W57_T.muted : v === INF ? W57_T.muted+"88" : W57_T.green,
                    fontWeight: v===0 ? 400 : 700, transition: "all 0.3s" }}>
                    {cell(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display:"flex", gap:8, marginTop:12, alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={nextK} disabled={done}
          style={{padding:"7px 16px",background:W57_T.w6,border:"none",color:"#000",borderRadius:8,cursor:"pointer",fontWeight:700}}>
          다음 k ({k+2 <= n ? `k=${k+2}` : "끝"})
        </button>
        <button onClick={reset}
          style={{padding:"7px 14px",background:W57_T.card,border:`1px solid ${W57_T.border}`,color:W57_T.muted,borderRadius:8,cursor:"pointer"}}>
          🔄 리셋
        </button>
        <span style={{color: done ? W57_T.green : W57_T.w6, fontSize:13, fontFamily:"monospace"}}>{msg}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════ W57_TREE TRAVERSAL VIZ ══════════════════════════════ */
const W57_TREE = {
  val: 1,
  left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
  right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } },
};

function W57_drawTree(node, x, y, gap, items) {
  if (!node) return;
  items.push({ val: node.val, x, y });
  if (node.left) {
    items.push({ type: "edge", x1: x, y1: y, x2: x - gap, y2: y + 60 });
    W57_drawTree(node.left, x - gap, y + 60, gap / 2, items);
  }
  if (node.right) {
    items.push({ type: "edge", x1: x, y1: y, x2: x + gap, y2: y + 60 });
    W57_drawTree(node.right, x + gap, y + 60, gap / 2, items);
  }
}

function W57_getTraversal(node, type) {
  if (!node) return [];
  if (type === "pre") return [node.val, ...W57_getTraversal(node.left, type), ...W57_getTraversal(node.right, type)];
  if (type === "in") return [...W57_getTraversal(node.left, type), node.val, ...W57_getTraversal(node.right, type)];
  return [...W57_getTraversal(node.left, type), ...W57_getTraversal(node.right, type), node.val];
}

function W57_TreeViz() {
  const [type, setType] = useState("pre");
  const [step, setStep] = useState(-1);
  const items = [];
  W57_drawTree(W57_TREE, 155, 40, 70, items);
  const trav = W57_getTraversal(W57_TREE, type);

  const activeVals = step >= 0 ? trav.slice(0, step + 1) : [];
  const currentVal = step >= 0 ? trav[step] : null;

  const typeLabel = { pre: "전위 (Pre-order): 루트→왼→오", in: "중위 (In-order): 왼→루트→오", post: "후위 (Post-order): 왼→오→루트" };

  return (
    <div style={{ background: "#07080e", border: `1px solid ${W57_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {["pre","in","post"].map(t => (
          <button key={t} onClick={() => { setType(t); setStep(-1); }}
            style={{ padding: "6px 14px", background: type===t ? W57_T.w7 : W57_T.card,
              border: `1px solid ${type===t ? W57_T.w7 : W57_T.border}`,
              color: type===t ? "#000" : W57_T.muted, borderRadius: 8, cursor: "pointer", fontWeight: type===t ? 700 : 400, fontSize: 13 }}>
            {t === "pre" ? "전위" : t === "in" ? "중위" : "후위"}
          </button>
        ))}
        <span style={{ color: W57_T.muted, fontSize: 12, alignSelf: "center" }}>{typeLabel[type]}</span>
      </div>
      <svg viewBox="0 0 310 200" style={{ width: "100%", maxWidth: 310, display: "block", margin: "0 auto 10px" }}>
        {items.filter(i => i.type === "edge").map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={W57_T.border} strokeWidth={2} />
        ))}
        {items.filter(i => !i.type).map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={20}
              fill={n.val === currentVal ? W57_T.w7 + "55" : activeVals.includes(n.val) ? W57_T.green + "33" : W57_T.node}
              stroke={n.val === currentVal ? W57_T.w7 : activeVals.includes(n.val) ? W57_T.green : W57_T.nodeBorder}
              strokeWidth={2.5} style={{ transition: "all 0.3s" }} />
            <text x={n.x} y={n.y+5} textAnchor="middle" fill={W57_T.text} fontSize={14} fontWeight={700} fontFamily="monospace">{n.val}</text>
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {trav.map((v, i) => (
          <div key={i} style={{ width: 32, height: 32, display:"flex", alignItems:"center", justifyContent:"center",
            background: i === step ? W57_T.w7+"44" : i < step ? W57_T.green+"33" : W57_T.card,
            border: `2px solid ${i === step ? W57_T.w7 : i < step ? W57_T.green : W57_T.border}`,
            borderRadius: 6, color: W57_T.text, fontFamily:"monospace", fontWeight:700, fontSize:13,
            transition:"all 0.3s" }}>{v}</div>
        ))}
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        <button onClick={() => setStep(-1)}
          style={{padding:"6px 12px",background:W57_T.card,border:`1px solid ${W57_T.border}`,color:W57_T.muted,borderRadius:8,cursor:"pointer",fontSize:12}}>초기화</button>
        <button onClick={() => setStep(p => Math.max(-1, p-1))}
          style={{padding:"6px 10px",background:W57_T.card,border:`1px solid ${W57_T.border}`,color:W57_T.text,borderRadius:8,cursor:"pointer"}}>◀</button>
        <button onClick={() => setStep(p => Math.min(trav.length-1, p+1))}
          style={{padding:"6px 10px",background:W57_T.card,border:`1px solid ${W57_T.border}`,color:W57_T.text,borderRadius:8,cursor:"pointer"}}>▶</button>
        <span style={{color:W57_T.muted,fontSize:12,alignSelf:"center"}}>{step+1}/{trav.length}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════ TRIE VIZ ══════════════════════════════ */
function W57_TrieViz() {
  const [words] = useState(["apple", "app", "apt", "banana", "band"]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  const buildTrie = (ws) => {
    const root = { children: {}, isEnd: false };
    for (const w of ws) {
      let node = root;
      for (const c of w) {
        if (!node.children[c]) node.children[c] = { children: {}, isEnd: false };
        node = node.children[c];
      }
      node.isEnd = true;
    }
    return root;
  };

  const trie = buildTrie(words);

  const doSearch = () => {
    let node = trie;
    for (const c of search) {
      if (!node.children[c]) { setResult({ found: false, msg: `'${search}' — 접두어 없음` }); return; }
      node = node.children[c];
    }
    if (node.isEnd) setResult({ found: true, msg: `'${search}' — 단어 존재 ✅` });
    else setResult({ found: "prefix", msg: `'${search}' — 접두어로 존재 (단어는 아님)` });
  };

  const renderTrie = (node, prefix = "", depth = 0, x = 155, y = 20, parentX = null, parentY = null) => {
    const items = [];
    if (parentX !== null) {
      items.push(<line key={`e${prefix}`} x1={parentX} y1={parentY} x2={x} y2={y} stroke={W57_T.border} strokeWidth={1.5} />);
    }
    const isHighlight = search && prefix.startsWith(search.slice(0, prefix.length)) && search.slice(0, prefix.length) === prefix;
    const isEnd = node.isEnd;
    items.push(
      <g key={`n${prefix}`}>
        <circle cx={x} cy={y} r={16}
          fill={isHighlight ? W57_T.w7+"44" : isEnd ? W57_T.green+"33" : W57_T.node}
          stroke={isHighlight ? W57_T.w7 : isEnd ? W57_T.green : W57_T.nodeBorder} strokeWidth={2} />
        <text x={x} y={y+5} textAnchor="middle" fill={W57_T.text} fontSize={11} fontFamily="monospace">
          {prefix.slice(-1) || "·"}
        </text>
        {isEnd && <text x={x+14} y={y-8} fill={W57_T.green} fontSize={8}>★</text>}
      </g>
    );
    const keys = Object.keys(node.children);
    const total = keys.length;
    keys.forEach((c, i) => {
      const spacing = Math.max(30, 90 / Math.pow(2, depth));
      const nx = x + (i - (total-1)/2) * spacing;
      const ny = y + 50;
      items.push(...renderTrie(node.children[c], prefix+c, depth+1, nx, ny, x, y));
    });
    return items;
  };

  return (
    <div style={{ background: "#07080e", border: `1px solid ${W57_T.border}`, borderRadius: 12, padding: 20, margin: "14px 0" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ color: W57_T.muted, fontSize: 12, marginBottom: 6 }}>
          삽입된 단어: {words.map(w => <W57_Badge key={w} color={W57_T.w7}>{w}</W57_Badge>).reduce((a,b) => [a," ",b])}
        </div>
      </div>
      <svg viewBox="0 0 310 230" style={{ width: "100%", maxWidth: 310, display: "block", margin: "0 auto 12px" }}>
        {renderTrie(trie)}
      </svg>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setResult(null); }}
          onKeyDown={e => e.key === "Enter" && doSearch()}
          placeholder="검색어 입력"
          style={{ padding: "8px 12px", background: W57_T.card, border: `1px solid ${W57_T.border}`,
            color: W57_T.text, borderRadius: 8, fontFamily: "monospace", width: 140 }} />
        <button onClick={doSearch}
          style={{ padding: "8px 14px", background: W57_T.w7, border: "none", color: "#000", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>
          탐색
        </button>
        {result && (
          <span style={{ color: result.found === true ? W57_T.green : result.found === "prefix" ? W57_T.warn : W57_T.danger, fontSize: 13, fontFamily: "monospace" }}>
            {result.msg}
          </span>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════ SECTIONS ══════════════════════════════ */

export { W57_DFSViz, W57_BFSViz, W57_DijkstraViz, W57_FloydViz, W57_TreeViz, W57_TrieViz };
