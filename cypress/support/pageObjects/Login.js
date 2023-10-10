import { Log } from "../Utilities/LoginLocators"
export class login {
    // clickOnLogin() {
    //     cy.get(Log.Login).should('be.visible').should('not.have.attr', 'disabled')
    //     //.and('have.css', 'background-color').and('eq', 'rgb(13, 186, 75)');
    //     cy.get(Log.Login).contains('Login').click()
    //     cy.title().should('eq', 'Sign In | GUVI')
    //     cy.url().should('eq', 'https://www.guvi.in/sign-in/')
    // }

    // VerifyAllLoginPageImgs(){
    //     cy.get(Log.LoginImg).should('be.visible')
    //     cy.get(Log.GuviLogo).should('be.visible')
    //     cy.get(Log.WelcomeLogo).should('be.visible')
    // }

    // VerifyLoginwithGoogle(){
    //     cy.get(Log.googleLogin).should('be.visible')
    // }

    // VerifyEmailField(test){
    //     cy.get(Log.EmailLabel).should('be.visible').and('have.text', 'Email address');
    //     cy.get(Log.EmailInputField).should('be.visible').and('have.attr', 'placeholder', 'Enter email')
    //     .click().should('have.css', 'border-color').and('eq', 'rgb(112, 249, 181)');
    //     cy.get(Log.EmailInputField).type(test).should('have.value', test);
    //     cy.get(Log.loginButton).click(); 
    //     cy.get(Log.EmailErrorMsg).should('not.be.visible');
    //     cy.get(Log.EmailInputField).clear().type(Cypress.env('InvalidEmail')).should('have.value', Cypress.env('InvalidEmail'));
    //     cy.get(Log.loginButton).click(); //
    //     cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    //     cy.get(Log.EmailErrorMsg).should('be.visible').and('have.text', 'E-mail is Invalid')
    //     .and('have.css', 'color').and('eq', 'rgb(218, 36, 36)')
    // }

    // VerifyPassword_labelAndPlaceholder(){
    //     cy.get(Log.PasswordLabel).should('be.visible').and('have.text', 'Password');
    //     cy.get(Log.PasswordInputField).should('be.visible').and('have.attr', 'placeholder', 'Password')
    //     .click().should('have.css', 'border-color').and('eq', 'rgb(112, 249, 181)');
    // }

    // LoginWithOutEmail(){
    //     cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
    //     cy.get(Log.loginButton).click(); 
    //     cy.get(Log.EmailInputField).should('be.visible').and('have.attr', 'placeholder', 'E-mail id is required')
    //     .and('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    // }

    // LoginWithOutPassword(){
    //     cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
    //     cy.get(Log.loginButton).click(); 
    //     cy.get(Log.PasswordInputField).should('be.visible').and('have.attr', 'placeholder', 'Password required')
    //     .and('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    // }

    // LoginWithNotRegisteredEmail(){
    //     cy.get(Log.EmailInputField).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
    //     cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
    //     cy.get(Log.loginButton).click(); 
    //     cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    //     cy.get(Log.PasswordInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    //     cy.get(Log.WarningMsg).should('be.visible').and('have.text', 'Incorrect Username or Password').and('have.css', 'color').and('eq', 'rgb(218, 36, 36)');
    // }

    // LoginWithIncorrectPassword(){
    //     cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
    //     cy.get(Log.PasswordInputField).type(Cypress.env('InvalidPassword3')).should('have.value', Cypress.env('InvalidPassword3'));
    //     cy.get(Log.loginButton).click(); 
    //     cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    //     cy.get(Log.PasswordInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)');
    //     cy.get(Log.WarningMsg).should('be.visible').and('have.text', 'Incorrect Username or Password').and('have.css', 'color').and('eq', 'rgb(218, 36, 36)');
    // }

    // LoginWithoutAnyFields(){
    //     cy.get(Log.loginButton).click(); 
    //     cy.get(Log.EmailInputField).should('have.css', 'border-color').and('eq', 'rgb(255, 65, 54)')
    //     .and('have.attr', 'placeholder', 'E-mail id is required');
    // }

    // CheckForgotPassword(){
    //     cy.get(Log.ForgotButton).should('be.visible').and('have.text', 'Forgot password?')
    //     .click();
    //     cy.url().should('eq', 'https://www.guvi.in/forgot-password/');
    //     cy.title().should('eq', 'Forgot Password | GUVI');
    // }

    // checkLoginColor(){
    //     cy.get(Log.loginButton).should('be.visible').and('have.text', 'Login').and('have.css', 'background-color').and('eq', 'rgb(13, 186, 75)');
    // }
}



