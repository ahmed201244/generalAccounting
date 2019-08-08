import { element, by, ElementFinder } from 'protractor';

export class TrialBalanceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-trial-balance div table .btn-danger'));
    title = element.all(by.css('jhi-trial-balance div h2#page-heading span')).first();

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

export class TrialBalanceUpdatePage {
    pageTitle = element(by.id('jhi-trial-balance-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    debitInput = element(by.id('field_debit'));
    creditInput = element(by.id('field_credit'));
    trialBalanceSelect = element(by.id('field_trialBalance'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDebitInput(debit) {
        await this.debitInput.sendKeys(debit);
    }

    async getDebitInput() {
        return this.debitInput.getAttribute('value');
    }

    async setCreditInput(credit) {
        await this.creditInput.sendKeys(credit);
    }

    async getCreditInput() {
        return this.creditInput.getAttribute('value');
    }

    async trialBalanceSelectLastOption() {
        await this.trialBalanceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async trialBalanceSelectOption(option) {
        await this.trialBalanceSelect.sendKeys(option);
    }

    getTrialBalanceSelect(): ElementFinder {
        return this.trialBalanceSelect;
    }

    async getTrialBalanceSelectedOption() {
        return this.trialBalanceSelect.element(by.css('option:checked')).getText();
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

export class TrialBalanceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-trialBalance-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-trialBalance'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
