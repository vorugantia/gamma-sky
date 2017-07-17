import { GammaSkyPage } from './app.po';

describe('gamma-sky App', () => {
  let page: GammaSkyPage;

  beforeEach(() => {
    page = new GammaSkyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo('/');

    expect(page.getTextByTags('app-root h1')).toEqual('');
  });

  it('should display source name when going to source detail view', () => {
    page.navigateTo('/#/cat/tev/0');
    expect(page.getTextById('e2e-source-tev-name')).toEqual('CTA 1');

    page.navigateTo('/#/cat/3fhl/0');
    expect(page.getTextById('e2e-source-3fhl-name' )).toEqual('3FHL J0001.2-0748');

    page.navigateTo('/#/cat/3fgl/0');
    expect(page.getTextById('e2e-source-3fgl-name')).toEqual('3FGL J0000.1+6545');
  });

});
