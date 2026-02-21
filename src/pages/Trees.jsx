import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function Trees() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Trees &amp; Tree Traversal
      </p>

      <h1 className="topic-title">Trees &amp; Tree Traversal</h1>
      <p className="topic-subtitle">
        Trees are one of the most important data structures in computer science.
        Unlike arrays, linked lists, stacks, and queues, which are all linear
        (data is arranged in a sequence), trees are <strong>nonlinear</strong> —
        data is organized in a hierarchy of parent-child relationships. Once you
        understand trees, a huge number of real-world systems and interview
        problems suddenly make a lot more sense.
      </p>

      {/* ───────────── 1. What Is a Tree? ───────────── */}
      <div className="section">
        <h2>What Is a Tree?</h2>
        <p>
          A tree is a data structure that consists of <strong>nodes</strong>{" "}
          connected by <strong>edges</strong>, arranged in a parent-child
          relationship. There is one special node at the top called the{" "}
          <strong>root</strong> — it has no parent. Every other node has exactly
          one parent and can have zero or more children.
        </p>
        <p>Here is the terminology you need to know:</p>
        <ul>
          <li>
            <strong>Root</strong> — the top node of the tree. There is only one
            root, and it has no parent.
          </li>
          <li>
            <strong>Child</strong> — a node directly connected below another
            node.
          </li>
          <li>
            <strong>Parent</strong> — the node directly above a child. Every
            node except the root has exactly one parent.
          </li>
          <li>
            <strong>Siblings</strong> — nodes that share the same parent.
          </li>
          <li>
            <strong>Leaf</strong> — a node with no children. These are the
            "endpoints" of the tree.
          </li>
          <li>
            <strong>Edge</strong> — the connection between a parent and a child.
          </li>
        </ul>
        <p>
          One thing that surprises a lot of people: a singly linked list is
          technically a special case of a tree. Think about it — each node has
          one parent and at most one child. It is just a tree where every node
          has exactly one child (except the tail). Trees are the general
          concept; linked lists are a very constrained version of that concept.
        </p>

        <Callout type="info" title="Trees must not have cycles">
          <p>
            A tree has one strict rule: there are no cycles. You cannot follow
            edges from a node and end up back at the same node. If you can, it
            is not a tree — it is a graph. Also, every node must be reachable
            from the root. If a node is disconnected, the structure is a forest
            (multiple trees), not a single tree.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Where Trees Are Used ───────────── */}
      <div className="section">
        <h2>Where Trees Are Used</h2>
        <p>
          Trees are everywhere in the real world, and once you start looking for
          them, you will see them in places you never expected:
        </p>
        <ul>
          <li>
            <strong>The HTML DOM</strong> — every web page you have ever seen is
            a tree. The <code>&lt;html&gt;</code> element is the root, it has
            children like <code>&lt;head&gt;</code> and{" "}
            <code>&lt;body&gt;</code>, and those have their own children. When
            you call <code>document.getElementById()</code>, the browser is
            traversing a tree.
          </li>
          <li>
            <strong>File systems</strong> — your computer's folder structure is
            a tree. The root directory contains subdirectories, which contain
            more subdirectories and files.
          </li>
          <li>
            <strong>JSON</strong> — nested JSON objects form a tree structure.
            Parsing JSON means building and traversing a tree.
          </li>
          <li>
            <strong>Network routing</strong> — routers use tree-like structures
            to determine the best path for data packets.
          </li>
          <li>
            <strong>Abstract syntax trees (ASTs)</strong> — when you write code,
            the compiler or interpreter parses it into a tree structure before
            executing it. Tools like Babel, ESLint, and Prettier all work with
            ASTs.
          </li>
          <li>
            <strong>AI and decision trees</strong> — machine learning models
            like decision trees and random forests are literally trees that make
            decisions at each node based on data features.
          </li>
        </ul>
      </div>

      {/* ───────────── 3. Binary Search Trees ───────────── */}
      <div className="section">
        <h2>Binary Search Trees (BST)</h2>
        <p>
          A Binary Search Tree is a specific type of tree with two special
          properties that make it incredibly useful:
        </p>
        <ol>
          <li>
            Every node has <strong>at most two children</strong> — we call them
            the left child and the right child.
          </li>
          <li>
            The tree is <strong>ordered</strong>: every node to the{" "}
            <strong>left</strong> of a parent is{" "}
            <strong>always less</strong> than the parent, and every node to the{" "}
            <strong>right</strong> is{" "}
            <strong>always greater</strong> than the parent.
          </li>
        </ol>
        <p>
          This ordering property is what makes BSTs so powerful. It means that
          when you are looking for a value, you can make a decision at every
          node: should I go left or right? Each decision eliminates roughly half
          of the remaining nodes — just like binary search on a sorted array.
        </p>

        <Callout type="info" title="Binary tree vs. binary search tree">
          <p>
            A <strong>binary tree</strong> is any tree where each node has at
            most two children. A <strong>binary search tree</strong> is a
            binary tree that is also ordered (left is less, right is greater).
            All BSTs are binary trees, but not all binary trees are BSTs. The
            ordering is what gives BSTs their searching power.
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. Node & BST Classes ───────────── */}
      <div className="section">
        <h2>Building a BST: Node and Tree Classes</h2>
        <p>
          Just like we built linked lists from node objects, we build a BST from
          node objects. Each node stores a <code>value</code> and has two
          pointers: <code>left</code> and <code>right</code>, both initially
          set to <code>null</code>. The BST itself just keeps track of the{" "}
          <code>root</code>.
        </p>

        <CodeBlock
          title="Node and BST Class Setup"
          code={`class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
}`}
        />

        <p>
          Simple as that. A node knows its value and its two children. The tree
          knows its root. Everything else — insert, find, traverse — we build
          on top of this foundation.
        </p>
      </div>

      {/* ───────────── 5. Insert ───────────── */}
      <div className="section">
        <h2>Inserting into a BST</h2>
        <p>
          Inserting a value into a BST follows a straightforward process. Start
          at the root and compare the new value to the current node:
        </p>
        <ul>
          <li>
            If the new value is <strong>less</strong> than the current node, go{" "}
            <strong>left</strong>.
          </li>
          <li>
            If the new value is <strong>greater</strong>, go{" "}
            <strong>right</strong>.
          </li>
          <li>
            If there is no node in the direction you need to go, that is where
            the new node belongs.
          </li>
          <li>
            If the value already exists, we can choose to ignore duplicates (our
            approach here) or handle them however we like.
          </li>
        </ul>
        <p>
          Here is the iterative approach. You can also write this recursively —
          the logic is the same, but the iterative version avoids potential
          call stack issues on very large trees.
        </p>

        <CodeBlock
          title="BST Insert (Iterative)"
          code={`class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    // If the tree is empty, the new node becomes the root
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      // Ignore duplicates
      if (value === current.value) return this;

      if (value < current.value) {
        // Go left
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        // Go right
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
}

// Usage:
const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

//       10
//      /  \\
//     6    15
//    / \\     \\
//   3   8    20`}
        />

        <p>
          At each step, we are making one comparison and moving one level deeper
          into the tree. The number of levels we traverse is the height of the
          tree. For a balanced tree, the height is roughly log(n), which is why
          insert runs in O(log n) on average.
        </p>
      </div>

      {/* ───────────── 6. Find / Contains ───────────── */}
      <div className="section">
        <h2>Finding a Value (Contains)</h2>
        <p>
          Searching for a value in a BST uses the exact same logic as insert.
          Start at the root, compare, and go left or right. The only difference
          is that instead of placing a new node, you return{" "}
          <code>true</code> if you find the value or <code>false</code> if you
          reach a dead end (<code>null</code>).
        </p>

        <CodeBlock
          title="BST Find / Contains"
          code={`class BinarySearchTree {
  // ... constructor and insert from above

  contains(value) {
    if (!this.root) return false;

    let current = this.root;

    while (current) {
      if (value === current.value) {
        return true;   // Found it!
      } else if (value < current.value) {
        current = current.left;   // Go left
      } else {
        current = current.right;  // Go right
      }
    }

    return false;  // Reached null — value is not in the tree
  }
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);

tree.contains(8);   // true
tree.contains(15);  // true
tree.contains(99);  // false`}
        />

        <p>
          Notice how clean this is. At every node, you make one comparison and
          eliminate an entire subtree. You never have to look at every node the
          way you would with a linear search through an array. This is the power
          of the BST's ordering property.
        </p>
      </div>

      {/* ───────────── 7. Big O of BST ───────────── */}
      <div className="section">
        <h2>Big O of Binary Search Trees</h2>

        <ComplexityTable
          headers={["Operation", "Average Case", "Worst Case"]}
          rows={[
            ["Insert", "O(log n)", "O(n)"],
            ["Search", "O(log n)", "O(n)"],
          ]}
        />

        <p>
          On average, both insert and search are <strong>O(log n)</strong>{" "}
          because at each step you are cutting the search space roughly in half.
          If the tree is reasonably balanced, you traverse about log(n) levels
          to reach any node.
        </p>
        <p>
          But here is the catch — and this is a big one. The worst case is{" "}
          <strong>O(n)</strong>. How? Imagine you insert values in sorted order:
          1, 2, 3, 4, 5. Each value is greater than the last, so every node
          ends up as a right child. The tree degenerates into what is
          essentially a linked list:
        </p>

        <CodeBlock
          title="A Completely One-Sided BST"
          code={`// Inserting 1, 2, 3, 4, 5 in order:
//
//   1
//    \\
//     2
//      \\
//       3
//        \\
//         4
//          \\
//           5
//
// This is basically a linked list!
// Searching for 5 requires visiting every single node.
// Time complexity: O(n), not O(log n).`}
        />

        <Callout type="warning" title="This is why balanced trees exist">
          <p>
            The worst-case O(n) scenario is not just a theoretical concern — it
            happens any time data arrives in a sorted or nearly sorted order,
            which is surprisingly common in practice. This is exactly why
            self-balancing trees like <strong>AVL trees</strong> and{" "}
            <strong>Red-Black trees</strong> were invented. They automatically
            restructure themselves after insertions and deletions to ensure the
            tree stays balanced, guaranteeing O(log n) operations even in the
            worst case. You do not typically need to implement these in
            interviews, but understanding why they exist shows depth.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. Tree Traversal Intro ───────────── */}
      <div className="section">
        <h2>Tree Traversal</h2>
        <p>
          Now we know how to insert and find a single value. But what if you
          want to visit <strong>every node</strong> in the tree? Maybe you need
          to print all values, calculate a sum, or convert the tree to an array.
          That is the problem of <strong>tree traversal</strong>.
        </p>
        <p>
          Unlike a linked list or array where there is one obvious way to
          iterate (start to finish), a tree branches. There are multiple valid
          orders in which you can visit every node. These boil down to two main
          approaches:
        </p>
        <ul>
          <li>
            <strong>Breadth-First Search (BFS)</strong> — visit nodes level by
            level, going across before going down.
          </li>
          <li>
            <strong>Depth-First Search (DFS)</strong> — go as deep as possible
            down one branch before backtracking. There are three variants of
            DFS: PreOrder, InOrder, and PostOrder.
          </li>
        </ul>
        <p>
          Both approaches visit every node exactly once, so they are both O(n)
          in time complexity. The difference is the <strong>order</strong> in
          which nodes are visited and how much <strong>memory</strong> they use
          depending on the shape of the tree.
        </p>
      </div>

      {/* ───────────── 9. Breadth-First Search ───────────── */}
      <div className="section">
        <h2>Breadth-First Search (BFS)</h2>
        <p>
          BFS visits every node on the current level before moving to the next
          level. Think of it as reading a tree line by line, from top to bottom,
          left to right. The key data structure that makes this work is a{" "}
          <strong>queue</strong> — first in, first out.
        </p>
        <p>Here is the algorithm:</p>
        <ol>
          <li>Create a queue and a results array.</li>
          <li>Place the root node in the queue.</li>
          <li>
            While the queue is not empty:
            <ul>
              <li>Dequeue a node from the front of the queue.</li>
              <li>Add its value to the results array.</li>
              <li>
                If the node has a left child, add it to the queue. If it has a
                right child, add it to the queue.
              </li>
            </ul>
          </li>
          <li>Return the results array.</li>
        </ol>

        <CodeBlock
          title="Breadth-First Search"
          code={`class BinarySearchTree {
  // ... constructor, insert, contains from above

  bfs() {
    const data = [];
    const queue = [];

    if (!this.root) return data;

    queue.push(this.root);

    while (queue.length) {
      // Dequeue the first node
      const node = queue.shift();

      // Process it — add its value to results
      data.push(node.value);

      // Enqueue its children
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }
}

//       10
//      /  \\
//     6    15
//    / \\     \\
//   3   8    20

const tree = new BinarySearchTree();
[10, 6, 15, 3, 8, 20].forEach(v => tree.insert(v));

tree.bfs();  // [10, 6, 15, 3, 8, 20]
// Level 0: 10
// Level 1: 6, 15
// Level 2: 3, 8, 20`}
        />

        <p>
          The queue is doing all the heavy lifting. By processing nodes in the
          order they were added (FIFO), we naturally visit them level by level.
          When we dequeue a node and add its children, those children go to the
          back of the line — so all nodes on the current level get processed
          before any nodes on the next level.
        </p>

        <Callout type="tip" title="Queue efficiency note">
          <p>
            We are using <code>Array.shift()</code> as a queue here for
            simplicity, but remember that <code>shift()</code> is O(n) because
            it re-indexes the entire array. In production code or performance-
            critical interviews, you might mention that a proper linked-list-
            based queue would make the dequeue operation O(1). For interview
            purposes, using an array is usually fine — but mentioning the
            optimization shows awareness.
          </p>
        </Callout>
      </div>

      {/* ───────────── 10. Depth-First Search ───────────── */}
      <div className="section">
        <h2>Depth-First Search (DFS)</h2>
        <p>
          DFS goes as deep as possible down a branch before backtracking. It
          uses recursion (or an explicit stack) to keep track of where it has
          been. There are three variants, and the only difference between them
          is <strong>when you process the current node</strong> relative to
          visiting its children.
        </p>

        <h3>PreOrder Traversal</h3>
        <p>
          <strong>Visit the node first</strong>, then traverse the left subtree,
          then the right subtree. The root is always the first value in the
          result. PreOrder is useful when you want to "copy" or "serialize" a
          tree — because you can recreate the exact same tree structure by
          inserting the values in PreOrder sequence.
        </p>

        <CodeBlock
          title="DFS PreOrder"
          code={`class BinarySearchTree {
  // ... constructor, insert, contains, bfs from above

  dfsPreOrder() {
    const data = [];

    function traverse(node) {
      // Visit the node FIRST
      data.push(node.value);

      // Then go left
      if (node.left) traverse(node.left);

      // Then go right
      if (node.right) traverse(node.right);
    }

    if (this.root) traverse(this.root);
    return data;
  }
}

//       10
//      /  \\
//     6    15
//    / \\     \\
//   3   8    20

tree.dfsPreOrder();  // [10, 6, 3, 8, 15, 20]
// Visit 10 -> go left -> visit 6 -> go left -> visit 3
// -> backtrack -> go right -> visit 8 -> backtrack
// -> backtrack -> go right -> visit 15 -> go right -> visit 20`}
        />

        <h3>InOrder Traversal</h3>
        <p>
          Traverse the entire left subtree first, <strong>then visit the
          node</strong>, then traverse the right subtree. Here is the magic:
          when you do an InOrder traversal on a BST, you get all the values{" "}
          <strong>in sorted order</strong>. This is not a coincidence — it is a
          direct consequence of the BST property (left is less, right is
          greater).
        </p>

        <CodeBlock
          title="DFS InOrder"
          code={`class BinarySearchTree {
  // ... all methods from above

  dfsInOrder() {
    const data = [];

    function traverse(node) {
      // Go left FIRST
      if (node.left) traverse(node.left);

      // THEN visit the node
      data.push(node.value);

      // THEN go right
      if (node.right) traverse(node.right);
    }

    if (this.root) traverse(this.root);
    return data;
  }
}

//       10
//      /  \\
//     6    15
//    / \\     \\
//   3   8    20

tree.dfsInOrder();  // [3, 6, 8, 10, 15, 20]
// All values in sorted order!`}
        />

        <Callout type="tip" title="InOrder gives you sorted data for free">
          <p>
            This is one of those facts that comes up constantly in interviews.
            If someone gives you a BST and asks you to return the values in
            sorted order, the answer is simply: do an InOrder traversal. No
            sorting algorithm needed. The BST structure already encodes the
            sorted order — InOrder just reads it out.
          </p>
        </Callout>

        <h3>PostOrder Traversal</h3>
        <p>
          Traverse the entire left subtree first, then the entire right subtree,{" "}
          <strong>then visit the node last</strong>. The root is always the last
          value in the result. PostOrder is useful when you need to process
          children before their parent — for example, deleting a tree (you need
          to delete children before you can delete their parent) or evaluating
          a mathematical expression tree.
        </p>

        <CodeBlock
          title="DFS PostOrder"
          code={`class BinarySearchTree {
  // ... all methods from above

  dfsPostOrder() {
    const data = [];

    function traverse(node) {
      // Go left FIRST
      if (node.left) traverse(node.left);

      // THEN go right
      if (node.right) traverse(node.right);

      // Visit the node LAST
      data.push(node.value);
    }

    if (this.root) traverse(this.root);
    return data;
  }
}

//       10
//      /  \\
//     6    15
//    / \\     \\
//   3   8    20

tree.dfsPostOrder();  // [3, 8, 6, 20, 15, 10]
// Leaves first, root last`}
        />

        <h3>Quick Comparison of All Three DFS Variants</h3>

        <ComplexityTable
          headers={["Variant", "Order", "Root Position", "Use Case"]}
          rows={[
            ["PreOrder", "Node, Left, Right", "First", "Copying / serializing a tree"],
            ["InOrder", "Left, Node, Right", "Middle", "Getting sorted values from BST"],
            ["PostOrder", "Left, Right, Node", "Last", "Deleting a tree / expression eval"],
          ]}
        />
      </div>

      {/* ───────────── 11. BFS vs DFS ───────────── */}
      <div className="section">
        <h2>BFS vs. DFS: When to Use Which</h2>
        <p>
          Both BFS and DFS visit every node, so they are both O(n) in time. The
          real difference comes down to <strong>space complexity</strong> and{" "}
          <strong>the shape of the tree</strong>.
        </p>
        <ul>
          <li>
            <strong>BFS uses more memory on wide trees.</strong> The queue in
            BFS holds all nodes at the current level. In a wide, balanced tree,
            the bottom level can have up to n/2 nodes. That means the queue
            could hold roughly half the entire tree at once.
          </li>
          <li>
            <strong>DFS uses more memory on deep trees.</strong> DFS uses the
            call stack (or an explicit stack). The maximum depth of the stack
            equals the height of the tree. For a very deep, narrow tree (like
            one that looks like a linked list), the call stack could be as deep
            as n.
          </li>
        </ul>
        <p>In practical terms:</p>
        <ul>
          <li>
            If the tree is very <strong>wide and shallow</strong> (lots of nodes
            per level but not many levels), <strong>DFS</strong> is more
            space-efficient because the call stack stays short.
          </li>
          <li>
            If the tree is very <strong>deep and narrow</strong> (many levels but
            few nodes per level), <strong>BFS</strong> is more space-efficient
            because the queue stays small.
          </li>
          <li>
            If you need the data in <strong>sorted order</strong> from a BST,
            use <strong>DFS InOrder</strong> — nothing else gives you this.
          </li>
          <li>
            If you need to find the <strong>shortest path</strong> or work with
            nodes at a specific depth, use <strong>BFS</strong> — it processes
            level by level.
          </li>
          <li>
            If you need to <strong>serialize and reconstruct</strong> a tree,
            use <strong>DFS PreOrder</strong>.
          </li>
        </ul>

        <ComplexityTable
          headers={["Approach", "Time", "Space (Balanced)", "Space (Worst Case)"]}
          rows={[
            ["BFS", "O(n)", "O(n/2) = O(n)", "O(n)"],
            ["DFS", "O(n)", "O(log n)", "O(n)"],
          ]}
        />

        <Callout type="info" title="In practice, DFS is more common">
          <p>
            For most tree problems in interviews, DFS (especially InOrder and
            PreOrder) is the go-to approach. It is easy to implement recursively,
            uses less memory on balanced trees, and naturally handles subtree
            problems. BFS comes up when you explicitly need level-order
            traversal or shortest-path behavior. Know both, but expect to write
            DFS more often.
          </p>
        </Callout>
      </div>

      {/* ───────────── 12. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="Know the traversals cold">
          <p>
            You should be able to write BFS and all three DFS variants from
            memory without hesitation. In an interview, if someone asks "traverse
            this tree in order," you should not be fumbling with where to put the{" "}
            <code>push</code> call. The only difference between PreOrder,
            InOrder, and PostOrder is the position of one line of code — but
            getting it wrong changes the entire result.
          </p>
        </Callout>

        <Callout type="interview" title="Recognize tree problems in disguise">
          <p>
            Many interview problems are tree problems even when the word "tree"
            never appears. Nested structures (like nested comments, org charts,
            or file directories) are trees. Problems that ask you to "validate"
            or "check" a hierarchical structure often involve tree traversal.
            DOM manipulation? That is tree traversal. Anytime you see parent-
            child or hierarchical relationships, think trees.
          </p>
        </Callout>

        <Callout type="interview" title="Clarify: is it a BST or just a binary tree?">
          <p>
            This distinction matters enormously. If the tree is a BST, you can
            use the ordering property to search in O(log n) and get sorted data
            with InOrder. If it is just a binary tree with no ordering guarantee,
            you lose those advantages and must visit every node for search
            operations. Always ask the interviewer which one you are working
            with.
          </p>
        </Callout>

        <Callout type="interview" title="Recursive vs. iterative">
          <p>
            Most DFS solutions use recursion because it is cleaner and easier
            to reason about. But know that every recursive solution can be
            converted to an iterative one using an explicit stack. An
            interviewer might ask you to do this, or might ask about the
            trade-offs. Recursive: cleaner code, but risk of stack overflow on
            very deep trees. Iterative: more verbose, but you control the stack
            size.
          </p>
        </Callout>

        <Callout type="interview" title="State the Big O explicitly">
          <p>
            When discussing BSTs, always mention both the average and worst
            case. "Insert and search are O(log n) on average, but O(n) in the
            worst case if the tree is unbalanced." Then mention that balanced
            BSTs (AVL, Red-Black) guarantee O(log n). This shows you understand
            the full picture, not just the happy path.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            <strong>Trees</strong> are nonlinear data structures with nodes in
            parent-child relationships. They are everywhere: the DOM, file
            systems, JSON, ASTs, AI decision trees, and more.
          </li>
          <li>
            A <strong>Binary Search Tree</strong> keeps data ordered (left is
            less, right is greater), giving O(log n) average-case insert and
            search. But if the tree is unbalanced, worst case is O(n).
          </li>
          <li>
            <strong>Tree traversal</strong> means visiting every node. BFS goes
            level by level using a queue. DFS goes deep using recursion (or a
            stack) and comes in three variants.
          </li>
          <li>
            <strong>DFS PreOrder</strong> (node, left, right) is good for
            serializing a tree. <strong>DFS InOrder</strong> (left, node, right)
            gives sorted output from a BST. <strong>DFS PostOrder</strong>{" "}
            (left, right, node) is good for deleting.
          </li>
          <li>
            <strong>BFS</strong> uses more memory on wide trees.{" "}
            <strong>DFS</strong> uses more memory on deep trees. For most
            interview problems, DFS is the default.
          </li>
          <li>
            In interviews, know the traversals by heart, clarify whether you
            are working with a BST or a plain binary tree, and always state both
            the average and worst-case time complexities.
          </li>
        </ul>
      </div>

      <TopicNav slug="trees" />
    </div>
  );
}
