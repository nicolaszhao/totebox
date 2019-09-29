import { expect } from 'chai';
import History from '../src/index';

describe('History', () => {
  describe('#history.direct()', () => {
    const history = new History();

    it(
      `history.direct('/a') should return 1`,
      () => {
        expect(history.direct('/a')).to.equal(1);
      }
    );

    it(
      `history.direct('/a') call again should return 2`,
      () => {
        expect(history.direct('/a')).to.equal(2);
      }
    );

    it(
      `history.direct('/b') should return 3`,
      () => {
        expect(history.direct('/b')).to.equal(3);
      }
    );

    it(
      `history.direct('/a') should return -1`,
      () => {
        expect(history.direct('/a')).to.equal(-1);
      }
    );

    it(
      `history.direct('/b') call again should return 1`,
      () => {
        expect(history.direct('/b')).to.equal(1);
      }
    );

    it(
      `history.direct('/a') call again and then call history.direct('/c') should return 2`,
      () => {
        history.direct('/a');
        expect(history.direct('/c')).to.equal(2);
      }
    );
  });
});
