import {home} from "../Utilities/GuviHomeLocators";
export class guvi{

    Login(){
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

}