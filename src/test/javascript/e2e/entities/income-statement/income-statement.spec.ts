/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { IncomeStatementComponentsPage, IncomeStatementDeleteDialog, IncomeStatementUpdatePage } from './income-statement.page-object';

const expect = chai.expect;

describe('IncomeStatement e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let incomeStatementUpdatePage: IncomeStatementUpdatePage;
    let incomeStatementComponentsPage: IncomeStatementComponentsPage;
    let incomeStatementDeleteDialog: IncomeStatementDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load IncomeStatements', async () => {
        await navBarPage.goToEntity('income-statement');
        incomeStatementComponentsPage = new IncomeStatementComponentsPage();
        await browser.wait(ec.visibilityOf(incomeStatementComponentsPage.title), 5000);
        expect(await incomeStatementComponentsPage.getTitle()).to.eq('generalAccountingApp.incomeStatement.home.title');
    });

    it('should load create IncomeStatement page', async () => {
        await incomeStatementComponentsPage.clickOnCreateButton();
        incomeStatementUpdatePage = new IncomeStatementUpdatePage();
        expect(await incomeStatementUpdatePage.getPageTitle()).to.eq('generalAccountingApp.incomeStatement.home.createOrEditLabel');
        await incomeStatementUpdatePage.cancel();
    });

    it('should create and save IncomeStatements', async () => {
        const nbButtonsBeforeCreate = await incomeStatementComponentsPage.countDeleteButtons();

        await incomeStatementComponentsPage.clickOnCreateButton();
        await promise.all([]);
        const selectedIsprocessed = incomeStatementUpdatePage.getIsprocessedInput();
        if (await selectedIsprocessed.isSelected()) {
            await incomeStatementUpdatePage.getIsprocessedInput().click();
            expect(await incomeStatementUpdatePage.getIsprocessedInput().isSelected()).to.be.false;
        } else {
            await incomeStatementUpdatePage.getIsprocessedInput().click();
            expect(await incomeStatementUpdatePage.getIsprocessedInput().isSelected()).to.be.true;
        }
        await incomeStatementUpdatePage.save();
        expect(await incomeStatementUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await incomeStatementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last IncomeStatement', async () => {
        const nbButtonsBeforeDelete = await incomeStatementComponentsPage.countDeleteButtons();
        await incomeStatementComponentsPage.clickOnLastDeleteButton();

        incomeStatementDeleteDialog = new IncomeStatementDeleteDialog();
        expect(await incomeStatementDeleteDialog.getDialogTitle()).to.eq('generalAccountingApp.incomeStatement.delete.question');
        await incomeStatementDeleteDialog.clickOnConfirmButton();

        expect(await incomeStatementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
