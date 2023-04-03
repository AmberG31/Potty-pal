import React from 'react';
import Review from '../../src/components/review/Review';

describe('<Review />', () => {
  beforeEach(() => {
    const review = {
      _id: '1',
      clean: 3,
      content: 'This is the 1st test review.',
      author: {
        _id: '1',
        username: 'terryhycheng',
        email: 'terryhycheng@gmail.com',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    cy.mount(<Review {...review} />);
  });

  it('should display an image', () => {
    cy.get('[data-cy="profilepic"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('contains', 'https://robohash.org/');
  });

  it('should display a calculated time', () => {
    cy.get('[data-cy="createdAt"]')
      .should('be.visible')
      .and('have.text', 'Just now');
  });

  it('should display a username', () => {
    cy.get('[data-cy="username"]')
      .should('be.visible')
      .and('have.text', 'terryhycheng');
  });

  it('should display the content', () => {
    cy.get('[data-cy="content"]')
      .should('be.visible')
      .and('have.text', 'This is the 1st test review.');
  });

  it('should display the rating', () => {
    cy.get('[data-cy="cleanliness"]')
      .should('be.visible')
      .and('have.text', 'cleanliness: 3');
  });
});
