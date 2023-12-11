// import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusStrings = ["Critical", "Warning", "Stable"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(statusStrings[index]);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    it("renders correct status badge color", () => {
      const statusStrings = ["Critical", "Warning", "Stable"];
      const badgeColors = [
        "rgb(254, 243, 242)",
        "rgb(255, 250, 235)",
        "rgb(236, 253, 243)",
      ];

      cy.get("main")
        .find("li")
        .each(($el, index) => {
          cy.wrap($el)
            .get("div")
            .contains(statusStrings[index])
            .should("have.css", "background-color", badgeColors[index]);
        });
    });
  });
});

describe("Error Handling", () => {
  it(
    "Displays error message on failed fetch request",
    { defaultCommandTimeout: 12000 },
    () => {
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        forceNetworkError: true,
      }).as("failedFetch");

      cy.visit("http://localhost:3000/dashboard", {
        retryOnNetworkFailure: false,
      });

      cy.wait("@failedFetch");

      cy.get('[data-cy="alert-error"]', { timeout: 12000 }).should(
        "be.visible",
      );
      cy.get('[data-cy="alert-error"]').find("button").click();
      cy.intercept("GET", "https://prolog-api.profy.dev/project").as(
        "fetchRequest",
      );
      cy.wait("@fetchRequest").then((interception) => {
        expect(interception.request.url).to.equal(
          "https://prolog-api.profy.dev/project",
        );
      });
    },
  );
});
