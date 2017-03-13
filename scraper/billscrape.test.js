const assert = require('assert');
const expect = require('expect.js');
const billscrape = require('./billscrape.js');

describe('check', () => {
  it('# will work if a test passes', () => {
    assert.equal(1, 1);
  });
  it('# will work if a test fails', () => {
    //assert.equal(1, 2);
  });
  it('# has access to billscrape functions', () => {
    expect(billscrape.tester).to.be.a('function');
  })
})

describe('level -2', () => {
  describe('database setup', () => {
    it('# there is a database table');
    it('# the database table has records that are accessible');
    it('# the function can access a specific database record')
  });

  describe('API setup', () => {
    it('# makes an API call');
    it('# the API call runs and returns a value');
    it('# the API response contains a bill ID and a latest major action');
  })
});

describe('level -1', () => {
  it('# can get discrete records from the database table');
  it('# the database records can be compared to the result of the API call');
  it('# does nothing if the results match');
  it('# runs a function if they do not match')
});

describe('level 0', () => {
  it('')
})