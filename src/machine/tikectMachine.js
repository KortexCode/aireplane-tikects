const { createMachine } = require("xstate");


const tikectMachine = createMachine(
    {
        id:"buy plane tikects",
        initial: "initial",
        state: {
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
            }
        }
    }
)

export {tikectMachine}