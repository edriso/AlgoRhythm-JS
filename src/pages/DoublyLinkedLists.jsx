import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function DoublyLinkedLists() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Doubly Linked Lists
      </p>

      <h1 className="topic-title">Doubly Linked Lists</h1>
      <p className="topic-subtitle">
        Almost identical to a singly linked list, but every node has a{" "}
        <strong>prev</strong> pointer in addition to <strong>next</strong>. You
        trade a bit of extra memory for a lot more flexibility — and some
        operations that were painful with a singly linked list become trivial.
      </p>

      {/* ───────────── 1. What is a Doubly Linked List? ───────────── */}
      <div className="section">
        <h2>What is a Doubly Linked List?</h2>
        <p>
          A doubly linked list (DLL) is a sequential data structure made up of
          nodes, just like a singly linked list. The difference is simple but
          powerful: each node stores a pointer to the <strong>previous</strong>{" "}
          node as well as the <strong>next</strong> node. The list itself keeps
          track of both a <strong>head</strong> (the first node) and a{" "}
          <strong>tail</strong> (the last node).
        </p>
        <p>
          This two-way linking means you can traverse the list in both
          directions — from head to tail <em>and</em> from tail to head. That
          sounds like a small change, but it has a huge impact on certain
          operations. For example, removing the last element from a singly
          linked list requires traversing the entire list to find the
          second-to-last node. With a DLL, you just look at{" "}
          <code>tail.prev</code>. Done.
        </p>
        <p>
          The tradeoff? Every node needs an extra pointer, so a DLL uses more
          memory than an SLL. For most practical purposes this is negligible, but
          it is worth knowing.
        </p>

        <Callout type="info" title="Where you have already seen DLLs">
          <p>
            Your browser's back and forward buttons? That is a doubly linked
            list. Each page in your history points to the previous page and the
            next page. The undo/redo stack in your text editor works the same
            way.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Node and Class Setup ───────────── */}
      <div className="section">
        <h2>Node Class and DoublyLinkedList Class</h2>
        <p>
          Just like with singly linked lists, we start by defining a{" "}
          <strong>Node</strong> class and a <strong>DoublyLinkedList</strong>{" "}
          class. The node now has three properties: <code>value</code>,{" "}
          <code>next</code>, and <code>prev</code>. The list tracks{" "}
          <code>head</code>, <code>tail</code>, and <code>length</code>.
        </p>

        <CodeBlock
          title="Node and DoublyLinkedList skeleton"
          code={`class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}`}
        />

        <p>
          Nothing surprising here. The only addition compared to an SLL node is{" "}
          <code>this.prev = null</code>. Let's build out the methods one by one.
        </p>
      </div>

      {/* ───────────── 3. Push ───────────── */}
      <div className="section">
        <h2>Push — Add to the End</h2>
        <p>
          Pushing adds a new node to the <strong>tail</strong> of the list. If
          the list is empty, the new node becomes both the head and the tail.
          Otherwise, we wire the old tail and the new node together and update
          the tail pointer.
        </p>

        <CodeBlock
          title="push(val)"
          code={`push(val) {
  const newNode = new Node(val);

  if (!this.head) {
    // Empty list: new node is both head and tail
    this.head = newNode;
    this.tail = newNode;
  } else {
    // Wire old tail → new node
    this.tail.next = newNode;
    newNode.prev = this.tail;
    // Update tail
    this.tail = newNode;
  }

  this.length++;
  return this;
}`}
        />

        <p>
          Notice that we set <code>newNode.prev</code> to the old tail. This is
          the key difference from SLL push — we now have a two-way connection
          between the last two nodes.
        </p>
      </div>

      {/* ───────────── 4. Pop ───────────── */}
      <div className="section">
        <h2>Pop — Remove from the End</h2>
        <p>
          This is where the DLL really shines compared to the SLL. Remember how
          removing the last node from a singly linked list required traversing
          the <em>entire</em> list to find the second-to-last node? With a DLL,
          we just look at <code>this.tail.prev</code>. No traversal needed.
        </p>

        <CodeBlock
          title="pop()"
          code={`pop() {
  if (!this.tail) return undefined;

  const removed = this.tail;

  if (this.length === 1) {
    // Only one node: list becomes empty
    this.head = null;
    this.tail = null;
  } else {
    // Move tail back one node
    this.tail = removed.prev;
    this.tail.next = null;
    // Sever the removed node's connection
    removed.prev = null;
  }

  this.length--;
  return removed;
}`}
        />

        <Callout type="tip" title="Severing connections">
          <p>
            Always remember to set <code>removed.prev = null</code> (and{" "}
            <code>removed.next = null</code> when applicable). If you leave
            stale pointers on removed nodes, you can accidentally prevent
            garbage collection or create confusing bugs when inspecting the
            node later.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. Shift ───────────── */}
      <div className="section">
        <h2>Shift — Remove from the Beginning</h2>
        <p>
          Shift removes the head node. We store a reference to the old head,
          update the head to be the old head's next node, and clean up the
          pointers.
        </p>

        <CodeBlock
          title="shift()"
          code={`shift() {
  if (!this.head) return undefined;

  const removed = this.head;

  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = removed.next;
    this.head.prev = null;
    removed.next = null;
  }

  this.length--;
  return removed;
}`}
        />

        <p>
          Three key steps when the list has more than one node: (1) move the
          head forward, (2) set the new head's <code>prev</code> to{" "}
          <code>null</code>, and (3) sever the old head's <code>next</code>{" "}
          pointer. Clean and constant time.
        </p>
      </div>

      {/* ───────────── 6. Unshift ───────────── */}
      <div className="section">
        <h2>Unshift — Add to the Beginning</h2>
        <p>
          Unshift adds a new node to the front of the list. If the list is
          empty, the new node becomes both head and tail (just like push).
          Otherwise, we wire the new node and the current head together, then
          update the head pointer.
        </p>

        <CodeBlock
          title="unshift(val)"
          code={`unshift(val) {
  const newNode = new Node(val);

  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  this.length++;
  return this;
}`}
        />
      </div>

      {/* ───────────── 7. Get ───────────── */}
      <div className="section">
        <h2>Get — Access by Index</h2>
        <p>
          Here is the <strong>best optimization</strong> a DLL gives you over an
          SLL. Since we can traverse in both directions, we check whether the
          requested index is in the first half or the second half of the list.
          If it is in the first half, we start from the head and walk forward.
          If it is in the second half, we start from the tail and walk backward.
          This effectively cuts our worst-case traversal in half.
        </p>

        <CodeBlock
          title="get(index)"
          code={`get(index) {
  if (index < 0 || index >= this.length) return null;

  let current;

  if (index <= this.length / 2) {
    // Start from the head
    current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
  } else {
    // Start from the tail
    current = this.tail;
    for (let i = this.length - 1; i > index; i--) {
      current = current.prev;
    }
  }

  return current;
}`}
        />

        <Callout type="info" title="O(n) but practically O(n/2)">
          <p>
            Technically this is still O(n) — we drop the constant factor of
            1/2 in Big O notation. But in practice, this optimization can make
            a real difference. If your list has 10,000 nodes and you want node
            9,999, a singly linked list walks 9,999 steps forward. A DLL walks
            just 1 step backward from the tail.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. Set ───────────── */}
      <div className="section">
        <h2>Set — Update a Value by Index</h2>
        <p>
          Set is straightforward: use <code>get</code> to find the node at the
          given index, then update its value. We get the DLL optimization from{" "}
          <code>get</code> for free.
        </p>

        <CodeBlock
          title="set(index, val)"
          code={`set(index, val) {
  const node = this.get(index);
  if (node) {
    node.val = val;
    return true;
  }
  return false;
}`}
        />
      </div>

      {/* ───────────── 9. Insert ───────────── */}
      <div className="section">
        <h2>Insert — Add at a Position</h2>
        <p>
          To insert a new node at a specific index, we handle edge cases first
          (insert at the beginning or end), then use <code>get</code> to find
          the node currently <em>before</em> our target position. Once we have
          that node, we rewire the <code>prev</code> and <code>next</code>{" "}
          pointers to splice the new node in.
        </p>

        <CodeBlock
          title="insert(index, val)"
          code={`insert(index, val) {
  if (index < 0 || index > this.length) return false;
  if (index === 0) return !!this.unshift(val);
  if (index === this.length) return !!this.push(val);

  const newNode = new Node(val);
  const beforeNode = this.get(index - 1);
  const afterNode = beforeNode.next;

  // Wire new node in between beforeNode and afterNode
  beforeNode.next = newNode;
  newNode.prev = beforeNode;
  newNode.next = afterNode;
  afterNode.prev = newNode;

  this.length++;
  return true;
}`}
        />

        <Callout type="tip" title="The double-bang trick">
          <p>
            We use <code>!!this.unshift(val)</code> and{" "}
            <code>!!this.push(val)</code> to coerce the return value into a
            boolean. Both <code>unshift</code> and <code>push</code> return{" "}
            <code>this</code> (the list), but our <code>insert</code> method
            should return <code>true</code> or <code>false</code>. The double
            negation converts any truthy value to <code>true</code>.
          </p>
        </Callout>
      </div>

      {/* ───────────── 10. Remove ───────────── */}
      <div className="section">
        <h2>Remove — Remove at a Position</h2>
        <p>
          To remove a node at a specific index, handle the edge cases (first or
          last node), then use <code>get</code> to find the target node
          directly. Once we have it, we rewire its neighbors to point to each
          other, bypassing the removed node entirely.
        </p>

        <CodeBlock
          title="remove(index)"
          code={`remove(index) {
  if (index < 0 || index >= this.length) return undefined;
  if (index === 0) return this.shift();
  if (index === this.length - 1) return this.pop();

  const removed = this.get(index);

  // Rewire neighbors to skip over the removed node
  removed.prev.next = removed.next;
  removed.next.prev = removed.prev;

  // Sever removed node's connections
  removed.next = null;
  removed.prev = null;

  this.length--;
  return removed;
}`}
        />

        <p>
          This is one of the most elegant parts of a DLL. Because every node
          knows its neighbors in both directions, removal is just four pointer
          updates. Compare that to an SLL, where you need to traverse from the
          head to find the node <em>before</em> the one you want to remove.
        </p>
      </div>

      {/* ───────────── 11. Full Class ───────────── */}
      <div className="section">
        <h2>Complete Implementation</h2>
        <p>
          Here is the full <code>DoublyLinkedList</code> class with all methods
          in one place.
        </p>

        <CodeBlock
          title="DoublyLinkedList — Full Class"
          code={`class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
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
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.tail) return undefined;
    const removed = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removed.prev;
      this.tail.next = null;
      removed.prev = null;
    }
    this.length--;
    return removed;
  }

  shift() {
    if (!this.head) return undefined;
    const removed = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removed.next;
      this.head.prev = null;
      removed.next = null;
    }
    this.length--;
    return removed;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current;
    if (index <= this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev;
      }
    }
    return current;
  }

  set(index, val) {
    const node = this.get(index);
    if (node) {
      node.val = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const newNode = new Node(val);
    const beforeNode = this.get(index - 1);
    const afterNode = beforeNode.next;
    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const removed = this.get(index);
    removed.prev.next = removed.next;
    removed.next.prev = removed.prev;
    removed.next = null;
    removed.prev = null;
    this.length--;
    return removed;
  }
}`}
        />
      </div>

      {/* ───────────── 12. Big O ───────────── */}
      <div className="section">
        <h2>Big O of Doubly Linked Lists</h2>
        <p>
          Here is how DLL operations stack up. The key thing to notice is that
          both insertion and removal at the head or tail are O(1) — no traversal
          required in either direction.
        </p>

        <ComplexityTable
          headers={["Operation", "Time Complexity", "Notes"]}
          rows={[
            ["Insertion", "O(1)", "At head or tail — no traversal needed"],
            ["Removal", "O(1)", "At head or tail — prev pointer makes tail removal instant"],
            ["Searching", "O(n)", "Technically O(n/2) since we can start from either end"],
            ["Access", "O(n)", "Same optimization as searching — still linear though"],
          ]}
        />

        <Callout type="info" title="O(n/2) is still O(n)">
          <p>
            When we say searching is "technically O(n/2)", remember that in Big
            O notation we drop constant factors. So O(n/2) simplifies to O(n).
            But in practice, cutting your traversal time in half is a real win
            — especially for large lists.
          </p>
        </Callout>
      </div>

      {/* ───────────── 13. DLL vs SLL ───────────── */}
      <div className="section">
        <h2>Doubly Linked Lists vs. Singly Linked Lists</h2>
        <p>
          So when should you pick a DLL over an SLL? Here is the honest
          breakdown.
        </p>

        <h3>DLLs Win When...</h3>
        <ul>
          <li>
            <strong>You need to remove from the tail frequently.</strong> This
            is O(1) in a DLL but O(n) in an SLL because you have to find the
            second-to-last node.
          </li>
          <li>
            <strong>You need backward traversal.</strong> Browser history
            (back/forward), undo/redo systems, and music playlist
            previous/next all need to move in both directions.
          </li>
          <li>
            <strong>You have a reference to a node and need to delete it.</strong>{" "}
            With a DLL, you can remove any node in O(1) if you already have a
            reference to it, because you can access both neighbors. With an SLL,
            you would need to traverse from the head to find the previous node.
          </li>
        </ul>

        <h3>SLLs Win When...</h3>
        <ul>
          <li>
            <strong>Memory is tight.</strong> Each DLL node stores an extra
            pointer. For millions of nodes, that adds up.
          </li>
          <li>
            <strong>You only traverse forward.</strong> If you never need to go
            backward, the extra <code>prev</code> pointer is wasted space.
          </li>
          <li>
            <strong>Simplicity matters.</strong> SLLs have fewer pointers to
            manage, which means fewer chances for bugs.
          </li>
        </ul>

        <h3>Real-World DLL Use Cases</h3>
        <ul>
          <li>
            <strong>Browser history</strong> — navigate forward and back through
            visited pages
          </li>
          <li>
            <strong>Undo/redo</strong> — text editors, design tools, and IDEs
            use DLLs to step through action history in both directions
          </li>
          <li>
            <strong>Music playlists</strong> — skip to the next track or go
            back to the previous one
          </li>
          <li>
            <strong>LRU Cache</strong> — one of the most common interview
            questions! An LRU cache uses a DLL combined with a hash map for O(1)
            reads and writes
          </li>
          <li>
            <strong>OS task scheduling</strong> — operating systems use DLLs to
            manage processes that need to be inserted and removed from the
            middle of a queue efficiently
          </li>
        </ul>

        <Callout type="warning" title="More pointers means more bugs">
          <p>
            Every DLL method involves managing both <code>next</code> and{" "}
            <code>prev</code> pointers. It is very easy to forget one and end up
            with a broken list. When implementing DLL methods, always ask
            yourself: "Did I update both directions?" Draw it out on paper if
            you need to.
          </p>
        </Callout>
      </div>

      {/* ───────────── 14. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="The LRU Cache question">
          <p>
            The most famous DLL interview question is "Design an LRU Cache"
            (LeetCode 146). The optimal solution uses a doubly linked list plus
            a hash map. The DLL maintains the order of access (most recently
            used at the head, least recently used at the tail), while the hash
            map provides O(1) lookup by key. If you can implement this from
            scratch, you are in great shape.
          </p>
        </Callout>

        <Callout type="interview" title="Know when to reach for a DLL">
          <p>
            If an interview problem requires frequent insertions and deletions
            at both ends of a collection, or if you need to efficiently remove
            a node when you already have a reference to it, a doubly linked
            list is likely the right choice. Mention this reasoning out loud to
            show the interviewer you understand the tradeoffs.
          </p>
        </Callout>

        <Callout type="interview" title="Draw it out">
          <p>
            DLL pointer manipulation is where most bugs happen. In a whiteboard
            interview, draw the nodes as boxes with arrows going both ways.
            Walk through each pointer update step by step. This slows you down
            just enough to avoid the classic mistake of severing a connection
            before you have saved a reference to the other side.
          </p>
        </Callout>

        <Callout type="tip" title="Edge cases to always check">
          <p>
            When implementing any DLL method, test these cases: (1) empty list,
            (2) list with one node, (3) operation at the head, (4) operation at
            the tail, (5) operation in the middle. If your code handles all
            five, it is almost certainly correct.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            A doubly linked list is like a singly linked list but each node has
            both <code>next</code> and <code>prev</code> pointers.
          </li>
          <li>
            The list tracks <code>head</code>, <code>tail</code>, and{" "}
            <code>length</code>.
          </li>
          <li>
            <strong>Push</strong> and <strong>unshift</strong> add nodes;{" "}
            <strong>pop</strong> and <strong>shift</strong> remove them — all in
            O(1).
          </li>
          <li>
            <strong>Get</strong> optimizes traversal by starting from whichever
            end is closer to the target index.
          </li>
          <li>
            <strong>Insert</strong> and <strong>remove</strong> use{" "}
            <code>get</code> to find the position, then rewire the surrounding
            pointers.
          </li>
          <li>
            DLLs use more memory than SLLs but excel at operations that need
            backward traversal or fast tail removal.
          </li>
          <li>
            The most important DLL interview question is the{" "}
            <strong>LRU Cache</strong> — practice it until you can write it from
            memory.
          </li>
        </ul>
      </div>

      <TopicNav slug="doubly-linked-lists" />
    </div>
  );
}
