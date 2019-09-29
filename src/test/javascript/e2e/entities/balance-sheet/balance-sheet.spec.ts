/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BalanceSheetComponentsPage, BalanceSheetDeleteDialog, BalanceSheetUpdatePage } from './balance-sheet.page-object';

const expect = chai.expect;

describe('BalanceSheet e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let balanceSheetUpdatePage: BalanceSheetUpdatePage;
    let balanceSheetComponentsPage: BalanceSheetComponentsPage;
    let balanceSheetDeleteDialog: BalanceSheetDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load BalanceSheets', async () => {
        await navBarPage.goToEntity('balance-sheet');
        balanceSheetComponentsPage = new BalanceSheetComponentsPage();
        await browser.wait(ec.visibilityOf(balanceSheetComponentsPage.title), 5000);
        expect(await balanceSheetComponentsPage.getTitle()).to.eq('generalAccountingApp.balanceSheet.home.title');
    });

    it('should load create BalanceSheet page', async () => {
        await balanceSheetComponentsPage.clickOnCreateButton();
        balanceSheetUpdatePage = new BalanceSheetUpdatePage();
        expect(await balanceSheetUpdatePage.getPageTitle()).to.eq('generalAccountingApp.balanceSheet.home.createOrEditLabel');
        await balanceSheetUpdatePage.cancel();
    });

    it('should create and save BalanceSheets', async () => {
        const nbButtonsBeforeCreate = await balanceSheetComponentsPage.countDeleteButtons();

        await balanceSheetComponentsPage.clickOnCreateButton();
        await promise.all([]);
        const selectedIsprocessed = balanceSheetUpdatePage.getIsprocessedInput();
        if (await selectedIsprocessed.isSelected()) {
            await balanceSheetUpdatePage.getIsprocessedInput().click();
            expect(await balanceSheetUpdatePage.getIsprocessedInput().isSelected()).to.be.false;
        } else {
            await balanceSheetUpdatePage.getIsprocessedInput().click();
            expect(await balanceSheetUpdatePage.getIsprocessedInput().isSelected()).to.be.true;
        }
        await balanceSheetUpdatePage.save();
        expect(await balanceSheetUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await balanceSheetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last BalanceSheet', async () => {
        const nbButtonsBeforeDelete = await balanceSheetComponentsPage.countDeleteButtons();
        await balanceSheetComponentsPage.clickOnLastDeleteButton();

        balanceSheetDeleteDialog = new BalanceSheetDeleteDialog();
        expect(await balanceSheetDeleteDialog.getDialogTitle()).to.eq('generalAccountingApp.balanceSheet.delete.question');
        await balanceSheetDeleteDialog.clickOnConfirmButton();

        expect(await balanceSheetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
