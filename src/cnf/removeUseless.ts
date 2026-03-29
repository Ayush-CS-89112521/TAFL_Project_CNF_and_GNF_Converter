/**
 * Step 3: Useless Symbol Removal
 * Remove symbols that are either:
 *   - Non-generating: cannot derive any terminal string
 *   - Unreachable: cannot be reached from the start symbol
 */
import type { Grammar, Rule, Diff } from '../grammar/types';

export function removeUseless(grammar: Grammar): { grammar: Grammar; diffs: Diff[] } {
  const diffs: Diff[] = [];

  // Step 1: Find generating symbols (bottom-up)
  const generating = computeGenerating(grammar);

  // Step 2: Remove rules with non-generating symbols
  let productions = grammar.productions.filter(rule => {
    const bodyGenerating = rule.body.every(
      s => s.type === 'terminal' || generating.has(s.value)
    );
    const headGenerating = generating.has(rule.head);

    if (!headGenerating || !bodyGenerating) {
      diffs.push({
        type: 'remove',
        rule,
        reason: `Removed: contains non-generating symbol`,
      });
      return false;
    }
    return true;
  });

  // Rebuild grammar after removing non-generating
  const intermGrammar: Grammar = {
    start: grammar.start,
    terminals: new Set(grammar.terminals),
    nonTerminals: new Set([...grammar.nonTerminals].filter(v => generating.has(v) || v === grammar.start)),
    productions,
  };

  // Step 3: Find reachable symbols (top-down from start)
  const reachable = computeReachable(grammar.start, intermGrammar);

  // Step 4: Remove rules with unreachable symbols
  productions = productions.filter(rule => {
    const headReachable = reachable.has(rule.head);
    const bodyReachable = rule.body.every(
      s => s.type === 'terminal' || reachable.has(s.value)
    );

    if (!headReachable || !bodyReachable) {
      diffs.push({
        type: 'remove',
        rule,
        reason: `Removed: contains unreachable symbol`,
      });
      return false;
    }
    diffs.push({ type: 'keep', rule, reason: 'Symbol is generating and reachable' });
    return true;
  });

  const newNonTerminals = new Set([...intermGrammar.nonTerminals].filter(v => reachable.has(v) || v === grammar.start));
  const newTerminals = computeUsedTerminals(productions);

  const after: Grammar = {
    start: grammar.start,
    terminals: newTerminals,
    nonTerminals: newNonTerminals,
    productions,
  };

  return { grammar: after, diffs };
}

function computeGenerating(grammar: Grammar): Set<string> {
  const generating = new Set<string>();

  // Fixed-point: add NT if all body symbols are generating
  let changed = true;
  while (changed) {
    changed = false;
    for (const rule of grammar.productions) {
      if (!generating.has(rule.head)) {
        const bodyOk =
          rule.isEpsilon ||
          rule.body.every(s => s.type === 'terminal' || generating.has(s.value));
        if (bodyOk) {
          generating.add(rule.head);
          changed = true;
        }
      }
    }
  }

  return generating;
}

function computeReachable(start: string, grammar: Grammar): Set<string> {
  const reachable = new Set<string>([start]);
  const queue: string[] = [start];

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const rule of grammar.productions) {
      if (rule.head !== current) continue;
      for (const sym of rule.body) {
        if (!reachable.has(sym.value)) {
          reachable.add(sym.value);
          if (sym.type === 'non-terminal') queue.push(sym.value);
        }
      }
    }
  }

  return reachable;
}

function computeUsedTerminals(productions: Rule[]): Set<string> {
  const used = new Set<string>();
  for (const rule of productions) {
    for (const sym of rule.body) {
      if (sym.type === 'terminal') used.add(sym.value);
    }
  }
  return used;
}
