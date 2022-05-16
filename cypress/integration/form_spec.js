context('Window', () => {
  beforeEach(() => {
    cy.visit('https://zwsaile.github.io/shopify-challenge-summer/')
    cy.intercept('POST', 'https://api.openai.com/v1/engines/text-curie-001/completions?', {
      statusCode: 200,
      body: {
        id: 1,
        object: "text-completion",
        created: 1652302611,
        model: "text-curie:001",
        choices: [
          {
            text: `Once upon a time there was a clan of ninjas. They silently moved through the grass, stalking their enemies. Thier enemies were swift, but the were swifter. They defeated them stealthily and returned home with honor. The townspeople rewarded them with a ceremonial feast and they lived happily ever after.`,
            index: 0,
            logprobs: null,
            finish_reason: "length"
          }
        ]
      }
    })
  })

  it('should open on mac 13', () => {
    cy.viewport('macbook-13')
    cy.screenshot(
    cy.wait(200)
    )
  })

  it('should have a title of Bedtime With AI', () => {
    cy.title().should('include', 'Bedtime With AI')
  })

  it('should render a form on load', () => {
    cy.get('form')
      .contains('Entry Field')
    cy.get('button')
      .contains('Submit')
  })

  it('input should accept user text entry for prompt', () => {
    cy.get('input[type="text"]')
      .type('pirates')
      .should('have.value', 'pirates')
  })

  it('should not send a POST request and should not render a response to the page if no prompt is submitted', () => {
    cy.get('button').click()
    .get('p').should('not.exist')
  });

  it('should send a POST request and recieve a response once a prompt is submitted, rendering a response to the page', () => {
    cy.get('input[type="text"]').type('ninjas')
    .get('button').click()
    .get('p').should('contain', 'Once upon a time there was a clan of ninjas.')
  });

  it('should delete response element after clicking the trashcan button', () => {
    cy.get('input[type="text"]').type('ninjas')
    .get('button').click()
    .get('.card-delete').click()
    cy.get('.result-card').should('not.exist');
  });

})
