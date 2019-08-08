import { element, by, ElementFinder } from 'protractor';

export class CashBookComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-cash-book div table .btn-danger'));
    title = element.all(by.css('jhi-cash-book div h2#page-heading span')).first();

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

export class CashBookUpdatePage {
    pageTitle = element(by.id('jhi-cash-book-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    amountInput = element(by.id('field_amount'));
    transactionTypeSelect = element(by.id('field_transactionType'));
    uuidInput = element(by.id('field_uuid'));
    tansactionCurrencySelect = element(by.id('field_tansactionCurrency'));
    fromAccountSelect = element(by.id('field_fromAccount'));
    toAccountSelect = element(by.id('field_toAccount'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async setTransactionTypeSelect(transactionType) {
        await this.transactionTypeSelect.sendKeys(transactionType);
    }

    async getTransactionTypeSelect() {
        return this.transactionTypeSelect.element(by.css('option:checked')).getText();
    }

    async transactionTypeSelectLastOption() {
        await this.transactionTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setUuidInput(uuid) {
        await this.uuidInput.sendKeys(uuid);
    }

    async getUuidInput() {
        return this.uuidInput.getAttribute('value');
    }

    async tansactionCurrencySelectLastOption() {
        await this.tansactionCurrencySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async tansactionCurrencySelectOption(option) {
        await this.tansactionCurrencySelect.sendKeys(option);
    }

    getTansactionCurrencySelect(): ElementFinder {
        return this.tansactionCurrencySelect;
    }

    async getTansactionCurrencySelectedOption() {
        return this.tansactionCurrencySelect.element(by.css('option:checked')).getText();
    }

    async fromAccountSelectLastOption() {
        await this.fromAccountSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async fromAccountSelectOption(option) {
        await this.fromAccountSelect.sendKeys(option);
    }

    getFromAccountSelect(): ElementFinder {
        return this.fromAccountSelect;
    }

    async getFromAccountSelectedOption() {
        return this.fromAccountSelect.element(by.css('option:checked')).getText();
    }

    async toAccountSelectLastOption() {
        await this.toAccountSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async toAccountSelectOption(option) {
        await this.toAccountSelect.sendKeys(option);
    }

    getToAccountSelect(): ElementFinder {
        return this.toAccountSelect;
    }

    async getToAccountSelectedOption() {
        return this.toAccountSelect.element(by.css('option:checked')).getText();
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

export class CashBookDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-cashBook-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-cashBook'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
