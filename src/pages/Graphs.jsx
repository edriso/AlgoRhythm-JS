import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function Graphs() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Graphs, Graph Traversal &amp; Dijkstra's
        Algorithm
      </p>

      <h1 className="topic-title">
        Graphs, Graph Traversal &amp; Dijkstra's Algorithm
      </h1>
      <p className="topic-subtitle">
        Graphs are one of the most versatile and widely used data structures in
        all of computer science. Any time you have things that are connected to
        other things, you are looking at a graph. Social networks, maps, the
        internet, recommendation engines, file systems — all graphs under the
        hood. Understanding how to represent them, traverse them, and find
        shortest paths through them is essential for interviews and for building
        real-world systems.
      </p>

      {/* ───────────── 1. What Is a Graph? ───────────── */}
      <div className="section">
        <h2>What Is a Graph?</h2>
        <p>
          A graph is a data structure made up of <strong>nodes</strong> (also
          called <strong>vertices</strong>) and <strong>connections</strong>{" "}
          between those nodes (called <strong>edges</strong>). That is the entire
          definition. Nodes are the things, and edges are the relationships
          between those things.
        </p>
        <p>
          What makes graphs so powerful is their flexibility. Unlike trees, which
          enforce a strict parent-child hierarchy, graphs have no rules about how
          nodes connect. A node can connect to any number of other nodes, can
          connect back to itself, and there is no concept of a "root" node. This
          freedom is exactly why graphs can model so many real-world scenarios:
        </p>
        <ul>
          <li>
            <strong>Social networks:</strong> people are nodes, friendships are
            edges
          </li>
          <li>
            <strong>Maps and GPS:</strong> intersections are nodes, roads are
            edges
          </li>
          <li>
            <strong>Routing:</strong> routers are nodes, connections between them
            are edges
          </li>
          <li>
            <strong>Recommendations:</strong> products and users are nodes,
            purchases or ratings are edges
          </li>
          <li>
            <strong>File systems:</strong> directories and files are nodes,
            containment relationships are edges
          </li>
        </ul>

        <Callout type="info" title="Trees are graphs">
          <p>
            If you have already learned about trees, here is a useful insight: a
            tree is just a special type of graph. Specifically, a tree is a
            connected graph with no cycles. So everything you know about trees
            carries over, and graphs are the more general concept.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Types of Graphs ───────────── */}
      <div className="section">
        <h2>Types of Graphs</h2>
        <p>
          Not all graphs are the same. There are a few important distinctions you
          need to know:
        </p>

        <h3>Directed vs. Undirected</h3>
        <p>
          In an <strong>undirected graph</strong>, edges go both ways. If there
          is an edge between A and B, you can go from A to B and from B to A.
          Think of Facebook friendships — if you are friends with someone, they
          are also friends with you.
        </p>
        <p>
          In a <strong>directed graph</strong> (sometimes called a{" "}
          <strong>digraph</strong>), edges have a direction. An edge from A to B
          does not mean there is an edge from B to A. Think of Instagram
          followers — you can follow someone without them following you back.
        </p>

        <h3>Weighted vs. Unweighted</h3>
        <p>
          In an <strong>unweighted graph</strong>, all edges are equal. There is
          no cost or distance associated with moving along an edge. A social
          network graph is a good example — a friendship is a friendship, there
          is no "how much" of a friendship.
        </p>
        <p>
          In a <strong>weighted graph</strong>, each edge has a value (a weight)
          associated with it. Google Maps is the classic example — roads connect
          intersections, and each road has a distance or travel time. When you
          ask for the "shortest route," you are asking for the path with the
          lowest total weight.
        </p>

        <Callout type="tip" title="Most real-world graphs combine these">
          <p>
            Real-world graphs are often both directed and weighted. Think of
            airline routes — a flight from New York to Los Angeles might cost a
            different amount (or even not exist) compared to the reverse flight.
            Each combination of directed/undirected and weighted/unweighted gives
            you a different flavor of graph, and the algorithms you use may vary.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Representing Graphs ───────────── */}
      <div className="section">
        <h2>Representing Graphs in Code</h2>
        <p>
          Before you can do anything with a graph, you need a way to store it in
          memory. There are two main approaches: an adjacency matrix and an
          adjacency list. Both have trade-offs, and choosing the right one
          matters.
        </p>

        <h3>Adjacency Matrix</h3>
        <p>
          An adjacency matrix is a 2D array (a grid). The rows and columns
          represent nodes, and the value at <code>matrix[i][j]</code> tells you
          whether there is an edge from node i to node j. For an unweighted
          graph, a 1 means "connected" and a 0 means "not connected." For a
          weighted graph, you store the weight instead of 1.
        </p>

        <CodeBlock
          title="Adjacency Matrix Example"
          code={`//    A  B  C  D
// A [0, 1, 0, 1]
// B [1, 0, 1, 0]
// C [0, 1, 0, 1]
// D [1, 0, 1, 0]

// This represents an undirected graph:
// A -- B
// |    |
// D -- C

// To check if A connects to B: matrix[0][1] === 1  ✓
// To check if A connects to C: matrix[0][2] === 0  ✗`}
        />

        <h3>Adjacency List</h3>
        <p>
          An adjacency list stores, for each node, a list of the nodes it
          connects to. You can implement it as an array of arrays (if your nodes
          are numbered 0 through n-1) or as an object/Map where keys are node
          names and values are arrays of neighbors.
        </p>

        <CodeBlock
          title="Adjacency List Example"
          code={`// Same graph as above, but as an adjacency list:
const adjacencyList = {
  A: ["B", "D"],
  B: ["A", "C"],
  C: ["B", "D"],
  D: ["A", "C"],
};

// To check A's neighbors: adjacencyList["A"] → ["B", "D"]
// To check if A connects to B: adjacencyList["A"].includes("B")  ✓`}
        />

        <h3>Matrix vs. List — Which to Use?</h3>
        <ComplexityTable
          headers={["Operation", "Adjacency Matrix", "Adjacency List"]}
          rows={[
            ["Add vertex", "O(|V|^2)", "O(1)"],
            ["Add edge", "O(1)", "O(1)"],
            ["Remove vertex", "O(|V|^2)", "O(|V| + |E|)"],
            ["Remove edge", "O(1)", "O(|E|)"],
            ["Query (is edge?)", "O(1)", "O(|V|)"],
            ["Storage", "O(|V|^2)", "O(|V| + |E|)"],
          ]}
        />
        <p>
          The adjacency matrix uses <strong>O(|V|^2)</strong> space regardless
          of how many edges exist. That means if you have 10,000 nodes but only
          20,000 edges, you are still allocating a 10,000 x 10,000 grid — 100
          million cells. That is an enormous waste.
        </p>
        <p>
          The adjacency list only stores edges that actually exist, so it uses{" "}
          <strong>O(|V| + |E|)</strong> space. For sparse graphs (which most
          real-world graphs are), this is dramatically more efficient. It is also
          faster to iterate over all edges of a node, which is the most common
          operation in graph traversal algorithms.
        </p>

        <Callout type="info" title="Adjacency list wins for most use cases">
          <p>
            Unless you are working with a dense graph where most nodes are
            connected to most other nodes, the adjacency list is almost always
            the better choice. It uses less space, is faster for the operations
            you actually care about (traversing neighbors), and is easier to work
            with. We will use an adjacency list for all implementations in this
            chapter.
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. Graph Class ───────────── */}
      <div className="section">
        <h2>Building a Graph Class</h2>
        <p>
          Let's build an undirected, unweighted graph using an adjacency list.
          We will use a plain JavaScript object where each key is a vertex and
          each value is an array of that vertex's neighbors.
        </p>

        <CodeBlock
          title="Graph Class (Undirected, Unweighted)"
          code={`class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    // Only add if it does not already exist
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    // Undirected: add each vertex to the other's list
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (v) => v !== v2
    );
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(
      (v) => v !== v1
    );
  }

  removeVertex(vertex) {
    // Remove all edges to this vertex first
    while (this.adjacencyList[vertex].length) {
      const neighbor = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, neighbor);
    }
    // Then remove the vertex itself
    delete this.adjacencyList[vertex];
  }
}

// Usage:
const g = new Graph();
g.addVertex("Tokyo");
g.addVertex("Dallas");
g.addVertex("Aspen");
g.addVertex("Los Angeles");
g.addVertex("Hong Kong");

g.addEdge("Tokyo", "Dallas");
g.addEdge("Tokyo", "Hong Kong");
g.addEdge("Dallas", "Aspen");
g.addEdge("Dallas", "Hong Kong");
g.addEdge("Dallas", "Los Angeles");
g.addEdge("Hong Kong", "Los Angeles");

// g.adjacencyList:
// {
//   Tokyo: ["Dallas", "Hong Kong"],
//   Dallas: ["Tokyo", "Aspen", "Hong Kong", "Los Angeles"],
//   Aspen: ["Dallas"],
//   "Los Angeles": ["Dallas", "Hong Kong"],
//   "Hong Kong": ["Tokyo", "Dallas", "Los Angeles"]
// }`}
        />

        <p>
          Let's walk through each method:
        </p>
        <ul>
          <li>
            <strong>addVertex:</strong> creates a new key in the adjacency list
            with an empty array. The guard clause prevents overwriting an
            existing vertex's connections.
          </li>
          <li>
            <strong>addEdge:</strong> since the graph is undirected, we push
            each vertex into the other's neighbor array. Both sides get updated.
          </li>
          <li>
            <strong>removeEdge:</strong> filters out each vertex from the
            other's array. We update both sides to keep the graph consistent.
          </li>
          <li>
            <strong>removeVertex:</strong> this is the trickiest one. We cannot
            just delete the vertex — we also need to remove every edge that
            references it. We pop neighbors one by one and call removeEdge for
            each, then delete the vertex key entirely.
          </li>
        </ul>

        <Callout type="warning" title="No error handling shown">
          <p>
            For clarity, the code above does not check whether vertices exist
            before adding edges or whether the graph is in a valid state. In
            production code, you would want to add checks like{" "}
            <code>if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;</code>{" "}
            in addEdge and similar guards elsewhere. In an interview, mention
            that you are skipping validation for brevity.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. Graph Traversal ───────────── */}
      <div className="section">
        <h2>Graph Traversal — Why It Matters</h2>
        <p>
          Traversing a graph means visiting every vertex in the graph. Unlike
          trees, where there is a clear starting point (the root) and a natural
          order (top-down, left-to-right), graphs have no inherent starting
          point and no hierarchy. You pick a starting vertex and explore from
          there.
        </p>
        <p>
          Graph traversal is the foundation of countless real-world
          applications:
        </p>
        <ul>
          <li>
            <strong>Web crawlers:</strong> start at a page and follow links to
            discover the entire web
          </li>
          <li>
            <strong>Social networks:</strong> find friends of friends, suggest
            connections, detect communities
          </li>
          <li>
            <strong>GPS navigation:</strong> explore routes between locations
          </li>
          <li>
            <strong>AI / Game solving:</strong> explore possible game states or
            decision paths
          </li>
          <li>
            <strong>Maze solving:</strong> explore paths until you find the exit
          </li>
          <li>
            <strong>Recommendation engines:</strong> traverse connections to find
            related items
          </li>
        </ul>
        <p>
          There are two fundamental ways to traverse a graph:{" "}
          <strong>depth-first search (DFS)</strong> and{" "}
          <strong>breadth-first search (BFS)</strong>. They both visit every
          reachable vertex, but in very different orders — and that difference
          matters depending on what you are trying to accomplish.
        </p>
      </div>

      {/* ───────────── 6. Depth-First Search ───────────── */}
      <div className="section">
        <h2>Depth-First Search (DFS)</h2>
        <p>
          Depth-first search explores as far as possible down one path before
          backtracking. Think of it as walking through a maze: you pick a
          direction and keep going until you hit a dead end, then you backtrack
          to the last fork and try a different direction.
        </p>
        <p>
          The key idea is: when you visit a node, pick one of its unvisited
          neighbors and immediately go explore that neighbor (and its neighbors,
          and so on) before you come back and check the other neighbors. This
          "go deep first" behavior is where the name comes from.
        </p>
        <p>
          There is one critical detail unique to graphs (compared to trees):
          graphs can have <strong>cycles</strong>. If A connects to B and B
          connects back to A, a naive traversal would bounce back and forth
          forever. To prevent this, we use a <strong>visited</strong> set to keep
          track of which nodes we have already seen.
        </p>

        <h3>DFS — Recursive Version</h3>
        <p>
          The recursive approach is the most natural way to think about DFS.
          Visit a node, mark it as visited, then recursively visit each
          unvisited neighbor.
        </p>

        <CodeBlock
          title="DFS — Recursive"
          code={`class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  dfsRecursive(start) {
    const result = [];
    const visited = {};

    const dfs = (vertex) => {
      if (!vertex) return;
      visited[vertex] = true;
      result.push(vertex);

      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          dfs(neighbor);
        }
      });
    };

    dfs(start);
    return result;
  }
}

// Example graph:
//       A
//      / \\
//     B   C
//     |   |
//     D - E
//      \\
//       F

const g = new Graph();
["A", "B", "C", "D", "E", "F"].forEach((v) => g.addVertex(v));
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");

g.dfsRecursive("A");
// Possible output: ["A", "B", "D", "E", "C", "F"]
// (exact order depends on neighbor order in adjacency list)`}
        />

        <p>
          Let's trace through this. We start at A:
        </p>
        <ol>
          <li>
            Visit <strong>A</strong>, mark as visited. A's neighbors are [B, C].
          </li>
          <li>
            Visit <strong>B</strong> (first neighbor of A). B's neighbors are
            [A, D]. A is visited, so go to D.
          </li>
          <li>
            Visit <strong>D</strong>. D's neighbors are [B, E, F]. B is visited.
            Go to E.
          </li>
          <li>
            Visit <strong>E</strong>. E's neighbors are [C, D]. D is visited.
            Go to C.
          </li>
          <li>
            Visit <strong>C</strong>. C's neighbors are [A, E]. Both visited.
            Backtrack.
          </li>
          <li>
            Back in D's loop: B and E are visited, next is F. Visit{" "}
            <strong>F</strong>. F's neighbors are [D]. D is visited. Backtrack
            all the way out.
          </li>
        </ol>
        <p>
          Result: ["A", "B", "D", "E", "C", "F"]. Notice how we dove deep into
          A → B → D → E → C before coming back to visit F.
        </p>

        <h3>DFS — Iterative Version</h3>
        <p>
          The iterative version uses an explicit <strong>stack</strong> instead
          of the call stack. We push the starting vertex onto the stack, then
          repeatedly pop a vertex, mark it as visited, and push its unvisited
          neighbors onto the stack.
        </p>

        <CodeBlock
          title="DFS — Iterative"
          code={`dfsIterative(start) {
  const stack = [start];
  const result = [];
  const visited = {};
  visited[start] = true;

  while (stack.length) {
    const vertex = stack.pop();
    result.push(vertex);

    this.adjacencyList[vertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    });
  }

  return result;
}

g.dfsIterative("A");
// Possible output: ["A", "C", "E", "D", "F", "B"]
// (different order from recursive due to stack LIFO behavior)`}
        />

        <Callout type="info" title="Recursive vs. iterative DFS order">
          <p>
            You may notice the iterative version produces a different traversal
            order than the recursive one, even on the same graph. This is
            because the stack reverses the order in which neighbors are
            processed. Both are valid DFS traversals — they just explore
            neighbors in a different order. The important thing is that both go
            deep before going wide.
          </p>
        </Callout>
      </div>

      {/* ───────────── 7. Breadth-First Search ───────────── */}
      <div className="section">
        <h2>Breadth-First Search (BFS)</h2>
        <p>
          Breadth-first search takes the opposite approach from DFS. Instead of
          going as deep as possible, BFS visits all neighbors at the current
          depth level before moving on to the next level. It explores the graph
          in "rings" radiating outward from the starting vertex.
        </p>
        <p>
          The implementation is almost identical to iterative DFS, with one
          crucial difference: instead of a <strong>stack</strong> (LIFO), BFS
          uses a <strong>queue</strong> (FIFO). This single change completely
          transforms the traversal order.
        </p>

        <CodeBlock
          title="Breadth-First Search"
          code={`bfs(start) {
  const queue = [start];
  const result = [];
  const visited = {};
  visited[start] = true;

  while (queue.length) {
    const vertex = queue.shift();  // dequeue from front
    result.push(vertex);

    this.adjacencyList[vertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);  // enqueue at back
      }
    });
  }

  return result;
}

// Using the same graph:
//       A
//      / \\
//     B   C
//     |   |
//     D - E
//      \\
//       F

g.bfs("A");
// Output: ["A", "B", "C", "D", "E", "F"]
// Level 0: A
// Level 1: B, C  (A's direct neighbors)
// Level 2: D, E  (neighbors of B and C)
// Level 3: F     (neighbor of D)`}
        />

        <p>
          Notice the output: A first, then all of A's direct neighbors (B, C),
          then all vertices two steps away (D, E), then three steps away (F).
          BFS visits the graph level by level, like ripples spreading outward
          from a stone dropped in water.
        </p>

        <Callout type="tip" title="BFS finds shortest paths in unweighted graphs">
          <p>
            Because BFS explores nodes level by level, the first time it reaches
            any node is guaranteed to be via the shortest path (measured in
            number of edges). This makes BFS the go-to algorithm for
            finding shortest paths in unweighted graphs. DFS does not have this
            guarantee — it might find a path, but not necessarily the shortest
            one.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. DFS vs BFS ───────────── */}
      <div className="section">
        <h2>DFS vs. BFS — When to Use Which</h2>
        <p>
          Both DFS and BFS visit all reachable vertices, so if you just need to
          check "can I reach vertex X from vertex Y?" either one works. But
          their behavior is fundamentally different, and that makes each better
          suited for different tasks.
        </p>

        <ComplexityTable
          headers={["Property", "DFS", "BFS"]}
          rows={[
            ["Explores", "Deep first", "Wide first"],
            ["Data structure", "Stack (or call stack)", "Queue"],
            ["Finds shortest path?", "No", "Yes (unweighted)"],
            ["Good for", "Path existence, cycle detection, topological sort", "Shortest path, closest nodes, level-order"],
            ["Space (worst case)", "O(|V|)", "O(|V|)"],
            ["Time", "O(|V| + |E|)", "O(|V| + |E|)"],
          ]}
        />

        <p>
          Here is the intuition:
        </p>
        <ul>
          <li>
            <strong>Use DFS</strong> when you need to explore all possible paths,
            detect cycles, or when the solution is likely far from the starting
            point. DFS is also the natural choice for topological sorting and
            solving puzzles like Sudoku or mazes.
          </li>
          <li>
            <strong>Use BFS</strong> when you need the shortest path in an
            unweighted graph, or when you want to find all nodes within a
            certain distance. BFS is the right tool for "find the closest X"
            problems.
          </li>
        </ul>

        <Callout type="warning" title="DFS and the call stack">
          <p>
            Recursive DFS uses the JavaScript call stack, which has a limited
            size (typically a few thousand to tens of thousands of frames,
            depending on the environment). On a very deep graph, recursive DFS
            can cause a stack overflow. If you suspect the graph might be very
            deep, use the iterative version with an explicit stack instead.
          </p>
        </Callout>
      </div>

      {/* ───────────── 9. Dijkstra's Algorithm ───────────── */}
      <div className="section">
        <h2>Dijkstra's Algorithm</h2>
        <p>
          Everything we have done so far works on unweighted graphs — where
          every edge has the same "cost." But what if edges have different
          weights? What if the road from A to B is 5 miles but the road from A
          to C is 20 miles? In a weighted graph, the shortest path is not about
          the fewest edges — it is about the lowest total weight.
        </p>
        <p>
          This is where <strong>Dijkstra's algorithm</strong> comes in. Invented
          by Edsger Dijkstra in 1956, it finds the shortest path between a
          starting vertex and every other vertex in a weighted graph (as long as
          all weights are non-negative).
        </p>

        <Callout type="warning" title="Dijkstra does not work with negative weights">
          <p>
            Dijkstra's algorithm assumes all edge weights are non-negative. If
            your graph has negative weights, you need a different algorithm like{" "}
            <strong>Bellman-Ford</strong>. In interviews, always clarify whether
            weights can be negative — it changes which algorithm you should use.
          </p>
        </Callout>

        <h3>The Key Idea</h3>
        <p>
          Dijkstra's algorithm works by maintaining a running "best known
          distance" from the start vertex to every other vertex. Initially, the
          distance to the start is 0, and the distance to everything else is
          infinity. Then, repeatedly:
        </p>
        <ol>
          <li>
            Pick the unvisited vertex with the smallest known distance (this is
            where the priority queue comes in).
          </li>
          <li>
            For each neighbor of that vertex, calculate the distance to that
            neighbor going through the current vertex.
          </li>
          <li>
            If this new distance is shorter than the previously known distance,
            update it.
          </li>
          <li>Mark the current vertex as visited (we have found the shortest
            path to it).</li>
        </ol>
        <p>
          This "greedy" approach works because once we have visited a vertex, we
          know we have found the shortest path to it. The priority queue ensures
          we always process the closest unvisited vertex first.
        </p>

        <h3>Building a Weighted Graph</h3>
        <p>
          First, we need a graph class that supports weighted edges. The only
          difference from our earlier class is that instead of pushing just the
          neighbor name, we push an object with the neighbor and the weight.
        </p>

        <CodeBlock
          title="Weighted Graph Class"
          code={`class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }
}`}
        />

        <h3>A Simple Priority Queue</h3>
        <p>
          Dijkstra's algorithm needs a priority queue to efficiently pick the
          vertex with the smallest distance. Here is a simple implementation
          that sorts on every insertion. This is not the most efficient approach
          (O(n log n) per insert due to the sort), but it is clear and easy to
          understand. For optimal performance, you would use a binary heap-based
          priority queue, which gives O(log n) insert and extract-min.
        </p>

        <CodeBlock
          title="Simple Priority Queue"
          code={`class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

// Usage:
const pq = new PriorityQueue();
pq.enqueue("B", 5);
pq.enqueue("A", 1);
pq.enqueue("C", 3);
pq.dequeue();  // { val: "A", priority: 1 }  — smallest first`}
        />

        <Callout type="tip" title="Use a binary heap for better performance">
          <p>
            The naive sorted-array priority queue has O(n log n) insertion due
            to sorting. A binary heap-based priority queue gives you O(log n)
            insertion and O(log n) extraction, which significantly improves
            Dijkstra's performance on large graphs. If you have already built a
            min binary heap, you can plug it in here directly. In an interview,
            mention that you would use a heap-based priority queue for
            production, then use the simple version to keep the code readable.
          </p>
        </Callout>

        <h3>The Full Algorithm</h3>
        <p>
          Now let's put it all together. The Dijkstra method takes a start
          vertex and a finish vertex, and returns the shortest path between
          them.
        </p>

        <CodeBlock
          title="Dijkstra's Algorithm — Full Implementation"
          code={`class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  dijkstra(start, finish) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    const visited = {};

    // 1. Initialize distances: start = 0, everything else = Infinity
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        pq.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        pq.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // 2. Loop while there are vertices to process
    while (pq.values.length) {
      const current = pq.dequeue().val;

      // If we reached the finish, build and return the path
      if (current === finish) {
        const path = [];
        let temp = finish;
        while (temp) {
          path.push(temp);
          temp = previous[temp];
        }
        return path.reverse();
      }

      if (current && distances[current] !== Infinity) {
        // Skip if already visited
        if (visited[current]) continue;
        visited[current] = true;

        for (let neighbor of this.adjacencyList[current]) {
          // Calculate new distance to this neighbor
          const candidate = distances[current] + neighbor.weight;

          if (candidate < distances[neighbor.node]) {
            // Found a shorter path — update!
            distances[neighbor.node] = candidate;
            previous[neighbor.node] = current;
            pq.enqueue(neighbor.node, candidate);
          }
        }
      }
    }

    return []; // No path found
  }
}

// Example graph:
//         A
//       /   \\
//     2       4
//    /         \\
//   B           C
//    \\  1     / |
//   3  \\   /  2 |
//      D---     |
//       \\     4
//      1  \\   |
//        F --- E
//           1
//
const g = new WeightedGraph();
["A", "B", "C", "D", "E", "F"].forEach((v) => g.addVertex(v));
g.addEdge("A", "B", 2);
g.addEdge("A", "C", 4);
g.addEdge("B", "D", 3);
g.addEdge("C", "D", 1);
g.addEdge("C", "E", 4);
g.addEdge("D", "E", 2);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

g.dijkstra("A", "E");
// Returns: ["A", "B", "D", "F", "E"]
// Total distance: 2 + 3 + 1 + 1 = 7
// (Not A→C→E which would be 4 + 4 = 8)`}
        />

        <h3>Walking Through the Algorithm</h3>
        <p>
          Let's trace Dijkstra's on the graph above, finding the shortest path
          from A to E:
        </p>
        <ol>
          <li>
            <strong>Initialize:</strong> distances = {"{A: 0, B: Inf, C: Inf, D: Inf, E: Inf, F: Inf}"}. Previous = all null.
            Priority queue starts with A at priority 0.
          </li>
          <li>
            <strong>Process A</strong> (distance 0): Check neighbors B
            (0+2=2 &lt; Inf, update) and C (0+4=4 &lt; Inf, update).
            Distances: {"{A: 0, B: 2, C: 4, D: Inf, E: Inf, F: Inf}"}.
          </li>
          <li>
            <strong>Process B</strong> (distance 2): Check neighbor D
            (2+3=5 &lt; Inf, update).
            Distances: {"{A: 0, B: 2, C: 4, D: 5, E: Inf, F: Inf}"}.
          </li>
          <li>
            <strong>Process C</strong> (distance 4): Check neighbor D
            (4+1=5, not less than 5, skip) and E (4+4=8 &lt; Inf, update).
            Distances: {"{A: 0, B: 2, C: 4, D: 5, E: 8, F: Inf}"}.
          </li>
          <li>
            <strong>Process D</strong> (distance 5): Check neighbor E
            (5+2=7 &lt; 8, update!) and F (5+1=6 &lt; Inf, update).
            Distances: {"{A: 0, B: 2, C: 4, D: 5, E: 7, F: 6}"}.
          </li>
          <li>
            <strong>Process F</strong> (distance 6): Check neighbor E
            (6+1=7, not less than 7, skip).
          </li>
          <li>
            <strong>Process E</strong> (distance 7): This is the finish vertex!
            Build the path by following previous pointers: E ← F ← D ← B ← A.
            Reverse it: <strong>["A", "B", "D", "F", "E"]</strong> with total
            weight 7.
          </li>
        </ol>

        <h3>Big O of Dijkstra's Algorithm</h3>
        <p>
          The time complexity of Dijkstra's depends heavily on the priority
          queue implementation:
        </p>

        <ComplexityTable
          headers={["Priority Queue", "Time Complexity"]}
          rows={[
            ["Naive array (sort each time)", "O(|V|^2)"],
            ["Binary heap", "O((|V| + |E|) log |V|)"],
            ["Fibonacci heap", "O(|V| log |V| + |E|)"],
          ]}
        />

        <p>
          With our simple sorted-array priority queue, the time is O(|V|^2)
          because we sort the queue on every insertion. Using a binary heap
          brings it down to O((|V| + |E|) log |V|), which is a significant
          improvement for sparse graphs. The Fibonacci heap gives the
          theoretically optimal bound but is rarely used in practice due to its
          complexity.
        </p>
      </div>

      {/* ───────────── 10. Where Dijkstra Is Used ───────────── */}
      <div className="section">
        <h2>Where Dijkstra's Is Used in the Real World</h2>
        <p>
          Dijkstra's algorithm is not just an academic exercise — it powers some
          of the most important systems you use every day:
        </p>
        <ul>
          <li>
            <strong>GPS and navigation:</strong> Google Maps, Apple Maps, and
            Waze all use variants of Dijkstra's algorithm (combined with other
            heuristics like A*) to find the fastest route between two locations.
          </li>
          <li>
            <strong>Network routing:</strong> protocols like OSPF (Open Shortest
            Path First) use Dijkstra's algorithm to determine the best path for
            data packets to travel across the internet.
          </li>
          <li>
            <strong>Epidemiology:</strong> modeling how diseases spread through
            populations and finding the most likely transmission paths.
          </li>
          <li>
            <strong>Biology:</strong> finding the most likely evolutionary
            relationships between species, modeling metabolic pathways, and
            protein interaction networks.
          </li>
          <li>
            <strong>Telecommunications:</strong> routing phone calls and data
            through networks with varying bandwidth and latency.
          </li>
        </ul>
      </div>

      {/* ───────────── 11. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="Know when to use BFS vs. DFS vs. Dijkstra">
          <p>
            This is one of the most common points of confusion. Here is the
            simple rule: use <strong>BFS</strong> for shortest path in an{" "}
            <strong>unweighted</strong> graph, use <strong>Dijkstra's</strong>{" "}
            for shortest path in a <strong>weighted</strong> graph (with
            non-negative weights), and use <strong>DFS</strong> when you need to
            explore all paths or detect cycles. State this explicitly to the
            interviewer to show you understand the distinctions.
          </p>
        </Callout>

        <Callout type="interview" title="Graphs are often hidden in the problem">
          <p>
            Many interview problems are graph problems in disguise. Any time you
            see words like "connected," "network," "path," "neighbors," "linked,"
            or "reachable," think graphs. Word ladder, number of islands, course
            schedule, cheapest flights — these are all graph problems, even
            though the word "graph" might never appear in the problem statement.
          </p>
        </Callout>

        <Callout type="interview" title="Always clarify the graph properties">
          <p>
            Before solving a graph problem, ask the interviewer: Is the graph
            directed or undirected? Weighted or unweighted? Can it have cycles?
            Can there be multiple edges between the same two nodes? Can weights
            be negative? These questions narrow down which algorithms apply and
            show that you think carefully about edge cases.
          </p>
        </Callout>

        <Callout type="interview" title="Practice building graphs from scratch">
          <p>
            In many interview problems, the graph is not given to you as an
            adjacency list. You might receive a list of edges, a grid (2D
            array), or a set of rules. A huge part of solving graph problems is
            knowing how to <em>construct</em> the graph from the input. Practice
            converting different input formats into adjacency lists — it is a
            skill that comes up constantly.
          </p>
        </Callout>

        <Callout type="interview" title="Mention the visited set immediately">
          <p>
            Forgetting to track visited nodes is one of the most common mistakes
            in graph traversal. It leads to infinite loops in graphs with cycles.
            When you start writing a graph traversal, the very first thing you
            should say is: "I will use a visited set to avoid processing the same
            node twice." This shows the interviewer you understand the difference
            between tree traversal and graph traversal.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            A <strong>graph</strong> is a collection of nodes (vertices)
            connected by edges. Graphs can be directed or undirected, weighted
            or unweighted.
          </li>
          <li>
            An <strong>adjacency list</strong> is the preferred representation
            for most graphs — it uses O(|V| + |E|) space and is efficient for
            sparse graphs.
          </li>
          <li>
            <strong>DFS</strong> explores as deep as possible before
            backtracking. It uses a stack (or recursion) and runs in O(|V| +
            |E|) time. Use it for path existence, cycle detection, and
            topological sorting.
          </li>
          <li>
            <strong>BFS</strong> explores level by level using a queue. It also
            runs in O(|V| + |E|) time. Use it for finding the shortest path in
            unweighted graphs.
          </li>
          <li>
            <strong>Dijkstra's algorithm</strong> finds the shortest path in
            weighted graphs with non-negative edge weights. It uses a priority
            queue and runs in O((|V| + |E|) log |V|) with a binary heap.
          </li>
          <li>
            Always use a <strong>visited</strong> set in graph traversals to
            prevent infinite loops from cycles.
          </li>
          <li>
            Many interview problems are graph problems in disguise. Look for
            keywords like "connected," "path," "neighbors," and "reachable."
          </li>
        </ul>
      </div>

      <TopicNav slug="graphs" />
    </div>
  );
}
