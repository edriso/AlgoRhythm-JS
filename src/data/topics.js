export const topics = [
  {
    category: "Foundations",
    items: [
      { slug: "big-o", title: "Big O Notation", icon: "TrendingUp", description: "How to measure code performance and talk about it precisely" },
      { slug: "arrays-objects", title: "Arrays & Objects", icon: "Database", description: "Big O of built-in JS data structures and their methods" },
      { slug: "problem-solving", title: "Problem Solving Patterns", icon: "Lightbulb", description: "Frequency Counter, Multiple Pointers, Sliding Window, Divide & Conquer" },
      { slug: "recursion", title: "Recursion", icon: "Repeat", description: "Functions that call themselves - the base case, the call stack, and helper method recursion" },
    ],
  },
  {
    category: "Searching & Sorting",
    items: [
      { slug: "searching", title: "Searching Algorithms", icon: "Search", description: "Linear Search, Binary Search, and Naive String Search" },
      { slug: "elementary-sorting", title: "Elementary Sorting", icon: "ArrowUpDown", description: "Bubble Sort, Selection Sort, and Insertion Sort" },
      { slug: "intermediate-sorting", title: "Intermediate Sorting", icon: "GitMerge", description: "Merge Sort, Quick Sort, and Radix Sort" },
    ],
  },
  {
    category: "Data Structures",
    items: [
      { slug: "singly-linked-lists", title: "Singly Linked Lists", icon: "Link", description: "Nodes connected by next pointers - no indexes, no random access" },
      { slug: "doubly-linked-lists", title: "Doubly Linked Lists", icon: "Link2", description: "Like singly linked lists but each node also points backward" },
      { slug: "stacks-queues", title: "Stacks & Queues", icon: "Layers", description: "LIFO and FIFO - two fundamental abstract data structures" },
      { slug: "trees", title: "Trees & Tree Traversal", icon: "GitBranch", description: "Binary Search Trees, Breadth-First Search, Depth-First Search" },
      { slug: "heaps", title: "Binary Heaps", icon: "Triangle", description: "Max heaps, min heaps, and Priority Queues" },
      { slug: "hash-tables", title: "Hash Tables", icon: "Hash", description: "Key-value storage with O(1) access using hash functions" },
      { slug: "graphs", title: "Graphs & Dijkstra", icon: "Share2", description: "Vertices, edges, adjacency lists, BFS, DFS, and shortest path" },
    ],
  },
  {
    category: "Advanced",
    items: [
      { slug: "dynamic-programming", title: "Dynamic Programming", icon: "Zap", description: "Overlapping subproblems, optimal substructure, memoization, tabulation" },
    ],
  },
];

export function getTopicBySlug(slug) {
  for (const group of topics) {
    const found = group.items.find((t) => t.slug === slug);
    if (found) return { ...found, category: group.category };
  }
  return null;
}

export function getAllSlugs() {
  return topics.flatMap((g) => g.items.map((t) => t.slug));
}

export function getAdjacentTopics(slug) {
  const all = topics.flatMap((g) => g.items);
  const idx = all.findIndex((t) => t.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
