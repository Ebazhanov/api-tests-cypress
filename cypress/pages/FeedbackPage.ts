export class FeedBack {
  selectors = {
    btnCreateNew: ".justify-between > .items-center > .flex",
    titleField: "#title",
    commentField: "#body",
    selectReceiver: "div.mt-4 > .space-y-6 > :nth-child(4) > .w-full",
    submitBtn: 'button[type="submit"]',
  };

  openModalForFeedback = () => {
    cy.get(this.selectors.btnCreateNew).should("be.visible").click();
    return this;
  };

  insertTitle = (title: string) => {
    cy.get(this.selectors.titleField)
      .should("be.visible")
      .click()
      .clear()
      .type(title);
  };

  insertComment = (comment: string) => {
    cy.get(this.selectors.commentField)
      .should("be.visible")
      .click()
      .clear()
      .type(comment);
  };

  selectReceiver = (index: number) => {
    cy.get(this.selectors.selectReceiver).select(index);
  };

  clickSubmitBtn = () => {
    cy.get(".max-w-md").within(() => {
      cy.get(this.selectors.submitBtn).should("be.visible").click();
    });
  };

  signOut = () => {
    cy.contains("sign out").should("be.visible").click();
  };
}
export const feedBackPage = new FeedBack();
