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
      "Email" : "deepusgj@gmail.com",
      "Password" : "Deepak@1",
      "MobileNo" : "7010786384",
      "FNameInvalid" : "Deepakrao123",
      "LNameInvalid" : "123",
      "InvalidEmail" : "deepakrao7010gmail.com",
      "InvalidPassword" : "1234",
      "InvalidPassowrd2" : "12345",
      "InvalidPassword3" : "Deep",
      "InvalidMobileNo" : "70108",
      "ExistingEmail" : "deepakrao7010@gmail.com"
    }
    
  },
});
