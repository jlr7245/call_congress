const assert = require('assert');

describe('level -2', () => {
  describe('setup test', () => {
    it('#passes', () => {
      assert.equal(1, 1);
    });
    it('#has a second test');
  });
});

describe('level -1', () => {
  describe('subtest 1', () => {
    it('#passes', () => {});
  });
});