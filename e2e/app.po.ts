export class GammaSkyPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('gamma-sky-app h1')).getText();
  }
}
