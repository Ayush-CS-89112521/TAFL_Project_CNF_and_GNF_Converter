import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, GitBranch, Mail } from 'lucide-react';
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
  const showcaseItems = [
    {
      title: 'Epsilon Removal',
      description:
        'Eliminate epsilon productions from your context-free grammar, ensuring that the grammar generates only non-empty strings.',
      imagePosition: 'left' as const,
    },
    {
      title: 'Unit Production Elimination',
      description:
        'Remove unit productions (A → B) that can complicate grammar analysis and transformation processes.',
      imagePosition: 'right' as const,
    },
    {
      title: 'Useless Symbol Removal',
      description:
        'Identify and eliminate non-reachable and non-productive symbols, cleaning up your grammar.',
      imagePosition: 'left' as const,
    },
    {
      title: 'Terminal Replacement',
      description: 'Convert mixed terminals and non-terminals in productions to pure non-terminal strings.',
      imagePosition: 'right' as const,
    },
    {
      title: 'Binarization',
      description:
        'Transform production rules with more than two symbols on the right-hand side into binary form.',
      imagePosition: 'left' as const,
    },
    {
      title: 'Variable Ordering',
      description:
        'Standardize and order non-terminal variables for systematic transformation and consistent representation.',
      imagePosition: 'right' as const,
    },
    {
      title: 'Substitution & Left Recursion',
      description:
        'Apply systematic substitutions and eliminate left recursion for Greibach Normal Form conversion.',
      imagePosition: 'left' as const,
    },
    {
      title: 'Terminal-First Production',
      description:
        'Transform all productions to begin with terminals followed by non-terminals for GNF compliance.',
      imagePosition: 'right' as const,
    },
  ];

  return (
    <section className="home-container">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="hero-content">
          <h1 className="hero-main-title">Grammar Converter</h1>
          <p className="hero-main-subtitle">
            Transform context-free grammars into Chomsky Normal Form (CNF) and Greibach Normal Form (GNF)
            with step-by-step visualization and comprehensive analysis.
          </p>
          <motion.button
            className="btn-hero"
            onClick={() => setScreen('workspace')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Showcase Section */}
      <div className="showcase-section">
        <ScrollReveal>
          <h2 className="section-title">Conversion Pipeline</h2>
          <p className="section-subtitle">
            Explore the comprehensive features of our grammar transformation system
          </p>
        </ScrollReveal>

        <div className="showcase-grid">
          {showcaseItems.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className={`showcase-item ${item.imagePosition}`}>
                <div className="showcase-image">
                  <div className="image-placeholder">
                    <span>Image Placeholder {index + 1}</span>
                  </div>
                </div>
                <div className="showcase-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CNF Section */}
      <ScrollReveal>
        <div className="feature-section cnf-section">
          <div className="feature-image">
            <div className="image-placeholder large">
              <span>CNF Graph Placeholder</span>
            </div>
          </div>
          <div className="feature-content">
            <h2>Chomsky Normal Form (CNF)</h2>
            <p>
              Chomsky Normal Form is a standardized representation of context-free grammars where every production rule
              is in one of two forms:
            </p>
            <ul className="feature-list">
              <li>
                <strong>A → BC</strong> (two non-terminals on the right)
              </li>
              <li>
                <strong>A → a</strong> (single terminal on the right)
              </li>
              <li>
                <strong>S → ε</strong> (epsilon only for start symbol)
              </li>
            </ul>
            <p>
              CNF is essential for parsing algorithms like the CYK parser and is widely used in compiler design,
              natural language processing, and formal language theory.
            </p>
            <motion.button
              className="btn-secondary"
              onClick={() => setScreen('workspace')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore CNF
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </ScrollReveal>

      {/* GNF Section */}
      <ScrollReveal>
        <div className="feature-section gnf-section">
          <div className="feature-content">
            <h2>Greibach Normal Form (GNF)</h2>
            <p>
              Greibach Normal Form is a restricted form of context-free grammar where every non-epsilon production rule
              begins with exactly one terminal symbol, followed by zero or more non-terminals:
            </p>
            <ul className="feature-list">
              <li>
                <strong>A → aα</strong> (terminal followed by non-terminals)
              </li>
              <li>
                <strong>S → ε</strong> (epsilon only for start symbol)
              </li>
            </ul>
            <p>
              GNF is particularly useful for pushdown automata construction, top-down parsing, and proving properties
              of context-free languages. Every context-free language (except those containing only the empty string) can
              be generated by a GNF grammar.
            </p>
            <motion.button
              className="btn-secondary"
              onClick={() => setScreen('workspace')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore GNF
              <ArrowRight size={16} />
            </motion.button>
          </div>
          <div className="feature-image">
            <div className="image-placeholder large">
              <span>GNF Graph Placeholder</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to Transform Your Grammar?</h2>
            <p>Convert any context-free grammar to CNF and GNF with detailed step-by-step transformations.</p>
            <motion.button
              className="btn-primary-large"
              onClick={() => setScreen('workspace')}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Converting
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Grammar Converter</h4>
            <p>A comprehensive tool for formal grammar transformations and analysis.</p>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#" onClick={() => setScreen('workspace')}>
                  Workspace
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setScreen('exports')}>
                  Export Center
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setScreen('history')}>
                  Archive
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <GitBranch size={18} />
              </a>
              <a href="mailto:contact@example.com">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Grammar Converter. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
