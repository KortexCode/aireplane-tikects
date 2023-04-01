const { createMachine, assign } = require("xstate");


const ticketMachine = createMachine(
    {
        predictableActionArguments: true,
        id:"buy plane tickets",
        initial: "initial",
        context: {
            passenger: [],
            selectedCountry: "",
        },
        states: {
            initial: {
                on: {
                    START: {
                        target: "search",
                        actions: "imprintInitial"
                    }
                }
            },
            search: {
                entry:"imprintEntry",
                exit:"imprintExit",
                on: {
                    CONTINUE: {
                        target: "passenger",
                        actions: assign(
                            {
                                selectedCountry: (context, event) => event.selectedCountry,
                            }
                        )
                    },
                    CANCEL: {
                        target: "initial",
                        actions: assign(
                            {
                                selectedCountry: (context, event) => event.selectedCountry,
                                passenger:(context, event) => event.newPassenger,

                            }
                        )
                    }
                }
            },
            passenger:{
                on: {
                    DONE: "tickets",
                    CANCEL: {
                        target: "initial",
                        actions: assign(
                            {
                                selectedCountry: (context, event) => event.selectedCountry,
                                passenger:(context, event) => event.newPassenger,

                            }
                        )
                    },
                    ADD: {
                        target: "passenger",
                        actions: assign(//Aquí especificamos que variable vamos a cambiar
                            (context, event) => context.passenger.push(event.newPassenger)
                        )
                    }
                }
            },
            tickets: {
                on:{
                    FINISH:"initial"
                }
            }
        } 
    },
    {
        actions:{
            imprintInitial: ()=> console.log("a bestia"),
            imprintEntry: ()=> console.log("Entrada!!"),
            imprintExit: ()=> console.log("Salida!"),
        },
    },
)

export {ticketMachine}