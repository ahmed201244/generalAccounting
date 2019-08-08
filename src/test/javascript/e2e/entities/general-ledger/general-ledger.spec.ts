/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GeneralLedgerComponentsPage, GeneralLedgerDeleteDialog, GeneralLedgerUpdatePage } from './general-ledger.page-object';

const expect = chai.expect;

describe('GeneralLedger e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let generalLedgerUpdatePage: GeneralLedgerUpdatePage;
    let generalLedgerComponentsPage: GeneralLedgerComponentsPage;
    let generalLedgerDeleteDialog: GeneralLedgerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GeneralLedgers', async () => {
        await navBarPage.goToEntity('general-ledger');
        generalLedgerComponentsPage = new GeneralLedgerComponentsPage();
        await browser.wait(ec.visibilityOf(generalLedgerComponentsPage.title), 5000);
        expect(await generalLedgerComponentsPage.getTitle()).to.eq('generalAccountingApp.generalLedger.home.title');
    });

    it('should load create GeneralLedger page', async () => {
        await generalLedgerComponentsPage.clickOnCreateButton();
        generalLedgerUpdatePage = new GeneralLedgerUpdatePage();
        expect(await generalLedgerUpdatePage.getPageTitle()).to.eq('generalAccountingApp.generalLedger.home.createOrEditLabel');
        await generalLedgerUpdatePage.cancel();
    });

    it('should create and save GeneralLedgers', async () => {
        const nbButtonsBeforeCreate = await generalLedgerComponentsPage.countDeleteButtons();

        await generalLedgerComponentsPage.clickOnCreateButton();
        await promise.all([
            generalLedgerUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            generalLedgerUpdatePage.setTransactionsSumDrInput('5'),
            generalLedgerUpdatePage.setTransactionsSumCrInput('5'),
            generalLedgerUpdatePage.setBalanceSumDrInput('5'),
            generalLedgerUpdatePage.setBalanceSumCrInput('5'),
            generalLedgerUpdatePage.accountLedgerSelectLastOption()
        ]);
        expect(await generalLedgerUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        expect(await generalLedgerUpdatePage.getTransactionsSumDrInput()).to.eq('5');
        expect(await generalLedgerUpdatePage.getTransactionsSumCrInput()).to.eq('5');
        expect(await generalLedgerUpdatePage.getBalanceSumDrInput()).to.eq('5');
        expect(await generalLedgerUpdatePage.getBalanceSumCrInput()).to.eq('5');
        await generalLedgerUpdatePage.save();
        expect(await generalLedgerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await generalLedgerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GeneralLedger', async () => {
        const nbButtonsBeforeDelete = await generalLedgerComponentsPage.countDeleteButtons();
        await generalLedgerComponentsPage.clickOnLastDeleteButton();

        generalLedgerDeleteDialog = new GeneralLedgerDeleteDialog();
        expect(await generalLedgerDeleteDialog.getDialogTitle()).to.eq('generalAccountingApp.generalLedger.delete.question');
        await generalLedgerDeleteDialog.clickOnConfirmButton();

        expect(await generalLedgerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
