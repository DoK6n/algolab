// @ts-nocheck
import { useState } from 'react';
import { W57_T } from './theme';
import { W57_DFSViz, W57_BFSViz, W57_DijkstraViz, W57_FloydViz, W57_TreeViz, W57_TrieViz } from './visualizers';

export const W57_chapters = [
  { id:"intro",    week:"",   label:"목차",           icon:"🗺️", color:W57_T.text },
  { id:"graph",    week:"W5", label:"그래프 표현",    icon:"🕸️", color:W57_T.w5 },
  { id:"dfs",      week:"W5", label:"DFS",            icon:"🔴", color:W57_T.w5 },
  { id:"bfs",      week:"W5", label:"BFS",            icon:"🟠", color:W57_T.w5 },
  { id:"dijkstra", week:"W6", label:"다익스트라",     icon:"⚡", color:W57_T.w6 },
  { id:"bellman",  week:"W6", label:"벨만-포드",      icon:"🛡️", color:W57_T.w6 },
  { id:"floyd",    week:"W6", label:"플로이드-워셜",  icon:"🌐", color:W57_T.w6 },
  { id:"tree",     week:"W7", label:"트리 순회",      icon:"🌲", color:W57_T.w7 },
  { id:"bst",      week:"W7", label:"BST",            icon:"🔍", color:W57_T.w7 },
  { id:"trie",     week:"W7", label:"트라이",         icon:"📖", color:W57_T.w7 },
  { id:"problems", week:"",   label:"연습 문제",      icon:"📝", color:W57_T.text },
];

/* ══════════════════════════════ SHARED UI ══════════════════════════════ */
function W57_Badge({ children, color = W57_T.accent }) {
  return (
    <span style={{
      background: color + "22", border: `1px solid ${color}55`,
      color, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
      display:"inline-block",
    }}>{children}</span>
  );
}

function W57_Callout({ color = W57_T.accent, icon = "💡", title, children }) {
  return (
    <div style={{
      background: color + "10", border: `1px solid ${color}40`,
      borderLeft: `4px solid ${color}`, borderRadius: 10,
      padding: "14px 18px", margin: "14px 0",
    }}>
      {title && <div style={{ color, fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{icon} {title}</div>}
      <div style={{ color: W57_T.text, lineHeight: 1.9, fontSize: 13.5 }}>{children}</div>
    </div>
  );
}

function W57_SectionTitle({ children, sub, color = W57_T.accent }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ color, margin: 0, fontSize: 22, fontWeight: 800, fontFamily: "'Fira Code', monospace" }}>
        {children}
      </h2>
      {sub && <p style={{ color: W57_T.muted, margin: "6px 0 0", fontSize: 14 }}>{sub}</p>}
    </div>
  );
}

