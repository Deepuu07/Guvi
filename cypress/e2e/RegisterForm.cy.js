import { Register } from "../support/pageObjects/registerForm";
import { Reg } from "../support/Utilities/RegisterLocators";
const cyDo = new Register();
describe('RegisterForm', ()=>{  
    before( ()=>{
        cy.visit("")
        cy.title().should('eq', Cypress.env('LandingPageTitle'))
        cy.url().should('eq',Cypress.env('LandingPageUrl'))

    })

    it('Test Signup button is present and clickable', ()=>{
        cy.visit("")
        cy.get(Reg.singup).should('be.visible').should('not.have.attr', 'disabled')
        cy.get(Reg.singup).contains('Sign up').click()
        cy.title().should('eq', Cypress.env('SignUpTitle'))
        cy.url().should('eq', Cypress.env('SignUpUrl'))
    })

    it('Verify Register Img present on RegisterForm', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.image).then( ($ele)=>{
            expect($ele).to.be.visible
        })  
    })

    it('Verify Guvi Logo present on RegisterForm', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Logo).then( ($logo)=>{
            expect($logo).to.be.visible
        })
    })

    it('Verify Signup with google present on RegisterForm', ()=>{
        cy.visit(Cypress.env('Rpage'))
        cy.get(Reg.googlesignup).should('be.visible')
    })

    it('Validate Firstname with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Firstnamelable).then( (label)=>{
            expect(label).to.be.visible
            expect(label).to.be.have.text('First Name')
        })
        cy.get(Reg.Firstname).should('be.visible').should('have.attr', 'placeholder', 'Enter name');
        cy.get(Reg.NameForCertificate).should('be.visible').and('have.text','*This name will appear in certificates.');
        cy.get(Reg.Firstname).click();
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.FirstNameErrorMessage).should('not.be.visible').and('have.text', '\nPlease Enter a valid First Name\n');
        cy.get(Reg.Firstname).clear().type(Cypress.env('FNameInvalid')).should('have.value', Cypress.env('FNameInvalid'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.FirstNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid First Name\n');
    })

    it('Validate Lastname with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Lastnamelabel).then( (label)=>{
            expect(label).to.be.visible
            expect(label).to.be.have.text('Last Name')
        })
        cy.get(Reg.Lastname).should('be.visible').should('have.attr', 'placeholder', 'Enter name');
        cy.get(Reg.Lastname).click();
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.LastNameErrorMessage).should('not.be.visible').and('have.text', '\nPlease Enter a valid Last Name\n');
        cy.get(Reg.Lastname).clear().type(Cypress.env('LNameInvalid')).should('have.value', Cypress.env('LNameInvalid'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.LastNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Last Name\n');
    })

    it('Validate Email with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.EmailLabel).then( (email)=>{
            expect(email).to.be.visible
            expect(email).to.be.have.text('Email address')
        })
        cy.get(Reg.Email).should('be.visible').should('have.attr', 'placeholder', 'Enter email');
        cy.get(Reg.Email).click();
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.EmailErrorMessage).should('not.be.visible').and('have.text', 'Please Enter a valid email-id');
        cy.get(Reg.Email).clear().type(Cypress.env('InvalidEmail')).should('have.value', Cypress.env('InvalidEmail'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.EmailErrorMessage).should('be.visible').and('have.text', 'Please Enter a valid email-id');
    })

    it('Validate Password with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.PasswordLabel).then( (Plabel)=>{
            expect(Plabel).to.be.visible
            expect(Plabel).to.be.have.text('Password')
        })
        cy.get(Reg.Password).should('be.visible').should('have.attr', 'placeholder', 'Password');
        cy.get(Reg.Password).click();
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.Password).should('be.visible').and('have.attr', 'type', 'password');
        cy.get(Reg.PasswordToggle).click()
        cy.get(Reg.Password).should('be.visible').and('have.attr', 'type', 'text');
        cy.get(Reg.PasswordExtension).should('be.visible')
        cy.get(Reg.Passwordmin_char).should('be.visible').and('have.text', 'Password length should be between 5-12 characters').and('have.css', 'color').and('eq', 'rgb(8, 188, 99)');
        cy.get(Reg.Passwordone_num).should('be.visible').and('have.text', 'At least one numeral').and('have.css', 'color').and('eq', 'rgb(8, 188, 99)');
        cy.get(Reg.Passwordone_alpha).should('be.visible').and('have.text', 'At least one alphabet').and('have.css', 'color').and('eq', 'rgb(8, 188, 99)');
        cy.get(Reg.PasswordErrorMessage).should('not.be.visible').and('have.text', 'Password must satisfy conditions below.');
        cy.get(Reg.Password).clear().type(Cypress.env('InvalidPassword')).should('have.value', Cypress.env('InvalidPassword'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.PasswordErrorMessage).should('be.visible').and('have.text', 'Password must satisfy conditions below.');
        cy.get(Reg.PasswordExtension).should('be.visible')
        cy.get(Reg.Passwordmin_char).should('be.visible').and('have.text', 'Password length should be between 5-12 characters').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.Passwordone_num).should('be.visible').and('have.text', 'At least one numeral').and('have.css', 'color').and('eq', 'rgb(8, 188, 99)');
        cy.get(Reg.Passwordone_alpha).should('be.visible').and('have.text', 'At least one alphabet').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        //12345
        cy.get(Reg.Password).clear().type(Cypress.env('InvalidPassowrd2')).should('have.value', Cypress.env('InvalidPassowrd2'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.PasswordErrorMessage).should('be.visible').and('have.text', 'Password must satisfy conditions below.');
        cy.get(Reg.PasswordExtension).should('be.visible')
        cy.get(Reg.Passwordmin_char).should('be.visible').and('have.text', 'Password length should be between 5-12 characters').and('have.css', 'color').and('eq', 'rgb(8, 188, 99)');
        cy.get(Reg.Passwordone_num).should('be.visible').and('have.text', 'At least one numeral').and('have.css', 'color').and('eq', 'rgb(8, 188, 99)');
        cy.get(Reg.Passwordone_alpha).should('be.visible').and('have.text', 'At least one alphabet').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');

        //Deep
        cy.get(Reg.Password).clear().type(Cypress.env('InvalidPassword3')).should('have.value', Cypress.env('InvalidPassword3'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.PasswordErrorMessage).should('be.visible').and('have.text', 'Password must satisfy conditions below.');
        cy.get(Reg.PasswordExtension).should('be.visible')
        cy.get(Reg.Passwordmin_char).should('be.visible').and('have.text', 'Password length should be between 5-12 characters').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.Passwordone_num).should('be.visible').and('have.text', 'At least one numeral').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.Passwordone_alpha).should('be.visible').and('have.text', 'At least one alphabet').and('have.css', 'color').and('eq', 'rgb(8, 188, 99)');
    })

    it('Validate MobileNo with valid and invalid inputs', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.MobileNoLabel).then( (Mlabel)=>{
            expect(Mlabel).to.be.visible
            expect(Mlabel).to.be.have.text('Mobile number:')
        })
        cy.get(Reg.MobileNo).should('be.visible').should('have.attr', 'placeholder', 'Mobile number');
        cy.get(Reg.MobileNo).click();
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.MobileNoErrorMessage).should('not.be.visible').and('have.text', '\nPlease Enter a valid Mobile number\n');
        cy.get(Reg.MobileNo).clear().type(Cypress.env('InvalidMobileNo')).should('have.value', Cypress.env('InvalidMobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.MobileNoErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Mobile number\n');
    })

    it('Try to SignUp Without FirstName', ()=>{
       cy.visit(Cypress.env('Rpage'));
       cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Firstname).should('be.visible').should('have.attr', 'placeholder', 'Name is required');
        cy.get(Reg.FirstNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid First Name\n');
    })

    it('Try to SignUp Without LastName', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Lastname).should('be.visible').should('have.attr', 'placeholder', 'Name is required');
        cy.get(Reg.LastNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Last Name\n');
    })

    it('Try to SignUp Without Email', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Email).should('be.visible').should('have.attr', 'placeholder', 'E-mail is required');
        cy.get(Reg.EmailErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid email-id\n');
    })

    it('Try to SignUp Without Password', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Password).should('be.visible').should('have.attr', 'placeholder', 'Password');
        cy.get(Reg.PasswordErrorMessage).should('be.visible').and('have.text', 'Password must satisfy conditions below.');
        // cy.get(Reg.PasswordExtension).should('be.visible')
        // cy.get(Reg.Passwordmin_char).should('be.visible').and('have.text', 'Password length should be between 5-12 characters').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        // cy.get(Reg.Passwordone_num).should('be.visible').and('have.text', 'At least one numeral').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        // cy.get(Reg.Passwordone_alpha).should('be.visible').and('have.text', 'At least one alphabet').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
    })

    it('Try to SignUp Without MobileNo', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.MobileNo).should('be.visible').should('have.attr', 'placeholder', 'Mobile No. is required');
        cy.get(Reg.MobileNoErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Mobile number\n');
    })

    it('Try to SignUp Without filling anyfield', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Firstname).should('be.visible').should('have.attr', 'placeholder', 'Name is required');
        cy.get(Reg.FirstNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid First Name\n');
        cy.get(Reg.Lastname).should('be.visible').should('have.attr', 'placeholder', 'Name is required');
        cy.get(Reg.LastNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Last Name\n');
        cy.get(Reg.Email).should('be.visible').should('have.attr', 'placeholder', 'E-mail is required');
        cy.get(Reg.EmailErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid email-id\n');
        cy.get(Reg.Password).should('be.visible').should('have.attr', 'placeholder', 'Password');
        cy.get(Reg.PasswordErrorMessage).should('be.visible').and('have.text', 'Password must satisfy conditions below.');
        // cy.get(Reg.PasswordExtension).should('be.visible')
        // cy.get(Reg.Passwordmin_char).should('be.visible').and('have.text', 'Password length should be between 5-12 characters').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        // cy.get(Reg.Passwordone_num).should('be.visible').and('have.text', 'At least one numeral').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        // cy.get(Reg.Passwordone_alpha).should('be.visible').and('have.text', 'At least one alphabet').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.MobileNo).should('be.visible').should('have.attr', 'placeholder', 'Mobile No. is required');
        cy.get(Reg.MobileNoErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Mobile number\n');
    })

    it('Try to SignUp With Existing Email', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Reg.Password).click();
        cy.get(Reg.ExistingEmailErrorMessage).should('be.visible').and('have.text', 'Email-id already Exist. Login here');
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        //cy.get(Reg.ExistingEmailErrorMessage).should('be.visible').and('have.text', 'Email-id already Exist. Login here');
    })

    it('Verify Login button', ()=>{
        cy.visit(Cypress.env('Rpage'));
        cy.get(Reg.LoginButton).should('be.visible').and('have.text', '\nAlready registered User? Log in\n')
        cy.get(Reg.loginlinkButton).click();
        cy.url().should('eq',Cypress.env('SigninUrl'))
        cy.title('eq',Cypress.env('SigninTitle'));
    })

    it('Signup with valid credentials', ()=>{
        cy.visit(Cypress.env('Rpage'));
        const randomEmail = Math.random().toString(36).substring(7).toLowerCase() + "@gmail.com";
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(randomEmail).should('have.value', randomEmail);
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.url().should('eq', Cypress.env('RegisterStatus'))
        cy.get(Reg.RegistrationSuccessMsg).should('be.visible').and('have.text', 'Successfully Registered')
        cy.get(Reg.RegistrationSuccessMsg2).should('be.visible').and('have.text', 'Check your email inbox/updates to activate your account')
        cy.get(Reg.RegistrationSuccessMsg3).should('be.visible').and('have.text', 'Proceed to Sign-in')
    })

})