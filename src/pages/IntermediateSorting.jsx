import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function IntermediateSorting() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Intermediate Sorting Algorithms
      </p>

      <h1 className="topic-title">Intermediate Sorting Algorithms</h1>
      <p className="topic-subtitle">
        Merge Sort, Quick Sort, and Radix Sort — the algorithms that break
        through the O(n²) barrier. They are more complex to implement than
        bubble sort or insertion sort, but they are dramatically faster on large
        inputs and form the backbone of virtually every real-world sorting
        library.
      </p>

      {/* ───────────── 1. Why We Need Faster Sorts ───────────── */}
      <div className="section">
        <h2>Why We Need Faster Sorts</h2>
        <p>
          The elementary sorting algorithms — bubble sort, selection sort,
          insertion sort — all run in <strong>O(n²)</strong> time. That is
          perfectly fine for small arrays, but it collapses under real-world
          data. Consider the math: if you have 100,000 items, an O(n²)
          algorithm performs roughly <strong>10 billion</strong> operations. An
          O(n log n) algorithm handles the same input in about{" "}
          <strong>1.7 million</strong> operations. That is not a minor
          improvement — it is the difference between waiting minutes and
          finishing in milliseconds.
        </p>
        <p>
          The three algorithms on this page — Merge Sort, Quick Sort, and Radix
          Sort — achieve this speedup through different strategies. Merge Sort
          and Quick Sort are both <strong>comparison-based</strong> and use
          divide-and-conquer to reach O(n log n). Radix Sort sidesteps
          comparisons entirely and exploits the structure of numbers to sort in
          O(nk) time, where k is the number of digits.
        </p>
        <p>
          The tradeoff is complexity. These algorithms are harder to understand,
          harder to implement correctly, and sometimes use more memory. But the
          performance gains make them essential knowledge — and interviewers
          expect you to know how they work.
        </p>

        <Callout type="info" title="The O(n log n) speed limit">
          <p>
            It has been mathematically proven that no comparison-based sorting
            algorithm can do better than O(n log n) in the average and worst
            case. Merge Sort and Quick Sort (on average) hit this theoretical
            floor. That is as good as it gets when comparing elements directly.
            Non-comparison sorts like Radix Sort can sometimes beat this limit,
            but they come with their own constraints.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Merge Sort ───────────── */}
      <div className="section">
        <h2>Merge Sort</h2>
        <p>
          Merge Sort is built on a beautifully simple observation:{" "}
          <strong>
            an array with zero or one element is already sorted
          </strong>
          . So what if we broke our array down into tiny sorted pieces and then
          merged them back together in the right order? That is exactly what
          Merge Sort does.
        </p>
        <p>
          The strategy is classic divide-and-conquer: recursively split the
          array in half until every piece has zero or one element. Then merge
          those pieces back together, two at a time, always maintaining sorted
          order. By the time you finish merging all the way back up, the entire
          array is sorted.
        </p>

        <h3>Step 1: The Merge Helper</h3>
        <p>
          Before writing the recursive sort, we need a helper function that
          takes <strong>two sorted arrays</strong> and combines them into one
          sorted array. This is the heart of the algorithm. It works by
          maintaining a pointer into each array and always picking the smaller
          of the two current elements. This runs in{" "}
          <strong>O(n + m)</strong> time where n and m are the lengths of the
          two arrays.
        </p>

        <CodeBlock
          title="merge — Merge Two Sorted Arrays"
          code={`function merge(arr1, arr2) {
  const results = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }

  // One of the arrays might have leftover elements
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

  return results;
}

// Example:
merge([1, 10, 50], [2, 14, 99, 100]);
// [1, 2, 10, 14, 50, 99, 100]`}
        />

        <Callout type="tip" title="Why two sorted arrays?">
          <p>
            The merge helper assumes both inputs are already sorted. This is
            what makes it so efficient — we never have to backtrack or
            re-examine elements. Each element is looked at exactly once. The
            recursive mergeSort function guarantees this precondition by
            breaking everything down to single-element arrays (which are trivially
            sorted) before merging begins.
          </p>
        </Callout>

        <h3>Step 2: The Recursive mergeSort</h3>
        <p>
          Now we use the merge helper to build the full sorting algorithm.
          The recursion is elegant: split the array in half, recursively sort
          each half, and then merge the two sorted halves together.
        </p>

        <CodeBlock
          title="mergeSort — Full Implementation"
          code={`function mergeSort(arr) {
  // Base case: arrays of 0 or 1 element are already sorted
  if (arr.length <= 1) return arr;

  // Split the array in half
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Merge the two sorted halves
  return merge(left, right);
}

mergeSort([8, 3, 5, 4, 7, 6, 1, 2]);
// [1, 2, 3, 4, 5, 6, 7, 8]`}
        />

        <h3>Walking Through an Example</h3>
        <p>
          Let's trace how mergeSort handles <code>[8, 3, 5, 4, 7, 6, 1, 2]</code>:
        </p>
        <ol>
          <li>
            <strong>Split:</strong> [8, 3, 5, 4] and [7, 6, 1, 2]
          </li>
          <li>
            <strong>Split left:</strong> [8, 3] and [5, 4]
          </li>
          <li>
            <strong>Split further:</strong> [8] and [3] — both single elements,
            base case reached
          </li>
          <li>
            <strong>Merge:</strong> merge([8], [3]) produces [3, 8]
          </li>
          <li>
            <strong>Split [5, 4]:</strong> [5] and [4] — base cases
          </li>
          <li>
            <strong>Merge:</strong> merge([5], [4]) produces [4, 5]
          </li>
          <li>
            <strong>Merge left halves:</strong> merge([3, 8], [4, 5]) produces
            [3, 4, 5, 8]
          </li>
          <li>
            <strong>Same process for the right side:</strong> [7, 6, 1, 2]
            eventually becomes [1, 2, 6, 7]
          </li>
          <li>
            <strong>Final merge:</strong> merge([3, 4, 5, 8], [1, 2, 6, 7])
            produces [1, 2, 3, 4, 5, 6, 7, 8]
          </li>
        </ol>

        <h3>Big O of Merge Sort</h3>
        <ComplexityTable
          headers={["Case", "Time", "Space"]}
          rows={[
            ["Best", "O(n log n)", "O(n)"],
            ["Average", "O(n log n)", "O(n)"],
            ["Worst", "O(n log n)", "O(n)"],
          ]}
        />
        <p>
          The time complexity is <strong>always O(n log n)</strong> regardless
          of the input. Here is why: the array is split in half at each level
          of recursion, so there are <strong>log n</strong> levels. At each
          level, every element is visited exactly once during the merge step,
          contributing <strong>O(n)</strong> work per level. Total: O(n log n).
        </p>
        <p>
          The space complexity is <strong>O(n)</strong> because we create new
          arrays during the merge process. At any given time, the total extra
          space used is proportional to the size of the input.
        </p>

        <Callout type="info" title="Consistency is the strength">
          <p>
            Unlike Quick Sort, Merge Sort's performance does not depend on
            the input data. It is always O(n log n) — whether the array is
            already sorted, reverse sorted, or completely random. This
            predictability makes it a safe choice when you need guaranteed
            performance.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Quick Sort ───────────── */}
      <div className="section">
        <h2>Quick Sort</h2>
        <p>
          Quick Sort takes a different divide-and-conquer approach. Instead of
          splitting the array in half and merging, it picks a{" "}
          <strong>pivot</strong> element and <strong>partitions</strong> the
          array so that every element smaller than the pivot ends up on the
          left and every element larger ends up on the right. After
          partitioning, the pivot is in its final sorted position. Then we
          recursively do the same thing to the left and right sides.
        </p>

        <h3>Step 1: The Pivot Helper (Partition)</h3>
        <p>
          The partition function is where the real work happens. It takes an
          array, picks a pivot element, and rearranges elements in place so
          that values less than the pivot move to the left and values greater
          than the pivot move to the right. It returns the index where the
          pivot ends up. This runs in <strong>O(n)</strong> time and{" "}
          <strong>O(1)</strong> extra space.
        </p>

        <CodeBlock
          title="pivot — Partition Helper"
          code={`function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We pick the first element as pivot
  const pivotVal = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivotVal) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap pivot into its correct position
  swap(arr, start, swapIdx);
  return swapIdx;
}

// Example:
const arr = [4, 8, 2, 1, 5, 7, 6, 3];
pivot(arr);  // returns 3
// arr is now [3, 2, 1, 4, 5, 7, 6, 8]
// 4 is in its correct sorted position (index 3)
// everything left of 4 is smaller, everything right is larger`}
        />

        <Callout type="warning" title="Pivot selection matters">
          <p>
            In the code above, we pick the first element as the pivot. This is
            simple but dangerous: if the array is already sorted (or nearly
            sorted), the first element is always the minimum, which means one
            partition is empty and the other has n-1 elements. This degrades
            Quick Sort to <strong>O(n²)</strong>. In practice, choosing the
            median of the first, middle, and last elements (median-of-three) or
            picking a random element avoids this pitfall. For interviews, just
            be aware of the issue and mention it.
          </p>
        </Callout>

        <h3>Step 2: The Recursive quickSort</h3>
        <p>
          With the partition helper in hand, the recursive quickSort is
          remarkably concise. We partition around the pivot, then recursively
          sort the left and right portions.
        </p>

        <CodeBlock
          title="quickSort — Full Implementation"
          code={`function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = pivot(arr, left, right);

    // Recursively sort the left side (before pivot)
    quickSort(arr, left, pivotIndex - 1);

    // Recursively sort the right side (after pivot)
    quickSort(arr, pivotIndex + 1, right);
  }

  return arr;
}

quickSort([4, 6, 9, 1, 2, 5, 3]);
// [1, 2, 3, 4, 5, 6, 9]`}
        />

        <p>
          Notice that Quick Sort works <strong>in place</strong> — it does not
          create new arrays like Merge Sort does. Instead, it swaps elements
          within the original array. This gives it a space advantage.
        </p>

        <h3>Big O of Quick Sort</h3>
        <ComplexityTable
          headers={["Case", "Time", "Space"]}
          rows={[
            ["Best", "O(n log n)", "O(log n)"],
            ["Average", "O(n log n)", "O(log n)"],
            ["Worst", "O(n^2)", "O(n)"],
          ]}
        />
        <p>
          In the <strong>best and average cases</strong>, the pivot lands
          roughly in the middle, producing two roughly equal halves. This
          gives us log n levels of recursion with O(n) work at each level —
          total O(n log n). The space is O(log n) for the recursion stack.
        </p>
        <p>
          In the <strong>worst case</strong>, the pivot is always the minimum
          or maximum element (which happens when the array is already sorted
          and we pick the first element). Each partition only reduces the
          problem by one element, leading to n levels of recursion. This
          makes it O(n²) time and O(n) space for the call stack. This is why
          pivot selection strategy matters so much.
        </p>

        <Callout type="interview" title="Quick Sort vs. Merge Sort">
          <p>
            Interviewers love asking you to compare these two. Key differences:
            Merge Sort is <strong>always O(n log n)</strong> but uses{" "}
            <strong>O(n) extra space</strong>. Quick Sort is O(n log n) on
            average with only <strong>O(log n) space</strong>, but degrades to
            O(n²) in the worst case. In practice, Quick Sort is often faster
            due to better cache performance and lower constant factors. Most
            real-world standard library sort functions use a variant of Quick
            Sort (or a hybrid like Timsort).
          </p>
        </Callout>
      </div>

      {/* ───────────── 4. Radix Sort ───────────── */}
      <div className="section">
        <h2>Radix Sort</h2>
        <p>
          Radix Sort is a completely different beast. It is{" "}
          <strong>not a comparison sort</strong> — it never directly compares
          two elements to decide which is bigger. Instead, it exploits the
          fact that information about the size of a number is encoded in the
          number of digits it has and the value of each digit.
        </p>
        <p>
          The idea: sort numbers by their digits, starting from the least
          significant digit (the ones place) and working up to the most
          significant. At each pass, you distribute numbers into "buckets"
          (0 through 9) based on the current digit, then collect them back.
          After processing all digits, the array is sorted.
        </p>

        <h3>Helper Functions</h3>
        <p>
          Radix Sort needs a few small helpers to work with individual digits.
        </p>

        <CodeBlock
          title="Radix Sort Helpers"
          code={`// Get the digit at a given position (from the right)
// getDigit(12345, 0) → 5, getDigit(12345, 1) → 4, getDigit(12345, 3) → 2
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// Count the number of digits in a number
// digitCount(1) → 1, digitCount(314) → 3, digitCount(99999) → 5
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// Find the maximum number of digits in an array of numbers
// mostDigits([1, 22, 333]) → 3
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}`}
        />

        <h3>The Full Radix Sort</h3>

        <CodeBlock
          title="radixSort — Full Implementation"
          code={`function radixSort(nums) {
  const maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k++) {
    // Create 10 buckets (one for each digit 0-9)
    const digitBuckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < nums.length; i++) {
      const digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }

    // Flatten the buckets back into the array
    nums = [].concat(...digitBuckets);
  }

  return nums;
}

radixSort([23, 345, 5467, 12, 2345, 9852]);
// [12, 23, 345, 2345, 5467, 9852]`}
        />

        <p>
          Let's trace through a quick example with{" "}
          <code>[170, 45, 75, 90, 802, 24, 2, 66]</code>:
        </p>
        <ol>
          <li>
            <strong>Pass 1 (ones digit):</strong> bucket by the last digit.
            After collecting: [170, 90, 802, 2, 24, 45, 75, 66]
          </li>
          <li>
            <strong>Pass 2 (tens digit):</strong> bucket by the second-to-last
            digit. After collecting: [802, 2, 24, 45, 66, 170, 75, 90]
          </li>
          <li>
            <strong>Pass 3 (hundreds digit):</strong> bucket by the third digit.
            After collecting: [2, 24, 45, 66, 75, 90, 170, 802]
          </li>
        </ol>

        <h3>Big O of Radix Sort</h3>
        <ComplexityTable
          headers={["Case", "Time", "Space"]}
          rows={[
            ["Best", "O(nk)", "O(n + k)"],
            ["Average", "O(nk)", "O(n + k)"],
            ["Worst", "O(nk)", "O(n + k)"],
          ]}
        />
        <p>
          Here, <strong>n</strong> is the number of elements and{" "}
          <strong>k</strong> is the number of digits in the largest number.
          We iterate through all n numbers once for each of the k digit
          positions. The space is O(n + k) for the buckets.
        </p>

        <Callout type="info" title="Is Radix Sort faster than O(n log n)?">
          <p>
            It depends. If k (the number of digits) is small relative to log n,
            Radix Sort can outperform comparison sorts. For example, sorting a
            million 4-digit numbers: Radix Sort does about 4 million operations,
            while Merge Sort does about 20 million. But if the numbers can be
            arbitrarily large (k grows with n), the advantage disappears. Radix
            Sort also only works naturally on integers (or things that can be
            treated like sequences of digits), which limits its applicability.
          </p>
        </Callout>

        <Callout type="warning" title="Limitations of Radix Sort">
          <p>
            Radix Sort works on non-negative integers out of the box. Handling
            negative numbers or floating-point values requires additional logic.
            It also does not generalize to arbitrary data types — you cannot
            radix sort an array of objects by a string field without extra work.
            In interviews, it comes up less often than Merge Sort and Quick
            Sort, but understanding it demonstrates breadth of knowledge.
          </p>
        </Callout>
      </div>

      {/* ───────────── 5. Comparison Table ───────────── */}
      <div className="section">
        <h2>Sorting Algorithm Comparison</h2>
        <p>
          Here is a side-by-side comparison of all the sorting algorithms
          covered so far — elementary sorts (bubble, selection, insertion) and
          the intermediate sorts on this page. This table is worth committing
          to memory for interviews.
        </p>

        <ComplexityTable
          headers={["Algorithm", "Best Time", "Average Time", "Worst Time", "Space"]}
          rows={[
            ["Bubble Sort", "O(n)", "O(n^2)", "O(n^2)", "O(1)"],
            ["Selection Sort", "O(n^2)", "O(n^2)", "O(n^2)", "O(1)"],
            ["Insertion Sort", "O(n)", "O(n^2)", "O(n^2)", "O(1)"],
            ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)"],
            ["Quick Sort", "O(n log n)", "O(n log n)", "O(n^2)", "O(log n)"],
            ["Radix Sort", "O(nk)", "O(nk)", "O(nk)", "O(n + k)"],
          ]}
        />

        <p>A few takeaways from this table:</p>
        <ul>
          <li>
            <strong>Merge Sort</strong> is the only comparison sort here that
            guarantees O(n log n) in all cases. If you need predictable
            performance and can afford O(n) extra space, it is the safest
            choice.
          </li>
          <li>
            <strong>Quick Sort</strong> is typically the fastest in practice
            (lower constant factors, better cache locality) and uses minimal
            extra space. Its worst case is O(n²), but with good pivot selection
            this is extremely rare.
          </li>
          <li>
            <strong>Insertion Sort</strong> is still relevant! Its O(n) best
            case on nearly-sorted data makes it excellent for small or
            nearly-sorted arrays. Many hybrid algorithms (like Timsort, used
            in JavaScript engines) switch to Insertion Sort for small
            subarrays.
          </li>
          <li>
            <strong>Radix Sort</strong> can beat O(n log n) when the number of
            digits k is small, but it is limited to numeric data.
          </li>
        </ul>

        <Callout type="info" title="What does JavaScript actually use?">
          <p>
            The ECMAScript spec does not mandate a specific sorting algorithm
            for <code>Array.prototype.sort()</code>. V8 (Chrome, Node.js)
            uses <strong>Timsort</strong>, a hybrid of Merge Sort and Insertion
            Sort. SpiderMonkey (Firefox) also uses Timsort. These
            implementations are highly optimized and handle edge cases that
            textbook implementations do not. The complexity is O(n log n) in
            the worst case and O(n) in the best case (already sorted data).
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="Know when to use which sort">
          <p>
            If an interviewer asks "which sorting algorithm would you use
            here?", do not just say "the fastest one." Consider the context:
            Is the data nearly sorted? Insertion Sort is O(n) in that case.
            Need guaranteed worst-case performance? Merge Sort. Need in-place
            sorting with good average performance? Quick Sort. Sorting
            integers with a known range? Radix Sort. Showing that you can
            pick the right tool for the situation is more impressive than
            memorizing one algorithm.
          </p>
        </Callout>

        <Callout type="interview" title="Be ready to implement Merge Sort">
          <p>
            Of the three, Merge Sort is the most commonly asked in interviews.
            Be able to write both the merge helper and the recursive mergeSort
            from scratch. The merge helper is also useful on its own — merging
            two sorted arrays is a common subproblem (for example, merging
            k sorted lists in a heap-based solution).
          </p>
        </Callout>

        <Callout type="interview" title="Explain Quick Sort's weakness">
          <p>
            If you implement Quick Sort, always mention the worst case. Say
            something like: "Quick Sort is O(n log n) on average, but it can
            degrade to O(n²) if the pivot is always the smallest or largest
            element. To mitigate this, we can choose a random pivot or use
            the median-of-three strategy." This shows awareness beyond the
            basic implementation.
          </p>
        </Callout>

        <Callout type="tip" title="Stability matters">
          <p>
            A stable sort preserves the relative order of equal elements.
            Merge Sort is stable. Quick Sort is not (in its standard
            implementation). Radix Sort is stable. Stability matters when
            sorting objects by multiple keys — for example, sorting students
            first by name, then by grade. If the sort is stable, students
            with the same grade stay in alphabetical order. Interviewers
            occasionally ask about this.
          </p>
        </Callout>

        <Callout type="tip" title="The divide-and-conquer pattern">
          <p>
            Both Merge Sort and Quick Sort are textbook divide-and-conquer
            algorithms: break the problem into smaller subproblems, solve
            them recursively, and combine the results. Recognizing this
            pattern is valuable beyond sorting — it shows up in binary
            search, tree traversals, matrix multiplication, and many
            dynamic programming problems. When you understand how these
            sorts work, you are also strengthening your ability to think
            recursively.
          </p>
        </Callout>
      </div>

      {/* ───────────── Recap ───────────── */}
      <div className="section">
        <h2>Recap</h2>
        <ul>
          <li>
            Elementary sorts top out at O(n²). Merge Sort, Quick Sort, and
            Radix Sort break through this ceiling.
          </li>
          <li>
            <strong>Merge Sort</strong> splits the array in half, recursively
            sorts each half, and merges them back together. It is always
            O(n log n) but uses O(n) extra space.
          </li>
          <li>
            <strong>Quick Sort</strong> picks a pivot, partitions in place, and
            recurses on both sides. It averages O(n log n) with O(log n) space
            but can degrade to O(n²) with bad pivot selection.
          </li>
          <li>
            <strong>Radix Sort</strong> avoids comparisons entirely. It sorts
            numbers digit by digit in O(nk) time, where k is the max number
            of digits.
          </li>
          <li>
            Know the tradeoffs: guaranteed performance vs. average-case speed
            vs. space usage vs. data type constraints. The right choice depends
            on the problem.
          </li>
          <li>
            For interviews, be able to implement Merge Sort and Quick Sort from
            scratch, and articulate why and when you would choose each one.
          </li>
        </ul>
      </div>

      <TopicNav slug="intermediate-sorting" />
    </div>
  );
}
