// @ts-nocheck
import { W2_COLORS } from "./theme";
import {
  W2_SortVisualizer,
  W2_BinarySearchViz,
  W2_ParametricViz,
} from "./visualizers";
import { ComplexityBadge as W2_ComplexityBadge } from "../../components/Badge";
import { CodeBlock as W2_CodeBlock } from "../../components/CodeBlock";

export const W2_chapters = [
  { id: "intro", label: "📋 목차", icon: "📋" },
  { id: "bubble", label: "버블 정렬", icon: "🫧" },
  { id: "selection", label: "선택 정렬", icon: "🎯" },
  { id: "insertion", label: "삽입 정렬", icon: "🃏" },
  { id: "merge", label: "병합 정렬", icon: "🔀" },
  { id: "quick", label: "퀵 정렬", icon: "⚡" },
  { id: "heap", label: "힙 정렬", icon: "🏔️" },
  { id: "binary", label: "이진 탐색", icon: "🔍" },
  { id: "parametric", label: "파라메트릭 서치", icon: "🎚️" },
  { id: "summary", label: "정리 & 문제", icon: "📝" },
];

export const W2_sectionData = {
  intro: () => (
    <div>
      <h2 className="text-[#00d4ff] border-b-2 border-[#1e2d45] pb-3">
        📋 Week 2: 정렬 & 탐색
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 mt-5">
        {[
          {
            name: "버블 정렬",
            complexity: "O(n²)",
            cls: "border-l-[#ef4444] text-[#ef4444]",
          },
          {
            name: "선택 정렬",
            complexity: "O(n²)",
            cls: "border-l-[#ef4444] text-[#ef4444]",
          },
          {
            name: "삽입 정렬",
            complexity: "O(n²)",
            cls: "border-l-[#f59e0b] text-[#f59e0b]",
          },
          {
            name: "병합 정렬",
            complexity: "O(n log n)",
            cls: "border-l-[#10b981] text-[#10b981]",
          },
          {
            name: "퀵 정렬",
            complexity: "O(n log n)*",
            cls: "border-l-[#10b981] text-[#10b981]",
          },
          {
            name: "힙 정렬",
            complexity: "O(n log n)",
            cls: "border-l-[#10b981] text-[#10b981]",
          },
          {
            name: "이진 탐색",
            complexity: "O(log n)",
            cls: "border-l-[#00d4ff] text-[#00d4ff]",
          },
          {
            name: "파라메트릭",
            complexity: "O(log n × f(n))",
            cls: "border-l-[#7c3aed] text-[#7c3aed]",
          },
        ].map(item => (
          <div
            key={item.name}
            className={`bg-[#111827] border border-[#1e2d45] rounded-[10px] px-4 py-[14px] border-l-[3px] ${item.cls.split(" ")[0]}`}
          >
            <div className="text-[#e2e8f0] font-bold">{item.name}</div>
            <div className={`text-[13px] mt-1 ${item.cls.split(" ")[1]}`}>
              {item.complexity}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-[#111827] rounded-[10px] border-l-[3px] border-l-[#10b981]">
        <div className="text-[#10b981] font-bold mb-2">💡 핵심 포인트</div>
        <ul className="text-[#e2e8f0] leading-[2] m-0 pl-5">
          <li>
            파이썬 내장 <code className="text-[#00d4ff]">sort()</code>는 Timsort
            (O(n log n)) - 실무에선 이걸 씁니다
          </li>
          <li>
            정렬 알고리즘 직접 구현은 <strong>개념 이해</strong>가 목적
          </li>
          <li>
            이진 탐색은 <strong>정렬된 배열</strong>에서만 작동
          </li>
          <li>파라메트릭 서치 = "답을 가정하고 이진 탐색"</li>
        </ul>
      </div>
    </div>
  ),

  bubble: () => (
    <div>
      <h2 className="text-[#00d4ff]">🫧 버블 정렬 (Bubble Sort)</h2>
      <div className="text-[#64748b] mb-4">
        인접한 두 원소를 비교해 큰 값을 오른쪽으로 "버블처럼" 올립니다.
      </div>
      <W2_ComplexityBadge time="O(n²)" space="O(1)" />
      <W2_SortVisualizer algorithm="bubble" />
      <W2_CodeBlock
        code={`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:           # 인접 원소 비교
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # 교환
    return arr

# 테스트
arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))  # [11, 12, 22, 25, 34, 64, 90]`}
      />
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#f59e0b]">
        <div className="text-[#f59e0b] font-bold">⚠️ 실전에서는?</div>
        <div className="text-[#e2e8f0] mt-2 leading-[1.8]">
          O(n²)이라 실전 코딩테스트에선 거의 사용 안 함. <br />
          개념 이해용이지만 <strong>최선의 경우 O(n)</strong> 최적화 버전은 가끔
          출제됨.
        </div>
      </div>
    </div>
  ),

  selection: () => (
    <div>
      <h2 className="text-[#00d4ff]">🎯 선택 정렬 (Selection Sort)</h2>
      <div className="text-[#64748b] mb-4">
        매 단계에서 가장 작은 원소를 선택해 맨 앞에 배치합니다.
      </div>
      <W2_ComplexityBadge time="O(n²)" space="O(1)" />
      <W2_SortVisualizer algorithm="selection" />
      <W2_CodeBlock
        code={`def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i                    # 최솟값 인덱스 추적
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j            # 더 작은 값 발견시 갱신
        arr[i], arr[min_idx] = arr[min_idx], arr[i]  # 최솟값을 앞으로
    return arr

arr = [64, 25, 12, 22, 11]
print(selection_sort(arr))  # [11, 12, 22, 25, 64]`}
      />
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff]">
        <div className="text-[#00d4ff] font-bold">🔑 특징</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>교환 횟수가 O(n)으로 적음 → 쓰기 비용이 큰 경우 유리</li>
          <li>항상 O(n²) - 최선/최악 동일</li>
          <li>불안정 정렬 (같은 값의 순서 보장 X)</li>
        </ul>
      </div>
    </div>
  ),

  insertion: () => (
    <div>
      <h2 className="text-[#00d4ff]">🃏 삽입 정렬 (Insertion Sort)</h2>
      <div className="text-[#64748b] mb-4">
        카드를 하나씩 뽑아 적절한 위치에 삽입하는 방식입니다.
      </div>
      <W2_ComplexityBadge time="O(n²) / O(n) 최선" space="O(1)" />
      <W2_SortVisualizer algorithm="insertion" />
      <W2_CodeBlock
        code={`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]       # 삽입할 원소
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]  # 뒤로 밀기
            j -= 1
        arr[j + 1] = key   # 올바른 위치에 삽입
    return arr

arr = [12, 11, 13, 5, 6]
print(insertion_sort(arr))  # [5, 6, 11, 12, 13]`}
      />
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#10b981]">
        <div className="text-[#10b981] font-bold">✅ 강점</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>
            <strong>거의 정렬된 데이터</strong>에서 O(n) 근접 - 매우 빠름
          </li>
          <li>안정 정렬 (같은 값의 순서 유지)</li>
          <li>파이썬 Timsort의 내부에서 삽입 정렬 사용</li>
        </ul>
      </div>
    </div>
  ),

  merge: () => (
    <div>
      <h2 className="text-[#00d4ff]">🔀 병합 정렬 (Merge Sort)</h2>
      <div className="text-[#64748b] mb-4">
        분할 정복 전략: 반으로 나눠 각각 정렬 후 병합합니다.
      </div>
      <W2_ComplexityBadge time="O(n log n)" space="O(n)" />
      <div className="p-4 bg-[#111827] rounded-[10px] my-3">
        <div className="text-[#e2e8f0] text-[13px] text-center font-mono">
          <div className="text-[#00d4ff]">[38, 27, 43, 3, 9, 82, 10]</div>
          <div className="text-[#64748b] text-[18px] my-1">↓ 분할 (divide)</div>
          <div className="flex justify-center gap-5">
            <span className="text-[#7c3aed]">[38, 27, 43, 3]</span>
            <span className="text-[#10b981]">[9, 82, 10]</span>
          </div>
          <div className="text-[#64748b] text-[18px] my-1">↓ 재귀 정렬</div>
          <div className="flex justify-center gap-5">
            <span className="text-[#7c3aed]">[3, 27, 38, 43]</span>
            <span className="text-[#10b981]">[9, 10, 82]</span>
          </div>
          <div className="text-[#64748b] text-[18px] my-1">↓ 병합 (merge)</div>
          <div className="text-[#10b981]">[3, 9, 10, 27, 38, 43, 82]</div>
        </div>
      </div>
      <W2_CodeBlock
        code={`def merge_sort(arr):
    if len(arr) <= 1:          # 기저 조건
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # 왼쪽 재귀 정렬
    right = merge_sort(arr[mid:])  # 오른쪽 재귀 정렬

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])   # 남은 원소 추가
    result.extend(right[j:])
    return result

arr = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(arr))  # [3, 9, 10, 27, 38, 43, 82]`}
      />
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#10b981]">
        <div className="text-[#10b981] font-bold">✅ 병합 정렬의 장점</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>항상 O(n log n) 보장 - 최악의 경우 없음</li>
          <li>안정 정렬</li>
          <li>연결 리스트 정렬에 유리</li>
          <li>외부 정렬(파일 정렬)에 활용</li>
        </ul>
      </div>
    </div>
  ),

  quick: () => (
    <div>
      <h2 className="text-[#00d4ff]">⚡ 퀵 정렬 (Quick Sort)</h2>
      <div className="text-[#64748b] mb-4">
        피벗을 기준으로 좌우를 분할하는 분할 정복 정렬입니다.
      </div>
      <W2_ComplexityBadge
        time="O(n log n) 평균 / O(n²) 최악"
        space="O(log n)"
      />
      <div className="p-4 bg-[#111827] rounded-[10px] my-3 font-mono text-[13px]">
        <div className="text-[#e2e8f0]">
          [3, 6, 8, 10, 1, 2,{" "}
          <span className="text-[#f59e0b] font-bold">1</span>] 피벗: 1
        </div>
        <div className="text-[#64748b] my-[6px]">
          → 피벗보다 작은 값: [] | 피벗: [1] | 피벗보다 큰 값: [3, 6, 8, 10, 2]
        </div>
        <div className="text-[#10b981]">→ 재귀적으로 반복...</div>
      </div>
      <W2_CodeBlock
        code={`# 파이썬다운 방식 (이해하기 쉬운 버전)
def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]  # 중간 원소를 피벗으로
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# 인플레이스 방식 (공간 효율적, 실전용)
def quick_sort_inplace(arr, low, high):
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort_inplace(arr, low, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

arr = [10, 7, 8, 9, 1, 5]
print(quick_sort(arr))  # [1, 5, 7, 8, 9, 10]`}
      />
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#f59e0b]">
        <div className="text-[#f59e0b] font-bold">⚠️ 최악의 경우 주의</div>
        <div className="text-[#e2e8f0] mt-2 leading-[1.8]">
          이미 정렬된 배열에서 맨 앞/뒤를 피벗으로 선택시 O(n²)
          <br />→ <strong>해결책:</strong> 랜덤 피벗, 중앙값 피벗 사용
        </div>
      </div>
    </div>
  ),

  heap: () => (
    <div>
      <h2 className="text-[#00d4ff]">🏔️ 힙 정렬 (Heap Sort)</h2>
      <div className="text-[#64748b] mb-4">
        힙 자료구조를 이용한 정렬. 파이썬에선 heapq 모듈로 간단 구현!
      </div>
      <W2_ComplexityBadge time="O(n log n)" space="O(1)" />
      <div className="p-4 bg-[#111827] rounded-[10px] my-3">
        <div className="text-[#e2e8f0] text-[13px]">
          <strong className="text-[#00d4ff]">힙(Heap)이란?</strong>
          <br />
          <span className="text-[#64748b]">
            최솟값(min heap) 또는 최댓값(max heap)이 항상 루트에 위치하는 완전
            이진 트리
          </span>
        </div>
        <div className="text-center font-mono mt-3 text-[14px]">
          <div className="text-[#10b981]">1 (루트 = 최솟값)</div>
          <div className="flex justify-center gap-[30px] mt-1">
            <span className="text-[#00d4ff]">3</span>
            <span className="text-[#00d4ff]">2</span>
          </div>
          <div className="flex justify-center gap-[10px] mt-1">
            <span className="text-[#64748b]">9</span>
            <span className="text-[#64748b]">5</span>
            <span className="text-[#64748b]">4</span>
            <span className="text-[#64748b]">7</span>
          </div>
        </div>
      </div>
      <W2_CodeBlock
        code={`import heapq

# 방법 1: heapq를 이용한 힙 정렬
def heap_sort(arr):
    heap = []
    for val in arr:
        heapq.heappush(heap, val)  # 힙에 삽입 O(log n)
    return [heapq.heappop(heap) for _ in range(len(heap))]  # 순서대로 꺼냄

# 방법 2: 우선순위 큐로 활용 (코딩테스트에서 많이 씀!)
def top_k_elements(arr, k):
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
    return [heapq.heappop(heap) for _ in range(k)]

# 최댓값 힙 (파이썬은 기본이 min heap이라 음수 활용)
def max_heap_sort(arr):
    heap = []
    for val in arr:
        heapq.heappush(heap, -val)  # 음수로 저장
    return [-heapq.heappop(heap) for _ in range(len(heap))]

arr = [3, 1, 4, 1, 5, 9, 2, 6]
print(heap_sort(arr))        # [1, 1, 2, 3, 4, 5, 6, 9]
print(top_k_elements(arr, 3))  # [1, 1, 2] (가장 작은 3개)
print(max_heap_sort(arr))    # [9, 6, 5, 4, 3, 2, 1, 1]`}
      />
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#10b981]">
        <div className="text-[#10b981] font-bold">🎯 코딩테스트 활용</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>
            <strong>K번째 최솟값/최댓값</strong> 찾기 문제
          </li>
          <li>
            <strong>다익스트라 알고리즘</strong>에서 우선순위 큐로 사용
          </li>
          <li>
            힙 정렬 자체보다 <code className="text-[#00d4ff]">heapq</code>{" "}
            사용법이 더 중요!
          </li>
        </ul>
      </div>
    </div>
  ),

  binary: () => (
    <div>
      <h2 className="text-[#00d4ff]">🔍 이진 탐색 (Binary Search)</h2>
      <div className="text-[#64748b] mb-4">
        정렬된 배열에서 반씩 줄여가며 탐색. O(log n)의 마법!
      </div>
      <W2_ComplexityBadge time="O(log n)" space="O(1)" />
      <W2_BinarySearchViz />
      <W2_CodeBlock
        code={`# 방법 1: 직접 구현
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid          # 찾음!
        elif arr[mid] < target:
            left = mid + 1      # 오른쪽 탐색
        else:
            right = mid - 1     # 왼쪽 탐색

    return -1  # 없음

# 방법 2: bisect 모듈 활용 (실전 추천!)
from bisect import bisect_left, bisect_right

arr = [1, 3, 5, 7, 9, 11, 13]
target = 7

# bisect_left: target 이상인 첫 위치
idx = bisect_left(arr, target)
if idx < len(arr) and arr[idx] == target:
    print(f"찾음: 인덱스 {idx}")

# 특정 범위의 원소 개수 세기
arr = [1, 2, 3, 3, 3, 5, 6]
count = bisect_right(arr, 3) - bisect_left(arr, 3)
print(f"3의 개수: {count}")  # 3

# 테스트
arr = [2, 5, 8, 12, 16, 23, 38, 45]
print(binary_search(arr, 23))  # 5 (인덱스)
print(binary_search(arr, 6))   # -1 (없음)`}
      />
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#ef4444]">
        <div className="text-[#ef4444] font-bold">❗ 실수 주의</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>
            <code className="text-[#f59e0b]">while left {"<="} right</code> ←{" "}
            {"<"} 가 아니라 {"<="} 임에 주의!
          </li>
          <li>
            중간값:{" "}
            <code className="text-[#f59e0b]">
              {"mid = (left + right) // 2"}
            </code>
          </li>
          <li>
            반드시 <strong>정렬된 배열</strong>에서만 사용 가능
          </li>
        </ul>
      </div>
    </div>
  ),

  parametric: () => (
    <div>
      <h2 className="text-[#00d4ff]">🎚️ 파라메트릭 서치 (Parametric Search)</h2>
      <div className="text-[#64748b] mb-4">
        "최적의 답을 직접 구하는 대신, 답의 범위에 이진 탐색을 적용"
      </div>
      <W2_ComplexityBadge time="O(log(범위) × f(n))" space="O(1)" />
      <div className="p-4 bg-[#111827] rounded-[10px] my-3">
        <div className="text-[#10b981] font-bold mb-2">🧠 핵심 아이디어</div>
        <div className="text-[#e2e8f0] leading-[1.9]">
          <span className="text-[#f59e0b]">문제:</span> "조건을 만족하는 최적값
          구하기"
          <br />
          <span className="text-[#00d4ff]">→ 이진 탐색:</span> "이 값이 조건을
          만족하는가?" (예/아니오 판단)
          <br />
          <span className="text-[#10b981]">→ 만족하면</span> 더 최적값을 찾고,{" "}
          <span className="text-[#ef4444]">불만족이면</span> 범위 조정
        </div>
      </div>
      <W2_ParametricViz />
      <W2_CodeBlock
        code={`# 예제: 나무 자르기 (백준 2805)
# 절단기 높이 H를 정하면 → 얻을 수 있는 나무 길이 계산
# 최소 M미터를 얻을 수 있는 최대 H를 구하시오

input = sys.stdin.readline

def can_get(trees, h, need):
    """높이 h로 자를 때 need 이상 얻을 수 있는가?"""
    total = sum(max(0, t - h) for t in trees)
    return total >= need

def solve():
    n, m = map(int, input().split())
    trees = list(map(int, input().split()))

    left, right = 0, max(trees)
    answer = 0

    while left <= right:
        mid = (left + right) // 2   # 절단 높이 후보

        if can_get(trees, mid, m):  # 가능하면
            answer = mid            # 일단 저장
            left = mid + 1          # 더 높여서 최대화
        else:
            right = mid - 1         # 낮춰야 함

    return answer

# 입력:
# 4 7
# 20 15 10 17
# 출력: 15`}
      />
      <W2_CodeBlock
        code={`# 예제: 입국심사 (프로그래머스)
# n명, 각 심사관이 걸리는 시간 times[]
# 모든 사람이 심사 받는 최소 시간?

def solution(n, times):
    left = 1
    right = max(times) * n  # 최악의 경우
    answer = right

    while left <= right:
        mid = (left + right) // 2  # 시간 후보

        # mid 시간 내에 몇 명 심사 가능?
        total = sum(mid // t for t in times)

        if total >= n:             # n명 이상 가능하면
            answer = mid           # 저장
            right = mid - 1        # 더 줄여보기
        else:
            left = mid + 1         # 시간 늘려야 함

    return answer

print(solution(6, [7, 10]))  # 28`}
      />
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#7c3aed]">
        <div className="text-[#7c3aed] font-bold">
          🔑 파라메트릭 서치 패턴 인식법
        </div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>"최대 몇 ... 이하에서" / "최소 몇 ... 이상에서" 조건</li>
          <li>답의 범위가 연속적인 정수일 때</li>
          <li>"가능 여부"를 O(n)으로 빠르게 판단할 수 있을 때</li>
          <li>
            키워드: <em className="text-[#f59e0b]">최소화, 최대화, 결정</em>
          </li>
        </ul>
      </div>
    </div>
  ),

  summary: () => (
    <div>
      <h2 className="text-[#00d4ff]">📝 정리 & 연습 문제</h2>
      <div className="bg-[#111827] rounded-[10px] p-4 mb-4">
        <div className="text-[#10b981] font-bold mb-3">
          ⚡ 복잡도 한눈에 보기
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#1e2d45]">
              {["알고리즘", "평균", "최악", "공간", "안정?"].map(h => (
                <th key={h} className="text-[#64748b] px-3 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["버블", "O(n²)", "O(n²)", "O(1)", "✅"],
              ["선택", "O(n²)", "O(n²)", "O(1)", "❌"],
              ["삽입", "O(n²)", "O(n²)", "O(1)", "✅"],
              ["병합", "O(n log n)", "O(n log n)", "O(n)", "✅"],
              ["퀵", "O(n log n)", "O(n²)", "O(log n)", "❌"],
              ["힙", "O(n log n)", "O(n log n)", "O(1)", "❌"],
            ].map(([name, avg, worst, space, stable], i) => (
              <tr
                key={name}
                className={`border-b border-[#1e2d45] ${i % 2 !== 0 ? "bg-[#0d1117]" : ""}`}
              >
                <td className="text-[#e2e8f0] px-3 py-2 font-bold">{name}</td>
                <td
                  className={`px-3 py-2 ${avg.includes("n²") ? "text-[#ef4444]" : "text-[#10b981]"}`}
                >
                  {avg}
                </td>
                <td
                  className={`px-3 py-2 ${worst.includes("n²") ? "text-[#ef4444]" : "text-[#10b981]"}`}
                >
                  {worst}
                </td>
                <td className="text-[#7c3aed] px-3 py-2">{space}</td>
                <td className="px-3 py-2">{stable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 mb-4">
        <div className="text-[#f59e0b] font-bold mb-3">📚 추천 연습 문제</div>
        {[
          {
            title: "백준 2750 - 수 정렬하기",
            level: "🟢 쉬움",
            desc: "O(n²) 정렬 직접 구현",
            url: "https://www.acmicpc.net/problem/2750",
          },
          {
            title: "백준 2751 - 수 정렬하기 2",
            level: "🟡 보통",
            desc: "병합정렬 or Python sort() 활용",
            url: "https://www.acmicpc.net/problem/2751",
          },
          {
            title: "백준 1920 - 수 찾기",
            level: "🟡 보통",
            desc: "이진 탐색 기본",
            url: "https://www.acmicpc.net/problem/1920",
          },
          {
            title: "백준 1654 - 랜선 자르기",
            level: "🟠 어려움",
            desc: "파라메트릭 서치 입문",
            url: "https://www.acmicpc.net/problem/1654",
          },
          {
            title: "백준 2805 - 나무 자르기",
            level: "🟠 어려움",
            desc: "파라메트릭 서치",
            url: "https://www.acmicpc.net/problem/2805",
          },
          {
            title: "프로그래머스 - 입국심사",
            level: "🔴 고급",
            desc: "파라메트릭 서치 응용",
            url: "https://programmers.co.kr/learn/courses/30/lessons/43238",
          },
          {
            title: "프로그래머스 - H-Index",
            level: "🟡 보통",
            desc: "이진 탐색 응용",
            url: "https://programmers.co.kr/learn/courses/30/lessons/42747",
          },
        ].map(p => (
          <div
            key={p.title}
            className="flex justify-between items-center py-[10px] border-b border-[#1e2d45]"
          >
            <div>
              <span className="text-[#e2e8f0] font-bold">{p.title}</span>
              <span className="text-[#64748b] text-[12px] ml-[10px]">
                {p.desc}
              </span>
            </div>
            <span className="text-[12px]">{p.level}</span>
          </div>
        ))}
      </div>
      <W2_CodeBlock
        code={`# 실전 팁: 파이썬에서 정렬
arr = [3, 1, 4, 1, 5, 9, 2, 6]

# 기본 정렬
arr.sort()                        # in-place, O(n log n)
sorted_arr = sorted(arr)          # 새 배열 반환

# 역순 정렬
arr.sort(reverse=True)

# 키 기반 정렬
words = ["banana", "apple", "cherry"]
words.sort(key=len)               # 길이순
words.sort(key=lambda x: x[-1])  # 마지막 글자순

# 튜플 정렬 (다중 키)
data = [(1, 'b'), (2, 'a'), (1, 'a')]
data.sort()                       # (1,'a'), (1,'b'), (2,'a')
data.sort(key=lambda x: (x[1], -x[0]))  # 2번째 오름, 1번째 내림

print("정렬 완료!")`}
      />
    </div>
  ),
};
