/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CashBookComponentsPage, CashBookDeleteDialog, CashBookUpdatePage } from './cash-book.page-object';

const expect = chai.expect;

describe('CashBook e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let cashBookUpdatePage: CashBookUpdatePage;
    let cashBookComponentsPage: CashBookComponentsPage;
    let cashBookDeleteDialog: CashBookDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CashBooks', async () => {
        await navBarPage.goToEntity('cash-book');
        cashBookComponentsPage = new CashBookComponentsPage();
        await browser.wait(ec.visibilityOf(cashBookComponentsPage.title), 5000);
        expect(await cashBookComponentsPage.getTitle()).to.eq('generalAccountingApp.cashBook.home.title');
    });

    it('should load create CashBook page', async () => {
        await cashBookComponentsPage.clickOnCreateButton();
        cashBookUpdatePage = new CashBookUpdatePage();
        expect(await cashBookUpdatePage.getPageTitle()).to.eq('generalAccountingApp.cashBook.home.createOrEditLabel');
        await cashBookUpdatePage.cancel();
    });

    it('should create and save CashBooks', async () => {
        const nbButtonsBeforeCreate = await cashBookComponentsPage.countDeleteButtons();

        await cashBookComponentsPage.clickOnCreateButton();
        await promise.all([
            cashBookUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            cashBookUpdatePage.setAmountInput('5'),
            cashBookUpdatePage.transactionTypeSelectLastOption(),
            cashBookUpdatePage.setUuidInput('uuid'),
            cashBookUpdatePage.tansactionCurrencySelectLastOption(),
            cashBookUpdatePage.fromAccountSelectLastOption(),
            cashBookUpdatePage.toAccountSelectLastOption()
        ]);
        expect(await cashBookUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        expect(await cashBookUpdatePage.getAmountInput()).to.eq('5');
        expect(await cashBookUpdatePage.getUuidInput()).to.eq('uuid');
        await cashBookUpdatePage.save();
        expect(await cashBookUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await cashBookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CashBook', async () => {
        const nbButtonsBeforeDelete = await cashBookComponentsPage.countDeleteButtons();
        await cashBookComponentsPage.clickOnLastDeleteButton();

        cashBookDeleteDialog = new CashBookDeleteDialog();
        expect(await cashBookDeleteDialog.getDialogTitle()).to.eq('generalAccountingApp.cashBook.delete.question');
        await cashBookDeleteDialog.clickOnConfirmButton();

        expect(await cashBookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
