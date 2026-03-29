/**
 * GNF Step 3: Left Recursion Elimination
 * For each Aᵢ that has a direct left-recursive rule Aᵢ → Aᵢα,
 * introduce a new variable Zᵢ and replace:
 *   Aᵢ → Aᵢα  (left-recursive) → removed
 *   Aᵢ → β     (non-left-recursive) → becomes Aᵢ → β | β Zᵢ
 *   Zᵢ → α | α Zᵢ  (new rules)
 */
import { makeRule, cloneGrammar, ruleToString } from '../grammar/types';
import type { Grammar, Rule, Diff, GrammarSymbol } from '../grammar/types';

export function eliminateLeftRecursion(
  grammar: Grammar,
  ordering: string[]
): { grammar: Grammar; diffs: Diff[]; newVars: string[] } {
  const diffs: Diff[] = [];
  const newVars: string[] = [];

  let productions = [...grammar.productions];
  let zCounter = 1;

  for (const Ai of ordering) {
    // Find left-recursive and non-left-recursive Ai rules
    const leftRec = productions.filter(r =>
      r.head === Ai && !r.isEpsilon && r.body.length > 0 && r.body[0].value === Ai
    );

    if (leftRec.length === 0) {
      // No left recursion for Ai — mark all as kept
      productions.filter(r => r.head === Ai).forEach(r =>
        diffs.push({ type: 'keep', rule: r, reason: `${Ai}: no left recursion` })
      );
      continue;
    }

    const nonLeftRec = productions.filter(r =>
      r.head === Ai && !(r.body.length > 0 && r.body[0].value === Ai)
    );

    // Create Zᵢ
    const Zi = `Z${zCounter++}`;
    newVars.push(Zi);

    const newProductions: Rule[] = [];

    // Replace Ai rules with canonical non-left-recursive form: Ai -> beta Zi
    for (const betaRule of nonLeftRec) {
      const betaZiBody: GrammarSymbol[] = betaRule.isEpsilon
        ? [{ type: 'non-terminal', value: Zi }]
        : [...betaRule.body, { type: 'non-terminal', value: Zi }];
      const betaZiRule = makeRule(Ai, betaZiBody);
      newProductions.push(betaZiRule);
      diffs.push({
        type: 'add',
        rule: betaZiRule,
        reason: `${Ai}: replaced non-left rule with ${Ai} → β${Zi}`,
      });
      diffs.push({
        type: 'remove',
        rule: betaRule,
        reason: `${Ai}: original β rule removed during left-recursion elimination`,
      });
    }

    // For each left-recursive rule Ai → Ai α, create Zi → α | α Zi
    for (const lrRule of leftRec) {
      const alpha = lrRule.body.slice(1); // suffix after Ai

      diffs.push({ type: 'remove', rule: lrRule, reason: `${Ai}: left-recursive rule eliminated` });

      // Zi → α
      const ziRule = makeRule(Zi, alpha.length > 0 ? alpha : [], alpha.length === 0);
      newProductions.push(ziRule);
      diffs.push({
        type: 'add',
        rule: ziRule,
        reason: `New: ${Zi} → α (from left recursion elimination)`,
      });

      // Zi → α Zi
      if (alpha.length > 0) {
        const ziZiRule = makeRule(Zi, [...alpha, { type: 'non-terminal', value: Zi }]);
        newProductions.push(ziZiRule);
        diffs.push({
          type: 'add',
          rule: ziZiRule,
          reason: `New: ${Zi} → α${Zi}`,
        });
      }
    }

    // Remove old Ai rules, replace with newProductions
    productions = [
      ...productions.filter(r => r.head !== Ai),
      ...newProductions,
    ];

    // Deduplicate
    const seen = new Set<string>();
    productions = productions.filter(r => {
      const key = ruleToString(r);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  const after = cloneGrammar(grammar);
  after.productions = productions;
  for (const v of newVars) after.nonTerminals.add(v);

  return { grammar: after, diffs, newVars };
}
