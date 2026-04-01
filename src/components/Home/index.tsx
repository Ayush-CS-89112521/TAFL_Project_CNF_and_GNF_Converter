import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Code2, Network, Clock, CheckCircle2, Download } from 'lucide-react';
import type { AppScreen } from '../../store/grammarStore';

interface HomeProps {
  setScreen: (screen: AppScreen) => void;
}

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export function Home({ setScreen }: HomeProps) {
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
            ⚡ V2.4 LUMINOUS ENGINE LIVE
          </motion.p>

          <h1 className="landing-hero-title">
            Transform Grammars
            <br />
            with <span className="highlight">Editorial Precision</span>.
          </h1>

          <p className="landing-hero-subtitle">
            The Grammar Archivist is a high-fidelity environment for formal language analysis. Deconstruct, normalize,
            and visualize context-free structures with the clarity of a modern editor.
          </p>

          <div className="hero-actions">
            <motion.button
              className="btn-hero-primary"
              onClick={() => setScreen('workspace')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Initialize Transformation
            </motion.button>
            <motion.button
              className="btn-hero-secondary"
              onClick={() => setScreen('history')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Schema Archive
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Code Example Section */}
      <ScrollReveal>
        <div className="code-showcase">
          <div className="code-example">
            <div className="code-header">
              <span className="code-filename">grammar_normalization.pipeline.js</span>
            </div>
            <pre className="code-block">{`// Original Grammar
S → abS | CD | ε
C → cC | c
D → dD | d

// Archive Result (GNF)
S → aB | cC | dD | ε
B → bS
C → cC | c
D → dD | d

// Running CNF Algorithm...`}</pre>
          </div>
        </div>
      </ScrollReveal>

      {/* Mathematical Harmony Section */}
      <ScrollReveal>
        <div className="harmony-section">
          <h2>Engineered for Mathematical Harmony.</h2>
          <p>
            Every transformation is traced. Every production is indexed. Experience a tool that understands the
            architecture of language as deeply as you do.
          </p>

          <div className="features-grid">
            <motion.div className="feature-card" whileHover={{ y: -8 }}>
              <div className="feature-icon">
                <Code2 size={32} />
              </div>
              <h3>Step-by-Step CNF/GNF Analysis</h3>
              <p>Archive every step of the normalization process. From initial visibility into the Chomsky and Greibach
                forms.</p>
            </motion.div>

            <motion.div className="feature-card" whileHover={{ y: -8 }}>
              <div className="feature-icon">
                <Network size={32} />
              </div>
              <h3>Graph Visualization</h3>
              <p>Visualize non-terminal dependency graphs, tree structures, and production relationships at a glance.</p>
            </motion.div>

            <motion.div className="feature-card" whileHover={{ y: -8 }}>
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>Historical Archives</h3>
              <p>Retrieve previously processed grammars with full state preservation and automatic revision tracking.</p>
            </motion.div>

            <motion.div className="feature-card" whileHover={{ y: -8 }}>
              <div className="feature-icon">
                <CheckCircle2 size={32} />
              </div>
              <h3>Validation Engine</h3>
              <p>Identify unreachable productions, useless symbols, and infinite loops before transformation.</p>
            </motion.div>

            <motion.div className="feature-card" whileHover={{ y: -8 }}>
              <div className="feature-icon">
                <Download size={32} />
              </div>
              <h3>Export to JSON/YAML</h3>
              <p>Export normalized grammars in multiple production environments with guaranteed parser compatibility.</p>
            </motion.div>

            <motion.div className="feature-card" whileHover={{ y: -8 }}>
              <div className="feature-icon">
                <ArrowRight size={32} />
              </div>
              <h3>One-Click Workflows</h3>
              <p>Chain transformations together in sequential pipelines. Transform once, use everywhere.</p>
            </motion.div>
          </div>
        </div>
      </ScrollReveal>

      {/* Lab & Gallery Section */}
      <ScrollReveal>
        <div className="lab-gallery-section">
          <div className="lab-gallery-content">
            <h2>The Precision of a Lab.<br />The Feel of a Gallery.</h2>

            <div className="lab-features">
              <div className="lab-feature">
                <CheckCircle2 className="check-icon" size={24} />
                <h4>Auto-Bureaucratization</h4>
                <p>Single-click transformation to CNF or GNF with guaranteed semantic parity. No manual rule checking required.</p>
              </div>

              <div className="lab-feature">
                <CheckCircle2 className="check-icon" size={24} />
                <h4>Validation Engine</h4>
                <p>Identify unreachable productions, useless non-terminals, and infinite recursion with our diagnostic layer.</p>
              </div>

              <div className="lab-feature">
                <CheckCircle2 className="check-icon" size={24} />
                <h4>Export to JSON/YAML</h4>
                <p>Export canonicalized productions in industry-standard formats optimized for parsers and compilers.</p>
              </div>
            </div>

            <div className="lab-stats">
              <div className="stat-box">
                <p className="stat-number">99.9%</p>
                <p className="stat-label">PARSING ACCURACY ON COMPLEX RECURSIONS</p>
              </div>
            </div>
          </div>

          <div className="lab-gallery-image">
            <div className="image-placeholder">Images & Diagrams</div>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <div className="landing-cta">
          <h2>Ready to refine?</h2>
          <p>Connect your repository or input rules directly to begin the archival process.</p>
          <motion.button
            className="btn-cta-primary"
            onClick={() => setScreen('workspace')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Workspace
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-wrapper">
          <div className="footer-top">
            <div className="footer-section">
              <h4>Luminous Archive</h4>
              <p>The next-generation grammar development tools with unprecedented precision.</p>
            </div>

            <div className="footer-section">
              <h4>PLATFORM</h4>
              <ul>
                <li>Changelog</li>
                <li>GitHub</li>
                <li>Support</li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>RESOURCES</h4>
              <ul>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Showcase Lab</li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>STATUS</h4>
              <ul>
                <li>✓ System Operational</li>
                <li>Update: PUBLIC BETA</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Luminous Archive. Engineered by Editorial Precision.</p>
          </div>
        </div>
      </footer>
    </section>
  );
}

