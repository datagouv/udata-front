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
                        'empty-heading': { enabled: false },
                        'scrollable-region-focusable': { enabled: false },
                    },
                },
            )
        })
    })
})