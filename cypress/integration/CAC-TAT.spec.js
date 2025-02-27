/// <reference types="Cypress" />

const { should } = require("chai")
const { drop } = require("lodash")



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
     cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longTest = 'Teste de software é uma atividade que visa verificar se um programa funciona conforme o esperado e atende aos requisitos definidos. Existem vários tipos de teste de software, como caixa branca, caixa preta, caixa cinza, regressão, unidade e integração. Cada um deles tem um objetivo e uma forma de aplicação diferentes. O teste de software é importante para garantir a qualidade, a confiabilidade e a segurança do produto final. Além disso, o teste de software pode reduzir custos, prazos e riscos de falhas no software.'
        cy.get('#firstName').type('Nathalia')
        cy.get('#lastName').type('Dionizio')
        cy.get('#email').type('nathalia@testeex.com')
        cy.get('#open-text-area').type(longTest, {delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Nathalia')
        cy.get('#lastName').type('Dionizio')
        cy.get('#email').type('nathalia@testeex,com')
        cy.get('#open-text-area').type('teste!')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone')
        .type('abdc')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Nathalia')
        cy.get('#lastName').type('Dionizio')
        cy.get('#email').type('nathalia@testeex.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste!')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Nathalia').should('have.value', 'Nathalia').clear().should('have.value', '')
        cy.get('#lastName').type('Dionizio').should('have.value', 'Dionizio').clear().should('have.value', '')
        cy.get('#email').type('nathalia@testeex.com').should('have.value', 'nathalia@testeex.com').clear().should('have.value', '')
        cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
       cy.get('input[type="checkbox"]')
       .check()
       .should('be.checked')
       .last()
       .uncheck()
       .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json', {action: 'drag-drop'})
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
        })
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('a').should('have.attr','target','_blank') 
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('a')
    .invoke('removeAttr', 'target')
    .click()    
    cy.contains('Talking About Testing').should('be.visible')
  })

  it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  


  