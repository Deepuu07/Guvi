import { login } from "../support/pageObjects/Login";
import { Log } from "../support/Utilities/LoginLocators";
const log = new login();
describe('Login Module', ()=>{ 

    before( ()=>{
        cy.visit("")
        cy.title().should('eq', Cypress.env('LandingPageTitle'))
        cy.url().should('eq',Cypress.env('LandingPageUrl'))

    })

    it('Test Login button is present and clickable', ()=>{
        cy.visit("");
        cy.get(Log.Login).should('be.visible').should('not.have.attr', 'disabled')
        cy.get(Log.Login).contains('Login').click()
        cy.title().should('eq', Cypress.env('SigninTitle'))
        cy.url().should('eq', Cypress.env('SigninUrl'))
    })

    it('Verify all login page Imgs present on loginpage', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.LoginImg).should('be.visible')
        cy.get(Log.GuviLogo).should('be.visible')
        cy.get(Log.WelcomeLogo).should('be.visible')
    })

    it('Verify login with google present on Loginpage', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.googleLogin).should('be.visible')
    })

    it('Verify Email Field with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.EmailLabel).should('be.visible').and('have.text', 'Email address');
        cy.get(Log.EmailInputField).should('be.visible').and('have.attr', 'placeholder', 'Enter email')
        .click().should('have.css', 'border-color').and('eq', 'rgb(112, 249, 181)');
        cy.get(Log.EmailInputField).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailErrorMsg).should('not.be.visible');
        cy.get(Log.EmailInputField).clear().type(Cypress.env('InvalidEmail')).should('have.value', Cypress.env('InvalidEmail'));
        cy.get(Log.loginButton).click(); //
        cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.EmailErrorMsg).should('be.visible').and('have.text', 'E-mail is Invalid')
        .and('have.css', 'color').and('eq', 'rgb(218, 36, 36)')
    })

    it('Verify Password label and placeholder', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.PasswordLabel).should('be.visible').and('have.text', 'Password');
        cy.get(Log.PasswordInputField).should('be.visible').and('have.attr', 'placeholder', 'Password')
        .click().should('have.css', 'border-color').and('eq', 'rgb(112, 249, 181)');
    })

    it('login without email', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailInputField).should('be.visible').and('have.attr', 'placeholder', 'E-mail id is required')
        .and('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    })

    it('login without Password', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.PasswordInputField).should('be.visible').and('have.attr', 'placeholder', 'Password required')
        .and('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    })

    it('login with not registered Email', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.EmailInputField).type(Cypress.env('NotRegisteredEmail')).should('have.value', Cypress.env('NotRegisteredEmail'));
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.PasswordInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.WarningMsg).should('be.visible').and('have.text', 'Incorrect Username or Password').and('have.css', 'color').and('eq', 'rgb(218, 36, 36)');
    })

    it('login with incorrect password', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Log.PasswordInputField).type(Cypress.env('InvalidPassword3')).should('have.value', Cypress.env('InvalidPassword3'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.PasswordInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.WarningMsg).should('be.visible').and('have.text', 'Incorrect Username or Password').and('have.css', 'color').and('eq', 'rgb(218, 36, 36)');
    })
    
    it('login without any fields', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailInputField).should('have.attr', 'placeholder', 'E-mail id is required')
        .and('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)')
        
    })

    it('Check Forgot password button is present and clickable', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.ForgotButton).should('be.visible').and('have.text', 'Forgot password?')
        .click();
        cy.url().should('eq', Cypress.env('ForgotPasswordUrl'));
        cy.title().should('eq', Cypress.env('ForgotPasswordTitle'));
    })

    it('Check color of login button', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.loginButton).should('be.visible').and('have.text', 'Login').and('have.css', 'background-color').and('eq', 'rgb(13, 186, 75)');
    })

    it('Check signup button is present and clickable', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.SignUpBtn).should('be.visible').and('have.text', 'Don’t have an account? Sign up');
        cy.get(Log.SignUplink).click();
        cy.url().should('eq', Cypress.env('SignUpUrl'))
        cy.title().should('eq', Cypress.env('SignUpTitle'))
    })

    it('Check login with valid credentials', ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
        cy.url().should('include', Cypress.env('HomepageUrl'))
        cy.title().should('eq', Cypress.env('HomepageTitle'))
    })

})