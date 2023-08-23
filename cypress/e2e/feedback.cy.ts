import { siteUser } from "../fixtures/users";
import { feedBackPage } from "../pages/FeedbackPage";
import { loginPage } from "../pages/LoginPage";

describe("Feedback scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "/auth/sign-in").as("sign-in");
    cy.intercept("POST", "/feedback").as("feedback");

    loginPage
      .typeEmail(siteUser.email)
      .typePassword(siteUser.password)
      .submitLoginForm();
    cy.wait("@sign-in").its("response.statusCode").should("eq", 200);
    cy.url().should("contain", "/feedback");
  });
  afterEach(() => {
    feedBackPage.signOut();
  });

  it("Create new feedback", () => {
    feedBackPage.openModalForFeedback();
    feedBackPage.insertTitle("Title");
    feedBackPage.insertComment("Comment");
    feedBackPage.selectReceiver(2);
    feedBackPage.clickSubmitBtn();
    cy.wait("@feedback").its("response.statusCode").should("eq", 200);
  });
});
