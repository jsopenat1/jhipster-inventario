import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  MovimientoComponentsPage,
  /* MovimientoDeleteDialog, */
  MovimientoUpdatePage,
} from './movimiento.page-object';

const expect = chai.expect;

describe('Movimiento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let movimientoComponentsPage: MovimientoComponentsPage;
  let movimientoUpdatePage: MovimientoUpdatePage;
  /* let movimientoDeleteDialog: MovimientoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Movimientos', async () => {
    await navBarPage.goToEntity('movimiento');
    movimientoComponentsPage = new MovimientoComponentsPage();
    await browser.wait(ec.visibilityOf(movimientoComponentsPage.title), 5000);
    expect(await movimientoComponentsPage.getTitle()).to.eq('inventarioApp.movimiento.home.title');
    await browser.wait(ec.or(ec.visibilityOf(movimientoComponentsPage.entities), ec.visibilityOf(movimientoComponentsPage.noResult)), 1000);
  });

  it('should load create Movimiento page', async () => {
    await movimientoComponentsPage.clickOnCreateButton();
    movimientoUpdatePage = new MovimientoUpdatePage();
    expect(await movimientoUpdatePage.getPageTitle()).to.eq('inventarioApp.movimiento.home.createOrEditLabel');
    await movimientoUpdatePage.cancel();
  });

  /* it('should create and save Movimientos', async () => {
        const nbButtonsBeforeCreate = await movimientoComponentsPage.countDeleteButtons();

        await movimientoComponentsPage.clickOnCreateButton();

        await promise.all([
            movimientoUpdatePage.setWhenDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            movimientoUpdatePage.setDescriptionInput('description'),
            movimientoUpdatePage.setCantidadInput('5'),
            movimientoUpdatePage.userSelectLastOption(),
            movimientoUpdatePage.productSelectLastOption(),
        ]);

        expect(await movimientoUpdatePage.getWhenDateInput()).to.contain('2001-01-01T02:30', 'Expected whenDate value to be equals to 2000-12-31');
        expect(await movimientoUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await movimientoUpdatePage.getCantidadInput()).to.eq('5', 'Expected cantidad value to be equals to 5');

        await movimientoUpdatePage.save();
        expect(await movimientoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await movimientoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Movimiento', async () => {
        const nbButtonsBeforeDelete = await movimientoComponentsPage.countDeleteButtons();
        await movimientoComponentsPage.clickOnLastDeleteButton();

        movimientoDeleteDialog = new MovimientoDeleteDialog();
        expect(await movimientoDeleteDialog.getDialogTitle())
            .to.eq('inventarioApp.movimiento.delete.question');
        await movimientoDeleteDialog.clickOnConfirmButton();

        expect(await movimientoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
