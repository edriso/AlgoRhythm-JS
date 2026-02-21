import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import Callout from "../components/Callout";
import ComplexityTable from "../components/ComplexityTable";
import TopicNav from "../components/TopicNav";

export default function ElementarySorting() {
  return (
    <div className="topic-page">
      <p className="topic-breadcrumb">
        <Link to="/">Home</Link> &gt; Elementary Sorting Algorithms
      </p>

      <h1 className="topic-title">Elementary Sorting Algorithms</h1>
      <p className="topic-subtitle">
        Bubble Sort, Selection Sort, and Insertion Sort are the three classic
        quadratic sorting algorithms. They are not the fastest, but they are the
        easiest to understand, and each one teaches you something important about
        how sorting works. Every efficient sorting algorithm you learn later
        builds on ideas from these three.
      </p>

      {/* ───────────── 1. Why Learn Basic Sorting? ───────────── */}
      <div className="section">
        <h2>Why Learn Basic Sorting?</h2>
        <p>
          You might be thinking: "JavaScript already has{" "}
          <code>Array.prototype.sort()</code> — why would I ever write my own
          sorting algorithm?" That is a fair question, and there are several good
          answers.
        </p>
        <ul>
          <li>
            <strong>Understanding fundamentals.</strong> Sorting is one of the
            most studied problems in computer science. The patterns you learn
            here — swapping, partitioning, building sorted subsections — show up
            everywhere. Understanding them deeply makes you a stronger
            programmer.
          </li>
          <li>
            <strong>Interview preparation.</strong> Sorting algorithms are among
            the most commonly asked topics in technical interviews. You will be
            expected to know how they work, what their complexities are, and when
            to use each one.
          </li>
          <li>
            <strong>Each one has a niche.</strong> Bubble sort with its early
            termination is great for nearly sorted data. Insertion sort excels
            when data arrives in real time. Selection sort minimizes the number
            of swaps. Knowing their strengths lets you pick the right tool.
          </li>
        </ul>

        <h3>How JavaScript's Built-in Sort Works</h3>
        <p>
          Before we write our own, let's understand how JavaScript's{" "}
          <code>.sort()</code> method works. By default, it converts elements to
          strings and sorts them by Unicode code point. This leads to some
          surprising behavior with numbers:
        </p>

        <CodeBlock
          title="JavaScript's default sort gotcha"
          code={`[6, 4, 15, 10].sort();
// [10, 15, 4, 6]  — sorted as strings, not numbers!

// "10" comes before "4" because "1" (char code 49)
// comes before "4" (char code 52) in Unicode.`}
        />

        <p>
          To sort numbers correctly, you pass a{" "}
          <strong>comparator function</strong>. The comparator takes two
          elements, <code>a</code> and <code>b</code>, and returns:
        </p>
        <ul>
          <li>
            A <strong>negative number</strong> if <code>a</code> should come
            before <code>b</code>
          </li>
          <li>
            A <strong>positive number</strong> if <code>a</code> should come
            after <code>b</code>
          </li>
          <li>
            <strong>0</strong> if their order does not matter
          </li>
        </ul>

        <CodeBlock
          title="Using comparator functions"
          code={`// Sort numbers ascending
[6, 4, 15, 10].sort((a, b) => a - b);
// [4, 6, 10, 15]

// Sort numbers descending
[6, 4, 15, 10].sort((a, b) => b - a);
// [15, 10, 6, 4]

// Sort strings by length
["hello", "hi", "hey"].sort((a, b) => a.length - b.length);
// ["hi", "hey", "hello"]

// Sort objects by a property
const people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];
people.sort((a, b) => a.age - b.age);
// [{ name: "Bob", age: 25 }, { name: "Alice", age: 30 }, ...]`}
        />

        <Callout type="info" title="The comparator pattern matters">
          <p>
            Understanding comparators is not just useful for{" "}
            <code>.sort()</code> — the concept shows up in priority queues,
            binary search trees, and many other data structures. When you write
            your own sorting algorithms below, you will be doing essentially the
            same thing: comparing two values and deciding their order.
          </p>
        </Callout>
      </div>

      {/* ───────────── 2. Swapping ───────────── */}
      <div className="section">
        <h2>Swapping — The Essential Operation</h2>
        <p>
          Every elementary sorting algorithm relies heavily on{" "}
          <strong>swapping</strong> two elements in an array. Before we dive into
          the algorithms themselves, let's make sure we know how to swap
          properly. There are two common approaches.
        </p>

        <CodeBlock
          title="ES5 swap (temp variable)"
          code={`function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Example:
const nums = [1, 2, 3];
swap(nums, 0, 2);
console.log(nums); // [3, 2, 1]`}
        />

        <CodeBlock
          title="ES2015+ swap (destructuring)"
          code={`function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// Example:
const nums = [1, 2, 3];
swap(nums, 0, 2);
console.log(nums); // [3, 2, 1]`}
        />

        <p>
          Both do exactly the same thing. The destructuring version is more
          concise, but the temp variable version is clearer about what is
          happening under the hood. Use whichever you prefer — just make sure
          you can write it without hesitation. You will be using it a lot.
        </p>

        <Callout type="tip" title="Practice writing swaps from memory">
          <p>
            It sounds simple, but under interview pressure, even easy things can
            trip you up. Make sure you can write a swap function without
            thinking. It should be muscle memory.
          </p>
        </Callout>
      </div>

      {/* ───────────── 3. Bubble Sort ───────────── */}
      <div className="section">
        <h2>Bubble Sort</h2>
        <p>
          Bubble sort gets its name from the way larger values gradually
          "bubble up" to the end of the array. The algorithm works by repeatedly
          walking through the array, comparing adjacent elements, and swapping
          them if they are in the wrong order. After each full pass, the next
          largest element is in its correct position.
        </p>

        <h3>Walking Through an Example</h3>
        <p>
          Let's sort <code>[5, 3, 4, 1, 2]</code> step by step:
        </p>
        <ul>
          <li>
            <strong>Pass 1:</strong> Compare each adjacent pair. Swap 5 and 3
            {" -> "} [3, 5, 4, 1, 2]. Swap 5 and 4 {" -> "} [3, 4, 5, 1, 2].
            Swap 5 and 1 {" -> "} [3, 4, 1, 5, 2]. Swap 5 and 2 {" -> "}
            [3, 4, 1, 2, <strong>5</strong>]. The 5 has bubbled to the end.
          </li>
          <li>
            <strong>Pass 2:</strong> Now sort the remaining portion. After this
            pass, 4 is in its correct place: [3, 1, 2, <strong>4, 5</strong>].
          </li>
          <li>
            <strong>Pass 3:</strong> After this pass: [1, 2,{" "}
            <strong>3, 4, 5</strong>].
          </li>
          <li>
            <strong>Pass 4:</strong> Already sorted, no swaps needed. We can
            stop early!
          </li>
        </ul>

        <h3>Pseudocode</h3>
        <CodeBlock
          title="Bubble Sort — Pseudocode"
          language="text"
          code={`Start looping with a variable called i from the end of the array toward the beginning
  Start an inner loop with a variable called j from the beginning until i - 1
    If arr[j] is greater than arr[j+1], swap those two values
  End inner loop
End outer loop
Return the sorted array`}
        />

        <h3>Implementation</h3>
        <CodeBlock
          title="Bubble Sort — Naive"
          code={`function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

bubbleSort([37, 45, 29, 8]);  // [8, 29, 37, 45]`}
        />

        <p>
          This works, but there is a problem. If the array is already sorted (or
          nearly sorted), we still do all the comparisons. We can fix this by
          tracking whether any swaps happened during a pass. If no swaps
          occurred, the array is sorted and we can break early.
        </p>

        <CodeBlock
          title="Bubble Sort — Optimized"
          code={`function bubbleSort(arr) {
  let noSwaps;

  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;

    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }

    if (noSwaps) break;
  }

  return arr;
}

// On a nearly sorted array like [1, 2, 3, 4, 6, 5],
// this finishes in just one or two passes instead of five.`}
        />

        <Callout type="info" title="Why the outer loop goes backwards">
          <p>
            The outer loop variable <code>i</code> starts at the end and moves
            toward the beginning because after each pass, the largest unsorted
            element is in its final position. So with each iteration, there is
            one fewer element to check. This is a small optimization that
            reduces unnecessary comparisons.
          </p>
        </Callout>

        <h3>Big O of Bubble Sort</h3>
        <ComplexityTable
          headers={["Case", "Time", "Space"]}
          rows={[
            ["Best (nearly sorted, with optimization)", "O(n)", "O(1)"],
            ["Average", "O(n^2)", "O(1)"],
            ["Worst", "O(n^2)", "O(1)"],
          ]}
        />
        <p>
          The best case of O(n) only applies when you use the{" "}
          <code>noSwaps</code> optimization and the data is already (or nearly)
          sorted. Without that optimization, bubble sort is always O(n^2).
        </p>
      </div>

      {/* ───────────── 4. Selection Sort ───────────── */}
      <div className="section">
        <h2>Selection Sort</h2>
        <p>
          Selection sort is similar to bubble sort, but instead of placing large
          values at the end, it places <strong>small values at the
          beginning</strong>. The algorithm works by scanning the entire unsorted
          portion of the array, finding the minimum element, and swapping it
          into the correct position at the front.
        </p>

        <h3>Walking Through an Example</h3>
        <p>
          Let's sort <code>[5, 3, 4, 1, 2]</code>:
        </p>
        <ul>
          <li>
            <strong>Pass 1:</strong> Scan the entire array. The minimum is 1 (at
            index 3). Swap it with the first element:{" "}
            [<strong>1</strong>, 3, 4, 5, 2].
          </li>
          <li>
            <strong>Pass 2:</strong> Scan from index 1 onward. The minimum is 2
            (at index 4). Swap it into index 1:{" "}
            [<strong>1, 2</strong>, 4, 5, 3].
          </li>
          <li>
            <strong>Pass 3:</strong> Scan from index 2 onward. The minimum is 3
            (at index 4). Swap it into index 2:{" "}
            [<strong>1, 2, 3</strong>, 5, 4].
          </li>
          <li>
            <strong>Pass 4:</strong> Scan from index 3 onward. The minimum is 4
            (at index 4). Swap it into index 3:{" "}
            [<strong>1, 2, 3, 4, 5</strong>].
          </li>
        </ul>

        <h3>Implementation</h3>
        <CodeBlock
          title="Selection Sort"
          code={`function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
    }

    if (i !== lowest) {
      [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
    }
  }

  return arr;
}

selectionSort([34, 22, 10, 19, 17]); // [10, 17, 19, 22, 34]`}
        />

        <Callout type="warning" title="No early termination benefit">
          <p>
            Unlike bubble sort, selection sort does not benefit from nearly
            sorted data. It always scans the entire unsorted portion to find the
            minimum, even if the array is already sorted. This means its best
            case is still O(n^2). For nearly sorted data, bubble sort (with
            optimization) or insertion sort will outperform selection sort.
          </p>
        </Callout>

        <h3>Big O of Selection Sort</h3>
        <ComplexityTable
          headers={["Case", "Time", "Space"]}
          rows={[
            ["Best", "O(n^2)", "O(1)"],
            ["Average", "O(n^2)", "O(1)"],
            ["Worst", "O(n^2)", "O(1)"],
          ]}
        />
        <p>
          Selection sort is O(n^2) in all cases. The one advantage it has is
          that it makes at most <strong>O(n) swaps</strong> — only one swap per
          pass. This matters in situations where writing to memory is expensive
          (though this is rarely a concern in JavaScript).
        </p>
      </div>

      {/* ───────────── 5. Insertion Sort ───────────── */}
      <div className="section">
        <h2>Insertion Sort</h2>
        <p>
          Insertion sort works the way most people sort playing cards. You pick
          up one card at a time and insert it into the correct position among
          the cards you have already sorted. The left portion of the array is
          always sorted, and you grow it one element at a time.
        </p>

        <h3>Walking Through an Example</h3>
        <p>
          Let's sort <code>[5, 3, 4, 1, 2]</code>:
        </p>
        <ul>
          <li>
            <strong>Start:</strong> Consider the first element [<strong>5</strong>]
            as the "sorted" portion.
          </li>
          <li>
            <strong>Step 1:</strong> Take 3. Compare with 5 — 3 is smaller, so
            shift 5 right and insert 3: [<strong>3, 5</strong>, 4, 1, 2].
          </li>
          <li>
            <strong>Step 2:</strong> Take 4. Compare with 5 — smaller, shift 5
            right. Compare with 3 — bigger, insert after 3:{" "}
            [<strong>3, 4, 5</strong>, 1, 2].
          </li>
          <li>
            <strong>Step 3:</strong> Take 1. Shift 5, 4, 3 all right. Insert 1
            at the beginning: [<strong>1, 3, 4, 5</strong>, 2].
          </li>
          <li>
            <strong>Step 4:</strong> Take 2. Shift 5, 4, 3 right. 1 is smaller,
            so insert 2 after 1: [<strong>1, 2, 3, 4, 5</strong>].
          </li>
        </ul>

        <h3>Implementation</h3>
        <CodeBlock
          title="Insertion Sort"
          code={`function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    let j;

    for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j];
    }

    arr[j + 1] = currentVal;
  }

  return arr;
}

insertionSort([2, 1, 9, 76, 4]); // [1, 2, 4, 9, 76]`}
        />

        <p>
          Notice that the inner loop does not just swap — it{" "}
          <strong>shifts</strong> elements to the right until it finds the
          correct position for <code>currentVal</code>. This is more efficient
          than swapping repeatedly because each shift is a single assignment
          instead of three.
        </p>

        <Callout type="tip" title="Insertion sort shines with nearly sorted data">
          <p>
            When the data is already nearly sorted, the inner loop barely
            executes. Each element is close to its correct position, so very
            few shifts are needed. This gives insertion sort a best-case time
            complexity of O(n), which is as good as it gets for a
            comparison-based sort.
          </p>
        </Callout>

        <h3>Big O of Insertion Sort</h3>
        <ComplexityTable
          headers={["Case", "Time", "Space"]}
          rows={[
            ["Best (nearly sorted)", "O(n)", "O(1)"],
            ["Average", "O(n^2)", "O(1)"],
            ["Worst (reverse sorted)", "O(n^2)", "O(1)"],
          ]}
        />

        <Callout type="info" title="Great for 'online' algorithms">
          <p>
            An "online" algorithm is one that can process data as it arrives,
            without needing all of the data up front. Insertion sort is
            naturally suited for this. If numbers are streaming in one at a
            time, you can insert each new number into the already-sorted portion
            immediately. Bubble sort and selection sort cannot do this — they
            need the full array to work correctly.
          </p>
        </Callout>
      </div>

      {/* ───────────── 6. Comparison ───────────── */}
      <div className="section">
        <h2>Comparing the Three</h2>
        <p>
          All three algorithms are O(n^2) in the average and worst cases, but
          they have distinct characteristics that make each one preferable in
          certain situations.
        </p>

        <ComplexityTable
          headers={[
            "Algorithm",
            "Best Time",
            "Average Time",
            "Worst Time",
            "Space",
          ]}
          rows={[
            ["Bubble Sort", "O(n)", "O(n^2)", "O(n^2)", "O(1)"],
            ["Selection Sort", "O(n^2)", "O(n^2)", "O(n^2)", "O(1)"],
            ["Insertion Sort", "O(n)", "O(n^2)", "O(n^2)", "O(1)"],
          ]}
        />

        <h3>When to Use Which</h3>
        <ul>
          <li>
            <strong>Bubble Sort</strong> — Rarely the best choice in practice,
            but useful as a teaching tool. With the <code>noSwaps</code>{" "}
            optimization, it can be fast on nearly sorted data. It is also
            stable (preserves the relative order of equal elements).
          </li>
          <li>
            <strong>Selection Sort</strong> — Best when the cost of swapping is
            high and the cost of comparison is low. It makes at most n swaps,
            which is the fewest of the three. However, it is generally the
            slowest of the three for nearly sorted data.
          </li>
          <li>
            <strong>Insertion Sort</strong> — The most practical of the three.
            Excellent for small arrays, nearly sorted data, and online data
            (elements arriving one at a time). Many real-world sorting
            implementations use insertion sort for small subarrays (including
            JavaScript engines, which often use it as a subroutine inside
            Timsort).
          </li>
        </ul>

        <Callout type="tip" title="A practical rule of thumb">
          <p>
            If you had to pick one of these three for general use, pick
            insertion sort. It has the best real-world performance on small and
            nearly sorted arrays, it is simple to implement, and it is stable.
            This is why production sorting algorithms like Timsort use insertion
            sort internally for small chunks.
          </p>
        </Callout>
      </div>

      {/* ───────────── 7. Key Insight ───────────── */}
      <div className="section">
        <h2>The Bigger Picture</h2>
        <p>
          All three of these algorithms share a fundamental limitation: they
          are O(n^2) in the average case. That means if you double the input
          size, the runtime roughly quadruples. For 1,000 elements, that is
          about 1,000,000 operations. For 1,000,000 elements, that is about
          1,000,000,000,000 operations — far too slow for any practical use.
        </p>
        <p>
          So why do we study them? Because they teach you the{" "}
          <strong>building blocks</strong> of sorting: comparing, swapping,
          maintaining sorted and unsorted regions, and reasoning about
          invariants. Every faster algorithm you learn — merge sort, quicksort,
          radix sort — uses these same concepts in more clever ways.
        </p>
        <p>
          The good news is: <strong>we can do much better</strong>. By using
          divide-and-conquer strategies, we can sort in O(n log n) time. That
          means for 1,000,000 elements, roughly 20,000,000 operations instead
          of 1,000,000,000,000. That is the difference between a fraction of a
          second and several minutes.
        </p>

        <Callout type="info" title="What comes next">
          <p>
            The next section covers <strong>merge sort</strong>,{" "}
            <strong>quicksort</strong>, and <strong>radix sort</strong> — sorting
            algorithms that break through the O(n^2) barrier. Understanding the
            elementary sorts we covered here will make those algorithms much
            easier to grasp.
          </p>
        </Callout>
      </div>

      {/* ───────────── 8. Interview Tips ───────────── */}
      <div className="section">
        <h2>Interview Tips</h2>

        <Callout type="interview" title="Know the tradeoffs cold">
          <p>
            Interviewers love asking: "What is the difference between bubble
            sort, selection sort, and insertion sort?" Be ready to discuss time
            complexity in the best, average, and worst cases. Mention that
            insertion sort is the best all-around choice among the three, and
            explain why (online algorithm, O(n) on nearly sorted data, used as
            a subroutine in Timsort).
          </p>
        </Callout>

        <Callout type="interview" title="Be able to code them from scratch">
          <p>
            You should be able to write all three from memory in under five
            minutes each. Pay special attention to loop bounds — off-by-one
            errors are the most common mistake. Practice until the code flows
            naturally.
          </p>
        </Callout>

        <Callout type="interview" title="Know when O(n^2) is acceptable">
          <p>
            If the interviewer says the input is small (say, n &lt; 50) or
            nearly sorted, an O(n^2) algorithm is perfectly fine. Do not
            over-engineer a merge sort for a 10-element array. State your
            reasoning: "Since n is small, insertion sort is efficient and simple
            to implement."
          </p>
        </Callout>

        <Callout type="interview" title="Stability matters">
          <p>
            A sorting algorithm is <strong>stable</strong> if it preserves the
            relative order of elements with equal keys. Bubble sort and
            insertion sort are stable. Selection sort is <strong>not</strong>{" "}
            stable. This matters when sorting objects by multiple criteria (e.g.,
            sort by last name, then by first name). If an interviewer asks about
            stability, this is what they mean.
          </p>
        </Callout>

        <Callout type="tip" title="The big picture answer">
          <p>
            If you are asked "why not just use bubble sort for everything?",
            the answer is: "Elementary sorts are O(n^2), which does not scale.
            For large datasets, we need O(n log n) algorithms like merge sort
            or quicksort. But for small or nearly sorted datasets, insertion
            sort is actually a great choice — even V8 uses it internally."
          </p>
        </Callout>
      </div>

      <TopicNav slug="elementary-sorting" />
    </div>
  );
}
