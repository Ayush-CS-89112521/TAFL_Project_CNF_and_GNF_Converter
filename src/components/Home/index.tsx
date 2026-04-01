import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Sparkles, Code2 } from 'lucide-react';
import grammerInputImg from '../../../Images/grammer_input.png';
import graphVizImg from '../../../Images/graph visualization.png';
import stepViewImg from '../../../Images/step_view.png';
import outputFormatImg from '../../../Images/output_format.png';
import codeEditorImg from '../../../Images/code_editor_interface.png';
import serverComputingImg from '../../../Images/server_computing_infrasture.png';

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'precision-infrastructure', 'cnf', 'gnf'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = sectionId;
          }
        }
      }

      // Update nav link styles
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active');
      });
      const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="luminous-page">
      {/* Navigation Bar */}
      <nav className="luminous-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">CNF & GNF Converter</span>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#precision-infrastructure" className="nav-link">Precision Infrastructure</a>
            <a href="#cnf" className="nav-link">CNF</a>
            <a href="#gnf" className="nav-link">GNF</a>
          </div>
          <button className="nav-cta-btn" onClick={() => navigate('/tool')}>
            Launch Tool
          </button>
        </div>
      </nav>

      <main className="luminous-main">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-grid-bg"></div>
          <div className="hero-gradient"></div>
          
          <ScrollReveal>
            <div className="hero-content">
              <div className="version-badge">
                <Sparkles size={16} />
                <span>Grammar Conversion Engine v1.0</span>
              </div>

              <h1 className="hero-title">
                Convert Context-Free Grammars to <span className="hero-gradient-text">CNF & GNF</span>
              </h1>

              <p className="hero-subtitle">
                Automatically transform your context-free grammars into Chomsky Normal Form and Greibach Normal Form. A powerful tool for formal language analysis and automated parsing.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => navigate('/tool')}>
                  Start Converting
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Image */}
          <ScrollReveal delay={0.2}>
            <div className="hero-image-container">
              <img src={codeEditorImg} alt="Code Editor Interface" style={{ width: '100%', borderRadius: '0.75rem', border: '1px solid rgba(133, 173, 255, 0.2)' }} />
            </div>
          </ScrollReveal>
        </section>

        {/* Project Capabilities - Bento Grid */}
        <section id="precision-infrastructure" className="bento-section">
          <ScrollReveal>
            <div className="bento-header">
              <h2>Conversion Pipeline</h2>
              <p>A complete workflow for transforming context-free grammars through input, visualization, step-by-step analysis, and formatted output.</p>
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
        <section id="cnf" className="cnf-section">
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

                <div className="cnf-benefits">
                  <h4>Key Advantages</h4>
                  <ul className="cnf-list">
                    <li>Enables efficient CYK parsing algorithm with O(n³) complexity</li>
                    <li>Simplifies grammar analysis and transformation</li>
                    <li>Guarantees uniform derivation structure</li>
                    <li>Essential for automated syntax analysis and parsing</li>
                  </ul>
                </div>

                <div className="cnf-transform">
                  <h4>Transformation Process</h4>
                  <p className="cnf-small-text">Convert any Context-Free Grammar into CNF through systematic elimination of epsilon productions, unit productions, and useless symbols. Our tool automates this entire pipeline while preserving the language semantics.</p>
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
        <section id="gnf" className="gnf-section">
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
                <img src={serverComputingImg} alt="Server/Computing Infrastructure" style={{ width: '100%', borderRadius: '0.75rem', marginTop: '1.5rem', border: '1px solid rgba(133, 173, 255, 0.2)' }} />
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="luminous-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3>CNF & GNF Converter</h3>
            <p>Simplify grammar transformation with automatic conversion to Chomsky Normal Form and Greibach Normal Form. Essential for compiler development and formal language research.</p>
            <p className="footer-copyright">© 2024 CNF & GNF Converter. Transform with Precision.</p>
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
