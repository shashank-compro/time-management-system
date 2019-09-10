import { TimeManagementSystemPage } from './app.po';

describe('time-management-system App', function() {
  let page: TimeManagementSystemPage;

  beforeEach(() => {
    page = new TimeManagementSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
