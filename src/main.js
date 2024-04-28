import { strategies } from "./strategies/index.js";

const ITERATIONS = 200;
/** @type {[number, number][]} */
const values = [
  [1, 1], // both defect
  [5, 0], // 1 deffects and 2 cooperates
  [0, 5], // 1 cooperates and 2 defects
  [3, 3], // both cooperate
];

/**
 * @type {Map<string, {
 *   resultValues: [number, number][];
 *   resultChoices: [boolean, boolean][];
 *   sumS1: number;
 *   sumS2: number;
 * }>}
 */
const resultsMap = new Map();

/**
 *
 * @returns {{
 *   resultValues: [number, number][];
 *   resultChoices: [boolean, boolean][];
 *   sumS1: number;
 *   sumS2: number;
 * }}
 */
function initState() {
  return {
    resultValues: [],
    resultChoices: [],
    sumS1: 0,
    sumS2: 0,
  };
}

// Play every strategy against every other strategy
for (let i = 0; i < strategies.length; i++) {
  for (let j = i; j < strategies.length; j++) {
    const s1 = strategies[i];
    const s2 = strategies[j];

    const state = initState();

    for (let c = 0; c < ITERATIONS; c++) {
      const v1 = s1?.strategie.run() ?? false;
      const v2 = s2?.strategie.run() ?? false;
      state.resultChoices.push([v1, v2]);
      // Using the binary position of 1s to choose the value of outcomes.
      // v1 controls the first  position (10) which is 2 in binary
      // v2 controls the second position (01) which is 1 in binary
      const resultValue = values[(v1 ? 2 : 0) | (v2 ? 1 : 0)] ?? [0, 0];
      state.sumS1 += resultValue[0] ?? 0;
      state.sumS2 += resultValue[1] ?? 0;
      state.resultValues.push(resultValue);
    }

    resultsMap.set(`${s1?.name} x ${s2?.name}`, state);
  }
}

console.log(resultsMap);
