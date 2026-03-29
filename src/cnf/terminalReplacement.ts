/**
 * Step 4: Terminal Replacement
 * For rules with 2+ body symbols, replace each terminal `a` with a fresh variable T_a.
 * Single-terminal rules (A → a) are left unchanged.
 */
import { makeRule, cloneGrammar } from '../grammar/types';
import type { Grammar, Rule, Diff, GrammarSymbol } from '../grammar/types';

export function terminalReplacement(grammar: Grammar): { grammar: Grammar; diffs: Diff[] } {
  const diffs: Diff[] = [];

  // Map terminal → new variable name
  const terminalVarMap = new Map<string, string>();
  const newRules: Rule[] = [];

  // Process existing productions
  const updatedProductions: Rule[] = [];

  for (const rule of grammar.productions) {
    // Skip: epsilon rules or single-body rules
    if (rule.isEpsilon) {
      updatedProductions.push(rule);
      diffs.push({ type: 'keep', rule, reason: 'ε-rule not modified' });
      continue;
    }

    if (rule.body.length === 1) {
      // A → a or A → B — leave as is
      updatedProductions.push(rule);
      diffs.push({ type: 'keep', rule, reason: 'Single-symbol rule not modified' });
      continue;
    }

    // rule.body.length >= 2: replace terminals
    const newBody: GrammarSymbol[] = [];
    let modified = false;

    for (const sym of rule.body) {
      if (sym.type === 'terminal') {
        // Create or reuse T_a variable
        if (!terminalVarMap.has(sym.value)) {
          terminalVarMap.set(sym.value, `T${sym.value.toUpperCase()}`);
        }
        const varName = terminalVarMap.get(sym.value)!;
        newBody.push({ type: 'non-terminal', value: varName });
        modified = true;
      } else {
        newBody.push(sym);
      }
    }

    const newRule = makeRule(rule.head, newBody);
    updatedProductions.push(newRule);

    if (modified) {
      diffs.push({
        type: 'add',
        rule: newRule,
        reason: `Terminals replaced with fresh variables`,
      });
      diffs.push({
        type: 'remove',
        rule,
        reason: `Original rule with mixed terminals replaced`,
      });
    } else {
      diffs.push({ type: 'keep', rule: newRule, reason: 'No terminals to replace' });
    }
  }

  // Add the new T_a → a rules
  for (const [terminal, varName] of terminalVarMap) {
    const termRule = makeRule(varName, [{ type: 'terminal', value: terminal }]);
    newRules.push(termRule);
    diffs.push({
      type: 'add',
      rule: termRule,
      reason: `New terminal variable: ${varName} → ${terminal}`,
    });
  }

  // Update grammar
  const after = cloneGrammar(grammar);
  after.productions = [...updatedProductions, ...newRules];

  // Update non-terminals
  for (const varName of terminalVarMap.values()) {
    after.nonTerminals.add(varName);
  }

  return { grammar: after, diffs };
}
