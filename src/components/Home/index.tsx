import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: '0px 0px -100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.95 }}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 100, damping: 25 }}
    >
      {children}
    </motion.div>
  );
};

export function Home() {
  const navigate = useNavigate();

  const projectPhotos = [
    { id: 1, title: 'Grammar Input', description: 'Define your context-free grammar with a clean, intuitive editor. Support for BNF notation and custom syntax.' },
    { id: 2, title: 'Step-by-Step Analysis', description: 'Follow each transformation step with detailed rule tracking. See exactly how your grammar evolves through each pipeline stage.' },
    { id: 3, title: 'Visual Graph Representation', description: 'See production relationships visualized in real-time. Understand dependencies between non-terminals at a glance.' },
    { id: 4, title: 'Final Normalized Output', description: 'Get your grammar in CNF or GNF form immediately. Verify correctness with validation engine.' },
    { id: 5, title: 'Multi-Format Export', description: 'Download your results in JSON, YAML, or PDF format. Share transformations with teams and colleagues.' },
    { id: 6, title: 'Transformation History', description: 'Retrieve and restore previous transformations anytime. Permanent archive of all your grammar conversions.' },
  ];

  return (
    <section className="landing-page">
      {/* Hero Section */}
      <div className="landing-hero">
        <motion.div
          className="hero-content-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p className="hero-tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            ⚡ FORMAL LANGUAGE PROCESSING SUITE
          </motion.p>

          <h1 className="landing-hero-title">
            Transform Grammars
            <br />
            with <span className="highlight">Precision and Clarity</span>.
          </h1>

          <p className="landing-hero-subtitle">
            A professional environment for formal language analysis. Convert context-free grammars to Chomsky Normal Form
            and Greibach Normal Form with visual feedback, step-by-step analysis, and comprehensive documentation.
          </p>

          <div className="hero-actions">
            <motion.button
              className="btn-hero-primary"
              onClick={() => navigate('/tool')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Converting
            </motion.button>
            <motion.button
              className="btn-hero-secondary"
              onClick={() => navigate('/tool?view=history')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View History
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Project Showcase Section */}
      <div className="showcase-section">
        <ScrollReveal>
          <div className="showcase-header">
            <h2>Project Capabilities</h2>
            <p>Explore the features that make grammar transformation effortless and intuitive.</p>
          </div>
        </ScrollReveal>

        {projectPhotos.map((photo, idx) => (
          <ScrollReveal key={photo.id} delay={idx * 0.08}>
            <div className={`showcase-item ${idx % 2 === 0 ? 'image-left' : 'image-right'}`}>
              <div className="showcase-image">
                <div className="image-placeholder">{photo.title}</div>
              </div>
              <div className="showcase-content">
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* About CNF Section */}
      <ScrollReveal>
        <div className="about-section">
          <div className="about-image-container">
            <div className="about-image">
              <div className="image-placeholder cnf-img">CNF Grammar Rules</div>
            </div>
          </div>
          <div className="about-text-container">
            <div className="about-content">
              <h2>About Chomsky Normal Form (CNF)</h2>
              <p className="about-intro">
                Chomsky Normal Form is a standardized representation of context-free grammars where all production rules follow
                one of two specific patterns. This form is fundamental in computational linguistics and compiler design.
              </p>

              <div className="about-definition">
                <h3>Production Rule Patterns</h3>
                <ul>
                  <li><CheckCircle2 size={20} /> <strong>A → BC</strong> - Two non-terminals on the right side</li>
                  <li><CheckCircle2 size={20} /> <strong>A → a</strong> - A single terminal on the right side</li>
                  <li><CheckCircle2 size={20} /> <strong>S → ε</strong> - Epsilon only for the start symbol (optional)</li>
                </ul>
              </div>

              <p className="about-text">
                This restricted form is essential for implementing efficient parsing algorithms like the CYK (Cocke-Younger-Kasami)
                algorithm, which runs in O(n³) time. CNF enables polynomial-time membership testing and makes theoretical analysis
                of grammars more tractable for automata theory applications.
              </p>

              <div className="about-example">
                <p className="example-label">Conversion Example:</p>
                <pre>{`Original Grammar:
  S → aAb | ε
  A → Sb | a

CNF Equivalent:
  S → AX | AB | B
  X → BB
  A → SB | a
  B → b`}</pre>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* About GNF Section */}
      <ScrollReveal>
        <div className="about-section reverse">
          <div className="about-image-container">
            <div className="about-image">
              <div className="image-placeholder gnf-img">GNF Parsing Structure</div>
            </div>
          </div>
          <div className="about-text-container">
            <div className="about-content">
              <h2>About Greibach Normal Form (GNF)</h2>
              <p className="about-intro">
                Greibach Normal Form is a more restrictive normal form where every non-epsilon production rule begins with
                exactly one terminal symbol. This property enables direct top-down parsing without backtracking or left recursion.
              </p>

              <div className="about-definition">
                <h3>Production Rule Pattern</h3>
                <ul>
                  <li><CheckCircle2 size={20} /> <strong>A → aα</strong> - Terminal first, followed by non-terminals (zero or more)</li>
                  <li><CheckCircle2 size={20} /> <strong>No left recursion</strong> - Grammar is inherently non-left-recursive</li>
                  <li><CheckCircle2 size={20} /> <strong>Deterministic parsing</strong> - PDA can parse without lookahead conflicts</li>
                </ul>
              </div>

              <p className="about-text">
                GNF is particularly useful for LL(1) parsing and recursive descent parsers. Every derivation in GNF consumes
                at least one terminal per production step, making it ideal for scanning-based approaches and eliminating
                backtracking issues in top-down parsing strategies.
              </p>

              <div className="about-example">
                <p className="example-label">Conversion Example:</p>
                <pre>{`Original Grammar:
  S → SaB | bA | a
  A → Sb | a

GNF Equivalent:
  S → bAaB | aB | a
  A → bAaaB | aaB`}</pre>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Center Box - Call to Action */}
      <ScrollReveal>
        <div className="center-box-wrapper">
          <div className="center-box">
            <h2>Ready to Transform?</h2>
            <p>Convert your context-free grammars to CNF or GNF with visual analysis and instant results.</p>
            <motion.button
              className="btn-center-primary"
              onClick={() => navigate('/tool')}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Converter
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-wrapper">
          <div className="footer-section">
            <h3>Grammar Archivist</h3>
            <p>Professional CNF and GNF conversion with visual step-by-step analysis and archival storage.</p>
          </div>
          <div className="footer-section">
            <h3>Key Features</h3>
            <ul>
              <li>Step-by-step transformation visualization</li>
              <li>Dependency graph rendering</li>
              <li>Multi-format export (JSON, YAML, PDF)</li>
              <li>Permanent transformation history</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Quick Access</h3>
            <ul>
              <li><button onClick={() => navigate('/tool')} className="footer-link">Open Converter</button></li>
              <li><button onClick={() => navigate('/tool?view=history')} className="footer-link">View History</button></li>
              <li><button onClick={() => navigate('/home')} className="footer-link">Home</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Grammar Archivist. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
