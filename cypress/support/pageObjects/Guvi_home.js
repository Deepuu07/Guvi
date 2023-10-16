import {home} from "../Utilities/GuviHomeLocators";
import { Log } from "../Utilities/LoginLocators"
export class guvi{

    Login(){
        cy.session('login', ()=>{
            cy.visit(Cypress.env('Lpage'));
            cy.get(Log.EmailInputField).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
            cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
            cy.get(Log.loginButton).click(); 
            cy.wait(9000);
        }
        )
        cy.visit(Cypress.env('Lpage'));
    }

    Check_Title_and_Url(title, url){
        cy.title().should('include', title)
        cy.url().should('include',url)
    }
       
    continue(){
        cy.get(home.continue).click();
    }

    CheckcoursesUrl_Title(){
        cy.url().should('include', 'https://www.guvi.in/courses/')
        cy.title().should('eq', 'GUVI | courses')
    }

    Check_TopNavigationBar_Visibility(){
        cy.get(home.GuviLogo).should('be.visible')
        cy.get(home.GeekPoints).should('be.visible')
        cy.get(home.Rank).should('be.visible')
        cy.get(home.FaQ).should('be.visible')
        cy.get(home.ProfileAvatar).should('be.visible')
    }

    Test_CourseTag(locator,TagText){
        cy.get(locator).should('have.length.gt', 0).then(($elements) => {
            const l = $elements.length;
            cy.log(l)
            // Iterate through each element and check its text
            for (let i = 0; i < l; i++) {
              cy.get(locator).eq(i).should('be.visible').and('have.text', TagText);
            }
          });
    }

    clickExplore(){
        cy.get(home.Explore).should('be.visible').click();
    }
    


}