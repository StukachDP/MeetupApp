/// <reference types="cypress" />

const chiefLoginData = {
  login: "chief",
  password: "private",
};

const employeeLoginData = {
  login: "employee",
  password: "private",
};

const createMeetupData = {
  start: "12/30/2022 01:00 PM",
  finish: "12/30/2022 03:00 PM",
  speakers: "chief Blick",
  subject: "Default meetup",
  excerpt: "It will be default testing meetup with basic data",
  place: "Minsh, Madisson Square",
};

const editMeetupData = {
  start: "12/30/2022 03:00 PM",
  finish: "12/30/2022 04:00 PM",
  speakers: "chief Blick",
  subject: "Default meetup with edit parameters",
  excerpt: "It will be default testing meetup with basic editing data",
  place: "Minsk, Look Street, 40",
};

const createNewsData = {
  title: "Destroying of software skills",
  text: "Somewhere sometimes anytime. Somewhere sometimes anytime.",
};

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  Cypress.Commands.add("login", (login, password) => {
    cy.get('[data-test-id="login-field"] input').click().type(login);
    cy.get('[data-test-id="password-field"] input').click().type(password);
    cy.get('[data-test-id="login-button"]').click();
    cy.url().should("eq", "http://localhost:3000/meetups");
  });

  it.skip("create-meetup", () => {
    cy.login(chiefLoginData.login, chiefLoginData.password);
    cy.get('[data-test-id="create-button"]').click();
    cy.get('[data-test-id="go-previous-page-button"]').click();
    cy.get('[data-test-id="create-button"]').click();
    cy.url().should("eq", "http://localhost:3000/createMeetup");
    cy.get('[data-test-id="to-extra-fields-button"]').should("be.disabled");
    cy.get('[data-test-id="subject-field"] textarea')
      .first()
      .type(createMeetupData.subject);
    cy.get('[data-test-id="speakers-field"] textarea')
      .first()
      .type(createMeetupData.speakers);
    cy.get('[data-test-id="excerpt-field"] textarea')
      .first()
      .type(createMeetupData.excerpt);
    cy.get('[data-test-id="action_block"]').click();
    cy.get('[data-test-id="to-extra-fields-button"]').click();
    cy.get('[data-test-id="place-label"]').should("be.visible");
    cy.get('[data-test-id="excerpt-label"]').should("not.exist");
    cy.get('[data-test-id="to-main-fields-button"]').click();
    cy.get('[data-test-id="place-label"]').should("not.exist");
    cy.get('[data-test-id="excerpt-label"]').should("be.visible");
    cy.get('[data-test-id="to-extra-fields-button"]').click();
    cy.get('[data-test-id="start-date-field"] input')
      .clear()
      .type(createMeetupData.start);
    cy.get('[data-test-id="finish-date-field"] input')
      .clear()
      .type(createMeetupData.finish);
    cy.get('[data-test-id="place-field"] textarea')
      .first()
      .type(createMeetupData.place);
    cy.get('[data-test-id="create-meetup-button"]').click();
    cy.url().should("eq", "http://localhost:3000/meetups");
  });

  it.skip("edit-meetup", () => {
    cy.login(chiefLoginData.login, chiefLoginData.password);
    cy.get('[data-test-id="edit-meetup-button"]').last().click();
    cy.get('[data-test-id="go-previous-page-button"]').click();
    cy.url().should("eq", "http://localhost:3000/meetups");
    cy.get('[data-test-id="edit-meetup-button"]').last().click();
    cy.get('[data-test-id="subject-field"] textarea')
      .first()
      .clear()
      .type(editMeetupData.subject);
    cy.get('[data-test-id="speakers-field"] textarea')
      .first()
      .clear()
      .type(editMeetupData.speakers);
    cy.get('[data-test-id="excerpt-field"] textarea')
      .first()
      .clear()
      .type(editMeetupData.excerpt);
    cy.get('[data-test-id="start-date-field"] input')
      .clear()
      .clear()
      .type(editMeetupData.start);
    cy.get('[data-test-id="finish-date-field"] input')
      .clear()
      .clear()
      .type(editMeetupData.finish);
    cy.get('[data-test-id="place-field"] textarea')
      .first()
      .clear()
      .type(editMeetupData.place);
    cy.get('[data-test-id="edit-meetup-button"]').click();
    cy.url().should("eq", "http://localhost:3000/meetups");
  });

  it.skip("watch-meetups", () => {
    cy.login(employeeLoginData.login, employeeLoginData.password);

    cy.get('[data-test-id="request-tab"]').click();
    cy.get('[data-test-id="status-filter-content"]').should("contain", "topic");
    cy.get('[data-test-id="draft-tab"]').click();
    cy.get('[data-test-id="status-filter-content"]').should(
      "contain",
      "on moderation"
    );
    cy.get('[data-test-id="confirmed-tab"]').click();
    cy.get('[data-test-id="status-filter-content"]').should(
      "contain",
      "published"
    );
    cy.get('[data-test-id="past-tab"]').click();
    cy.get('[data-test-id="status-filter-content"]').should(
      "contain",
      "passed"
    );
    cy.get('[data-test-id="request-tab"]').click();
    cy.get('[data-test-id="meetup-info"]').last().click();
    cy.get('[data-test-id="header"]').should("contain", "topic");
    cy.get('[data-test-id="delete-button"]').should("not.exist");
    cy.get('[data-test-id="publish-button"]').should("not.exist");
    cy.get('[data-test-id="add-participant-button"]')
      .should("be.visible")
      .click();
    cy.get('[data-test-id="delete-participant-button"]')
      .should("be.visible")
      .click();
    cy.url().should("contain", "http://localhost:3000/meetup");
    cy.get('[data-test-id="goBack-button"]').click();
    cy.url().should("eq", "http://localhost:3000/meetups");
    cy.get('[data-test-id="draft-tab"]').click();
    cy.get('[data-test-id="meetup-info"]').last().click();
    cy.get('[data-test-id="header"]').should("contain", "meetup");
    cy.get('[data-test-id="publish-button"]').should("not.exist");
    cy.get('[data-test-id="add-participant-button"]')
      .should("be.visible")
      .click();
    cy.get('[data-test-id="delete-participant-button"]')
      .should("be.visible")
      .click();
    cy.get('[data-test-id="open-menu-button"]').should("be.visible").click();
    cy.get('[data-test-id="logOut-button"]').should("be.visible").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it.skip("publish-delete-meetup", () => {
    cy.login(chiefLoginData.login, chiefLoginData.password);

    cy.get('[data-test-id="request-tab"]').click();
    cy.get('[data-test-id="meetup-info"]').last().click();
    cy.get('[data-test-id="add-participant-button"]').should("not.exist");
    cy.get('[data-test-id="delete-participant-button"]').should("not.exist");

    cy.intercept("PUT", "http://localhost:3000/api/meetups/").as(
      "meetupPublish"
    );
    cy.get('[data-test-id="publish-button"]').should("be.visible").click();
    cy.wait("@meetupPublish")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.get('[data-test-id="publish-button"]').should("be.visible").click();
    cy.wait("@meetupPublish")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.get('[data-test-id="publish-button"]').should("be.visible").click();
    cy.wait("@meetupPublish")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.get('[data-test-id="publish-button"]').should("be.visible").click();
    cy.get('[data-test-id="publish-button"]').should("not.exist");
    cy.get('[data-test-id="goBack-button"]').click();
    cy.get('[data-test-id="past-tab"]').click();
    cy.get('[data-test-id="delete-meetup-icon"]').last().click();
    cy.get('[data-test-id="delete-meetup-modal-header"]').should("be.visible");
    cy.intercept("DELETE", "**/meetups/*").as("deleteMeetup");
    cy.get('[data-test-id="delete-meetup-button"]')
      .should("be.visible")
      .click();

    cy.wait("@deleteMeetup")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.url().should("eq", "http://localhost:3000/meetups");
  });

  it.skip("app-localization", () => {
    cy.get('[data-test-id="open-menu-button"]').should("be.visible").click();
    cy.get('[data-test-id="logOut-button"]').should("not.exist");
    cy.get('[data-test-id="language-label"]')
      .should("be.visible")
      .should("contain", "English");
    cy.getCookie("i18next").should("have.property", "value", "en");
    cy.get('[data-test-id="change-language-button"]')
      .should("be.visible")
      .click();
    cy.get('[data-test-id="language-label"]')
      .should("be.visible")
      .should("contain", "Русский");
    cy.getCookie("i18next").should("have.property", "value", "rus");
  });

  it.skip("create-news", () => {
    cy.login(chiefLoginData.login, chiefLoginData.password);

    cy.visit("http://localhost:3000/news");
    cy.get('[data-test-id="create-news-button"]').click();
    cy.url().should("eq", "http://localhost:3000/createNews");
    cy.get('[data-test-id="create-news-header"]').should("contain", "News");
    cy.get('[data-test-id="title-field"] textarea')
      .first()
      .type(createNewsData.title);
    cy.get('[data-test-id="text-field"] textarea')
      .first()
      .type(createNewsData.text);
    cy.get('[data-test-id="action-block"]').click();
    cy.intercept("POST", "http://localhost:3000/api/news/").as("createNews");
    cy.get('[data-test-id="create-news-button"]').click();
    cy.wait("@createNews")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.url().should("eq", "http://localhost:3000/news");
  });

  it.skip("edit-news", () => {
    cy.login(chiefLoginData.login, chiefLoginData.password);

    cy.visit("http://localhost:3000/news");
    cy.get('[data-test-id="news-area"]').last().click();
    cy.get('[data-test-id="edit-news-button"]').should("be.visible").click();
    cy.url().should("contain", "http://localhost:3000/news/edit/");

    cy.get('[data-test-id="title-field"] textarea')
      .first()
      .clear()
      .type(createNewsData.title);
    cy.get('[data-test-id="text-field"] textarea')
      .first()
      .clear()
      .type(createNewsData.text);
    cy.intercept("PUT", "http://localhost:3000/api/news/*").as("editNews");
    cy.get('[data-test-id="edit-news-button"]').click();
    cy.wait("@editNews")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.url().should("eq", "http://localhost:3000/news");
  });

  it.skip("watch-news", () => {
    cy.login(employeeLoginData.login, employeeLoginData.password);

    cy.visit("http://localhost:3000/news");
    cy.get('[data-test-id="news-area"]').first().click();
    cy.get('[data-test-id="choosen-news-header"]').should("be.visible");
    cy.get('[data-test-id="open-delete-modal-button"]').should("not.exist");
    cy.get('[data-test-id="edit-news-button"]').should("not.exist");
    cy.get('[data-test-id="goBack-button"]').should("be.visible").click();
    cy.url().should("eq", "http://localhost:3000/news");

    cy.get('[data-test-id="open-menu-button"]').should("be.visible").click();
    cy.get('[data-test-id="logOut-button"]').should("be.visible").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it.skip("delete-news", () => {
    cy.login(chiefLoginData.login, chiefLoginData.password);

    cy.visit("http://localhost:3000/news");
    cy.get('[data-test-id="news-area"]').last().click();
    cy.get('[data-test-id="choosen-news-header"]').should("be.visible");
    cy.get('[data-test-id="edit-news-button"]').should("be.visible");

    cy.intercept("DELETE", "**/news/*").as("deleteNews");
    cy.get('[data-test-id="open-delete-modal-button"]')
      .should("be.visible")
      .click();
    cy.get('[data-test-id="delete-news-button"]').should("be.visible").click();

    cy.wait("@deleteNews")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.url().should("eq", "http://localhost:3000/news");
  });
});
