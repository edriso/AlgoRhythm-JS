import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import BigO from "./pages/BigO";
import ArraysObjects from "./pages/ArraysObjects";
import ProblemSolving from "./pages/ProblemSolving";
import Recursion from "./pages/Recursion";
import Searching from "./pages/Searching";
import ElementarySorting from "./pages/ElementarySorting";
import IntermediateSorting from "./pages/IntermediateSorting";
import SinglyLinkedLists from "./pages/SinglyLinkedLists";
import DoublyLinkedLists from "./pages/DoublyLinkedLists";
import StacksQueues from "./pages/StacksQueues";
import Trees from "./pages/Trees";
import Heaps from "./pages/Heaps";
import HashTables from "./pages/HashTables";
import Graphs from "./pages/Graphs";
import DynamicProgramming from "./pages/DynamicProgramming";

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
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
      </main>
    </div>
  );
}
