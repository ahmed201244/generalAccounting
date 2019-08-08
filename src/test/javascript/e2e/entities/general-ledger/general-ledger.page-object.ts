import { element, by, ElementFinder } from 'protractor';

export class GeneralLedgerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-general-ledger div table .btn-danger'));
    title = element.all(by.css('jhi-general-ledger div h2#page-heading span')).first();

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

export class GeneralLedgerUpdatePage {
    pageTitle = element(by.id('jhi-general-ledger-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    transactionsSumDrInput = element(by.id('field_transactionsSumDr'));
    transactionsSumCrInput = element(by.id('field_transactionsSumCr'));
    balanceSumDrInput = element(by.id('field_balanceSumDr'));
    balanceSumCrInput = element(by.id('field_balanceSumCr'));
    accountLedgerSelect = element(by.id('field_accountLedger'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setTransactionsSumDrInput(transactionsSumDr) {
        await this.transactionsSumDrInput.sendKeys(transactionsSumDr);
    }

    async getTransactionsSumDrInput() {
        return this.transactionsSumDrInput.getAttribute('value');
    }

    async setTransactionsSumCrInput(transactionsSumCr) {
        await this.transactionsSumCrInput.sendKeys(transactionsSumCr);
    }

    async getTransactionsSumCrInput() {
        return this.transactionsSumCrInput.getAttribute('value');
    }

    async setBalanceSumDrInput(balanceSumDr) {
        await this.balanceSumDrInput.sendKeys(balanceSumDr);
    }

    async getBalanceSumDrInput() {
        return this.balanceSumDrInput.getAttribute('value');
    }

    async setBalanceSumCrInput(balanceSumCr) {
        await this.balanceSumCrInput.sendKeys(balanceSumCr);
    }

    async getBalanceSumCrInput() {
        return this.balanceSumCrInput.getAttribute('value');
    }

    async accountLedgerSelectLastOption() {
        await this.accountLedgerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async accountLedgerSelectOption(option) {
        await this.accountLedgerSelect.sendKeys(option);
    }

    getAccountLedgerSelect(): ElementFinder {
        return this.accountLedgerSelect;
    }

    async getAccountLedgerSelectedOption() {
        return this.accountLedgerSelect.element(by.css('option:checked')).getText();
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

export class GeneralLedgerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-generalLedger-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-generalLedger'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
