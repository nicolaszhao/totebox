const expect = chai.expect;

describe('browser', () => {
  describe('#storageTable', () => {
    const storageTable = $totebox.browser.storageTable;
    const table = storageTable('p1');

    beforeEach(() => {
      table.clear();
    });

    const testStorageTable = (tasks, expected) => {
      const strValue = r => JSON.stringify(r);
      let descriptions = [];

      tasks.forEach((task) => {
        const { method, data } = task;
        const paramsText = {
          set: `secondaryKey, ${strValue(data)}`,
          remove: 'secondaryKey',
          clear: '',
        };

        descriptions.push(
          `exec storageTable(primaryKey).${method}(${paramsText[method]})`
        );
      });

      descriptions = descriptions.join('\n\t& ') + '\n\t=> ' + strValue(expected);

      it(descriptions, () => {
        tasks.forEach((task) => table[task.method]('s1', task.data));
        expect(table.get('s1')).to.deep.equal(expected);
      });
    };

    testStorageTable([{ method: 'set', data: { a: 1 } }], { a: 1 });
    testStorageTable([
      { method: 'set', data: { a: 1 } },
      { method: 'set', data: { b: 2 } },
    ], { a: 1, b: 2 });
    testStorageTable([
      { method: 'set', data: { a: 1 } },
      { method: 'set', data: [1, 2] },
    ], [1, 2]);
    testStorageTable([
      { method: 'set', data: { a: 1 } },
      { method: 'remove' },
    ], null);
    testStorageTable([
      { method: 'set', data: { a: 1 } },
      { method: 'clear' },
    ], null);
  });

  describe('#loadScript', () => {
    const file = 'https://code.jquery.com/jquery-3.4.1.min.js';

    it('load JavaScript file', (done) => {
      $totebox.browser.loadScript(file, {
        done: () => done(),
        fail: () => done(new Error('failed to load js file')),
      })
    });
  });
});
