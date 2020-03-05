describe("User attempts to view menu", () => {
  before(function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/",
      response: "fixture:menu_data.json"
    });

    cy.visit("/");
  });

  it("sucessfully", () => {
    cy.get("#index").contains("products");
  });
});
