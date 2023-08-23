import { siteUser } from "../fixtures/users";

describe("Feedback scenarios", () => {
  let token: string;

  beforeEach(() => {
    //Take the token
    cy.request({
      method: "POST",
      url: "http://localhost:3022/auth/sign-in",
      body: { username: siteUser.email, password: siteUser.password },
    }).then(response => {
      token = response.body.accessToken;
    });
  });

  it("Should create a new message with authentication", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3022/feedback",
      headers: {
        Authorization: `Bearer ${token}`, // Set the token as a bearer token in the request header
      },
      body: {
        title: "testTitle",
        body: "testBody",
        receiverId: 2,
      },
    }).then(response => {
      expect(response.status).to.eq(200); // Status code should be 200
      expect(response.body.title).to.eq("testTitle"); // Check that the title in the response is the same as the one in the request body
      expect(response.body.body).to.eq("testBody"); // Check that the body in the response is the same as the one in the request body
      expect(response.body.author.username).to.eq(siteUser.email);
    });
  });
});
