import { GammaSkyPage } from './app.po';

describe('gamma-sky App', () => {
  let page: GammaSkyPage;

  beforeEach(() => {
    page = new GammaSkyPage();
  });

  it('should initialize the webpage', () => {
    page.navigateTo('/');

    expect<any>(page.getTextByTags('app-root h1')).toEqual('');
  });

  it('should display tev source name in source detail view', () => {
    page.navigateTo('/#/cat/tev/0')
        .then(() => {
          return expect<any>(page.getTextById('e2e-source-tev-name')).toEqual('CTA 1')
    });


  });

  it('should display 3fhl source name in source detail view', () => {
    page.navigateTo('/#/cat/3fhl/0');

    expect<any>(page.getTextById('e2e-source-3fhl-name')).toEqual('3FHL J0001.2-0748');
  });

  it('should display 3fgl source name in source detail view', () => {
    page.navigateTo('/#/cat/3fgl/0');

    expect<any>(page.getTextById('e2e-source-3fgl-name')).toEqual('3FGL J0000.1+6545');
  });

  it('should click "About" button in Map View and read text', () => {
    page.navigateTo('/#/map');

    page.clickButton('About');
    expect<any>(page.getTextById('aboutInfo')).toContain('Gamma-sky.net');
  });

});
