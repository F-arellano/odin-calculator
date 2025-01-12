idValues = {
    "b0": "0",
    "b1": "1",
    "b2": "2",
    "b3": "3",
    "b4": "4",
    "b5": "5",
    "b6": "6",
    "b7": "7",
    "b8": "8",
    "b9": "9",
    "times": "*",
    "division": "/",
    "plus": "+",
    "minus": "-",
    "undo": "C",
    "reset": "R",
    "left-parenthesis": ")",
    "right-parenthesis": "(",
    "equal": "=",
    "dot": "."
}


function updateInput(e) {
    const input = document.querySelector('#input');
    const output = document.querySelector("#output")

    const char = idValues[e.target.id]

    handleDigits(char) 
    handleOperators(char)
    handleReset(char)
    handleEqual(char)
    console.log("update!")
}

function handleDigits(char) {
    // check if is digit. automatically try to convert char to number
    if (!(char > -1)) return 

    const input = document.querySelector("#input")
    input.textContent += char
}

function handleOperators(char) {
    if (!isOperator(char)) return 

    const input = document.querySelector("#input")
    const lastChar = input.textContent.slice(-1)

    if (isOperator(lastChar)) {
        input.textContent = input.textContent.slice(0, -1)
    }

    input.textContent += char
}

function handleReset(char) {
    if (char !== "R") return

    const input = document.querySelector("#input")
    const output = document.querySelector("#output")
    input.textContent = ""
    output.textContent = ""
}

function handleEqual(char) {
    if (char !== "=") return 

    const output = document.querySelector("#output")
    const input = document.querySelector("#input")
    const formula = input.textContent

    // get an array with all numbers and another with all operations
    let numbers = formula.split( /[*\/+-]/ )
    numbers = numbers.map(item => Number(item))

    let operators = formula.split( /[0-9]/ )
    operators = operators.filter(item => item !== "")

    // solving using PAPOMUDAS
    while (operators.includes("*") || operators.includes("/")) {
        // get operator index
        const i = operators.findIndex(item => item == "*" || item == "/")
        let result

        if (operators[i] == "*") {
            result = numbers[i] * numbers[i+1]
        } else if (operators[i] == "/") {
            result = numbers[i] / numbers[i+1]
        }

        // update arrays
        numbers.splice(i, 1)
        numbers[i] = result 
        operators.splice(i, 1)
    }

    output.textContent = numbers[0]
}

function isOperator(char) {
    if (
        char === "+" ||
        char === "-" ||
        char === "/" ||
        char === "*" ||
        char === "%"
    ) {
        return true
    }
    return false
}

const container = document.querySelector(".container")
container.addEventListener("click", updateInput)
