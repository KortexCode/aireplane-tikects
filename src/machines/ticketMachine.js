import { fetchCountries } from "../utils/countryApi";

const { createMachine, assign } = require("xstate");

//children Machine
const fillCountries = {
    initial: "loading",
    states: {
        loading: {
            invoke: {
                id: "getCountries",
                src: ()=> fetchCountries,
                onDone:{
                    target: "success",
                    actions: assign(
                        {
                            countries: (context, event) => {console.log(event); return event.data},
                        }
                    )
                },
                onError: {
                    target: "failure",
                    actions: assign(
                        {
                            error: "Fallo el request",
                        }
                    )

                }

            }
        },
        success: {},
        failure: {
            on: {
                RETRY: {target: "loading"},
            },
        },
    },
}

const ticketMachine = createMachine(
    {
        predictableActionArguments: true,
        id:"buy plane tickets",
        initial: "initial",
        context: {
            passenger: [],
            selectedCountry: "",
            countries: [],
            error: "",
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
                        actions: "cleanContext",
                    }
                },
                ...fillCountries,
            },
            passenger:{
                on: {
                    DONE: "tickets",
                    CANCEL: {
                        target: "initial",
                        actions: "cleanContext",
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
                    FINISH: {
                        target: "initial",
                        actions: "clearContext",
                    }
                }
            }
        } 
    },
    {
        actions:{
            imprintInitial: ()=> console.log("a bestia"),
            imprintEntry: ()=> console.log("Entrada!!"),
            imprintExit: ()=> console.log("Salida!"),
            cleanContext: ()=>  assign(
                {
                    selectedCountry: (context, event) => event.selectedCountry,
                    passenger:(context, event) => event.newPassenger,  
                }
            ),
            clearContext: ()=>  assign(
                {
                    selectedCountry: "",
                    passenger:[],  
                }
            )
        },
    },
)

export {ticketMachine}