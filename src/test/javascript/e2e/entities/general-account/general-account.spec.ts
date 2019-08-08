/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GeneralAccountComponentsPage, GeneralAccountDeleteDialog, GeneralAccountUpdatePage } from './general-account.page-object';

const expect = chai.expect;

describe('GeneralAccount e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let generalAccountUpdatePage: GeneralAccountUpdatePage;
    let generalAccountComponentsPage: GeneralAccountComponentsPage;
    let generalAccountDeleteDialog: GeneralAccountDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GeneralAccounts', async () => {
        await navBarPage.goToEntity('general-account');
        generalAccountComponentsPage = new GeneralAccountComponentsPage();
        await browser.wait(ec.visibilityOf(generalAccountComponentsPage.title), 5000);
        expect(await generalAccountComponentsPage.getTitle()).to.eq('generalAccountingApp.generalAccount.home.title');
    });

    it('should load create GeneralAccount page', async () => {
        await generalAccountComponentsPage.clickOnCreateButton();
        generalAccountUpdatePage = new GeneralAccountUpdatePage();
        expect(await generalAccountUpdatePage.getPageTitle()).to.eq('generalAccountingApp.generalAccount.home.createOrEditLabel');
        await generalAccountUpdatePage.cancel();
    });

    it('should create and save GeneralAccounts', async () => {
        const nbButtonsBeforeCreate = await generalAccountComponentsPage.countDeleteButtons();

        await generalAccountComponentsPage.clickOnCreateButton();
        await promise.all([
            generalAccountUpdatePage.setCodeInput('code'),
            generalAccountUpdatePage.setDescriptionInput('description'),
            generalAccountUpdatePage.typeSelectLastOption(),
            generalAccountUpdatePage.generalAccountCurrencySelectLastOption()
        ]);
        expect(await generalAccountUpdatePage.getCodeInput()).to.eq('code');
        expect(await generalAccountUpdatePage.getDescriptionInput()).to.eq('description');
        await generalAccountUpdatePage.save();
        expect(await generalAccountUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await generalAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GeneralAccount', async () => {
        const nbButtonsBeforeDelete = await generalAccountComponentsPage.countDeleteButtons();
        await generalAccountComponentsPage.clickOnLastDeleteButton();

        generalAccountDeleteDialog = new GeneralAccountDeleteDialog();
        expect(await generalAccountDeleteDialog.getDialogTitle()).to.eq('generalAccountingApp.generalAccount.delete.question');
        await generalAccountDeleteDialog.clickOnConfirmButton();

        expect(await generalAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
