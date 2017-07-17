import { browser, element, by } from 'protractor';

export class GammaSkyPage {
  navigateTo(url) {
    return browser.get(url);
  }

  getParagraphText(dom) {
    return element(by.css(dom)).getText();
  }


}
