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

describe(
  "Error Handling",
  {
    retries: {
      runMode: 0,
      openMode: 0,
    },
  },

  () => {
    it(
      "Displays error message on failed fetch request",
      { defaultCommandTimeout: 10000 },
      () => {
        cy.visit("http://localhost:3000/dashboard", {
          retryOnNetworkFailure: false,
        });

        cy.intercept("GET", "https://prolog-api.profy.dev/project", {
          statusCode: 500,
        }).as("failedFetch");

        cy.wait("@failedFetch");

        cy.get("main>div>div:nth-child(3)", { timeout: 10000 }).contains(
          "There was a problem while loading the project data",
        );
      },
    );
  },
);

describe(
  "Refetch button triggers fetch request",
  { defaultCommandTimeout: 10000 },
  () => {
    it("should trigger a fetch request on button click", () => {
      cy.visit("http://localhost:3000/dashboard", {
        retryOnNetworkFailure: false,
      });

      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        statusCode: 500,
      }).as("failedFetch");

      cy.wait("@failedFetch");

      cy.get("main>div>div:nth-child(3)").find("button").click();

      cy.intercept("GET", "https://prolog-api.profy.dev/project").as(
        "fetchRequest",
      );
      cy.wait("@fetchRequest").then((interception) => {
        expect(interception.request.url).to.equal(
          "https://prolog-api.profy.dev/project",
        );
      });
    });
  },
);
