import { browser, by, element } from 'protractor';
/**
 * appPage navigate
 */
export class AppPage {
  /**
   * navigate to
   */
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  /**
   * get title
   */
  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
