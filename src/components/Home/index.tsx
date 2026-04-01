import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Network, Clock, CheckCircle2, Download } from 'lucide-react';

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
              onClick={() => navigate('/tool')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Initialize Transformation
            </motion.button>
            <motion.button
              className="btn-hero-secondary"
              onClick={() => navigate('/tool?view=history')}
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

      {/* Understanding CNF Section */}
      <ScrollReveal>
        <div className="edu-section cnf-section-edu">
          <div className="edu-container">
            <div className="edu-content">
              <h2>Understanding Chomsky Normal Form (CNF)</h2>
              <p className="edu-intro">
                A context-free grammar is in Chomsky Normal Form if all its production rules follow a strict pattern. This simplified form is essential for efficient parsing and algorithm implementation.
              </p>
              
              <div className="edu-definition">
                <h3>Core Definition</h3>
                <div className="def-list">
                  <div className="def-item">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>A → BC</strong> (Two non-terminals)
                    </div>
                  </div>
                  <div className="def-item">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>A → a</strong> (Single terminal)
                    </div>
                  </div>
                  <div className="def-item">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>S → ε</strong> (Only if S is the start symbol)
                    </div>
                  </div>
                </div>
              </div>

              <div className="edu-code-block">
                <p className="code-label">Sample CNF Transformation:</p>
                <pre>{`// Original Grammar
S → abS | CD | ε
A → aA | a
B → bB | b

// Transformed to CNF
S → AX | CD | ε
X → BX | B
A → aA | a
B → bB | b`}</pre>
              </div>
            </div>

            <div className="edu-visual">
              <div className="visualization-box">
                <div className="viz-placeholder">
                  <div className="viz-grid">
                    <div className="viz-node">S</div>
                    <div className="viz-arrow">→</div>
                    <div className="viz-node">AB</div>
                  </div>
                  <div className="viz-grid">
                    <div className="viz-node">A</div>
                    <div className="viz-arrow">→</div>
                    <div className="viz-node">a</div>
                  </div>
                  <div className="viz-grid">
                    <div className="viz-node">B</div>
                    <div className="viz-arrow">→</div>
                    <div className="viz-node">b</div>
                  </div>
                </div>
                <p className="viz-caption">CNF converts production rules to binary form, enabling efficient parsing algorithms (CYK, Earley).</p>
              </div>
            </div>
          </div>

          <div className="conversion-steps">
            <h3>Conversion Pipeline Steps</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">1</div>
                <h4>Epsilon Removal</h4>
                <p>Eliminate ε productions systematically, maintaining grammar equivalence.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">2</div>
                <h4>Unit Elimination</h4>
                <p>Remove unit productions (A → B) to simplify the grammar structure.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">3</div>
                <h4>Terminal Replacement</h4>
                <p>Isolate terminals in separate productions for binary compliance.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">4</div>
                <h4>Binarization</h4>
                <p>Convert all productions to at most two symbols on the right-hand side.</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Exploring GNF Section */}
      <ScrollReveal>
        <div className="edu-section gnf-section-edu">
          <div className="edu-container reverse">
            <div className="edu-visual">
              <div className="visualization-box gnf-viz">
                <div className="viz-placeholder gnf-concept">
                  <h4>GNF Structure</h4>
                  <div className="gnf-rule">
                    <div className="term">a</div>
                    <div className="arrow">→</div>
                    <div className="nonterms">XYZ...</div>
                  </div>
                  <p className="viz-caption small">Every production begins with a terminal, followed by zero or more non-terminals. This ensures top-down parsing compatibility.</p>
                </div>
              </div>
            </div>

            <div className="edu-content">
              <h2>Exploring Greibach Normal Form (GNF)</h2>
              <p className="edu-intro">
                Greibach Normal Form is a stricter normal form where every non-epsilon production rule begins with exactly one terminal symbol. This enables direct top-down parsing without backtracking.
              </p>

              <div className="edu-definition">
                <h3>Form Definition</h3>
                <p>A → a α where:</p>
                <div className="def-list">
                  <div className="def-item">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>a</strong> is a terminal symbol
                    </div>
                  </div>
                  <div className="def-item">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>α</strong> is a string of zero or more non-terminals
                    </div>
                  </div>
                  <div className="def-item">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>No left recursion</strong> allowed
                    </div>
                  </div>
                </div>
              </div>

              <div className="edu-code-block">
                <p className="code-label">GNF Transformation Example:</p>
                <pre>{`// Before GNF
S → aA | a
A → bB | b
B → cC | c

// After GNF
S → aA | a
A → bB | b
B → cC | c

// Deterministic Parsing Path
S → a[A] → [A] → b[B] → [B] → c[C] → [C]`}</pre>
              </div>
            </div>
          </div>

          <div className="conversion-steps gnf-steps">
            <h3>GNF Conversion Process</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">1</div>
                <h4>Left Recursion Elimination</h4>
                <p>Remove circular dependencies preventing top-down parsing.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">2</div>
                <h4>Variable Ordering</h4>
                <p>Systematically order non-terminals for substitution.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">3</div>
                <h4>Production Substitution</h4>
                <p>Substitute variables to move terminals to the front.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">4</div>
                <h4>Terminal-First Form</h4>
                <p>Ensure all productions begin with terminals.</p>
              </div>
            </div>
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
            <motion.div 
              className="feature-card" 
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              <div className="feature-icon">
                <Code2 size={32} />
              </div>
              <h3>Step-by-Step CNF/GNF Analysis</h3>
              <p>Archive every step of the normalization process. From initial visibility into the Chomsky and Greibach
                forms.</p>
            </motion.div>

            <motion.div 
              className="feature-card" 
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              <div className="feature-icon">
                <Network size={32} />
              </div>
              <h3>Graph Visualization</h3>
              <p>Visualize non-terminal dependency graphs, tree structures, and production relationships at a glance.</p>
            </motion.div>

            <motion.div 
              className="feature-card" 
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>Historical Archives</h3>
              <p>Retrieve previously processed grammars with full state preservation and automatic revision tracking.</p>
            </motion.div>

            <motion.div 
              className="feature-card" 
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              <div className="feature-icon">
                <CheckCircle2 size={32} />
              </div>
              <h3>Validation Engine</h3>
              <p>Identify unreachable productions, useless symbols, and infinite loops before transformation.</p>
            </motion.div>

            <motion.div 
              className="feature-card" 
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              <div className="feature-icon">
                <Download size={32} />
              </div>
              <h3>Export to JSON/YAML</h3>
              <p>Export normalized grammars in multiple production environments with guaranteed parser compatibility.</p>
            </motion.div>

            <motion.div 
              className="feature-card" 
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
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
            onClick={() => navigate('/tool')}
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

