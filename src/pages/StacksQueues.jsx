import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function StacksQueues() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Stacks &amp; Queues
      </p>

      <h1 className="topic-title">Stacks &amp; Queues</h1>
      <p className="topic-subtitle">
        Two of the most fundamental data structures in computer science. They
        are simple, elegant, and show up everywhere — from how JavaScript runs
        your code to how your browser tracks the pages you visit. If you
        understand arrays and linked lists, you already have everything you need
        to build both of these from scratch.
      </p>

      {/* ───────────── 1. What Is a Stack? ───────────── */}
      <div className="section">
        <h2>What Is a Stack?</h2>
        <p>
          A stack is a <strong>LIFO</strong> data structure —{" "}
          <strong>Last In, First Out</strong>. The last thing you put in is the
          first thing you take out. Think of a stack of plates: you always add a
          new plate on top, and when you need one, you grab the plate on top.
          You never pull from the middle or bottom.
        </p>
        <p>
          There are really only two core operations on a stack:
        </p>
        <ul>
          <li>
            <strong>Push</strong> — add an element to the top of the stack.
          </li>
          <li>
            <strong>Pop</strong> — remove and return the element from the top of
            the stack.
          </li>
        </ul>
        <p>
          That is it. A stack is intentionally restrictive. You do not get
          random access, you do not insert in the middle, you do not search
          efficiently. The constraint is the point — it gives you a very
          specific and predictable behavior.
        </p>

        <Callout type="info" title="Where stacks show up in the real world">
          <p>
            Stacks are everywhere once you start looking. The{" "}
            <strong>JavaScript call stack</strong> tracks which function is
            currently executing and where to return when it finishes.{" "}
            <strong>Undo/redo</strong> functionality in text editors uses stacks.
            Your <strong>browser history</strong> back button is essentially a
            stack. <strong>Routing</strong> in single-page apps often uses a
            stack to track navigation history. The{" "}
            <strong>DFS algorithm</strong> (depth-first search) uses a stack,
            either explicitly or via recursion.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Stack with an Array ───────────── */}
      <div className="section">
        <h2>Stack Implementation: Array</h2>
        <p>
          The simplest way to use a stack in JavaScript is to just use an array.
          Arrays already have <code>push</code> and <code>pop</code> methods
          that add and remove from the end — which is exactly what a stack does.
        </p>

        <CodeBlock
          title="Stack using a plain array"
          code={`const stack = [];

stack.push("first");
stack.push("second");
stack.push("third");

stack.pop();  // "third"  — last in, first out
stack.pop();  // "second"
stack.pop();  // "first"`}
        />

        <p>
          This works perfectly fine and is what you will use in most interview
          problems. However, there is a downside: arrays come with a ton of
          extra functionality you do not need — <code>shift</code>,{" "}
          <code>splice</code>, <code>indexOf</code>, index-based access, and
          more. If you want a "pure" stack that only exposes push and pop, you
          can build one with a linked list.
        </p>

        <Callout type="tip" title="When to use the array approach">
          <p>
            In interviews, unless the problem specifically asks you to implement
            a stack class, just use an array with <code>push</code> and{" "}
            <code>pop</code>. It is simple, fast, and everyone understands it.
            Save the linked list implementation for when you are asked to build
            a stack from scratch or when you need to demonstrate your
            understanding of data structures.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Stack with a Linked List ───────────── */}
      <div className="section">
        <h2>Stack Implementation: Linked List</h2>
        <p>
          A linked list-based stack gives you a clean abstraction with only the
          operations a stack should have. We use a singly linked list and always
          add and remove from the <strong>beginning</strong> (the "top" of the
          stack). Why the beginning? Because adding to and removing from the
          beginning of a singly linked list are both <strong>O(1)</strong>. If
          we used the end, removing would be O(n) since we would have to
          traverse the entire list to find the second-to-last node.
        </p>

        <CodeBlock
          title="Node class"
          code={`class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}`}
        />

        <CodeBlock
          title="Stack class (linked list)"
          code={`class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    return ++this.size;
  }

  pop() {
    if (this.size === 0) return null;
    const removed = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = removed.next;
    }
    this.size--;
    return removed.value;
  }
}`}
        />

        <p>
          Let's walk through how this works:
        </p>
        <ul>
          <li>
            <strong>Push</strong> creates a new node and makes it the new{" "}
            <code>first</code>. The old first becomes <code>newNode.next</code>.
            This is O(1) — no traversal needed.
          </li>
          <li>
            <strong>Pop</strong> grabs the current <code>first</code>, then
            moves <code>first</code> to <code>first.next</code>. This is also
            O(1) — just reassigning a pointer.
          </li>
        </ul>

        <CodeBlock
          title="Using the Stack class"
          code={`const stack = new Stack();

stack.push(10);   // size: 1, top: 10
stack.push(20);   // size: 2, top: 20
stack.push(30);   // size: 3, top: 30

stack.pop();      // 30 (last in, first out)
stack.pop();      // 20
stack.size;       // 1
stack.pop();      // 10
stack.pop();      // null (empty stack)`}
        />
      </div>

      {/* ───────────── 4. What Is a Queue? ───────────── */}
      <div className="section">
        <h2>What Is a Queue?</h2>
        <p>
          A queue is a <strong>FIFO</strong> data structure —{" "}
          <strong>First In, First Out</strong>. The first thing you put in is
          the first thing you take out. Think of waiting in line at a coffee
          shop: the person who got in line first gets served first. No cutting.
        </p>
        <p>
          The two core operations on a queue are:
        </p>
        <ul>
          <li>
            <strong>Enqueue</strong> — add an element to the back of the queue.
          </li>
          <li>
            <strong>Dequeue</strong> — remove and return the element from the
            front of the queue.
          </li>
        </ul>
        <p>
          Just like a stack, a queue is intentionally limited. The restriction
          is what makes it useful — it guarantees that items are processed in
          the order they arrived.
        </p>

        <Callout type="info" title="Where queues show up in the real world">
          <p>
            Queues are used whenever things need to be processed in order.{" "}
            <strong>Background tasks</strong> in web applications are placed in
            a queue. <strong>File uploading</strong> systems process uploads in
            the order they were submitted. <strong>Print queues</strong> ensure
            documents print in the order you hit "print."{" "}
            <strong>Task processing</strong> systems (like job queues in
            Node.js) rely on queues. And critically, the{" "}
            <strong>BFS algorithm</strong> (breadth-first search) uses a queue
            to explore nodes level by level.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. Queue with an Array ───────────── */}
      <div className="section">
        <h2>Queue Implementation: Array</h2>
        <p>
          You can use a JavaScript array as a queue by combining{" "}
          <code>push</code> (add to the end) with <code>shift</code> (remove
          from the beginning). It works, but there is a problem.
        </p>

        <CodeBlock
          title="Queue using a plain array"
          code={`const queue = [];

queue.push("first");
queue.push("second");
queue.push("third");

queue.shift();  // "first"  — first in, first out
queue.shift();  // "second"
queue.shift();  // "third"`}
        />

        <Callout type="warning" title="The problem with Array.shift()">
          <p>
            When you call <code>shift()</code>, JavaScript removes the first
            element and then re-indexes every remaining element in the array.
            If the array has 10,000 items, that means moving 9,999 items. That
            makes <code>shift()</code> an <strong>O(n)</strong> operation.
            For a proper queue where both enqueue and dequeue should be O(1), an
            array is not ideal. Use a linked list instead.
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. Queue with a Linked List ───────────── */}
      <div className="section">
        <h2>Queue Implementation: Linked List</h2>
        <p>
          A linked list-based queue gives us O(1) for both enqueue and dequeue.
          We enqueue at the <strong>end</strong> (add a new tail) and dequeue
          from the <strong>beginning</strong> (remove the head). Both operations
          are constant time because we maintain pointers to both ends of the
          list.
        </p>

        <CodeBlock
          title="Node class"
          code={`class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}`}
        />

        <CodeBlock
          title="Queue class (linked list)"
          code={`class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (this.size === 0) return null;
    const removed = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = removed.next;
    }
    this.size--;
    return removed.value;
  }
}`}
        />

        <p>
          Let's trace through the logic:
        </p>
        <ul>
          <li>
            <strong>Enqueue</strong> creates a new node and attaches it after
            the current <code>last</code>. Then it updates <code>last</code> to
            point to the new node. No traversal — O(1).
          </li>
          <li>
            <strong>Dequeue</strong> grabs the current <code>first</code>, then
            moves <code>first</code> to <code>first.next</code>. Again, no
            traversal — O(1).
          </li>
        </ul>

        <CodeBlock
          title="Using the Queue class"
          code={`const queue = new Queue();

queue.enqueue("Alice");   // size: 1, front: Alice
queue.enqueue("Bob");     // size: 2, front: Alice
queue.enqueue("Charlie"); // size: 3, front: Alice

queue.dequeue();  // "Alice"   (first in, first out)
queue.dequeue();  // "Bob"
queue.size;       // 1
queue.dequeue();  // "Charlie"
queue.dequeue();  // null (empty queue)`}
        />
      </div>

      {/* ───────────── 7. Big O Comparison ───────────── */}
      <div className="section">
        <h2>Big O of Stacks and Queues</h2>
        <p>
          Here is the time complexity for stacks and queues when implemented
          with a linked list. Both data structures are optimized for insertion
          and removal — that is their whole purpose. Searching and random access
          are not what they are designed for.
        </p>

        <ComplexityTable
          headers={["Operation", "Stack", "Queue"]}
          rows={[
            ["Insertion", "O(1)", "O(1)"],
            ["Removal", "O(1)", "O(1)"],
            ["Searching", "O(n)", "O(n)"],
            ["Access", "O(n)", "O(n)"],
          ]}
        />

        <p>
          The O(1) insertion and removal are what make stacks and queues
          valuable. If you find yourself needing to search through a stack or
          queue, you probably want a different data structure. These are built
          for adding and removing in a specific order — nothing more.
        </p>

        <Callout type="tip" title="The right tool for the right job">
          <p>
            If you need fast lookup by value, use a hash map. If you need fast
            lookup by index, use an array. If you need to process things in
            LIFO order, use a stack. If you need to process things in FIFO
            order, use a queue. Choosing the right data structure is half the
            battle in any algorithm problem.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. When to Use Which ───────────── */}
      <div className="section">
        <h2>Stack vs. Queue: When to Use Which</h2>
        <p>
          The choice between a stack and a queue comes down to the{" "}
          <strong>order</strong> in which you need to process items.
        </p>

        <h3>Use a stack when...</h3>
        <ul>
          <li>
            You need to <strong>reverse</strong> things or go{" "}
            <strong>backwards</strong>. The last item added is the first one
            you need to deal with.
          </li>
          <li>
            You are tracking <strong>nested structures</strong> — like matching
            parentheses, evaluating expressions, or managing function calls.
          </li>
          <li>
            You are doing <strong>depth-first search</strong> (DFS) — explore
            as deep as possible before backtracking.
          </li>
          <li>
            You need <strong>undo/redo</strong> functionality — the most recent
            action is the one you undo first.
          </li>
        </ul>

        <h3>Use a queue when...</h3>
        <ul>
          <li>
            You need to process items in the <strong>order they arrived</strong>.
            First come, first served.
          </li>
          <li>
            You are doing <strong>breadth-first search</strong> (BFS) — explore
            all neighbors at the current level before moving deeper.
          </li>
          <li>
            You are implementing a <strong>task scheduler</strong> or{" "}
            <strong>job queue</strong> — tasks should be handled in the order
            they were submitted.
          </li>
          <li>
            You are building a <strong>buffer</strong> or{" "}
            <strong>streaming pipeline</strong> — data flows through in order.
          </li>
        </ul>

        <Callout type="info" title="A simple way to remember">
          <p>
            <strong>Stack = backtracking.</strong> You go forward, then need to
            come back the way you came. Like navigating a maze — you retrace
            your steps in reverse order.
          </p>
          <p>
            <strong>Queue = fairness.</strong> Everyone gets served in the order
            they showed up. Like a line at a store — no skipping ahead.
          </p>
        </Callout>
      </div>

      {/* ───────────── 9. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="Recognize stack and queue problems">
          <p>
            Many interview problems are secretly stack or queue problems in
            disguise. The key is to recognize the pattern. If the problem
            involves <strong>matching or nesting</strong> (like valid
            parentheses, HTML tag validation, or evaluating expressions), reach
            for a stack. If the problem involves{" "}
            <strong>processing in order</strong> or{" "}
            <strong>level-by-level traversal</strong>, reach for a queue.
          </p>
        </Callout>

        <Callout type="interview" title="Classic stack problem: Valid Parentheses">
          <p>
            The "Valid Parentheses" problem is one of the most common interview
            questions. You are given a string of brackets —{" "}
            <code>{"(){}[]"}</code> — and you need to determine if they are
            properly matched. The solution uses a stack: push opening brackets
            on, and when you encounter a closing bracket, pop and check if it
            matches. If the stack is empty at the end, the string is valid.
          </p>
        </Callout>

        <CodeBlock
          title="Valid Parentheses — classic stack problem"
          code={`function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }

  return stack.length === 0;
}

isValid("({[]})");  // true
isValid("([)]");    // false
isValid("((");      // false`}
        />

        <Callout type="interview" title="BFS always uses a queue">
          <p>
            Whenever you see a problem that asks for the{" "}
            <strong>shortest path</strong> in an unweighted graph, or asks you
            to process a tree <strong>level by level</strong>, that is BFS — and
            BFS uses a queue. Enqueue the starting node, then repeatedly
            dequeue a node, process it, and enqueue its neighbors. This pattern
            comes up constantly in tree and graph problems.
          </p>
        </Callout>

        <Callout type="interview" title="DFS uses a stack (or recursion)">
          <p>
            Depth-first search uses a stack, either explicitly or through the
            call stack via recursion. If an interviewer asks you to convert a
            recursive DFS to an iterative one, just replace the recursive calls
            with an explicit stack. Push neighbors onto the stack instead of
            making recursive calls, and pop to process the next node.
          </p>
        </Callout>

        <Callout type="tip" title="Know both implementations">
          <p>
            In interviews, you will almost always use an array as your stack
            (just <code>push</code> and <code>pop</code>). But be prepared to
            explain or code the linked list version if asked. It shows you
            understand what is happening under the hood and can build data
            structures from scratch.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            A <strong>stack</strong> is LIFO — last in, first out. Think of a
            stack of plates. Use <code>push</code> and <code>pop</code>.
          </li>
          <li>
            A <strong>queue</strong> is FIFO — first in, first out. Think of
            waiting in line. Use <code>enqueue</code> and <code>dequeue</code>.
          </li>
          <li>
            Both can be implemented with arrays (quick and easy) or linked lists
            (pure abstraction, guaranteed O(1) operations).
          </li>
          <li>
            Insertion and removal are <strong>O(1)</strong> for both. Searching
            and access are <strong>O(n)</strong> — but that is fine because
            those are not what stacks and queues are for.
          </li>
          <li>
            <strong>Stack patterns:</strong> matching/nesting, undo/redo, DFS,
            backtracking.
          </li>
          <li>
            <strong>Queue patterns:</strong> order-preserving processing, BFS,
            task scheduling, buffering.
          </li>
          <li>
            In interviews, recognize the pattern first — many problems are
            secretly asking you to use a stack or a queue.
          </li>
        </ul>
      </div>

      <TopicNav slug="stacks-queues" />
    </div>
  );
}
