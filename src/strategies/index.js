import { CooperatePPercent } from "./cooperate_p_percent.js";

/**
 * @type {{
 *   name: string;
 *   strategie: {
 *     run(): boolean;
 *   }
 * }[]}
 */
export const strategies = [
  ...[0, 1, 10, 25, 50, 75, 90, 99, 100].map((p) => ({
    name: `"cooperate-${p}-percent"`,
    strategie: new CooperatePPercent(p),
  })),
];
