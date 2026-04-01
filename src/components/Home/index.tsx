import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Sparkles, Code2, Network } from 'lucide-react';
import grammerInputImg from '../../../Images/grammer_input.png';
import graphVizImg from '../../../Images/graph visualization.png';
import stepViewImg from '../../../Images/step_view.png';
import outputFormatImg from '../../../Images/output_format.png';

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
    <div className="luminous-page">
      {/* Navigation Bar */}
      <nav className="luminous-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Luminous Archive</span>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#transform" className="nav-link">Transform</a>
            <a href="#archive" className="nav-link active">Archive</a>
          </div>
          <button className="nav-cta-btn" onClick={() => navigate('/tool')}>
            Launch Tool
          </button>
        </div>
      </nav>

      <main className="luminous-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-grid-bg"></div>
          <div className="hero-gradient"></div>
          
          <ScrollReveal>
            <div className="hero-content">
              <div className="version-badge">
                <Sparkles size={16} />
                <span>Version 4.0 Archive Engine now live</span>
              </div>

              <h1 className="hero-title">
                Transform Grammars with <span className="hero-gradient-text">Precision and Clarity.</span>
              </h1>

              <p className="hero-subtitle">
                The professional standard for normalizing, visualizing, and analyzing complex language grammars. Engineered for clarity, built for developers.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => navigate('/tool')}>
                  Start Converting
                  <ArrowRight size={18} />
                </button>
                <button className="btn-secondary">View Demo</button>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Image Placeholder */}
          <ScrollReveal delay={0.2}>
            <div className="hero-image-container">
              <div className="hero-image-placeholder">
                <Code2 size={48} />
                <p>Code Editor Interface</p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Project Capabilities - Bento Grid */}
        <section className="bento-section">
          <ScrollReveal>
            <div className="bento-header">
              <h2>Precision Infrastructure</h2>
              <p>Deep-dive into our modular pipeline designed to handle the most rigorous linguistic requirements.</p>
            </div>
          </ScrollReveal>

          <div className="bento-grid">
            {/* Grammar Input */}
            <ScrollReveal delay={0.1}>
              <div className="bento-item">
                <div className="bento-label">01 / INPUT</div>
                <h3>Grammar Input</h3>
                <p>Direct ingestion of CFGs, EBNF, and custom grammar formats with real-time linting.</p>
                <img src={grammerInputImg} alt="Grammar Input Interface" style={{ width: '100%', borderRadius: '0.75rem', marginTop: '1rem' }} />
              </div>
            </ScrollReveal>

            {/* Visual Graph */}
            <ScrollReveal delay={0.15}>
              <div className="bento-item">
                <div className="bento-label">02 / VISUALIZE</div>
                <h3>Visual Graph</h3>
                <p>Interactive state-machine mapping of your language rules.</p>
                <img src={graphVizImg} alt="Graph View" style={{ width: '100%', borderRadius: '0.75rem', marginTop: '1rem' }} />
              </div>
            </ScrollReveal>

            {/* Step-by-Step Analysis */}
            <ScrollReveal delay={0.2}>
              <div className="bento-item">
                <div className="bento-label">03 / ANALYSIS</div>
                <h3>Step Analysis</h3>
                <p>Trace the normalization process through every transformation stage.</p>
                <img src={stepViewImg} alt="Step View" style={{ width: '100%', borderRadius: '0.75rem', marginTop: '1rem' }} />
              </div>
            </ScrollReveal>

            {/* Final Output */}
            <ScrollReveal delay={0.25}>
              <div className="bento-item">
                <div className="bento-label">04 / EXPORT</div>
                <h3>Final Normalized Output</h3>
                <p>Production-ready grammars optimized for LLVM or custom parser generators.</p>
                <img src={outputFormatImg} alt="Output Format" style={{ width: '100%', borderRadius: '0.75rem', marginTop: '1rem' }} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CNF Section */}
        <section className="cnf-section">
          <ScrollReveal>
            <div className="cnf-grid">
              {/* CNF Content */}
              <div className="cnf-content">
                <h2>Chomsky Normal Form <span className="cnf-highlight">(CNF)</span></h2>
                <p className="cnf-intro">
                  A Context-Free Grammar is in CNF if all its production rules are of the form A → BC or A → a. This binary branching structure is fundamental for the CYK parsing algorithm.
                </p>

                <div className="cnf-rules">
                  <div className="rule-box">
                    <div className="rule-notation">A → BC</div>
                    <div className="rule-desc">Non-terminal transition</div>
                  </div>
                  <div className="rule-box">
                    <div className="rule-notation">A → a</div>
                    <div className="rule-desc">Terminal transition</div>
                  </div>
                </div>
              </div>

              {/* CYK Grid Diagram */}
              <div className="cnf-diagram">
                <h3>CYK Parsing Grid</h3>
                <div className="cyk-grid">
                  <div className="grid-cell primary">S</div>
                  <div className="grid-cell"></div>
                  <div className="grid-cell"></div>
                  <div className="grid-cell"></div>
                  
                  <div className="grid-cell muted">A</div>
                  <div className="grid-cell primary">B</div>
                  <div className="grid-cell"></div>
                  <div className="grid-cell"></div>
                  
                  <div className="grid-cell muted">C</div>
                  <div className="grid-cell muted">D</div>
                  <div className="grid-cell primary">A</div>
                  <div className="grid-cell"></div>
                  
                  <div className="grid-cell secondary">a</div>
                  <div className="grid-cell secondary">b</div>
                  <div className="grid-cell secondary">a</div>
                  <div className="grid-cell secondary">a</div>
                </div>
                <p className="grid-desc">Dynamic Programming matrix for O(n³) string recognition.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Code Block */}
          <ScrollReveal delay={0.2}>
            <div className="code-block">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="code-filename">transformation.py</span>
              </div>
              <pre><code>{`# Convert CFG to Chomsky Normal Form
def to_cnf(grammar):
    grammar = remove_epsilon(grammar)
    grammar = remove_unit_productions(grammar)
    
    for rule in grammar.rules:
        if len(rule.body) > 2:
            # Binary split long productions
            grammar.split_production(rule)
        elif is_mixed(rule.body):
            # Encapsulate terminals
            grammar.isolate_terminals(rule)
            
    return grammar`}</code></pre>
            </div>
          </ScrollReveal>
        </section>

        {/* GNF Section */}
        <section className="gnf-section">
          <ScrollReveal>
            <div className="gnf-grid">
              {/* GNF Info Cards */}
              <div className="gnf-cards">
                <div className="gnf-card">
                  <Zap size={32} className="gnf-icon" />
                  <h3>Deterministic Parsing</h3>
                  <p>GNF ensures that every step of derivation consumes exactly one terminal. This property allows for a more direct mapping to Pushdown Automata (PDA) and avoids left-recursion issues.</p>
                </div>
                <div className="gnf-card">
                  <Code2 size={32} className="gnf-icon-primary" />
                  <h3>Formal Constraint</h3>
                  <div className="constraint-box">
                    <code>A → aα</code>
                    <small>where a ∈ Σ and α ∈ V*</small>
                  </div>
                </div>
              </div>

              {/* GNF Content */}
              <div className="gnf-content">
                <span className="gnf-section-label">SECTION 02</span>
                <h2>Greibach Normal <span className="gnf-highlight">Form</span></h2>
                <p>
                  Named after Sheila Greibach, this form is pivotal in the construction of LL(1) parsers. Every derivation leads with a terminal, essentially creating a 'lookahead' window that eliminates the ambiguity found in deeper nested non-terminal structures.
                </p>
                <div className="gnf-image-placeholder">
                  <Network size={48} />
                  <p>Server/Computing Infrastructure</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="luminous-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Luminous Archive</h3>
            <p>High-precision developer tools for formal language theory and syntactic transformation. Engineered for clarity and performance.</p>
            <p className="footer-copyright">© 2024 Luminous Archive. Engineered for Precision.</p>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#api">API Reference</a></li>
              <li><a href="#changelog">Changelog</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#status">Status</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
