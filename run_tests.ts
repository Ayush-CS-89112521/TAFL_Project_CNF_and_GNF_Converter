import { parseGrammar } from './src/grammar/parser';
import { convertToCNF } from './src/cnf';
import { convertToGNF } from './src/gnf';
import * as fs from 'fs';

const tests = [
  {
    name: "GNF STRESS 1: Single Non-terminal Left Recursion",
    input: `S → Sa | b`,
  },
  {
    name: "GNF STRESS 2: Two Separate Left Recursions",
    input: `S → Sb | a\nA → Ac | d`,
  },
  {
    name: "GNF STRESS 3: Indirect Left Recursion",
    input: `S → Ab\nA → Sa | c`,
  },
  {
    name: "GNF STRESS 4: Three Mutually Dependent Non-terminals",
    input: `S → Aa\nA → Bb\nB → Sc | d`,
  },
  {
    name: "GNF STRESS 5: Left Recursion + Nullable",
    input: `S → Sa | Ab\nA → c | ε`,
  },
  {
    name: "GNF STRESS 6: Left Recursion With Multiple Base Cases",
    input: `S → Sa | Sb | c | d | e`,
  },
  {
    name: "GNF STRESS 7: Right Recursion (Should Not Change)",
    input: `S → aS | b\nA → cA | d`,
  },
  {
    name: "GNF STRESS 8: Four-level Indirect Left Recursion",
    input: `S → Ab\nA → Bc\nB → Cd\nC → Sa | e`,
  },
  {
    name: "GNF STRESS 9B: Test 9 Variant (Reversed Ordering)",
    input: `A → Ab | Sa\nS → Sc | d`,
  },
  {
    name: "GNF STRESS 10: Maximum GNF Stress",
    input: `S → Sa | Ab | c\nA → Ac | Bd\nB → e | ε`,
  },
];

function ruleStr(g: any): string {
  return g.productions
    .map((r: any) => {
      const rhs = r.isEpsilon ? 'ε' : r.body.map((s: any) => s.value).join('');
      return `${r.head} → ${rhs}`;
    })
    .join('\n');
}

function checkGNF(g: any): { valid: boolean; violations: string[] } {
  const violations: string[] = [];
  for (const r of g.productions) {
    if (r.isEpsilon) continue;
    if (r.body.length === 0) continue;
    if (r.body[0].type !== 'terminal') {
      violations.push(`  ❌ ${r.head} → ${r.body.map((s: any) => s.value).join('')} (starts with non-terminal ${r.body[0].value})`);
    }
  }
  return { valid: violations.length === 0, violations };
}

function countProductions(g: any): number { return g.productions.length; }

function maxBodyLen(g: any): number {
  return g.productions.reduce((m: number, r: any) => Math.max(m, r.isEpsilon ? 0 : r.body.length), 0);
}

let out = '';
function log(msg: string) { out += msg + '\n'; }

for (const t of tests) {
  log('═'.repeat(56));
  log(t.name);
  log('═'.repeat(56));
  try {
    const { grammar: parsed, errors } = parseGrammar(t.input);
    if (errors.length > 0 || !parsed) {
      log('PARSE ERRORS: ' + JSON.stringify(errors));
      log('');
      continue;
    }

    // CNF
    const cnfSteps = convertToCNF(parsed);
    const cnfFinal = cnfSteps[cnfSteps.length - 1].after;
    log('CNF (' + countProductions(cnfFinal) + ' rules):');
    log(ruleStr(cnfFinal));

    // GNF
    log('');
    try {
      const gnfSteps = convertToGNF(cnfFinal);
      const gnfFinal = gnfSteps[gnfSteps.length - 1].after;
      const check = checkGNF(gnfFinal);
      const status = check.valid ? '✅ PASS' : '❌ FAIL';
      log(`GNF ${status} (${countProductions(gnfFinal)} rules, max body len=${maxBodyLen(gnfFinal)}):`);
      log(ruleStr(gnfFinal));
      if (!check.valid) {
        log('GNF violations:');
        check.violations.forEach(v => log(v));
      }
    } catch (gnfErr: any) {
      log('❌ GNF THREW: ' + gnfErr.message);
    }
  } catch (err: any) {
    log('❌ ERROR: ' + err.message);
  }
  log('');
}

fs.writeFileSync('test_output_utf8.txt', out, 'utf8');
console.log('Done — see test_output_utf8.txt');
