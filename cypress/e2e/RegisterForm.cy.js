import { Register } from "../support/pageObjects/registerForm";
const cyDo = new Register();
describe('RegisterForm', ()=>{  
    before( ()=>{
        cy.visit("")
        cy.title().should('eq', "GUVI | Learn to code in your native language")
        cy.url().should('eq',"https://www.guvi.in/")

    })

    it('Test Signup button is present and clickable', ()=>{
        cy.visit("")
        cyDo.clickOnSignUp()
    })

    it('Verify Register Img present on RegisterForm', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.VerifyRegisterImg_Present();
    })

    it('Verify Guvi Logo present on RegisterForm', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.VerifyGuviLogo();
    })

    it('Verify Signup with google present on RegisterForm', ()=>{
        cy.visit(Cypress.env('Rpage'))
        cyDo.VerifyGoogleSignUp();
    })

    it('Validate Firstname with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.VerifyFirstName();
    })

    it('Validate Lastname with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.VerifyLastName();
    })

    it('Validate Email with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.VerifyEmail();
    })

    it('Validate Password with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.VerifyPassword();
    })

    it('Validate MobileNo with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.VerifyMobileNo();
    })

    it('Try to SignUp Without FirstName', ()=>{
       cy.visit(Cypress.env('Rpage'));
       cyDo.SignUpWithOutFirstName();
    })

    it('Try to SignUp Without LastName', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.SignUpWithOutLastName();
    })

    it('Try to SignUp Without Email', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.SignUpWithOutEmail();
    })

    it('Try to SignUp Without Password', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.SignUpWithOutPassword();
    })

    it('Try to SignUp Without MobileNo', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.SignUpWithOutMobileNo();
    })

    it('Try to SignUp Without filling anyfield', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.SignUpWithOutAnyfields();
    })

    it('Try to SignUp With Existing Email', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.SignUpWithExisting_Email();
    })

    it.only('Verify Login button', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.VerifyLoginButton();
    })

    it('Signup with valid credentials', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cyDo.SignUpWithValid_Credentials()
    })

  



})