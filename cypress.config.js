const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl" : "https://www.guvi.in/",
    env:{
      "Rpage" : "register/",
      "Lpage" : "sign-in/",
      "FName" : "Deepu",
      "Lname" : "S",
      "Email" : "deepakrao9786@gmail.com",
      "Password" : "Deepak@1",
      "MobileNo" : "7010786384",
      "FNameInvalid" : "Deepakrao123",
      "LNameInvalid" : "123",
      "InvalidEmail" : "deepakrao7010gmail.com",
      "InvalidPassword" : "1234",
      "InvalidPassowrd2" : "12345",
      "InvalidPassword3" : "Deep",
      "InvalidMobileNo" : "70108",
      "ExistingEmail" : "deepakrao7010@gmail.com",
      "NotRegisteredEmail" : "deepakrao9786@gmail.com",
      "LandingPageTitle" : "GUVI | Learn to code in your native language",
      "LandingPageUrl" : "https://www.guvi.in/",
      "SigninTitle" : 'Sign In | GUVI',
      "SigninUrl" : 'https://www.guvi.in/sign-in/',
      "ForgotPasswordTitle" : "Forgot Password | GUVI",
      "ForgotPasswordUrl" : 'https://www.guvi.in/forgot-password/',
      "SignUpUrl" : 'https://www.guvi.in/register/',
      "SignUpTitle" : "Sign Up | GUVI",
      "HomepageUrl" : "https://www.guvi.in/courses/",
      "HomepageTitle" : 'GUVI | courses',
      "RegisterStatus" : 'https://www.guvi.in/status/?register=true'

    }
    
  },
});
