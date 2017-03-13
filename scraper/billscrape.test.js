//const assert = require('assert');
const chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const should = chai.should;
const assert = chai.assert;
const billscrape = require('./billscrape.js');

const testSpy = chai.spy(billscrape.tester);
const testSpyWithArg = chai.spy(billscrape.testerWithArg);


describe('check', () => {
  before(() => {
    testSpy();
  })
  it('# will work if a test passes', () => {
    assert.equal(1, 1);
  });
  it('# will catch if a test fails', () => {
    //assert.equal(1, 2);
  });
  it('# has access to billscrape functions', () => {
    expect(billscrape.tester).to.be.a('function');
    expect(testSpy).to.have.been.called();
    expect(testSpyWithArg).to.have.been.called();
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