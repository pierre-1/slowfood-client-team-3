describe("user views menus", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  describe("User attempts to view menu", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/",
        response: "fixture:menu_data.json"
      });
    });

    it("sucessfully", () => {
      cy.get("#index").within(() => {
        cy.contains("Gravad lax");
        cy.contains("Sill");
        cy.contains("Varmrökt lax");
      });
    });
  });

  describe("when the are NO products", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: []
      });
    });

    it("unsuccessfully", () => {
      cy.get("#index").should("not.exist");
    });
  });
});
