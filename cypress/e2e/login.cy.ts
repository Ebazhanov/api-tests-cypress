import { siteUser } from "../fixtures/users";
import { loginPage } from "../pages/LoginPage";

describe("Login/Authentication scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "/auth/sign-in").as("sign-in");
  });

  it("Login  - success case", () => {
    loginPage
      .typeEmail(siteUser.email)
      .typePassword(siteUser.password)
      .submitLoginForm();
    cy.wait("@sign-in").its("response.statusCode").should("eq", 200);

    cy.url().should("contain", "/feedback");
  });

  it("C2 - Login with wrong password - failed", () => {
    loginPage
      .typeEmail(siteUser.email)
      .typePassword("wrong_password")
      .submitLoginForm();

    cy.wait("@sign-in").its("response.statusCode").should("eq", 403);

    cy.contains(
      loginPage.selectors.warningMessage,
      "Wrong username or password"
    ).should("be.visible");
  });
});
