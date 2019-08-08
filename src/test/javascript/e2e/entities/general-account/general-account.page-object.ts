import { element, by, ElementFinder } from 'protractor';

export class GeneralAccountComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-general-account div table .btn-danger'));
    title = element.all(by.css('jhi-general-account div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GeneralAccountUpdatePage {
    pageTitle = element(by.id('jhi-general-account-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeInput = element(by.id('field_code'));
    descriptionInput = element(by.id('field_description'));
    typeSelect = element(by.id('field_type'));
    generalAccountCurrencySelect = element(by.id('field_generalAccountCurrency'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodeInput(code) {
        await this.codeInput.sendKeys(code);
    }

    async getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setTypeSelect(type) {
        await this.typeSelect.sendKeys(type);
    }

    async getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    async typeSelectLastOption() {
        await this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async generalAccountCurrencySelectLastOption() {
        await this.generalAccountCurrencySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async generalAccountCurrencySelectOption(option) {
        await this.generalAccountCurrencySelect.sendKeys(option);
    }

    getGeneralAccountCurrencySelect(): ElementFinder {
        return this.generalAccountCurrencySelect;
    }

    async getGeneralAccountCurrencySelectedOption() {
        return this.generalAccountCurrencySelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class GeneralAccountDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-generalAccount-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-generalAccount'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
