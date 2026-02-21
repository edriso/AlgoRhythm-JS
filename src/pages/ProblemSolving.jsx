import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function ProblemSolving() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Problem Solving Patterns
      </p>

      <h1 className="topic-title">Problem Solving Patterns</h1>
      <p className="topic-subtitle">
        Knowing data structures and algorithms is only half the battle. The
        other half is having a <strong>strategy</strong> for approaching
        problems you have never seen before. This page covers a general
        problem-solving framework and four powerful patterns that show up again
        and again in coding interviews: Frequency Counter, Multiple Pointers,
        Sliding Window, and Divide and Conquer.
      </p>

      {/* ───────────── 1. Problem Solving Strategies ───────────── */}
      <div className="section">
        <h2>A Problem Solving Framework</h2>
        <p>
          Before we dive into specific patterns, let's talk about how to
          approach <em>any</em> problem — whether it is a LeetCode question, a
          take-home challenge, or a whiteboard interview. This framework comes
          from Colt Steele's approach, which itself draws from George Polya's
          classic book <em>How to Solve It</em>. The steps are simple, but
          following them consistently is what separates candidates who get stuck
          from candidates who methodically work through problems.
        </p>

        <h3>Step 1: Understand the Problem</h3>
        <p>
          Before you write a single line of code, make sure you truly understand
          what is being asked. It sounds obvious, but in the pressure of an
          interview, many people start coding before they even know what their
          function should return. Ask yourself these questions:
        </p>
        <ul>
          <li>
            <strong>Can I restate the problem in my own words?</strong> If you
            cannot explain it simply, you do not understand it yet.
          </li>
          <li>
            <strong>What are the inputs?</strong> What type of data goes in? How
            many inputs? Can they be negative? Can they be empty? Are they
            always sorted?
          </li>
          <li>
            <strong>What are the outputs?</strong> What should the function
            return? A number? An array? A boolean? A string?
          </li>
          <li>
            <strong>Do I have enough information to solve this?</strong> Are
            there edge cases or ambiguities I need to clarify?
          </li>
          <li>
            <strong>How should I label the important pieces of data?</strong>{" "}
            What variable names make sense for this problem?
          </li>
        </ul>

        <Callout type="interview" title="Always ask clarifying questions">
          <p>
            In an interview, restating the problem and asking clarifying
            questions is not a sign of weakness — it is a sign of maturity.
            Interviewers <em>want</em> you to ask questions. "Can the input
            array be empty?" "Are the numbers always positive?" "Is the array
            always sorted?" These questions show that you think about edge cases
            and do not make dangerous assumptions.
          </p>
        </Callout>

        <h3>Step 2: Explore Concrete Examples</h3>
        <p>
          Work through examples by hand before you code. This helps you
          understand the problem better and often reveals patterns you would
          miss otherwise. Progress through examples in this order:
        </p>
        <ol>
          <li>
            <strong>Start with simple examples.</strong> The most basic, happy
            path inputs and their expected outputs.
          </li>
          <li>
            <strong>Move to more complex examples.</strong> Larger inputs,
            inputs with duplicates, inputs that are almost-but-not-quite sorted,
            etc.
          </li>
          <li>
            <strong>Try empty inputs.</strong> What should happen when the input
            is an empty string or an empty array?
          </li>
          <li>
            <strong>Try invalid inputs.</strong> What if the user passes in null,
            undefined, a number instead of a string, or negative values?
          </li>
        </ol>

        <CodeBlock
          title="Example: exploring charCount('hello')"
          code={`// Problem: write a function that counts each character in a string

// Simple example:
charCount("hello")
// { h: 1, e: 1, l: 2, o: 1 }

// More complex:
charCount("Hello Hi")
// Should uppercase and lowercase be treated the same?
// Do we count spaces? What about numbers? Punctuation?

// Empty input:
charCount("")
// Return {}? Return null? Throw an error?

// Invalid input:
charCount(123)
// Return undefined? Throw a TypeError?

// Asking these questions BEFORE coding saves you from
// rewriting your solution halfway through.`}
        />

        <h3>Step 3: Break It Down</h3>
        <p>
          Before you start writing real code, write out the steps of your
          solution in pseudocode or comments. This forces you to think through
          the logic without getting distracted by syntax. It also gives the
          interviewer visibility into your thought process — even if you run out
          of time, they can see you were on the right track.
        </p>

        <CodeBlock
          title="Breaking down charCount"
          code={`function charCount(str) {
  // create an object to return at the end
  // loop over the string
    // for each character...
      // if it is a letter/number AND already in the object, increment the count
      // if it is a letter/number AND not in the object, add it with a value of 1
      // if it is something else (space, punctuation), do nothing
  // return the object
}`}
        />

        <Callout type="tip" title="Pseudocode is your safety net">
          <p>
            Even if you are confident you know the solution, writing pseudocode
            first has a hidden benefit: if you get stuck on the implementation,
            the interviewer can see exactly where you are in your thought
            process and can give you a targeted hint. Without pseudocode, they
            have no idea what you are trying to do and cannot help you
            effectively.
          </p>
        </Callout>

        <h3>Step 4: Solve or Simplify</h3>
        <p>
          Now start coding. If you can solve the whole problem, great — do it.
          But if part of the problem is tripping you up, do not let it block
          you entirely. <strong>Simplify</strong> by solving everything you
          can, and skip the hard part temporarily. This is crucial:
        </p>
        <ul>
          <li>
            If you cannot figure out how to handle lowercase vs uppercase,
            ignore that part and just get the basic counting working first.
          </li>
          <li>
            If the edge case for empty arrays is confusing you, handle the
            normal case first and come back.
          </li>
          <li>
            Writing 80% of a working solution is infinitely better than staring
            at a blank editor for 10 minutes.
          </li>
        </ul>

        <CodeBlock
          title="A working (if incomplete) solution"
          code={`function charCount(str) {
  const result = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();
    if (result[char] > 0) {
      result[char]++;
    } else {
      result[char] = 1;
    }
  }
  return result;
}

// This works! It does not handle spaces or punctuation yet,
// but it is a solid foundation we can refine.`}
        />

        <h3>Step 5: Look Back and Refactor</h3>
        <p>
          Once you have a working solution, resist the urge to say "done!" and
          move on. Take a moment to examine your code critically:
        </p>
        <ul>
          <li>Can you improve the <strong>readability</strong>?</li>
          <li>Can you improve the <strong>performance</strong>?</li>
          <li>
            Can you derive the result differently? Is there another approach?
          </li>
          <li>Can you use this solution or method for some other problem?</li>
          <li>
            Does your solution handle all the edge cases from Step 2?
          </li>
        </ul>

        <CodeBlock
          title="Refactored charCount"
          code={`function charCount(str) {
  const obj = {};
  for (const char of str) {
    const c = char.toLowerCase();
    if (/[a-z0-9]/.test(c)) {
      obj[c] = (obj[c] || 0) + 1;
    }
  }
  return obj;
}

// Improvements:
// - for...of is cleaner than a manual index loop
// - regex filters out non-alphanumeric characters
// - (obj[c] || 0) + 1 replaces the if/else block`}
        />

        <CodeBlock
          title="Even more optimized (avoiding regex in a hot loop)"
          code={`function charCount(str) {
  const obj = {};
  for (const char of str) {
    const c = char.toLowerCase();
    // charCodeAt is faster than regex for single-char checks
    if (isAlphaNumeric(c)) {
      obj[c] = (obj[c] || 0) + 1;
    }
  }
  return obj;
}

function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);
  return (
    (code > 47 && code < 58) ||  // 0-9
    (code > 96 && code < 123)    // a-z
  );
}

// Using charCodeAt is roughly 55% faster than regex
// in most JavaScript engines. This kind of micro-optimization
// is great to mention in an interview — it shows depth.`}
        />

        <Callout type="interview" title="Refactoring impresses interviewers">
          <p>
            When you voluntarily refactor your own code without being asked, it
            signals that you care about code quality and that you can think
            critically about your own work. Even small improvements — like
            switching from a for loop to a for...of loop, or simplifying an
            if/else into a one-liner — demonstrate attention to craft.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Frequency Counter Pattern ───────────── */}
      <div className="section">
        <h2>Pattern 1: Frequency Counter</h2>
        <p>
          The Frequency Counter pattern uses objects or Maps to collect values
          and their frequencies. This eliminates the need for nested loops, and
          is one of the most common techniques for turning an O(n²) solution
          into an O(n) solution.
        </p>
        <p>
          The core idea is simple: instead of comparing elements to each other
          with nested loops, break each input down into a "profile" (an object
          that counts how often each value appears), and then compare the
          profiles. Two inputs that have the same profile share the same
          underlying structure.
        </p>

        <h3>Example: "same" — Squared Values</h3>
        <p>
          Write a function called <code>same</code> that accepts two arrays.
          The function should return <code>true</code> if every value in the
          first array has its corresponding value <strong>squared</strong> in
          the second array. The frequency of values must be the same — meaning
          if the first array has two 3s, the second array must have two 9s.
        </p>

        <CodeBlock
          title="same() examples"
          code={`same([1, 2, 3], [4, 1, 9])    // true
same([1, 2, 3], [1, 9])       // false (different lengths)
same([1, 2, 1], [4, 4, 1])    // false (frequencies don't match)
same([1, 2, 1], [4, 1, 1])    // true  (two 1s → two 1s, one 2 → one 4)`}
        />

        <h4>Naive Approach: O(n²)</h4>
        <p>
          The brute force approach loops through the first array, and for each
          element, searches for its square in the second array using{" "}
          <code>indexOf</code> (which itself loops through the second array).
          This gives us a nested loop structure.
        </p>

        <CodeBlock
          title="same() — Naive O(n²) solution"
          code={`function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    // indexOf loops through arr2 looking for arr1[i] ** 2
    const correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) return false;
    // Remove the found element so we don't match it again
    arr2.splice(correctIndex, 1);
  }

  return true;
}

// Time:  O(n²) — for each element in arr1, indexOf scans arr2
// Space: O(1)  — but we are mutating arr2! (destructive)`}
        />

        <Callout type="warning" title="Avoid mutating inputs">
          <p>
            The naive solution above uses <code>splice</code> to modify{" "}
            <code>arr2</code>. Mutating function arguments is generally a bad
            practice — the caller might not expect their array to be changed.
            In an interview, if you must mutate an input, mention it explicitly
            and acknowledge the tradeoff.
          </p>
        </Callout>

        <h4>Optimized Approach: O(n) with Frequency Counter</h4>
        <p>
          Instead of nested looping, we build a frequency counter for each
          array and then compare them. We loop through each array exactly once
          (to build the counters) and then loop through one counter's keys to
          compare. Three separate O(n) passes are still O(n).
        </p>

        <CodeBlock
          title="same() — Optimized O(n) solution"
          code={`function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const freq1 = {};
  const freq2 = {};

  // Count frequencies for arr1
  for (const val of arr1) {
    freq1[val] = (freq1[val] || 0) + 1;
  }

  // Count frequencies for arr2
  for (const val of arr2) {
    freq2[val] = (freq2[val] || 0) + 1;
  }

  // Compare: for each key in freq1, check that key² exists
  // in freq2 with the same count
  for (const key in freq1) {
    const squared = key ** 2;
    if (!(squared in freq2)) return false;
    if (freq2[squared] !== freq1[key]) return false;
  }

  return true;
}

// Time:  O(n) — three separate loops, each O(n)
// Space: O(n) — two frequency counter objects

same([1, 2, 3, 2], [9, 1, 4, 4])  // true
same([1, 2, 3], [1, 9])            // false`}
        />

        <Callout type="info" title="Why O(n) beats O(n²)">
          <p>
            Three separate O(n) loops give us O(3n), which simplifies to O(n).
            Compare that to the nested approach: with 1,000 elements, the naive
            solution does up to 1,000,000 operations while the frequency
            counter does about 3,000. That is a 333x improvement, and the gap
            only gets wider with larger inputs.
          </p>
        </Callout>

        <h3>Example: Anagram Checker</h3>
        <p>
          Given two strings, determine if the second string is an anagram of
          the first. An anagram is a rearrangement of the letters — like
          "cinema" and "iceman", or "listen" and "silent".
        </p>

        <CodeBlock
          title="validAnagram() examples"
          code={`validAnagram('', '')           // true
validAnagram('aaz', 'zza')     // false
validAnagram('anagram', 'nagaram') // true
validAnagram('rat', 'car')     // false
validAnagram('awesome', 'awesom') // false
validAnagram('qwerty', 'qeywrt') // true
validAnagram('texttwisttime', 'timetwisttext') // true`}
        />

        <CodeBlock
          title="validAnagram() — Frequency Counter solution"
          code={`function validAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  const lookup = {};

  // Build frequency counter from first string
  for (const char of str1) {
    lookup[char] = (lookup[char] || 0) + 1;
  }

  // Check second string against the counter
  for (const char of str2) {
    // If the letter is not there, or its count is already 0
    if (!lookup[char]) return false;
    lookup[char]--;
  }

  return true;
}

// Time:  O(n) where n is the length of the strings
// Space: O(n) for the lookup object (at most 26 keys for lowercase letters)

// How it works:
// 1. Build a frequency map from str1
// 2. For each char in str2, decrement the count
// 3. If any char is missing or over-counted, return false
// 4. If we get through the whole string, it is a valid anagram`}
        />

        <p>
          Let's trace through an example to see how this works:
        </p>

        <CodeBlock
          title="Tracing validAnagram('anagram', 'nagaram')"
          code={`// After building lookup from 'anagram':
// lookup = { a: 3, n: 1, g: 1, r: 1, m: 1 }

// Processing 'nagaram':
// 'n' → lookup = { a: 3, n: 0, g: 1, r: 1, m: 1 }
// 'a' → lookup = { a: 2, n: 0, g: 1, r: 1, m: 1 }
// 'g' → lookup = { a: 2, n: 0, g: 0, r: 1, m: 1 }
// 'a' → lookup = { a: 1, n: 0, g: 0, r: 1, m: 1 }
// 'r' → lookup = { a: 1, n: 0, g: 0, r: 0, m: 1 }
// 'a' → lookup = { a: 0, n: 0, g: 0, r: 0, m: 1 }
// 'm' → lookup = { a: 0, n: 0, g: 0, r: 0, m: 0 }
// All characters accounted for → return true`}
        />

        <Callout type="tip" title="One counter is enough">
          <p>
            Notice we only needed <em>one</em> frequency counter, not two.
            Build it from the first string, then decrement while looping through
            the second. If any count drops below zero (caught by the{" "}
            <code>!lookup[char]</code> check, which is falsy for both{" "}
            <code>undefined</code> and <code>0</code>), the strings are not
            anagrams. This uses less memory and is slightly simpler.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Multiple Pointers Pattern ───────────── */}
      <div className="section">
        <h2>Pattern 2: Multiple Pointers</h2>
        <p>
          The Multiple Pointers pattern involves creating pointers (or index
          values) that correspond to positions in a data structure and move
          toward the beginning, end, or middle based on a certain condition.
          This is extremely efficient for solving problems with minimal space
          complexity in <strong>sorted</strong> arrays or strings.
        </p>
        <p>
          The most common variant uses two pointers: one starting at the
          beginning and one at the end, and they walk toward each other until
          they meet. But pointers can also move in the same direction at
          different speeds (the "fast and slow" technique).
        </p>

        <h3>Example: sumZero</h3>
        <p>
          Write a function called <code>sumZero</code> that accepts a{" "}
          <strong>sorted</strong> array of integers. The function should find
          the <strong>first</strong> pair where the sum is zero. Return an
          array that includes both values, or <code>undefined</code> if no
          such pair exists.
        </p>

        <CodeBlock
          title="sumZero() examples"
          code={`sumZero([-3, -2, -1, 0, 1, 2, 3])  // [-3, 3]
sumZero([-2, 0, 1, 3])              // undefined
sumZero([1, 2, 3])                   // undefined
sumZero([-4, -3, -2, -1, 0, 1, 2, 5]) // [-2, 2]`}
        />

        <h4>Naive Approach: O(n²)</h4>

        <CodeBlock
          title="sumZero() — Naive O(n²) solution"
          code={`function sumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
  // No pair found
}

// Time:  O(n²) — nested loops comparing every pair
// Space: O(1)
// This ignores the fact that the array is sorted!`}
        />

        <h4>Optimized Approach: O(n) with Two Pointers</h4>
        <p>
          Since the array is sorted, we can use two pointers — one at the
          leftmost (most negative) element and one at the rightmost (most
          positive) element. If their sum is too big, move the right pointer
          left to make the sum smaller. If their sum is too small, move the
          left pointer right to make the sum bigger. If the sum is zero, we
          found our pair.
        </p>

        <CodeBlock
          title="sumZero() — Optimized O(n) solution"
          code={`function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      // Sum is too large — move right pointer left to decrease it
      right--;
    } else {
      // Sum is too small — move left pointer right to increase it
      left++;
    }
  }

  // No pair found
}

// Time:  O(n) — each pointer moves at most n times total
// Space: O(1) — only two variables, no extra data structures`}
        />

        <CodeBlock
          title="Tracing sumZero([-4, -3, -2, -1, 0, 1, 2, 5])"
          code={`// left = 0 (-4), right = 7 (5)  → sum = 1  → too big, right--
// left = 0 (-4), right = 6 (2)  → sum = -2 → too small, left++
// left = 1 (-3), right = 6 (2)  → sum = -1 → too small, left++
// left = 2 (-2), right = 6 (2)  → sum = 0  → FOUND IT! return [-2, 2]`}
        />

        <Callout type="info" title="Why this works">
          <p>
            The key insight is that the array is <strong>sorted</strong>. When
            the sum is too large, the only way to make it smaller is to replace
            the larger number with something smaller — which means moving the
            right pointer left. When the sum is too small, we need a bigger
            number on the left side — so we move the left pointer right. We
            never need to go backwards because we have already considered all
            smaller/larger combinations.
          </p>
        </Callout>

        <h3>Example: countUniqueValues</h3>
        <p>
          Write a function called <code>countUniqueValues</code> that accepts a{" "}
          <strong>sorted</strong> array and counts the unique values in it.
          There can be negative numbers, but it will always be sorted.
        </p>

        <CodeBlock
          title="countUniqueValues() examples"
          code={`countUniqueValues([1, 1, 1, 1, 1, 2])            // 2
countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]) // 7
countUniqueValues([])                                // 0
countUniqueValues([-2, -1, -1, 0, 1])               // 4`}
        />

        <p>
          This time both pointers move in the <strong>same direction</strong>.
          We use a slow pointer (<code>i</code>) that marks the position of the
          last unique value we have found, and a fast pointer (<code>j</code>)
          that scans ahead looking for the next unique value.
        </p>

        <CodeBlock
          title="countUniqueValues() — Two Pointers solution"
          code={`function countUniqueValues(arr) {
  if (arr.length === 0) return 0;

  let i = 0;  // slow pointer — marks last unique value

  for (let j = 1; j < arr.length; j++) {  // fast pointer
    if (arr[i] !== arr[j]) {
      // Found a new unique value!
      i++;
      arr[i] = arr[j];  // move it next to the previous unique value
    }
  }

  // i is the index of the last unique value, so count = i + 1
  return i + 1;
}

// Time:  O(n) — single pass through the array
// Space: O(1) — only two index variables`}
        />

        <CodeBlock
          title="Tracing countUniqueValues([1, 1, 2, 3, 3, 4, 5, 5, 5, 6])"
          code={`// Start: i = 0, j = 1
// arr[0]=1, arr[1]=1 → same, skip
// arr[0]=1, arr[2]=2 → different! i=1, arr[1]=2
// arr[1]=2, arr[3]=3 → different! i=2, arr[2]=3
// arr[2]=3, arr[4]=3 → same, skip
// arr[2]=3, arr[5]=4 → different! i=3, arr[3]=4
// arr[3]=4, arr[6]=5 → different! i=4, arr[4]=5
// arr[4]=5, arr[7]=5 → same, skip
// arr[4]=5, arr[8]=5 → same, skip
// arr[4]=5, arr[9]=6 → different! i=5, arr[5]=6
//
// Array is now: [1, 2, 3, 4, 5, 6, 5, 5, 5, 6]
//                ^^^^^^^^^^^^^^^^^ unique values
// i = 5, so return 5 + 1 = 6 unique values`}
        />

        <Callout type="interview" title="Multiple Pointers is a go-to pattern">
          <p>
            The Multiple Pointers pattern is one of the most frequently tested
            patterns in interviews. It comes up in problems involving sorted
            arrays, linked lists (fast/slow pointer for cycle detection), and
            string manipulation. When you see a problem with a{" "}
            <strong>sorted array</strong> and the constraint is to achieve{" "}
            <strong>O(1) space</strong>, think Multiple Pointers first.
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. Sliding Window Pattern ───────────── */}
      <div className="section">
        <h2>Pattern 3: Sliding Window</h2>
        <p>
          The Sliding Window pattern involves creating a "window" — which can
          be a single variable, a sub-array, or a sub-string — that slides
          through a larger data set. Instead of recalculating the entire window
          from scratch at each position, we keep a running computation and just
          update it with the element entering the window and the element leaving
          the window.
        </p>
        <p>
          This pattern is incredibly useful for problems involving contiguous
          sequences — things like "find the max sum of n consecutive elements,"
          "find the longest substring without repeating characters," or "find
          the smallest sub-array with a sum greater than or equal to a target."
        </p>

        <h3>Example: maxSubarraySum</h3>
        <p>
          Write a function called <code>maxSubarraySum</code> that accepts an
          array of integers and a number <code>n</code>. The function should
          calculate the maximum sum of <code>n</code> consecutive elements in
          the array.
        </p>

        <CodeBlock
          title="maxSubarraySum() examples"
          code={`maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)  // 10 (2 + 8)
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)  // 17 (2 + 5 + 2 + 8)
maxSubarraySum([4, 2, 1, 6], 1)            // 6
maxSubarraySum([4, 2, 1, 6, 2], 4)         // 13 (4 + 2 + 1 + 6)
maxSubarraySum([], 4)                       // null`}
        />

        <h4>Naive Approach: O(n * k)</h4>
        <p>
          The brute force approach checks every possible window of size{" "}
          <code>n</code> and calculates the sum from scratch each time. For
          each starting position, we sum <code>n</code> elements. With an
          array of length <code>n</code> and window size <code>k</code>, this
          gives us O(n * k).
        </p>

        <CodeBlock
          title="maxSubarraySum() — Naive O(n * k) solution"
          code={`function maxSubarraySum(arr, num) {
  if (num > arr.length) return null;

  // Start with -Infinity so it works with negative numbers
  let max = -Infinity;

  for (let i = 0; i <= arr.length - num; i++) {
    let temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) max = temp;
  }

  return max;
}

// Time:  O(n * k) where n is array length and k is window size
// Space: O(1)
//
// Problem: if the array has 1,000,000 elements and k is 100,000,
// this does 100 BILLION operations. Yikes.`}
        />

        <h4>Optimized Approach: O(n) with Sliding Window</h4>
        <p>
          The key insight is that consecutive windows overlap almost entirely.
          When we slide the window one position to the right, we lose one
          element from the left side and gain one element on the right side.
          So instead of recalculating the entire sum, we just subtract the
          departing element and add the arriving element.
        </p>

        <CodeBlock
          title="maxSubarraySum() — Optimized O(n) solution"
          code={`function maxSubarraySum(arr, num) {
  if (arr.length < num) return null;

  // Calculate the sum of the first window
  let windowSum = 0;
  for (let i = 0; i < num; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // Slide the window: subtract the element leaving, add the element entering
  for (let i = num; i < arr.length; i++) {
    windowSum = windowSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Time:  O(n) — one pass to create the initial window, one pass to slide it
// Space: O(1) — just two variables

// With 1,000,000 elements and k = 100,000:
// Naive:  100,000,000,000 operations
// Window: 1,000,000 operations
// That's a 100,000x improvement!`}
        />

        <CodeBlock
          title="Tracing maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3)"
          code={`// Step 1: Calculate first window sum
// [2, 6, 9] → windowSum = 17, maxSum = 17

// Step 2: Slide the window
// Remove 2, add 2: [6, 9, 2] → windowSum = 17, maxSum = 17
// Remove 6, add 1: [9, 2, 1] → windowSum = 12, maxSum = 17
// Remove 9, add 8: [2, 1, 8] → windowSum = 11, maxSum = 17
// Remove 2, add 5: [1, 8, 5] → windowSum = 14, maxSum = 17
// Remove 1, add 6: [8, 5, 6] → windowSum = 19, maxSum = 19  ← new max!
// Remove 8, add 3: [5, 6, 3] → windowSum = 14, maxSum = 19

// Return 19`}
        />

        <Callout type="tip" title="Fixed vs dynamic windows">
          <p>
            The example above uses a <strong>fixed-size window</strong> — the
            window is always exactly <code>num</code> elements wide. But many
            interview problems use a <strong>dynamic window</strong> where the
            window expands and contracts based on a condition (like "smallest
            sub-array whose sum is at least X"). The dynamic version typically
            uses a while loop inside the for loop to shrink the window. The
            concept is the same, but the implementation is a bit more involved.
          </p>
        </Callout>

        <CodeBlock
          title="Dynamic Sliding Window — Minimum sub-array with sum >= target"
          code={`function minSubArrayLen(arr, target) {
  let start = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let end = 0; end < arr.length; end++) {
    sum += arr[end];  // expand the window

    // Shrink the window as small as possible while sum >= target
    while (sum >= target) {
      minLen = Math.min(minLen, end - start + 1);
      sum -= arr[start];
      start++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

minSubArrayLen([2, 3, 1, 2, 4, 3], 7)  // 2 (because [4, 3] sums to 7)
minSubArrayLen([1, 1, 1, 1, 1], 11)     // 0 (no sub-array sums to 11)

// Time:  O(n) — each element is added once and removed once
// Space: O(1)`}
        />
      </div>

      {/* ───────────── 5. Divide and Conquer Pattern ───────────── */}
      <div className="section">
        <h2>Pattern 4: Divide and Conquer</h2>
        <p>
          Divide and Conquer involves dividing a data set into smaller chunks,
          processing those chunks independently, and then combining the
          results. This pattern is the basis of many well-known algorithms
          including merge sort, quicksort, and binary search.
        </p>
        <p>
          The general approach has three steps:
        </p>
        <ol>
          <li>
            <strong>Divide</strong> the problem into smaller subproblems.
          </li>
          <li>
            <strong>Conquer</strong> each subproblem (often recursively).
          </li>
          <li>
            <strong>Combine</strong> the results of the subproblems into a
            final answer.
          </li>
        </ol>

        <h3>Example: Binary Search (search)</h3>
        <p>
          Given a <strong>sorted</strong> array of integers, write a function
          called <code>search</code> that accepts a value and returns the index
          where that value is found. If the value is not found, return -1.
        </p>

        <CodeBlock
          title="search() examples"
          code={`search([1, 2, 3, 4, 5, 6], 4)   // 3
search([1, 2, 3, 4, 5, 6], 6)   // 5
search([1, 2, 3, 4, 5, 6], 11)  // -1`}
        />

        <h4>Naive Approach: Linear Search O(n)</h4>

        <CodeBlock
          title="search() — Linear Search O(n)"
          code={`function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}

// Time:  O(n) — check every element until we find it
// Space: O(1)
// This ignores the fact that the array is sorted!`}
        />

        <h4>Optimized Approach: Binary Search O(log n)</h4>

        <CodeBlock
          title="search() — Binary Search O(log n)"
          code={`function search(arr, val) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === val) {
      return mid;
    } else if (arr[mid] < val) {
      left = mid + 1;   // target is in the right half
    } else {
      right = mid - 1;  // target is in the left half
    }
  }

  return -1;
}

// Time:  O(log n) — we cut the search space in half at each step
// Space: O(1)

// For an array of 1,000,000 elements:
// Linear search: up to 1,000,000 steps
// Binary search: at most 20 steps (log₂(1,000,000) ≈ 20)
// That is a 50,000x improvement.`}
        />

        <CodeBlock
          title="Tracing search([1, 3, 5, 7, 9, 11, 13, 15], 9)"
          code={`// left=0, right=7 → mid=3 → arr[3]=7 < 9 → search right half
// left=4, right=7 → mid=5 → arr[5]=11 > 9 → search left half
// left=4, right=4 → mid=4 → arr[4]=9 === 9 → FOUND at index 4!
//
// Only 3 steps to search an 8-element array.
// A linear search could have taken up to 8 steps.`}
        />

        <Callout type="info" title="Divide and Conquer is a foundation">
          <p>
            Binary search is the simplest example of Divide and Conquer, but
            the pattern extends to much more complex algorithms. Merge sort
            divides the array in half, sorts each half, and merges them back.
            Quicksort picks a pivot, partitions around it, and recurses on
            each partition. We will explore these sorting algorithms in depth
            on their own page — for now, the key takeaway is that dividing
            your problem in half at each step gives you O(log n) performance,
            which is extremely powerful.
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. When to Use Which Pattern ───────────── */}
      <div className="section">
        <h2>When to Use Which Pattern</h2>
        <p>
          Recognizing which pattern to apply is half the battle in an
          interview. Here is a cheat sheet:
        </p>

        <ComplexityTable
          headers={["Pattern", "Look For These Clues", "Common Problems"]}
          rows={[
            [
              "Frequency Counter",
              "Comparing pieces of data, anagrams, frequency of values, checking if values match in a different form",
              "Anagram, same frequency, duplicate detection",
            ],
            [
              "Multiple Pointers",
              "Sorted array or string, finding a pair/triplet that meets a condition, O(1) space requirement",
              "Pair sum, unique values, palindrome check, removing duplicates",
            ],
            [
              "Sliding Window",
              "Contiguous sub-array or sub-string, max/min sum, longest/shortest sequence with a condition",
              "Max sub-array sum, longest unique substring, minimum window substring",
            ],
            [
              "Divide and Conquer",
              "Sorted data, search problems, problems that can be split in half, sorting",
              "Binary search, merge sort, quicksort, closest pair of points",
            ],
          ]}
        />

        <Callout type="interview" title="Pattern recognition takes practice">
          <p>
            You will not memorize a lookup table for patterns. Instead, after
            solving 30-50 problems using these patterns, you will start to
            develop an intuition. When you see "sorted array" and "find a
            pair," your brain will automatically think "Multiple Pointers."
            When you see "contiguous sub-array," you will think "Sliding
            Window." This intuition is what interviewers are testing — they
            want to see that you can identify the right approach quickly.
          </p>
        </Callout>

        <Callout type="tip" title="Combine patterns when needed">
          <p>
            Many real interview problems require combining multiple patterns.
            For example, you might use a Frequency Counter inside a Sliding
            Window to track character counts in a dynamic substring. Or you
            might use Divide and Conquer to sort data, then Multiple Pointers
            to search through the sorted result. Do not think of these patterns
            as mutually exclusive — they are tools in your toolbox, and the
            best solutions often combine several of them.
          </p>
        </Callout>
      </div>

      {/* ───────────── 7. Summary & Complexity Reference ───────────── */}
      <div className="section">
        <h2>Complexity Summary</h2>
        <p>
          Here is a quick reference for the time and space complexity of each
          pattern applied to the examples we covered:
        </p>

        <ComplexityTable
          headers={["Problem", "Naive Time", "Optimized Time", "Optimized Space"]}
          rows={[
            ["same (squared values)", "O(n^2)", "O(n)", "O(n)"],
            ["validAnagram", "O(n^2)", "O(n)", "O(n)"],
            ["sumZero (pair sum)", "O(n^2)", "O(n)", "O(1)"],
            ["countUniqueValues", "O(n^2)", "O(n)", "O(1)"],
            ["maxSubarraySum", "O(n^2)", "O(n)", "O(1)"],
            ["binary search", "O(n)", "O(log n)", "O(1)"],
          ]}
        />

        <Callout type="interview" title="The takeaway">
          <p>
            The common thread across all these patterns is the same: we
            replace nested loops with smarter data structures or pointer
            techniques. The brute force is almost always O(n²). The optimized
            solution is almost always O(n) or O(log n). Interviewers want to
            see that you can make this jump — from the obvious solution to the
            clever one. Understanding these four patterns gives you a framework
            for making that jump consistently.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            <strong>Understand, Explore, Break Down, Solve, Refactor</strong>{" "}
            — follow this five-step framework for every problem, especially
            under interview pressure.
          </li>
          <li>
            <strong>Frequency Counter</strong> — use objects to collect
            frequencies and avoid nested loops. Great for comparing, matching,
            and counting problems.
          </li>
          <li>
            <strong>Multiple Pointers</strong> — use two pointers moving toward
            each other (or in the same direction) in sorted data. Achieves O(n)
            time with O(1) space.
          </li>
          <li>
            <strong>Sliding Window</strong> — maintain a running computation
            over a contiguous sub-array or sub-string. Avoid recalculating from
            scratch at each position.
          </li>
          <li>
            <strong>Divide and Conquer</strong> — split the problem in half at
            each step for O(log n) performance. Binary search is the simplest
            example.
          </li>
          <li>
            Practice recognizing which pattern fits a problem — this is the
            skill that interviews actually test.
          </li>
        </ul>
      </div>

      <TopicNav slug="problem-solving" />
    </div>
  );
}
