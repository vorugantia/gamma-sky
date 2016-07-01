import { GammaSkyPage } from './app.po';

describe('gamma-sky App', function() {
  let page: GammaSkyPage;

  beforeEach(() => {
    page = new GammaSkyPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('gamma-sky works!');
  });
});
