import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function HashTables() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Hash Tables
      </p>

      <h1 className="topic-title">Hash Tables</h1>
      <p className="topic-subtitle">
        Hash tables are one of the most important data structures in all of
        computer science. They store key-value pairs and provide lightning-fast
        lookups, insertions, and deletions — on average, all in constant time.
        You already use them every day: JavaScript objects and Maps, Python
        dictionaries, Java HashMaps, and Ruby hashes are all built on hash
        tables. Understanding how they work under the hood will make you a
        stronger programmer and give you a serious edge in interviews.
      </p>

      {/* ───────────── 1. What Is a Hash Table? ───────────── */}
      <div className="section">
        <h2>What Is a Hash Table?</h2>
        <p>
          A hash table is a data structure that stores <strong>key-value
          pairs</strong>. Think of it like an array, but instead of accessing
          elements by a numeric index, you access them by a meaningful key —
          like a name, an ID, or any string.
        </p>
        <ul>
          <li>
            <strong>Keys are not ordered.</strong> Unlike an array where
            elements have a defined sequence, hash table keys have no inherent
            order.
          </li>
          <li>
            <strong>Fast for everything.</strong> Finding values, adding new
            key-value pairs, and removing them are all extremely fast —
            typically O(1).
          </li>
          <li>
            <strong>Used everywhere.</strong> Nearly every programming language
            has a built-in hash table implementation because they are so useful.
          </li>
        </ul>

        <CodeBlock
          title="Hash tables in the wild"
          code={`// JavaScript Objects
const user = { name: "Alice", age: 30, role: "admin" };
console.log(user["name"]); // "Alice" — instant lookup

// JavaScript Maps
const colors = new Map();
colors.set("#ff0000", "red");
colors.set("#00ff00", "green");
console.log(colors.get("#ff0000")); // "red"

// Python dictionaries, Java HashMaps, Ruby Hashes
// all work the same way under the hood`}
        />

        <Callout type="info" title="Why not just use arrays?">
          <p>
            Arrays are great when you have ordered data and numeric indices. But
            what if you want to store a color by its hex code, or look up a
            user by their username? You could scan through an array to find a
            match, but that would be O(n). Hash tables let you jump directly to
            the value in O(1) time.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Hash Functions ───────────── */}
      <div className="section">
        <h2>Hash Functions</h2>
        <p>
          At the core of every hash table is a <strong>hash function</strong>.
          Its job is simple: take a key (like a string) and convert it into a
          valid array index. The hash table then stores the value at that index
          in an internal array.
        </p>
        <p>
          What makes a good hash function? Three things:
        </p>
        <ul>
          <li>
            <strong>Fast (constant time).</strong> The hash function runs every
            time you get or set a value, so it needs to be quick. If the hash
            function itself is O(n), you lose the whole benefit of using a hash
            table.
          </li>
          <li>
            <strong>Distributes uniformly.</strong> A good hash function spreads
            keys evenly across the available indices. If every key hashes to
            the same index, all your data piles up in one spot and lookups
            become O(n).
          </li>
          <li>
            <strong>Deterministic.</strong> The same input must always produce
            the same output. If <code>hash("hello")</code> returns 4 the first
            time, it must return 4 every time. Otherwise you would never be
            able to retrieve your data.
          </li>
        </ul>

        <Callout type="warning" title="Cryptographic vs. non-cryptographic hashing">
          <p>
            Hash functions used in hash tables are <strong>not</strong> the same
            as cryptographic hash functions like SHA-256. Hash table hashes
            prioritize speed and uniform distribution. Cryptographic hashes
            prioritize security and irreversibility. Do not confuse the two.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Building a Hash Function ───────────── */}
      <div className="section">
        <h2>Building a Simple Hash Function</h2>
        <p>
          Let's build a hash function for strings step by step. The idea is to
          convert each character into a number, combine those numbers, and then
          use the modulo operator to fit the result within the bounds of our
          array.
        </p>

        <h3>A Naive First Attempt</h3>
        <p>
          We can use each character's UTF-16 char code, subtract 96 to map
          lowercase letters to 1-26, sum them up, and take the modulo of the
          array length.
        </p>

        <CodeBlock
          title="Naive hash function"
          code={`function hash(key, arrayLen) {
  let total = 0;
  for (let i = 0; i < key.length; i++) {
    let charCode = key.charCodeAt(i) - 96;
    total = (total + charCode) % arrayLen;
  }
  return total;
}

hash("pink", 10);    // 0
hash("cyan", 10);    // 3
hash("orange", 10);  // 0  — collision with "pink"!
hash("maroon", 10);  // 6`}
        />

        <p>
          This works, but it has two problems. First, it only handles lowercase
          letters. Second — and more importantly — it produces a lot of
          collisions. The strings "pink" and "orange" both hash to 0. Also, if
          the key is very long, the loop takes a long time (not constant time).
        </p>

        <h3>An Improved Version Using Primes</h3>
        <p>
          We can improve the distribution significantly by incorporating a{" "}
          <strong>prime number</strong> into the hash calculation. Prime numbers
          reduce the number of collisions because they help spread data more
          evenly. We also cap the number of characters we look at to keep the
          function fast.
        </p>

        <CodeBlock
          title="Improved hash function with primes"
          code={`function hash(key, arrayLen) {
  let total = 0;
  let PRIME = 31;

  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let charCode = key.charCodeAt(i) - 96;
    total = (total * PRIME + charCode) % arrayLen;
  }

  return total;
}

hash("pink", 13);    // 5
hash("cyan", 13);    // 7
hash("orange", 13);  // 10
hash("maroon", 13);  // 2  — much better distribution!`}
        />

        <Callout type="tip" title="Why prime numbers matter">
          <p>
            Using a prime number for the array size and in the hash computation
            reduces clustering. When the array size is prime, the modulo
            operation spreads values more evenly. The constant 31 is a popular
            choice because it is a small prime that produces good distributions
            — Java's <code>String.hashCode()</code> uses it for the same reason.
            Mathematically, primes minimize the patterns that cause collisions.
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. Handling Collisions ───────────── */}
      <div className="section">
        <h2>Handling Collisions</h2>
        <p>
          No matter how good your hash function is, collisions are inevitable.
          When two keys hash to the same index, you need a strategy to deal
          with it. There are two main approaches.
        </p>

        <h3>Separate Chaining</h3>
        <p>
          With separate chaining, each slot in the array holds a{" "}
          <strong>collection</strong> of key-value pairs (usually an array of
          arrays, or a linked list). When multiple keys hash to the same index,
          they all get stored at that same position. To look something up, you
          hash the key to find the right slot, then search through the
          collection at that slot for the matching key.
        </p>

        <CodeBlock
          title="Separate chaining concept"
          language="text"
          code={`Array index:  [0]       [1]       [2]       [3]       [4]
                |         |         |         |         |
              null      null     [["pink",  null    [["cyan",
                                  "#ff69"],           "#00ff"],
                                  ["orange",          ["blue",
                                  "#ffa5"]]           "#0000"]]

"pink" and "orange" both hashed to index 2.
"cyan" and "blue" both hashed to index 4.
They coexist peacefully in their respective buckets.`}
        />

        <p>
          The big advantage of separate chaining is that the table can store{" "}
          <strong>more items than the array size</strong>. Even if every key
          hashed to the same index, it would still work — it would just be slow
          (effectively a linked list search).
        </p>

        <h3>Linear Probing</h3>
        <p>
          Linear probing takes a different approach. When a collision occurs,
          instead of storing multiple items at the same index, we look for the{" "}
          <strong>next empty slot</strong> in the array. We simply step forward
          one index at a time until we find an open spot.
        </p>

        <CodeBlock
          title="Linear probing concept"
          language="text"
          code={`Inserting "pink" -> hash gives index 2 -> slot 2 is empty -> store at 2
Inserting "orange" -> hash gives index 2 -> slot 2 is taken!
  -> check slot 3 -> empty -> store at 3

Array: [null, null, "pink", "orange", null, ...]

Each slot holds at most one item.`}
        />

        <p>
          The advantage of linear probing is that each array slot holds a single
          key-value pair, which makes access patterns simpler. The downside is
          that the total number of items you can store is{" "}
          <strong>limited to the size of the array</strong>. It can also suffer
          from "clustering" — groups of filled slots that slow down lookups.
        </p>

        <Callout type="info" title="Which approach is more common?">
          <p>
            In practice, <strong>separate chaining</strong> is more widely used
            and easier to implement. It is the approach we will use to build our
            hash table below. Linear probing (and other "open addressing"
            techniques) are used in some high-performance implementations where
            memory locality matters, but separate chaining is the go-to for
            most general-purpose hash tables.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. HashTable Class ───────────── */}
      <div className="section">
        <h2>HashTable Class Implementation</h2>
        <p>
          Let's put everything together and build a complete{" "}
          <code>HashTable</code> class. We will use separate chaining and a
          prime-number-sized array for better distribution.
        </p>

        <h3>The Constructor and Hash Method</h3>
        <p>
          We start with an internal array (our "keyMap") and a hash method that
          converts keys into valid indices.
        </p>

        <CodeBlock
          title="HashTable — constructor and _hash"
          code={`class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let charCode = key.charCodeAt(i) - 96;
      total = (total * PRIME + charCode) % this.keyMap.length;
    }

    return total;
  }
}`}
        />

        <p>
          The default size of 53 is a prime number — this is intentional. As
          we discussed, prime-sized arrays reduce collisions. The{" "}
          <code>_hash</code> method caps the loop at 100 characters to keep
          hashing fast even for very long keys.
        </p>

        <h3>set(key, value)</h3>
        <p>
          The <code>set</code> method hashes the key, then stores the key-value
          pair at the computed index. If nothing exists at that index yet, we
          create a new bucket (an empty array). Then we push the key-value pair
          into the bucket.
        </p>

        <CodeBlock
          title="HashTable — set"
          code={`set(key, value) {
  let index = this._hash(key);

  if (!this.keyMap[index]) {
    this.keyMap[index] = [];
  }

  // Check if key already exists and update it
  for (let i = 0; i < this.keyMap[index].length; i++) {
    if (this.keyMap[index][i][0] === key) {
      this.keyMap[index][i][1] = value;
      return;
    }
  }

  this.keyMap[index].push([key, value]);
}`}
        />

        <Callout type="tip" title="Handle duplicate keys">
          <p>
            Notice that we loop through the bucket first to check if the key
            already exists. If it does, we update the value instead of adding a
            duplicate. This is important — a hash table should not have
            duplicate keys. If you skip this check, calling{" "}
            <code>set("color", "blue")</code> twice would create two entries
            with the same key, and <code>get</code> would always return the
            first one.
          </p>
        </Callout>

        <h3>get(key)</h3>
        <p>
          The <code>get</code> method hashes the key to find the right bucket,
          then loops through the bucket to find the matching key-value pair.
        </p>

        <CodeBlock
          title="HashTable — get"
          code={`get(key) {
  let index = this._hash(key);

  if (this.keyMap[index]) {
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        return this.keyMap[index][i][1];
      }
    }
  }

  return undefined;
}`}
        />

        <h3>keys() and values()</h3>
        <p>
          These utility methods iterate through the entire table and collect all
          unique keys or values. They skip empty slots and handle duplicates.
        </p>

        <CodeBlock
          title="HashTable — keys and values"
          code={`keys() {
  let keysArr = [];

  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        if (!keysArr.includes(this.keyMap[i][j][0])) {
          keysArr.push(this.keyMap[i][j][0]);
        }
      }
    }
  }

  return keysArr;
}

values() {
  let valuesArr = [];

  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        if (!valuesArr.includes(this.keyMap[i][j][1])) {
          valuesArr.push(this.keyMap[i][j][1]);
        }
      }
    }
  }

  return valuesArr;
}`}
        />

        <h3>Full Implementation</h3>
        <p>
          Here is the complete <code>HashTable</code> class with all methods
          together.
        </p>

        <CodeBlock
          title="HashTable — complete implementation"
          code={`class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let charCode = key.charCodeAt(i) - 96;
      total = (total * PRIME + charCode) % this.keyMap.length;
    }

    return total;
  }

  set(key, value) {
    let index = this._hash(key);

    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }

    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        this.keyMap[index][i][1] = value;
        return;
      }
    }

    this.keyMap[index].push([key, value]);
  }

  get(key) {
    let index = this._hash(key);

    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }

    return undefined;
  }

  keys() {
    let keysArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            keysArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }

    return keysArr;
  }

  values() {
    let valuesArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }

    return valuesArr;
  }
}

// Usage
let ht = new HashTable(17);
ht.set("maroon", "#800000");
ht.set("yellow", "#FFFF00");
ht.set("olive", "#808000");
ht.set("salmon", "#FA8072");
ht.set("lightcoral", "#F08080");
ht.set("mediumvioletred", "#C71585");
ht.set("plum", "#DDA0DD");

ht.get("maroon");   // "#800000"
ht.get("yellow");   // "#FFFF00"
ht.get("taupe");    // undefined

ht.keys();
// ["maroon", "yellow", "olive", "salmon",
//  "lightcoral", "mediumvioletred", "plum"]

ht.values();
// ["#800000", "#FFFF00", "#808000", "#FA8072",
//  "#F08080", "#C71585", "#DDA0DD"]`}
        />
      </div>

      {/* ───────────── 6. Big O of Hash Tables ───────────── */}
      <div className="section">
        <h2>Big O of Hash Tables</h2>
        <p>
          This is where hash tables really shine. With a good hash function, all
          three core operations run in constant time on average.
        </p>

        <ComplexityTable
          headers={["Operation", "Average", "Worst Case"]}
          rows={[
            ["Insert", "O(1)", "O(n)"],
            ["Delete", "O(1)", "O(n)"],
            ["Access", "O(1)", "O(n)"],
          ]}
        />

        <p>
          The average case is O(1). That is not a typo — hash tables really are
          that fast. Insert a key-value pair? O(1). Look up a value by its key?
          O(1). Delete an entry? O(1). This is why hash tables are the go-to
          data structure when you need fast lookups.
        </p>
        <p>
          The worst case of O(n) happens when every single key hashes to the
          same index. In that scenario, your hash table degrades into a linked
          list — you have to search through all n items to find anything. But
          this essentially never happens with a good hash function.
        </p>

        <Callout type="info" title="What keeps it near O(1)?">
          <p>
            Two things keep hash tables fast in practice. First, a{" "}
            <strong>good hash function</strong> distributes keys evenly so that
            each bucket contains very few items (ideally zero or one). Second,{" "}
            <strong>dynamic resizing</strong> — when the table gets too full
            (the "load factor" exceeds a threshold, typically 0.75), the table
            doubles in size and rehashes all keys. This keeps buckets short.
            Together, these guarantee amortized O(1) performance.
          </p>
        </Callout>

        <Callout type="warning" title="The load factor">
          <p>
            The <strong>load factor</strong> is the ratio of stored items to
            table size. A load factor of 0.75 means the table is 75% full. When
            it exceeds this threshold, the table should be resized. Our simple
            implementation above does not handle resizing, but real-world hash
            tables (like JavaScript's <code>Map</code>) do it automatically.
          </p>
        </Callout>
      </div>

      {/* ───────────── 7. Hash Tables in JavaScript ───────────── */}
      <div className="section">
        <h2>Hash Tables in JavaScript: Objects vs. Map</h2>
        <p>
          JavaScript gives you two built-in hash table implementations:{" "}
          <strong>plain objects</strong> and the <strong>Map</strong> class.
          They overlap in functionality, but they have important differences.
        </p>

        <CodeBlock
          title="Object vs. Map"
          code={`// --- Plain Object ---
const obj = {};
obj["name"] = "Alice";
obj[42] = "forty-two";       // key is coerced to string "42"
obj[true] = "yes";           // key becomes string "true"
console.log(Object.keys(obj)); // ["42", "name", "true"]
// Keys are always strings (or Symbols)

// --- Map ---
const map = new Map();
map.set("name", "Alice");
map.set(42, "forty-two");    // key stays as number 42
map.set(true, "yes");        // key stays as boolean true
map.set({ id: 1 }, "obj");  // even objects can be keys!
console.log(map.size);       // 4
// Keys can be ANY type`}
        />

        <h3>When to Use Map Over Objects</h3>
        <ul>
          <li>
            <strong>Any type as key.</strong> Object keys are always coerced to
            strings. Map keys can be anything — numbers, booleans, objects,
            functions, even <code>NaN</code>.
          </li>
          <li>
            <strong>Maintains insertion order.</strong> Maps iterate in the
            order keys were inserted. Objects mostly do too (in modern engines),
            but integer-like keys get sorted first, which can be surprising.
          </li>
          <li>
            <strong>Has a <code>.size</code> property.</strong> With objects,
            you have to call <code>Object.keys(obj).length</code>, which is
            O(n). Map gives you the count instantly.
          </li>
          <li>
            <strong>Better performance for frequent additions and
            deletions.</strong> Maps are specifically optimized for scenarios
            where key-value pairs are added and removed frequently.
          </li>
          <li>
            <strong>No prototype pollution.</strong> Plain objects inherit from{" "}
            <code>Object.prototype</code>, which means keys like{" "}
            <code>"toString"</code> or <code>"constructor"</code> can cause
            unexpected behavior. Maps have no such issue.
          </li>
        </ul>

        <CodeBlock
          title="Map advantages in practice"
          code={`// Map has convenient iteration methods
const inventory = new Map();
inventory.set("apples", 5);
inventory.set("bananas", 3);
inventory.set("oranges", 8);

// Iterate with for...of
for (let [fruit, count] of inventory) {
  console.log(\`\${fruit}: \${count}\`);
}

// Chaining
inventory.set("grapes", 12).set("kiwi", 6);

// Check existence
inventory.has("apples"); // true

// Delete
inventory.delete("bananas");

// Clear everything
inventory.clear();
console.log(inventory.size); // 0`}
        />

        <Callout type="tip" title="Quick rule of thumb">
          <p>
            Use <strong>plain objects</strong> when your keys are strings and
            you are modeling a fixed structure (like a configuration or a
            record). Use <strong>Map</strong> when you need non-string keys,
            when you care about insertion order, when you add and remove keys
            frequently, or when you need the <code>.size</code> property.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="Hash tables are your best friend">
          <p>
            When you are stuck on a problem that requires fast lookups,
            counting occurrences, or checking for duplicates, a hash table is
            almost always the answer. The classic example: "Given an array,
            find if there are two numbers that sum to a target." With a hash
            table, this goes from O(n^2) to O(n). Any time you see a nested
            loop that is just searching for something, ask yourself: "Can I
            replace this with a hash table lookup?"
          </p>
        </Callout>

        <Callout type="interview" title="Know the time complexities cold">
          <p>
            Be ready to state that hash table insert, delete, and access are
            all O(1) average, O(n) worst case. If the interviewer asks "why
            O(n) worst case?", explain that it happens when all keys hash to
            the same index (degenerate case). Then mention that a good hash
            function and resizing strategy prevent this in practice.
          </p>
        </Callout>

        <Callout type="interview" title="Understand how collisions work">
          <p>
            Interviewers may ask you to explain separate chaining vs. open
            addressing (linear probing). Know the tradeoffs: separate chaining
            is simpler and allows more items than slots; linear probing has
            better cache performance but suffers from clustering and is limited
            to the table size.
          </p>
        </Callout>

        <Callout type="interview" title="Common hash table patterns in interviews">
          <p>
            <strong>Frequency counter:</strong> Count occurrences of each
            element. <strong>Two-pointer with hash:</strong> Store complements
            for two-sum type problems. <strong>Grouping:</strong> Group
            anagrams by sorting each word and using it as a key.{" "}
            <strong>Caching / Memoization:</strong> Store previously computed
            results to avoid redundant work. If you recognize these patterns,
            you can solve most hash-table-related interview problems quickly.
          </p>
        </Callout>

        <Callout type="interview" title="Object vs. Map in interviews">
          <p>
            If you are coding in JavaScript, using a plain object as a hash map
            is perfectly fine for most interview problems. But if the
            interviewer specifically asks about Map, be ready to explain the
            differences: any type as key, insertion order, <code>.size</code>,
            and better performance for frequent additions and deletions. Showing
            this knowledge demonstrates depth.
          </p>
        </Callout>

        <Callout type="tip" title="The frequency counter pattern">
          <p>
            One of the most useful patterns in all of algorithm design:
            build a hash map of frequencies, then use it to answer
            questions about the data. This pattern comes up in problems about
            anagrams, duplicates, most frequent elements, character counting,
            and many more. Master it and you will solve a huge category of
            problems effortlessly.
          </p>
        </Callout>
      </div>

      <TopicNav slug="hash-tables" />
    </div>
  );
}
