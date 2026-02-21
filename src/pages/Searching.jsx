import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function Searching() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Searching Algorithms
      </p>

      <h1 className="topic-title">Searching Algorithms</h1>
      <p className="topic-subtitle">
        Searching is one of the most fundamental operations in programming. You
        have data, and you need to find something in it. The way you search
        determines whether your code runs in milliseconds or minutes — and in
        interviews, choosing the right search strategy is often the key insight
        that separates a brute-force answer from an optimal one.
      </p>

      {/* ───────────── 1. Linear Search ───────────── */}
      <div className="section">
        <h2>Linear Search</h2>
        <p>
          Linear search is the simplest searching algorithm there is. The idea
          could not be more straightforward: start at the beginning, look at
          every single element, and check if it is the one you are looking for.
          If you find it, great — return it. If you reach the end without
          finding it, the element is not there.
        </p>
        <p>
          You have already used linear search countless times without thinking
          about it. Every time you call one of these JavaScript built-in methods,
          the engine is performing a linear search under the hood:
        </p>
        <ul>
          <li>
            <code>Array.indexOf()</code> — returns the index of the first
            matching element, or -1
          </li>
          <li>
            <code>Array.includes()</code> — returns true if the element exists
          </li>
          <li>
            <code>Array.find()</code> — returns the first element that satisfies
            a callback
          </li>
          <li>
            <code>Array.findIndex()</code> — returns the index of the first
            element that satisfies a callback
          </li>
        </ul>
        <p>
          All of these iterate through the array from start to finish in the
          worst case. There is no shortcut — if the element is not there, or if
          it happens to be the very last one, every single element gets checked.
        </p>

        <CodeBlock
          title="Linear Search Implementation"
          code={`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;  // found it — return the index
    }
  }
  return -1;  // not found
}

linearSearch([10, 15, 20, 25, 30], 20);  // 2
linearSearch([10, 15, 20, 25, 30], 99);  // -1`}
        />

        <p>
          The complexity is easy to reason about. In the <strong>best case</strong>,
          the target is the very first element — that is O(1). In the{" "}
          <strong>worst case</strong> (element is last or not present), we check
          every element — that is O(n). On <strong>average</strong>, we check
          about half the elements, which is still O(n) after dropping the
          constant.
        </p>

        <ComplexityTable
          headers={["Case", "Time Complexity", "Space Complexity"]}
          rows={[
            ["Best", "O(1)", "O(1)"],
            ["Average", "O(n)", "O(1)"],
            ["Worst", "O(n)", "O(1)"],
          ]}
        />

        <Callout type="info" title="When linear search is perfectly fine">
          <p>
            Linear search gets a bad reputation because it is "slow," but it is
            the right choice in many situations. If your data is unsorted, you
            have no choice — you have to look at everything. If your array is
            small (a few hundred elements), the difference between O(n) and
            O(log n) is negligible. Do not over-engineer a binary search when a
            simple <code>includes()</code> call does the job.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Binary Search ───────────── */}
      <div className="section">
        <h2>Binary Search</h2>
        <p>
          Binary search is one of the most important algorithms you will ever
          learn. It is dramatically faster than linear search, but it comes with
          one critical requirement:{" "}
          <strong>the data must be sorted</strong>. If the array is not sorted,
          binary search simply does not work — the logic falls apart.
        </p>
        <p>
          The idea is a <strong>divide and conquer</strong> approach. Instead of
          checking every element, you start in the middle. If the middle element
          is your target, you are done. If the target is smaller, you know it
          must be in the left half — so you throw away the entire right half. If
          the target is larger, you throw away the left half. Then you repeat
          on the remaining half.
        </p>
        <p>
          Every single step cuts the search space in half. That is the magic.
        </p>

        <CodeBlock
          title="Binary Search Implementation"
          code={`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;       // found it
    } else if (arr[mid] < target) {
      left = mid + 1;   // target is in the right half
    } else {
      right = mid - 1;  // target is in the left half
    }
  }

  return -1;  // not found
}

binarySearch([1, 3, 5, 7, 9, 11, 13, 15], 9);   // 4
binarySearch([1, 3, 5, 7, 9, 11, 13, 15], 10);  // -1`}
        />

        <Callout type="warning" title="The sorted requirement is non-negotiable">
          <p>
            This is the single most common mistake people make with binary
            search. If you use it on an unsorted array, you will get wrong
            answers — not an error, just silently incorrect results. Always
            confirm the data is sorted before reaching for binary search. In an
            interview, explicitly state: "Since the array is sorted, we can use
            binary search."
          </p>
        </Callout>

        <h3>Walking Through an Example</h3>
        <p>
          Let's trace through <code>binarySearch([1, 3, 5, 7, 9, 11, 13], 11)</code>{" "}
          step by step to see how the algorithm narrows things down:
        </p>
        <ol>
          <li>
            <strong>Step 1:</strong> left = 0, right = 6, mid = 3.{" "}
            arr[3] = 7. Target 11 is greater than 7, so set left = 4. We just
            eliminated the entire left half [1, 3, 5, 7].
          </li>
          <li>
            <strong>Step 2:</strong> left = 4, right = 6, mid = 5.{" "}
            arr[5] = 11. That is our target! Return 5.
          </li>
        </ol>
        <p>
          With 7 elements, linear search could have taken up to 7 comparisons.
          Binary search found the answer in just 2. And the difference only
          grows as the array gets bigger.
        </p>

        <h3>Why O(log n) Is So Powerful</h3>
        <p>
          The time complexity of binary search is <strong>O(log n)</strong>.
          Here is an intuitive way to understand why that is incredibly
          efficient: every time you double the size of the input, binary search
          only needs <strong>one extra step</strong>.
        </p>
        <ul>
          <li>16 elements: at most 4 steps</li>
          <li>32 elements: at most 5 steps</li>
          <li>1,024 elements: at most 10 steps</li>
          <li>1,000,000 elements: at most 20 steps</li>
          <li>1,000,000,000 elements: at most 30 steps</li>
        </ul>
        <p>
          Think about that. You could search through a billion sorted items in
          about 30 comparisons. A linear search on the same data would need up
          to a billion comparisons. The difference is astronomical.
        </p>

        <ComplexityTable
          headers={["Case", "Time Complexity", "Space Complexity"]}
          rows={[
            ["Best", "O(1)", "O(1)"],
            ["Average", "O(log n)", "O(1)"],
            ["Worst", "O(log n)", "O(1)"],
          ]}
        />

        <Callout type="tip" title="Common binary search variations">
          <p>
            In interviews, binary search does not always look like "find this
            exact value." You might be asked to find the first occurrence of a
            value, the insertion point, the closest value, or even use binary
            search on the answer space itself (e.g., "what is the minimum
            capacity such that..."). The core idea is always the same: eliminate
            half the possibilities at each step.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Naive String Search ───────────── */}
      <div className="section">
        <h2>Naive String Search</h2>
        <p>
          Searching for a substring inside a longer string is another classic
          problem. The naive approach uses nested loops: the outer loop picks a
          starting position in the long string, and the inner loop checks
          character by character whether the short string matches starting at
          that position.
        </p>

        <CodeBlock
          title="Naive String Search Implementation"
          code={`function naiveStringSearch(long, short) {
  let count = 0;

  for (let i = 0; i <= long.length - short.length; i++) {
    let match = true;

    for (let j = 0; j < short.length; j++) {
      if (long[i + j] !== short[j]) {
        match = false;
        break;  // no need to keep checking this position
      }
    }

    if (match) {
      count++;
    }
  }

  return count;
}

naiveStringSearch("lorie loled", "lol");  // 1
naiveStringSearch("wowomgzomg", "omg");  // 2`}
        />

        <p>
          The outer loop runs roughly n times (where n is the length of the
          longer string), and the inner loop runs up to m times (where m is the
          length of the shorter string). In the worst case, that gives us{" "}
          <strong>O(n * m)</strong> time complexity. For most practical strings,
          the inner loop breaks early, so the average case tends to be better.
          But the worst case is real — imagine searching for "aaaaab" in a
          string of a million "a"s.
        </p>

        <ComplexityTable
          headers={["Case", "Time Complexity", "Space Complexity"]}
          rows={[
            ["Best", "O(n)", "O(1)"],
            ["Average", "O(n)", "O(1)"],
            ["Worst", "O(n * m)", "O(1)"],
          ]}
        />

        <Callout type="info" title="Better string search algorithms exist">
          <p>
            The naive approach is fine for learning and for short strings, but
            there are much faster algorithms for string searching:{" "}
            <strong>KMP (Knuth-Morris-Pratt)</strong> runs in O(n + m) by
            preprocessing the pattern to avoid redundant comparisons.{" "}
            <strong>Boyer-Moore</strong> and <strong>Rabin-Karp</strong> are
            other well-known alternatives. You probably will not be asked to
            implement these in a typical interview, but knowing they exist shows
            depth.
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. Comparison Table ───────────── */}
      <div className="section">
        <h2>Searching Algorithms Comparison</h2>
        <p>
          Here is a side-by-side comparison of the searching algorithms we have
          covered. Use this as a quick reference:
        </p>

        <ComplexityTable
          headers={["Algorithm", "Best", "Average", "Worst", "Space"]}
          rows={[
            ["Linear Search", "O(1)", "O(n)", "O(n)", "O(1)"],
            ["Binary Search", "O(1)", "O(log n)", "O(log n)", "O(1)"],
            ["Naive String Search", "O(n)", "O(n)", "O(n * m)", "O(1)"],
          ]}
        />

        <p>
          Notice that all three algorithms use <strong>O(1) space</strong> —
          they search in place without creating additional data structures. The
          difference is entirely in time complexity, and it is a massive
          difference. Binary search's O(log n) is in a completely different
          league from linear search's O(n), especially at scale.
        </p>
      </div>

      {/* ───────────── 5. When to Use Which ───────────── */}
      <div className="section">
        <h2>When to Use Which</h2>
        <p>
          Choosing the right search algorithm is not complicated once you know
          the rules:
        </p>
        <ul>
          <li>
            <strong>Data is sorted?</strong> Always prefer{" "}
            <strong>binary search</strong>. There is no reason to scan linearly
            through sorted data when you can eliminate half at each step.
          </li>
          <li>
            <strong>Data is unsorted?</strong> You have two options. If you
            only need to search once, just use <strong>linear search</strong> —
            sorting the array first would take O(n log n), which is worse than
            the O(n) linear search itself. But if you need to search the same
            data many times, it is worth sorting it first (O(n log n) one-time
            cost) and then using binary search (O(log n) per query) for all
            subsequent lookups.
          </li>
          <li>
            <strong>Need even faster lookups?</strong> If you are doing many
            searches and can afford extra memory, consider using a{" "}
            <strong>hash table</strong> (JavaScript object or Map) for O(1)
            lookups. This is often the real answer in interviews.
          </li>
          <li>
            <strong>Searching for substrings?</strong> For simple cases, the
            naive approach or built-in <code>String.includes()</code> is fine.
            For performance-critical applications with very long strings, look
            into KMP or similar algorithms.
          </li>
        </ul>

        <Callout type="tip" title="The sort-then-search tradeoff">
          <p>
            Sorting takes O(n log n). A single binary search takes O(log n). A
            single linear search takes O(n). So if you search k times:
          </p>
          <ul>
            <li>
              <strong>Linear approach:</strong> O(k * n) total
            </li>
            <li>
              <strong>Sort + binary approach:</strong> O(n log n + k * log n)
              total
            </li>
          </ul>
          <p>
            The sort-then-search strategy wins when k is large enough that{" "}
            k * n &gt; n log n + k * log n. In practice, even a modest number of
            searches makes sorting worthwhile.
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="Always ask if the data is sorted">
          <p>
            This is one of the most important clarifying questions you can ask
            in an interview. If the interviewer says the array is sorted, that
            is a massive hint that binary search (or a two-pointer approach) is
            the way to go. If they say it is not sorted, you know you need a
            different strategy — possibly a hash map for O(1) lookups.
          </p>
        </Callout>

        <Callout type="interview" title="Know binary search cold">
          <p>
            Binary search is deceptively tricky to implement correctly. The
            off-by-one errors with left, right, and mid trip up even experienced
            developers. Practice writing it from scratch until you can do it
            without hesitation. Pay special attention to the while condition
            (left &lt;= right, not left &lt; right) and how you update left and
            right (mid + 1 and mid - 1, not just mid).
          </p>
        </Callout>

        <Callout type="interview" title="Recognize binary search in disguise">
          <p>
            Many interview problems are binary search problems in disguise. Any
            time you see a sorted array, a rotated sorted array, a "find the
            minimum/maximum that satisfies a condition" problem, or a "search
            in a matrix" problem, binary search should be the first tool you
            reach for. The pattern is always the same: can I eliminate half the
            search space with one comparison?
          </p>
        </Callout>

        <Callout type="interview" title="State your search strategy explicitly">
          <p>
            Before writing code, tell the interviewer your plan: "The array is
            sorted, so I will use binary search. I will maintain two pointers,
            left and right, and repeatedly check the midpoint. This gives us
            O(log n) time and O(1) space." This kind of structured thinking
            makes a strong impression and gives the interviewer confidence in
            your approach before you write a single line of code.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            <strong>Linear search</strong> checks every element. It works on any
            data but is O(n). JavaScript's indexOf, includes, find, and
            findIndex all use it internally.
          </li>
          <li>
            <strong>Binary search</strong> eliminates half the search space at
            each step. It requires sorted data but runs in O(log n) — an
            enormous improvement at scale.
          </li>
          <li>
            <strong>Naive string search</strong> uses nested loops to find
            substrings. It is O(n * m) in the worst case, where n and m are the
            lengths of the long and short strings.
          </li>
          <li>
            If you need to search unsorted data many times, sort it first and
            then use binary search. The one-time O(n log n) sorting cost pays
            for itself quickly.
          </li>
          <li>
            For the fastest possible lookups, use a hash table (Object, Map, or
            Set) for O(1) access — but that trades space for time.
          </li>
          <li>
            In interviews, always ask if the data is sorted, and always state
            your search strategy and its complexity before you start coding.
          </li>
        </ul>
      </div>

      <TopicNav slug="searching" />
    </div>
  );
}
