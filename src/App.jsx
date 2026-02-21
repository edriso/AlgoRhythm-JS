import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

const BigO = lazy(() => import("./pages/BigO"));
const ArraysObjects = lazy(() => import("./pages/ArraysObjects"));
const ProblemSolving = lazy(() => import("./pages/ProblemSolving"));
const Recursion = lazy(() => import("./pages/Recursion"));
const Searching = lazy(() => import("./pages/Searching"));
const ElementarySorting = lazy(() => import("./pages/ElementarySorting"));
const IntermediateSorting = lazy(() => import("./pages/IntermediateSorting"));
const SinglyLinkedLists = lazy(() => import("./pages/SinglyLinkedLists"));
const DoublyLinkedLists = lazy(() => import("./pages/DoublyLinkedLists"));
const StacksQueues = lazy(() => import("./pages/StacksQueues"));
const Trees = lazy(() => import("./pages/Trees"));
const Heaps = lazy(() => import("./pages/Heaps"));
const HashTables = lazy(() => import("./pages/HashTables"));
const Graphs = lazy(() => import("./pages/Graphs"));
const DynamicProgramming = lazy(() => import("./pages/DynamicProgramming"));

function Loading() {
  return <div style={{ padding: "2rem", color: "var(--text-dim)" }}>Loading...</div>;
}

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/big-o" element={<BigO />} />
            <Route path="/arrays-objects" element={<ArraysObjects />} />
            <Route path="/problem-solving" element={<ProblemSolving />} />
            <Route path="/recursion" element={<Recursion />} />
            <Route path="/searching" element={<Searching />} />
            <Route path="/elementary-sorting" element={<ElementarySorting />} />
            <Route path="/intermediate-sorting" element={<IntermediateSorting />} />
            <Route path="/singly-linked-lists" element={<SinglyLinkedLists />} />
            <Route path="/doubly-linked-lists" element={<DoublyLinkedLists />} />
            <Route path="/stacks-queues" element={<StacksQueues />} />
            <Route path="/trees" element={<Trees />} />
            <Route path="/heaps" element={<Heaps />} />
            <Route path="/hash-tables" element={<HashTables />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/dynamic-programming" element={<DynamicProgramming />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
