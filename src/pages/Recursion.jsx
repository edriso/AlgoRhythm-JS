import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function Recursion() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Recursion
      </p>

      <h1 className="topic-title">Recursion</h1>
      <p className="topic-subtitle">
        A function that calls itself. Recursion is one of those topics that
        feels magical until it clicks — and then it becomes one of the most
        powerful tools in your problem-solving toolkit. It is essential for
        trees, graphs, and countless interview problems.
      </p>

      {/* ───────────── 1. What is Recursion? ───────────── */}
      <div className="section">
        <h2>What is Recursion?</h2>
        <p>
          At its core, recursion is simply <strong>a function that calls
          itself</strong>. That is it. But for it to actually work (and not
          crash your program), it needs two essential parts:
        </p>
        <ol>
          <li>
            <strong>Base case</strong> — the condition where the function
            stops calling itself. Without this, your function would call itself
            forever (or until the browser runs out of memory).
          </li>
          <li>
            <strong>Recursive call</strong> — the function calls itself with a{" "}
            <strong>different input</strong> each time. Each call should move
            closer to the base case. If you call the function with the exact
            same input, you will loop forever.
          </li>
        </ol>

        <p>
          Think of it like Russian nesting dolls. You open a doll, and inside
          there is a smaller doll. You open that one, and inside there is an
          even smaller one. Eventually you reach the smallest doll that has
          nothing inside — that is your base case. Then you work your way back
          out, putting each doll inside the next larger one.
        </p>

        <CodeBlock
          title="The simplest recursive function"
          code={`function countDown(num) {
  // Base case: stop when we reach 0
  if (num <= 0) {
    console.log("All done!");
    return;
  }

  console.log(num);
  countDown(num - 1);  // Recursive call with a smaller input
}

countDown(5);
// 5
// 4
// 3
// 2
// 1
// All done!`}
        />

        <p>
          Notice the two parts: the base case (<code>if (num &lt;= 0)</code>)
          and the recursive call (<code>countDown(num - 1)</code>). Each call
          makes <code>num</code> one smaller, so we are always moving toward the
          base case.
        </p>

        <Callout type="info" title="Every recursive function needs a base case">
          <p>
            The base case is non-negotiable. It is the "exit door" of your
            recursion. Without it, your function will call itself until
            JavaScript throws a <code>RangeError: Maximum call stack size
            exceeded</code> — commonly known as a stack overflow.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. The Call Stack ───────────── */}
      <div className="section">
        <h2>The Call Stack</h2>
        <p>
          Before diving deeper into recursion, you need to understand how
          JavaScript actually handles function calls — because recursion leans
          on this mechanism heavily.
        </p>
        <p>
          JavaScript uses a <strong>call stack</strong> to keep track of
          function calls. It works like a stack of plates:
        </p>
        <ul>
          <li>
            When a function is <strong>called</strong>, it gets{" "}
            <strong>pushed</strong> onto the top of the stack.
          </li>
          <li>
            When a function <strong>returns</strong>, it gets{" "}
            <strong>popped</strong> off the top of the stack.
          </li>
          <li>
            JavaScript processes whatever is on <strong>top</strong> of the
            stack at any given moment.
          </li>
        </ul>
        <p>
          With normal (non-recursive) code, functions get pushed and popped
          quickly. But with recursion, the function keeps pushing new copies of
          itself onto the stack <strong>before any of them return</strong>. They
          all sit there waiting until the base case is reached. Then they start
          popping off one by one.
        </p>

        <CodeBlock
          title="Visualizing the call stack"
          code={`function countDown(num) {
  if (num <= 0) {
    console.log("All done!");
    return;
  }
  console.log(num);
  countDown(num - 1);
}

countDown(3);

// What the call stack looks like:
//
// countDown(3) is called → pushed onto stack
//   prints 3
//   calls countDown(2) → pushed onto stack
//     prints 2
//     calls countDown(1) → pushed onto stack
//       prints 1
//       calls countDown(0) → pushed onto stack
//         prints "All done!"
//         returns → popped off
//       returns → popped off
//     returns → popped off
//   returns → popped off`}
        />

        <Callout type="warning" title="The stack has a size limit">
          <p>
            Browsers and Node.js have a maximum call stack size (usually around
            10,000-15,000 frames, though it varies). If your recursion goes
            deeper than this limit, you get a stack overflow error. This is why
            the base case is so critical — and why recursion is not always the
            right choice for problems that require very deep recursion.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Simple Examples ───────────── */}
      <div className="section">
        <h2>Simple Examples</h2>
        <p>
          Let's look at a couple more basic examples to really nail down how
          the call stack builds up and unwinds.
        </p>

        <CodeBlock
          title="sumRange — add all numbers from 1 to n"
          code={`function sumRange(num) {
  // Base case: the sum from 1 to 1 is just 1
  if (num === 1) return 1;

  // Recursive call: num + the sum of everything below it
  return num + sumRange(num - 1);
}

sumRange(4); // 10`}
        />

        <p>
          Let's trace through <code>sumRange(4)</code> step by step to see
          exactly what happens:
        </p>

        <CodeBlock
          title="Tracing sumRange(4)"
          code={`sumRange(4)
  return 4 + sumRange(3)
                return 3 + sumRange(2)
                              return 2 + sumRange(1)
                                            return 1   ← base case hit!

// Now the stack unwinds:
// sumRange(1) returns 1
// sumRange(2) returns 2 + 1 = 3
// sumRange(3) returns 3 + 3 = 6
// sumRange(4) returns 4 + 6 = 10`}
        />

        <p>
          This is the key insight: the recursive calls build up a chain of
          pending additions. None of them can finish until the base case
          returns a concrete value. Then they resolve in reverse order, like
          dominoes falling backward.
        </p>

        <Callout type="tip" title="Trace it on paper">
          <p>
            When you are learning recursion, physically writing out the call
            stack on paper is incredibly helpful. Draw each function call,
            write down what it is waiting for, and then fill in the return
            values from the bottom up. Do this a few times and the pattern
            will click.
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. Factorial ───────────── */}
      <div className="section">
        <h2>Factorial</h2>
        <p>
          Factorial is the "hello world" of recursion. The factorial of a
          number n (written as n!) is the product of all positive integers
          from 1 to n. For example: 5! = 5 x 4 x 3 x 2 x 1 = 120.
        </p>
        <p>
          Let's look at both the iterative and recursive approaches so you
          can see how they compare.
        </p>

        <CodeBlock
          title="Factorial — iterative"
          code={`function factorialIterative(num) {
  let result = 1;
  for (let i = num; i > 1; i--) {
    result *= i;
  }
  return result;
}

factorialIterative(5); // 120`}
        />

        <CodeBlock
          title="Factorial — recursive"
          code={`function factorial(num) {
  // Base case: 0! and 1! are both 1
  if (num <= 1) return 1;

  // Recursive call: n! = n * (n-1)!
  return num * factorial(num - 1);
}

factorial(5); // 120`}
        />

        <p>
          The recursive version reads almost like the mathematical definition:
          n! = n * (n-1)!. That is one of the beautiful things about recursion —
          when the problem has a naturally recursive definition, the code
          mirrors it directly.
        </p>

        <CodeBlock
          title="Tracing factorial(5)"
          code={`factorial(5)
  return 5 * factorial(4)
                return 4 * factorial(3)
                              return 3 * factorial(2)
                                            return 2 * factorial(1)
                                                          return 1  ← base case

// Unwinding:
// factorial(1) → 1
// factorial(2) → 2 * 1 = 2
// factorial(3) → 3 * 2 = 6
// factorial(4) → 4 * 6 = 24
// factorial(5) → 5 * 24 = 120`}
        />

        <Callout type="interview" title="Know both versions">
          <p>
            Interviewers may ask you to write factorial both iteratively and
            recursively, then compare them. The iterative version is O(n) time
            and O(1) space. The recursive version is also O(n) time but O(n)
            space because of the call stack. Be ready to explain why the
            recursive version uses more memory.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. Common Pitfalls ───────────── */}
      <div className="section">
        <h2>Common Pitfalls</h2>
        <p>
          Recursion is elegant, but it is also easy to mess up. Here are the
          mistakes that trip people up the most.
        </p>

        <h3>Pitfall 1: No base case (or wrong base case)</h3>
        <p>
          Without a base case, the function calls itself forever — until
          JavaScript kills it.
        </p>
        <CodeBlock
          title="Missing base case = stack overflow"
          code={`// BAD — no base case!
function countDown(num) {
  console.log(num);
  countDown(num - 1);  // this never stops
}

countDown(5);
// 5, 4, 3, 2, 1, 0, -1, -2, ...
// RangeError: Maximum call stack size exceeded`}
        />

        <h3>Pitfall 2: Forgetting to return</h3>
        <p>
          If you forget the <code>return</code> keyword on your recursive
          call, the result gets computed but thrown away.
        </p>
        <CodeBlock
          title="Forgetting to return"
          code={`// BAD — missing return on the recursive call
function factorial(num) {
  if (num <= 1) return 1;
  factorial(num - 1);  // oops — no return!
}

factorial(5); // undefined`}
        />

        <h3>Pitfall 3: Returning the wrong thing</h3>
        <p>
          Another common mistake is returning a value that does not build
          toward the correct answer.
        </p>
        <CodeBlock
          title="Returning the wrong value"
          code={`// BAD — not combining the result properly
function sumRange(num) {
  if (num === 1) return 1;
  return sumRange(num - 1);  // forgot to add num!
}

sumRange(4); // 1 (always returns 1, ignoring num)`}
        />

        <Callout type="warning" title="Debug checklist for recursion">
          <p>
            When your recursive function is not working, ask yourself these
            three questions: (1) Is there a base case? (2) Am I returning
            the recursive call? (3) Is each recursive call moving toward the
            base case with a different input?
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. Helper Method Recursion ───────────── */}
      <div className="section">
        <h2>Helper Method Recursion</h2>
        <p>
          Sometimes you need to collect data as you recurse — build up an
          array, accumulate results, etc. The problem is that every time a
          recursive function calls itself, its local variables reset. So if
          you declare an empty array inside your recursive function, it gets
          re-created on every call.
        </p>
        <p>
          The <strong>helper method recursion</strong> pattern solves this by
          defining an outer function that holds the data, and an inner
          recursive function (the "helper") that does the actual recursion.
        </p>

        <CodeBlock
          title="Helper method recursion pattern"
          code={`function collectOdds(arr) {
  const result = [];  // lives in the outer function — not reset

  function helper(input) {
    // Base case: nothing left to process
    if (input.length === 0) return;

    // If the first element is odd, collect it
    if (input[0] % 2 !== 0) {
      result.push(input[0]);
    }

    // Recurse with the rest of the array
    helper(input.slice(1));
  }

  helper(arr);
  return result;
}

collectOdds([1, 2, 3, 4, 5, 6, 7]);
// [1, 3, 5, 7]`}
        />

        <p>
          The key here is that <code>result</code> is declared in the outer
          function, so it persists across all the recursive calls to{" "}
          <code>helper</code>. The helper function can push values into it
          without worrying about it getting reset.
        </p>

        <Callout type="info" title="When to use this pattern">
          <p>
            Helper method recursion is great when you need to accumulate a
            result (like an array or a string) across recursive calls. It is a
            common pattern for problems like "collect all values that meet a
            condition" or "flatten a nested structure."
          </p>
        </Callout>
      </div>

      {/* ───────────── 7. Pure Recursion ───────────── */}
      <div className="section">
        <h2>Pure Recursion</h2>
        <p>
          You can achieve the same result without a helper function. With{" "}
          <strong>pure recursion</strong>, the function is entirely
          self-contained — no outer wrapper, no external variables. The trick
          is to build up the result by combining return values, using
          methods like <code>concat</code>, <code>slice</code>, and the
          spread operator to avoid mutating anything.
        </p>

        <CodeBlock
          title="collectOdds — pure recursion"
          code={`function collectOdds(arr) {
  // Base case: empty array
  if (arr.length === 0) return [];

  let result = [];

  // If the first element is odd, include it
  if (arr[0] % 2 !== 0) {
    result = [arr[0]];
  }

  // Combine with the result from the rest of the array
  return result.concat(collectOdds(arr.slice(1)));
}

collectOdds([1, 2, 3, 4, 5, 6, 7]);
// [1, 3, 5, 7]`}
        />

        <p>
          Let's trace through a smaller example to see how this works:
        </p>

        <CodeBlock
          title="Tracing collectOdds([1, 2, 3])"
          code={`collectOdds([1, 2, 3])
  1 is odd → result = [1]
  return [1].concat(collectOdds([2, 3]))
                      2 is even → result = []
                      return [].concat(collectOdds([3]))
                                        3 is odd → result = [3]
                                        return [3].concat(collectOdds([]))
                                                            return []  ← base case

// Unwinding:
// collectOdds([])    → []
// collectOdds([3])   → [3].concat([]) → [3]
// collectOdds([2,3]) → [].concat([3]) → [3]
// collectOdds([1,2,3]) → [1].concat([3]) → [1, 3]`}
        />

        <Callout type="tip" title="Tips for pure recursion">
          <p>
            Use <code>arr.slice()</code> or the spread operator{" "}
            <code>[...arr]</code> to make copies of arrays so you do not
            mutate the original. Use <code>str.slice()</code> or{" "}
            <code>str.substring()</code> for strings. Use{" "}
            <code>Object.assign()</code> or spread <code>{"{...obj}"}</code>{" "}
            for objects. The key principle: never mutate your input.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. More Examples ───────────── */}
      <div className="section">
        <h2>More Examples</h2>
        <p>
          The best way to get comfortable with recursion is to see it in
          action across different problems. Here are several classic examples.
        </p>

        <h3>Power</h3>
        <p>
          Calculate base raised to the exponent, without using{" "}
          <code>Math.pow</code>.
        </p>
        <CodeBlock
          title="power(base, exponent)"
          code={`function power(base, exponent) {
  // Base case: anything to the power of 0 is 1
  if (exponent === 0) return 1;

  // Recursive case: base^exp = base * base^(exp-1)
  return base * power(base, exponent - 1);
}

power(2, 0);  // 1
power(2, 4);  // 16
power(3, 3);  // 27`}
        />

        <CodeBlock
          title="Tracing power(2, 4)"
          code={`power(2, 4)
  return 2 * power(2, 3)
                return 2 * power(2, 2)
                              return 2 * power(2, 1)
                                            return 2 * power(2, 0)
                                                          return 1

// Unwinding: 1 → 2 → 4 → 8 → 16`}
        />

        <h3>Fibonacci</h3>
        <p>
          The Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, ...) is defined
          recursively: each number is the sum of the two before it.
        </p>
        <CodeBlock
          title="fibonacci(n) — returns the nth Fibonacci number"
          code={`function fibonacci(n) {
  // Base cases
  if (n <= 1) return n;

  // Each number is the sum of the previous two
  return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(0);  // 0
fibonacci(1);  // 1
fibonacci(6);  // 8
fibonacci(10); // 55`}
        />

        <Callout type="warning" title="Naive Fibonacci is O(2^n)">
          <p>
            This recursive Fibonacci implementation is simple but extremely
            inefficient. Each call branches into two more calls, creating an
            exponential explosion. <code>fibonacci(40)</code> makes over a
            billion function calls. In practice, you would use memoization or
            an iterative approach. We will cover memoization in a later topic,
            but for now, know that this is a classic example of recursion done
            poorly from a performance standpoint.
          </p>
        </Callout>

        <h3>Reverse a String</h3>
        <CodeBlock
          title="reverse(str)"
          code={`function reverse(str) {
  // Base case: a single character (or empty string) is its own reverse
  if (str.length <= 1) return str;

  // Take the last character + reverse of everything before it
  return str[str.length - 1] + reverse(str.slice(0, -1));
}

reverse("hello");    // "olleh"
reverse("racecar");  // "racecar"
reverse("a");        // "a"`}
        />

        <CodeBlock
          title="Tracing reverse('cat')"
          code={`reverse("cat")
  return "t" + reverse("ca")
                 return "a" + reverse("c")
                                return "c"  ← base case (length 1)

// Unwinding: "c" → "ac" → "tac"`}
        />

        <h3>isPalindrome</h3>
        <CodeBlock
          title="isPalindrome(str)"
          code={`function isPalindrome(str) {
  // Base case: 0 or 1 characters left — it is a palindrome
  if (str.length <= 1) return true;

  // If first and last characters do not match, not a palindrome
  if (str[0] !== str[str.length - 1]) return false;

  // Check the inner substring
  return isPalindrome(str.slice(1, -1));
}

isPalindrome("racecar");  // true
isPalindrome("hello");    // false
isPalindrome("a");        // true
isPalindrome("tacocat");  // true`}
        />

        <p>
          This is a great example of recursion making the logic clean. At each
          step, we compare the outermost characters and then recurse on the
          inner substring. The problem gets smaller every time, and the base
          case is when we have run out of characters to compare.
        </p>
      </div>

      {/* ───────────── 9. Recursion vs Iteration ───────────── */}
      <div className="section">
        <h2>When to Use Recursion vs Iteration</h2>
        <p>
          Anything you can do with recursion, you can do with a loop — and vice
          versa. So when should you reach for one over the other?
        </p>

        <h3>Recursion shines when:</h3>
        <ul>
          <li>
            <strong>The problem is naturally recursive</strong> — trees,
            graphs, nested data structures, fractals. Traversing a tree with a
            loop requires manually managing a stack. With recursion, the call
            stack does it for you.
          </li>
          <li>
            <strong>The problem definition is recursive</strong> — like
            factorial, Fibonacci, or "process this node and then its children."
            The recursive code mirrors the problem definition directly.
          </li>
          <li>
            <strong>You need backtracking</strong> — problems like generating
            permutations, solving mazes, or the N-queens problem. Recursion
            naturally handles "try this, and if it does not work, undo it and
            try something else."
          </li>
          <li>
            <strong>Divide and conquer</strong> — merge sort, quicksort, and
            binary search are all elegantly expressed with recursion.
          </li>
        </ul>

        <h3>Iteration is usually better when:</h3>
        <ul>
          <li>
            <strong>The problem is a simple loop</strong> — summing an array,
            finding a max, counting something. A for loop is clearer and more
            efficient.
          </li>
          <li>
            <strong>Stack depth is a concern</strong> — if n could be very
            large (millions), recursion might overflow the stack. A loop will
            not.
          </li>
          <li>
            <strong>Performance matters</strong> — recursive calls have
            overhead (pushing and popping stack frames). For tight, performance-critical
            loops, iteration is faster.
          </li>
        </ul>

        <ComplexityTable
          headers={["Factor", "Recursion", "Iteration"]}
          rows={[
            ["Readability", "Often cleaner for tree/graph problems", "Often cleaner for simple loops"],
            ["Space", "O(n) due to call stack", "O(1) if no extra data structures"],
            ["Speed", "Slight overhead per call", "Generally faster"],
            ["Stack overflow risk", "Yes, for deep recursion", "No"],
            ["Backtracking", "Natural fit", "Requires manual stack management"],
          ]}
        />

        <Callout type="tip" title="A practical guideline">
          <p>
            If the data structure is flat (an array, a string, a range of
            numbers), prefer iteration. If the data structure is nested or
            tree-shaped (DOM nodes, file systems, JSON with unknown depth),
            prefer recursion. In interviews, use whichever makes your solution
            clearer — but be ready to discuss the tradeoffs.
          </p>
        </Callout>
      </div>

      {/* ───────────── 10. Interview Tips ───────────── */}
      <div className="section">
        <h2>Tips and Interview Advice</h2>

        <Callout type="interview" title="Start with the base case">
          <p>
            When writing a recursive function in an interview, always start by
            defining the base case. Say it out loud: "My base case is when the
            input is empty" or "when n is 0." This shows the interviewer you
            understand the structure of recursion and helps you avoid the most
            common mistake.
          </p>
        </Callout>

        <Callout type="interview" title="Trace through a small example">
          <p>
            After writing your recursive function, walk through it with a
            small input (like n = 3). Show the call stack building up and
            unwinding. This demonstrates understanding and catches bugs. If
            the interviewer does not ask you to trace it, do it anyway — it
            builds confidence in your solution.
          </p>
        </Callout>

        <Callout type="interview" title="Know the space cost">
          <p>
            Every recursive call adds a frame to the call stack. So a recursive
            function that calls itself n times uses O(n) space just from the
            call stack alone — even if you do not create any arrays or objects.
            Always mention this when discussing space complexity. Some
            interviewers specifically test whether you understand this.
          </p>
        </Callout>

        <Callout type="interview" title="Mention optimization opportunities">
          <p>
            If you write a recursive solution, consider mentioning memoization
            (for overlapping subproblems like Fibonacci) or tail call
            optimization (where the recursive call is the very last thing in
            the function). Even if you do not implement them, showing awareness
            of these techniques demonstrates depth.
          </p>
        </Callout>

        <Callout type="tip" title="The three questions to ask yourself">
          <p>
            For any recursive problem, answer these three questions: (1) What
            is the base case? (2) What is the smallest amount of work I can do
            in each call? (3) How do I make the problem smaller each time?
            Once you have these answers, the code almost writes itself.
          </p>
        </Callout>

        <Callout type="warning" title="Do not force recursion">
          <p>
            Not every problem needs recursion. If a simple loop is clearer and
            more efficient, use it. In interviews, reaching for recursion when
            a loop would suffice can make your solution unnecessarily
            complicated. Save recursion for when it genuinely simplifies the
            logic — like tree traversals, backtracking, and divide-and-conquer
            problems.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            Recursion is a function calling itself. It needs a{" "}
            <strong>base case</strong> (when to stop) and a{" "}
            <strong>recursive call</strong> (with a different, smaller input).
          </li>
          <li>
            JavaScript uses a <strong>call stack</strong> to manage function
            calls. Recursive functions push frames until the base case, then
            pop them off as they return.
          </li>
          <li>
            Common pitfalls: missing base case, forgetting to return, and not
            changing the input on each recursive call.
          </li>
          <li>
            <strong>Helper method recursion</strong> uses an outer function to
            hold accumulated data. <strong>Pure recursion</strong> avoids this
            by using concat, slice, and spread to build results from return
            values.
          </li>
          <li>
            Recursion is ideal for <strong>trees, graphs, nested
            structures, and backtracking</strong>. For simple loops over flat
            data, iteration is usually better.
          </li>
          <li>
            Every recursive call adds to the call stack, so recursive
            solutions typically use <strong>O(n) space</strong> at minimum.
          </li>
          <li>
            In interviews: start with the base case, trace through a small
            example, and discuss the space cost of the call stack.
          </li>
        </ul>
      </div>

      <TopicNav slug="recursion" />
    </div>
  );
}
