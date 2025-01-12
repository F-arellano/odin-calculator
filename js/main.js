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
    "left-parenthesis": "(",
    "right-parenthesis": ")",
    "equal": "=",
    "dot": "."
}


function updateInput(e) {
    const input = document.querySelector('#input');
    const output = document.querySelector("#output")

    const char = idValues[e.target.id]

    handleDigits(char) 
    handleDot(char)
    handleParentheses(char)
    handleOperators(char)
    handleReset(char)
    handleUndo(char)
    handleEqual(char)
}

function handleDigits(char) {
    // check if is digit. automatically try to convert char to number
    if (!(char > -1)) return 

    const input = document.querySelector("#input")
    input.textContent += char
}

function handleDot(char) {
    if (char != ".") return 

    const input = document.querySelector("#input")
    const formula = input.textContent
    const numbers = formula.split( /[*\/+-]/ )

    let lastNumber = numbers[numbers.length - 1]

    // if number already has a dot, we cant put another
    if (lastNumber.includes(".")) return

    // add dot
    input.textContent += "."
}

function handleParentheses (char) {
    if (char !== "(" && char !== ")") return

    const input = document.querySelector("#input")
    if (char == "(") {
        input.textContent += "("
        return
    }
    // count number of right and left parentheses
    
    let counter = 0
    for (let char of input.textContent) {
        if (char == "(") {
            counter++
        } else if (char == ")") {
            counter--
            if (counter < 0) return 
        }
    } 
    if (counter > 0) {
        input.textContent += ")"
    }
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

function handleUndo(char) {
    if (char != "C") return 

    const input = document.querySelector("#input")
    input.textContent = input.textContent.slice(0, -1)
}

function handleEqual(char) {
    if (char !== "=") return 

    const output = document.querySelector("#output")
    const input = document.querySelector("#input")
    let formula = input.textContent

    // we need to reduce parenthesis from inside to outside
    while (formula.includes(")")) {
        const i_right = formula.indexOf(")")

        const trimmed_formula = formula.slice(0, i_right)
        const i_left = trimmed_formula.lastIndexOf("(")

        const inside_formula = formula.slice(i_left + 1, i_right)
        formula = formula.slice(0, i_left) + solveOperation(inside_formula) + formula.slice(i_right + 1)
    }

    output.textContent = solveOperation(formula)
}

function solveOperation (formula) {
    // get an array with all numbers and another with all operations
    let numbers = formula.split( /[*\/+]/ )
    let operators = formula.split( /[0-9.-]/ )

    operators = operators.filter(item => item !== "")



    for (let i=0; i < numbers.length; i++) {
        if (numbers[i].includes("-") && numbers[i].lastIndexOf("-") != 0) {
            const index = numbers[i].lastIndexOf("-")
            const arr = [numbers[i].slice(0, index), numbers[i].slice(index+1)]
            numbers = numbers.slice(0, i).concat(arr, numbers.slice(i+1))
            operators = operators.slice(0, i).concat(["-"], operators.slice(i+1)) 
        }
    }
    numbers = numbers.map(item => Number(item))
    console.log(numbers)

    // solving using PAPOMUDAS
    // multiplication and division
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

    // adition and substraction
    while (operators.includes("+") || operators.includes("-")) {
        // get operator index
        const i = operators.findIndex(item => item == "+" || item == "-")
        let result

        if (operators[i] == "+") {
            result = numbers[i] + numbers[i+1]
        } else if (operators[i] == "-") {
            result = numbers[i] - numbers[i+1]
        }

        // update arrays
        numbers.splice(i, 1)
        numbers[i] = result 
        operators.splice(i, 1)
    }

    let finalResult = numbers[0].toString()

    if (finalResult.length > 16) {
        finalResult = finalResult.slice(0, 16)
    }

    return finalResult
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
