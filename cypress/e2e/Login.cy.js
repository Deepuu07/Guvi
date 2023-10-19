//import { beforeEach } from "mocha";
import { login } from "../support/pageObjects/Login";
import { Log } from "../support/Utilities/LoginLocators";
const log = new login();
describe('Login Module', ()=>{ 

    before( ()=>{
        cy.visit("")
        cy.title().should('eq', Cypress.env('LandingPageTitle'))
        cy.url().should('eq',Cypress.env('LandingPageUrl'))
        cy.get(Log.Login).should('be.visible').should('not.have.attr', 'disabled')
        cy.get(Log.Login).contains('Login').click()
        cy.title().should('eq', Cypress.env('SigninTitle'))
        cy.url().should('eq', Cypress.env('SigninUrl'))

    })
    beforeEach( ()=>{
        cy.visit(Cypress.env('Lpage'));
    })

    it('Verify that the login page displays the login image', ()=>{
        cy.get(Log.LoginImg).should('be.visible')
    })

    it('Ensure that the Guvi logo is visible on the login page', ()=>{
        cy.get(Log.GuviLogo).should('be.visible')
    })

    it('Confirm the presence of the Welcome logo on the login page', ()=>{
        cy.get(Log.WelcomeLogo).should('be.visible')
    })

    it('Validate the presence of the "Login with Google" option on the login page', ()=>{
        cy.get(Log.googleLogin).should('be.visible')
    })

    it('Validate the email input field with both valid and invalid inputs on the login page', ()=>{    
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

    it('Confirm the presence and appearance of the password label and input field on the login page', ()=>{
        
        cy.get(Log.PasswordLabel).should('be.visible').and('have.text', 'Password');
        cy.get(Log.PasswordInputField).should('be.visible').and('have.attr', 'placeholder', 'Password')
        .click().should('have.css', 'border-color').and('eq', 'rgb(112, 249, 181)');
    })

    it('Attempt to login without entering an email and check the error message and input field appearance', ()=>{
       
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailInputField).should('be.visible').and('have.attr', 'placeholder', 'E-mail id is required')
        .and('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    })

    it('Attempt to login without entering a password and verify the error message and input field appearance', ()=>{
       
        cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.PasswordInputField).should('be.visible').and('have.attr', 'placeholder', 'Password required')
        .and('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    })

    it('Attempt to login with an email that is not registered and verify the error messages and input field appearances', ()=>{
       
        cy.get(Log.EmailInputField).type(Cypress.env('NotRegisteredEmail')).should('have.value', Cypress.env('NotRegisteredEmail'));
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.PasswordInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.WarningMsg).should('be.visible').and('have.text', 'Incorrect Username or Password').and('have.css', 'color').and('eq', 'rgb(218, 36, 36)');
    })

    it('Attempt to log in with an incorrect password for an existing email and verify the error messages and input field appearances', ()=>{
       
        cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Log.PasswordInputField).type(Cypress.env('InvalidPassword3')).should('have.value', Cypress.env('InvalidPassword3'));
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.PasswordInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Log.WarningMsg).should('be.visible').and('have.text', 'Incorrect Username or Password').and('have.css', 'color').and('eq', 'rgb(218, 36, 36)');
    })
    
    it('login without any fields', ()=>{
       
        cy.get(Log.loginButton).click(); 
        cy.get(Log.EmailInputField).should('have.attr', 'placeholder', 'E-mail id is required')
        .and('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)')
        
    })

    it('Verify the presence and clickability of the "Forgot password?" button', ()=>{
        
        cy.get(Log.ForgotButton).should('be.visible').and('have.text', 'Forgot password?')
        .click();
        cy.url().should('eq', Cypress.env('ForgotPasswordUrl'));
        cy.title().should('eq', Cypress.env('ForgotPasswordTitle'));
    })

    it('Check color of login button', ()=>{
        
        cy.get(Log.loginButton).should('be.visible').and('have.text', 'Login').and('have.css', 'background-color').and('eq', 'rgb(13, 186, 75)');
    })

    it('Verify the presence and clickability of the "Sign up" button on the login page', ()=>{
     
        cy.get(Log.SignUpBtn).should('be.visible').and('have.text', 'Don’t have an account? Sign up');
        cy.get(Log.SignUplink).click();
        cy.url().should('eq', Cypress.env('SignUpUrl'))
        cy.title().should('eq', Cypress.env('SignUpTitle'))
    })

    it('Check login with valid credentials', ()=>{
      
        cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
        cy.url().should('include', Cypress.env('HomepageUrl'))
        cy.title().should('eq', Cypress.env('HomepageTitle'))
    })

})