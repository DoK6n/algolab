// @ts-nocheck
import { useState } from 'react';
import { W1112_T } from './theme';

function W1112_UnionFindViz() {
  const n = 7;
  const [parent, setParent] = useState([0,1,2,3,4,5,6]);
  const [rank, setRank] = useState([0,0,0,0,0,0,0]);
  const [log, setLog] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);

  const find = (p, x) => {
    if (p[x] !== x) return find(p, p[x]);
    return x;
  };

  const doUnion = () => {
    const p = [...parent], r = [...rank];
    const ra = find(p, a), rb = find(p, b);
    if (ra === rb) {
      setLog(l => [`union(${a},${b}): 이미 같은 집합 (루트=${ra})`, ...l.slice(0,4)]);
      return;
    }
    if (r[ra] < r[rb]) p[ra] = rb;
    else if (r[ra] > r[rb]) p[rb] = ra;
    else { p[rb] = ra; r[ra]++; }
    setParent(p); setRank(r);
    setLog(l => [`union(${a},${b}): ${ra}번 ↔ ${rb}번 합병`, ...l.slice(0,4)]);
  };

  const doFind = () => {
    const root = find(parent, a);
    setLog(l => [`find(${a}): 루트 = ${root}`, ...l.slice(0,4)]);
  };

  const reset = () => {
    setParent([0,1,2,3,4,5,6]);
    setRank([0,0,0,0,0,0,0]);
    setLog([]);
  };

  // Build tree structure for display
  const roots = [...new Set(parent.map((_, i) => find(parent, i)))];
  const groups = roots.map(r => ({
    root: r,
    members: parent.map((_, i) => i).filter(i => find(parent, i) === r),
  }));

  return (
    <div style={{ background:"#010610", border:`1px solid ${W1112_T.border}`, borderRadius:12, padding:20, margin:"14px 0" }}>
      <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ color:W1112_T.muted, fontSize:12 }}>노드 A:</span>
          <select value={a} onChange={e=>setA(Number(e.target.value))}
            style={{ padding:"5px 8px", background:W1112_T.card, border:`1px solid ${W1112_T.border}`, color:W1112_T.text, borderRadius:6 }}>
            {Array.from({length:n},(_,i)=><option key={i} value={i}>{i}</option>)}
          </select>
          <span style={{ color:W1112_T.muted, fontSize:12 }}>B:</span>
          <select value={b} onChange={e=>setB(Number(e.target.value))}
            style={{ padding:"5px 8px", background:W1112_T.card, border:`1px solid ${W1112_T.border}`, color:W1112_T.text, borderRadius:6 }}>
            {Array.from({length:n},(_,i)=><option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <button onClick={doUnion} style={{ padding:"6px 14px", background:W1112_T.w11, border:"none", color:"#000", borderRadius:8, cursor:"pointer", fontWeight:700, fontSize:13 }}>union</button>
        <button onClick={doFind} style={{ padding:"6px 14px", background:W1112_T.dim, border:`1px solid ${W1112_T.w11}`, color:W1112_T.w11, borderRadius:8, cursor:"pointer", fontSize:13 }}>find</button>
        <button onClick={reset} style={{ padding:"6px 12px", background:W1112_T.card, border:`1px solid ${W1112_T.border}`, color:W1112_T.muted, borderRadius:8, cursor:"pointer", fontSize:12 }}>🔄 리셋</button>
      </div>

      {/* Groups visualization */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:14 }}>
        {groups.map(g => (
          <div key={g.root} style={{ padding:"8px 14px", background:W1112_T.w11+"11",
            border:`2px solid ${W1112_T.w11}44`, borderRadius:10 }}>
            <div style={{ color:W1112_T.muted, fontSize:10, marginBottom:4 }}>집합 (루트:{g.root})</div>
            <div style={{ display:"flex", gap:5 }}>
              {g.members.map(m => (
                <div key={m} style={{ width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center",
                  background: m === g.root ? W1112_T.w11+"44" : W1112_T.card,
                  border:`2px solid ${m===g.root ? W1112_T.w11 : W1112_T.border}`,
                  borderRadius:6, color:W1112_T.text, fontFamily:"monospace", fontWeight:700, fontSize:13 }}>{m}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Parent array */}
      <div style={{ marginBottom:12 }}>
        <div style={{ color:W1112_T.muted, fontSize:11, marginBottom:4 }}>parent 배열</div>
        <div style={{ display:"flex", gap:3 }}>
          {parent.map((p,i) => (
            <div key={i} style={{ textAlign:"center", minWidth:36 }}>
              <div style={{ color:W1112_T.muted, fontSize:10 }}>{i}</div>
              <div style={{ height:30, display:"flex", alignItems:"center", justifyContent:"center",
                background: p===i ? W1112_T.w11+"33" : W1112_T.card,
                border:`1px solid ${p===i ? W1112_T.w11 : W1112_T.border}`,
                borderRadius:5, color: p===i ? W1112_T.w11 : W1112_T.text, fontFamily:"monospace", fontWeight:700 }}>{p}</div>
            </div>
          ))}
        </div>
      </div>

      {log.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
          {log.map((l,i) => (
            <div key={i} style={{ padding:"5px 10px", background: i===0 ? W1112_T.w11+"11" : W1112_T.card,
              borderLeft:`2px solid ${i===0 ? W1112_T.w11 : W1112_T.border}`,
              color: i===0 ? W1112_T.text : W1112_T.muted, fontSize:12, fontFamily:"monospace",
              borderRadius:"0 6px 6px 0", transition:"all 0.3s" }}>{l}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ TOPOLOGICAL SORT VIZ ══════════════════════════════ */
function W1112_TopoViz() {
  // 5 tasks with dependencies
  const nodes = [0,1,2,3,4,5];
  const edges = [[0,2],[0,3],[1,3],[1,4],[2,5],[3,5],[4,5]];
  const labels = ["수학","영어","물리","화학","생물","과학종합"];
  const adj = {0:[2,3],1:[3,4],2:[5],3:[5],4:[5],5:[]};
  const inDeg = {0:0,1:0,2:1,3:2,4:1,5:3};

  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(-1);

  const build = () => {
    const deg = {...inDeg};
    const queue = Object.entries(deg).filter(([,d])=>d===0).map(([k])=>Number(k));
    const order = [];
    const s = [{ queue:[...queue], visited:[], current:null, deg:{...deg}, msg:"진입차수 0인 노드부터 시작" }];

    const q = [...queue];
    while (q.length) {
      q.sort((a,b)=>a-b);
      const node = q.shift();
      order.push(node);
      s.push({ queue:[...q], visited:[...order], current:node, deg:{...deg},
        msg:`노드 ${node}(${labels[node]}) 처리` });
      for (const nb of (adj[node]||[])) {
        deg[nb]--;
        if (deg[nb]===0) { q.push(nb); }
        s.push({ queue:[...q], visited:[...order], current:node, deg:{...deg},
          msg:`${labels[nb]}의 진입차수 ${deg[nb]+1}→${deg[nb]}${deg[nb]===0?" → 큐에 추가":""}` });
      }
    }
    s.push({ queue:[], visited:order, current:null, deg:{...deg},
      msg:`위상 정렬 완료: ${order.map(i=>labels[i]).join(" → ")}` });
    setSteps(s);
    setIdx(0);
  };

  const step = steps[idx] || { queue:[], visited:[], current:null, deg:{...inDeg}, msg:"" };

  const nodePos = [
    {x:60,y:130},{x:60,y:230},
    {x:180,y:80},{x:180,y:180},{x:180,y:280},
    {x:300,y:180},
  ];

  const getNC = (n) => {
    if (n===step.current) return W1112_T.w11;
    if (step.visited.includes(n)) return W1112_T.green;
    if (step.queue.includes(n)) return W1112_T.orange;
    return W1112_T.muted;
  };

  return (
    <div style={{ background:"#010610", border:`1px solid ${W1112_T.border}`, borderRadius:12, padding:20, margin:"14px 0" }}>
      <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
        <svg viewBox="0 0 370 330" style={{ width:"100%", maxWidth:370, flex:"0 0 auto" }}>
          {edges.map(([a,b],i) => (
            <line key={i} x1={nodePos[a].x} y1={nodePos[a].y} x2={nodePos[b].x} y2={nodePos[b].y}
              stroke={W1112_T.border} strokeWidth={2} markerEnd="url(#arrow)" />
          ))}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={W1112_T.border} />
            </marker>
          </defs>
          {nodes.map(n => {
            const {x,y} = nodePos[n];
            const nc = getNC(n);
            return (
              <g key={n}>
                <circle cx={x} cy={y} r={26} fill={nc===W1112_T.muted ? W1112_T.card : nc+"22"}
                  stroke={nc} strokeWidth={2.5} style={{transition:"all 0.35s"}} />
                <text x={x} y={y-4} textAnchor="middle" fill={W1112_T.text} fontSize={11} fontWeight={700} fontFamily="monospace">{n}</text>
                <text x={x} y={y+8} textAnchor="middle" fill={nc===W1112_T.muted?W1112_T.muted:nc} fontSize={9}>{labels[n].slice(0,4)}</text>
                <text x={x+22} y={y-18} fill={W1112_T.orange} fontSize={11} fontWeight={700} fontFamily="monospace">
                  {step.deg[n]!==undefined ? step.deg[n] : inDeg[n]}
                </text>
              </g>
            );
          })}
        </svg>
        <div style={{ flex:1, minWidth:160 }}>
          <div style={{ marginBottom:10 }}>
            <div style={{ color:W1112_T.muted, fontSize:11, marginBottom:4 }}>큐 (진입차수 0)</div>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {step.queue.length===0
                ? <span style={{ color:W1112_T.muted, fontSize:12 }}>비어있음</span>
                : step.queue.map(n => (
                  <div key={n} style={{ width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",
                    background:W1112_T.orange+"33",border:`2px solid ${W1112_T.orange}`,borderRadius:6,
                    color:W1112_T.text,fontWeight:700,fontFamily:"monospace",fontSize:13 }}>{n}</div>
                ))}
            </div>
          </div>
          <div style={{ marginBottom:10 }}>
            <div style={{ color:W1112_T.muted, fontSize:11, marginBottom:4 }}>처리 순서</div>
            <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
              {step.visited.map((n,i) => (
                <span key={i} style={{ color:W1112_T.green, fontFamily:"monospace", fontSize:12 }}>
                  {i>0&&"→"} {labels[n].slice(0,2)}
                </span>
              ))}
            </div>
          </div>
          {step.msg && (
            <div style={{ padding:"8px 10px", background:W1112_T.card, borderLeft:`3px solid ${W1112_T.w11}`,
              borderRadius:"0 8px 8px 0", fontSize:12, color:W1112_T.text, fontFamily:"monospace" }}>
              {step.msg}
            </div>
          )}
          <div style={{ marginTop:8, fontSize:11, display:"flex", gap:10 }}>
            <span><span style={{color:W1112_T.w11}}>●</span> 현재</span>
            <span><span style={{color:W1112_T.green}}>●</span> 완료</span>
            <span><span style={{color:W1112_T.orange}}>●</span> 큐</span>
            <span style={{color:W1112_T.orange,fontFamily:"monospace",fontSize:10}}>↗ = 진입차수</span>
          </div>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
        <button onClick={build} style={{ padding:"7px 16px",background:W1112_T.w11,border:"none",color:"#000",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13 }}>📐 시작</button>
        <button onClick={()=>setIdx(p=>Math.max(0,p-1))} disabled={idx<=0}
          style={{ padding:"7px 10px",background:W1112_T.card,border:`1px solid ${W1112_T.border}`,color:W1112_T.text,borderRadius:8,cursor:"pointer" }}>◀</button>
        <button onClick={()=>setIdx(p=>Math.min(steps.length-1,p+1))} disabled={idx>=steps.length-1}
          style={{ padding:"7px 10px",background:W1112_T.card,border:`1px solid ${W1112_T.border}`,color:W1112_T.text,borderRadius:8,cursor:"pointer" }}>▶</button>
        {steps.length>0 && <span style={{color:W1112_T.muted,fontSize:12,alignSelf:"center"}}>{idx+1}/{steps.length}</span>}
      </div>
    </div>
  );
}

/* ══════════════════════════════ SEGMENT TREE VIZ ══════════════════════════════ */
function W1112_SegTreeViz() {
  const initArr = [1, 3, 5, 7, 9, 11];
  const n = initArr.length;
  const [arr, setArr] = useState([...initArr]);
  const [tree, setTree] = useState([]);
  const [hlNodes, setHlNodes] = useState([]);
  const [queryL, setQueryL] = useState(1);
  const [queryR, setQueryR] = useState(4);
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("sum");

  const buildTree = (a) => {
    const t = Array(4*n).fill(0);
    const build = (node, s, e) => {
      if (s===e) { t[node]=a[s]; return; }
      const m=(s+e)>>1;
      build(2*node,s,m); build(2*node+1,m+1,e);
      t[node] = mode==="sum" ? t[2*node]+t[2*node+1] : Math.min(t[2*node],t[2*node+1]);
    };
    build(1,0,n-1);
    return t;
  };

  useEffect(() => { setTree(buildTree(arr)); setHlNodes([]); setResult(null); }, [arr, mode]);

  const query = (l, r) => {
    const hl = [];
    const q = (node, s, e, l, r) => {
      if (r<s||e<l) return mode==="sum"?0:Infinity;
      if (l<=s&&e<=r) { hl.push(node); return tree[node]; }
      const m=(s+e)>>1;
      return mode==="sum"
        ? q(2*node,s,m,l,r)+q(2*node+1,m+1,e,l,r)
        : Math.min(q(2*node,s,m,l,r),q(2*node+1,m+1,e,l,r));
    };
    const res = q(1,0,n-1,l,r);
    setHlNodes(hl); setResult(res);
  };

  // Draw tree nodes
  const nodeLayout = [];
  const maxDepth = Math.ceil(Math.log2(n))+1;
  const svgW = 420;
  const levelH = 52;
  const drawNode = (node, s, e, depth, xMin, xMax) => {
    if (s>n-1||node>=4*n||tree[node]===undefined) return;
    const x=(xMin+xMax)/2, y=depth*levelH+28;
    nodeLayout.push({node,x,y,val:tree[node],s,e,depth});
    if (s<e) {
      const m=(s+e)>>1;
      drawNode(2*node,s,m,depth+1,xMin,(xMin+xMax)/2);
      drawNode(2*node+1,m+1,e,depth+1,(xMin+xMax)/2,xMax);
    }
  };
  if (tree.length) drawNode(1,0,n-1,0,0,svgW);

  return (
    <div style={{ background:"#010610", border:`1px solid ${W1112_T.border}`, borderRadius:12, padding:20, margin:"14px 0" }}>
      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        <button onClick={()=>setMode("sum")} style={{ padding:"5px 12px",background:mode==="sum"?W1112_T.w11:W1112_T.card,border:`1px solid ${mode==="sum"?W1112_T.w11:W1112_T.border}`,color:mode==="sum"?"#000":W1112_T.muted,borderRadius:6,cursor:"pointer",fontWeight:mode==="sum"?700:400 }}>합 쿼리</button>
        <button onClick={()=>setMode("min")} style={{ padding:"5px 12px",background:mode==="min"?W1112_T.w11:W1112_T.card,border:`1px solid ${mode==="min"?W1112_T.w11:W1112_T.border}`,color:mode==="min"?"#000":W1112_T.muted,borderRadius:6,cursor:"pointer",fontWeight:mode==="min"?700:400 }}>최솟값 쿼리</button>
      </div>

      {/* Array input */}
      <div style={{ display:"flex", gap:5, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ color:W1112_T.muted, fontSize:12 }}>배열:</span>
        {arr.map((v,i) => (
          <input key={i} type="number" value={v}
            onChange={e => { const na=[...arr]; na[i]=Number(e.target.value)||0; setArr(na); }}
            style={{ width:44, padding:"4px", textAlign:"center", background:W1112_T.card,
              border:`1px solid ${W1112_T.border}`, color:W1112_T.text, borderRadius:6, fontFamily:"monospace",
              fontSize:13, fontWeight:700 }} />
        ))}
      </div>

      {/* Tree SVG */}
      <div style={{ overflowX:"auto", marginBottom:14 }}>
        <svg viewBox={`0 0 ${svgW} ${(maxDepth+1)*levelH}`} style={{ width:"100%", maxWidth:svgW, display:"block" }}>
          {nodeLayout.map(({node,x,y}) => {
            const child2 = nodeLayout.find(nd=>nd.node===2*node);
            const child3 = nodeLayout.find(nd=>nd.node===2*node+1);
            return (
              <g key={`e${node}`}>
                {child2&&<line x1={x} y1={y} x2={child2.x} y2={child2.y} stroke={W1112_T.border} strokeWidth={1.5}/>}
                {child3&&<line x1={x} y1={y} x2={child3.x} y2={child3.y} stroke={W1112_T.border} strokeWidth={1.5}/>}
              </g>
            );
          })}
          {nodeLayout.map(({node,x,y,val,s,e}) => {
            const isHL = hlNodes.includes(node);
            return (
              <g key={node}>
                <circle cx={x} cy={y} r={20}
                  fill={isHL ? W1112_T.w11+"44" : W1112_T.card}
                  stroke={isHL ? W1112_T.w11 : W1112_T.border} strokeWidth={isHL?2.5:1.5}
                  style={{transition:"all 0.3s"}} />
                <text x={x} y={y+1} textAnchor="middle" fill={isHL?W1112_T.w11:W1112_T.text} fontSize={11} fontWeight={700} fontFamily="monospace">{val}</text>
                <text x={x} y={y+12} textAnchor="middle" fill={W1112_T.muted} fontSize={8} fontFamily="monospace">[{s},{e}]</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Query controls */}
      <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
        <span style={{ color:W1112_T.muted, fontSize:12 }}>구간 쿼리 [{queryL},{queryR}]:</span>
        <input type="range" min={0} max={n-1} value={queryL}
          onChange={e=>setQueryL(Math.min(Number(e.target.value),queryR))}
          style={{ width:80, accentColor:W1112_T.w11 }} />
        <span style={{ color:W1112_T.w11, fontFamily:"monospace", minWidth:16 }}>{queryL}</span>
        <span style={{ color:W1112_T.muted }}>~</span>
        <input type="range" min={0} max={n-1} value={queryR}
          onChange={e=>setQueryR(Math.max(Number(e.target.value),queryL))}
          style={{ width:80, accentColor:W1112_T.w11 }} />
        <span style={{ color:W1112_T.w11, fontFamily:"monospace", minWidth:16 }}>{queryR}</span>
        <button onClick={()=>query(queryL,queryR)}
          style={{ padding:"6px 14px",background:W1112_T.w11,border:"none",color:"#000",borderRadius:8,cursor:"pointer",fontWeight:700 }}>
          쿼리
        </button>
        {result!==null && (
          <span style={{ color:W1112_T.green, fontFamily:"monospace", fontWeight:700 }}>
            = {result}
          </span>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════ COMPLETION DASHBOARD ══════════════════════════════ */
function W1112_CompletionDashboard() {
  const allTopics = [
    { week:1, topic:"Python 기초 & 복잡도" },
    { week:2, topic:"정렬 & 이진탐색" },
    { week:3, topic:"스택 & 큐 & 힙" },
    { week:4, topic:"해시 & 문자열 & 투포인터" },
    { week:5, topic:"DFS & BFS" },
    { week:6, topic:"최단경로 알고리즘" },
    { week:7, topic:"트리 & BST & 트라이" },
    { week:8, topic:"DP 기초" },
    { week:9, topic:"DP 심화" },
    { week:10, topic:"그리디 & 분할정복 & 백트래킹" },
    { week:11, topic:"유니온파인드 & 위상정렬 & 세그트리" },
    { week:12, topic:"실전 모의고사" },
  ];

  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem("kt_progress") || "{}"); } catch { return {}; }
  });

  const toggle = (k) => {
    const nc = {...checked, [k]: !checked[k]};
    setChecked(nc);
    try { localStorage.setItem("kt_progress", JSON.stringify(nc)); } catch {}
  };

  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done/allTopics.length)*100);

  return (
    <div style={{ background:"#010610", border:`1px solid ${W1112_T.border}`, borderRadius:12, padding:20, margin:"14px 0" }}>
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <span style={{ color:W1112_T.w12, fontWeight:700 }}>전체 진도: {done}/{allTopics.length}</span>
          <span style={{ color:W1112_T.w12, fontWeight:700, fontFamily:"monospace" }}>{pct}%</span>
        </div>
        <div style={{ background:W1112_T.card, borderRadius:20, height:8, overflow:"hidden" }}>
          <div style={{ width:`${pct}%`, height:"100%",
            background:`linear-gradient(90deg,${W1112_T.w11},${W1112_T.w12})`,
            borderRadius:20, transition:"width 0.5s ease" }} />
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:8 }}>
        {allTopics.map(({week,topic}) => {
          const k = `w${week}`;
          const done = checked[k];
          return (
            <button key={k} onClick={()=>toggle(k)}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
                background: done ? W1112_T.w12+"15" : W1112_T.card,
                border:`1px solid ${done ? W1112_T.w12 : W1112_T.border}`,
                borderRadius:10, cursor:"pointer", textAlign:"left", transition:"all 0.25s" }}>
              <div style={{ width:22, height:22, borderRadius:6,
                background: done ? W1112_T.w12 : "transparent",
                border:`2px solid ${done ? W1112_T.w12 : W1112_T.muted}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, transition:"all 0.2s", fontSize:13 }}>
                {done && "✓"}
              </div>
              <div>
                <div style={{ color:W1112_T.muted, fontSize:10, fontFamily:"monospace" }}>Week {week}</div>
                <div style={{ color: done ? W1112_T.text : W1112_T.muted, fontSize:12, fontWeight: done?600:400 }}>{topic}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════ SECTIONS ══════════════════════════════ */

export { W1112_UnionFindViz, W1112_TopoViz, W1112_SegTreeViz, W1112_CompletionDashboard };
