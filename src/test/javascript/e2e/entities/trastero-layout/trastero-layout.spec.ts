import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TrasteroLayoutComponentsPage, TrasteroLayoutDeleteDialog, TrasteroLayoutUpdatePage } from './trastero-layout.page-object';

const expect = chai.expect;

describe('TrasteroLayout e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let trasteroLayoutComponentsPage: TrasteroLayoutComponentsPage;
  let trasteroLayoutUpdatePage: TrasteroLayoutUpdatePage;
  let trasteroLayoutDeleteDialog: TrasteroLayoutDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TrasteroLayouts', async () => {
    await navBarPage.goToEntity('trastero-layout');
    trasteroLayoutComponentsPage = new TrasteroLayoutComponentsPage();
    await browser.wait(ec.visibilityOf(trasteroLayoutComponentsPage.title), 5000);
    expect(await trasteroLayoutComponentsPage.getTitle()).to.eq('inventarioApp.trasteroLayout.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(trasteroLayoutComponentsPage.entities), ec.visibilityOf(trasteroLayoutComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TrasteroLayout page', async () => {
    await trasteroLayoutComponentsPage.clickOnCreateButton();
    trasteroLayoutUpdatePage = new TrasteroLayoutUpdatePage();
    expect(await trasteroLayoutUpdatePage.getPageTitle()).to.eq('inventarioApp.trasteroLayout.home.createOrEditLabel');
    await trasteroLayoutUpdatePage.cancel();
  });

  it('should create and save TrasteroLayouts', async () => {
    const nbButtonsBeforeCreate = await trasteroLayoutComponentsPage.countDeleteButtons();

    await trasteroLayoutComponentsPage.clickOnCreateButton();

    await promise.all([trasteroLayoutUpdatePage.setNameInput('name'), trasteroLayoutUpdatePage.setDescriptionInput('description')]);

    expect(await trasteroLayoutUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await trasteroLayoutUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await trasteroLayoutUpdatePage.save();
    expect(await trasteroLayoutUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await trasteroLayoutComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TrasteroLayout', async () => {
    const nbButtonsBeforeDelete = await trasteroLayoutComponentsPage.countDeleteButtons();
    await trasteroLayoutComponentsPage.clickOnLastDeleteButton();

    trasteroLayoutDeleteDialog = new TrasteroLayoutDeleteDialog();
    expect(await trasteroLayoutDeleteDialog.getDialogTitle()).to.eq('inventarioApp.trasteroLayout.delete.question');
    await trasteroLayoutDeleteDialog.clickOnConfirmButton();

    expect(await trasteroLayoutComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
