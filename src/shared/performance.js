import {performance} from 'perf_hooks';

/**
 * Performance class with some useful methods for easy testing
 * @export
 * @class Performance
 */
export class Performance {
  /**
   * Creates an instance of Performance.
   * When instantiating, the `start` method will be triggered
   * @memberof Performance
   */
  constructor() {
    this.start();
  }
  /**
   *
   * @memberof Performance
   */
  start() {
    /** Reference time/start */
    this.t0 = performance.now();
    /** Timestamp */
    this.t1 = performance.now();
  }

  /**
   * Resets the reference time `t0` timestamp.
   * Mainly an alias for the `start` method.
   * @memberof Performance
   */
  reset() {
    this.start();
  }

  /**
   * Logs the time in ms. and sec., together with a log message and after resets the reference time `t0`
   * @param {string} message Message to log with the time
   * @memberof Performance
   */
  log(message) {
    this.t1 = performance.now();
    console.log(`${message}${(this.t1 - this.t0)} ms. (${(this.t1 - this.t0) * 0.001} sec.)`);
    this.t0 = performance.now();
  }

  /**
   * Logs the time in ms. and sec., together with a log message but keeps the reference time `t0` running
   * @param {*} message
   * @memberof Performance
   */
  stamp(message) {
    this.t1 = performance.now();
    console.log(`${message}${(this.t1 - this.t0)} ms. (${(this.t1 - this.t0) * 0.001} sec.)`);
  }

  /**
   * Clear both times `t0` and `t1`
   * @param {*} message
   * @memberof Performance
   */
  end(message) {
    this.t0 = null;
    this.t1 = null;
  }
}
