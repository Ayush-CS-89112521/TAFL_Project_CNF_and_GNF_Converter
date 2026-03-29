/**
 * GNF Step 4: Back-Substitution
 * After left recursion elimination, ensure every production starts with a terminal.
 * For any rule that still starts with a non-terminal, substitute that non-terminal's
 * productions until the first symbol is a terminal.
 * This is the final step to achieve Greibach Normal Form.
 */
import { makeRule, cloneGrammar, ruleToString } from '../grammar/types';
import type { Grammar, Rule, Diff, GrammarSymbol } from '../grammar/types';

// Guard 1: Maximum allowed body length before we declare a substitution explosion.
const MAX_BODY_LEN = 50;

export function backSubstitute(grammar: Grammar): { grammar: Grammar; diffs: Diff[] } {
  const diffs: Diff[] = [];

  let productions = [...grammar.productions];

  // Guard 2: Visited set — skip any production key we have already generated
  // to prevent the same substitution from firing on its own output.
  const visitedKeys = new Set<string>();
  for (const r of productions) visitedKeys.add(ruleToString(r));

  let changed = true;
  let globalIter = 0;

  while (changed && globalIter < 50) {
    changed = false;
    globalIter++;
    const nextProductions: Rule[] = [];

    for (const rule of productions) {
      if (rule.isEpsilon) {
        nextProductions.push(rule);
        continue;
      }

      const first = rule.body[0];

      // Already in GNF form — keep.
      if (first.type === 'terminal') {
        nextProductions.push(rule);
        continue;
      }

      // First symbol is non-terminal: substitute it.
      const ntVar = first.value;
      const ntProductions = productions.filter(r => r.head === ntVar && !r.isEpsilon);

      if (ntProductions.length === 0) {
        nextProductions.push(rule);
        continue;
      }

      const rest = rule.body.slice(1);
      changed = true;
      diffs.push({ type: 'remove', rule, reason: `Back-substituting: first symbol ${ntVar} replaced` });

      for (const ntRule of ntProductions) {
        const newBody: GrammarSymbol[] = [...ntRule.body, ...rest];

        // Guard 1: Explosion check.
        if (newBody.length > MAX_BODY_LEN) {
          throw new Error(
            `GNF back-substitution explosion: rule ${rule.head} → … grew to ${newBody.length} symbols. ` +
            `Check for indirect left recursion not eliminated in Step 3.`
          );
        }

        const newRule = makeRule(rule.head, newBody);
        const key = ruleToString(newRule);

        // Guard 2: Skip if this exact rule was already present or generated.
        if (visitedKeys.has(key)) continue;
        visitedKeys.add(key);

        nextProductions.push(newRule);
        diffs.push({
          type: 'add',
          rule: newRule,
          reason: `Back-substitution of ${ntVar}: now starts with terminal`,
        });
      }
    }

    // Deduplicate.
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

  // Mark all surviving rules.
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
