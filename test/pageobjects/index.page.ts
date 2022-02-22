import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

class IndexPage extends Page {
    public get heading(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
        return $('h1');
    }

    public open(): Promise<string> {
        return super.open('');
    }
}

export default new IndexPage();
