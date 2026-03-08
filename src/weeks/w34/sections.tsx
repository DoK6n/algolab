// @ts-nocheck
import { useState } from 'react';
import { W34_T } from './theme';
import { W34_StackViz, W34_QueueViz, W34_DequeViz, W34_HeapViz, W34_HashMapViz, W34_TwoPtrViz, W34_SlidingWindowViz } from './visualizers';
import { Badge as W34_Badge } from '../../components/Badge';
import { Callout as W34_Callout } from '../../components/Callout';
import { SectionTitle as W34_SectionTitle } from '../../components/SectionTitle';
import { CodeBlock as W34_CodeBlock } from '../../components/CodeBlock';

export const W34_chapters = [
  { id:"intro",     week:"",   label:"목차",          icon:"🗺️" },
  { id:"stack",     week:"W3", label:"스택",          icon:"📚" },
  { id:"queue",     week:"W3", label:"큐",            icon:"🚶" },
  { id:"deque",     week:"W3", label:"덱(Deque)",     icon:"↔️" },
  { id:"heap2",     week:"W3", label:"우선순위 큐",   icon:"🏋️" },
  { id:"hashmap",   week:"W4", label:"해시맵",        icon:"🗂️" },
  { id:"string",    week:"W4", label:"문자열 처리",   icon:"🔤" },
  { id:"twoptr",    week:"W4", label:"투 포인터",     icon:"👆" },
  { id:"sliding",   week:"W4", label:"슬라이딩 윈도우", icon:"🪟" },
  { id:"problems",  week:"",   label:"연습 문제",     icon:"📝" },
];

/* ─────────────────────────────── UTILS ─────────────────────────────── */

