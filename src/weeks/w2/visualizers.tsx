// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { W2_COLORS } from './theme';

function W2_SortVisualizer({ algorithm }) {
  const [arr, setArr] = useState([64, 34, 25, 12, 22, 11, 90, 45]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const generateSteps = (algorithm) => {
    const a = [...arr];
    const s = [{ arr: [...a], comparing: [], swapping: [], sorted: [] }];

    if (algorithm === "bubble") {
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          s.push({ arr: [...a], comparing: [j, j + 1], swapping: [], sorted: Array.from({ length: i }, (_, k) => a.length - 1 - k) });
          if (a[j] > a[j + 1]) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
            s.push({ arr: [...a], comparing: [], swapping: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => a.length - 1 - k) });
          }
        }
      }
    } else if (algorithm === "selection") {
      for (let i = 0; i < a.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < a.length; j++) {
          s.push({ arr: [...a], comparing: [minIdx, j], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), minIdx });
          if (a[j] < a[minIdx]) minIdx = j;
        }
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        s.push({ arr: [...a], comparing: [], swapping: [i, minIdx], sorted: Array.from({ length: i + 1 }, (_, k) => k) });
      }
    } else if (algorithm === "insertion") {
      for (let i = 1; i < a.length; i++) {
        let j = i;
        while (j > 0 && a[j - 1] > a[j]) {
          s.push({ arr: [...a], comparing: [j - 1, j], swapping: [], sorted: Array.from({ length: i }, (_, k) => k) });
          [a[j - 1], a[j]] = [a[j], a[j - 1]];
          s.push({ arr: [...a], comparing: [], swapping: [j - 1, j], sorted: Array.from({ length: i }, (_, k) => k) });
          j--;
        }
      }
    }
    s.push({ arr: [...a], comparing: [], swapping: [], sorted: a.map((_, i) => i) });
    return s;
  };

  useEffect(() => {
    setSteps(generateSteps(algorithm));
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, arr]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
          return prev + 1;
        });
      }, 400);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, steps]);

  const step = steps[currentStep] || { arr, comparing: [], swapping: [], sorted: [] };
  const maxVal = Math.max(...step.arr);

  const getColor = (idx) => {
    if (step.swapping.includes(idx)) return W2_COLORS.danger;
    if (step.comparing.includes(idx)) return W2_COLORS.warn;
    if (step.sorted.includes(idx)) return W2_COLORS.accent3;
    return W2_COLORS.accent;
  };

  const reset = () => {
    setArr([64, 34, 25, 12, 22, 11, 90, 45]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div style={{ background: "#0d1117", border: `1px solid ${W2_COLORS.border}`, borderRadius: 12, padding: 20, margin: "16px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, marginBottom: 16 }}>
        {step.arr.map((val, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ color: W2_COLORS.text, fontSize: 11 }}>{val}</span>
            <div style={{
              width: "100%", height: `${(val / maxVal) * 90}px`,
              background: getColor(i),
              borderRadius: "4px 4px 0 0",
              transition: "all 0.3s ease",
              boxShadow: step.swapping.includes(i) ? `0 0 12px ${W2_COLORS.danger}` : step.comparing.includes(i) ? `0 0 8px ${W2_COLORS.warn}` : "none"
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          style={{ padding: "6px 14px", background: W2_COLORS.card, border: `1px solid ${W2_COLORS.border}`, color: W2_COLORS.text, borderRadius: 6, cursor: "pointer" }}>◀ 이전</button>
        <button onClick={() => setIsPlaying(!isPlaying)}
          style={{ padding: "6px 18px", background: isPlaying ? W2_COLORS.danger : W2_COLORS.accent, border: "none", color: "#000", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>
          {isPlaying ? "⏸ 멈춤" : "▶ 재생"}
        </button>
        <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          style={{ padding: "6px 14px", background: W2_COLORS.card, border: `1px solid ${W2_COLORS.border}`, color: W2_COLORS.text, borderRadius: 6, cursor: "pointer" }}>다음 ▶</button>
        <button onClick={reset}
          style={{ padding: "6px 14px", background: W2_COLORS.card, border: `1px solid ${W2_COLORS.border}`, color: W2_COLORS.muted, borderRadius: 6, cursor: "pointer" }}>🔄 리셋</button>
        <span style={{ color: W2_COLORS.muted, fontSize: 12 }}>단계 {currentStep + 1} / {steps.length}</span>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12 }}>
        <span><span style={{ color: W2_COLORS.warn }}>●</span> 비교 중</span>
        <span><span style={{ color: W2_COLORS.danger }}>●</span> 교환 중</span>
        <span><span style={{ color: W2_COLORS.accent3 }}>●</span> 정렬 완료</span>
        <span><span style={{ color: W2_COLORS.accent }}>●</span> 미정렬</span>
      </div>
    </div>
  );
}

function W2_BinarySearchViz() {
  const arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];
  const [target, setTarget] = useState(23);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const runSearch = () => {
    const s = [];
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      s.push({ left, right, mid, found: arr[mid] === target, tooSmall: arr[mid] < target });
      if (arr[mid] === target) break;
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    setSteps(s);
    setCurrentStep(0);
  };

  const step = steps[currentStep];

  return (
    <div style={{ background: "#0d1117", border: `1px solid ${W2_COLORS.border}`, borderRadius: 12, padding: 20, margin: "16px 0" }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ color: W2_COLORS.text }}>찾을 값:</span>
        <select value={target} onChange={e => { setTarget(Number(e.target.value)); setSteps([]); setCurrentStep(-1); }}
          style={{ padding: "6px 12px", background: W2_COLORS.card, border: `1px solid ${W2_COLORS.border}`, color: W2_COLORS.text, borderRadius: 6 }}>
          {arr.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={runSearch}
          style={{ padding: "6px 18px", background: W2_COLORS.accent, border: "none", color: "#000", borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>🔍 탐색 시작</button>
        {steps.length > 0 && (
          <>
            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              style={{ padding: "6px 12px", background: W2_COLORS.card, border: `1px solid ${W2_COLORS.border}`, color: W2_COLORS.text, borderRadius: 6, cursor: "pointer" }}>◀</button>
            <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              style={{ padding: "6px 12px", background: W2_COLORS.card, border: `1px solid ${W2_COLORS.border}`, color: W2_COLORS.text, borderRadius: 6, cursor: "pointer" }}>▶</button>
            <span style={{ color: W2_COLORS.muted, fontSize: 12 }}>{currentStep + 1} / {steps.length}단계</span>
          </>
        )}
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {arr.map((val, i) => {
          let bg = W2_COLORS.card, border = W2_COLORS.border, color = W2_COLORS.text;
          if (step) {
            if (i === step.mid) { bg = step.found ? W2_COLORS.accent3 : W2_COLORS.warn; color = "#000"; }
            else if (i === step.left) { border = W2_COLORS.accent; }
            else if (i === step.right) { border = W2_COLORS.accent2; }
            else if (i < step.left || i > step.right) { color = W2_COLORS.muted; bg = "#0a0e1a"; }
          }
          return (
            <div key={i} style={{ width: 50, height: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: bg, border: `2px solid ${border}`, borderRadius: 8, color, fontSize: 14, fontWeight: "bold", transition: "all 0.3s" }}>
              <div>{val}</div>
              <div style={{ fontSize: 9, color: i === step?.mid ? "#000" : W2_COLORS.muted }}>[{i}]</div>
            </div>
          );
        })}
      </div>
      {step && (
        <div style={{ marginTop: 16, padding: "12px 16px", background: W2_COLORS.card, borderRadius: 8, borderLeft: `3px solid ${step.found ? W2_COLORS.accent3 : W2_COLORS.warn}` }}>
          <div style={{ color: W2_COLORS.text, fontSize: 13 }}>
            <span style={{ color: W2_COLORS.accent }}>left={step.left}</span>, <span style={{ color: W2_COLORS.accent2 }}>right={step.right}</span>, <span style={{ color: W2_COLORS.warn }}>mid={step.mid}</span> → arr[{step.mid}]={arr[step.mid]}
            {step.found ? <span style={{ color: W2_COLORS.accent3, marginLeft: 8 }}>✅ 찾았습니다!</span>
              : step.tooSmall ? <span style={{ color: W2_COLORS.muted, marginLeft: 8 }}>→ 목표값이 더 크므로 left = mid+1</span>
                : <span style={{ color: W2_COLORS.muted, marginLeft: 8 }}>→ 목표값이 더 작으므로 right = mid-1</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function W2_ParametricViz() {
  const [mid, setMid] = useState(3);
  const trees = [3, 5, 6, 1, 8, 3, 7, 4, 2, 6];
  const needed = 7;

  const calc = (height) => trees.reduce((sum, t) => sum + Math.max(0, t - height), 0);

  return (
    <div style={{ background: "#0d1117", border: `1px solid ${W2_COLORS.border}`, borderRadius: 12, padding: 20, margin: "16px 0" }}>
      <p style={{ color: W2_COLORS.text, fontSize: 13, marginTop: 0 }}>🌲 나무 절단기 높이를 정해 {needed}m 이상 얻기 (백준 2805)</p>
      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 100, marginBottom: 12 }}>
        {trees.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%", height: `${(Math.min(h, mid) / 8) * 80}px`, background: W2_COLORS.accent3, borderRadius: "3px 3px 0 0", transition: "all 0.3s" }} />
            {h > mid && <div style={{ width: "100%", height: `${((h - mid) / 8) * 80}px`, background: W2_COLORS.warn, borderRadius: "3px 3px 0 0" }} />}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 8, fontSize: 12 }}>
        <span><span style={{ color: W2_COLORS.accent3 }}>●</span> 남은 나무</span>
        <span><span style={{ color: W2_COLORS.warn }}>●</span> 잘린 나무 (획득)</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: W2_COLORS.text, fontSize: 13 }}>절단 높이:</span>
        <input type="range" min={0} max={8} value={mid} onChange={e => setMid(Number(e.target.value))}
          style={{ flex: 1, accentColor: W2_COLORS.accent }} />
        <span style={{ color: W2_COLORS.accent, fontWeight: "bold", minWidth: 20 }}>{mid}</span>
      </div>
      <div style={{ marginTop: 12, padding: "10px 14px", background: W2_COLORS.card, borderRadius: 8, fontSize: 13 }}>
        획득량: <span style={{ color: calc(mid) >= needed ? W2_COLORS.accent3 : W2_COLORS.danger, fontWeight: "bold" }}>{calc(mid)}m</span>
        <span style={{ color: W2_COLORS.muted, marginLeft: 8 }}>(필요: {needed}m → {calc(mid) >= needed ? "✅ 가능!" : "❌ 부족"})</span>
      </div>
    </div>
  );
}

function W2_ComplexityBadge({ time, space }) {
  return (
    <span style={{ display: "inline-flex", gap: 8, fontSize: 12 }}>
      <span style={{ background: "#1a2744", border: `1px solid ${W2_COLORS.accent}`, color: W2_COLORS.accent, padding: "2px 8px", borderRadius: 20 }}>시간 {time}</span>
      <span style={{ background: "#1a1744", border: `1px solid ${W2_COLORS.accent2}`, color: W2_COLORS.accent2, padding: "2px 8px", borderRadius: 20 }}>공간 {space}</span>
    </span>
  );
}

export { W2_SortVisualizer, W2_BinarySearchViz, W2_ParametricViz };
