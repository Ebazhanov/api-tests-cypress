export class LoginPage {
  selectors = {
    emailInput: '[id="username"]',
    passwordInput: '[id="password"]',
    signIn: 'button[type="submit"]',
    warningMessage: ".text-red-400",
  };

  login = (email: string, password: string) => {
    this.typeEmail(email).typePassword(password).submitLoginForm();
    return this;
  };

  typeEmail = (email: string) => {
    cy.get(this.selectors.emailInput)
      .should("be.visible")
      .click()
      .clear()
      .type(email)
      .should("have.value", email);
    return this;
  };

  typePassword = (password: string) => {
    cy.get(this.selectors.passwordInput)
      .should("be.visible")
      .click()
      .clear()
      .type(password);
    return this;
  };
  submitLoginForm = () => {
    cy.get(this.selectors.signIn).should("be.visible").click();
    return this;
  };
}

export const loginPage = new LoginPage();
