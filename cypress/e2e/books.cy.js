describe("Books", () => {
  it("can list, show, create, edit and delete books", () => {
    // List Books
    cy.visit("/").get("[data-cy=link-to-booksList]").click();

    // Create Books
    cy.get('[href="/books/create"]')
      .click()
      .get("[data-cy=input-book-title]")
      .type("Nuevo Libro desde Cypress")
      .get("[data-cy=button-submit-book]")
      .click()
      .get("[data-cy=books-list]")
      .contains("Nuevo Libro desde Cypress");

    // Show Books
    cy.get("[data-cy^=link-to-visit-book-]")
      .last()
      .click()
      .get("h1")
      .should("contains.text", "Nuevo Libro desde Cypress")
      .get('[href="/books"]')
      .click();

    // Edit Book
    cy.get("[data-cy^=link-to-edit-book-]")
      .last()
      .click()
      .get("[data-cy=input-book-title]")
      .clear()
      .type("Libro Editado desde Cypress")
      .get("[data-cy=button-submit-book]")
      .click()
      .get("[data-cy=books-list]")
      .contains("Libro Editado desde Cypress");

    // Delete Book
    cy.get("[data-cy^=link-to-delete-book-]")
      .last()
      .click()
      .wait(2000)
      .get("[data-cy^=link-to-visit-book-]")
      .last()
      .should("not.contains.text", "Libro Editado desde Cypress");
  });
});
