// eslint-disable-next-line no-unused-vars
import {Photo} from './photo';
import {countCommonItems, countDistinctItems} from '../shared';

/**
 * The score is based on how interesting the transitions between each pair of subsequent
 * (neighbouring) slides are. We want the transitions to have something in common to preserve
 * continuity (the two slides should not be totally different), nut we also want them to be
 * different enough to keep the audience interested. The similarity of two vertical photos on
 * a single slide is not taken into account for the scoring funciton. This means that two photos
 * can, but don't have to, have tags in common.
 *
 * Score consists of 3 parts, where the minimum is chosen as result
 *  * The number of  common tags between Si and Si+1
 *  * The number of tags in Si but not in Si+1
 *  * The number of tags in Si+1 but not in Si
 * @property {number} common:The number of  common tags between Si and Si+1
 * @property {number} left:  The number of tags in Si but not in Si+1
 * @property {number} right: The number of tags in Si+1 but not in Si
 * @export
 * @class Score
 */
export class Score {
  /**
   * Score consists of 3 parts, where the minimum is chosen as result
   *  * **common**:The number of  common tags between Si and Si+1
   *  * **left**:  The number of tags in Si but not in Si+1
   *  * **right**: The number of tags in Si+1 but not in Si
   * @param {Photo} a Si
   * @param {Photo} b Si+1
   * @memberof Score
   */
  constructor(a, b) {
    this.current = a.id;
    this.next = b.id;
    this.common = countCommonItems(a.tags, b.tags, 5);
    this.left = countDistinctItems(a.tags, b.tags, 5);
    this.right = countDistinctItems(b.tags, a.tags, 5);
  }

  /**
   * Score consists of 3 parts, where the minimum is chosen as result
   *  * The number of  common tags between Si and Si+1
   *  * The number of tags in Si but not in Si+1
   *  * The number of tags in Si+1 but not in Si
   * @readonly
   * @memberof Score
   */
  get min() {
    return Math.min(this.common, this.left, this.right);
  }
}
