const { createMachine } = require("xstate");


const tikectMachine = createMachine(
    {
        id:"buy plane tikects",
        initial: "initial",
        states: {
            initial: {
                on: {
                    START: "search",
                }
            },
            search: {
                on: {
                    CONTINUE: "passenger",
                    CANCEL: "initial"
                }
            },
            passenger:{
                on: {
                    DONE: "tikects",
                    CANCEL: "initial"
                }
            },
            tikects: {
                on:{
                    FINISH:"initial"
                }
            }
        }
    }
)

export {tikectMachine}