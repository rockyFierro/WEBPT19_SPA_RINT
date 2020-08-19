/*global cy*/
describe("Testing our form inputs", ()=>{
		beforeEach( ()=>{
			cy.visit("http://localhost:3000/pizza");
		});
		
		it("add text to info, and submit", ()=>{
			cy.get('[data-cy=name]').type("Rocky").should("have.value", "Rocky");
			cy.get('[data-cy=instructions]').type("Please leave at door and stay a minimum of 6 ft away.").should("have.value","Please leave at door and stay a minimum of 6 ft away.");
			cy.get('[data-cy=mushrooms]').check().should("be.checked");
			cy.get('[data-cy=sundriedTomatoes]').check().should("be.checked");
			cy.get('[data-cy=pepperoni]').check().should("be.checked");
			cy.get('[data-cy=size]').select("medium");
			cy.get('[data-cy=submit]').click();
		});
	});