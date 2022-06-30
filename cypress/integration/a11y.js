it('should be accessible', () => {
    cy.task('sitemapLocations').then(pages => {
        pages.forEach(page => {
            cy.visit(page)
            cy.injectAxe()

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