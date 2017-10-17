import { LifeGamePage } from './app.po';

describe('life-game App', () => {
  let page: LifeGamePage;

  beforeEach(() => {
    page = new LifeGamePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
