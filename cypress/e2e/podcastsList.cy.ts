describe('podcasts list', () => {  

    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.clear();
        })
        cy.intercept('GET', 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json', {fixture: 'all-podcasts.json'});
        cy.visit('/');
    })

    it('should render header', () => {
        cy.get('#header').should('contain.text', 'Podcaster');
    });

    it('should render podcasts list', () => {
        cy.get('#podcast-list #podcast-item').should('have.length', 3);
    });
  
    it('should filter podcasts', () => {
        cy.get('#results-number').should('contain.text', 3);
        cy.get('#podcast-filter').type('the joe budden');
        cy.get('#results-number').should('have.length', 1);
        cy.get('#podcast-title').should('contain.text', 'The Joe');
        cy.get('#podcast-author').should('contain.text', 'The Joe');
        cy.get('#podcast-image').should('exist');
    });
  });