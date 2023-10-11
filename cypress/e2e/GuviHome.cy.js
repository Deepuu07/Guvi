import { Log } from "../support/Utilities/LoginLocators";
import { home } from "../support/Utilities/GuviHomeLocators";
import {guvi} from "../support/pageObjects/Guvi_home";
import 'cypress-if'
//import { beforeEach } from "mocha";
const a = new guvi();
describe('Guvi Home', ()=>{ 
    before( ()=>{
        cy.visit("")
        a.Check_Title_and_Url("GUVI | Learn to code in your native language", "https://www.guvi.in/")
        cy.get(Log.Login).should('be.visible').should('not.have.attr', 'disabled')
        cy.get(Log.Login).contains('Login').click()
        cy.title().should('eq', Cypress.env('SigninTitle'))
        cy.url().should('eq', Cypress.env('SigninUrl'))
    })

    beforeEach( ()=>{

        cy.session('login', ()=>{
            a.Login();
            cy.get(Log.EmailInputField).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
            cy.get(Log.PasswordInputField).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
            cy.get(Log.loginButton).click(); 
            cy.wait(3000);
        }
        )
       
    })

    it('Test home page url', ()=>{
        a.Login();
        cy.url().should('include', Cypress.env('HomepageUrl'))
    })

    it('Test home page title', ()=>{
        a.Login();
        cy.title().should('eq', Cypress.env('HomepageTitle'))
    })

    it('Test home page pop up', ()=>{
        a.Login();
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

    it('Test the presence of Guvi Logo', ()=>{
        a.Login();
        cy.get(home.GuviLogo).should('be.visible')
    })

    it('Test the presence of GeekPoints Logo', ()=>{
        a.Login();
        cy.get(home.GeekPoints).should('be.visible')
    })

    it('Test the presence of Rank Logo', ()=>{
        a.Login();
        cy.get(home.Rank).should('be.visible')
    })

    it('Test the presence of FaQ Logo', ()=>{
        a.Login();
        cy.get(home.FaQ).should('be.visible')
    })

    it('Test the presence of profile Logo', ()=>{
        a.Login();
        cy.get(home.ProfileAvatar).should('be.visible')
    })

    it('Test Faq button Navigation', ()=>{
        a.Login();
        cy.get(home.FaQ).should('be.visible').click();
        a.Check_Title_and_Url('FAQ | GUVI','https://www.guvi.in/faq/')
        cy.get(home.FaQMessage).should('be.visible').and('have.text', 'Frequently Asked Questions')
    })

    it('Test course Banner', ()=>{
        a.Login();
        cy.get(home.CourseBanner).should('be.visible');
        // a.Check_Title_and_Url('Zen Class - Career Programs from GUVI','https://www.guvi.in/zen-class/')
        // cy.get(home.GuviLogo2).should('be.visible')
        // cy.get(home.CourseDetails).should('be.visible')
    })

    it('Test guvi homepage icons navigation', ()=>{
        a.Login();
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

    // it.only('Course Library', ()=>{
    //     //Check Automic Course
    //     a.Login();
    //     cy.get(home.AutomicLibraryParent).within(()=>{
    //     let l = cy.get("[class='course-tag atomic']").length
    //       for(let i=0; i<l; i++){
    //       cy.get("[class='course-tag atomic']").eq(i).should('have.text', "Atomic")
    //     }
    //     })
    // })

    //Course library
    it('Test whether the Atomic Library contains only Atomic courses.', () => {
        a.Login();
        cy.get(home.AtomicLibraryMessage).eq(0).should('have.text', 'Courses are available for Free learning but Certification comes at a nominal fee.')
        cy.get(home.AtomicLibraryParent).within(() => {
       
        //Test the Atomic tag is present under all atomic courses
        a.Test_CourseTag(home.AtomicCourses,'Atomic')

        //Test Learn for FREE is present under all atomic courses
        a.Test_CourseTag(home.AtomicFreeCourse,'Learn for FREE')
       
        });
      });

      it('Test whether the Essential Library contains only Essential courses.', () => {
        a.Login();
        cy.get(home.AtomicLibraryMessage).eq(1).should('have.text', 'Courses are available with Free learning access & Free certifications.')
        cy.get(home.EssentialLibraryParent).within(() => {
        a.Test_CourseTag(home.EssentialCourses,'Essential')
        a.Test_CourseTag(home.EssentialFreeCourse, "Learn for FREE")
        a.Test_CourseTag(home.EssentialFreeCertificate, "Free Certificate")
          
       });


    });

    it('Test whether the Premium Library contains only premium courses.', () => {
        a.Login();
        cy.get(home.AtomicLibraryMessage).eq(2).should('have.text', 'Courses are available at an affordable price & valuable certifications are included.')
        cy.get(home.premiumLibraryParent).within(() => {
        a.Test_CourseTag(home.PremiumCourse,'Premium')   
       });


    });

    it('Test whether the Categories under the course library are visible', () => {
        a.Login();
        cy.get(home.Categories).within(() => {
          cy.get(home.CategoryType).each((category) => {
            cy.wrap(category).should('be.visible').within(() => {
              cy.get(".oneRem").should('be.visible');
            });
          });
        });
      });

      it('Test whether the course language under the course library are visible', () => {
        a.Login();
        cy.get(home.CourseLanguageParent).within(() => {
          cy.get(home.courseLanguage).each((category) => {
            cy.wrap(category).should('be.visible')
          });
        });
      });

      it('Test whether the Free Library contains only Free courses.', () => {
        a.Login();
        cy.get(home.FreeLibrary).should('be.visible').click();
        cy.get(home.FreeLibraryParent).within(() => {
        a.Test_CourseTag(home.FreeCourses,'Free')   
       });

       cy.get(home.Categories).within(() => {
        cy.get(home.CategoryType).each((category) => {
          cy.wrap(category).should('be.visible').within(() => {
            cy.get(".oneRem").should('be.visible');
          });
        });
      });

      cy.get(home.CourseLanguageParent).within(() => {
        cy.get(home.courseLanguage).each((category) => {
          cy.wrap(category).should('be.visible')
        });
      });

    });

    it.only('Test course enrollment functionality along with my courses', ()=>{

      a.Login();
      // cy.get(home.AtomicLibraryParent).within(() => {
      //   cy.get(home.AtomicEntireTag).then( (ele)=>{
      //     let l=ele.length;
      //     cy.log(l);
      //     for(let i=1; i<l; i++){
      //       cy.get(home.AtomicEntireTag).eq(i).click();
      //       const expUrl = "https://www.guvi.in/courses/"
      //       cy.url().if('contains', expUrl).then(()=>{
              
      //       })
      //     }
      //   });
        
      // 

      let conditionSatisfied = [false];
      let l=16
      for(let i=1; i<=l && !conditionSatisfied[0]; i++){
        cy.get(home.AtomicEntireTag).eq(i).click();
        cy.get("[class='bg-white']").then((body) => {
        if (body.find("#atomicEnroll").length == 1) {
        cy.wait(3000);
        cy.get("#atomicEnroll").should('be.visible')
        conditionSatisfied[0]=true; 
      }
      else{
        cy.go('back')
      }
       
      })
    }

  });


});
      



    


