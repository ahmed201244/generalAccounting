import { element, by, ElementFinder } from 'protractor';

export class IncomeStatementComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-income-statement div table .btn-danger'));
    title = element.all(by.css('jhi-income-statement div h2#page-heading span')).first();

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

export class IncomeStatementUpdatePage {
    pageTitle = element(by.id('jhi-income-statement-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    isprocessedInput = element(by.id('field_isprocessed'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    getIsprocessedInput() {
        return this.isprocessedInput;
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

export class IncomeStatementDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-incomeStatement-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-incomeStatement'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
