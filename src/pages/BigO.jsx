import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function BigO() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Big O Notation
      </p>

      <h1 className="topic-title">Big O Notation</h1>
      <p className="topic-subtitle">
        The language we use to describe how efficient an algorithm is. It tells
        you how the runtime or memory usage of your code grows as the input
        grows — and it is the first thing interviewers expect you to discuss
        when analyzing a solution.
      </p>

      {/* ───────────── 1. What is Big O? ───────────── */}
      <div className="section">
        <h2>What is Big O?</h2>
        <p>
          Imagine you have a function that takes an array and does something
          with it. When the array has 10 items, it runs almost instantly. When
          it has 10,000 items, it takes a noticeable pause. When it has
          10,000,000 items, your browser tab crashes. Big O is the vocabulary
          we use to talk about <strong>why</strong> that happens and{" "}
          <strong>how fast</strong> things get worse.
        </p>
        <p>
          More precisely, Big O describes the <strong>upper bound</strong> of
          the growth rate of an algorithm. It is not about measuring exact
          milliseconds — it is about the <em>trend</em>. Does the work double
          when the input doubles? Does it quadruple? Does it stay the same no
          matter how big the input gets? That is the kind of question Big O
          answers.
        </p>
        <p>
          We write it as <strong>O(...)</strong> where the part inside the
          parentheses is a mathematical expression in terms of{" "}
          <strong>n</strong> (the size of the input). For example:
        </p>
        <ul>
          <li>
            <strong>O(1)</strong> — constant: does the same amount of work
            regardless of input size
          </li>
          <li>
            <strong>O(n)</strong> — linear: work grows proportionally with
            input size
          </li>
          <li>
            <strong>O(n²)</strong> — quadratic: work grows with the square of
            the input size
          </li>
        </ul>

        <Callout type="info" title="Think of it like a speed limit">
          <p>
            Big O is a worst-case ceiling. When we say a function is O(n), we
            mean that in the worst case, the number of operations grows
            roughly in proportion to n. The actual performance might sometimes
            be better, but it will never be worse than this rate.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Why It Matters ───────────── */}
      <div className="section">
        <h2>Why Does Big O Matter?</h2>
        <p>
          You might wonder: "Computers are fast — does a little extra work
          really matter?" The answer is <strong>absolutely yes</strong>, and
          here is why:
        </p>
        <ul>
          <li>
            <strong>Comparing solutions.</strong> If someone gives you two
            different functions that both solve the same problem, Big O lets
            you objectively say which one scales better. An O(n) solution will
            crush an O(n²) solution once the input is large enough, no matter
            how clever the slower one looks.
          </li>
          <li>
            <strong>Identifying bottlenecks.</strong> When your application
            slows down, understanding Big O helps you pinpoint the offending
            code. If you know a certain function is O(n²) and it processes
            user data, you know exactly where to look when things get sluggish.
          </li>
          <li>
            <strong>Interview vocabulary.</strong> In virtually every technical
            interview, after you write a solution, the interviewer will ask:
            "What is the time and space complexity?" If you cannot answer
            confidently, it raises a red flag — even if your code is correct.
          </li>
          <li>
            <strong>System design.</strong> As you move into designing larger
            systems, the complexity of your core algorithms determines whether
            your service can handle 100 users or 100 million users.
          </li>
        </ul>

        <Callout type="interview" title="The question you will always get">
          <p>
            After writing any solution in an interview, expect to hear: "What
            is the time and space complexity of your solution?" Practice
            saying it out loud: "This runs in O(n) time and O(1) space." Get
            comfortable with the phrasing.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Time Complexity ───────────── */}
      <div className="section">
        <h2>Time Complexity</h2>
        <p>
          Time complexity is about <strong>counting operations</strong>, not
          counting seconds. Why? Because seconds depend on your hardware, your
          browser, what else is running on your machine, and a hundred other
          variables. Operations, on the other hand, give us a
          hardware-independent way to measure how much work an algorithm does.
        </p>
        <p>
          Let's look at a classic example. Suppose we want to add up all
          numbers from 1 to n. Here are two approaches:
        </p>

        <CodeBlock
          title="Approach 1: Loop (O(n))"
          code={`function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

addUpTo(6); // 21`}
        />

        <p>
          In this version, the loop runs <strong>n times</strong>. If n is 10,
          we do roughly 10 additions. If n is a billion, we do roughly a
          billion additions. The number of operations grows linearly with n,
          so this is <strong>O(n)</strong>.
        </p>

        <CodeBlock
          title="Approach 2: Math formula (O(1))"
          code={`function addUpTo(n) {
  return n * (n + 1) / 2;
}

addUpTo(6); // 21`}
        />

        <p>
          This version uses the well-known formula. No matter how large n is —
          whether it is 10 or 10 billion — we always perform exactly 3
          operations: one multiplication, one addition, and one division.
          That is <strong>O(1)</strong>, constant time.
        </p>

        <Callout type="tip" title="Counting operations, not lines">
          <p>
            You do not need to count every single operation precisely. The
            goal is to understand the general trend. If a loop runs n times,
            the function is at least O(n). If there is a loop inside a loop,
            think O(n²). Do not worry about whether the inner loop does 3 or
            5 things per iteration — focus on how the <em>total</em> work
            scales.
          </p>
        </Callout>

        <p>Here is another example to build your intuition:</p>

        <CodeBlock
          title="Count Up and Down (O(n))"
          code={`function countUpAndDown(n) {
  // This loop runs n times
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
  // This loop also runs n times
  for (let j = n - 1; j >= 0; j--) {
    console.log(j);
  }
}
// Total operations: n + n = 2n → simplified to O(n)`}
        />

        <p>
          Even though there are two separate loops, the total is 2n, which
          simplifies to O(n). We will cover why in the next section.
        </p>

        <CodeBlock
          title="Print All Pairs (O(n²))"
          code={`function printAllPairs(n) {
  for (let i = 0; i < n; i++) {       // outer loop: n times
    for (let j = 0; j < n; j++) {     // inner loop: n times per outer iteration
      console.log(i, j);
    }
  }
}
// Total operations: n * n = n² → O(n²)`}
        />

        <p>
          A loop inside a loop is the classic O(n²) pattern. Each time the
          outer loop iterates, the inner loop does n work. So the total is n
          times n, which is n².
        </p>
      </div>

      {/* ───────────── 4. Simplifying Big O ───────────── */}
      <div className="section">
        <h2>Simplifying Big O — The Rules</h2>
        <p>
          When you calculate Big O, you will often end up with messy
          expressions like O(5n + 37) or O(13n² + 100n + 42). The good news
          is: we simplify aggressively. Here are the rules.
        </p>

        <h3>Rule 1: Constants Don't Matter</h3>
        <p>
          Big O describes the shape of the growth curve, not the exact
          multiplier. So we drop all constant factors:
        </p>
        <ul>
          <li>O(2n) simplifies to <strong>O(n)</strong></li>
          <li>O(500) simplifies to <strong>O(1)</strong></li>
          <li>O(13n²) simplifies to <strong>O(n²)</strong></li>
          <li>O(½n) simplifies to <strong>O(n)</strong></li>
        </ul>

        <h3>Rule 2: Smaller Terms Don't Matter</h3>
        <p>
          As n gets very large, the biggest term dominates everything else.
          So we drop all smaller terms:
        </p>
        <ul>
          <li>O(n + 10) simplifies to <strong>O(n)</strong></li>
          <li>O(1000n + 50) simplifies to <strong>O(n)</strong></li>
          <li>
            O(n² + 5n + 8) simplifies to <strong>O(n²)</strong>
          </li>
          <li>
            O(n³ + n² + n + 1) simplifies to <strong>O(n³)</strong>
          </li>
        </ul>

        <Callout type="info" title="Why we can drop smaller terms">
          <p>
            When n = 1,000,000, the expression n² + 5n + 8 becomes
            1,000,000,000,000 + 5,000,000 + 8. The n² part is roughly 200,000
            times larger than the 5n part. As n keeps growing, the smaller
            terms become increasingly insignificant. That is why we only keep
            the dominant term.
          </p>
        </Callout>

        <h3>Rules of Thumb for Counting Operations</h3>
        <p>
          You do not need to analyze every single statement. Use these
          shortcuts:
        </p>
        <ul>
          <li>
            <strong>Arithmetic operations</strong> (+, -, *, /) are{" "}
            <strong>O(1)</strong> — they take constant time regardless of the
            values involved.
          </li>
          <li>
            <strong>Variable assignment</strong> is <strong>O(1)</strong> —
            storing a value is a single operation.
          </li>
          <li>
            <strong>Accessing an array element by index</strong> (arr[i]) or
            an object property by key (obj.key) is <strong>O(1)</strong>.
          </li>
          <li>
            <strong>A loop</strong> that runs n times contributes{" "}
            <strong>O(n)</strong> multiplied by whatever happens inside the
            loop body.
          </li>
        </ul>

        <CodeBlock
          title="Applying the rules"
          code={`function example(arr) {
  let sum = 0;              // O(1) — one assignment
  let product = 1;          // O(1) — one assignment

  for (let i = 0; i < arr.length; i++) {  // loop runs n times
    sum += arr[i];           // O(1) per iteration
  }

  for (let i = 0; i < arr.length; i++) {  // loop runs n times
    product *= arr[i];       // O(1) per iteration
  }

  return [sum, product];    // O(1)
}

// Total: O(1) + O(1) + O(n) + O(n) + O(1)
//      = O(2n + 3)
//      = O(n)   ← drop the constant and smaller terms`}
        />

        <Callout type="tip" title="The quick mental model">
          <p>
            See a single loop over the input? Think O(n). See nested loops?
            Think O(n²). See the input getting halved each step? Think O(log
            n). See no loops at all, just math or lookups? Think O(1). This
            covers most cases you will encounter in interviews.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. Space Complexity ───────────── */}
      <div className="section">
        <h2>Space Complexity</h2>
        <p>
          So far we have focused on time — how many operations an algorithm
          performs. But algorithms also use <strong>memory</strong>, and that
          matters too. Space complexity measures how much{" "}
          <strong>additional memory</strong> your algorithm needs as the input
          grows. We sometimes call this <strong>auxiliary space</strong> to
          distinguish it from the space taken up by the input itself.
        </p>

        <h3>Rules for Space in JavaScript</h3>
        <ul>
          <li>
            <strong>Most primitives</strong> (numbers, booleans, undefined,
            null) take <strong>O(1)</strong> space — they are a fixed size.
          </li>
          <li>
            <strong>Strings</strong> take <strong>O(n)</strong> space where n
            is the string length.
          </li>
          <li>
            <strong>Arrays and objects</strong> take <strong>O(n)</strong>{" "}
            space where n is the number of elements or keys.
          </li>
        </ul>

        <CodeBlock
          title="O(1) space"
          code={`function sum(arr) {
  let total = 0;           // one number — O(1)
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];       // reassigning the same variable
  }
  return total;
}
// No matter how big arr is, we only ever create
// two variables (total and i). Space: O(1)`}
        />

        <CodeBlock
          title="O(n) space"
          code={`function double(arr) {
  const newArr = [];       // new array that will grow
  for (let i = 0; i < arr.length; i++) {
    newArr.push(2 * arr[i]);
  }
  return newArr;
}
// newArr grows proportionally with the input.
// If arr has n elements, newArr will also have n elements.
// Space: O(n)`}
        />

        <Callout type="interview" title="Always state both">
          <p>
            When analyzing a solution, always state both time and space
            complexity. For example: "This solution is O(n) time and O(1)
            space." Interviewers appreciate when you mention both without
            being prompted.
          </p>
        </Callout>

        <CodeBlock
          title="Space complexity with objects"
          code={`function charCount(str) {
  const counts = {};
  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
}
// The counts object grows with the number of unique characters.
// For a lowercase-only string, that is at most 26 keys → O(1)
// For arbitrary Unicode, it could be up to O(n) in the worst case.
// Context matters! In an interview, clarify your assumptions.`}
        />
      </div>

      {/* ───────────── 6. Common Big O Values ───────────── */}
      <div className="section">
        <h2>Common Big O Complexities</h2>
        <p>
          Here is a reference table of the most common Big O values, ordered
          from fastest to slowest. You should know all of these:
        </p>

        <ComplexityTable
          headers={["Name", "Big O", "Rating", "Example"]}
          rows={[
            ["Constant", "O(1)", "O(1)", "Hash table lookup, array access by index"],
            ["Logarithmic", "O(log n)", "O(log n)", "Binary search"],
            ["Linear", "O(n)", "O(n)", "Simple loop through an array"],
            ["Linearithmic", "O(n log n)", "O(n log n)", "Merge sort, efficient sorting"],
            ["Quadratic", "O(n^2)", "O(n^2)", "Nested loops, bubble sort"],
            ["Exponential", "O(2^n)", "O(2^n)", "Recursive Fibonacci (naive)"],
            ["Factorial", "O(n!)", "O(n!)", "Generating all permutations"],
          ]}
        />

        <p>
          To put these numbers in perspective, here is what happens when n =
          1,000:
        </p>
        <ul>
          <li>
            <strong>O(1):</strong> 1 operation
          </li>
          <li>
            <strong>O(log n):</strong> ~10 operations
          </li>
          <li>
            <strong>O(n):</strong> 1,000 operations
          </li>
          <li>
            <strong>O(n log n):</strong> ~10,000 operations
          </li>
          <li>
            <strong>O(n²):</strong> 1,000,000 operations
          </li>
          <li>
            <strong>O(2^n):</strong> a number with 301 digits (more than atoms
            in the universe)
          </li>
          <li>
            <strong>O(n!):</strong> a number so large it is essentially
            infinity
          </li>
        </ul>

        <Callout type="warning" title="Anything beyond O(n²) is trouble">
          <p>
            In practice, O(n²) is usually the upper limit of what is
            acceptable for moderate input sizes (a few thousand). If your
            solution is O(2^n) or O(n!), it will only work for very small
            inputs (n &lt; 20 or so). If an interviewer's input is larger than
            that, you need a better approach.
          </p>
        </Callout>

        <CodeBlock
          title="O(1) — Constant time"
          code={`function getFirst(arr) {
  return arr[0];  // always one operation, no matter the array size
}

function isEven(n) {
  return n % 2 === 0;  // one check, always
}`}
        />

        <CodeBlock
          title="O(n) — Linear time"
          code={`function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
// We visit every element once → O(n)`}
        />

        <CodeBlock
          title="O(n²) — Quadratic time"
          code={`function hasDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
// Nested loop comparing every pair → O(n²)
// (A Set-based approach would be O(n) — always look for improvements!)`}
        />

        <CodeBlock
          title="O(n²) improved to O(n) using a Set"
          code={`function hasDuplicates(arr) {
  const seen = new Set();
  for (const val of arr) {
    if (seen.has(val)) return true;
    seen.add(val);
  }
  return false;
}
// One pass through the array, Set lookup is O(1) → O(n) time, O(n) space
// Classic time-space tradeoff: we use more memory to get a faster solution`}
        />
      </div>

      {/* ───────────── 7. Logarithms ───────────── */}
      <div className="section">
        <h2>Logarithms — Demystified</h2>
        <p>
          If you see O(log n) and feel a spike of math anxiety, you are not
          alone. But the concept is simpler than it sounds.
        </p>
        <p>
          A logarithm answers the question:{" "}
          <strong>
            how many times do you need to divide n by 2 until you get to 1?
          </strong>
        </p>
        <ul>
          <li>log₂(8) = 3 — because 8 / 2 / 2 / 2 = 1 (three divisions)</li>
          <li>
            log₂(16) = 4 — because 16 / 2 / 2 / 2 / 2 = 1 (four divisions)
          </li>
          <li>
            log₂(1,000,000) ≈ 20 — a million items, only ~20 steps!
          </li>
        </ul>
        <p>
          That is why O(log n) is so powerful. Even with enormous inputs, the
          number of operations stays remarkably small.
        </p>

        <Callout type="info" title="We almost always mean log base 2">
          <p>
            In computer science, when we write log n without specifying the
            base, we almost always mean log base 2 (log₂). This makes sense
            because so many algorithms work by repeatedly splitting things in
            half. In Big O, the base does not technically matter (log₂ n and
            log₁₀ n differ only by a constant factor), but conceptually it
            helps to think "dividing by 2."
          </p>
        </Callout>

        <h3>Where Logarithms Appear</h3>

        <p>
          <strong>Binary search</strong> is the textbook example. You start
          with a sorted array and repeatedly cut the search space in half:
        </p>

        <CodeBlock
          title="Binary Search — O(log n)"
          code={`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;  // not found
}

// With 1,000,000 elements, this finds the answer in ~20 steps.
// A linear search would take up to 1,000,000 steps.`}
        />

        <p>Other places logarithms show up:</p>
        <ul>
          <li>
            <strong>Efficient sorting algorithms</strong> — merge sort and
            quicksort are O(n log n). They divide the data in half
            recursively (log n levels of recursion) and do O(n) work at each
            level.
          </li>
          <li>
            <strong>Balanced binary trees</strong> — searching, inserting, and
            deleting are O(log n) because the tree height is logarithmic.
          </li>
          <li>
            <strong>Certain recursive algorithms</strong> — any time a
            recursive function halves the problem at each step, you get a
            logarithmic component.
          </li>
        </ul>

        <CodeBlock
          title="Recursive halving — O(log n)"
          code={`function countHalves(n) {
  let count = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    count++;
  }
  return count;
}

countHalves(1024);   // 10  (2^10 = 1024)
countHalves(1000000); // 19`}
        />

        <Callout type="tip" title="The pattern to spot">
          <p>
            Whenever you see an algorithm that <strong>eliminates half</strong>{" "}
            of the remaining data at each step, think O(log n). This is one
            of the most powerful patterns in computer science.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. Analyzing Your Own Code ───────────── */}
      <div className="section">
        <h2>Analyzing Your Own Code</h2>
        <p>
          Here is a step-by-step approach you can follow every time:
        </p>
        <ol>
          <li>
            <strong>Identify the input.</strong> What is n? It is usually the
            length of an array, the size of a string, or the number itself.
          </li>
          <li>
            <strong>Find the loops.</strong> Each loop that runs proportional
            to n contributes a factor of n. Nested loops multiply.
          </li>
          <li>
            <strong>Check for halving.</strong> If each iteration cuts the
            problem in half, that is a log n factor.
          </li>
          <li>
            <strong>Count the extra memory.</strong> Are you creating new
            arrays, objects, or strings that grow with the input? That affects
            space complexity.
          </li>
          <li>
            <strong>Simplify.</strong> Drop constants and smaller terms.
          </li>
        </ol>

        <CodeBlock
          title="Practice: What is the complexity?"
          code={`function mystery(arr) {
  const result = [];                    // new array → space depends on size

  for (let i = 0; i < arr.length; i++) {        // O(n)
    for (let j = 0; j < arr.length; j++) {      // O(n) per iteration of i
      result.push(arr[i] + arr[j]);             // O(1) operation
    }
  }

  return result;
}

// Time:  O(n) * O(n) = O(n²)
// Space: result has n * n = n² elements → O(n²)
// Answer: O(n²) time and O(n²) space`}
        />

        <CodeBlock
          title="Practice: Multiple inputs"
          code={`function merge(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) { result.push(arr1[i]); i++; }
  while (j < arr2.length) { result.push(arr2[j]); j++; }

  return result;
}

// When there are two inputs, use two variables!
// Let n = arr1.length, m = arr2.length
// Time:  O(n + m)
// Space: O(n + m)`}
        />

        <Callout type="warning" title="Watch out for hidden loops">
          <p>
            Some built-in methods hide loops. In JavaScript:{" "}
            <code>Array.includes()</code>, <code>Array.indexOf()</code>,{" "}
            <code>Array.slice()</code>, <code>Array.splice()</code>,{" "}
            <code>Array.concat()</code>, <code>String.match()</code>, and
            spread syntax (<code>[...arr]</code>) are all O(n). If you call
            one of these inside a loop, you might have O(n²) without
            realizing it.
          </p>
        </Callout>
      </div>

      {/* ───────────── 9. Common Patterns ───────────── */}
      <div className="section">
        <h2>Quick Reference: Common Patterns</h2>

        <ComplexityTable
          headers={["Pattern", "Time Complexity", "Space Complexity"]}
          rows={[
            ["Single loop over input", "O(n)", "O(1)"],
            ["Two separate loops over input", "O(n)", "O(1)"],
            ["Nested loop (same array)", "O(n^2)", "O(1)"],
            ["Loop + hash map for lookups", "O(n)", "O(n)"],
            ["Sorting then scanning", "O(n log n)", "O(1)"],
            ["Binary search", "O(log n)", "O(1)"],
            ["Generating all subsets", "O(2^n)", "O(2^n)"],
            ["Generating all permutations", "O(n!)", "O(n!)"],
            ["BFS / DFS on a graph", "O(n)", "O(n)"],
          ]}
        />
      </div>

      {/* ───────────── 10. Tips & Interview Callouts ───────────── */}
      <div className="section">
        <h2>Tips and Interview Advice</h2>

        <Callout type="interview" title="Name the complexity out loud">
          <p>
            Do not wait for the interviewer to ask. As soon as you finish
            writing your solution, say: "This is O(n) time and O(n) space
            because we iterate through the array once and store results in a
            hash map." Proactively analyzing complexity shows maturity and
            confidence.
          </p>
        </Callout>

        <Callout type="interview" title="Discuss tradeoffs">
          <p>
            If you can see a brute-force O(n²) solution and a smarter O(n)
            solution that uses extra memory, mention both. Say: "The brute
            force is O(n²) time and O(1) space. We can improve to O(n) time
            by using a hash map, which takes O(n) space. It is a classic
            time-space tradeoff." Interviewers love hearing you think about
            tradeoffs.
          </p>
        </Callout>

        <Callout type="interview" title="Know your built-in complexities">
          <p>
            JavaScript developers should know: Object/Map get and set are
            O(1). Set add, has, and delete are O(1). Array push and pop are
            O(1). Array shift, unshift, splice, and includes are O(n).
            Array.sort() is O(n log n). Knowing these helps you analyze code
            that uses standard library methods.
          </p>
        </Callout>

        <Callout type="tip" title="Best, average, and worst case">
          <p>
            Big O typically describes the <strong>worst case</strong>. But
            sometimes interviewers ask about best and average cases too.
            Quicksort is a classic example: it is O(n log n) on average but
            O(n²) in the worst case. Be ready to discuss the distinction if
            it comes up.
          </p>
        </Callout>

        <Callout type="tip" title="Amortized complexity">
          <p>
            Some operations are expensive occasionally but cheap most of the
            time. For example, JavaScript's <code>Array.push()</code> is O(1){" "}
            <em>amortized</em> — occasionally the engine needs to resize the
            underlying storage (which is O(n)), but this happens so
            infrequently that each push averages out to O(1). You do not need
            to dive deep into amortized analysis, but knowing the term exists
            shows depth.
          </p>
        </Callout>

        <Callout type="warning" title="Do not over-optimize">
          <p>
            Big O is not everything. An O(n) solution with a huge constant
            factor might be slower in practice than an O(n log n) solution
            for reasonable input sizes. Write clean, correct code first. Then
            optimize the parts that actually matter. In interviews, however,
            aim for the best Big O you can achieve — that is what they are
            testing.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            Big O describes how algorithm performance scales with input size.
          </li>
          <li>
            Focus on the <strong>dominant term</strong> and drop constants.
          </li>
          <li>
            <strong>Time complexity</strong> counts operations;{" "}
            <strong>space complexity</strong> counts memory.
          </li>
          <li>
            O(1) and O(log n) are great. O(n) and O(n log n) are solid. O(n²)
            is acceptable for small inputs. Beyond that, look for a better
            algorithm.
          </li>
          <li>
            When you see halving, think logarithms. When you see nested loops,
            think multiplication.
          </li>
          <li>
            Always state both time and space complexity in interviews, and
            discuss tradeoffs when possible.
          </li>
        </ul>
      </div>

      <TopicNav slug="big-o" />
    </div>
  );
}
