import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function Heaps() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Binary Heaps
      </p>

      <h1 className="topic-title">Binary Heaps</h1>
      <p className="topic-subtitle">
        A binary heap is a tree-based data structure that powers priority queues,
        efficient sorting, and graph algorithms like Dijkstra's. It looks like a
        binary search tree at first glance, but the rules are completely
        different — and those different rules are what make heaps so useful.
      </p>

      {/* ───────────── 1. What is a Binary Heap? ───────────── */}
      <div className="section">
        <h2>What is a Binary Heap?</h2>
        <p>
          A binary heap is similar to a binary search tree, but with different
          rules. In a BST, the left child is always smaller and the right child
          is always larger. In a heap, the rules are simpler — and there is no
          ordering between siblings at all.
        </p>
        <p>
          There are two types of binary heaps:
        </p>
        <ul>
          <li>
            <strong>MaxBinaryHeap</strong> — every parent node is{" "}
            <strong>always larger</strong> than its children. The root is the
            largest value in the entire heap.
          </li>
          <li>
            <strong>MinBinaryHeap</strong> — every parent node is{" "}
            <strong>always smaller</strong> than its children. The root is the
            smallest value in the entire heap.
          </li>
        </ul>
        <p>
          Notice what is <em>not</em> required: there is no guaranteed ordering
          between siblings. The left child is not necessarily smaller than the
          right child (or vice versa). The only guarantee is the parent-child
          relationship.
        </p>
        <p>
          Binary heaps are also <strong>as compact as possible</strong>. Every
          level is fully filled before moving to the next level, and children
          are always added from left to right. This is what makes them so
          efficient to store and work with.
        </p>

        <Callout type="info" title="Heap vs BST — key difference">
          <p>
            In a BST, there is a strict left-right ordering that makes
            searching efficient (O(log n)). In a heap, there is only a
            parent-child ordering that makes finding the min or max efficient
            (O(1)). They solve different problems. A heap is not good for
            searching, but it is excellent for repeatedly grabbing the highest
            (or lowest) priority element.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Why Heaps Matter ───────────── */}
      <div className="section">
        <h2>Why Do Heaps Matter?</h2>
        <p>
          You might be wondering why we need yet another data structure. Heaps
          earn their place because they are the backbone of several important
          things:
        </p>
        <ul>
          <li>
            <strong>Priority Queues</strong> — this is the big one. Priority
            queues are used everywhere: task scheduling, event handling,
            bandwidth management, and a huge number of interview problems. Heaps
            are the most common way to implement them.
          </li>
          <li>
            <strong>Graph algorithms</strong> — Dijkstra's shortest path
            algorithm and Prim's minimum spanning tree algorithm both rely on a
            priority queue (and therefore a heap) to work efficiently.
          </li>
          <li>
            <strong>Heap sort</strong> — a comparison-based sorting algorithm
            with O(n log n) time complexity that uses a heap internally.
          </li>
        </ul>

        <Callout type="tip" title="Priority queues come up a lot">
          <p>
            If there is one thing to take away from this page, it is that heaps
            and priority queues are practically synonymous. When someone says
            "use a priority queue," they almost always mean "use a heap." Learn
            heaps well and you unlock an entire category of problems.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Storing Heaps in an Array ───────────── */}
      <div className="section">
        <h2>Storing Heaps in an Array — The Math Trick</h2>
        <p>
          Here is one of the coolest things about binary heaps: you do not need
          nodes and pointers like you do with a BST. Because heaps are always
          compact (every level filled left to right), you can store the entire
          heap in a flat array. The parent-child relationships are encoded
          purely through index math.
        </p>
        <p>
          The formulas are simple:
        </p>
        <ul>
          <li>
            For a node at index <strong>n</strong>, its{" "}
            <strong>left child</strong> is at index <code>2n + 1</code>
          </li>
          <li>
            For a node at index <strong>n</strong>, its{" "}
            <strong>right child</strong> is at index <code>2n + 2</code>
          </li>
          <li>
            For a child at index <strong>n</strong>, its{" "}
            <strong>parent</strong> is at index{" "}
            <code>Math.floor((n - 1) / 2)</code>
          </li>
        </ul>

        <CodeBlock
          title="Visualizing a MaxBinaryHeap as an array"
          code={`//        41
//       /  \\
//     39    33
//    / \\   /
//  18  27 12
//
// Stored as an array:
// [41, 39, 33, 18, 27, 12]
//
// Index:  0   1   2   3   4   5
//
// Let's verify the math:
// Index 0 (41): left child = 2(0)+1 = 1 (39) ✓  right child = 2(0)+2 = 2 (33) ✓
// Index 1 (39): left child = 2(1)+1 = 3 (18) ✓  right child = 2(1)+2 = 4 (27) ✓
// Index 2 (33): left child = 2(2)+1 = 5 (12) ✓  right child = 2(2)+2 = 6 (none)
//
// Going the other way (child → parent):
// Index 5 (12): parent = Math.floor((5-1)/2) = 2 (33) ✓
// Index 4 (27): parent = Math.floor((4-1)/2) = 1 (39) ✓
// Index 3 (18): parent = Math.floor((3-1)/2) = 1 (39) ✓`}
        />

        <Callout type="info" title="Why arrays work so well here">
          <p>
            Because a binary heap is always a complete tree (filled left to
            right, level by level), there are never any "gaps" in the array. Every
            index is used. This makes the array representation both memory
            efficient and cache friendly — no pointer overhead, no wasted
            space.
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. MaxBinaryHeap Class ───────────── */}
      <div className="section">
        <h2>MaxBinaryHeap Class</h2>
        <p>
          Let's start building our MaxBinaryHeap. The structure is beautifully
          simple — just a class with an array.
        </p>

        <CodeBlock
          title="MaxBinaryHeap — skeleton"
          code={`class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
}`}
        />

        <p>
          That is it for the setup. No nodes, no left/right pointers, no
          constructor arguments. The entire heap lives inside a single array
          called <code>values</code>. Now let's add the operations that make it
          useful.
        </p>
      </div>

      {/* ───────────── 5. Insert ───────────── */}
      <div className="section">
        <h2>Insert (Bubble Up)</h2>
        <p>
          To insert a value into a MaxBinaryHeap, we follow two steps:
        </p>
        <ol>
          <li>
            <strong>Push</strong> the new value to the end of the array. This
            places it at the bottom of the heap, in the next available spot.
          </li>
          <li>
            <strong>Bubble up</strong> — compare the new value with its parent.
            If it is larger than its parent, swap them. Keep comparing and
            swapping until the value is in the correct position (either it
            reaches the root, or its parent is larger).
          </li>
        </ol>

        <CodeBlock
          title="Insert with bubble up"
          code={`class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      // If the element is smaller than or equal to its parent, we are done
      if (element <= parent) break;

      // Otherwise, swap and keep going
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
}

const heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
// heap.values → [41, 39, 33, 18, 27, 12]

heap.insert(55);
// 55 is pushed to the end: [41, 39, 33, 18, 27, 12, 55]
// 55 > parent 33 (index 2) → swap: [41, 39, 55, 18, 27, 12, 33]
// 55 > parent 41 (index 0) → swap: [55, 39, 41, 18, 27, 12, 33]
// 55 is now the root — done!
// heap.values → [55, 39, 41, 18, 27, 12, 33]`}
        />

        <p>
          The key insight is that we always insert at the end (to keep the heap
          compact) and then fix the heap property by bubbling up. In the worst
          case, the new value bubbles all the way to the root, which takes
          O(log n) swaps — one swap per level of the tree.
        </p>

        <Callout type="tip" title="Why 'bubble up'?">
          <p>
            Think of the new element like a bubble in water. If it is lighter
            (or in our case, larger) than what is above it, it floats upward
            until it finds its level. The name makes the algorithm easy to
            remember.
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. ExtractMax ───────────── */}
      <div className="section">
        <h2>ExtractMax (Sink Down)</h2>
        <p>
          Extracting the maximum value (the root) is the other critical
          operation. This is the whole reason we built a max heap — to quickly
          get the largest element. But we cannot just remove the root and leave
          a hole. Here is the procedure:
        </p>
        <ol>
          <li>
            <strong>Swap</strong> the root (first element) with the last element
            in the array.
          </li>
          <li>
            <strong>Pop</strong> the last element off (this is our extracted max).
          </li>
          <li>
            <strong>Sink down</strong> (also called "bubble down" or "heapify
            down") — the new root is probably too small to be there. Compare it
            with its children, swap it with the <strong>larger</strong> child,
            and repeat until it is in the correct spot.
          </li>
        </ol>

        <CodeBlock
          title="ExtractMax with sink down"
          code={`class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element <= parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();

    // Only sink down if there are elements left
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return max;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      // Check left child
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }

      // Check right child
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      // If neither child is larger, we are done
      if (swap === null) break;

      // Swap with the larger child
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

const heap = new MaxBinaryHeap();
[41, 39, 33, 18, 27, 12].forEach(v => heap.insert(v));
// heap.values → [41, 39, 33, 18, 27, 12]

heap.extractMax(); // 41
// Swap 41 and 12: [12, 39, 33, 18, 27]
// Sink down 12:
//   Compare with children 39 and 33 → swap with 39 (larger)
//   [39, 12, 33, 18, 27]
//   Compare with children 18 and 27 → swap with 27 (larger)
//   [39, 27, 33, 18, 12]
// Done! heap.values → [39, 27, 33, 18, 12]`}
        />

        <p>
          The <code>sinkDown</code> method is a bit more involved than{" "}
          <code>bubbleUp</code> because we need to compare with{" "}
          <strong>both</strong> children and pick the larger one. We use a{" "}
          <code>swap</code> variable to track which child (if any) we should
          swap with. If neither child is larger, <code>swap</code> stays{" "}
          <code>null</code> and we break out of the loop.
        </p>

        <Callout type="warning" title="Edge case: empty heap">
          <p>
            Notice the check <code>if (this.values.length &gt; 0)</code> after
            the pop. If the heap only had one element, popping it leaves an
            empty array. Without this guard, we would try to sink down a
            value that does not exist. Always handle the edge case of removing
            the last element.
          </p>
        </Callout>
      </div>

      {/* ───────────── 7. Priority Queue ───────────── */}
      <div className="section">
        <h2>Priority Queue</h2>
        <p>
          Now let's talk about the real reason heaps are so important:{" "}
          <strong>priority queues</strong>.
        </p>
        <p>
          A priority queue is a data structure where each element has a{" "}
          <strong>priority</strong>, and elements with higher priority are
          served before elements with lower priority. Think of an emergency
          room: patients are not seen in the order they arrive — they are seen
          based on the severity of their condition.
        </p>
        <p>
          We could build a priority queue with a simple list (insert at the end,
          then scan for the highest priority element each time), but that would
          give us O(n) for either insertion or removal. A heap gives us{" "}
          <strong>O(log n) for both</strong>.
        </p>
        <p>
          We will build our priority queue using a <strong>MinBinaryHeap</strong>{" "}
          where a lower priority number means higher urgency. Priority 1 gets
          served before priority 5.
        </p>

        <CodeBlock
          title="Node class for the priority queue"
          code={`class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}`}
        />

        <CodeBlock
          title="PriorityQueue — full implementation"
          code={`class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      // In a MinBinaryHeap, parent should have LOWER priority number
      if (element.priority >= parent.priority) break;

      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

// Example: hospital emergency room
const er = new PriorityQueue();

er.enqueue("common cold", 5);
er.enqueue("gunshot wound", 1);
er.enqueue("high fever", 4);
er.enqueue("broken arm", 2);
er.enqueue("glass in foot", 3);

er.dequeue(); // Node { val: "gunshot wound", priority: 1 }
er.dequeue(); // Node { val: "broken arm", priority: 2 }
er.dequeue(); // Node { val: "glass in foot", priority: 3 }
er.dequeue(); // Node { val: "high fever", priority: 4 }
er.dequeue(); // Node { val: "common cold", priority: 5 }`}
        />

        <p>
          Notice how the code is almost identical to our MaxBinaryHeap, with two
          key differences:
        </p>
        <ul>
          <li>
            We store <strong>Node objects</strong> instead of plain values. Each
            node has a <code>val</code> (the data) and a <code>priority</code>{" "}
            (the number we compare).
          </li>
          <li>
            The comparison is <strong>flipped</strong>. Instead of swapping when
            a child is larger (max heap), we swap when a child has a{" "}
            <strong>smaller priority number</strong> (min heap). Lower number =
            higher urgency.
          </li>
        </ul>

        <Callout type="interview" title="Priority queues are everywhere in interviews">
          <p>
            Many interview problems boil down to "process things in priority
            order." Merging K sorted lists, finding the Kth largest element,
            scheduling tasks — all of these use a priority queue. If you see a
            problem that involves repeatedly finding the smallest or largest
            element from a changing collection, think heap.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. Big O ───────────── */}
      <div className="section">
        <h2>Big O of Binary Heaps</h2>
        <p>
          Binary heaps have excellent time complexity for insertion and removal,
          but they are not designed for searching.
        </p>

        <ComplexityTable
          headers={["Operation", "Time Complexity", "Why"]}
          rows={[
            ["Insert", "O(log n)", "Bubble up at most the height of the tree"],
            ["Remove (extract max/min)", "O(log n)", "Sink down at most the height of the tree"],
            ["Search", "O(n)", "No ordering between siblings — must check everything"],
            ["Find max (in max heap)", "O(1)", "It is always the root"],
            ["Find min (in min heap)", "O(1)", "It is always the root"],
          ]}
        />

        <p>
          Both insert and remove are O(log n) because a binary heap is a
          complete binary tree. A complete tree with n nodes has a height of
          roughly log2(n). Bubbling up and sinking down traverse at most one
          level at a time, so the worst case is proportional to the height.
        </p>
        <p>
          Searching, on the other hand, is O(n). Unlike a BST where you can
          eliminate half the tree at each step, a heap gives you no information
          about where to look. All you know is that a parent is bigger (or
          smaller) than its children — you cannot rule out either subtree. In
          the worst case, you must check every element.
        </p>

        <Callout type="warning" title="Heaps are NOT good for searching">
          <p>
            This is an important distinction. If you need fast lookups by value,
            use a BST or a hash table. Heaps are optimized for one thing:
            quickly accessing and removing the highest-priority (or
            lowest-priority) element. They do that one thing extremely well.
          </p>
        </Callout>
      </div>

      {/* ───────────── 9. Interview Tips ───────────── */}
      <div className="section">
        <h2>Tips and Interview Advice</h2>

        <Callout type="interview" title="Recognize priority queue problems">
          <p>
            The biggest skill with heaps is recognizing when to use one. Any
            time a problem asks you to repeatedly find the minimum or maximum
            from a dynamic collection, that is a priority queue problem. Key
            phrases to look for: "Kth largest," "Kth smallest," "merge K
            sorted," "schedule by deadline," "process by priority."
          </p>
        </Callout>

        <Callout type="interview" title="Know the array representation">
          <p>
            Interviewers love asking about how heaps are stored. Be ready to
            explain the array-based representation and the index formulas:{" "}
            <code>2n + 1</code> for the left child, <code>2n + 2</code> for
            the right child, and <code>Math.floor((n - 1) / 2)</code> for the
            parent. Draw it out if asked — showing the tree and the
            corresponding array side by side demonstrates deep understanding.
          </p>
        </Callout>

        <Callout type="interview" title="Max heap vs min heap">
          <p>
            Know how to build both. The only difference is the comparison
            direction. If a problem asks for the K largest elements, use a min
            heap of size K (counterintuitive but efficient). If it asks for the
            K smallest, use a max heap of size K. This is a common interview
            pattern that trips people up.
          </p>
        </Callout>

        <Callout type="tip" title="In most languages, you get a heap for free">
          <p>
            In Python, there is <code>heapq</code>. In Java, there is{" "}
            <code>PriorityQueue</code>. In C++, there is{" "}
            <code>priority_queue</code>. JavaScript does not have a built-in
            heap, which is why it is worth implementing one from scratch — and
            why interviewers in JavaScript interviews love asking about them.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            A <strong>binary heap</strong> is a complete binary tree where every
            parent is larger (max heap) or smaller (min heap) than its children.
            There is no ordering between siblings.
          </li>
          <li>
            Heaps are stored as <strong>flat arrays</strong> using index math:
            left child at <code>2n + 1</code>, right child at{" "}
            <code>2n + 2</code>, parent at{" "}
            <code>Math.floor((n - 1) / 2)</code>.
          </li>
          <li>
            <strong>Insert</strong> pushes to the end and bubbles up. O(log n).
          </li>
          <li>
            <strong>ExtractMax/Min</strong> swaps the root with the last
            element, pops, and sinks down. O(log n).
          </li>
          <li>
            <strong>Priority queues</strong> are built on heaps. Each element
            has a priority, and the highest-priority element is always at the
            root. This is the primary use case for heaps.
          </li>
          <li>
            Heaps are <strong>not good for searching</strong> — O(n) in the
            worst case. Use a BST or hash table if you need fast lookups.
          </li>
          <li>
            In interviews, look for problems involving "Kth largest," "Kth
            smallest," "merge K sorted," or any scenario where you repeatedly
            need the min or max from a changing collection.
          </li>
        </ul>
      </div>

      <TopicNav slug="heaps" />
    </div>
  );
}