export const W34_sections = {
  intro: () => (
    <div>
      <W34_SectionTitle>🗺️ 2단계: 핵심 자료구조 (Week 3–4)</W34_SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[
          { week: "Week 3", title: "스택 & 큐", items: ["스택 (LIFO)", "큐 (FIFO)", "덱 Deque", "우선순위 큐"], color: W34_T.accent },
          { week: "Week 4", title: "해시 & 문자열", items: ["해시맵", "문자열 처리", "투 포인터", "슬라이딩 윈도우"], color: W34_T.accent2 },
        ].map(({ week, title, items, color }) => (
          <div key={week} style={{ background: W34_T.card, border: `1px solid ${W34_T.border}`,
            borderRadius: 12, padding: 20, borderTop: `3px solid ${color}` }}>
            <div style={{ color, fontSize: 11, fontWeight: 700, marginBottom: 4, fontFamily: "monospace" }}>{week}</div>
            <div style={{ color: W34_T.text, fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{title}</div>
            {items.map(i => (
              <div key={i} style={{ color: W34_T.muted, fontSize: 13, padding: "4px 0",
                borderBottom: `1px solid ${W34_T.border}` }}>• {i}</div>
            ))}
          </div>
        ))}
      </div>
      <W34_Callout color={W34_T.accent3} icon="⚡" title="왜 자료구조가 중요한가?">
        알고리즘의 효율성은 <strong>어떤 자료구조를 쓰느냐</strong>에 달려있습니다.<br />
        스택으로 풀면 O(n), 잘못 쓰면 O(n²)이 되는 문제들이 많습니다.<br />
        자료구조를 잘 선택하는 것이 코딩테스트 합격의 핵심입니다.
      </W34_Callout>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
        {[
          { name: "스택", op: "push/pop", time: "O(1)", icon: "📚" },
          { name: "큐", op: "enqueue/dequeue", time: "O(1)", icon: "🚶" },
          { name: "덱", op: "양쪽 push/pop", time: "O(1)", icon: "↔️" },
          { name: "힙", op: "push/pop", time: "O(log n)", icon: "🏋️" },
          { name: "해시맵", op: "get/set", time: "O(1) avg", icon: "🗂️" },
          { name: "Counter", op: "빈도 계산", time: "O(n)", icon: "🔢" },
        ].map(item => (
          <div key={item.name} style={{ background: W34_T.card, border: `1px solid ${W34_T.border}`,
            borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ color: W34_T.text, fontWeight: 700, fontSize: 13 }}>{item.name}</div>
            <div style={{ color: W34_T.muted, fontSize: 11, margin: "4px 0" }}>{item.op}</div>
            <W34_Badge color={W34_T.accent3}>{item.time}</W34_Badge>
          </div>
        ))}
      </div>
    </div>
  ),

  stack: () => (
    <div>
      <W34_SectionTitle sub="LIFO — Last In, First Out">📚 스택 (Stack)</W34_SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <W34_Badge color={W34_T.accent}>push O(1)</W34_Badge>
        <W34_Badge color={W34_T.accent}>pop O(1)</W34_Badge>
        <W34_Badge color={W34_T.accent2}>파이썬: list 사용</W34_Badge>
      </div>
      <W34_StackViz />
      <W34_CodeBlock code={`# 파이썬에서 스택 = list!
stack = []

# push
stack.append(1)   # [1]
stack.append(2)   # [1, 2]
stack.append(3)   # [1, 2, 3]

# pop (LIFO: 마지막에 넣은 것이 먼저 나옴)
print(stack.pop())   # 3  ← 마지막 원소
print(stack.pop())   # 2
print(stack[-1])     # 1  ← peek (꺼내지 않고 확인)
print(len(stack))    # 1
print(not stack)     # False (비어있지 않음)

# ─── 실전 패턴: 괄호 짝 맞추기 (BOJ 9012) ───
def is_valid_parenthesis(s):
    stack = []
    for c in s:
        if c == '(':
            stack.append(c)
        elif c == ')':
            if not stack:     # 짝이 없으면 False
                return False
            stack.pop()
    return len(stack) == 0    # 모두 짝이 맞아야 True

print(is_valid_parenthesis("((()))"))  # True
print(is_valid_parenthesis("(()"))     # False`} />
      <W34_CodeBlock code={`# ─── 실전 패턴: 단조 스택 (Monotonic Stack) ───
# 주식 가격 문제 - 가격이 떨어지지 않은 기간

def stock_price(prices):
    n = len(prices)
    answer = [0] * n
    stack = []  # 인덱스 저장
    
    for i in range(n):
        # 스택 top의 가격보다 현재 가격이 작으면 → 가격 하락!
        while stack and prices[stack[-1]] > prices[i]:
            j = stack.pop()
            answer[j] = i - j  # 가격이 유지된 기간
        stack.append(i)
    
    # 스택에 남은 인덱스들 = 끝까지 안 떨어진 것들
    while stack:
        j = stack.pop()
        answer[j] = n - 1 - j
    
    return answer

print(stock_price([1, 2, 3, 2, 3]))  # [4, 3, 1, 1, 0]`} />
      <W34_Callout color={W34_T.accent} icon="🎯" title="스택이 유용한 패턴">
        <strong>괄호 검사</strong>, <strong>함수 호출 스택</strong>, <strong>DFS 반복 구현</strong>,
        <strong>히스토그램 최대 넓이</strong>, <strong>단조 스택(다음 큰/작은 원소)</strong>
      </W34_Callout>
    </div>
  ),

  queue: () => (
    <div>
      <W34_SectionTitle sub="FIFO — First In, First Out">🚶 큐 (Queue)</W34_SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <W34_Badge color={W34_T.accent2}>enqueue O(1)</W34_Badge>
        <W34_Badge color={W34_T.accent2}>dequeue O(1)</W34_Badge>
        <W34_Badge color={W34_T.danger}>⚠️ list.pop(0)는 O(n)!</W34_Badge>
      </div>
      <W34_QueueViz />
      <W34_Callout color={W34_T.danger} icon="⚠️" title="list로 큐 쓰면 안 되는 이유">
        <code style={{ color: W34_T.warn }}>list.pop(0)</code>은 O(n)입니다! 모든 원소를 왼쪽으로 당겨야 하기 때문.<br />
        반드시 <code style={{ color: W34_T.accent }}>collections.deque</code>를 사용하세요 → <code style={{ color: W34_T.accent }}>popleft()</code>가 O(1)
      </W34_Callout>
      <W34_CodeBlock code={`from collections import deque

# 올바른 큐 사용법
queue = deque()
queue.append(1)      # enqueue: 오른쪽에 추가
queue.append(2)
queue.append(3)
print(queue.popleft())  # dequeue: 1 (왼쪽에서 꺼냄) ← O(1)!

# ─── 실전: BFS에서 큐 사용 (BFS는 Week 5에 자세히) ───
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    
    while queue:
        node = queue.popleft()  # O(1)로 꺼냄
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

graph = {1: [2,3], 2: [4], 3: [4,5], 4: [], 5: []}
print(bfs(graph, 1))  # [1, 2, 3, 4, 5]`} />
      <W34_CodeBlock code={`# ─── 실전: 카드 뒤집기 (BOJ 2164) ───
from collections import deque

def card_game(n):
    queue = deque(range(1, n + 1))
    
    while len(queue) > 1:
        queue.popleft()         # 맨 위 카드 버리기
        queue.append(queue.popleft())  # 다음 카드 맨 아래로
    
    return queue[0]

print(card_game(6))   # 4
print(card_game(10))  # 4`} />
    </div>
  ),

  deque: () => (
    <div>
      <W34_SectionTitle sub="Double-Ended Queue — 양쪽에서 O(1) push/pop">↔️ 덱 (Deque)</W34_SectionTitle>
      <W34_DequeViz />
      <W34_CodeBlock code={`from collections import deque

dq = deque([1, 2, 3, 4, 5])

# 앞쪽 조작
dq.appendleft(0)    # deque([0, 1, 2, 3, 4, 5])
dq.popleft()        # 0 꺼냄 → deque([1, 2, 3, 4, 5])

# 뒤쪽 조작 (일반 list처럼)
dq.append(6)        # deque([1, 2, 3, 4, 5, 6])
dq.pop()            # 6 꺼냄

# 회전
dq.rotate(2)        # 오른쪽으로 2칸 → deque([4, 5, 1, 2, 3])
dq.rotate(-1)       # 왼쪽으로 1칸 → deque([5, 1, 2, 3, 4])

# 최대 크기 제한 (슬라이딩 윈도우 최적화!)
window = deque(maxlen=3)
for v in [1, 2, 3, 4, 5]:
    window.append(v)
    print(list(window))
# [1] → [1,2] → [1,2,3] → [2,3,4] → [3,4,5]`} />
      <W34_CodeBlock code={`# ─── 실전: 슬라이딩 윈도우 최댓값 (단조 덱) ───
from collections import deque

def max_sliding_window(nums, k):
    dq = deque()  # 인덱스를 저장 (단조 감소)
    result = []
    
    for i, v in enumerate(nums):
        # 윈도우 밖으로 나간 인덱스 제거
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # 현재값보다 작은 값들 제거 (어차피 최댓값 못 됨)
        while dq and nums[dq[-1]] < v:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])  # 덱 앞 = 현재 최댓값
    
    return result

print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))
# [3, 3, 5, 5, 6, 7]`} />
      <W34_Callout color={W34_T.accent3} icon="💡" title="덱 활용 패턴 요약">
        <strong>스택 + 큐 동시</strong> 필요할 때 / <strong>슬라이딩 윈도우 최솟값/최댓값</strong> (단조 덱) /
        회전 연산 / BFS에서 우선 탐색
      </W34_Callout>
    </div>
  ),

  heap2: () => (
    <div>
      <W34_SectionTitle sub="가장 작은(또는 큰) 원소를 O(log n)으로 꺼내기">🏋️ 우선순위 큐 / 힙</W34_SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <W34_Badge color={W34_T.accent}>heappush O(log n)</W34_Badge>
        <W34_Badge color={W34_T.accent}>heappop O(log n)</W34_Badge>
        <W34_Badge color={W34_T.accent2}>파이썬 = min heap 기본</W34_Badge>
      </div>
      <W34_HeapViz />
      <W34_CodeBlock code={`import heapq

# ─── 기본 사용 ───
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 1)
heapq.heappush(heap, 3)

print(heapq.heappop(heap))  # 1 (최솟값)
print(heapq.heappop(heap))  # 3

# 리스트를 힙으로 변환 O(n)
arr = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(arr)
print(heapq.heappop(arr))   # 1

# ─── 최대 힙 (음수 트릭) ───
max_heap = []
for v in [3, 1, 4, 1, 5]:
    heapq.heappush(max_heap, -v)  # 음수로 저장!

print(-heapq.heappop(max_heap))  # 5 (최댓값)

# ─── 튜플로 우선순위 지정 ───
tasks = []
heapq.heappush(tasks, (3, "낮은 우선순위"))
heapq.heappush(tasks, (1, "높은 우선순위"))
heapq.heappush(tasks, (2, "중간 우선순위"))

while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"{priority}: {task}")`} />
      <W34_CodeBlock code={`# ─── 실전: K번째 최솟값 찾기 ───

def kth_smallest(arr, k):
    heapq.heapify(arr)
    for _ in range(k - 1):
        heapq.heappop(arr)
    return heapq.heappop(arr)

# ─── 실전: 절대값 힙 (BOJ 11286) ───
input = sys.stdin.readline

def absolute_heap():
    heap = []
    n = int(input())
    for _ in range(n):
        x = int(input())
        if x != 0:
            heapq.heappush(heap, (abs(x), x))  # (절댓값, 실제값)
        else:
            if heap:
                print(heapq.heappop(heap)[1])
            else:
                print(0)`} />
    </div>
  ),

  hashmap: () => (
    <div>
      <W34_SectionTitle sub="키-값 매핑, 평균 O(1) 탐색/삽입/삭제">🗂️ 해시맵 (HashMap)</W34_SectionTitle>
      <W34_HashMapViz />
      <W34_CodeBlock code={`# ─── 파이썬 dict 기본 ───
# 생성
d = {}
d = dict()
d = {"apple": 3, "banana": 1}

# 조작
d["cherry"] = 5          # 삽입/갱신
val = d.get("apple", 0)  # 없으면 기본값 0
d.pop("banana", None)    # 삭제 (없어도 에러 없음)

# 순회
for key, val in d.items():
    print(f"{key}: {val}")

# ─── collections.Counter: 빈도 계산의 왕 ───
from collections import Counter

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = Counter(words)
print(count)                    # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
print(count.most_common(2))     # [('apple', 3), ('banana', 2)]
print(count["apple"])           # 3
print(count["grape"])           # 0 (없어도 KeyError 없음!)

# 더하기/빼기
c1 = Counter("aabbc")
c2 = Counter("abc")
print(c1 + c2)  # Counter({'a': 3, 'b': 3, 'c': 2})
print(c1 - c2)  # Counter({'a': 1, 'b': 1})`} />
      <W34_CodeBlock code={`from collections import defaultdict

# ─── defaultdict: KeyError 없는 딕셔너리 ───
# 기본값 자동 생성
graph = defaultdict(list)
graph[1].append(2)    # KeyError 없이 바로 append!
graph[1].append(3)
graph[2].append(4)

word_count = defaultdict(int)
for word in ["a", "b", "a", "c", "a", "b"]:
    word_count[word] += 1  # 처음이어도 0에서 +1

# ─── 실전: 완주하지 못한 선수 (프로그래머스) ───
from collections import Counter

def find_not_finished(participant, completion):
    count = Counter(participant)
    for c in completion:
        count[c] -= 1
    # 값이 1인 선수가 미완주자
    return [p for p, v in count.items() if v > 0][0]

participant = ["leo", "kiki", "eden"]
completion = ["eden", "kiki"]
print(find_not_finished(participant, completion))  # "leo"

# ─── 실전: 전화번호 목록 (프로그래머스) ───
def solution(phone_book):
    phone_set = set(phone_book)  # O(1) 탐색을 위해 set으로
    for phone in phone_book:
        for i in range(1, len(phone)):
            if phone[:i] in phone_set:  # 접두어 존재?
                return False
    return True`} />
      <W34_Callout color={W34_T.accent2} icon="🔑" title="해시맵 활용 패턴 4가지">
        <strong>1. 빈도 계산</strong> → Counter / defaultdict(int)<br />
        <strong>2. 그룹화</strong> → defaultdict(list)<br />
        <strong>3. 중복 제거</strong> → set<br />
        <strong>4. 인덱스 저장</strong> → dict (값 → 인덱스 매핑)
      </W34_Callout>
    </div>
  ),

  string: () => (
    <div>
      <W34_SectionTitle sub="파이썬 문자열 핵심 기법 총정리">🔤 문자열 처리</W34_SectionTitle>
      <W34_CodeBlock code={`# ─── 파이썬 문자열 기본 메서드 ───
s = "Hello, World!"

# 검색
s.find("World")      # 7 (없으면 -1)
s.index("World")     # 7 (없으면 ValueError)
"World" in s         # True

# 변환
s.lower()            # "hello, world!"
s.upper()            # "HELLO, WORLD!"
s.replace("l", "r")  # "Herro, Worrd!"

# 분리/결합
"a,b,c".split(",")   # ['a', 'b', 'c']
",".join(["a","b","c"])  # "a,b,c"

# 공백 제거
"  hello  ".strip()  # "hello"
"  hello  ".lstrip() # "hello  "

# 체크
"123".isdigit()      # True
"abc".isalpha()      # True
"abc123".isalnum()   # True

# 슬라이싱
s[1:5]               # "ello"
s[::-1]              # 역순 "!dlroW ,olleH"
s[::2]               # 홀수 인덱스 문자들`} />
      <W34_CodeBlock code={`# ─── 애너그램 판별 ───
from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)

print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False

# ─── 팰린드롬 (회문) 확인 ───
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

print(is_palindrome("A man a plan a canal Panama"))  # True

# ─── 문자열 압축 ───
def compress(s):
    result = []
    count = 1
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            count += 1
        else:
            result.append(s[i-1] + (str(count) if count > 1 else ""))
            count = 1
    result.append(s[-1] + (str(count) if count > 1 else ""))
    return "".join(result)

print(compress("aabcccdddd"))  # "a2bc3d4"

# ─── ord/chr 활용 ───
print(ord('a'))      # 97
print(chr(97))       # 'a'

# 알파벳 → 인덱스
for c in "abc":
    print(ord(c) - ord('a'))  # 0, 1, 2`} />
      <W34_Callout color={W34_T.purple} icon="⚡" title="문자열 성능 팁">
        <code style={{ color: W34_T.accent }}>"+".join(list)</code>이 <code style={{ color: W34_T.danger }}>s += c</code>보다 훨씬 빠릅니다!<br />
        문자열은 immutable이라 += 할 때마다 새 객체 생성 → O(n²) 위험
      </W34_Callout>
    </div>
  ),

  twoptr: () => (
    <div>
      <W34_SectionTitle sub="두 인덱스로 O(n)에 해결 — 정렬된 배열에서 강력!">👆 투 포인터 (Two Pointer)</W34_SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <W34_Badge color={W34_T.accent3}>시간 O(n)</W34_Badge>
        <W34_Badge color={W34_T.accent3}>공간 O(1)</W34_Badge>
        <W34_Badge color={W34_T.warn}>정렬된 배열에서 효과적</W34_Badge>
      </div>
      <W34_TwoPtrViz />
      <W34_CodeBlock code={`# ─── 패턴 1: 양 끝 포인터 (Two Sum in sorted array) ───
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return (left, right)
        elif s < target:
            left += 1   # 합이 작으면 왼쪽 포인터 이동
        else:
            right -= 1  # 합이 크면 오른쪽 포인터 이동
    
    return None

arr = [1, 2, 3, 4, 6, 8, 9]
print(two_sum_sorted(arr, 14))  # (4, 6): arr[4]+arr[6]=6+9=15? No...

# ─── 패턴 2: 같은 방향 포인터 ───
def max_two_sum_pairs(n, limit, people):
    # 가장 가벼운 사람 + 가장 무거운 사람이 같이 탈 수 있는지
    people.sort()
    left, right = 0, len(people) - 1
    boats = 0
    
    while left <= right:
        if people[left] + people[right] <= limit:
            left += 1  # 가벼운 사람도 태울 수 있음
        right -= 1     # 무거운 사람은 항상 혼자 또는 같이
        boats += 1
    
    return boats

print(max_two_sum_pairs(4, 100, [50, 50, 70, 80]))  # 3`} />
      <W34_CodeBlock code={`# ─── 패턴 3: 연속 부분합 (Subarray Sum) ───
def count_subarray_sum(arr, target):
    # O(n): 부분합이 target인 부분 배열 개수
    count = 0
    left = 0
    current_sum = 0
    
    for right in range(len(arr)):
        current_sum += arr[right]
        
        # 합이 target 초과하면 left 이동
        while current_sum > target and left <= right:
            current_sum -= arr[left]
            left += 1
        
        if current_sum == target:
            count += 1
    
    return count

# 양수 배열에서만 작동 (음수 있으면 슬라이딩 윈도우 불가)
print(count_subarray_sum([1, 2, 3, 4, 5], 5))  # 2 (2+3, 5)

# ─── 패턴 4: 정렬 후 투포인터 ───
def three_sum(arr, target):
    arr.sort()
    result = []
    
    for i in range(len(arr) - 2):
        left, right = i + 1, len(arr) - 1
        while left < right:
            s = arr[i] + arr[left] + arr[right]
            if s == target:
                result.append((arr[i], arr[left], arr[right]))
                left += 1; right -= 1
            elif s < target: left += 1
            else: right -= 1
    return result`} />
    </div>
  ),

  sliding: () => (
    <div>
      <W34_SectionTitle sub="고정/가변 크기 윈도우로 O(n)에 최적값 계산">🪟 슬라이딩 윈도우</W34_SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <W34_Badge color={W34_T.accent2}>시간 O(n)</W34_Badge>
        <W34_Badge color={W34_T.accent2}>공간 O(k) or O(1)</W34_Badge>
        <W34_Badge color={W34_T.warn}>연속된 부분 배열/문자열</W34_Badge>
      </div>
      <W34_SlidingWindowViz />
      <W34_CodeBlock code={`# ─── 고정 크기 윈도우: 연속 k개 최대합 ───
def max_subarray_sum(arr, k):
    n = len(arr)
    if n < k:
        return -1
    
    # 첫 윈도우 합
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # 슬라이딩: 한 칸씩 이동할 때 빠지는 값 빼고, 들어오는 값 더함
    for i in range(k, n):
        window_sum += arr[i]       # 새로 들어온 원소
        window_sum -= arr[i - k]   # 빠져나간 원소
        max_sum = max(max_sum, window_sum)
    
    return max_sum

print(max_subarray_sum([2, 1, 5, 1, 3, 2], 3))  # 9 (5+1+3)

# ─── 가변 크기 윈도우: 합 = target인 최소 길이 부분배열 ───
def min_window_sum(arr, target):
    left = 0
    current_sum = 0
    min_len = float('inf')
    
    for right in range(len(arr)):
        current_sum += arr[right]
        
        # 조건 만족하면 왼쪽 줄여보기
        while current_sum >= target:
            min_len = min(min_len, right - left + 1)
            current_sum -= arr[left]
            left += 1
    
    return min_len if min_len != float('inf') else 0

print(min_window_sum([2,3,1,2,4,3], 7))  # 2 (4+3)`} />
      <W34_CodeBlock code={`# ─── 문자열 슬라이딩 윈도우 ───
from collections import defaultdict

def longest_unique_substring(s):
    """중복 없는 가장 긴 부분 문자열"""
    char_map = {}
    left = 0
    max_len = 0
    
    for right, c in enumerate(s):
        if c in char_map and char_map[c] >= left:
            left = char_map[c] + 1  # 중복 발생 → 왼쪽 이동
        char_map[c] = right
        max_len = max(max_len, right - left + 1)
    
    return max_len

print(longest_unique_substring("abcabcbb"))  # 3 ("abc")
print(longest_unique_substring("bbbbb"))     # 1 ("b")

# ─── 다리를 지나는 트럭 (프로그래머스) ───
from collections import deque

def truck_bridge(bridge_length, weight, truck_weights):
    bridge = deque([0] * bridge_length)
    current_weight = 0
    time = 0
    
    for truck in truck_weights:
        while True:
            if current_weight + truck <= weight:
                bridge.append(truck)
                current_weight += truck
                time += 1
                current_weight -= bridge.popleft()
                break
            else:
                bridge.append(0)
                current_weight -= bridge.popleft()
                time += 1
    
    return time + bridge_length

print(truck_bridge(2, 10, [7, 4, 5, 6]))  # 8`} />
      <W34_Callout color={W34_T.accent2} icon="🧠" title="투 포인터 vs 슬라이딩 윈도우 구분법">
        <strong>투 포인터</strong>: 두 포인터가 <em>독립적으로</em> 이동, 주로 두 원소의 관계<br />
        <strong>슬라이딩 윈도우</strong>: 윈도우 <em>전체</em>의 합/최대/최소, 구간의 성질<br />
        → 실제로는 많이 겹치므로 패턴 연습이 중요!
      </W34_Callout>
    </div>
  ),

  problems: () => (
    <div>
      <W34_SectionTitle>📝 연습 문제 & 정리</W34_SectionTitle>
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: W34_T.accent, fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Week 3: 스택 & 큐</div>
        {[
          { id: "10828", title: "스택", level: "🟢", tip: "스택 기본 구현", url: "https://www.acmicpc.net/problem/10828" },
          { id: "10773", title: "제로", level: "🟢", tip: "스택으로 취소 기능 구현", url: "https://www.acmicpc.net/problem/10773" },
          { id: "9012",  title: "괄호", level: "🟡", tip: "스택으로 괄호 짝 검사", url: "https://www.acmicpc.net/problem/9012" },
          { id: "18258", title: "큐 2", level: "🟢", tip: "deque로 큐 구현", url: "https://www.acmicpc.net/problem/18258" },
          { id: "2164",  title: "카드2", level: "🟡", tip: "deque 시뮬레이션", url: "https://www.acmicpc.net/problem/2164" },
          { id: "11286", title: "절댓값 힙", level: "🟠", tip: "튜플 힙 활용", url: "https://www.acmicpc.net/problem/11286" },
        ].map(p => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
            borderRadius: 10, marginBottom: 8, borderLeft: `3px solid ${W34_T.accent}` }}>
            <div>
              <span style={{ color: W34_T.muted, fontSize: 12, fontFamily: "monospace" }}>BOJ {p.id}</span>
              <span style={{ color: W34_T.text, fontWeight: 700, marginLeft: 10 }}>{p.title}</span>
              <span style={{ color: W34_T.muted, fontSize: 12, marginLeft: 10 }}>{p.tip}</span>
            </div>
            <span>{p.level}</span>
          </div>
        ))}
        {[
          { title: "주식가격", level: "🟡", tip: "단조 스택", site: "프로그래머스" },
          { title: "프린터", level: "🟡", tip: "덱 시뮬레이션", site: "프로그래머스" },
          { title: "다리를 지나는 트럭", level: "🟠", tip: "슬라이딩 윈도우 + 덱", site: "프로그래머스" },
        ].map(p => (
          <div key={p.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
            borderRadius: 10, marginBottom: 8, borderLeft: `3px solid ${W34_T.accent2}` }}>
            <div>
              <span style={{ color: W34_T.muted, fontSize: 12 }}>{p.site}</span>
              <span style={{ color: W34_T.text, fontWeight: 700, marginLeft: 10 }}>{p.title}</span>
              <span style={{ color: W34_T.muted, fontSize: 12, marginLeft: 10 }}>{p.tip}</span>
            </div>
            <span>{p.level}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: W34_T.accent2, fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Week 4: 해시 & 문자열</div>
        {[
          { id: "1620",  title: "나는야 포켓몬 마스터", level: "🟡", tip: "dict 양방향 매핑" },
          { id: "17219", title: "비밀번호 찾기", level: "🟢", tip: "dict 기본", },
          { id: "7785",  title: "회사에 있는 사람", level: "🟡", tip: "set 활용" },
          { id: "1764",  title: "듣보잡", level: "🟡", tip: "set 교집합" },
        ].map(p => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
            borderRadius: 10, marginBottom: 8, borderLeft: `3px solid ${W34_T.accent2}` }}>
            <div>
              <span style={{ color: W34_T.muted, fontSize: 12, fontFamily: "monospace" }}>BOJ {p.id}</span>
              <span style={{ color: W34_T.text, fontWeight: 700, marginLeft: 10 }}>{p.title}</span>
              <span style={{ color: W34_T.muted, fontSize: 12, marginLeft: 10 }}>{p.tip}</span>
            </div>
            <W34_Badge color={W34_T.accent2}>해시</W34_Badge>
          </div>
        ))}
        {[
          { title: "완주하지 못한 선수", tip: "Counter 활용" },
          { title: "전화번호 목록", tip: "set으로 접두어 검사" },
          { title: "베스트앨범", tip: "dict + sorted 복합 활용" },
        ].map(p => (
          <div key={p.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", background: W34_T.card, border: `1px solid ${W34_T.border}`,
            borderRadius: 10, marginBottom: 8, borderLeft: `3px solid ${W34_T.accent3}` }}>
            <div>
              <span style={{ color: W34_T.muted, fontSize: 12 }}>프로그래머스</span>
              <span style={{ color: W34_T.text, fontWeight: 700, marginLeft: 10 }}>{p.title}</span>
              <span style={{ color: W34_T.muted, fontSize: 12, marginLeft: 10 }}>{p.tip}</span>
            </div>
            <W34_Badge color={W34_T.accent3}>해시</W34_Badge>
          </div>
        ))}
      </div>
      <W34_Callout color={W34_T.accent} icon="📌" title="이번 주 핵심 정리">
        <strong style={{ color: W34_T.accent }}>deque</strong>를 항상 list 대신 쓰자 (popleft는 반드시 deque!)<br />
        <strong style={{ color: W34_T.accent2 }}>Counter / defaultdict</strong>로 빈도 계산은 3줄이면 끝<br />
        <strong style={{ color: W34_T.accent3 }}>투포인터</strong>는 정렬 후, <strong style={{ color: W34_T.purple }}>슬라이딩 윈도우</strong>는 연속 구간<br />
        힙은 <strong style={{ color: W34_T.warn }}>최솟값/최댓값 반복 추출</strong>할 때 쓴다
      </W34_Callout>
    </div>
  ),
};

/* ─────────────────────────────── APP ─────────────────────────────── */

