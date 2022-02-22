import { dropDb, setupDb } from '../app';
import IndexPage from '../pageobjects/index.page';

describe('Testing index', () => {

    beforeEach(() => {
        return setupDb();
    });

    afterEach(() => dropDb());

    it('Should have the correct text', async () => {
        await IndexPage.open();

        const heading = await IndexPage.heading;
        const text = await heading.getText();

        console.log(` **** ${heading} ****`);
        console.log(` **** ${text} ****`);

        expect(heading).toBeExisting();
        expect(text).toBe("It works!");
    });
});


