import { browser, element, by } from 'protractor';

export class GammaSkyPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('appworks')).getText();
  }
}
