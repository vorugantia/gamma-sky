import { GammaSkyPage } from './app.po';

describe('gamma-sky App', () => {
  let page: GammaSkyPage;

  beforeEach(() => {
    page = new GammaSkyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo('/');

    expect(page.getParagraphText('app-root h1')).toEqual('');
  });

  it('should display source name when going to source detail view', () => {
    page.navigateTo('/#/cat/tev/0');

    expect(page.getParagraphText('app-root cat-view cat-source-tev h2')).toEqual('CTA 1');

  });

});
