import { Log } from "../support/Utilities/LoginLocators";
import { home } from "../support/Utilities/GuviHomeLocators";
import { Title_Url } from "../support/Utilities/GuviHomeTitle_urls";
import {guvi} from "../support/pageObjects/Guvi_home";
import 'cypress-if'
//import { beforeEach } from "mocha";
const a = new guvi();
describe('Guvi Home', ()=>{ 
    before( ()=>{
        cy.visit("")
        a.Check_Title_and_Url(Title_Url.visitPageTitle, Title_Url.visitPageUrl)
        cy.get(Log.Login).should('be.visible').should('not.have.attr', 'disabled')
        cy.get(Log.Login).contains('Login').click()
        cy.title().should('eq', Cypress.env('SigninTitle'))
        cy.url().should('eq', Cypress.env('SigninUrl'))
    })

    beforeEach( ()=>{     
        cy.viewport(1920, 1080);   
        a.Login(); 
        cy.window().then((win) => {
          win.addEventListener('beforeunload', (e) => {
            e.preventDefault();
          });
        }); 
        cy.get(home.EntirePageBodyClass).then((body)=>{
          if(body.find(home.YoutubePopup).length ==1){
            cy.reload();
          }
          else{
            cy.log('Youtube Popup Not visible')
          }
        })
      
    })

    

    it('verifies that the user is directed to the correct home page URL after successfully logging in', ()=>{
        cy.url().should('include', Cypress.env('HomepageUrl'))
    })

    it('check the title of the home page after a user has logged in', ()=>{
        cy.title().should('eq', Cypress.env('HomepageTitle'))
    })

    it('verify the pop-up on the home page and interacts with it if its present, all after the user has logged in', ()=>{
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

    it('verify that the Guvi logo  is visible on the page.', ()=>{
        cy.get(home.GuviLogo).should('be.visible')
    })

    it('verify that the GeekPoints logo is visible on the page.', ()=>{
        cy.get(home.GeekPoints).should('be.visible')
    })

    it('verify that the Rank logo is visible on the page.', ()=>{
        cy.get(home.Rank).should('be.visible')
    })

    it('verify that the FaQ logo is visible on the page.', ()=>{
        cy.get(home.FaQ).should('be.visible')
    })

    it('verify that the profile logo is visible on the page.', ()=>{
        cy.get(home.ProfileAvatar).should('be.visible')
    })

    it('verify the functionality of the FAQ button on the page after a user has logged in', ()=>{
        cy.get(home.FaQ).should('be.visible').click();
        a.Check_Title_and_Url(Title_Url.FaQTitle,Title_Url.FaQUrl)
        cy.get(home.FaQMessage).should('be.visible').and('have.text', 'Frequently Asked Questions')
    })

    it('verify the functionality of the course banner after a user has logged in', ()=>{
        cy.get(home.CourseBanner).should('be.visible');
        // a.Check_Title_and_Url('Zen Class - Career Programs from GUVI','https://www.guvi.in/zen-class/')
        // cy.get(home.GuviLogo2).should('be.visible')
        // cy.get(home.CourseDetails).should('be.visible')
    })

    it('verify the navigation functionality of various icons on the Guvi homepage after a user has logged in', ()=>{
        //click courses in the left side of page
        cy.get(home.CourseNav).click();
        a.Check_TopNavigationBar_Visibility();
        a.CheckcoursesUrl_Title();
        cy.get(home.CourseBanner).should('be.visible');
        cy.get(home.CourseTitle).should('be.visible').and('have.text', "Online Courses");

        //click codeKata
        cy.get(home.Codekata).click();
        a.Check_TopNavigationBar_Visibility();
        a.Check_Title_and_Url(Title_Url.CodeKataTitle,Title_Url.CodeKataUrl)
        cy.get(home.codekataPageText).should('be.visible')

        //click webkata
        cy.get(home.webkata).click();
        a.Check_TopNavigationBar_Visibility();
        a.Check_Title_and_Url(Title_Url.WebkataTitle,Title_Url.WebKataUrl)
        cy.get(home.webkataPageText).should('be.visible').and('have.text', "WebKata")

        //click debugging
        cy.get(home.Debugging).click();
        a.Check_TopNavigationBar_Visibility();
        a.Check_Title_and_Url(Title_Url.DebuggingTitle,Title_Url.DebuggingUrl)
        cy.get(home.DeubggingPageText).should('be.visible').and('have.text', " Debugging")

        //click Ide
        cy.get(home.Ide).click();
        a.Check_Title_and_Url(Title_Url.IDETitle,Title_Url.IDEUrl)
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
        a.Check_Title_and_Url(Title_Url.LeaderBoardTitle,Title_Url.LeaderBoardUrl)
        a.Check_TopNavigationBar_Visibility();

        //click Rewards
        cy.get(home.Rewards).click();
        a.Check_Title_and_Url(Title_Url.RewardsTitle,Title_Url.RewardsUrl)
        a.Check_TopNavigationBar_Visibility();
        cy.get(home.RewardsPageText).should('be.visible').and('have.text', "Geekoins for Rewards")

        //click referrals
        cy.get(home.Referral).click();
        a.Check_Title_and_Url(Title_Url.ReferralTitle,Title_Url.ReferralUrl)
        a.Check_TopNavigationBar_Visibility();
        cy.get(home.ReferralpageText).should('be.visible').and('have.text', 'Apple products, Amazon Voucher & much more to win!')

        //click forum
        cy.get(home.Forum).click();
        a.Check_Title_and_Url(Title_Url.forumTitle, Title_Url.forumUrl)
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
    it('verify the content and tags within the Atomic Library after a user has logged in', () => {
        cy.get(home.AtomicLibraryMessage).eq(0).should('have.text', 'Courses are available for Free learning but Certification comes at a nominal fee.')
        cy.get(home.AtomicLibraryParent).within(() => {
       
        //Test the Atomic tag is present under all atomic courses
        a.Test_CourseTag(home.AtomicCourses,'Atomic')

        //Test Learn for FREE is present under all atomic courses
        a.Test_CourseTag(home.AtomicFreeCourse,'Learn for FREE')
       
        });
      });

      it('verify the content and tags within the Essential Library after a user has logged in', () => {
        cy.get(home.AtomicLibraryMessage).eq(1).should('have.text', 'Courses are available with Free learning access & Free certifications.')
        cy.get(home.EssentialLibraryParent).within(() => {
        a.Test_CourseTag(home.EssentialCourses,'Essential')
        a.Test_CourseTag(home.EssentialFreeCourse, "Learn for FREE")
        a.Test_CourseTag(home.EssentialFreeCertificate, "Free Certificate")
          
       });


    });

    it('verify the content and tags within the Premium Library after a user has logged in', () => {
        cy.get(home.AtomicLibraryMessage).eq(2).should('have.text', 'Courses are available at an affordable price & valuable certifications are included.')
        cy.get(home.premiumLibraryParent).within(() => {
        a.Test_CourseTag(home.PremiumCourse,'Premium')   
       });


    });

    it('Verify the visibility of Categories within the course library', () => {
        cy.get(home.Categories).within(() => {
          cy.get(home.CategoryType).each((category) => {
            cy.wrap(category).should('be.visible').within(() => {
              cy.get(".oneRem").should('be.visible');
            });
          });
        });
      });

      it('Verify the visibility of the course language within the course library.', () => {
        cy.get(home.CourseLanguageParent).within(() => {
          cy.get(home.courseLanguage).each((category) => {
            cy.wrap(category).should('be.visible')
          });
        });
      });

      it('Verify that the Free Library exclusively contains courses marked as "Free."', () => {
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

    it.skip('Test course enrollment functionality along with my courses', ()=>{
      a.Login();
     // cy.get('#home-tab').click();
      //let conditionSatisfied = [false];
      //let numarr =[0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      // cy.wrap(conditionSatisfied).then((conditionSatisfied)=>{
        // let c=16
       // let j=0
        let i =1
        let j=true;
        while(j==true){
          // cy.log(conditionSatisfied[i])
         
          cy.get(home.AtomicEntireTag).eq(i).click();
          // cy.get("[class='bg-white']").then((body) => {
           // if (body.find("#atomicEnroll").length === 1 && j==true) {
            if(cy.get(".im-interested-box" ).length==1 && j==true){
            cy.wait(3000);
            cy.get("#atomicEnroll").should('be.visible').then( ()=>{
              j=false
            })
          }
            
          //}
          else{
            cy.go('back')
            //conditionSatisfied.push(false)
          }
          
     
         // })
         
          i++
     }
      //})
    

  });

  // it('Test course enrollment functionality along with my courses', () => {
  //   a.Login(); // Assuming 'a.Login()' is your login function
  
  //   // Define an array to keep track of course enrollment conditions
  //   let conditionSatisfied = [false];
  
  //   // Define an array of indexes for your courses
  //   let numArr = [0,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  
  //   let totalCourses = 16;
  
  //   for (let i = 1; i < totalCourses; i++) {
  //     if (!conditionSatisfied[numArr[i]]) {
  //       cy.log(conditionSatisfied[numArr[i]]);
  //       cy.get(home.AtomicEntireTag).eq(i).click();
  
  //       cy.get("[class='bg-white']").then((body) => {
  //         if (body.find("#atomicEnroll").length === 1) {
  //           cy.wait(3000);
  //           cy.get("#atomicEnroll").should('be.visible').then(() => {
  //             conditionSatisfied.push(true);
            
  //           });
  //         }
  //          else {
  //           cy.go('back');
  //           conditionSatisfied.push(false);
  //         }
  //       });
  //     }
  //   }
  // });
  

 

//   it.only('Test', ()=>{
//     a.Login();
//     cy.get(home.sortby).click();
//     cy.get(home.popularity).click();
//     cy.get(home.AtomicLibraryParent).within(() => {
//       let l=cy.get(home.EnrolledCount).length;
//       cy.log(l);
//       //Highest course entrolled number
//       let num =[]
//      cy.wait(3000)
//       let tc= cy.get(home.EnrolledCount).eq(0).invoke('text').then((tc)=>{
//         const number = tc.match(/\d+/)[0];
//         const result = parseInt(number, 10);
//         cy.log(result)
//         num.push(result);
//       })
//       cy.log(num)
//       for (let i = 1; i < l; i++) {
//         let tc= cy.get(home.EnrolledCount).eq(i).invoke('text').then((tc)=>{
//           const number = tc.match(/\d+/)[0];
//           const result = parseInt(number, 10);
//           expect(num[0]).to.be.gt(result)
//         })
//       }
//   })

// })
it('check the popularity sorting feature for an atomic course in guvi home', () => {
  cy.get(home.sortby).click();
  cy.get(home.popularity).click();
  cy.get(home.AtomicLibraryParent).within(() => {
    cy.get(home.EnrolledCount).its('length').then((length) => {
      cy.log(length);

      // Highest course enrolled number
      const num = [];

      // We use cy.wrap() to ensure that 'num' is a Cypress Chainable
      cy.wrap(num).then((num) => {
        cy.wait(3000);

        cy.get(home.EnrolledCount).eq(0).invoke('text').then((tc) => {
          const number = tc.match(/\d+/)[0];
          const result = parseInt(number, 10);
          cy.log(result);
          num.push(result);

          // Use Cypress expect inside the promise
          cy.expect(num).to.have.lengthOf(1);
        });

        for (let i = 1; i < length; i++) {
          cy.get(home.EnrolledCount).eq(i).invoke('text').then((tc) => {
            const number = tc.match(/\d+/)[0];
            const result = parseInt(number, 10);
            cy.log(result);
            expect(num[0]).to.be.greaterThan(result);
          });
        }
      });
    });
  });
});

it('check the popularity sorting feature for an Essential course in guvi home', () => {
  cy.get(home.sortby).click();
  cy.get(home.popularity).click();
  cy.get(home.EssentialLibraryParent).within(() => {
    cy.get(home.EnrolledCount).its('length').then((length) => {
      cy.log(length);

      // Highest course enrolled number
      const num = [];

      // We use cy.wrap() to ensure that 'num' is a Cypress Chainable
      cy.wrap(num).then((num) => {
        cy.wait(3000);

        cy.get(home.EnrolledCount).eq(0).invoke('text').then((tc) => {
          const number = tc.match(/\d+/)[0];
          const result = parseInt(number, 10);
          cy.log(result);
          num.push(result);

          // Use Cypress expect inside the promise
          cy.expect(num).to.have.lengthOf(1);
        });

        for (let i = 1; i < length; i++) {
          cy.get(home.EnrolledCount).eq(i).invoke('text').then((tc) => {
            const number = tc.match(/\d+/)[0];
            const result = parseInt(number, 10);
            cy.log(result);
            expect(num[0]).to.be.greaterThan(result);
          });
        }
      });
    });
  });
});
it('check the popularity sorting feature for an premium course in guvi home', () => {
  cy.get(home.sortby).click();
  cy.get(home.popularity).click();
  cy.get(home.premiumLibraryParent).within(() => {
    cy.get(home.EnrolledCount).its('length').then((length) => {
      cy.log(length);

      // Highest course enrolled number
      const num = [];

      // We use cy.wrap() to ensure that 'num' is a Cypress Chainable
      cy.wrap(num).then((num) => {
        cy.wait(3000);

        cy.get(home.EnrolledCount).eq(0).invoke('text').then((tc) => {
          const number = tc.match(/\d+/)[0];
          const result = parseInt(number, 10);
          cy.log(result);
          num.push(result);

          // Use Cypress expect inside the promise
          cy.expect(num).to.have.lengthOf(1);
        });

        for (let i = 1; i < length; i++) {
          cy.get(home.EnrolledCount).eq(i).invoke('text').then((tc) => {
            const number = tc.match(/\d+/)[0];
            const result = parseInt(number, 10);
            cy.log(result);
            expect(num[0]).to.be.greaterThan(result);
          });
        }
      });
    });
  });
});

it('verify the presence of the course name that was searched for in the results of Atomic course section', ()=>{
  cy.get(home.search).should('be.visible').and('have.attr', 'placeholder', 'Search').type('python').type('{enter}')
  cy.get(home.AtomicLibraryGrandParent).then((body) => {
    if (body.find(home.AtomicCourseBox).length >= 1) {
      cy.log(true)
      cy.get(home.AtomicLibraryParent).within(() => {
        cy.get(home.AtomicCourseText).each((coursetext)=>{
          cy.wrap(coursetext).should('be.visible').invoke('text').then((text)=>{
            cy.wrap(text).should('include', 'Python')
          })
        })
        });
    }
    else{
      cy.log("No Results found")
    }

  })
})

it('verify the presence of the course name that was searched for in the results of Essential course section', ()=>{
  cy.get(home.search).should('be.visible').and('have.attr', 'placeholder', 'Search').type('chatgpt').type('{enter}')
  cy.get(home.EssentialLibraryGrandParent).then((body) => {
    if (body.find(home.EssentialCourseBox).length >= 1) {
      cy.log(true)
      cy.get(home.EssentialParent).within(() => {
        cy.get(home.EssentialCourseText).each((coursetext)=>{
          cy.wrap(coursetext).should('be.visible').invoke('text').then((text)=>{
            cy.wrap(text).should('include', 'Chatgpt', { matchCase: false })
          })
        })
        });
    }
    else{
      cy.log("No Results found")
    }

  })
})

it('verify the presence of the course name that was searched for in the results of Premium course section', ()=>{
  cy.get(home.search).should('be.visible').and('have.attr', 'placeholder', 'Search').type('chatgpt').type('{enter}')
  cy.get(home.PremiumLibraryGrandParent).then((body) => {
    if (body.find(home.PremiumCourseBox).length >= 1) {
      cy.log(true)
      cy.get(home.PremiumParent).within(() => {
        cy.get(home.premiumCourseText).each((coursetext)=>{
          cy.wrap(coursetext).should('be.visible').invoke('text').then((text)=>{
            cy.wrap(text).should('include', 'ChatGPT', { matchCase: false })
          })
        })
        });
    }
    else{
      cy.log("No Results found")
    }

  })
})

it('Verify the navigation functionality of Explore Courses and confirm the accuracy of the category title', ()=>{
  a.clickExplore();

  //Programming Language
  cy.get(home.ProgrammingLanguage).should('be.visible').and('have.text', 'Programming Languages').click();
  a.Check_Title_and_Url(Title_Url.ProgrammingLanguagesTitle, Title_Url.ProgrammingLanguagesUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Programming Languages')
  cy.go('back')

  //Data Science
  a.clickExplore();
  cy.get(home.DataScience).should('be.visible').and('have.text', 'Data Science').click();
  a.Check_Title_and_Url(Title_Url.DataScienceTitle, Title_Url.DataScienceUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Data Science')
  cy.go('back')

  //Web Development
  a.clickExplore();
  cy.get(home.WebDevelopment).should('be.visible').and('have.text', 'Web Development').click();
  a.Check_Title_and_Url(Title_Url.WebDevelopmentTitle, Title_Url.WebDevelopmentUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Web Development')
  cy.go('back')

  //DataBase and cloud computing
  a.clickExplore();
  cy.get(home.DataBase_CloudComputing).should('be.visible').and('have.text', 'Database and Cloud Computing').click();
  a.Check_Title_and_Url(Title_Url.DataBaseandcloudcomputingTitle, Title_Url.DataBaseandcloudcomputingUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Database and Cloud Computing')
  cy.go('back')

  //Software Testing and Automation
  a.clickExplore();
  cy.get(home.SoftwareTesting).should('be.visible').and('have.text', 'Software Testing and Automation').click();
  a.Check_Title_and_Url(Title_Url.SoftwareTesting_AutomationTitle, Title_Url.SoftwareTesting_AutomationUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Software Testing and Automation')
  cy.go('back')

  //IT and Software
  a.clickExplore();
  cy.get(home.IT_Software).should('be.visible').and('have.text', 'IT and Software').click();
  a.Check_Title_and_Url(Title_Url.ITandSoftwareTitle, Title_Url.ITandSoftwareUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'IT and Software')
  cy.go('back')

  //Network and Security
  a.clickExplore();
  cy.get(home.Network_Security).should('be.visible').and('have.text', 'Network and Security').click();
  a.Check_Title_and_Url(Title_Url.NetworkandSecurityTitle, Title_Url.NetworkandSecurityUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Network and Security')
  cy.go('back')

  //Web 3.0
  a.clickExplore();
  cy.get(home.Web_3).should('be.visible').and('have.text', 'Web 3.0').click();
  a.Check_Title_and_Url(Title_Url.Web3Title, Title_Url.Web3Url)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Web 3.0')
  cy.go('back')

  //Mobile Development
  a.clickExplore();
  cy.get(home.MobileDevelopment).should('be.visible').and('have.text', 'Mobile Development').click();
  a.Check_Title_and_Url(Title_Url.MobileDevelopmentTitle, Title_Url.MobileDevelopmentUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Mobile Development')
  cy.go('back')

  //UI/UX
  a.clickExplore();
  cy.get(home.UI_UX).should('be.visible').and('have.text', 'UI/UX').click();
  a.Check_Title_and_Url(Title_Url.UI_UXTitle, Title_Url.UI_UXUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'UI/UX')
  cy.go('back')

  //Digital Marketing
  a.clickExplore();
  cy.get(home.DigitalMarketing).should('be.visible').and('have.text', 'Digital Marketing').click();
  a.Check_Title_and_Url(Title_Url.DigitalMarketingTitle, Title_Url.DigitalMarketingUrl)
  cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Digital Marketing')
  cy.go('back')

})

it('Test the Explore course libraries navigation functionality', ()=>{

//Premium Library
a.clickExplore();
cy.get(home.CourseLibraries).should('be.visible').and('have.text', 'Course Libraries')
cy.get(home.PremiumLibrary).should('be.visible').and('have.text', 'Premium Library').click();
a.Check_Title_and_Url(Title_Url.commonTitle, Title_Url.premiumLibraryUrl)
cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Premium Library Courses')
cy.go('back')

//Atomic Library
a.clickExplore();
cy.get(home.CourseLibraries).should('be.visible').and('have.text', 'Course Libraries')
cy.get(home.AtomicLibrary).should('be.visible').and('have.text', 'Atomic Library').click();
a.Check_Title_and_Url(Title_Url.commonTitle, Title_Url.AtomicLibraryUrl)
cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Atomic Library Courses')
cy.go('back')

//Essential Library
a.clickExplore();
cy.get(home.CourseLibraries).should('be.visible').and('have.text', 'Course Libraries')
cy.get(home.EssentialLibrary).should('be.visible').and('have.text', 'Essential Library').click();
a.Check_Title_and_Url(Title_Url.commonTitle, Title_Url.EssentialLibraryUrl)
cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Essential Library Courses')
cy.go('back')

//Free Library
a.clickExplore();
cy.get(home.CourseLibraries).should('be.visible').and('have.text', 'Course Libraries')
cy.get(home.freelibrary).should('be.visible').and('have.text', 'Free Library').click();
a.Check_Title_and_Url(Title_Url.commonTitle, Title_Url.FreeLibraryUrl)
cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Free Library Courses')
cy.go('back')

//All Courses
a.clickExplore();
cy.get(home.CourseLibraries).should('be.visible').and('have.text', 'Course Libraries')
cy.get(home.AllCourses).should('be.visible').and('have.text', 'All Courses').click();
a.Check_Title_and_Url(Title_Url.commonTitle, Title_Url.AllCoursesUrl)
cy.get(home.CategoryTitle).should('be.visible').and('have.text', 'Online Courses with certificate')
cy.go('back')
})

it('Verify that the user profile avatar and associated information are correctly displayed', ()=>{
  cy.get(home.ProfileAvatar).should('be.visible').click();
  cy.get(home.ProfileName).should('be.visible').and('have.text', "deepak ")
  cy.get(home.ProfileEmail).should('be.visible').and('have.text', Cypress.env('Email'))
  cy.get(home.ProfileCClass).eq(0).should('be.visible').and('have.text', "My Profile")
  cy.get(home.ProfileCClass).eq(1).should('be.visible').and('have.text', 'Change Password')
  cy.get(home.ProfileCClass).eq(2).should('be.visible').and('have.text', 'Sign out')
})

it('Ensure that the "My Profile" page can be accessed from the user profile avatar, and that the page displays the expected title, URL, and user information.', ()=>{
  cy.get(home.ProfileAvatar).should('be.visible').click();
  cy.get(home.ProfileCClass).eq(0).should('be.visible').and('have.text', "My Profile").click();
  a.Check_Title_and_Url(Title_Url.ProfileTitle,Title_Url.ProfileUrl)
  a.Check_TopNavigationBar_Visibility();
  cy.get(home.ProfileUserName).should('be.visible').and('have.text', 'deepak s')
  cy.get(home.profile_email).should('be.visible').and('have.text', Cypress.env('Email')) 
})

it.only('Test change password and sign out functionality', ()=>{
  a.clickProfileAvatar();
  a.clickChangePassword();
  a.CheckTitleAndLabelOfChangePasswordPage();
  a.Enter_old_and_new_password_clickConfirmBtn('Deepak@1','Deepak@2','Deepak@2')
 

  //Test signout Functionality
  a.clickProfileAvatar();
  a.clickSignOut();
  a.Check_Title_and_Url(Title_Url.visitPageTitle, Title_Url.visitPageUrl)
  cy.get(Log.Login).contains('Login').click()
  cy.title().should('eq', Cypress.env('SigninTitle'))
  cy.url().should('eq', Cypress.env('SigninUrl'))

  //Login with new password
  a.Enter_New_Login_Password('Deepak@2')

//Change to old password
  a.clickProfileAvatar();
  a.clickChangePassword();
  a.Enter_old_and_new_password_clickConfirmBtn('Deepak@2','Deepak@1','Deepak@1')

  //Signout
  a.clickProfileAvatar();
  a.clickSignOut();
  

})



});
      


    


