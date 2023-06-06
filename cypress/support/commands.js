Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const longTest = 'Teste de software é uma atividade que visa verificar se um programa funciona conforme o esperado e atende aos requisitos definidos. Existem vários tipos de teste de software, como caixa branca, caixa preta, caixa cinza, regressão, unidade e integração. Cada um deles tem um objetivo e uma forma de aplicação diferentes. O teste de software é importante para garantir a qualidade, a confiabilidade e a segurança do produto final. Além disso, o teste de software pode reduzir custos, prazos e riscos de falhas no software.'
        cy.get('#firstName').type('Nathalia')
        cy.get('#lastName').type('Dionizio')
        cy.get('#email').type('nathalia@testeex.com')
        cy.get('#open-text-area').type(longTest, {delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
})
