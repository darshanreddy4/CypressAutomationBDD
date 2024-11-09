import ytestingObj from "../pageobjects/ytesting.obj";


export default class ytesting {

   static Vistpage() {
        cy.log("I am on  " + global.env + " environment")
        cy.visit('https://www.youtube.com/').then(()=>{
            cy.log("I am on  Youtube Page")
            cy.get(ytestingObj.Search).type('new songs{enter}')

        })
       
        return true;
    }


}
// export default ytesting ;