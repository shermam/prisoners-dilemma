export class CooperatePPercent {
  /** @type {number} */
  #percent;

  /**
   *
   * @param {number} p
   */
  constructor(p) {
    this.#percent = p;
  }

  run() {
    return Math.random() * 100 < this.#percent;
  }
}
