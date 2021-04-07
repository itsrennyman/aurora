beforeEach(() => {
  cy.exec("npm run db:test-seed");
});

describe("Views API", () => {
  const seed = "40551333ba09839f5287a7a6aa2f73fe";

  it("Not Authenticated.", () => {
    cy.request({
      method: "GET",
      url: `/api/metrics/${seed}/views/browsers`,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(401);
      expect(resp.body).to.eql({ message: "Unauthorized" });
    });
  });

  it("Authenticated.", () => {
    cy.login("info@renatopozzi.me", "password");

    cy.request({
      method: "GET",
      url: `/api/metrics/${seed}/views/browsers`,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.eql({ message: "Unauthorized" });
    });
  });
});
