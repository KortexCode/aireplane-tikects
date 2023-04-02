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
                            countries: (context, event) => event.data,
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
                    START: "search"
                }
            },
            search: {
                on: {
                    CONTINUE: {
                        target: "passenger",
                        actions: assign(
                            {
                                selectedCountry: (context, event) => {
                                    return event.selectedCountry
                                },
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
                    DONE: {
                        target: "tickets",
                        cond: 'moreThanOnePassenger'
                      },
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
                after: {
                    5000:{
                        target:"initial",
                        actions:"clearContext",
                    }
                },
                on:{
                    FINISH: {
                        target: "initial",
                        actions: "clearContext",
                    },
                }
            }
        } 
    },
    {
        actions:{
            cleanContext: assign(
                {
                    selectedCountry: (context, event) => {
                        console.log("dato que llega", event.selectedCountry)
                        return event.selectedCountry
                    },
                    passenger:(context, event) => event.newPassenger,  
                }
            ),
            clearContext: assign(
                {
                    selectedCountry: "",
                    passenger:[],  
                }
            )
        },
        guards: {
            moreThanOnePassenger: (context)=> {
                return context.passenger.length > 0;
            }
        }
    },
)

export {ticketMachine}