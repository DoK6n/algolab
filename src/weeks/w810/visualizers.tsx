// @ts-nocheck
import { useState } from 'react';
import { W810_T } from './theme';

function W810_DPTableViz({ title, dp, highlightCell, headers, rowHeaders, color = W810_T.w8 }) {
  return (
    <div style={{overflowX:"auto", margin:"12px 0"}}>
      {title && <div style={{color:W810_T.muted, fontSize:12, marginBottom:6}}>{title}</div>}
      <table style={{borderCollapse:"collapse", fontFamily:"monospace", fontSize:13}}>
        {headers && (
          <thead>
            <tr>
              <th style={{padding:"5px 10px", color:W810_T.muted, border:`1px solid ${W810_T.border}`}}></th>
              {headers.map((h,i) => (
                <th key={i} style={{padding:"5px 12px", color:W810_T.cyan, border:`1px solid ${W810_T.border}`, fontWeight:700}}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {dp.map((row, i) => (
            <tr key={i}>
              {rowHeaders && (
                <td style={{padding:"5px 10px", color:W810_T.orange, border:`1px solid ${W810_T.border}`, fontWeight:700}}>{rowHeaders[i]}</td>
              )}
              {(Array.isArray(row) ? row : [row]).map((val, j) => {
                const isHL = highlightCell && highlightCell.some(([hi,hj]) => hi===i && hj===j);
                return (
                  <td key={j} style={{
                    padding:"6px 14px", textAlign:"center",
                    border:`1px solid ${W810_T.border}`,
                    background: isHL ? color+"33" : val > 0 ? color+"11" : "transparent",
                    color: isHL ? color : val === 0 ? W810_T.muted : W810_T.text,
                    fontWeight: isHL ? 700 : 400,
                    transition:"all 0.3s",
                    minWidth:36,
                  }}>{val === Infinity ? "∞" : val}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════ DP 1463 VIZ ══════════════════════════════ */
function W810_DP1463Viz() {
  const [n, setN] = useState(10);
  const dp = Array(n+1).fill(0);
  dp[1] = 0;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + 1;
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i/3]+1);
    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i/2]+1);
  }
  const [step, setStep] = useState(1);

  return (
    <div style={{background:"#090612", border:`1px solid ${W810_T.border}`, borderRadius:12, padding:20, margin:"14px 0"}}>
      <div style={{display:"flex", gap:12, alignItems:"center", marginBottom:14, flexWrap:"wrap"}}>
        <span style={{color:W810_T.text, fontSize:13}}>N =</span>
        <input type="range" min={2} max={20} value={n} onChange={e=>{setN(Number(e.target.value)); setStep(1);}}
          style={{width:120, accentColor:W810_T.w8}} />
        <span style={{color:W810_T.w8, fontWeight:700}}>{n}</span>
        <span style={{color:W810_T.muted, fontSize:12}}>최소 연산 횟수: <strong style={{color:W810_T.green}}>{dp[n]}</strong></span>
      </div>
      <div style={{display:"flex", gap:4, flexWrap:"wrap", marginBottom:14}}>
        {dp.slice(1).map((v, i) => {
          const idx = i+1;
          const isStep = idx === step;
          return (
            <div key={i} onClick={()=>setStep(idx)}
              style={{
                minWidth:42, height:48, display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center",
                background: isStep ? W810_T.w8+"44" : idx <= step ? W810_T.w8+"11" : W810_T.card,
                border:`2px solid ${isStep ? W810_T.w8 : idx < step ? W810_T.w8+"55" : W810_T.border}`,
                borderRadius:8, cursor:"pointer", transition:"all 0.2s", gap:2,
              }}>
              <div style={{color:W810_T.muted, fontSize:10}}>{idx}</div>
              <div style={{color: isStep ? W810_T.w8 : W810_T.text, fontWeight: isStep?700:400, fontFamily:"monospace"}}>{v}</div>
            </div>
          );
        })}
      </div>
      {step >= 2 && (
        <div style={{padding:"10px 14px", background:W810_T.card, borderLeft:`3px solid ${W810_T.w8}`, borderRadius:"0 8px 8px 0", fontSize:13, fontFamily:"monospace"}}>
          <span style={{color:W810_T.w8}}>dp[{step}]</span> = {step%3===0&&step%2===0 ? (
            `min(dp[${step-1}]+1=${dp[step-1]+1}, dp[${step/3}]+1=${dp[step/3]+1}, dp[${step/2}]+1=${dp[step/2]+1})`
          ) : step%3===0 ? (
            `min(dp[${step-1}]+1=${dp[step-1]+1}, dp[${step/3}]+1=${dp[step/3]+1})`
          ) : step%2===0 ? (
            `min(dp[${step-1}]+1=${dp[step-1]+1}, dp[${step/2}]+1=${dp[step/2]+1})`
          ) : (
            `dp[${step-1}]+1 = ${dp[step-1]+1}`
          )} = <span style={{color:W810_T.green, fontWeight:700}}>{dp[step]}</span>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ LIS VIZ ══════════════════════════════ */
function W810_LISViz() {
  const [arr] = useState([10, 9, 2, 5, 3, 7, 101, 18]);
  const [step, setStep] = useState(-1);

  const dp = Array(arr.length).fill(1);
  const steps = [];
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        if (dp[j]+1 > dp[i]) {
          dp[i] = dp[j]+1;
          steps.push({i, j, dp:[...dp], msg:`arr[${j}]=${arr[j]} < arr[${i}]=${arr[i]} → dp[${i}]=max(dp[${i}], dp[${j}]+1)=${dp[i]}`});
        }
      }
    }
  }
  const maxLen = Math.max(...dp);
  const cur = step >= 0 && step < steps.length ? steps[step] : null;
  const curDp = cur ? cur.dp : dp.map(()=>1);

  return (
    <div style={{background:"#090612", border:`1px solid ${W810_T.border}`, borderRadius:12, padding:20, margin:"14px 0"}}>
      <div style={{marginBottom:12}}>
        <div style={{color:W810_T.muted, fontSize:12, marginBottom:6}}>배열: [{arr.join(", ")}] — LIS 길이: <strong style={{color:W810_T.green}}>{maxLen}</strong></div>
        <div style={{display:"flex", gap:4, flexWrap:"wrap"}}>
          {arr.map((v, i) => (
            <div key={i} style={{
              minWidth:44, height:52, display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", gap:3,
              background: cur && (i===cur.i||i===cur.j) ? W810_T.w9+"33" : W810_T.card,
              border:`2px solid ${cur && i===cur.i ? W810_T.w9 : cur && i===cur.j ? W810_T.cyan : W810_T.border}`,
              borderRadius:8, transition:"all 0.3s",
            }}>
              <div style={{color:W810_T.text, fontWeight:700, fontFamily:"monospace"}}>{v}</div>
              <div style={{color: cur && i<=cur.i ? W810_T.w9 : W810_T.muted, fontSize:11, fontFamily:"monospace"}}>
                {curDp[i] || 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex", gap:8, marginBottom:12, flexWrap:"wrap"}}>
        <button onClick={()=>setStep(-1)} style={{padding:"6px 12px", background:W810_T.card, border:`1px solid ${W810_T.border}`, color:W810_T.muted, borderRadius:8, cursor:"pointer", fontSize:12}}>초기화</button>
        <button onClick={()=>setStep(p=>Math.max(-1,p-1))} style={{padding:"6px 10px", background:W810_T.card, border:`1px solid ${W810_T.border}`, color:W810_T.text, borderRadius:8, cursor:"pointer"}}>◀</button>
        <button onClick={()=>setStep(p=>Math.min(steps.length-1,p+1))} style={{padding:"6px 10px", background:W810_T.card, border:`1px solid ${W810_T.border}`, color:W810_T.text, borderRadius:8, cursor:"pointer"}}>▶</button>
        <span style={{color:W810_T.muted, fontSize:12, alignSelf:"center"}}>{step+1}/{steps.length}</span>
      </div>
      {cur && (
        <div style={{padding:"8px 12px", background:W810_T.card, borderLeft:`3px solid ${W810_T.w9}`, borderRadius:"0 8px 8px 0", fontSize:13, fontFamily:"monospace", color:W810_T.text}}>
          {cur.msg}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ KNAPSACK VIZ ══════════════════════════════ */
function W810_KnapsackViz() {
  const items = [{w:1,v:1},{w:2,v:6},{w:3,v:10},{w:5,v:16}];
  const W = 7;
  const n = items.length;

  const dp = Array.from({length:n+1}, ()=>Array(W+1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= W; j++) {
      dp[i][j] = dp[i-1][j];
      if (items[i-1].w <= j) {
        dp[i][j] = Math.max(dp[i][j], dp[i-1][j-items[i-1].w] + items[i-1].v);
      }
    }
  }

  const [hlRow, setHlRow] = useState(null);
  const [hlCol, setHlCol] = useState(null);

  return (
    <div style={{background:"#090612", border:`1px solid ${W810_T.border}`, borderRadius:12, padding:20, margin:"14px 0"}}>
      <div style={{display:"flex", gap:16, marginBottom:12, flexWrap:"wrap"}}>
        <div>
          <div style={{color:W810_T.muted, fontSize:12, marginBottom:6}}>물건 목록</div>
          <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
            {items.map((item,i)=>(
              <div key={i} style={{padding:"8px 12px", background:W810_T.card, border:`1px solid ${W810_T.border}`, borderRadius:8}}>
                <div style={{color:W810_T.w9, fontWeight:700, fontSize:13}}>물건 {i+1}</div>
                <div style={{color:W810_T.text, fontSize:12}}>무게:{item.w} 가치:{item.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{alignSelf:"center", padding:"10px 16px", background:W810_T.w9+"22", border:`1px solid ${W810_T.w9}`, borderRadius:10}}>
          <div style={{color:W810_T.muted, fontSize:12}}>가방 용량: {W}kg</div>
          <div style={{color:W810_T.w9, fontWeight:700, fontSize:18}}>최대 가치: {dp[n][W]}</div>
        </div>
      </div>
      <div style={{color:W810_T.muted, fontSize:12, marginBottom:6}}>DP 테이블 — 클릭해서 확인 (행=물건, 열=용량)</div>
      <div style={{overflowX:"auto"}}>
        <table style={{borderCollapse:"collapse", fontFamily:"monospace", fontSize:12}}>
          <thead>
            <tr>
              <th style={{padding:"4px 8px", color:W810_T.muted, border:`1px solid ${W810_T.border}`, fontSize:11}}>i\w</th>
              {Array.from({length:W+1},(_,j)=>(
                <th key={j} style={{padding:"4px 8px", color:hlCol===j?W810_T.cyan:W810_T.muted, border:`1px solid ${W810_T.border}`, background:hlCol===j?W810_T.cyan+"22":"transparent"}}>{j}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dp.map((row, i)=>(
              <tr key={i}>
                <td style={{padding:"4px 8px", color:hlRow===i?W810_T.orange:W810_T.muted, border:`1px solid ${W810_T.border}`, fontWeight:700, background:hlRow===i?W810_T.orange+"22":"transparent", fontSize:11}}>
                  {i===0?"—":`아이템${i}`}
                </td>
                {row.map((v,j)=>{
                  const isHL = hlRow===i && hlCol===j;
                  return (
                    <td key={j} onClick={()=>{setHlRow(i);setHlCol(j);}}
                      style={{
                        padding:"5px 10px", textAlign:"center",
                        border:`1px solid ${W810_T.border}`,
                        background: isHL ? W810_T.w9+"44" : (hlRow===i||hlCol===j) ? W810_T.w9+"11" : v>0 ? W810_T.w9+"08" : "transparent",
                        color: isHL ? W810_T.w9 : v>0 ? W810_T.text : W810_T.muted,
                        fontWeight: isHL?700:v===dp[n][W]?600:400,
                        cursor:"pointer", transition:"all 0.2s", minWidth:32,
                      }}>{v}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hlRow !== null && hlCol !== null && hlRow > 0 && (
        <div style={{marginTop:10, padding:"8px 12px", background:W810_T.card, borderLeft:`3px solid ${W810_T.w9}`, borderRadius:"0 8px 8px 0", fontSize:13, fontFamily:"monospace", color:W810_T.text}}>
          dp[{hlRow}][{hlCol}] = {hlCol < items[hlRow-1].w
            ? `dp[${hlRow-1}][${hlCol}] = ${dp[hlRow-1][hlCol]} (물건 ${hlRow} 못 넣음, 무게 ${items[hlRow-1].w} > ${hlCol})`
            : `max(dp[${hlRow-1}][${hlCol}]=${dp[hlRow-1][hlCol]}, dp[${hlRow-1}][${hlCol-items[hlRow-1].w}]+${items[hlRow-1].v}=${dp[hlRow-1][hlCol-items[hlRow-1].w]+items[hlRow-1].v}) = ${dp[hlRow][hlCol]}`
          }
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ LCS VIZ ══════════════════════════════ */
function W810_LCSViz() {
  const [s1] = useState("ABCBDAB");
  const [s2] = useState("BDCABA");
  const [hlCell, setHlCell] = useState(null);

  const dp = Array.from({length:s1.length+1},()=>Array(s2.length+1).fill(0));
  for (let i=1;i<=s1.length;i++) {
    for (let j=1;j<=s2.length;j++) {
      if (s1[i-1]===s2[j-1]) dp[i][j]=dp[i-1][j-1]+1;
      else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
    }
  }

  return (
    <div style={{background:"#090612", border:`1px solid ${W810_T.border}`, borderRadius:12, padding:20, margin:"14px 0"}}>
      <div style={{marginBottom:10, display:"flex", gap:16, flexWrap:"wrap"}}>
        <span style={{color:W810_T.text, fontSize:13}}>S1: <strong style={{color:W810_T.cyan, fontFamily:"monospace"}}>{s1}</strong></span>
        <span style={{color:W810_T.text, fontSize:13}}>S2: <strong style={{color:W810_T.orange, fontFamily:"monospace"}}>{s2}</strong></span>
        <span style={{color:W810_T.text, fontSize:13}}>LCS 길이: <strong style={{color:W810_T.green}}>{dp[s1.length][s2.length]}</strong></span>
      </div>
      <div style={{color:W810_T.muted, fontSize:12, marginBottom:6}}>셀 클릭으로 점화식 확인</div>
      <div style={{overflowX:"auto"}}>
        <table style={{borderCollapse:"collapse", fontFamily:"monospace", fontSize:12}}>
          <thead>
            <tr>
              <th style={{padding:"4px 8px", border:`1px solid ${W810_T.border}`, color:W810_T.muted}}></th>
              <th style={{padding:"4px 8px", border:`1px solid ${W810_T.border}`, color:W810_T.muted}}>∅</th>
              {s2.split("").map((c,j)=>(
                <th key={j} style={{padding:"4px 10px", border:`1px solid ${W810_T.border}`, color:W810_T.orange}}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dp.map((row,i)=>(
              <tr key={i}>
                <td style={{padding:"4px 8px", border:`1px solid ${W810_T.border}`, color:W810_T.cyan, fontWeight:700}}>
                  {i===0?"∅":s1[i-1]}
                </td>
                {row.map((v,j)=>{
                  const isHL = hlCell && hlCell[0]===i && hlCell[1]===j;
                  const isMatch = i>0 && j>0 && s1[i-1]===s2[j-1];
                  return (
                    <td key={j} onClick={()=>setHlCell([i,j])}
                      style={{
                        padding:"5px 10px", textAlign:"center",
                        border:`1px solid ${W810_T.border}`,
                        background: isHL ? W810_T.w9+"44" : isMatch&&v>0 ? W810_T.green+"22" : W810_T.card,
                        color: isHL ? W810_T.w9 : isMatch&&v>0 ? W810_T.green : v>0 ? W810_T.text : W810_T.muted,
                        fontWeight: isHL?700:400, cursor:"pointer", transition:"all 0.2s", minWidth:28,
                      }}>{v}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hlCell && hlCell[0]>0 && hlCell[1]>0 && (
        <div style={{marginTop:10, padding:"8px 12px", background:W810_T.card, borderLeft:`3px solid ${W810_T.w9}`, borderRadius:"0 8px 8px 0", fontSize:13, fontFamily:"monospace", color:W810_T.text}}>
          {s1[hlCell[0]-1]===s2[hlCell[1]-1]
            ? <span><span style={{color:W810_T.green}}>✅ 문자 일치</span>: dp[{hlCell[0]}][{hlCell[1]}] = dp[{hlCell[0]-1}][{hlCell[1]-1}]+1 = {dp[hlCell[0]-1][hlCell[1]-1]+1}</span>
            : <span><span style={{color:W810_T.muted}}>불일치</span>: dp[{hlCell[0]}][{hlCell[1]}] = max(dp[{hlCell[0]-1}][{hlCell[1]}]={dp[hlCell[0]-1][hlCell[1]]}, dp[{hlCell[0]}][{hlCell[1]-1}]={dp[hlCell[0]][hlCell[1]-1]}) = {dp[hlCell[0]][hlCell[1]]}</span>
          }
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ GREEDY VIZ ══════════════════════════════ */
function W810_GreedyActivityViz() {
  const activities = [
    {s:1,e:4,name:"A"},{s:3,e:5,name:"B"},{s:0,e:6,name:"C"},
    {s:5,e:7,name:"D"},{s:3,e:9,name:"E"},{s:5,e:9,name:"F"},
    {s:6,e:10,name:"G"},{s:8,e:11,name:"H"},{s:8,e:12,name:"I"},
    {s:2,e:14,name:"J"},{s:12,e:16,name:"K"},
  ];
  const sorted = [...activities].sort((a,b)=>a.e-b.e);
  const selected = [];
  let lastEnd = -1;
  for (const act of sorted) {
    if (act.s >= lastEnd) { selected.push(act.name); lastEnd = act.e; }
  }

  const colors = activities.map(a => selected.includes(a.name) ? W810_T.green : W810_T.muted);
  const maxT = 16;

  return (
    <div style={{background:"#090612", border:`1px solid ${W810_T.border}`, borderRadius:12, padding:20, margin:"14px 0"}}>
      <div style={{color:W810_T.muted, fontSize:12, marginBottom:8}}>활동 선택 문제 — 종료 시간 기준 정렬 후 그리디</div>
      <div style={{position:"relative", marginBottom:8}}>
        <div style={{display:"flex", gap:2, marginBottom:4}}>
          {Array.from({length:maxT+1},(_,i)=>(
            <div key={i} style={{flex:1, textAlign:"center", color:W810_T.muted, fontSize:10}}>{i}</div>
          ))}
        </div>
        {sorted.map((act,i)=>{
          const isSelected = selected.includes(act.name);
          return (
            <div key={i} style={{display:"flex", alignItems:"center", marginBottom:3, gap:6}}>
              <div style={{width:16, color: isSelected?W810_T.green:W810_T.muted, fontSize:11, fontWeight:700}}>{act.name}</div>
              <div style={{flex:1, position:"relative", height:16}}>
                <div style={{
                  position:"absolute",
                  left:`${(act.s/maxT)*100}%`,
                  width:`${((act.e-act.s)/maxT)*100}%`,
                  height:"100%",
                  background: isSelected ? W810_T.green+"66" : W810_T.muted+"33",
                  border:`1px solid ${isSelected ? W810_T.green : W810_T.muted+"55"}`,
                  borderRadius:4,
                  transition:"all 0.3s",
                }} />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{marginTop:10, fontSize:13}}>
        <span style={{color:W810_T.muted}}>선택된 활동: </span>
        {selected.map(n=><span key={n} style={{color:W810_T.green, marginRight:6, fontFamily:"monospace", fontWeight:700}}>{n}</span>)}
        <span style={{color:W810_T.muted, fontSize:12}}>(총 {selected.length}개)</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════ BACKTRACKING VIZ ══════════════════════════════ */
function W810_NQueensViz() {
  const [n, setN] = useState(5);
  const [solutions, setSolutions] = useState([]);
  const [currentSol, setCurrentSol] = useState(0);
  const [solved, setSolved] = useState(false);

  const solve = () => {
    const result = [];
    const board = Array(n).fill(-1);
    const cols = new Set(), diag1 = new Set(), diag2 = new Set();

    function bt(row) {
      if (row === n) { result.push([...board]); return; }
      for (let col = 0; col < n; col++) {
        if (cols.has(col) || diag1.has(row-col) || diag2.has(row+col)) continue;
        board[row] = col;
        cols.add(col); diag1.add(row-col); diag2.add(row+col);
        bt(row+1);
        board[row] = -1;
        cols.delete(col); diag1.delete(row-col); diag2.delete(row+col);
      }
    }
    bt(0);
    setSolutions(result);
    setCurrentSol(0);
    setSolved(true);
  };

  const sol = solutions[currentSol] || [];

  return (
    <div style={{background:"#090612", border:`1px solid ${W810_T.border}`, borderRadius:12, padding:20, margin:"14px 0"}}>
      <div style={{display:"flex", gap:10, alignItems:"center", marginBottom:14, flexWrap:"wrap"}}>
        <span style={{color:W810_T.text, fontSize:13}}>N =</span>
        <select value={n} onChange={e=>{setN(Number(e.target.value)); setSolved(false); setSolutions([]);}}
          style={{padding:"6px 10px", background:W810_T.card, border:`1px solid ${W810_T.border}`, color:W810_T.text, borderRadius:6}}>
          {[4,5,6,7,8].map(v=><option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={solve} style={{padding:"7px 16px", background:W810_T.w10, border:"none", color:"#000", borderRadius:8, cursor:"pointer", fontWeight:700}}>
          🔙 풀기
        </button>
        {solved && (
          <>
            <span style={{color:W810_T.green, fontSize:13}}>해 {solutions.length}개 발견!</span>
            <button onClick={()=>setCurrentSol(p=>Math.max(0,p-1))} disabled={currentSol<=0}
              style={{padding:"6px 10px", background:W810_T.card, border:`1px solid ${W810_T.border}`, color:W810_T.text, borderRadius:6, cursor:"pointer"}}>◀</button>
            <button onClick={()=>setCurrentSol(p=>Math.min(solutions.length-1,p+1))} disabled={currentSol>=solutions.length-1}
              style={{padding:"6px 10px", background:W810_T.card, border:`1px solid ${W810_T.border}`, color:W810_T.text, borderRadius:6, cursor:"pointer"}}>▶</button>
            <span style={{color:W810_T.muted, fontSize:12}}>{currentSol+1}/{solutions.length}</span>
          </>
        )}
      </div>
      {solved && sol.length > 0 && (
        <div style={{display:"inline-grid", gridTemplateColumns:`repeat(${n},44px)`, gap:3}}>
          {Array.from({length:n},(_,row)=>
            Array.from({length:n},(_,col)=>{
              const isQueen = sol[row]===col;
              const isDark = (row+col)%2===1;
              return (
                <div key={`${row}-${col}`} style={{
                  width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center",
                  background: isQueen ? W810_T.w10+"44" : isDark ? W810_T.card : W810_T.surface,
                  border:`1px solid ${isQueen ? W810_T.w10 : W810_T.border}`,
                  borderRadius:6, fontSize:22, transition:"all 0.3s",
                }}>
                  {isQueen ? "♛" : ""}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ BITMASK VIZ ══════════════════════════════ */
function W810_BitMaskViz() {
  const [mask, setMask] = useState(0);
  const n = 4;
  const items = ["🍎 사과", "🍌 바나나", "🍇 포도", "🍓 딸기"];

  const toggle = (i) => setMask(m => m ^ (1 << i));
  const check = (i) => (mask >> i) & 1;

  return (
    <div style={{background:"#090612", border:`1px solid ${W810_T.border}`, borderRadius:12, padding:20, margin:"14px 0"}}>
      <div style={{color:W810_T.muted, fontSize:12, marginBottom:10}}>클릭해서 비트 ON/OFF</div>
      <div style={{display:"flex", gap:8, marginBottom:14, flexWrap:"wrap"}}>
        {items.map((item,i)=>(
          <button key={i} onClick={()=>toggle(i)}
            style={{
              padding:"8px 14px", borderRadius:8, cursor:"pointer",
              background: check(i) ? W810_T.w9+"44" : W810_T.card,
              border:`2px solid ${check(i) ? W810_T.w9 : W810_T.border}`,
              color: check(i) ? W810_T.w9 : W810_T.muted,
              fontWeight: check(i) ? 700 : 400,
              transition:"all 0.2s", fontSize:13,
            }}>{item}</button>
        ))}
      </div>
      <div style={{display:"flex", gap:6, alignItems:"center", marginBottom:12, fontFamily:"monospace"}}>
        <span style={{color:W810_T.muted, fontSize:12}}>비트 마스크:</span>
        {Array.from({length:n},(_,i)=>n-1-i).map(i=>(
          <div key={i} style={{
            width:36, height:36, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            background: check(i) ? W810_T.w9+"33" : W810_T.card,
            border:`2px solid ${check(i) ? W810_T.w9 : W810_T.border}`,
            borderRadius:6,
          }}>
            <div style={{color: check(i) ? W810_T.w9 : W810_T.muted, fontWeight:700, fontSize:16}}>{check(i)}</div>
            <div style={{color:W810_T.muted, fontSize:9}}>2^{i}</div>
          </div>
        ))}
        <span style={{color:W810_T.w9, fontSize:20, fontWeight:700, marginLeft:4}}>= {mask}</span>
      </div>
      <div style={{display:"flex", gap:16, fontSize:13, fontFamily:"monospace", flexWrap:"wrap"}}>
        {[
          [`mask | (1<<i)`, "비트 켜기", W810_T.green],
          [`mask & ~(1<<i)`, "비트 끄기", W810_T.red],
          [`mask ^ (1<<i)`, "비트 토글", W810_T.w9],
          [`(mask>>i) & 1`, "비트 확인", W810_T.cyan],
          [`mask & (mask-1)`, "최하위 비트 제거", W810_T.orange],
        ].map(([op,desc,color])=>(
          <div key={op} style={{padding:"6px 10px", background:W810_T.card, borderRadius:6}}>
            <div style={{color, fontSize:12}}>{op}</div>
            <div style={{color:W810_T.muted, fontSize:11}}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════ SECTIONS ══════════════════════════════ */

export { W810_DPTableViz, W810_DP1463Viz, W810_LISViz, W810_KnapsackViz, W810_LCSViz, W810_GreedyActivityViz, W810_NQueensViz, W810_BitMaskViz };