function W57_CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const kw = new Set(["def","for","while","if","elif","else","return","in","range","len","and","or","not","True","False","None","import","from","class","break","continue","pass","lambda","with","as","try","except","yield","global"]);
  const bi = new Set(["print","input","int","str","list","dict","set","tuple","min","max","heapq","heappush","heappop","collections","deque","append","pop","Counter","defaultdict","sorted","enumerate","zip","map","sum","any","all","float","inf"]);

  const renderLine = (line) => {
    const ci = line.indexOf("#");
    const code = ci !== -1 ? line.slice(0, ci) : line;
    const comment = ci !== -1 ? line.slice(ci) : "";
    const tokens = code.split(/(\b\w+\b|[^\w\s]|\s+)/g).filter(Boolean).map((t, i) => {
      if (kw.has(t)) return <span key={i} style={{ color: "#c084fc", fontWeight: 700 }}>{t}</span>;
      if (bi.has(t)) return <span key={i} style={{ color: "#67e8f9" }}>{t}</span>;
      if (/^\d+$/.test(t)) return <span key={i} style={{ color: "#fbbf24" }}>{t}</span>;
      if (/^["']/.test(t)) return <span key={i} style={{ color: "#86efac" }}>{t}</span>;
      return <span key={i}>{t}</span>;
    });
    return [...tokens, comment && <span key="c" style={{ color: "#4a5568", fontStyle: "italic" }}>{comment}</span>];
  };

  return (
    <div style={{ background: "#07080e", border: `1px solid ${W57_T.border}`, borderRadius: 12, overflow: "hidden", margin: "12px 0" }}>
      <div style={{ background: "#0b0c14", borderBottom: `1px solid ${W57_T.border}`, display: "flex", justifyContent: "space-between", padding: "6px 14px" }}>
        <span style={{ color: W57_T.muted, fontSize: 11, fontFamily: "monospace" }}>python3</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          style={{ background: "none", border: "none", color: copied ? W57_T.green : W57_T.muted, cursor: "pointer", fontSize: 12 }}>
          {copied ? "✅ 복사됨" : "📋 복사"}
        </button>
      </div>
      <pre style={{ padding: 16, margin: 0, overflowX: "auto", fontFamily: "'Fira Code','Courier New',monospace", fontSize: 13, lineHeight: 1.75, color: W57_T.text }}>
        {code.split("\n").map((line, i) => (
          <div key={i} style={{ display: "flex" }}>
            <span style={{ color: W57_T.muted, userSelect: "none", minWidth: 30, fontSize: 11, paddingTop: 2 }}>{i + 1}</span>
            <span>{renderLine(line)}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

/* ══════════════════════════════ GRAPH VIZ (shared) ══════════════════════════════ */
// Node positions for a 6-node undirected graph

export const W57_sections = {

intro: () => (
  <div>
    <W57_SectionTitle color={W57_T.text}>🗺️ 3단계: 그래프 & 트리 (Week 5–7)</W57_SectionTitle>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px,1fr))", gap:12, marginBottom:24 }}>
      {[
        { week:"Week 5", title:"DFS & BFS", items:["그래프 표현","DFS (깊이우선)","BFS (너비우선)"], color:W57_T.w5 },
        { week:"Week 6", title:"최단 경로", items:["다익스트라","벨만-포드","플로이드-워셜"], color:W57_T.w6 },
        { week:"Week 7", title:"트리", items:["트리 순회","이진 탐색 트리","트라이"], color:W57_T.w7 },
      ].map(({ week, title, items, color }) => (
        <div key={week} style={{ background:W57_T.card, border:`1px solid ${W57_T.border}`, borderRadius:12, padding:18, borderTop:`3px solid ${color}` }}>
          <div style={{ color, fontSize:11, fontWeight:700, fontFamily:"monospace", marginBottom:4 }}>{week}</div>
          <div style={{ color:W57_T.text, fontWeight:700, fontSize:15, marginBottom:12 }}>{title}</div>
          {items.map(i => <div key={i} style={{ color:W57_T.muted, fontSize:13, padding:"4px 0", borderBottom:`1px solid ${W57_T.border}` }}>• {i}</div>)}
        </div>
      ))}
    </div>
    <W57_Callout color={W57_T.w5} icon="🕸️" title="그래프 & 트리가 핵심인 이유">
      코딩테스트 문제의 약 <strong>40%</strong>가 그래프 탐색과 관련됩니다.<br />
      DFS/BFS만 완벽히 이해해도 <strong>골드 4~5 수준</strong>의 문제 상당수를 풀 수 있습니다.<br />
      최단경로 알고리즘은 <strong>카카오·삼성 기출</strong>에 단골로 등장합니다.
    </W57_Callout>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px,1fr))", gap:10 }}>
      {[
        { name:"DFS", best:"경로 탐색, 사이클 감지", time:"O(V+E)", color:W57_T.w5 },
        { name:"BFS", best:"최단 거리(가중치 없음)", time:"O(V+E)", color:W57_T.w5 },
        { name:"다익스트라", best:"양수 가중치 최단경로", time:"O((V+E)logV)", color:W57_T.w6 },
        { name:"벨만-포드", best:"음수 가중치 허용", time:"O(VE)", color:W57_T.w6 },
        { name:"플로이드", best:"모든 쌍 최단경로", time:"O(V³)", color:W57_T.w6 },
        { name:"트라이", best:"문자열 검색/접두어", time:"O(L)", color:W57_T.w7 },
      ].map(item => (
        <div key={item.name} style={{ background:W57_T.card, border:`1px solid ${W57_T.border}`,
          borderRadius:10, padding:"12px 14px", borderLeft:`3px solid ${item.color}` }}>
          <div style={{ color:W57_T.text, fontWeight:700, fontSize:13 }}>{item.name}</div>
          <div style={{ color:W57_T.muted, fontSize:11, margin:"4px 0" }}>{item.best}</div>
          <W57_Badge color={item.color}>{item.time}</W57_Badge>
        </div>
      ))}
    </div>
  </div>
),

graph: () => (
  <div>
    <W57_SectionTitle sub="인접 리스트 vs 인접 행렬 — 대부분의 경우 인접 리스트 사용" color={W57_T.w5}>🕸️ 그래프 표현 방법</W57_SectionTitle>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
      {[
        { name:"인접 리스트", pros:["공간 O(V+E) — 희소 그래프에 유리","순회 빠름"], cons:["특정 간선 존재 확인 O(E)"], use:"코딩테스트 대부분의 경우", color:W57_T.green },
        { name:"인접 행렬", pros:["간선 존재 확인 O(1)","구현 단순"], cons:["공간 O(V²) — 밀집 그래프 아니면 낭비"], use:"플로이드-워셜, 노드 수 적을 때", color:W57_T.w6 },
      ].map(g => (
        <div key={g.name} style={{ background:W57_T.card, border:`1px solid ${W57_T.border}`, borderRadius:10, padding:16 }}>
          <div style={{ color:g.color, fontWeight:700, marginBottom:8 }}>{g.name}</div>
          {g.pros.map(p => <div key={p} style={{ color:W57_T.green, fontSize:12, marginBottom:2 }}>✅ {p}</div>)}
          {g.cons.map(c => <div key={c} style={{ color:W57_T.danger, fontSize:12, marginBottom:2 }}>❌ {c}</div>)}
          <div style={{ color:W57_T.muted, fontSize:11, marginTop:8, borderTop:`1px solid ${W57_T.border}`, paddingTop:6 }}>💡 {g.use}</div>
        </div>
      ))}
    </div>
    <W57_CodeBlock code={`# ─── 그래프 입력받기 (표준 패턴) ───
from collections import defaultdict
input = sys.stdin.readline

# 예시 입력:
# 4 5   <- 노드 수, 간선 수
# 1 2   <- 간선
# 1 3
# 2 4
# 3 4
# 2 3

n, m = map(int, input().split())

# 방법 1: 인접 리스트 (defaultdict)
graph = defaultdict(list)
for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)  # 양방향이면 둘 다 추가

# 방법 2: 인접 리스트 (list)
graph2 = [[] for _ in range(n + 1)]  # 1-indexed
for _ in range(m):
    a, b = map(int, input().split())
    graph2[a].append(b)
    graph2[b].append(a)

# 방법 3: 가중치 그래프 (다익스트라 등)
graph3 = defaultdict(list)
for _ in range(m):
    a, b, w = map(int, input().split())
    graph3[a].append((b, w))  # (인접노드, 가중치)
    graph3[b].append((a, w))

# 방법 4: 인접 행렬
INF = float('inf')
matrix = [[INF] * (n+1) for _ in range(n+1)]
for i in range(n+1):
    matrix[i][i] = 0
for _ in range(m):
    a, b, w = map(int, input().split())
    matrix[a][b] = w`} />
    <W57_Callout color={W57_T.w5} icon="📌" title="방향 그래프 vs 무방향 그래프">
      <strong>무방향:</strong> <code>graph[a].append(b); graph[b].append(a)</code> — 양쪽에 추가<br />
      <strong>방향:</strong> <code>graph[a].append(b)</code> — 한쪽만 추가
    </W57_Callout>
  </div>
),

dfs: () => (
  <div>
    <W57_SectionTitle sub="스택(재귀) 기반 — 깊게 파고드는 탐색" color={W57_T.w5}>🔴 DFS (깊이 우선 탐색)</W57_SectionTitle>
    <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
      <W57_Badge color={W57_T.w5}>시간 O(V+E)</W57_Badge>
      <W57_Badge color={W57_T.w5}>공간 O(V)</W57_Badge>
      <W57_Badge color={W57_T.warn}>재귀 or 스택 사용</W57_Badge>
    </div>
    <W57_DFSViz />
    <W57_CodeBlock code={`# ─── DFS 구현 3가지 ───

# 1. 재귀 (가장 직관적)
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node, end=" ")
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    return visited

# 2. 스택 (반복문)
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []
    
    while stack:
        node = stack.pop()       # LIFO
        if node in visited:
            continue
        visited.add(node)
        order.append(node)
        for neighbor in reversed(graph[node]):  # 역순으로 push
            if neighbor not in visited:
                stack.append(neighbor)
    return order

# 3. 2D 그리드 DFS (섬/연결요소 문제)
def dfs_grid(grid, r, c, visited):
    if r < 0 or r >= len(grid): return
    if c < 0 or c >= len(grid[0]): return
    if visited[r][c] or grid[r][c] == 0: return
    
    visited[r][c] = True
    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:  # 4방향
        dfs_grid(grid, r+dr, c+dc, visited)`} />
    <W57_CodeBlock code={`# ─── 실전: 연결 요소 개수 (BOJ 2667 단지번호붙이기) ───
input = sys.stdin.readline

def count_clusters():
    n = int(input())
    grid = [list(map(int, list(input().strip()))) for _ in range(n)]
    visited = [[False]*n for _ in range(n)]
    clusters = []
    
    def dfs(r, c):
        if r<0 or r>=n or c<0 or c>=n: return 0
        if visited[r][c] or grid[r][c]==0: return 0
        visited[r][c] = True
        return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)
    
    for r in range(n):
        for c in range(n):
            if not visited[r][c] and grid[r][c] == 1:
                size = dfs(r, c)
                clusters.append(size)
    
    clusters.sort()
    print(len(clusters))
    for s in clusters:
        print(s)`} />
    <W57_Callout color={W57_T.danger} icon="⚠️" title="재귀 깊이 제한 주의!">
      파이썬 기본 재귀 깊이는 <strong>1000</strong>입니다.<br />
      노드가 많으면 <code style={{color:W57_T.warn}}>sys.setrecursionlimit(10**6)</code> 추가 또는 스택 방식 사용!
    </W57_Callout>
  </div>
),

bfs: () => (
  <div>
    <W57_SectionTitle sub="큐 기반 — 최단 거리(가중치 없음)에 강력" color={W57_T.w5}>🟠 BFS (너비 우선 탐색)</W57_SectionTitle>
    <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
      <W57_Badge color={W57_T.w6}>시간 O(V+E)</W57_Badge>
      <W57_Badge color={W57_T.w6}>공간 O(V)</W57_Badge>
      <W57_Badge color={W57_T.green}>최단 거리 보장!</W57_Badge>
    </div>
    <W57_BFSViz />
    <W57_CodeBlock code={`from collections import deque

# ─── BFS 기본 구현 ───
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []
    
    while queue:
        node = queue.popleft()   # FIFO — 반드시 popleft!
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

# ─── BFS로 최단 거리 구하기 ───
def bfs_shortest(graph, start, end):
    visited = {start}
    queue = deque([(start, 0)])  # (노드, 거리)
    
    while queue:
        node, dist = queue.popleft()
        if node == end:
            return dist
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1  # 도달 불가`} />
    <W57_CodeBlock code={`# ─── 실전: 토마토 익히기 (BOJ 7576) ───
# 가중치 없는 2D 최단 거리 — BFS 정석 패턴
from collections import deque
input = sys.stdin.readline

def tomato():
    m, n = map(int, input().split())
    grid = [list(map(int, input().split())) for _ in range(n)]
    
    queue = deque()
    for r in range(n):
        for c in range(m):
            if grid[r][c] == 1:
                queue.append((r, c, 0))  # 모든 익은 토마토 동시 시작!
    
    max_day = 0
    while queue:
        r, c, day = queue.popleft()
        max_day = max(max_day, day)
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                queue.append((nr, nc, day+1))
    
    # 안 익은 토마토 확인
    if any(grid[r][c] == 0 for r in range(n) for c in range(m)):
        print(-1)
    else:
        print(max_day)

# 핵심: 여러 시작점에서 동시 BFS = "멀티 소스 BFS"`} />
    <W57_Callout color={W57_T.green} icon="✅" title="DFS vs BFS 선택 기준">
      <strong style={{color:W57_T.green}}>BFS 선택:</strong> 최단 거리/최소 이동횟수, 레벨 단위 탐색<br />
      <strong style={{color:W57_T.w5}}>DFS 선택:</strong> 경로 존재 여부, 모든 경로 탐색, 위상정렬, 사이클 감지<br />
      <strong style={{color:W57_T.warn}}>둘 다 됨:</strong> 연결 요소 개수, 방문 여부 체크
    </W57_Callout>
  </div>
),

dijkstra: () => (
  <div>
    <W57_SectionTitle sub="양수 가중치 그래프의 단일 출발 최단경로 — 그리디 + 우선순위 큐" color={W57_T.w6}>⚡ 다익스트라 (Dijkstra)</W57_SectionTitle>
    <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
      <W57_Badge color={W57_T.w6}>O((V+E) log V)</W57_Badge>
      <W57_Badge color={W57_T.green}>양수 가중치만 가능</W57_Badge>
      <W57_Badge color={W57_T.purple}>heapq 필수!</W57_Badge>
    </div>
    <W57_DijkstraViz />
    <W57_CodeBlock code={`import heapq
from collections import defaultdict

def dijkstra(graph, start, n):
    # 거리 초기화
    dist = [float('inf')] * (n + 1)
    dist[start] = 0
    
    # (거리, 노드) 형태로 힙에 삽입
    heap = [(0, start)]
    
    while heap:
        d, u = heapq.heappop(heap)
        
        # 이미 더 짧은 경로로 방문된 경우 스킵 ← 핵심!
        if d > dist[u]:
            continue
        
        for v, w in graph[u]:
            new_dist = dist[u] + w
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(heap, (new_dist, v))
    
    return dist

# ─── 사용 예시 ───
input = sys.stdin.readline

n, m = map(int, input().split())  # 노드 수, 간선 수
start = int(input())
graph = defaultdict(list)

for _ in range(m):
    a, b, w = map(int, input().split())
    graph[a].append((b, w))

dist = dijkstra(graph, start, n)
for i in range(1, n+1):
    print(dist[i] if dist[i] != float('inf') else "INF")`} />
    <W57_Callout color={W57_T.w6} icon="🔑" title="다익스트라 핵심 패턴">
      <code style={{color:W57_T.warn}}>if d &gt; dist[u]: continue</code> — 이미 확정된 노드 스킵<br />
      힙에는 <strong>(거리, 노드)</strong> 튜플로 저장 (거리 기준 정렬)<br />
      음수 가중치가 있으면 <strong>벨만-포드</strong> 사용!
    </W57_Callout>
  </div>
),

bellman: () => (
  <div>
    <W57_SectionTitle sub="음수 가중치 허용 — 음수 사이클 감지 가능" color={W57_T.w6}>🛡️ 벨만-포드 (Bellman-Ford)</W57_SectionTitle>
    <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
      <W57_Badge color={W57_T.w6}>O(VE)</W57_Badge>
      <W57_Badge color={W57_T.green}>음수 가중치 OK</W57_Badge>
      <W57_Badge color={W57_T.accent}>음수 사이클 감지</W57_Badge>
    </div>
    <W57_Callout color={W57_T.purple} icon="🧠" title="핵심 아이디어">
      모든 간선을 <strong>V-1번 반복</strong>해서 완화(relaxation).<br />
      V번째 반복에서도 갱신되면 → <strong>음수 사이클 존재!</strong>
    </W57_Callout>
    <W57_CodeBlock code={`def bellman_ford(edges, start, n):
    """
    edges: [(출발, 도착, 가중치), ...]
    n: 노드 수
    """
    dist = [float('inf')] * (n + 1)
    dist[start] = 0
    
    # V-1번 모든 간선 완화
    for i in range(n - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    
    # V번째 완화 시도 → 음수 사이클 감지
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None  # 음수 사이클 존재!
    
    return dist

# ─── 사용 예시 ───
edges = [
    (1, 2, 4), (1, 3, 5),
    (2, 3, -3),            # 음수 가중치!
    (3, 4, 2),
]
result = bellman_ford(edges, 1, 4)

if result is None:
    print("음수 사이클 존재!")
else:
    for i in range(1, 5):
        print(f"1→{i}: {result[i]}")`} />
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
      <W57_Callout color={W57_T.green} icon="✅" title="벨만-포드 장점">
        음수 가중치 간선 허용<br />음수 사이클 감지 가능<br />구현 단순
      </W57_Callout>
      <W57_Callout color={W57_T.danger} icon="❌" title="벨만-포드 단점">
        O(VE)로 다익스트라보다 느림<br />노드·간선 많으면 TLE 위험<br />음수 없으면 다익스트라 사용
      </W57_Callout>
    </div>
  </div>
),

floyd: () => (
  <div>
    <W57_SectionTitle sub="DP로 모든 쌍 최단경로 — 코드 3줄!" color={W57_T.w6}>🌐 플로이드-워셜 (Floyd-Warshall)</W57_SectionTitle>
    <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
      <W57_Badge color={W57_T.w6}>O(V³)</W57_Badge>
      <W57_Badge color={W57_T.green}>모든 쌍 최단경로</W57_Badge>
      <W57_Badge color={W57_T.purple}>DP 기반</W57_Badge>
    </div>
    <W57_Callout color={W57_T.w7} icon="🧠" title="핵심 아이디어">
      <strong>dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])</strong><br />
      "i에서 j로 갈 때, k를 경유하는 것이 더 빠른가?" — 모든 k에 대해 반복
    </W57_Callout>
    <W57_FloydViz />
    <W57_CodeBlock code={`# 플로이드-워셜 — 코드 자체는 매우 단순!
INF = float('inf')

def floyd_warshall(n, edges):
    # 거리 행렬 초기화
    dist = [[INF] * (n+1) for _ in range(n+1)]
    for i in range(n+1):
        dist[i][i] = 0          # 자기 자신 = 0
    for u, v, w in edges:
        dist[u][v] = w          # 방향 그래프
        # dist[v][u] = w        # 무방향이면 이것도 추가
    
    # 핵심: 3중 for문 (순서 중요: k가 바깥!)
    for k in range(1, n+1):         # 경유 노드
        for i in range(1, n+1):     # 출발 노드
            for j in range(1, n+1): # 도착 노드
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    
    # 음수 사이클 감지: dist[i][i] < 0인 노드 존재
    for i in range(1, n+1):
        if dist[i][i] < 0:
            return None  # 음수 사이클!
    
    return dist

# ─── 실전: 순위 문제 (프로그래머스) ───
# A가 B를 이기면 dist[A][B] = 1
# 플로이드로 모든 승패 관계 전파 후
# 자신의 순위를 알 수 있는 선수 = (승수 + 패수 == n-1)인 선수
def solution(n, results):
    INF = float('inf')
    win = [[INF]*(n+1) for _ in range(n+1)]
    for i in range(n+1): win[i][i] = 0
    for a, b in results: win[a][b] = 1
    
    for k in range(1, n+1):
        for i in range(1, n+1):
            for j in range(1, n+1):
                if win[i][k] != INF and win[k][j] != INF:
                    win[i][j] = min(win[i][j], win[i][k] + win[k][j])
    
    count = 0
    for i in range(1, n+1):
        known = sum(1 for j in range(1, n+1) if i!=j and (win[i][j]!=INF or win[j][i]!=INF))
        if known == n-1:
            count += 1
    return count`} />
  </div>
),

tree: () => (
  <div>
    <W57_SectionTitle sub="전위 / 중위 / 후위 순회 — 재귀의 아름다움" color={W57_T.w7}>🌲 트리 순회 (Tree Traversal)</W57_SectionTitle>
    <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
      <W57_Badge color={W57_T.w7}>시간 O(N)</W57_Badge>
      <W57_Badge color={W57_T.w7}>공간 O(H) — 트리 높이</W57_Badge>
    </div>
    <W57_TreeViz />
    <W57_CodeBlock code={`# ─── 3가지 순회 구현 ───
class W57_TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# 전위(Pre-order): 루트 → 왼 → 오  [루트 먼저!]
def preorder(node):
    if not node: return []
    return [node.val] + preorder(node.left) + preorder(node.right)

# 중위(In-order): 왼 → 루트 → 오  [BST에서 오름차순 출력!]
def inorder(node):
    if not node: return []
    return inorder(node.left) + [node.val] + inorder(node.right)

# 후위(Post-order): 왼 → 오 → 루트  [자식 먼저, 부모 나중]
def postorder(node):
    if not node: return []
    return postorder(node.left) + postorder(node.right) + [node.val]

# 예시 트리:       1
#               /   \
#              2     3
#             / \   / \
#            4   5 6   7
# 전위: [1, 2, 4, 5, 3, 6, 7]
# 중위: [4, 2, 5, 1, 6, 3, 7]
# 후위: [4, 5, 2, 6, 7, 3, 1]`} />
    <W57_CodeBlock code={`# ─── 실전: 트리의 지름 (BOJ 1167) ───
# 트리에서 가장 먼 두 노드 사이의 거리
# 풀이: DFS 2번 (1. 임의노드에서 가장 먼 노드 a 찾기, 2. a에서 가장 먼 거리)
from collections import defaultdict
input = sys.stdin.readline
sys.setrecursionlimit(10**6)

def tree_diameter():
    v = int(input())
    graph = defaultdict(list)
    
    for _ in range(v):
        line = list(map(int, input().split()))
        node = line[0]
        i = 1
        while line[i] != -1:
            graph[node].append((line[i], line[i+1]))
            i += 2
    
    def dfs(start):
        visited = [-1] * (v + 1)
        visited[start] = 0
        stack = [start]
        far_node, max_dist = start, 0
        while stack:
            node = stack.pop()
            for nb, w in graph[node]:
                if visited[nb] == -1:
                    visited[nb] = visited[node] + w
                    if visited[nb] > max_dist:
                        max_dist = visited[nb]
                        far_node = nb
                    stack.append(nb)
        return far_node, max_dist
    
    a, _ = dfs(1)          # 1번에서 가장 먼 노드 a
    _, diameter = dfs(a)   # a에서 가장 먼 거리 = 지름
    print(diameter)`} />
  </div>
),

bst: () => (
  <div>
    <W57_SectionTitle sub="이진 탐색 트리 — 정렬된 데이터의 효율적 관리" color={W57_T.w7}>🔍 이진 탐색 트리 (BST)</W57_SectionTitle>
    <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
      <W57_Badge color={W57_T.w7}>탐색 O(log N) 평균</W57_Badge>
      <W57_Badge color={W57_T.danger}>O(N) 최악 (편향)</W57_Badge>
    </div>
    <W57_Callout color={W57_T.w7} icon="🌲" title="BST 특성">
      왼쪽 서브트리의 모든 값 &lt; 루트 &lt; 오른쪽 서브트리의 모든 값<br />
      <strong>중위 순회 = 오름차순 정렬!</strong>
    </W57_Callout>
    <W57_CodeBlock code={`class BST:
    class Node:
        def __init__(self, val):
            self.val = val
            self.left = self.right = None
    
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        def _insert(node, val):
            if not node: return self.Node(val)
            if val < node.val: node.left = _insert(node.left, val)
            elif val > node.val: node.right = _insert(node.right, val)
            return node
        self.root = _insert(self.root, val)
    
    def search(self, val):
        def _search(node, val):
            if not node: return False
            if val == node.val: return True
            if val < node.val: return _search(node.left, val)
            return _search(node.right, val)
        return _search(self.root, val)
    
    def inorder(self):           # 정렬된 순서로 출력!
        result = []
        def _inorder(node):
            if not node: return
            _inorder(node.left)
            result.append(node.val)
            _inorder(node.right)
        _inorder(self.root)
        return result

# 사용
bst = BST()
for v in [5, 3, 7, 1, 4, 6, 8]:
    bst.insert(v)
print(bst.inorder())    # [1, 3, 4, 5, 6, 7, 8] ← 항상 정렬!
print(bst.search(4))    # True`} />
    <W57_Callout color={W57_T.warn} icon="⚠️" title="파이썬에서 BST 대신 이것!">
      코딩테스트에서 BST를 직접 구현하는 일은 드뭅니다.<br />
      <code style={{color:W57_T.accent}}>from sortedcontainers import SortedList</code> 또는<br />
      <code style={{color:W57_T.accent}}>bisect</code> 모듈로 정렬된 리스트를 유지하는 패턴을 주로 사용합니다.
    </W57_Callout>
  </div>
),

trie: () => (
  <div>
    <W57_SectionTitle sub="문자열 검색 특화 트리 — 접두어 탐색 O(L)" color={W57_T.w7}>📖 트라이 (W57_Trie)</W57_SectionTitle>
    <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
      <W57_Badge color={W57_T.w7}>탐색 O(L) — 문자열 길이</W57_Badge>
      <W57_Badge color={W57_T.purple}>공간 O(알파벳수 × L × N)</W57_Badge>
    </div>
    <W57_TrieViz />
    <W57_CodeBlock code={`# ─── 트라이 구현 ───
class W57_TrieNode:
    def __init__(self):
        self.children = {}      # 자식 노드 딕셔너리
        self.is_end = False     # 단어 종료 여부

class W57_Trie:
    def __init__(self):
        self.root = W57_TrieNode()
    
    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = W57_TrieNode()
            node = node.children[c]
        node.is_end = True
    
    def search(self, word):
        """단어 존재 여부"""
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end
    
    def starts_with(self, prefix):
        """접두어 존재 여부"""
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True
    
    def count_with_prefix(self, prefix):
        """접두어로 시작하는 단어 수 (DFS)"""
        node = self.root
        for c in prefix:
            if c not in node.children: return 0
            node = node.children[c]
        
        count = 0
        stack = [node]
        while stack:
            n = stack.pop()
            if n.is_end: count += 1
            stack.extend(n.children.values())
        return count

# 사용
trie = W57_Trie()
for word in ["apple", "app", "apt", "banana"]:
    trie.insert(word)

print(trie.search("app"))           # True
print(trie.search("ap"))            # False (단어 아님)
print(trie.starts_with("ap"))       # True (접두어 존재)
print(trie.count_with_prefix("ap")) # 3 (apple, app, apt)`} />
    <W57_CodeBlock code={`# ─── 딕셔너리로 간단하게 구현 (코테 실전) ───
def build_trie(words):
    trie = {}
    for word in words:
        node = trie
        for c in word:
            node = node.setdefault(c, {})
        node['#'] = True  # 단어 끝 마커
    return trie

# ─── 실전: 전화번호 목록 접두어 검사 ───
def phone_check(phone_book):
    trie = {}
    for phone in sorted(phone_book, key=len):  # 짧은 것부터 삽입
        node = trie
        for c in phone:
            if '#' in node:  # 이미 끝난 번호가 접두어!
                return False
            node = node.setdefault(c, {})
        node['#'] = True
    return True`} />
  </div>
),

problems: () => (
  <div>
    <W57_SectionTitle color={W57_T.text}>📝 연습 문제 & 정리</W57_SectionTitle>
    {[
      {
        week: "Week 5: DFS & BFS", color: W57_T.w5,
        items: [
          { id:"1260", title:"DFS와 BFS", level:"🟡", tip:"두 알고리즘 기본 구현" },
          { id:"2606", title:"바이러스", level:"🟡", tip:"연결 요소 DFS" },
          { id:"2667", title:"단지번호붙이기", level:"🟡", tip:"2D 그리드 DFS" },
          { id:"1012", title:"유기농 배추", level:"🟡", tip:"연결 요소 개수" },
          { id:"7576", title:"토마토", level:"🟠", tip:"멀티 소스 BFS" },
          { id:"7569", title:"토마토 3D", level:"🟠", tip:"3D 그리드 BFS" },
        ],
        prog: [
          { title:"타겟 넘버", tip:"DFS/BFS 탐색" },
          { title:"네트워크", tip:"연결 요소 개수" },
          { title:"게임 맵 최단거리", tip:"BFS 최단 거리" },
        ]
      },
      {
        week: "Week 6: 최단 경로", color: W57_T.w6,
        items: [
          { id:"1753", title:"최단경로", level:"🟠", tip:"다익스트라 기본" },
          { id:"1916", title:"최소비용 구하기", level:"🟠", tip:"다익스트라 응용" },
          { id:"11404", title:"플로이드", level:"🟠", tip:"플로이드-워셜 기본" },
          { id:"1238", title:"파티", level:"🔴", tip:"다익스트라 여러 번" },
        ],
        prog: [
          { title:"배달", tip:"다익스트라" },
          { title:"순위", tip:"플로이드-워셜" },
        ]
      },
      {
        week: "Week 7: 트리", color: W57_T.w7,
        items: [
          { id:"1991", title:"트리 순회", level:"🟡", tip:"전/중/후위 구현" },
          { id:"11725", title:"트리의 부모 찾기", level:"🟡", tip:"BFS로 부모 탐색" },
          { id:"1167", title:"트리의 지름", level:"🔴", tip:"DFS 2번 패턴" },
          { id:"1967", title:"트리의 지름 2", level:"🔴", tip:"동일 패턴 연습" },
        ],
        prog: [
          { title:"길 찾기 게임", tip:"BST 구성 + 순회" },
          { title:"가사 검색", tip:"트라이 응용" },
        ]
      },
    ].map(section => (
      <div key={section.week} style={{ marginBottom: 28 }}>
        <div style={{ color: section.color, fontWeight: 700, marginBottom: 12, fontSize: 15 }}>{section.week}</div>
        {section.items.map(p => (
          <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"10px 16px", background:W57_T.card, border:`1px solid ${W57_T.border}`,
            borderRadius:10, marginBottom:6, borderLeft:`3px solid ${section.color}` }}>
            <div>
              <span style={{color:W57_T.muted,fontSize:12,fontFamily:"monospace"}}>BOJ {p.id}</span>
              <span style={{color:W57_T.text,fontWeight:700,marginLeft:10}}>{p.title}</span>
              <span style={{color:W57_T.muted,fontSize:12,marginLeft:10}}>{p.tip}</span>
            </div>
            <span>{p.level}</span>
          </div>
        ))}
        {section.prog.map(p => (
          <div key={p.title} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"10px 16px", background:W57_T.card, border:`1px solid ${W57_T.border}`,
            borderRadius:10, marginBottom:6, borderLeft:`3px solid ${section.color}88` }}>
            <div>
              <span style={{color:W57_T.muted,fontSize:12}}>프로그래머스</span>
              <span style={{color:W57_T.text,fontWeight:700,marginLeft:10}}>{p.title}</span>
              <span style={{color:W57_T.muted,fontSize:12,marginLeft:10}}>{p.tip}</span>
            </div>
            <W57_Badge color={section.color}>Lv.3</W57_Badge>
          </div>
        ))}
      </div>
    ))}
    <W57_Callout color={W57_T.green} icon="🏆" title="이번 단계 완료 기준">
      DFS/BFS 코드를 <strong>보지 않고 5분 내</strong> 작성 가능<br />
      다익스트라 heapq 패턴을 <strong>암기</strong>하고 있음<br />
      플로이드-워셜 3중 for문 순서(<strong>k → i → j</strong>) 이해<br />
      트리 순회 3가지를 재귀로 <strong>즉시 구현</strong> 가능
    </W57_Callout>
  </div>
),

};

/* ══════════════════════════════ APP ══════════════════════════════ */

