import { Register } from "../support/pageObjects/registerForm";
import { Reg } from "../support/Utilities/RegisterLocators";
const cyDo = new Register();
describe('RegisterForm', ()=>{  
    before( ()=>{
        cy.visit("")
        cy.title().should('eq', Cypress.env('LandingPageTitle'))
        cy.url().should('eq',Cypress.env('LandingPageUrl'))
        cy.get(Reg.singup).should('be.visible').should('not.have.attr', 'disabled')
        cy.get(Reg.singup).contains('Sign up').click()
        cy.title().should('eq', Cypress.env('SignUpTitle'))
        cy.url().should('eq', Cypress.env('SignUpUrl'))
    })

    beforeEach( ()=>{
        cy.visit(Cypress.env('Rpage'));
    })

    it('Check the registration image is present on the registration form page', ()=>{
        cy.get(Reg.image).then( ($ele)=>{
            expect($ele).to.be.visible
        })  
    })

    it('Ensure that the Guvi logo is visible on the registration form', ()=>{
        cy.get(Reg.Logo).then( ($logo)=>{
            expect($logo).to.be.visible
        })
    })

    it('Confirm the presence of the "Signup with Google" option on the registration form', ()=>{
        cy.get(Reg.googlesignup).should('be.visible')
    })

    it('Validate the "First Name" input field with both valid and invalid inputs', ()=>{
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

    it('Validate the "Last Name" input field with both valid and invalid inputs on the registration form', ()=>{
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

    it('Validate the "Email address" input field with both valid and invalid inputs on the registration form', ()=>{
        cy.get(Reg.EmailLabel).then( (email)=>{
            expect(email).to.be.visible
            expect(email).to.be.have.text('Email address')
        })
        cy.get(Reg.Email).should('be.visible').should('have.attr', 'placeholder', 'Enter email');
        cy.get(Reg.Email).click();
        cy.get(Reg.Email).type(Cypress.env('NotRegisteredEmail')).should('have.value', Cypress.env('NotRegisteredEmail'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.EmailErrorMessage).should('not.be.visible').and('have.text', 'Please Enter a valid email-id');
        cy.get(Reg.Email).clear().type(Cypress.env('InvalidEmail')).should('have.value', Cypress.env('InvalidEmail'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.EmailErrorMessage).should('be.visible').and('have.text', 'Please Enter a valid email-id');
    })

    it('Validate the "Password" input field with valid and various invalid inputs on the registration form', ()=>{
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

    it('Validate the "Mobile number" input field with both valid and invalid inputs on the registration form', ()=>{
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

    it('Attempt to sign up without providing a "First Name" on the registration form', ()=>{
       cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Firstname).should('be.visible').should('have.attr', 'placeholder', 'Name is required');
        cy.get(Reg.FirstNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid First Name\n');
    })

    it('Attempt to sign up without providing a "Last Name" on the registration form', ()=>{
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Lastname).should('be.visible').should('have.attr', 'placeholder', 'Name is required');
        cy.get(Reg.LastNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Last Name\n');
    })

    it('Try to sign up without providing an "Email" on the registration form', ()=>{
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Email).should('be.visible').should('have.attr', 'placeholder', 'E-mail is required');
        cy.get(Reg.EmailErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid email-id\n');
    })

    //Fail
    it('Try to sign up without providing a "Password" on the registration form', ()=>{
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.Password).should('be.visible').should('have.attr', 'placeholder', 'Password');
        cy.get(Reg.PasswordErrorMessage).should('be.visible').and('have.text', 'Password must satisfy conditions below.');
        cy.get(Reg.PasswordExtension).should('be.visible')
        cy.get(Reg.Passwordmin_char).should('be.visible').and('have.text', 'Password length should be between 5-12 characters').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.Passwordone_num).should('be.visible').and('have.text', 'At least one numeral').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.Passwordone_alpha).should('be.visible').and('have.text', 'At least one alphabet').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
    })

    it('Try to sign up without providing a "Mobile Number" on the registration form', ()=>{
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(Cypress.env('Email')).should('have.value', Cypress.env('Email'));
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.MobileNo).should('be.visible').should('have.attr', 'placeholder', 'Mobile No. is required');
        cy.get(Reg.MobileNoErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Mobile number\n');
    })

    //Fail
    it('Try to sign up without filling in any field on the registration form', ()=>{
        cy.get(Reg.Signup).click();
        cy.get(Reg.Firstname).should('be.visible').should('have.attr', 'placeholder', 'Name is required');
        cy.get(Reg.FirstNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid First Name\n');
        cy.get(Reg.Lastname).should('be.visible').should('have.attr', 'placeholder', 'Name is required');
        cy.get(Reg.LastNameErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Last Name\n');
        cy.get(Reg.Email).should('be.visible').should('have.attr', 'placeholder', 'E-mail is required');
        cy.get(Reg.EmailErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid email-id\n');
        cy.get(Reg.Password).should('be.visible').should('have.attr', 'placeholder', 'Password');
        cy.get(Reg.PasswordErrorMessage).should('be.visible').and('have.text', 'Password must satisfy conditions below.');
        cy.get(Reg.PasswordExtension).should('be.visible')
        cy.get(Reg.Passwordmin_char).should('be.visible').and('have.text', 'Password length should be between 5-12 characters').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.Passwordone_num).should('be.visible').and('have.text', 'At least one numeral').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.Passwordone_alpha).should('be.visible').and('have.text', 'At least one alphabet').and('have.css', 'color').and('eq', 'rgb(255, 65, 54)');
        cy.get(Reg.MobileNo).should('be.visible').should('have.attr', 'placeholder', 'Mobile No. is required');
        cy.get(Reg.MobileNoErrorMessage).should('be.visible').and('have.text', '\nPlease Enter a valid Mobile number\n');
    })

    //Fail
    it('Try to SignUp With Existing Email', ()=>{
        cy.get(Reg.Firstname).type(Cypress.env('FName')).should('have.value', Cypress.env('FName'));
        cy.get(Reg.Lastname).type(Cypress.env('Lname')).should('have.value', Cypress.env('Lname'));
        cy.get(Reg.Email).type(Cypress.env('ExistingEmail')).should('have.value', Cypress.env('ExistingEmail'));
        cy.get(Reg.Password).click();
        cy.get(Reg.ExistingEmailErrorMessage).should('be.visible').and('have.text', 'Email-id already Exist. Login here');
        cy.get(Reg.Password).type(Cypress.env('Password')).should('have.value', Cypress.env('Password'));
        cy.get(Reg.MobileNo).type(Cypress.env('MobileNo')).should('have.value', Cypress.env('MobileNo'));
        cy.get(Reg.Signup).click();
        cy.get(Reg.ExistingEmailErrorMessage).should('be.visible').and('have.text', 'Email-id already Exist. Login here');
    })

    it('Verify the functionality of the "Login" button on the registration page', ()=>{
        cy.get(Reg.LoginButton).should('be.visible').and('have.text', '\nAlready registered User? Log in\n')
        cy.get(Reg.loginlinkButton).click();
        cy.url().should('eq',Cypress.env('SigninUrl'))
        cy.title('eq',Cypress.env('SigninTitle'));
    })

    it('Attempt to sign up with valid credentials, including a random email address, on the registration form', ()=>{
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