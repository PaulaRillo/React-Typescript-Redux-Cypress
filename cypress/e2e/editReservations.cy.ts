import '@faker-js/faker';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { Reservation } from '../../src/types/reservation';

describe('reservation tests', () => {
  it('Should load home', () => {
    cy.visit('/');
  }),
    it('Should show no reservations', () => {
      cy.visit('/');
      cy.contains('My Reservations').click();

      const modal = cy.get('div[role="dialog"]');
      modal.should('be.visible').and('contain', 'No reservations found');
    }),
    it('Should list existing reservations', () => {
      const startDate = moment(faker.date.soon({ days: 10 }));
      const refDate = startDate.add(1, 'days').toDate();
      const endDate = moment(faker.date.soon({ days: 30, refDate: refDate }));
      const numAdults = faker.number.int({ min: 1, max: 10 });

      cy.visit('/');

      cy.createReservation(
        startDate.format('MM-DD-YYYY'),
        endDate.format('MM-DD-YYYY'),
        numAdults
      );

      cy.get('button[type="submit"]').click();
      cy.contains('My Reservations').click();
      cy.get(
        'div[class="MuiCardContent-root css-46bh2p-MuiCardContent-root"]'
      ).should('be.visible');
      cy.get(
        'p[class="MuiTypography-root MuiTypography-body2 css-1ma5aiy-MuiTypography-root"'
      ).should('be.visible');
    }),
    it('Should edit a reservation', () => {
      let startDate = moment(faker.date.soon({ days: 10 }));
      let refDate = startDate.add(1, 'days').toDate();
      let endDate = moment(faker.date.soon({ days: 30, refDate: refDate }));
      let numAdults = faker.number.int({ min: 1, max: 10 });

      cy.visit('/');

      cy.createReservation(
        startDate.format('MM-DD-YYYY'),
        endDate.format('MM-DD-YYYY'),
        numAdults
      );

      cy.get('button[type="submit"]').click();
      cy.contains('My Reservations').click();

      const getReservations = (win) => win.store.getState().reservations;

      cy.window()
        .then(getReservations)
        .then((reservationsStore: any) => {
          const reservation = reservationsStore.reservations[0];

          startDate = moment(faker.date.soon({ days: 10 }));
          refDate = startDate.add(1, 'days').toDate();
          endDate = moment(faker.date.soon({ days: 30, refDate: refDate }));
          numAdults = faker.number.int({ min: 1, max: 10 });

          cy.editReservation(
            reservation,
            startDate.format('MM-DD-YYYY'),
            endDate.format('MM-DD-YYYY'),
            numAdults
          );

          cy.contains('Change Reservation').click();

          cy.get(
            'div[class="MuiAlert-message css-1pxa9xg-MuiAlert-message"]'
          ).should('contain', 'Reservation changed successfully!');
        });
    });
    it('Should remove children from a reservation', () => {
      let startDate = moment(faker.date.soon({ days: 10 }));
      let refDate = startDate.add(1, 'days').toDate();
      let endDate = moment(faker.date.soon({ days: 30, refDate: refDate }));
      let numAdults = faker.number.int({ min: 1, max: 10 });
      let numChildren = faker.number.int({min: 1, max: 2 });

      cy.visit('/');

      cy.createReservation(
        startDate.format('MM-DD-YYYY'),
        endDate.format('MM-DD-YYYY'),
        numAdults,
        numChildren
      );

      cy.get('button[type="submit"]').click();
      cy.contains('My Reservations').click();

      const getReservations = (win) => win.store.getState().reservations;

      cy.window()
        .then(getReservations)
        .then((reservationsStore: any) => {
          const reservation = reservationsStore.reservations[0];

          startDate = moment(faker.date.soon({ days: 10 }));
          refDate = startDate.add(1, 'days').toDate();
          endDate = moment(faker.date.soon({ days: 30, refDate: refDate }));
          numAdults = faker.number.int({ min: 1, max: 10 });
          numChildren = 0;

          cy.editReservation(
            reservation,
            startDate.format('MM-DD-YYYY'),
            endDate.format('MM-DD-YYYY'),
            numAdults,
            numChildren
          );

          cy.contains('Change Reservation').click();

          cy.get(
            'div[class="MuiAlert-message css-1pxa9xg-MuiAlert-message"]'
          ).should('contain', 'Reservation changed successfully!');
        });
    }),
    it('Should remove pets from a reservation', () => {
      let startDate = moment(faker.date.soon({ days: 10 }));
      let refDate = startDate.add(1, 'days').toDate();
      let endDate = moment(faker.date.soon({ days: 30, refDate: refDate }));
      let numAdults = faker.number.int({ min: 1, max: 10 });
      let numPets = 1;

      cy.visit('/');

      cy.createReservation(
        startDate.format('MM-DD-YYYY'),
        endDate.format('MM-DD-YYYY'),
        numAdults,
        undefined,
        numPets
      );

      cy.get('button[type="submit"]').click();
      cy.contains('My Reservations').click();

      const getReservations = (win) => win.store.getState().reservations;

      cy.window()
        .then(getReservations)
        .then((reservationsStore: any) => {
          const reservation = reservationsStore.reservations[0];

          startDate = moment(faker.date.soon({ days: 10 }));
          refDate = startDate.add(1, 'days').toDate();
          endDate = moment(faker.date.soon({ days: 30, refDate: refDate }));
          numAdults = faker.number.int({ min: 1, max: 10 });

          cy.editReservation(
            reservation,
            startDate.format('MM-DD-YYYY'),
            endDate.format('MM-DD-YYYY'),
            numAdults,
            undefined,
            numPets
          );

          cy.contains('Change Reservation').click();

          cy.get(
            'div[class="MuiAlert-message css-1pxa9xg-MuiAlert-message"]'
          ).should('contain', 'Reservation changed successfully!');
        });
    })
});
