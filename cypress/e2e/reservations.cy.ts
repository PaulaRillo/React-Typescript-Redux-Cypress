import '@faker-js/faker';
import { faker } from '@faker-js/faker';
import moment from 'moment';

describe('reservation tests', () => {
  it('should load home', () => {
    cy.visit('/')
  }),
  it('should create a reservation without children or pets', () => {
    const startDate = moment(faker.date.soon({days: 10}));
    const refDate = startDate.add(1, 'days').toDate();
    const endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    const numAdults = faker.number.int({min: 1, max: 10});

    cy.visit('/');
    
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults);

    cy.get('input[name=numAdults]').should('have.value', numAdults.toString());
    cy.get('.css-1y2o76f-MuiTypography-root').should('be.visible');
    
    cy.get('button[type="submit"]').click();
  }),
  it('should create a reservation with children', () => {
    const startDate = moment(faker.date.soon({days: 10}));
    const refDate = startDate.add(1, 'days').toDate();
    const endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    const numAdults = faker.number.int({min: 1, max: 10});
    const numChildren = faker.number.int({min: 1, max: 2});

    cy.visit('/');
    
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults, numChildren);

    cy.get('input[name=numAdults]').should('have.value', numAdults.toString());
    cy.get('input[name=numChildren]').should('have.value', numChildren.toString());
    cy.get('.css-1y2o76f-MuiTypography-root').should('be.visible');
    
    cy.get('button[type="submit"]').click();
  }),
  it('should create a reservation with pets', () => {
    const startDate = moment(faker.date.soon({days: 10}));
    const refDate = startDate.add(1, 'days').toDate();
    const endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    const numAdults = faker.number.int({min: 1, max: 10});
    const numPets = faker.number.int({min: 1, max: 1});

    cy.visit('/');
    
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults, undefined, numPets);

    cy.get('input[name=numAdults]').should('have.value', numAdults.toString());
    cy.get('input[name=numPets]').should('have.value', numPets.toString());
    cy.get('.css-1y2o76f-MuiTypography-root').should('be.visible');
    
    cy.get('button[type="submit"]').click();
  }),
  it('should create a reservation with children and pets', () => {
    const startDate = moment(faker.date.soon({days: 10}));
    const refDate = startDate.add(1, 'days').toDate();
    const endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    const numAdults = faker.number.int({min: 1, max: 10});
    const numChildren = faker.number.int({min: 1, max: 2});
    const numPets = faker.number.int({min: 1, max: 1});

    cy.visit('/');
    
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults, numChildren, numPets);

    cy.get('input[name=numAdults]').should('have.value', numAdults.toString());
    cy.get('input[name=numPets]').should('have.value', numPets);
    cy.get('input[name=numChildren]').should('have.value', numChildren.toString());
    cy.get('.css-1y2o76f-MuiTypography-root').should('be.visible');
    
    cy.get('button[type="submit"]').click();
  }),
  it('Should not create a reservation with more than two children', () => {
    const startDate = moment(faker.date.soon({days: 10}));
    const refDate = startDate.add(1, 'days').toDate();
    const endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    const numAdults = faker.number.int({min: 1, max: 10});
    const numChildren = faker.number.int({min: 3, max: 10});

    cy.visit('/');
    
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults, numChildren);

    cy.get('input[name=numAdults]').should('have.value', numAdults.toString());
    cy.get('input[name=numChildren]').should('have.value', numChildren.toString());
    cy.get('.css-1y2o76f-MuiTypography-root').should('be.visible');
    
    cy.get('button[type="submit"]').click();
    
    const childrenErrorMessage = cy.get('span[class="MuiTypography-root MuiTypography-caption css-1dw07t9-MuiTypography-root"');
    childrenErrorMessage.should('be.visible');
    childrenErrorMessage.should('have.text', 'This property only accepts 2 childrens or lower');
  }),
  it('Should not create a reservation with more than one pet', () => {
    const startDate = moment(faker.date.soon({days: 10}));
    const refDate = startDate.add(1, 'days').toDate();
    const endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    const numAdults = faker.number.int({min: 1, max: 10});
    const numPets = faker.number.int({min: 3, max: 10});

    cy.visit('/');
    
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults, undefined, numPets);

    cy.get('input[name=numAdults]').should('have.value', numAdults.toString());
    cy.get('input[name=numPets]').should('have.value', numPets.toString());

    cy.get('.css-1y2o76f-MuiTypography-root').should('be.visible');
    
    cy.get('button[type="submit"]').click();
    
    const petsErrorMessage = cy.get('span[class="MuiTypography-root MuiTypography-caption css-1dw07t9-MuiTypography-root"');
    petsErrorMessage.should('be.visible');
    petsErrorMessage.should('have.text', 'This property only accepts 1 pet');
  }),
  it('Should not create a reservation with overlapping dates', () => {
    let startDate = moment(faker.date.soon({days: 10}));
    let refDate = startDate.add(1, 'days').toDate();
    let endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    let numAdults = faker.number.int({min: 1, max: 10});

    cy.visit('/');
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults);
    cy.get('button[type="submit"]').click();

    startDate = moment(faker.date.soon({days: 10}));
    refDate = startDate.add(1, 'days').toDate();
    endDate = moment(endDate).add(1, 'days');
    numAdults = faker.number.int({min: 1, max: 10});
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults);
    cy.get('button[type="submit"]').click();

    cy.get('div[class="MuiAlert-message css-1pxa9xg-MuiAlert-message"]').should('be.visible')
    .and('have.text', 'Reservation overlaps with existing reservation.');
  }),
  it('Should not create a reservation with past dates', () => {
    const startDate = moment(faker.date.past());
    let refDate = startDate.add(1, 'days').toDate();
    let endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    let numAdults = faker.number.int({min: 1, max: 10});

    cy.visit('/');
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), numAdults);
    cy.get('button[type="submit"]').click();

    cy.get('div[class="MuiAlert-message css-1pxa9xg-MuiAlert-message"]').should('be.visible')
    .and('have.text', 'Reservation cannot be in the past.');
  }),
  it('Should not create a reservation without end date', () => {
    const startDate = moment(faker.date.past());
    let refDate = startDate.add(1, 'days').toDate();
    let numAdults = faker.number.int({min: 1, max: 10});
    
    cy.visit('/');
    cy.createReservation(startDate.format('MM-DD-YYYY'), undefined, numAdults);
    cy.get('button[type="submit"]').click();

    cy.get('span[class="MuiTypography-root MuiTypography-caption css-1dw07t9-MuiTypography-root"]').should('be.visible')
    .and('have.text', 'End date is required');
  }),
  it('Should not be able to create a reservation without start date', () => {
    const endDate = moment(faker.date.soon({days: 30}));
    let numAdults = faker.number.int({min: 1, max: 10});
    
    cy.visit('/');
    cy.createReservation(undefined, endDate.format('MM-DD-YYYY'), numAdults);
    cy.get('button[type="submit"]').click();

    cy.get('span[class="MuiTypography-root MuiTypography-caption css-1dw07t9-MuiTypography-root"]').should('be.visible')
    .and('have.text', 'Start date is required');
  }),
  it('Should not create a reservation without adults', () => {
    const startDate = moment(faker.date.soon({days: 10}));
    let refDate = startDate.add(1, 'days').toDate();
    const endDate = moment(faker.date.soon({days: 30, refDate: refDate}));
    
    cy.visit('/');
    cy.createReservation(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), undefined);

    cy.get('input[name="numAdults"]').should('have.value', 1);
    cy.get('button[id="decreaseNumAdults"').should('be.disabled')
  })
  it('Should not create an empty reservation', () => {
    cy.visit('/');
    cy.get('button[type="submit"]').click();

    cy.get('span[class="MuiTypography-root MuiTypography-caption css-1dw07t9-MuiTypography-root"]').should('be.visible')
    .and('have.text', 'Start date is requiredEnd date is required');
  })
})