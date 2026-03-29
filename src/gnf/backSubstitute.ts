/**
 * GNF Step 4: Back-Substitution
 * After left recursion elimination, ensure every production starts with a terminal.
 * For any rule that still starts with a non-terminal, substitute that non-terminal's
 * productions until the first symbol is a terminal.
 * This is the final step to achieve Greibach Normal Form.
 */
import { makeRule, cloneGrammar, ruleToString } from '../grammar/types';
import type { Grammar, Rule, Diff, GrammarSymbol } from '../grammar/types';

export function backSubstitute(grammar: Grammar): { grammar: Grammar; diffs: Diff[] } {
  const diffs: Diff[] = [];

  let productions = [...grammar.productions];

  // Repeat until all rules start with a terminal
  let changed = true;
  let globalIter = 0;

  while (changed && globalIter < 200) {
    changed = false;
    globalIter++;
    const nextProductions: Rule[] = [];

    for (const rule of productions) {
      if (rule.isEpsilon) {
        nextProductions.push(rule);
        continue;
      }

      const first = rule.body[0];

      // If first symbol is a terminal — already in GNF form
      if (first.type === 'terminal') {
        nextProductions.push(rule);
        continue;
      }

      // First symbol is non-terminal: substitute it
      const ntVar = first.value;
      const ntProductions = productions.filter(r => r.head === ntVar && !r.isEpsilon);

      if (ntProductions.length === 0) {
        // Can't substitute, keep as is
        nextProductions.push(rule);
        continue;
      }

      const rest = rule.body.slice(1);
      changed = true;

      diffs.push({ type: 'remove', rule, reason: `Back-substituting: first symbol ${ntVar} replaced` });

      for (const ntRule of ntProductions) {
        const newBody: GrammarSymbol[] = [...ntRule.body, ...rest];
        const newRule = makeRule(rule.head, newBody);
        nextProductions.push(newRule);
        diffs.push({
          type: 'add',
          rule: newRule,
          reason: `Back-substitution of ${ntVar}: now starts with terminal`,
        });
      }
    }

    // Deduplicate
    const seen = new Set<string>();
    productions = [];
    for (const r of nextProductions) {
      const key = ruleToString(r);
      if (!seen.has(key)) {
        seen.add(key);
        productions.push(r);
      }
    }
  }

  // Mark all remaining rules
  const inDiffs = new Set(diffs.map(d => d.rule.id));
  for (const rule of productions) {
    if (!inDiffs.has(rule.id)) {
      diffs.push({ type: 'keep', rule, reason: 'Already starts with terminal — GNF form ✓' });
    }
  }

  const after = cloneGrammar(grammar);
  after.productions = productions;

  return { grammar: after, diffs };
}
