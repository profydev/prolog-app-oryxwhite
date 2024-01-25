describe("Footer Component", () => {
  it("renders the Footer component", () => {
    cy.visit("localhost:3000/dashboard");
    cy.get('[data-cy="footer"]').should("exist");
  });

  it("renders the version number", () => {
    cy.visit("localhost:3000/dashboard");
    cy.get('[data-cy="version"]').should("exist");
  });

  it("renders footer links", () => {
    cy.visit("localhost:3000/dashboard");
    cy.get('[data-cy="links"]').should("exist");
    cy.get('[data-cy="links"] a').should("have.length.at.least", 4);
  });

  it("renders the logo", () => {
    cy.visit("localhost:3000/dashboard");
    cy.get("img").should("exist");
  });
});
