import { Log } from "../support/Utilities/LoginLocators";
import { home } from "../support/Utilities/GuviHomeLocators";
import {guvi} from "../support/pageObjects/Guvi_home";
//import { beforeEach } from "mocha";
const a = new guvi();
describe('Guvi Home', ()=>{ 
    before( ()=>{
        cy.visit("")
        a.Check_Title_and_Url("GUVI | Learn to code in your native language", "https://www.guvi.in/")
        cy.get(Log.Login).should('be.visible').should('not.have.attr', 'disabled')
        cy.get(Log.Login).contains('Login').click()
        cy.title().should('eq', 'Sign In | GUVI')
        cy.url().should('eq', 'https://www.guvi.in/sign-in/')
    })

    beforeEach( ()=>{
        cy.visit(Cypress.env('Lpage'));
        cy.get(Log.EmailInputField).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Log.loginButton).click(); 
    })

    it('Check url, title and pop up', ()=>{
        a.CheckcoursesUrl_Title()
        cy.wait(5000);
  
    cy.get('.course-mainhead').then((body) => {
    if (body.find(home.popup).length == 1) {
        cy.get(home.gender).select('Male').should('have.value', 'Male')
        cy.get(home.country).click().type('india').type('{enter}')
        cy.get(home.state).click().type('tamil nadu').type('{enter}')
        cy.get(home.city).click().type('arcot').type('{enter}')
        a.continue()
        cy.get(home.degree).select('M.E/M.Tech')
        a.continue()
        cy.get(home.department).select('Information Technology')
        a.continue()
        cy.get(home.profile).select('Working Professional')
        cy.get(home.company).type('Maximl')
        cy.get(home.role).type('QA Intern')
        cy.get(home.location).type('Bengaluru')
        cy.get(home.experience).select('0 - 1')
        a.continue()
        cy.get(home.skills).type('javascript').type('{enter}')
        .type('cypress').type('{enter}')
        a.continue()
        cy.get(home.codingProfile).select('Beginner')
        cy.get(home.reference).select('Word of Mouth')
        cy.get(home.Interest).click().type('Software Testing and Automation').type('{enter}')
        a.continue()
    }

    else{
        cy.log("pop up not visible")
    }
    })

    })
    it('Check the presence of Guvi, GeekPoints, Rank, FaQ, and profile Logo', ()=>{
        a.Check_TopNavigationBar_Visibility();
    })

    it('Check Faq button Navigation', ()=>{
        cy.get(home.FaQ).should('be.visible').click();
        a.Check_Title_and_Url('FAQ | GUVI','https://www.guvi.in/faq/')
        cy.get(home.FaQMessage).should('be.visible').and('have.text', 'Frequently Asked Questions')
    })

    it('Check course Banner', ()=>{
        cy.get(home.CourseBanner).should('be.visible').click();
        a.Check_Title_and_Url('Zen Class - Career Programs from GUVI','https://www.guvi.in/zen-class/')
        cy.get(home.GuviLogo2).should('be.visible')
        cy.get(home.CourseDetails).should('be.visible')
    })

    it('Check left side options page navigation', ()=>{
        //click courses in the left side of page
        cy.get(home.CourseNav).click();
        a.Check_TopNavigationBar_Visibility();
        a.CheckcoursesUrl_Title();
        cy.get(home.CourseBanner).should('be.visible');
        cy.get(home.CourseTitle).should('be.visible').and('have.text', "Online Courses");

        //click codeKata
        cy.get(home.Codekata).click();
        a.Check_TopNavigationBar_Visibility();
        a.Check_Title_and_Url("CodeKata | GUVI","https://www.guvi.in/code-kata/")
        cy.get(home.codekataPageText).should('be.visible')

        //click webkata
        cy.get(home.webkata).click();
        a.Check_TopNavigationBar_Visibility();
        a.Check_Title_and_Url("Webkata | GUVI","https://www.guvi.in/webkata/")
        cy.get(home.webkataPageText).should('be.visible').and('have.text', "WebKata")

        //click debugging
        cy.get(home.Debugging).click();
        a.Check_TopNavigationBar_Visibility();
        a.Check_Title_and_Url("Debugging | GUVI", "https://www.guvi.in/debugging/")
        cy.get(home.DeubggingPageText).should('be.visible').and('have.text', " Debugging")

        //click Ide
        cy.get(home.Ide).click();
        a.Check_Title_and_Url("IDE | GUVI","https://www.guvi.in/ide/")
        cy.get('#idePopUp').then((body) => {
            if (body.find(home.IdePopUp).length == 1) {
                cy.get(home.IdePopUp).click();
            }
            else{
                cy.log("pop up not visible")
            }
            
            })
        cy.wait(2000);
        cy.get(home.editor).should('be.visible')

        //click LeaderBoard
        cy.get(home.LeaderBoard).click();
        cy.on('window:confirm',(txt)=>{
            //Assertion
            expect(txt).to.contains('Changes you made may not be saved.');
         })
        a.Check_Title_and_Url("Leader Board | GUVI","https://www.guvi.in/leader-board/")
        a.Check_TopNavigationBar_Visibility();

        //click Rewards
        cy.get(home.Rewards).click();
        a.Check_Title_and_Url("Rewards | GUVI","https://www.guvi.in/rewards/")
        a.Check_TopNavigationBar_Visibility();
        cy.get(home.RewardsPageText).should('be.visible').and('have.text', "Geekoins for Rewards")

        //click referrals
        cy.get(home.Referral).click();
        a.Check_Title_and_Url("Referral | GUVI","https://www.guvi.in/referral/")
        a.Check_TopNavigationBar_Visibility();
        cy.get(home.ReferralpageText).should('be.visible').and('have.text', 'Apple products, Amazon Voucher & much more to win!')

        //click forum
        cy.get(home.Forum).click();
        a.Check_Title_and_Url("GUVI - Learn Practice Get Hired", "https://forum.guvi.in/")
    })

    // it('Course Library', ()=>{
    //     //Check Automic Course
    // })



    
})

