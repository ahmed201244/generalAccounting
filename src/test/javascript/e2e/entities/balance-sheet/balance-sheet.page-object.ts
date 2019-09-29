import { element, by, ElementFinder } from 'protractor';

export class BalanceSheetComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-balance-sheet div table .btn-danger'));
    title = element.all(by.css('jhi-balance-sheet div h2#page-heading span')).first();

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

export class BalanceSheetUpdatePage {
    pageTitle = element(by.id('jhi-balance-sheet-heading'));
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

export class BalanceSheetDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-balanceSheet-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-balanceSheet'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
