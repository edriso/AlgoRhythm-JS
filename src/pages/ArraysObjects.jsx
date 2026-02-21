import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function ArraysObjects() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Big O of Arrays &amp; Objects
      </p>

      <h1 className="topic-title">Big O of Arrays &amp; Objects</h1>
      <p className="topic-subtitle">
        Before you can analyze the algorithms you write, you need to understand
        the performance characteristics of the data structures you are using
        every day. Objects and arrays are the two workhorses of JavaScript — and
        each one comes with its own Big O tradeoffs that will show up in
        interviews again and again.
      </p>

      {/* ───────────── 1. Objects ───────────── */}
      <div className="section">
        <h2>Objects — Unordered Key-Value Stores</h2>
        <p>
          A JavaScript object is an <strong>unordered</strong> collection of
          key-value pairs. Think of it like a dictionary: you look things up by
          their key (the word) and instantly get back the value (the definition).
          There is no concept of "first" or "last" — the keys have no guaranteed
          order.
        </p>

        <h3>When to Use Objects</h3>
        <ul>
          <li>
            When you <strong>do not need ordering</strong>. If the order of your
            data does not matter, objects are a great choice.
          </li>
          <li>
            When you need <strong>fast access, insertion, and removal</strong>.
            All three are O(1) — constant time, regardless of how many keys the
            object has.
          </li>
          <li>
            When you want to <strong>look up values by a known key</strong>,
            like mapping usernames to user data, or counting character
            frequencies in a string.
          </li>
        </ul>

        <CodeBlock
          title="Basic object operations"
          code={`const user = {
  name: "Alice",
  age: 30,
  role: "engineer"
};

// Access — O(1)
user.name;           // "Alice"

// Insertion — O(1)
user.email = "alice@example.com";

// Removal — O(1)
delete user.age;

// Searching (by value) — O(n)
// There is no shortcut: you must check every value
Object.values(user).includes("engineer");  // true`}
        />

        <h3>Big O of Object Operations</h3>

        <ComplexityTable
          headers={["Operation", "Time Complexity"]}
          rows={[
            ["Access (obj.key)", "O(1)"],
            ["Insertion (obj.key = val)", "O(1)"],
            ["Removal (delete obj.key)", "O(1)"],
            ["Searching (by value)", "O(n)"],
          ]}
        />

        <p>
          Notice the key distinction: <strong>access</strong> and{" "}
          <strong>search</strong> are different things. Access means you already
          know the key and you want its value — that is O(1). Searching means
          you have a value and you want to find out if it exists somewhere in the
          object — that requires checking every key-value pair, so it is O(n).
        </p>

        <Callout type="info" title="Access vs. search">
          <p>
            This distinction comes up constantly in interviews. When someone
            says "looking up a value in an object is O(1)," they mean looking up
            by <strong>key</strong>. If you need to check whether a particular{" "}
            <em>value</em> exists, you have to scan all values — that is O(n).
          </p>
        </Callout>

        <h3>Big O of Object Methods</h3>
        <p>
          JavaScript provides several built-in methods for working with objects.
          Each one needs to iterate over every key in the object, which means
          they are all O(n) — except for <code>hasOwnProperty</code>, which
          checks a single key.
        </p>

        <ComplexityTable
          headers={["Method", "Time Complexity", "What It Returns"]}
          rows={[
            ["Object.keys(obj)", "O(n)", "Array of all keys"],
            ["Object.values(obj)", "O(n)", "Array of all values"],
            ["Object.entries(obj)", "O(n)", "Array of [key, value] pairs"],
            ["obj.hasOwnProperty(key)", "O(1)", "Boolean"],
          ]}
        />

        <CodeBlock
          title="Object methods in action"
          code={`const scores = {
  math: 95,
  english: 88,
  science: 92,
  history: 79
};

// O(n) — must visit every key
Object.keys(scores);
// ["math", "english", "science", "history"]

// O(n) — must visit every value
Object.values(scores);
// [95, 88, 92, 79]

// O(n) — must visit every key-value pair
Object.entries(scores);
// [["math", 95], ["english", 88], ["science", 92], ["history", 79]]

// O(1) — just one key lookup
scores.hasOwnProperty("math");    // true
scores.hasOwnProperty("art");     // false`}
        />

        <Callout type="interview" title="Object.keys inside a loop">
          <p>
            Be careful with this pattern in interviews. If you call{" "}
            <code>Object.keys(obj)</code> inside a loop, the overall complexity
            becomes O(n * m) where n is the loop count and m is the number of
            keys. If you need to iterate over an object's keys multiple times,
            store the result of <code>Object.keys()</code> in a variable first.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Arrays ───────────── */}
      <div className="section">
        <h2>Arrays — Ordered Lists</h2>
        <p>
          Arrays are JavaScript's go-to data structure for{" "}
          <strong>ordered</strong> data. Unlike objects, arrays have a concept
          of position — every element has a numeric index (0, 1, 2, ...) and
          the order is preserved. This ordering is incredibly useful, but it
          comes with a cost that you need to understand.
        </p>

        <h3>When to Use Arrays</h3>
        <ul>
          <li>
            When you <strong>need ordering</strong>. If the sequence of your
            data matters (a list of steps, a queue of tasks, sorted scores),
            arrays are the natural choice.
          </li>
          <li>
            When you need <strong>fast access by index</strong>. Grabbing
            element number 500 out of a million is O(1) — just as fast as
            grabbing element number 0.
          </li>
          <li>
            When you plan to <strong>iterate over the data</strong>. Arrays work
            beautifully with <code>for</code> loops, <code>forEach</code>,{" "}
            <code>map</code>, <code>filter</code>, and all the other iteration
            methods.
          </li>
        </ul>

        <CodeBlock
          title="Basic array operations"
          code={`const names = ["Alice", "Bob", "Charlie", "Diana"];

// Access by index — O(1)
names[2];            // "Charlie"

// Searching (by value) — O(n)
names.indexOf("Diana");   // 3  (had to check each element)
names.includes("Eve");    // false (checked all 4 elements)

// Insertion at the end — O(1)
names.push("Eve");        // ["Alice", "Bob", "Charlie", "Diana", "Eve"]

// Insertion at the beginning — O(n) !!
names.unshift("Zara");    // ["Zara", "Alice", "Bob", "Charlie", "Diana", "Eve"]
// Every existing element had to shift one position to the right`}
        />

        <h3>Big O of Core Array Operations</h3>

        <ComplexityTable
          headers={["Operation", "Time Complexity", "Why"]}
          rows={[
            ["Access (arr[i])", "O(1)", "Direct index lookup"],
            ["Searching (by value)", "O(n)", "Must check elements one by one"],
            ["push (insert at end)", "O(1)", "No re-indexing needed"],
            ["pop (remove from end)", "O(1)", "No re-indexing needed"],
            ["unshift (insert at start)", "O(n)", "Must re-index every element"],
            ["shift (remove from start)", "O(n)", "Must re-index every element"],
          ]}
        />

        <p>
          The critical insight here is:{" "}
          <strong>
            insertion and removal cost depends on where it happens.
          </strong>{" "}
          At the end of the array? Cheap — O(1). At the beginning? Expensive —
          O(n). Let's dig into why.
        </p>
      </div>

      {/* ───────────── 3. Why Inserting at the Beginning Is Costly ───────────── */}
      <div className="section">
        <h2>Why Inserting at the Beginning Is Costly</h2>
        <p>
          This is one of the most important things to understand about arrays,
          and it comes up in interviews all the time. Let's walk through it
          step by step.
        </p>
        <p>
          Every element in an array has an <strong>index</strong>. When you
          insert at the beginning, every single existing element needs to be{" "}
          <strong>re-indexed</strong> — shifted one position to the right to
          make room for the new element.
        </p>

        <CodeBlock
          title="The re-indexing problem"
          code={`// Before unshift:
//   index:  0        1       2
//   value: "Bob"   "Charlie" "Diana"

const arr = ["Bob", "Charlie", "Diana"];
arr.unshift("Alice");

// After unshift:
//   index:  0        1      2         3
//   value: "Alice"  "Bob"  "Charlie" "Diana"

// What happened behind the scenes:
//   "Diana"  moved from index 2 → index 3
//   "Charlie" moved from index 1 → index 2
//   "Bob"    moved from index 0 → index 1
//   "Alice"  inserted at index 0
//
// Every single element had to move! That is O(n).`}
        />

        <p>
          The same problem applies to <code>shift()</code> — removing from the
          beginning. After the first element is removed, every remaining element
          slides one position to the left, each getting a new index. If the
          array has a million elements, that is roughly a million index
          reassignments.
        </p>

        <CodeBlock
          title="shift is equally expensive"
          code={`const arr = ["Alice", "Bob", "Charlie", "Diana"];
arr.shift();  // removes "Alice"

// After shift:
//   index:  0      1         2
//   value: "Bob"  "Charlie" "Diana"
//
// "Bob"     moved from index 1 → index 0
// "Charlie" moved from index 2 → index 1
// "Diana"   moved from index 3 → index 2
//
// Again, every element had to be re-indexed. O(n).`}
        />

        <p>
          Contrast this with <code>push()</code> and <code>pop()</code>, which
          operate at the <strong>end</strong> of the array. Adding or removing
          the last element does not affect any other element's index, so no
          re-indexing is needed. That is why they are O(1).
        </p>

        <Callout type="warning" title="Avoid shift/unshift in hot loops">
          <p>
            If you are calling <code>unshift()</code> inside a loop that runs n
            times, you end up with O(n) * O(n) = O(n^2) total. This is a
            common performance trap. If you need to build an array from the
            front, consider using <code>push()</code> and then reversing the
            result at the end — that is O(n) + O(n) = O(n) total.
          </p>
        </Callout>

        <CodeBlock
          title="Avoiding O(n^2) with push + reverse"
          code={`// BAD: O(n^2) — unshift inside a loop
function buildReversed(arr) {
  const result = [];
  for (const item of arr) {
    result.unshift(item);  // O(n) each time!
  }
  return result;
}

// GOOD: O(n) — push then reverse
function buildReversed(arr) {
  const result = [];
  for (const item of arr) {
    result.push(item);     // O(1) each time
  }
  return result.reverse(); // O(n) once
}
// Total: O(n) + O(n) = O(n)`}
        />
      </div>

      {/* ───────────── 4. Array Method Complexities ───────────── */}
      <div className="section">
        <h2>Big O of Array Methods</h2>
        <p>
          JavaScript arrays come with a rich set of built-in methods. Knowing
          their time complexity is essential — especially in interviews where
          calling an O(n) method inside a loop can silently turn your solution
          from O(n) into O(n^2).
        </p>

        <ComplexityTable
          headers={["Method", "Time Complexity", "Notes"]}
          rows={[
            ["push", "O(1)", "Adds to the end"],
            ["pop", "O(1)", "Removes from the end"],
            ["shift", "O(n)", "Removes from the start, re-indexes"],
            ["unshift", "O(n)", "Adds to the start, re-indexes"],
            ["concat", "O(n)", "Creates a new merged array"],
            ["slice", "O(n)", "Creates a shallow copy of a portion"],
            ["splice", "O(n)", "Inserts/removes in the middle, re-indexes"],
            ["sort", "O(n log n)", "Comparison-based sort"],
            ["forEach", "O(n)", "Iterates over every element"],
            ["map", "O(n)", "Iterates and creates a new array"],
            ["filter", "O(n)", "Iterates and creates a filtered array"],
            ["reduce", "O(n)", "Iterates and accumulates a result"],
            ["indexOf / includes", "O(n)", "Linear search through elements"],
            ["find / findIndex", "O(n)", "Linear search, stops on first match"],
          ]}
        />

        <Callout type="info" title="O(n) for iteration methods means 'at minimum'">
          <p>
            Methods like <code>forEach</code>, <code>map</code>,{" "}
            <code>filter</code>, and <code>reduce</code> are O(n) because they
            visit every element once. But the total complexity depends on what
            you do <em>inside</em> the callback. If your callback itself does
            O(n) work (like calling <code>includes</code> on another array),
            the overall complexity becomes O(n^2).
          </p>
        </Callout>

        <CodeBlock
          title="Hidden O(n^2) with nested array methods"
          code={`const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

// BAD: O(n * m) — includes is O(m) inside a filter that is O(n)
const intersection = arr1.filter(item => arr2.includes(item));

// GOOD: O(n + m) — convert one to a Set first, then filter
const set2 = new Set(arr2);             // O(m)
const intersection2 = arr1.filter(item => set2.has(item));  // O(n)
// Set.has() is O(1), so the filter is O(n)
// Total: O(n + m)`}
        />

        <h3>splice — The Swiss Army Knife</h3>
        <p>
          <code>splice</code> can insert, remove, or replace elements at any
          position. Its time complexity is O(n) because it may need to shift
          elements after the operation point. Even if you only splice one
          element, in the worst case (at the beginning), every other element
          must be re-indexed.
        </p>

        <CodeBlock
          title="splice complexity"
          code={`const arr = ["a", "b", "c", "d", "e"];

// Remove 1 element at index 1
arr.splice(1, 1);          // ["a", "c", "d", "e"]
// "c", "d", "e" all shifted left — O(n)

// Insert at index 2
arr.splice(2, 0, "X");    // ["a", "c", "X", "d", "e"]
// "d", "e" shifted right — O(n)

// Splicing at the end is effectively O(1),
// but splice at the beginning is just as bad as unshift.`}
        />

        <h3>sort — O(n log n)</h3>
        <p>
          JavaScript's <code>Array.sort()</code> uses a comparison-based sorting
          algorithm (typically Timsort). The best possible time complexity for
          comparison-based sorting is O(n log n) — and that is what you get.
          Be aware that sort <strong>mutates</strong> the original array.
        </p>

        <CodeBlock
          title="sort complexity"
          code={`const nums = [5, 3, 8, 1, 9, 2];

// O(n log n) — comparison-based sorting
nums.sort((a, b) => a - b);
// [1, 2, 3, 5, 8, 9]

// Common interview question: "Can you do better than O(n log n)?"
// For comparison-based sorting: no, O(n log n) is the theoretical floor.
// For special cases (small range of integers): yes, counting sort is O(n).`}
        />

        <Callout type="interview" title="Sorting in interviews">
          <p>
            If your solution involves sorting, its time complexity is{" "}
            <em>at least</em> O(n log n). Interviewers may ask: "Can you solve
            this without sorting?" — which is their way of hinting at a linear
            O(n) approach, often using a hash map or two pointers on a different
            data structure.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. When to Choose What ───────────── */}
      <div className="section">
        <h2>When to Choose What</h2>
        <p>
          Knowing the Big O of objects and arrays is only useful if you can
          apply it to real decisions. Here is a practical guide for choosing the
          right data structure.
        </p>

        <h3>Choose an Object When...</h3>
        <ul>
          <li>
            You need to <strong>store key-value pairs</strong> and look them up
            by key. Example: counting word frequencies, caching computed results,
            or mapping IDs to records.
          </li>
          <li>
            <strong>Order does not matter</strong>. If you just need fast
            insertion, deletion, and lookup by key, objects (or Maps) are ideal.
          </li>
          <li>
            You need <strong>O(1) membership checks</strong>. Use{" "}
            <code>hasOwnProperty</code> or the <code>in</code> operator to
            check if a key exists in constant time.
          </li>
        </ul>

        <h3>Choose an Array When...</h3>
        <ul>
          <li>
            You need to <strong>preserve order</strong>. Arrays maintain
            insertion order and let you access elements by their position.
          </li>
          <li>
            You need to <strong>iterate in sequence</strong>. Arrays work
            naturally with <code>for</code> loops, <code>map</code>,{" "}
            <code>filter</code>, <code>reduce</code>, and all the functional
            iteration patterns.
          </li>
          <li>
            You primarily <strong>add and remove at the end</strong> (stacks,
            for example). If you mostly use <code>push</code> and{" "}
            <code>pop</code>, arrays give you O(1) performance.
          </li>
        </ul>

        <Callout type="warning" title="Arrays as queues — a common trap">
          <p>
            Using an array as a queue (adding at the end with{" "}
            <code>push</code>, removing from the front with <code>shift</code>)
            means every dequeue operation is O(n). For small queues this is fine,
            but for performance-critical code or interview problems with large
            inputs, consider using a linked list or a custom queue implementation
            instead.
          </p>
        </Callout>

        <CodeBlock
          title="Choosing the right structure"
          code={`// TASK: Count how many times each word appears in a text.
// Best choice: Object (or Map) — O(1) per lookup/insert

function wordCount(text) {
  const counts = {};
  const words = text.toLowerCase().split(/\\s+/);

  for (const word of words) {
    counts[word] = (counts[word] || 0) + 1;  // O(1) access + O(1) insert
  }
  return counts;
}
// Total: O(n) where n is the number of words.
// Using an array here would make no sense — you would have
// to search through it on every word, making it O(n^2).`}
        />

        <CodeBlock
          title="When order matters"
          code={`// TASK: Keep a history of user actions in order.
// Best choice: Array — order is preserved, push is O(1)

const history = [];

function recordAction(action) {
  history.push({
    action,
    timestamp: Date.now()
  });
}

// Get the last 5 actions — O(1) slice from the end
const recent = history.slice(-5);

// If you used an object, you would lose the natural ordering
// and would need to sort by timestamp every time.`}
        />
      </div>

      {/* ───────────── 6. Map vs Object ───────────── */}
      <div className="section">
        <h2>Map vs. Object — When to Level Up</h2>
        <p>
          JavaScript's <code>Map</code> is a more powerful alternative to plain
          objects for key-value storage. It has the same O(1) access, insertion,
          and deletion, but with several advantages.
        </p>

        <ComplexityTable
          headers={["Feature", "Object", "Map"]}
          rows={[
            ["Key types", "Strings and Symbols only", "Any type (objects, numbers, etc.)"],
            ["Size", "Must compute (Object.keys().length)", "map.size — O(1)"],
            ["Iteration order", "Not fully guaranteed*", "Insertion order guaranteed"],
            ["Performance", "O(1) access", "O(1) access"],
            ["Prototype pollution", "Possible", "Not an issue"],
            ["Serialization (JSON)", "Built-in support", "Must convert manually"],
          ]}
        />

        <p>
          <small>
            *Modern engines preserve insertion order for string keys, but this
            is an implementation detail, not a specification guarantee for all
            key types.
          </small>
        </p>

        <CodeBlock
          title="Map vs Object"
          code={`// Object — keys are always strings
const obj = {};
obj[1] = "one";
obj["1"] = "also one";
console.log(Object.keys(obj));  // ["1"] — both keys became "1"!

// Map — keys maintain their type
const map = new Map();
map.set(1, "one");
map.set("1", "string one");
console.log(map.size);  // 2 — they are different keys

// Map can use objects as keys
const userA = { name: "Alice" };
const userB = { name: "Bob" };
const permissions = new Map();
permissions.set(userA, ["read", "write"]);
permissions.set(userB, ["read"]);
permissions.get(userA);  // ["read", "write"] — O(1)`}
        />

        <Callout type="tip" title="When to use Map over Object">
          <p>
            Use a <code>Map</code> when: you need non-string keys, you need to
            frequently add and remove keys (Maps are optimized for this), you
            care about insertion order, or you need the <code>.size</code>{" "}
            property. Use a plain object when: you are working with JSON data,
            you need a simple configuration or options bag, or your keys are
            always strings.
          </p>
        </Callout>
      </div>

      {/* ───────────── 7. When Arrays Are Overkill ───────────── */}
      <div className="section">
        <h2>When Arrays Are Overkill</h2>
        <p>
          Arrays are versatile, but sometimes developers reach for them when a
          simpler or more efficient data structure would be better.
        </p>

        <h3>Use a Set Instead of an Array for Unique Values</h3>
        <p>
          If you are maintaining a collection of unique values and frequently
          checking membership, a <code>Set</code> is almost always the better
          choice. <code>Set.has()</code> is O(1), while{" "}
          <code>Array.includes()</code> is O(n).
        </p>

        <CodeBlock
          title="Set vs Array for membership checks"
          code={`// BAD: Using an array for uniqueness checks — O(n) per check
const visited = [];

function visit(page) {
  if (!visited.includes(page)) {  // O(n) every time!
    visited.push(page);
    console.log("First visit to", page);
  }
}

// GOOD: Using a Set — O(1) per check
const visitedSet = new Set();

function visitFast(page) {
  if (!visitedSet.has(page)) {  // O(1) every time
    visitedSet.add(page);       // O(1)
    console.log("First visit to", page);
  }
}`}
        />

        <h3>Use an Object or Map Instead of an Array of Pairs</h3>

        <CodeBlock
          title="Avoid arrays for lookups"
          code={`// BAD: Array of pairs — O(n) to find a value
const settings = [
  ["theme", "dark"],
  ["language", "en"],
  ["fontSize", 16]
];
// To find "theme": must loop through all pairs

// GOOD: Object — O(1) to find a value
const settings2 = {
  theme: "dark",
  language: "en",
  fontSize: 16
};
// settings2.theme → "dark" — instant`}
        />

        <Callout type="tip" title="Right tool for the right job">
          <p>
            As a rule of thumb: if you are frequently checking "does this
            collection contain X?" — use a Set or an object/Map, not an array.
            If you are frequently looking up values by a key — use an
            object/Map, not an array of tuples. Reserve arrays for when you
            genuinely need ordered, index-based access.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. Side-by-Side Summary ───────────── */}
      <div className="section">
        <h2>Side-by-Side Comparison</h2>

        <ComplexityTable
          headers={["Operation", "Object", "Array"]}
          rows={[
            ["Access by key/index", "O(1)", "O(1)"],
            ["Search by value", "O(n)", "O(n)"],
            ["Insert", "O(1)", "O(1) at end, O(n) at start"],
            ["Remove", "O(1)", "O(1) at end, O(n) at start"],
            ["Ordered?", "No", "Yes"],
            ["Key types", "String/Symbol", "Numeric indices"],
          ]}
        />
      </div>

      {/* ───────────── 9. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips and Common Mistakes</h2>

        <Callout type="interview" title="Know your array methods cold">
          <p>
            In interviews, you will use array methods constantly:{" "}
            <code>push</code>, <code>pop</code>, <code>slice</code>,{" "}
            <code>splice</code>, <code>map</code>, <code>filter</code>,{" "}
            <code>reduce</code>. If an interviewer asks about the time
            complexity of your solution and you used <code>splice</code> inside
            a loop, you need to know that is O(n^2) — not O(n). Getting this
            wrong signals a lack of fundamentals.
          </p>
        </Callout>

        <Callout type="interview" title="Explain why you chose a data structure">
          <p>
            When you start solving a problem, say something like: "I will use
            an object here because I need O(1) lookups by key." Or: "I need to
            maintain order, so I will use an array and add elements with push to
            keep it O(1) per insertion." Explaining your data structure choice
            shows the interviewer you think about performance from the start.
          </p>
        </Callout>

        <Callout type="warning" title="Common mistake: includes inside a loop">
          <p>
            This is probably the most common hidden-O(n^2) pattern in JavaScript
            interviews. You write a clean-looking solution using{" "}
            <code>filter</code> and <code>includes</code>, and it looks like
            O(n) — but it is actually O(n^2). Always ask yourself: "Is any
            method I am calling inside this loop itself O(n)?" If so, consider
            a Set or Map to bring it down to O(1) per lookup.
          </p>
        </Callout>

        <CodeBlock
          title="Interview pattern: frequency counter with objects"
          code={`// Classic interview pattern: use an object as a frequency counter
// to avoid nested loops.

// QUESTION: Are two strings anagrams of each other?

// BAD: O(n log n) — sort both strings and compare
function areAnagrams(str1, str2) {
  return str1.split("").sort().join("") === str2.split("").sort().join("");
}

// GOOD: O(n) — count character frequencies with an object
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = {};

  for (const char of str1) {
    freq[char] = (freq[char] || 0) + 1;     // O(1) per operation
  }

  for (const char of str2) {
    if (!freq[char]) return false;
    freq[char]--;                             // O(1) per operation
  }

  return true;
}
// Time: O(n)  Space: O(n)
// The object gives us O(1) lookups — no sorting needed.`}
        />

        <Callout type="tip" title="The object/Map is your best friend">
          <p>
            In a huge number of interview problems, the key optimization is
            replacing a nested loop or a sort with an object or Map for O(1)
            lookups. Whenever you see O(n^2) and want to improve it, ask
            yourself: "Can I precompute something into a hash map so that I
            only need one pass?" The answer is usually yes.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            <strong>Objects</strong> are unordered and give you O(1) access,
            insertion, and removal by key. Searching by value is O(n). Object
            methods like <code>Object.keys()</code> are O(n), but{" "}
            <code>hasOwnProperty</code> is O(1).
          </li>
          <li>
            <strong>Arrays</strong> are ordered and give you O(1) access by
            index. But insertion and removal cost depends on position:{" "}
            <code>push</code>/<code>pop</code> at the end are O(1), while{" "}
            <code>shift</code>/<code>unshift</code> at the beginning are O(n)
            due to re-indexing.
          </li>
          <li>
            <strong>Know your array methods.</strong> <code>sort</code> is
            O(n log n). <code>concat</code>, <code>slice</code>,{" "}
            <code>splice</code>, and all iteration methods (<code>map</code>,{" "}
            <code>filter</code>, <code>reduce</code>, <code>forEach</code>) are
            O(n).
          </li>
          <li>
            <strong>Choose wisely.</strong> Use objects/Maps for fast key-value
            lookups. Use Sets for fast membership checks. Use arrays when order
            matters and you mostly operate at the end.
          </li>
          <li>
            <strong>Watch for hidden O(n^2).</strong> Calling an O(n) method
            like <code>includes</code> or <code>indexOf</code> inside a loop
            is the most common performance trap in JavaScript.
          </li>
        </ul>
      </div>

      <TopicNav slug="arrays-objects" />
    </div>
  );
}
