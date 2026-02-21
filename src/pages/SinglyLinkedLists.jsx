import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function SinglyLinkedLists() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Singly Linked Lists
      </p>

      <h1 className="topic-title">Singly Linked Lists</h1>
      <p className="topic-subtitle">
        A linked list is one of the most fundamental data structures in computer
        science. It is the foundation for stacks, queues, and more complex
        structures like graphs and trees. Understanding linked lists deeply will
        make every other data structure feel more approachable — and they come
        up constantly in interviews.
      </p>

      {/* ───────────── 1. What is a Linked List? ───────────── */}
      <div className="section">
        <h2>What is a Linked List?</h2>
        <p>
          A linked list is an ordered collection of data. It consists of{" "}
          <strong>nodes</strong>, and each node holds a <strong>value</strong>{" "}
          and a <strong>pointer</strong> (or reference) to the next node in the
          sequence — or <code>null</code> if it is the last node.
        </p>
        <p>
          The list itself keeps track of three things: a{" "}
          <strong>head</strong> (the first node), a <strong>tail</strong> (the
          last node), and the <strong>length</strong> (the number of nodes).
          That is the entire structure. There are no indexes, no slots in
          memory sitting side by side. Each node only knows about itself and
          who comes next.
        </p>
        <p>
          Think of it like a chain of train cars. Each car is connected to the
          next car by a coupling. If you want to reach the fifth car, you have
          to start at the engine and walk through cars one, two, three, and
          four first. There is no shortcut to jump directly to the fifth car —
          that is what "no random access" means.
        </p>

        <Callout type="info" title="Head, tail, and length">
          <p>
            The head is your entry point into the list. Everything starts
            there. The tail is useful because it lets us add to the end of the
            list in O(1) time without traversing the entire chain. The length
            gives us a quick count without having to walk through every node.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Comparison with Arrays ───────────── */}
      <div className="section">
        <h2>Linked Lists vs. Arrays</h2>
        <p>
          Arrays and linked lists both store ordered collections of data, but
          they do it in fundamentally different ways. Understanding the
          tradeoffs is key to knowing when to use each one.
        </p>

        <h3>Arrays</h3>
        <ul>
          <li>
            <strong>Indexed.</strong> Every element has a numeric index (0, 1,
            2, ...) and you can access any element directly in O(1) time.
          </li>
          <li>
            <strong>Contiguous in memory.</strong> Elements sit side by side,
            which is great for cache performance and random access.
          </li>
          <li>
            <strong>Insertion and deletion can be expensive.</strong> Inserting
            at the beginning or middle requires shifting every subsequent
            element — that is O(n).
          </li>
        </ul>

        <h3>Linked Lists</h3>
        <ul>
          <li>
            <strong>No indexes.</strong> You cannot jump to the 5th element
            directly. You have to start at the head and follow the chain.
          </li>
          <li>
            <strong>Connected via next pointers.</strong> Each node points to
            the next. Nodes can live anywhere in memory.
          </li>
          <li>
            <strong>No random access.</strong> Accessing the nth element
            requires walking through n nodes — that is O(n).
          </li>
          <li>
            <strong>Cheap insertion and deletion.</strong> Adding or removing a
            node from the beginning is O(1) — just rewire a pointer. No
            shifting required.
          </li>
        </ul>

        <Callout type="tip" title="When to pick a linked list over an array">
          <p>
            If your main operations are inserting and removing from the
            beginning of the list (like a queue or stack), a linked list can
            outperform an array. If you need fast random access by index, stick
            with arrays.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Node and Class Setup ───────────── */}
      <div className="section">
        <h2>Setting Up the Classes</h2>
        <p>
          We will build our singly linked list using ES2015 classes. First, we
          need a <code>Node</code> class — each node stores a value and a
          pointer to the next node. Then we need the{" "}
          <code>SinglyLinkedList</code> class itself, which tracks the head,
          tail, and length.
        </p>

        <CodeBlock
          title="Node class"
          code={`class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}`}
        />

        <p>
          Simple. Each node is born knowing its own value and pointing to
          nothing (<code>null</code>). The list will wire up the{" "}
          <code>next</code> pointers as nodes are added.
        </p>

        <CodeBlock
          title="SinglyLinkedList class — skeleton"
          code={`class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}`}
        />

        <p>
          A brand new list has no head, no tail, and a length of zero. Now
          let's build out each method one at a time.
        </p>
      </div>

      {/* ───────────── 4. Push ───────────── */}
      <div className="section">
        <h2>Push — Add to the End</h2>
        <p>
          The <code>push</code> method adds a new node to the end of the list.
          Here is the logic:
        </p>
        <ol>
          <li>Create a new node with the given value.</li>
          <li>
            If the list is empty (no head), set both the head and the tail to
            the new node.
          </li>
          <li>
            Otherwise, set the current tail's <code>next</code> to the new
            node, then update the tail to be the new node.
          </li>
          <li>Increment the length by 1.</li>
          <li>Return the list (for chaining).</li>
        </ol>

        <CodeBlock
          title="push(val)"
          code={`push(val) {
  const newNode = new Node(val);
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.length++;
  return this;
}`}
        />

        <Callout type="info" title="Why track the tail?">
          <p>
            Without a tail pointer, pushing would require traversing the
            entire list to find the last node — making it O(n). With a tail
            pointer, push is always O(1). This is one of the simplest
            optimizations in data structures.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. Pop ───────────── */}
      <div className="section">
        <h2>Pop — Remove from the End</h2>
        <p>
          Removing from the end is trickier than adding. We need to find the{" "}
          <strong>second-to-last node</strong> and make it the new tail. But
          since each node only points forward (not backward), we have to
          traverse from the head all the way through. This makes pop O(n).
        </p>
        <ol>
          <li>If the list is empty, return undefined.</li>
          <li>
            Loop through the list, keeping track of the current node and the
            one right before it.
          </li>
          <li>
            When you reach the tail, set the previous node's <code>next</code>{" "}
            to <code>null</code> and make it the new tail.
          </li>
          <li>Decrement the length.</li>
          <li>If the list is now empty, set head and tail to null.</li>
          <li>Return the removed node's value.</li>
        </ol>

        <CodeBlock
          title="pop()"
          code={`pop() {
  if (!this.head) return undefined;
  let current = this.head;
  let newTail = current;
  while (current.next) {
    newTail = current;
    current = current.next;
  }
  this.tail = newTail;
  this.tail.next = null;
  this.length--;
  if (this.length === 0) {
    this.head = null;
    this.tail = null;
  }
  return current.val;
}`}
        />

        <Callout type="warning" title="Pop is O(n) for singly linked lists">
          <p>
            This is a key difference from doubly linked lists, where pop is
            O(1) because each node has a <code>prev</code> pointer. In a
            singly linked list, you have no choice but to walk the whole chain.
            If frequent removal from the end is critical, consider using a
            doubly linked list instead.
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. Shift ───────────── */}
      <div className="section">
        <h2>Shift — Remove from the Beginning</h2>
        <p>
          Removing from the beginning is where linked lists really shine
          compared to arrays. In an array, <code>shift()</code> is O(n)
          because every element has to be re-indexed. In a linked list, it is
          O(1) — just move the head pointer.
        </p>
        <ol>
          <li>If the list is empty, return undefined.</li>
          <li>Store the current head in a variable.</li>
          <li>Set the head to the current head's <code>next</code>.</li>
          <li>Decrement the length.</li>
          <li>If the list is now empty, set the tail to null.</li>
          <li>Return the removed node's value.</li>
        </ol>

        <CodeBlock
          title="shift()"
          code={`shift() {
  if (!this.head) return undefined;
  const currentHead = this.head;
  this.head = currentHead.next;
  this.length--;
  if (this.length === 0) {
    this.tail = null;
  }
  return currentHead.val;
}`}
        />
      </div>

      {/* ───────────── 7. Unshift ───────────── */}
      <div className="section">
        <h2>Unshift — Add to the Beginning</h2>
        <p>
          Adding to the beginning is also O(1). Create a new node, point it at
          the current head, and update the head pointer.
        </p>
        <ol>
          <li>Create a new node with the given value.</li>
          <li>
            If the list is empty, set both head and tail to the new node.
          </li>
          <li>
            Otherwise, set the new node's <code>next</code> to the current
            head, then update the head to be the new node.
          </li>
          <li>Increment the length.</li>
          <li>Return the list.</li>
        </ol>

        <CodeBlock
          title="unshift(val)"
          code={`unshift(val) {
  const newNode = new Node(val);
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.next = this.head;
    this.head = newNode;
  }
  this.length++;
  return this;
}`}
        />
      </div>

      {/* ───────────── 8. Get ───────────── */}
      <div className="section">
        <h2>Get — Access a Node by Position</h2>
        <p>
          Since there are no indexes, we have to walk the list from the head,
          counting as we go, until we reach the desired position. This is
          O(n).
        </p>
        <ol>
          <li>
            If the index is less than 0 or greater than or equal to the
            length, return null.
          </li>
          <li>Start at the head and loop through, incrementing a counter.</li>
          <li>When the counter matches the index, return that node.</li>
        </ol>

        <CodeBlock
          title="get(index)"
          code={`get(index) {
  if (index < 0 || index >= this.length) return null;
  let counter = 0;
  let current = this.head;
  while (counter !== index) {
    current = current.next;
    counter++;
  }
  return current;
}`}
        />

        <Callout type="info" title="Returns the node, not just the value">
          <p>
            Notice that <code>get</code> returns the entire node object, not
            just <code>node.val</code>. This is intentional — other methods
            like <code>set</code>, <code>insert</code>, and{" "}
            <code>remove</code> will use <code>get</code> internally and need
            access to the node itself so they can rewire pointers.
          </p>
        </Callout>
      </div>

      {/* ───────────── 9. Set ───────────── */}
      <div className="section">
        <h2>Set — Change a Value at a Position</h2>
        <p>
          The <code>set</code> method updates the value of a node at a given
          position. It leverages the <code>get</code> method to find the node
          first.
        </p>
        <ol>
          <li>
            Use <code>get</code> to find the node at the given index.
          </li>
          <li>If the node is found, update its value and return true.</li>
          <li>If the node is not found, return false.</li>
        </ol>

        <CodeBlock
          title="set(index, val)"
          code={`set(index, val) {
  const foundNode = this.get(index);
  if (foundNode) {
    foundNode.val = val;
    return true;
  }
  return false;
}`}
        />

        <Callout type="tip" title="Reuse your own methods">
          <p>
            Building methods on top of each other keeps code DRY and reduces
            bugs. <code>set</code> uses <code>get</code>.{" "}
            <code>insert</code> will use <code>get</code>.{" "}
            <code>remove</code> will use <code>get</code>. This is a clean
            pattern that interviewers appreciate seeing.
          </p>
        </Callout>
      </div>

      {/* ───────────── 10. Insert ───────────── */}
      <div className="section">
        <h2>Insert — Add a Node at a Specific Position</h2>
        <p>
          Inserting at an arbitrary position means finding the node just
          before the target index and rewiring pointers.
        </p>
        <ol>
          <li>
            If the index is less than 0 or greater than the length, return
            false.
          </li>
          <li>
            If the index equals the length, use <code>push</code> (adding to
            the end).
          </li>
          <li>
            If the index is 0, use <code>unshift</code> (adding to the
            beginning).
          </li>
          <li>
            Otherwise, use <code>get(index - 1)</code> to find the node right
            before the insertion point. Create the new node, set its{" "}
            <code>next</code> to the previous node's <code>next</code>, then
            set the previous node's <code>next</code> to the new node.
          </li>
          <li>Increment the length and return true.</li>
        </ol>

        <CodeBlock
          title="insert(index, val)"
          code={`insert(index, val) {
  if (index < 0 || index > this.length) return false;
  if (index === this.length) return !!this.push(val);
  if (index === 0) return !!this.unshift(val);

  const newNode = new Node(val);
  const prev = this.get(index - 1);
  newNode.next = prev.next;
  prev.next = newNode;
  this.length++;
  return true;
}`}
        />

        <Callout type="info" title="The double-bang (!!) trick">
          <p>
            <code>!!this.push(val)</code> coerces the return value to a
            boolean. Since <code>push</code> returns the list (a truthy
            object), <code>!!</code> converts it to <code>true</code>. This
            keeps the return type consistent — <code>insert</code> always
            returns a boolean.
          </p>
        </Callout>
      </div>

      {/* ───────────── 11. Remove ───────────── */}
      <div className="section">
        <h2>Remove — Remove a Node at a Specific Position</h2>
        <p>
          Removing at a position is the mirror of inserting. Find the node
          before the target and rewire its <code>next</code> to skip over the
          removed node.
        </p>
        <ol>
          <li>
            If the index is less than 0 or greater than or equal to the
            length, return undefined.
          </li>
          <li>
            If the index is 0, use <code>shift</code>.
          </li>
          <li>
            If the index equals the length minus 1, use <code>pop</code>.
          </li>
          <li>
            Otherwise, use <code>get(index - 1)</code> to find the node
            before, set its <code>next</code> to skip one node ahead.
          </li>
          <li>Decrement the length and return the value of the removed node.</li>
        </ol>

        <CodeBlock
          title="remove(index)"
          code={`remove(index) {
  if (index < 0 || index >= this.length) return undefined;
  if (index === 0) return this.shift();
  if (index === this.length - 1) return this.pop();

  const prev = this.get(index - 1);
  const removed = prev.next;
  prev.next = removed.next;
  this.length--;
  return removed.val;
}`}
        />
      </div>

      {/* ───────────── 12. Reverse ───────────── */}
      <div className="section">
        <h2>Reverse — Reverse the List in Place</h2>
        <p>
          Reversing a singly linked list in place is a classic interview
          problem. The idea is to walk through the list and flip every{" "}
          <code>next</code> pointer so it points backward instead of forward.
          We use three variables to keep track of where we are:{" "}
          <code>prev</code>, <code>current</code>, and <code>next</code>.
        </p>
        <ol>
          <li>Swap the head and the tail.</li>
          <li>
            Initialize <code>prev</code> to <code>null</code> and{" "}
            <code>current</code> to the old head (which is now the tail's
            starting position after the swap, but we use the variable we saved).
          </li>
          <li>
            Loop through the list. For each node: save <code>current.next</code>{" "}
            as <code>next</code>, then set <code>current.next</code> to{" "}
            <code>prev</code> (flip the pointer), then advance{" "}
            <code>prev</code> and <code>current</code> forward.
          </li>
        </ol>

        <CodeBlock
          title="reverse()"
          code={`reverse() {
  // Swap head and tail
  let node = this.head;
  this.head = this.tail;
  this.tail = node;

  let prev = null;
  let next;

  for (let i = 0; i < this.length; i++) {
    next = node.next;    // save reference to next node
    node.next = prev;    // flip the pointer
    prev = node;         // advance prev
    node = next;         // advance current
  }

  return this;
}`}
        />

        <Callout type="interview" title="Reverse is a top interview question">
          <p>
            "Reverse a singly linked list" is one of the most commonly asked
            interview questions. Practice it until you can write it from
            memory. The key insight is the three-pointer technique: you need{" "}
            <code>prev</code>, <code>current</code>, and <code>next</code> to
            flip each link without losing your place in the chain.
          </p>
        </Callout>
      </div>

      {/* ───────────── 13. Full Implementation ───────────── */}
      <div className="section">
        <h2>Full Implementation</h2>
        <p>
          Here is the complete singly linked list class with all methods in one
          place:
        </p>

        <CodeBlock
          title="Complete SinglyLinkedList class"
          code={`class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current.val;
  }

  shift() {
    if (!this.head) return undefined;
    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead.val;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  set(index, val) {
    const foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);

    const newNode = new Node(val);
    const prev = this.get(index - 1);
    newNode.next = prev.next;
    prev.next = newNode;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prev = this.get(index - 1);
    const removed = prev.next;
    prev.next = removed.next;
    this.length--;
    return removed.val;
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let prev = null;
    let next;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return this;
  }
}

// Usage example:
const list = new SinglyLinkedList();
list.push("Hello");
list.push("World");
list.push("!");
list.unshift("Say");

// Say -> Hello -> World -> !

list.pop();        // "!"
list.shift();      // "Say"
list.get(0);       // Node { val: "Hello", next: Node { val: "World" } }
list.set(1, "JS"); // true — list is now Hello -> JS
list.insert(1, "Beautiful"); // true — Hello -> Beautiful -> JS
list.remove(1);    // "Beautiful" — back to Hello -> JS
list.reverse();    // JS -> Hello`}
        />
      </div>

      {/* ───────────── 14. Big O Complexity ───────────── */}
      <div className="section">
        <h2>Big O of Singly Linked Lists</h2>
        <p>
          Here is how each operation stacks up. Notice how the strengths and
          weaknesses are almost the opposite of arrays:
        </p>

        <ComplexityTable
          headers={["Operation", "Time Complexity", "Notes"]}
          rows={[
            ["Insertion (beginning)", "O(1)", "Just rewire the head pointer"],
            ["Insertion (end)", "O(1)", "Tail pointer makes this instant"],
            ["Removal (beginning)", "O(1)", "Move the head pointer forward"],
            ["Removal (end)", "O(n)", "Must traverse to find the 2nd-to-last node"],
            ["Searching", "O(n)", "Walk from head, checking each node"],
            ["Access by index", "O(n)", "Walk from head, counting nodes"],
          ]}
        />

        <h3>Compared with Arrays</h3>

        <ComplexityTable
          headers={["Operation", "Singly Linked List", "Array"]}
          rows={[
            ["Insertion (beginning)", "O(1)", "O(n)"],
            ["Insertion (end)", "O(1)", "O(1)"],
            ["Removal (beginning)", "O(1)", "O(n)"],
            ["Removal (end)", "O(n)", "O(1)"],
            ["Searching", "O(n)", "O(n)"],
            ["Access by index", "O(n)", "O(1)"],
          ]}
        />

        <Callout type="tip" title="Each has its sweet spot">
          <p>
            Arrays win at random access and removal from the end. Linked lists
            win at insertion and removal from the beginning. Neither is
            universally better — the right choice depends on the operations
            your program performs most often.
          </p>
        </Callout>
      </div>

      {/* ───────────── 15. When to Use Linked Lists ───────────── */}
      <div className="section">
        <h2>When to Use Linked Lists Over Arrays</h2>
        <p>
          In practice, JavaScript arrays are highly optimized and suitable for
          most tasks. But there are specific scenarios where singly linked
          lists make more sense:
        </p>
        <ul>
          <li>
            <strong>Frequent insertion/deletion at the beginning.</strong> If
            you are building a queue (FIFO), a linked list gives you O(1)
            enqueue and dequeue, whereas an array-based queue would be O(n)
            for the shift operation.
          </li>
          <li>
            <strong>Unknown or highly variable size.</strong> Linked lists
            grow and shrink gracefully without the overhead of resizing an
            underlying buffer.
          </li>
          <li>
            <strong>Building other data structures.</strong> Stacks, queues,
            hash tables (for chaining), and adjacency lists for graphs are
            all commonly implemented with linked lists under the hood.
          </li>
          <li>
            <strong>Memory efficiency for sparse data.</strong> If you have
            many lists that are mostly empty or very small, linked lists
            avoid the overhead of pre-allocated array slots.
          </li>
        </ul>
        <p>
          On the flip side, if you need random access, sorting, or binary
          search, arrays are the way to go. Most day-to-day JavaScript code
          uses arrays, and that is perfectly fine. Linked lists are more about
          understanding the fundamentals and performing well in interviews.
        </p>
      </div>

      {/* ───────────── 16. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="Draw it out">
          <p>
            Linked list problems are visual. Always draw the nodes and arrows
            on paper or a whiteboard before writing code. Trace through your
            pointer manipulations step by step. Most bugs in linked list code
            come from losing a reference or wiring pointers in the wrong
            order.
          </p>
        </Callout>

        <Callout type="interview" title="Handle edge cases first">
          <p>
            Before writing the main logic, handle: empty list, single-node
            list, and out-of-bounds indexes. Interviewers watch for this.
            Starting your method with <code>if (!this.head)</code> or bounds
            checks shows disciplined thinking.
          </p>
        </Callout>

        <Callout type="interview" title="Know the classic problems">
          <p>
            The most common linked list interview questions are: reverse a
            linked list, detect a cycle (Floyd's tortoise and hare), find the
            middle node, merge two sorted lists, and remove the nth node from
            the end. Master these five and you will be prepared for the
            majority of what comes up.
          </p>
        </Callout>

        <Callout type="interview" title="Talk about tradeoffs">
          <p>
            When an interviewer asks "why a linked list?", compare it to an
            array. Mention the O(1) insertion/deletion at the head, the O(n)
            access tradeoff, and when each structure is preferable. Showing
            you understand the tradeoffs — not just the implementation — is
            what separates good answers from great ones.
          </p>
        </Callout>

        <Callout type="warning" title="Do not forget to update length">
          <p>
            A very common bug in interview code is forgetting to increment or
            decrement the <code>length</code> property. Every method that
            adds or removes a node must update the count. Another common
            mistake is forgetting to handle the case where the list becomes
            empty — always check if you need to set head and tail to null.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            A singly linked list is a chain of nodes, each pointing to the
            next. The list tracks the head, tail, and length.
          </li>
          <li>
            There are no indexes and no random access — you must traverse
            from the head to reach any node.
          </li>
          <li>
            Insertion and removal at the beginning are O(1), which is the
            key advantage over arrays.
          </li>
          <li>
            Access and search are O(n), which is the key disadvantage
            compared to arrays.
          </li>
          <li>
            Build methods on top of each other: <code>set</code> uses{" "}
            <code>get</code>, <code>insert</code> uses <code>get</code> and{" "}
            <code>push</code>/<code>unshift</code>, <code>remove</code> uses{" "}
            <code>get</code> and <code>shift</code>/<code>pop</code>.
          </li>
          <li>
            Reversing in place is a top interview question — practice the
            three-pointer technique until it is second nature.
          </li>
          <li>
            Linked lists are the building blocks for stacks, queues, and
            many other data structures you will learn next.
          </li>
        </ul>
      </div>

      <TopicNav slug="singly-linked-lists" />
    </div>
  );
}
