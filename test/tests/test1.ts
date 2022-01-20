
const expect = require('chai').expect;

import { setupDb, dropDb } from '../app';

describe("Suite 1", function () {
    this.timeout(50000);

    beforeEach(() => {
        return setupDb();
    });

    afterEach(() => dropDb());

    it('Test 1 (success)', () => {
        expect(1).to.equal(1);
    });

    it('Test 1 (fail)', () => {
        expect(1).to.equal(1);
    });
});