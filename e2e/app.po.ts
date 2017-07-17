import { browser, element, by } from 'protractor';

export class GammaSkyPage {
  navigateTo(url) {
    return browser.get(url);
  }

  getTextByTags(tags) {
    return element(by.css(tags)).getText();
  }

  getTextById(id) {
    return element(by.id(id)).getText();
  }

}
