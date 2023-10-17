import {home} from "../Utilities/GuviHomeLocators";
import { Log } from "../Utilities/LoginLocators"
export class guvi{

    Login(){
        cy.session('login', ()=>{
            cy.visit(Cypress.env('Lpage'));
            cy.get(Log.EmailInputField).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
            cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
            cy.get(Log.loginButton).click(); 
            cy.wait(5000);
        }
        )
        cy.visit(Cypress.env('Lpage'));
        cy.wait(9000)
        cy.get('.course-mainhead').then((body)=>{
         if(body.find('#preview-notification-frame').length==1){
           cy.get('#preview-notification-frame').its('0.contentDocument.body').should('be.visible').then(cy.wrap).find(home.SkillUpClose).click();
         }
         else{
           cy.log('Skill pop up not visible')
         }
        })
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

    SkillUpPopUp(){
    cy.wait(4000)
       cy.get('.course-mainhead').then((body)=>{
        if(body.find('#preview-notification-frame').length==1){
          cy.get('#preview-notification-frame').its('0.contentDocument.body').should('be.visible').then(cy.wrap).find(home.SkillUpClose).click();
        }
        else{
          cy.log('Skill pop up not visible')
        }
       })
    }

    Enter_New_Login_Password(password){
      cy.get(Log.EmailInputField).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
      cy.get(Log.PasswordInputField).type(password).should('have.value', password);
      cy.get(Log.loginButton).click(); 
      cy.wait(9000)
      cy.get('.course-mainhead').then((body)=>{
       if(body.find('#preview-notification-frame').length==1){
         cy.get('#preview-notification-frame').its('0.contentDocument.body').should('be.visible').then(cy.wrap).find(home.SkillUpClose).click();
       }
       else{
         cy.log('Skill pop up not visible')
       }
      })
    }

    CheckTitleAndLabelOfChangePasswordPage(){
      cy.get(home.changePasswordTitle).should('be.visible').and('have.text', 'Change Password')
      cy.get(home.oldPasswordlabel).should('be.visible').and('have.text', 'Old Password')
      cy.get(home.NewPasswordlabel).should('be.visible').and('have.text', 'New Password')
      cy.get(home.confirmPasswordlabel).should('be.visible').and('have.text', 'Confirm Password')
      cy.get(home.confirmButton).should('be.visible').and('have.text', 'Confirm').invoke('css', 'background-color')
      .should('not.be.empty')
      .should('eq', 'rgb(13, 186, 75)');
    }

    Enter_old_and_new_password_clickConfirmBtn(oldPassword,newPassword,confirmPassword){
      cy.get(home.oldPasswordInput).should('be.visible').and('have.attr', 'placeholder','Old Password').type(oldPassword)
      cy.get(home.NewPasswordInput).should('be.visible').and('have.attr', 'placeholder', 'New Password').type(newPassword)
      cy.get(home.confirmPasswordInput).should('be.visible').and('have.attr', 'placeholder', 'Confirm New Password').type(confirmPassword)
      cy.get(home.confirmButton).click();
      cy.get(home.PasswordConfirmMsg).should('be.visible').and('have.text', 'Password has been successfully changed')
    }

    clickProfileAvatar(){
      cy.get(home.ProfileAvatar).should('be.visible').click();
    }

    clickChangePassword(){
      cy.get(home.ProfileCClass).eq(1).should('be.visible').and('have.text', "Change Password").click();
    }

    clickSignOut(){
      cy.get(home.ProfileCClass).eq(2).should('be.visible').and('have.text', "Sign out").click();
    }


    


}