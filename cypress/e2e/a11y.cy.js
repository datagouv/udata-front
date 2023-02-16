it('should be accessible', () => {
    cy.task('sitemapLocations').then(pages => {
        pages.forEach(page => {
            cy.intercept('**/api/**').as('request')
            cy.intercept('**/_themes/gouvfr/**').as('files')
            cy.visit(page)
            cy.injectAxe()
            cy.wait(['@request', '@files'])
            cy.checkA11y(
                {
                    /**
                     * This parameter is a array of query selectors that will be excluded from the accessibility check.
                     * It uses `markdown` class to avoid errors due to user generated content.
                     */
                    exclude: ['.markdown'],
                },
                {
                    /**
                     * This parameter is a dictionary of [Axe rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md) with custom configuration.
                     * It disables `color-contrast` due to an issue with this rule and `background-image` [3464](https://github.com/dequelabs/axe-core/issues/3464)
                     * that causes the rule to fail for all DSFR content with `:hover`.
                     */
                    rules: {
                        'color-contrast': { enabled: false },
                    },
                },
                (violations) => console.log(violations),
                true
            )
        })
    })
})
