import React from "react";
import ReviewList from "../../src/components/ReviewList";

describe("<ReviewList />", () => {
  beforeEach(() => {
    const reviews = [
      {
        _id: "1",
        clean: 3,
        content: "This is the 1st test review.",
        author: {
          _id: "1",
          username: "terryhycheng",
          email: "terryhycheng@gmail.com",
        },
        createdAt: "2023-03-28T13:35:02.576Z",
        updatedAt: "2023-03-28T13:35:02.576Z",
      },
      {
        _id: "2",
        clean: 2,
        content: "This is the 2nd test review.",
        author: {
          _id: "1",
          username: "terryhycheng",
          email: "terryhycheng@gmail.com",
        },
        createdAt: "2023-03-28T13:35:02.576Z",
        updatedAt: "2023-03-28T13:35:02.576Z",
      },
    ];
    cy.mount(<ReviewList reviews={reviews} />);
  });
  it("should render a title", () => {
    cy.get("h2").should("have.text", "Reviews");
  });
  it("should render a button", () => {
    cy.get("button").should("be.visible").and("have.text", "Add review");
  });
  it("should open a modal", () => {
    cy.get("button").click();
    cy.get('[data-cy="reviewModal"]').should("be.visible");
  });
  it("should display a list of reviews", () => {
    cy.get('[data-cy="review"]').should("have.length", 2);
  });
});
