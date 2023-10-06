import { login } from "../support/pageObjects/Login";
import { Log } from "../support/Utilities/LoginLocators";
const log = new login();
describe('Login Module', ()=>{ 

    before( ()=>{
        cy.visit("")
        cy.title().should('eq', "GUVI | Learn to code in your native language")
        cy.url().should('eq',"https://www.guvi.in/")

    })

    it('Test Login button is present and clickable', ()=>{
        cy.visit("");
        log.clickOnLogin();
    })

    it('Verify all login page Imgs present on loginpage', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.VerifyAllLoginPageImgs();
    })

    it('Verify login with google present on Loginpage', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.VerifyLoginwithGoogle();
    })

    it('Verify Email Field with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.VerifyEmailField('deepakrao7010@gmail.com');
    })

    it('Verify Password label and placeholder', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.VerifyPassword_labelAndPlaceholder();
    })

    it('login without email', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.LoginWithOutEmail();
    })

    it('login without Password', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.LoginWithOutPassword();
    })

    it('login with not registered Email', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.LoginWithNotRegisteredEmail()
    })

    it('login with incorrect password', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.LoginWithIncorrectPassword();
    })
    
    it('login without any fields', ()=>{
        cy.visit(Cypress.env('Lpage'));
        // cy.get(Log.loginButton).click(); 
        // cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)')
        // .and('have.attr', 'placeholder', 'E-mail id is required');
        log.LoginWithoutAnyFields()
    })

    it('Check Forgot password button is present and clickable', ()=>{
        cy.visit(Cypress.env('Lpage'));
        log.CheckForgotPassword();
    })

    it('Check color of login button', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.loginButton).should('be.visible').and('have.text', 'Login').and('have.css', 'background-color').and('eq', 'rgb(13, 186, 75)');
    })

    it('Check signup button is present and clickable', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.SignUpBtn).should('be.visible').and('have.text', 'Don’t have an account? Sign up');
        cy.get(Log.SignUplink).click();
        cy.url().should('eq', 'https://www.guvi.in/register/')
        cy.title().should('eq', 'Sign Up | GUVI')
    })

    it('Check login with valid credentials', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
        cy.url().should('eq', 'https://www.guvi.in/courses/?current_tab=myCourses')
        cy.title().should('eq', 'GUVI | courses')
    })

})