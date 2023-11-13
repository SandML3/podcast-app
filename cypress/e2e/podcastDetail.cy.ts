describe('podcast detail e2e test', () => {  

    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.clear();
        })
        cy.intercept('GET', 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json', {fixture: 'all-podcasts.json'});

        cy.intercept('GET', 'https://itunes.apple.com/lookup?id=1535809341&media=podcast&entity=podcastEpisode&limit=100', {fixture: 'podcast-episodes.json'});
        
        cy.visit('/');
        cy.get('#podcast-list > :nth-child(1)').click();
        cy.url().should('include', '/podcast/1535809341');
    })

    it('should render header', () => {
        cy.get('#header').should('contain.text', 'Podcaster');
    });

    it('should redirect to the podcasts list component when header is clicked on', () => {
        cy.get('#header').click()
        cy.url().should('include', 'http://localhost:3000');
    });

    it('should render podcasts information card', () => {
        cy.get('#podcast-info').should('exist');
        cy.get('#podcast-image').should('have.attr', 'alt').and('include', 'The Joe');
        cy.get('#podcast-author').should('contain.text', 'The Joe');
        cy.get('#podcast-description').should('contain.text', 'Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends.');
    });

    it('should redirect to the podcasts list component when podcast author is clicked on', () => {
        cy.get('#podcast-author').click()
        cy.url().should('include', 'http://localhost:3000');
    });

    it('should redirect to the podcasts list component when podcast title is clicked on', () => {
        cy.get('#podcast-title').click()
        cy.url().should('include', 'http://localhost:3000');
    });
  
    it('should render podcast episodes list', () => {
        cy.get('#episodes-number').should('contain.text', 'Episodes: 3');
        cy.get('#episodes-list').should('exist');
        cy.get('#episodes-list tbody tr').and('have.length', 4);
        cy.get(':nth-child(2) > [data-testid="episode-name"]').should('contain.text', 'Episode 674 | "Refer to The Tag');
        cy.get(':nth-child(2) > [data-testid="episode-date"]').should('contain.text', '11/11/2023');
        cy.get(':nth-child(2) > [data-testid="episode-duration"]').should('contain.text', '03:02:39');
    });

    it('should redirect to the episode details component when any episode is clicked on', () => {
        cy.get(':nth-child(2) > [data-testid="episode-name"]').click();
        cy.url().should('include', '/podcast/1535809341/episode/1000634453100');
    });
  });