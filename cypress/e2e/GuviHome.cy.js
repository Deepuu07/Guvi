import { Log } from "../support/Utilities/LoginLocators";
import { home } from "../support/Utilities/GuviHomeLocators";
import {guvi} from "../support/pageObjects/Guvi_home";
//import { beforeEach } from "mocha";
const a = new guvi();
describe('Guvi Home', ()=>{ 
    before( ()=>{
        cy.visit("")
        cy.title().should('eq', "GUVI | Learn to code in your native language")
        cy.url().should('eq',"https://www.guvi.in/")
        cy.get(Log.Login).should('be.visible').should('not.have.attr', 'disabled')
        cy.get(Log.Login).contains('Login').click()
        cy.title().should('eq', 'Sign In | GUVI')
        cy.url().should('eq', 'https://www.guvi.in/sign-in/')
    })

    beforeEach( ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.EmailInputField).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
    })

    it('Check url, title and pop up', ()=>{
        cy.url().should('include', 'https://www.guvi.in/courses/')
        cy.title().should('eq', 'GUVI | courses')
        cy.wait(5000);
  
    cy.get('.course-mainhead').then((body) => {
    if (body.find(home.popup).length == 1) {
        cy.get(home.gender).select('Male').should('have.value', 'Male')
        cy.get(home.country).click().type('india').type('{enter}')
        cy.get(home.state).click().type('tamil nadu').type('{enter}')
    }
    else{
        cy.log("pop up not visible")
    }
})

   
  })


  
})

