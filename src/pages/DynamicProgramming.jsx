import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function DynamicProgramming() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Dynamic Programming
      </p>

      <h1 className="topic-title">Dynamic Programming</h1>
      <p className="topic-subtitle">
        A method for solving a complex problem by breaking it down into simpler
        subproblems, solving each just once, and storing their solutions.
        Dynamic programming is one of the most powerful optimization techniques
        in computer science — and one of the most feared interview topics. But
        the pattern is learnable, and once it clicks, you will see it
        everywhere.
      </p>

      {/* ───────────── 1. What is Dynamic Programming? ───────────── */}
      <div className="section">
        <h2>What is Dynamic Programming?</h2>
        <p>
          Dynamic programming (DP) is an algorithmic technique for solving
          problems by breaking them down into smaller, simpler subproblems,
          solving each subproblem <strong>just once</strong>, and{" "}
          <strong>storing</strong> the result so you never have to recompute it.
          The name is a bit misleading — it has nothing to do with "dynamic"
          in the programming-language sense. It was coined by mathematician
          Richard Bellman in the 1950s, partly because "dynamic" sounded
          impressive.
        </p>
        <p>
          But DP does not work on every problem. It only applies when a problem
          has two specific properties:
        </p>
        <ol>
          <li>
            <strong>Overlapping subproblems</strong> — the same subproblems are
            solved multiple times.
          </li>
          <li>
            <strong>Optimal substructure</strong> — an optimal solution to the
            problem can be constructed from optimal solutions of its
            subproblems.
          </li>
        </ol>
        <p>
          If a problem has both of these properties, dynamic programming can
          dramatically reduce the amount of work you do — often turning an
          exponential algorithm into a polynomial one.
        </p>

        <Callout type="info" title="The core idea">
          <p>
            Dynamic programming is essentially this: "Remember the work you
            have already done." Instead of recomputing the same answer over and
            over, you store it and look it up when you need it again. That is
            the entire idea. Everything else is just mechanics.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Overlapping Subproblems ───────────── */}
      <div className="section">
        <h2>Overlapping Subproblems</h2>
        <p>
          A problem has <strong>overlapping subproblems</strong> if it can be
          broken down into subproblems that are reused several times. This is
          the key difference between DP and plain divide-and-conquer. In
          divide-and-conquer (like merge sort), each subproblem is unique — you
          never solve the same subproblem twice. In DP problems, the same
          subproblem shows up again and again.
        </p>
        <p>
          The classic example is Fibonacci. To compute <code>fib(5)</code>, you
          need <code>fib(4)</code> and <code>fib(3)</code>. But to compute{" "}
          <code>fib(4)</code>, you also need <code>fib(3)</code> and{" "}
          <code>fib(2)</code>. See the problem? <code>fib(3)</code> is computed
          multiple times. And the deeper you go, the worse it gets.
        </p>

        <CodeBlock
          title="The Fibonacci call tree — overlapping subproblems everywhere"
          code={`                    fib(5)
                   /      \\
              fib(4)        fib(3)
             /     \\        /    \\
         fib(3)   fib(2)  fib(2)  fib(1)
         /   \\    /   \\    /   \\
     fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
     /   \\
  fib(1) fib(0)

// Notice: fib(3) is computed 2 times
//         fib(2) is computed 3 times
//         fib(1) is computed 5 times
//         fib(0) is computed 3 times
//
// That is a LOT of repeated work!`}
          language="text"
        />

        <p>
          Contrast this with merge sort. When you split an array{" "}
          <code>[3, 1, 4, 1, 5]</code> into <code>[3, 1]</code> and{" "}
          <code>[4, 1, 5]</code>, and then split those further — each subarray
          is unique. You never sort the same subarray twice. That is why merge
          sort does <strong>not</strong> have overlapping subproblems, and merge
          sort is <strong>not</strong> a DP problem.
        </p>

        <Callout type="tip" title="How to spot overlapping subproblems">
          <p>
            Draw out the recursive call tree for a small input. If you see the
            same function call appearing in multiple branches, you have
            overlapping subproblems — and DP might be the right approach.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Optimal Substructure ───────────── */}
      <div className="section">
        <h2>Optimal Substructure</h2>
        <p>
          A problem has <strong>optimal substructure</strong> if an optimal
          solution to the whole problem can be built from optimal solutions of
          its subproblems. In other words, if you solve the smaller pieces
          optimally, you can combine them to get the optimal answer for the
          bigger problem.
        </p>
        <p>
          <strong>Shortest path</strong> is a classic example. If the shortest
          path from A to D goes through B and C (A → B → C → D), then the
          sub-path from A to C (A → B → C) must also be the shortest path from
          A to C. If there were a shorter way to get from A to C, you could use
          it to get from A to D faster — contradicting the assumption that you
          already had the shortest path from A to D.
        </p>
        <p>
          <strong>Longest simple path</strong>, on the other hand, does{" "}
          <strong>not</strong> always have optimal substructure. The longest
          simple path (no repeated vertices) from A to D might go through a
          completely different set of nodes than the longest simple path from A
          to C. You cannot just stitch together longest sub-paths to get the
          longest overall path. This is why finding the longest simple path is
          NP-hard, while shortest path has efficient solutions.
        </p>

        <Callout type="info" title="Both properties are required">
          <p>
            For DP to work, the problem must have <strong>both</strong>{" "}
            overlapping subproblems and optimal substructure. Overlapping
            subproblems without optimal substructure means caching will not
            help you build the right answer. Optimal substructure without
            overlapping subproblems means divide-and-conquer is sufficient —
            you do not need to cache anything because you never solve the same
            subproblem twice.
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. The Fibonacci Example ───────────── */}
      <div className="section">
        <h2>The Fibonacci Example</h2>
        <p>
          Fibonacci is the "hello world" of dynamic programming. It is simple
          enough to understand completely, but it perfectly illustrates why DP
          matters. Let's look at three approaches: naive recursion, memoization
          (top-down DP), and tabulation (bottom-up DP).
        </p>

        <h3>Approach 1: Naive Recursion</h3>
        <p>
          This is the version you already know from the recursion topic. It
          works, but it is <strong>catastrophically slow</strong>.
        </p>

        <CodeBlock
          title="Naive recursive Fibonacci — O(2^n)"
          code={`function fib(n) {
  // Base cases
  if (n <= 1) return n;

  // Each call branches into two more calls
  return fib(n - 1) + fib(n - 2);
}

fib(6);  // 8
fib(10); // 55
fib(40); // 102334155 — takes SECONDS
fib(50); // ... you might be waiting a while`}
        />

        <p>
          Why is this so slow? Because the call tree branches exponentially.
          Every call to <code>fib(n)</code> makes two more calls, and many of
          those calls compute the exact same thing. The time complexity is{" "}
          <strong>O(2^n)</strong> — roughly doubling the work for each
          additional input. <code>fib(40)</code> makes over a billion function
          calls. <code>fib(50)</code> makes over a trillion.
        </p>

        <Callout type="warning" title="Do not use naive recursive Fibonacci in production">
          <p>
            The naive recursive Fibonacci is a great teaching tool, but never
            use it for anything real. O(2^n) grows so fast that even{" "}
            <code>fib(50)</code> can freeze your browser. The whole point of DP
            is to fix exactly this kind of problem.
          </p>
        </Callout>

        <h3>Approach 2: Memoization (Top-Down)</h3>
        <p>
          Memoization is the first DP technique. The idea is simple: before
          computing a subproblem, check if you have already solved it. If yes,
          return the stored result. If no, compute it, store it, and then
          return it.
        </p>
        <p>
          You start from the top (the original problem) and work your way down
          to the base cases. As you go, you "memo-ize" — store results in a
          memo object or array. The recursive structure stays the same; you just
          add a lookup step.
        </p>

        <CodeBlock
          title="Fibonacci with memoization — O(n)"
          code={`function fib(n, memo = {}) {
  // If we have already computed this value, return it
  if (n in memo) return memo[n];

  // Base cases
  if (n <= 1) return n;

  // Compute, store in memo, and return
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

fib(6);   // 8
fib(10);  // 55
fib(50);  // 12586269025 — instant!
fib(100); // 354224848179261915075 — still instant!`}
        />

        <p>
          Look at what changed. We added a <code>memo</code> object that stores
          the result of each <code>fib(n)</code> the first time it is computed.
          On every subsequent call with the same <code>n</code>, we skip the
          computation entirely and just return the stored value.
        </p>
        <p>
          The time complexity drops from <strong>O(2^n)</strong> to{" "}
          <strong>O(n)</strong>. We compute each value of <code>fib(n)</code>{" "}
          exactly once. That is the power of memoization.
        </p>

        <CodeBlock
          title="Visualizing memoization"
          code={`// Without memo: the full exponential tree
//                     fib(5)
//                    /      \\
//               fib(4)       fib(3)   ← computed again!
//              /     \\       /    \\
//          fib(3)  fib(2) fib(2) fib(1)  ← all duplicates!
//          ...     ...    ...

// With memo: each value computed only once
// fib(5) → needs fib(4) and fib(3)
//   fib(4) → needs fib(3) and fib(2)
//     fib(3) → needs fib(2) and fib(1)
//       fib(2) → needs fib(1) and fib(0)
//         fib(1) → 1  (base case)
//         fib(0) → 0  (base case)
//       fib(2) = 1  → stored in memo
//     fib(1) → already in base case = 1
//     fib(3) = 2  → stored in memo
//   fib(2) → already in memo! Return 1 immediately
//   fib(4) = 3  → stored in memo
// fib(3) → already in memo! Return 2 immediately
// fib(5) = 5  → done!`}
          language="text"
        />

        <Callout type="tip" title="The memo can be an object or an array">
          <p>
            When the subproblem keys are integers (like Fibonacci), you can use
            either an object (<code>memo = {"{}"}</code>) or an array (
            <code>memo = []</code>). Arrays are slightly faster for integer
            keys. For problems with non-integer keys (like string subproblems),
            use an object or a <code>Map</code>.
          </p>
        </Callout>

        <h3>Approach 3: Tabulation (Bottom-Up)</h3>
        <p>
          Tabulation flips the approach. Instead of starting at the top and
          recursing down, you start at the <strong>bottom</strong> (the
          smallest subproblems) and <strong>build up</strong> iteratively. You
          fill in a table (usually an array) from the base cases upward, using
          previously computed values to compute the next one.
        </p>
        <p>
          No recursion, no call stack, no risk of stack overflow. Just a
          simple loop.
        </p>

        <CodeBlock
          title="Fibonacci with tabulation — O(n)"
          code={`function fib(n) {
  // Edge case
  if (n <= 1) return n;

  // Create a table and fill in the base cases
  const table = [0, 1];

  // Build up from the bottom
  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }

  return table[n];
}

fib(6);   // 8
fib(10);  // 55
fib(50);  // 12586269025
fib(100); // 354224848179261915075`}
        />

        <p>
          This is about as simple as it gets. We create an array, seed it with
          the base cases (<code>fib(0) = 0</code>, <code>fib(1) = 1</code>),
          and then fill in each subsequent value using the two before it. No
          recursion needed.
        </p>
        <p>
          The time complexity is <strong>O(n)</strong> — same as memoization.
          But the space usage is also <strong>O(n)</strong> for the table. We
          can actually optimize this further since we only ever need the last
          two values:
        </p>

        <CodeBlock
          title="Fibonacci with O(1) space"
          code={`function fib(n) {
  if (n <= 1) return n;

  let prev2 = 0;  // fib(0)
  let prev1 = 1;  // fib(1)

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

fib(6);   // 8
fib(50);  // 12586269025
fib(100); // 354224848179261915075`}
        />

        <Callout type="info" title="Space optimization is a bonus">
          <p>
            Not every DP problem can have its space optimized like this. It
            works for Fibonacci because each value only depends on the previous
            two. For problems where <code>dp[i]</code> depends on many earlier
            values, you will need the full table. But when you can do it, it
            is a great optimization to mention in an interview.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. Memoization vs Tabulation ───────────── */}
      <div className="section">
        <h2>Memoization vs Tabulation</h2>
        <p>
          Both techniques achieve the same goal — avoiding redundant
          computation — but they approach it differently. Here is a side-by-side
          comparison.
        </p>

        <ComplexityTable
          headers={["Aspect", "Memoization (Top-Down)", "Tabulation (Bottom-Up)"]}
          rows={[
            ["Direction", "Top-down (start from problem, recurse to base cases)", "Bottom-up (start from base cases, iterate up)"],
            ["Implementation", "Recursive with a cache", "Iterative with a table"],
            ["Subproblems solved", "Only the ones needed", "All subproblems up to n"],
            ["Call stack", "Uses call stack (risk of overflow)", "No call stack (just a loop)"],
            ["Ease of writing", "Often easier — just add caching to recursion", "Requires identifying the iteration order"],
            ["Space", "O(n) for cache + O(n) for call stack", "O(n) for table (sometimes optimizable)"],
          ]}
        />

        <p>
          In practice, both give you the same time complexity improvement. The
          choice often comes down to preference and the specific problem:
        </p>
        <ul>
          <li>
            <strong>Memoization</strong> is usually easier to write — you take
            your recursive solution and add a cache. It is great when you
            already have a working recursive solution and want to optimize it.
            However, it can cause stack overflow on very large inputs due to
            deep recursion.
          </li>
          <li>
            <strong>Tabulation</strong> avoids the call stack entirely, so it
            handles very large inputs gracefully. It also tends to have a
            slight constant-factor speed advantage (no function call overhead).
            But it requires you to figure out the correct order to fill in the
            table, which can be trickier for some problems.
          </li>
        </ul>

        <Callout type="interview" title="Know both approaches">
          <p>
            In interviews, start with whichever approach feels more natural to
            you. But be prepared to convert between them if asked. A common
            interview follow-up is: "Can you convert this memoized solution to
            a tabulated one?" or "Can you optimize the space?" Being fluent in
            both shows depth.
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. How to Recognize DP Problems ───────────── */}
      <div className="section">
        <h2>How to Recognize DP Problems</h2>
        <p>
          One of the hardest parts of dynamic programming is knowing when to
          use it. Here are the signals to look for.
        </p>

        <h3>Common phrasing in problem statements</h3>
        <ul>
          <li>
            <strong>"Find the minimum/maximum..."</strong> — minimize cost,
            maximize profit, fewest steps, etc.
          </li>
          <li>
            <strong>"Count the number of ways..."</strong> — how many ways to
            reach the target, how many distinct paths, etc.
          </li>
          <li>
            <strong>"Is it possible to..."</strong> — can you reach the target,
            can you partition the set, etc.
          </li>
          <li>
            <strong>"Find the longest/shortest..."</strong> — longest common
            subsequence, shortest edit distance, etc.
          </li>
        </ul>

        <h3>Questions to ask yourself</h3>
        <ol>
          <li>
            Can you break the problem into <strong>smaller subproblems</strong>{" "}
            of the same type?
          </li>
          <li>
            Do the subproblems <strong>overlap</strong>? (Would a naive
            recursive solution recompute the same things?)
          </li>
          <li>
            Does <strong>optimal substructure</strong> apply? (Can you build
            the optimal solution from optimal sub-solutions?)
          </li>
        </ol>
        <p>
          If the answer to all three is yes, you are almost certainly looking
          at a DP problem.
        </p>

        <Callout type="tip" title="Start with brute force">
          <p>
            When you suspect a problem might be DP, start by writing the naive
            recursive solution first. Do not try to jump straight to the DP
            solution. The recursive solution helps you understand the
            subproblem structure, the recurrence relation, and the base cases.
            Once you have that, adding memoization is often just a few lines of
            code.
          </p>
        </Callout>
      </div>

      {/* ───────────── 7. Climbing Stairs ───────────── */}
      <div className="section">
        <h2>Another Example: Climbing Stairs</h2>
        <p>
          This is one of the most common DP interview problems. You are
          climbing a staircase with <code>n</code> steps. Each time you can
          climb either 1 step or 2 steps. How many distinct ways can you reach
          the top?
        </p>
        <p>
          Think about it: to reach step <code>n</code>, you either came from
          step <code>n - 1</code> (took 1 step) or from step{" "}
          <code>n - 2</code> (took 2 steps). So the number of ways to reach
          step <code>n</code> is the number of ways to reach step{" "}
          <code>n - 1</code> plus the number of ways to reach step{" "}
          <code>n - 2</code>. Sound familiar? It is Fibonacci in disguise!
        </p>

        <h3>Naive recursive solution</h3>
        <CodeBlock
          title="Climbing Stairs — naive recursion — O(2^n)"
          code={`function climbStairs(n) {
  // Base cases
  if (n <= 1) return 1;
  // 0 steps → 1 way (do nothing)
  // 1 step  → 1 way (take one step)

  // Recursive case: sum of the two sub-problems
  return climbStairs(n - 1) + climbStairs(n - 2);
}

climbStairs(2);  // 2  (1+1 or 2)
climbStairs(3);  // 3  (1+1+1, 1+2, 2+1)
climbStairs(5);  // 8
climbStairs(40); // ...takes forever`}
        />

        <p>
          Same problem as naive Fibonacci — exponential time, massive
          redundancy. Let's fix it.
        </p>

        <h3>With memoization</h3>
        <CodeBlock
          title="Climbing Stairs — memoized — O(n)"
          code={`function climbStairs(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return 1;

  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}

climbStairs(2);  // 2
climbStairs(5);  // 8
climbStairs(50); // 20365011074 — instant!`}
        />

        <h3>With tabulation</h3>
        <CodeBlock
          title="Climbing Stairs — tabulated — O(n)"
          code={`function climbStairs(n) {
  if (n <= 1) return 1;

  const dp = [1, 1]; // dp[0] = 1 way, dp[1] = 1 way

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

climbStairs(2);  // 2
climbStairs(5);  // 8
climbStairs(50); // 20365011074`}
        />

        <Callout type="interview" title="Climbing Stairs is a LeetCode classic">
          <p>
            This problem appears frequently in interviews (LeetCode #70). The
            key insight is recognizing it as Fibonacci. Once you see that the
            recurrence is <code>dp[i] = dp[i-1] + dp[i-2]</code>, the
            solution writes itself. Practice explaining <em>why</em> it is
            Fibonacci — interviewers care about the reasoning, not just the
            code.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. Coin Change ───────────── */}
      <div className="section">
        <h2>Another Example: Coin Change</h2>
        <p>
          Given an array of coin denominations and a target amount, find the{" "}
          <strong>fewest number of coins</strong> needed to make that amount.
          If it is not possible, return -1. You have an unlimited supply of
          each coin.
        </p>
        <p>
          For example, with coins <code>[1, 5, 10, 25]</code> and amount{" "}
          <code>30</code>, the answer is 2 (a quarter and a nickel). This is a
          classic DP problem that goes beyond Fibonacci — it has multiple
          choices at each step, not just two.
        </p>

        <h3>The recurrence</h3>
        <p>
          For each amount, the minimum coins needed is:
        </p>
        <CodeBlock
          title="Coin Change recurrence"
          code={`// dp[amount] = minimum number of coins to make "amount"
// For each coin denomination c:
//   dp[amount] = min(dp[amount], dp[amount - c] + 1)
//
// Base case: dp[0] = 0 (zero coins needed for amount 0)
// Initialize all other dp values to Infinity (not yet reachable)`}
          language="text"
        />

        <h3>Memoized solution</h3>
        <CodeBlock
          title="Coin Change — memoized"
          code={`function coinChange(coins, amount, memo = {}) {
  // Check memo
  if (amount in memo) return memo[amount];

  // Base cases
  if (amount === 0) return 0;
  if (amount < 0) return -1;

  let minCoins = Infinity;

  for (const coin of coins) {
    const result = coinChange(coins, amount - coin, memo);

    // If this sub-problem has a valid solution
    if (result !== -1) {
      minCoins = Math.min(minCoins, result + 1);
    }
  }

  // Store in memo: either the minimum or -1 if no solution
  memo[amount] = minCoins === Infinity ? -1 : minCoins;
  return memo[amount];
}

coinChange([1, 5, 10, 25], 30); // 2  (25 + 5)
coinChange([2], 3);              // -1 (impossible)
coinChange([1, 2, 5], 11);      // 3  (5 + 5 + 1)`}
        />

        <h3>Tabulated solution</h3>
        <CodeBlock
          title="Coin Change — tabulated"
          code={`function coinChange(coins, amount) {
  // dp[i] = fewest coins to make amount i
  // Initialize with Infinity (meaning "not reachable yet")
  const dp = new Array(amount + 1).fill(Infinity);

  // Base case: 0 coins needed for amount 0
  dp[0] = 0;

  // For each amount from 1 to target...
  for (let i = 1; i <= amount; i++) {
    // Try each coin
    for (const coin of coins) {
      if (i - coin >= 0 && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

coinChange([1, 5, 10, 25], 30); // 2
coinChange([2], 3);              // -1
coinChange([1, 2, 5], 11);      // 3`}
        />

        <CodeBlock
          title="Tracing coinChange([1, 2, 5], 11)"
          code={`// dp array as it fills up:
// dp[0]  = 0  (base case)
// dp[1]  = 1  (1)
// dp[2]  = 1  (2)
// dp[3]  = 2  (2+1)
// dp[4]  = 2  (2+2)
// dp[5]  = 1  (5)
// dp[6]  = 2  (5+1)
// dp[7]  = 2  (5+2)
// dp[8]  = 3  (5+2+1)
// dp[9]  = 3  (5+2+2)
// dp[10] = 2  (5+5)
// dp[11] = 3  (5+5+1)  ← answer!`}
          language="text"
        />

        <Callout type="tip" title="Why greedy does not work here">
          <p>
            You might think: "Just always pick the largest coin that fits."
            That greedy approach works for standard US coins but fails in
            general. For example, with coins <code>[1, 3, 4]</code> and amount{" "}
            <code>6</code>, greedy picks 4 + 1 + 1 = 3 coins, but the optimal
            answer is 3 + 3 = 2 coins. DP considers all possibilities and
            guarantees the optimal answer.
          </p>
        </Callout>
      </div>

      {/* ───────────── 9. Steps to Solve Any DP Problem ───────────── */}
      <div className="section">
        <h2>Steps to Solve Any DP Problem</h2>
        <p>
          Every DP problem follows the same general process. Once you
          internalize these steps, even unfamiliar problems become manageable.
        </p>

        <ol>
          <li>
            <strong>Recognize it is a DP problem.</strong> Look for overlapping
            subproblems and optimal substructure. Check for the common phrases:
            "minimum," "maximum," "count the number of ways," "is it possible."
          </li>
          <li>
            <strong>Define the subproblem.</strong> What does{" "}
            <code>dp[i]</code> (or <code>dp[i][j]</code>) represent? This is
            the most important step. Get this wrong and nothing else works. For
            Fibonacci, <code>dp[i]</code> is the ith Fibonacci number. For
            coin change, <code>dp[i]</code> is the fewest coins to make amount
            i.
          </li>
          <li>
            <strong>Write the recurrence relation.</strong> How does{" "}
            <code>dp[i]</code> relate to smaller subproblems? For Fibonacci:{" "}
            <code>dp[i] = dp[i-1] + dp[i-2]</code>. For coin change:{" "}
            <code>dp[i] = min(dp[i - coin] + 1)</code> for all coins.
          </li>
          <li>
            <strong>Identify the base cases.</strong> What are the smallest
            subproblems you can solve directly? For Fibonacci:{" "}
            <code>dp[0] = 0</code>, <code>dp[1] = 1</code>. For coin change:{" "}
            <code>dp[0] = 0</code>.
          </li>
          <li>
            <strong>Decide: memoization or tabulation?</strong> Memoization is
            often easier to code (just add a cache to your recursive solution).
            Tabulation avoids stack overflow and is often faster. Pick
            whichever feels more natural for the problem.
          </li>
          <li>
            <strong>Code it up.</strong> With the subproblem definition,
            recurrence, and base cases in hand, the code almost writes itself.
          </li>
        </ol>

        <CodeBlock
          title="The DP template"
          code={`// MEMOIZATION TEMPLATE
function solve(input, memo = {}) {
  // 1. Check memo
  if (input in memo) return memo[input];

  // 2. Base case(s)
  if (/* base condition */) return /* base value */;

  // 3. Recurrence: combine subproblems
  const result = /* combine solve(smaller inputs) */;

  // 4. Store in memo and return
  memo[input] = result;
  return result;
}

// TABULATION TEMPLATE
function solve(n) {
  // 1. Create table with base case(s)
  const dp = new Array(n + 1).fill(/* initial value */);
  dp[0] = /* base case */;

  // 2. Fill table bottom-up
  for (let i = 1; i <= n; i++) {
    dp[i] = /* recurrence using dp[i-1], dp[i-2], etc. */;
  }

  // 3. Return answer
  return dp[n];
}`}
        />

        <Callout type="tip" title="Step 2 is the hardest">
          <p>
            Defining the subproblem — deciding exactly what <code>dp[i]</code>{" "}
            represents — is usually the crux of any DP problem. Spend time on
            this. Write it out in words before writing any code. "dp[i] is the
            minimum cost to reach step i" or "dp[i][j] is the number of ways
            to fill a knapsack of capacity j using the first i items." Once
            this is clear, the recurrence often follows naturally.
          </p>
        </Callout>
      </div>

      {/* ───────────── 10. Big O Comparison ───────────── */}
      <div className="section">
        <h2>Big O Comparison</h2>
        <p>
          Here is a summary of the time and space complexity for the Fibonacci
          approaches we covered. This table perfectly illustrates why DP
          matters.
        </p>

        <ComplexityTable
          headers={["Approach", "Time", "Space"]}
          rows={[
            ["Naive Recursion", "O(2^n)", "O(n)"],
            ["Memoization (Top-Down)", "O(n)", "O(n)"],
            ["Tabulation (Bottom-Up)", "O(n)", "O(n)"],
            ["Tabulation (Space-Optimized)", "O(n)", "O(1)"],
          ]}
        />

        <p>
          The naive recursive approach is O(2^n) time because of the
          exponential branching. Both memoization and tabulation bring it down
          to O(n) by eliminating redundant computation. The space-optimized
          tabulation version goes even further, reducing space to O(1) by only
          keeping track of the last two values.
        </p>
        <p>
          To put the time difference in perspective:
        </p>

        <ComplexityTable
          headers={["n", "Naive O(2^n) calls", "DP O(n) calls"]}
          rows={[
            ["10", "1,024", "10"],
            ["20", "1,048,576", "20"],
            ["30", "1,073,741,824", "30"],
            ["40", "~1 trillion", "40"],
            ["50", "~1 quadrillion", "50"],
          ]}
        />

        <p>
          That is the difference between "takes forever" and "instant." This is
          why DP is worth learning.
        </p>
      </div>

      {/* ───────────── 11. Common DP Patterns ───────────── */}
      <div className="section">
        <h2>Common DP Patterns</h2>
        <p>
          As you practice more DP problems, you will notice that many of them
          fall into a few recurring patterns. Recognizing the pattern helps you
          set up the subproblem definition and recurrence much faster.
        </p>
        <ul>
          <li>
            <strong>Linear DP</strong> — the table is one-dimensional.
            Examples: Fibonacci, climbing stairs, house robber, maximum
            subarray.
          </li>
          <li>
            <strong>Knapsack-style</strong> — choose items with constraints
            (weight, capacity). The table is often 2D:{" "}
            <code>dp[i][w]</code> = best value using first i items with
            capacity w. Examples: 0/1 knapsack, coin change, subset sum.
          </li>
          <li>
            <strong>String DP</strong> — two strings, 2D table where{" "}
            <code>dp[i][j]</code> considers the first i characters of string 1
            and first j characters of string 2. Examples: longest common
            subsequence, edit distance, regular expression matching.
          </li>
          <li>
            <strong>Grid/Matrix DP</strong> — a 2D grid where you can move
            right or down. <code>dp[i][j]</code> = some property at cell
            (i, j). Examples: unique paths, minimum path sum, dungeon game.
          </li>
          <li>
            <strong>Interval DP</strong> — the table is indexed by intervals
            [i, j]. <code>dp[i][j]</code> = answer for the subarray from
            index i to j. Examples: matrix chain multiplication, burst
            balloons.
          </li>
        </ul>

        <Callout type="info" title="Start with the classics">
          <p>
            If you are just getting started with DP, focus on these problems
            first: Fibonacci, climbing stairs, coin change, longest common
            subsequence, and 0/1 knapsack. These cover the most common
            patterns and give you the foundation to tackle more advanced
            problems.
          </p>
        </Callout>
      </div>

      {/* ───────────── 12. Interview Tips ───────────── */}
      <div className="section">
        <h2>Tips and Interview Advice</h2>
        <p>
          DP is one of the most feared interview topics, but the pattern is
          learnable. Here is how to approach it with confidence.
        </p>

        <Callout type="interview" title="Always start with brute force">
          <p>
            Never try to jump straight to the DP solution. Start with the
            naive recursive brute force. This helps you understand the problem
            structure, identify the subproblems, and see the overlapping
            computation. Once you have a working recursive solution,
            optimizing it with memoization is often just 3-4 extra lines of
            code. Interviewers love seeing this progression from brute force
            to optimized solution.
          </p>
        </Callout>

        <Callout type="interview" title="Clearly define your subproblem">
          <p>
            Before writing any code, state out loud: "dp[i] represents..."
            This is the single most important sentence in a DP problem. Get
            it right and the rest follows. Get it wrong and you will waste
            precious interview time going in circles. Write it as a comment
            in your code so the interviewer can see your thought process.
          </p>
        </Callout>

        <Callout type="interview" title="Write the recurrence before coding">
          <p>
            After defining the subproblem, write out the recurrence relation
            on the whiteboard or as a comment. For example: "dp[i] = dp[i-1]
            + dp[i-2]" or "dp[i] = min(dp[i-coin] + 1) for all coins."
            This shows structured thinking and makes the implementation
            straightforward.
          </p>
        </Callout>

        <Callout type="interview" title="Know the follow-up questions">
          <p>
            Common follow-ups include: "Can you convert this from memoization
            to tabulation?" "Can you optimize the space?" "What if we also
            need to return the actual solution, not just the count/min/max?"
            For the last one, you often need to store the choices you made
            (not just the optimal values) and backtrack through the table to
            reconstruct the solution.
          </p>
        </Callout>

        <Callout type="warning" title="Practice is essential">
          <p>
            You cannot learn DP by just reading about it. The patterns only
            become intuitive through practice. Aim to solve at least 15-20 DP
            problems before your interviews. Start with easy ones (climbing
            stairs, house robber) and work up to medium and hard problems
            (longest common subsequence, edit distance, knapsack). Each problem
            you solve makes the next one easier.
          </p>
        </Callout>

        <Callout type="tip" title="The DP mindset">
          <p>
            When you see a new problem, ask: "If I had the answer to all
            smaller versions of this problem, could I use them to solve this
            one?" If yes, define what "smaller" means (that is your
            subproblem), express the relationship (that is your recurrence),
            and identify the smallest cases you can solve directly (those are
            your base cases). That is DP in a nutshell.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            Dynamic programming solves problems by breaking them into{" "}
            <strong>overlapping subproblems</strong>, solving each once, and{" "}
            <strong>storing the results</strong>.
          </li>
          <li>
            It requires two properties: <strong>overlapping
            subproblems</strong> (the same subproblems recur) and{" "}
            <strong>optimal substructure</strong> (optimal solutions build from
            optimal sub-solutions).
          </li>
          <li>
            <strong>Memoization</strong> (top-down): add a cache to your
            recursive solution. Check before computing, store after computing.
          </li>
          <li>
            <strong>Tabulation</strong> (bottom-up): build a table iteratively
            from the base cases up. No recursion, no stack overflow risk.
          </li>
          <li>
            To solve any DP problem: (1) recognize it, (2) define the
            subproblem, (3) write the recurrence, (4) identify base cases,
            (5) choose memoization or tabulation, (6) code it up.
          </li>
          <li>
            DP can turn <strong>O(2^n)</strong> algorithms into{" "}
            <strong>O(n)</strong> — the difference between "takes forever" and
            "instant."
          </li>
          <li>
            In interviews: start with brute force, then optimize. Clearly
            state what <code>dp[i]</code> represents. Practice is essential.
          </li>
        </ul>
      </div>

      <TopicNav slug="dynamic-programming" />
    </div>
  );
}
