import { GammaSkyPage } from './app.po';

describe('gamma-sky App', () => {
  let page: GammaSkyPage;

  beforeEach(() => {
    page = new GammaSkyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(''); //TODO expect the text to equal 'gamma-sky.net'
  });
});
