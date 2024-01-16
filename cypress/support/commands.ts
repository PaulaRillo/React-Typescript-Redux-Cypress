/// <reference types="cypress" />

import { Reservation } from "../../src/types/reservation";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('createReservation', (startDate: string, endDate: string, numAdults: number = 1, numChildren: number = 0, numPets: number = 0) => {
    if (startDate !== undefined) {
        cy.get('input[name="startDate"]').type(startDate);
    }
    if (endDate !== undefined) {
        cy.get('input[name="endDate"]').type(endDate);
    }
    for (let i = 1; i < numAdults; i++) {
        cy.get('button[id="increaseNumAdults"]').click();
    }
    for (let i = 0; i < numChildren; i++) {
        cy.get('button[id="increaseNumChildren"]').click();
    }
    for (let i = 0; i < numPets; i++) {
        cy.get('button[id="increaseNumPets"]').click();
    }
});

Cypress.Commands.add('editReservation', (oldReservation:Reservation, startDate: string, endDate: string, numAdults: number = 1, numChildren: number = 0, numPets: number = 0) => {
    const modal = cy.get('div[role="dialog"]');
    modal.should('be.visible')

    modal.get(`button[id="${oldReservation.id}"]`).click();

    if (startDate !== undefined) {
        modal.get('input[id=":rh:"]').type(startDate);
    }
    if (endDate !== undefined) {
        modal.get('input[id=":rl:"]').type(endDate);
    }

    if (numAdults !== oldReservation.numAdults){
        if (numAdults > oldReservation.numAdults){
            for (let i = 0; i < numAdults - oldReservation.numAdults; i++) {
            modal.get('button[id="increaseNumAdultsEdit"').click();
        }
        } else {
            for (let i = 0; i < oldReservation.numAdults - numAdults; i++) {
                modal.get('button[id="decreaseNumAdultsEdit"').click();
            }
        }
    }

    if (numChildren !== oldReservation.numChildren){
        if (numChildren > oldReservation.numChildren){
            for (let i = 0; i < numChildren - oldReservation.numChildren; i++) {
                modal.get('button[id="increaseNumChildrenEdit"').click();
            }
        } else {
            for (let i = 0; i < oldReservation.numChildren - numChildren; i++) {
                modal.get('button[id="decreaseNumChildrenEdit"').click();
            }
        }
    }

    if (numPets !== oldReservation.numPets){
        if (numPets > oldReservation.numPets){
            for (let i = 0; i < numPets - oldReservation.numPets; i++) {
                modal.get('button[id="increaseNumPetsEdit"').click();
            }
        } else {
            for (let i = 0; i < oldReservation.numPets - numPets; i++) {
                modal.get('button[id="decreaseNumPetsEdit"').click();
            }
        }
    }
});