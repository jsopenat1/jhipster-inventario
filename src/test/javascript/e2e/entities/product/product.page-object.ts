import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
  title = element.all(by.css('jhi-product div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ProductUpdatePage {
  pageTitle = element(by.id('jhi-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  cantidadInput = element(by.id('field_cantidad'));
  ubicacionSelect = element(by.id('field_ubicacion'));
  image1Input = element(by.id('file_image1'));
  image2Input = element(by.id('file_image2'));

  productCategorySelect = element(by.id('field_productCategory'));
  trasteroSelect = element(by.id('field_trastero'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
  }

  async setUbicacionSelect(ubicacion: string): Promise<void> {
    await this.ubicacionSelect.sendKeys(ubicacion);
  }

  async getUbicacionSelect(): Promise<string> {
    return await this.ubicacionSelect.element(by.css('option:checked')).getText();
  }

  async ubicacionSelectLastOption(): Promise<void> {
    await this.ubicacionSelect.all(by.tagName('option')).last().click();
  }

  async setImage1Input(image1: string): Promise<void> {
    await this.image1Input.sendKeys(image1);
  }

  async getImage1Input(): Promise<string> {
    return await this.image1Input.getAttribute('value');
  }

  async setImage2Input(image2: string): Promise<void> {
    await this.image2Input.sendKeys(image2);
  }

  async getImage2Input(): Promise<string> {
    return await this.image2Input.getAttribute('value');
  }

  async productCategorySelectLastOption(): Promise<void> {
    await this.productCategorySelect.all(by.tagName('option')).last().click();
  }

  async productCategorySelectOption(option: string): Promise<void> {
    await this.productCategorySelect.sendKeys(option);
  }

  getProductCategorySelect(): ElementFinder {
    return this.productCategorySelect;
  }

  async getProductCategorySelectedOption(): Promise<string> {
    return await this.productCategorySelect.element(by.css('option:checked')).getText();
  }

  async trasteroSelectLastOption(): Promise<void> {
    await this.trasteroSelect.all(by.tagName('option')).last().click();
  }

  async trasteroSelectOption(option: string): Promise<void> {
    await this.trasteroSelect.sendKeys(option);
  }

  getTrasteroSelect(): ElementFinder {
    return this.trasteroSelect;
  }

  async getTrasteroSelectedOption(): Promise<string> {
    return await this.trasteroSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-product-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-product'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
