it('should be accessible', () => {
    cy.task('sitemapLocations').then(pages => {
        pages.forEach(page => {
            cy.intercept('**/api/**').as('request')
            cy.visit(page)
            cy.injectAxe()
            cy.wait(['@request'])
            cy.checkA11y(
                {
                    exclude: ['.markdown'],
                },
                {
                    rules: {
                        'color-contrast': { enabled: false },
                    },
                },
            )
        })
    })
})