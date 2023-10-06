import {home} from "../Utilities/GuviHomeLocators";
export class guvi{

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

}