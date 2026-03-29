# Project Analysis: Ion Frost Grammar Converter (TAFL Project)

I've taken a look at your project. It's an impressive frontend application designed to parse Context-Free Grammars (CFG) and step-by-step convert them into Chomsky Normal Form (CNF) and Greibach Normal Form (GNF). 

Here is a breakdown of what the codebase looks like and the features it supports.

## Top-Level Architecture
- **Framework:** React 19, TypeScript, Vite.
- **Styling:** TailwindCSS, Custom CSS (`index.css`), `framer-motion` for animations, and `lucide-react` for icons. Radix UI primitives are also included for accessible components.
- **State Management:** `zustand` is used for global state management (`useGrammarStore`), handling the pipeline of user inputs, parsed grammars, conversion steps, and view states.
- **Project Structure:** 
  - `src/grammar/`: Contains the parsing logic for CFGs and types (Rule, Grammar).
  - `src/cnf/`: Contains the algorithm to convert CFG to CNF (eliminating epsilons, unit productions, useless symbols, etc.).
  - `src/gnf/`: Contains the algorithm to convert CNF to GNF (eliminating left recursion, substituting terminals).
  - `src/lib/`: Houses utility functions such as `exportToPdf.ts` for PDF generation, `grammarToGraph.ts` for graphing, and `grammarToString.ts` for formatting output.
  - `src/components/`: Modular React components like `ExportPanel`, `GrammarGraphPanel`, `GrammarInput`, `GrammarTable`, `StatusBar`, and `StepViewer`.
  - `src/store/`: Zustand state store.

## Key Features
> [!NOTE]
> The application acts as an educational and visualization tool, bridging theoretic computer science algorithms with an interactive, visual medium.

### 1. Grammar Pipeline
The app features two main conversion pipelines:
- **CNF Pipeline:** Users can input a CFG. The application runs through a defined sequence of steps to reduce it to Chomsky Normal Form. The app tracks the before-and-after states (`StepAnalysis`) to allow users to scrub through the transformation intuitively.
- **GNF Pipeline:** After obtaining a CNF, users can further convert it into Greibach Normal Form. The application visually demonstrates the variable ordering and left-recursion elimination.

### 2. Interactive Visualization
Using `vis-network`, the project can render an interactive, physics-based dependency graph representing the grammar rules (`GrammarGraphPanel`).

### 3. Step-by-Step Viewer
Instead of just computing the final output, the interface explicitly manages transformation steps. `src/App.tsx` renders different screens (e.g., `steps`, `cnf-final`, `gnf-compare`, `graph`), letting users walk backward and forward through transformations.

### 4. History and Export
- **Exporting:** Users can download the transformed grammars in plaintext, JSON, or beautifully formatted PDF reports using `jspdf`. It also supports rendering "Before vs After" comparison PDFs.
- **Archiving:** The app retains a local history of grammar transformations, so users can restore or review past conversions.

## Conclusion
The repository (`bana-do-bc`) is well-organized, adhering to a "glass-dark/tech-focused" aesthetic as evidenced by the UI component names and the structured layout in `App.tsx`. The algorithmic core is neatly segregated from the UI components via the `zustand` store, making it very maintainable.

Would you like to build on top of this, fix any specific bugs, or perhaps add a new feature to the visualizer?
