import { KitchenDisplaySystemPage } from './app.po';

describe('kitchen-display-system App', () => {
  let page: KitchenDisplaySystemPage;

  beforeEach(() => {
    page = new KitchenDisplaySystemPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
