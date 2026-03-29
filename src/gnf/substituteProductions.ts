/**
 * GNF Step 2: Production Substitution
 * For each rule Aᵢ → Aⱼγ where j < i (lower-order variable on the right),
 * substitute all productions of Aⱼ.
 * This ensures all rules of Aᵢ start with a terminal or a higher-index variable.
 */
import { makeRule, cloneGrammar, ruleToString } from '../grammar/types';
import type { Grammar, Rule, Diff, GrammarSymbol } from '../grammar/types';

export function substituteProductions(
  grammar: Grammar,
  ordering: string[]
): { grammar: Grammar; diffs: Diff[] } {
  const diffs: Diff[] = [];

  let productions = [...grammar.productions];

  // Iterate through each Aᵢ in order
  for (let i = 0; i < ordering.length; i++) {
    const Ai = ordering[i];

    let changed = true;
    let iterations = 0;
    while (changed && iterations < 100) {
      changed = false;
      iterations++;

      const nextProductions: Rule[] = [];

      for (const rule of productions) {
        if (rule.head !== Ai || rule.isEpsilon || rule.body.length === 0) {
          nextProductions.push(rule);
          continue;
        }

        const first = rule.body[0];

        // If first symbol is a non-terminal with a lower index (j < i)
        const j = ordering.indexOf(first.value);

        if (first.type === 'non-terminal' && j >= 0 && j < i) {
          // Substitute: find all productions of Aⱼ and replace.
          // IMPORTANT: Only substitute NON-left-recursive productions of Aⱼ
          // (those whose first symbol is NOT Aⱼ itself). Left-recursive
          // productions of Aⱼ are eliminated in Step 3. Substituting them
          // here copies the left-recursive form into Aᵢ, creating indirect
          // left recursion that causes infinite body growth.
          const Aj = first.value;
          const ajProductions = productions.filter(
            r => r.head === Aj && !( !r.isEpsilon && r.body.length > 0 && r.body[0].value === Aj )
          );

          if (ajProductions.length === 0) {
            // Aⱼ only has left-recursive productions right now; skip —
            // substituteProductions will re-run when Step 3 removes them.
            nextProductions.push(rule);
            continue;
          }

          const rest = rule.body.slice(1);
          changed = true;

          for (const ajRule of ajProductions) {
            let newBody: GrammarSymbol[];
            if (ajRule.isEpsilon) {
              newBody = rest.length > 0 ? rest : [];
            } else {
              newBody = [...ajRule.body, ...rest];
            }

            // Guard: prevent body explosion before it can start.
            if (newBody.length > 50) continue;

            const newRule = makeRule(Ai, newBody, newBody.length === 0);
            nextProductions.push(newRule);
            diffs.push({
              type: 'add',
              rule: newRule,
              reason: `Substituted ${Aj} (A${j + 1}) into ${Ai} (A${i + 1})`,
            });
          }

          diffs.push({
            type: 'remove',
            rule,
            reason: `Replaced by substitution of ${Aj}`,
          });
        } else {
          nextProductions.push(rule);
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
  }

  // Mark all kept rules
  const diffsMap = new Set(diffs.map(d => d.rule.id));
  for (const rule of productions) {
    if (!diffsMap.has(rule.id)) {
      diffs.push({ type: 'keep', rule, reason: 'Production already in correct form' });
    }
  }

  const after = cloneGrammar(grammar);
  after.productions = productions;
  return { grammar: after, diffs };
}
