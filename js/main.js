
function updateInput(e) {
    const input = document.querySelector('#input');
    const output = document.querySelector("#output")

    let text = ""
    switch (e.target.id) {
        case "b0": text = "0"; break
        case "b1": text = "1"; break
        case "b2": text = "2"; break
        case "b3": text = "3"; break
        case "b4": text = "4"; break
        case "b5": text = "5"; break
        case "b6": text = "6"; break
        case "b7": text = "7"; break
        case "b8": text = "8"; break
        case "b9": text = "9"; break
        case "left-parenthesis": text = "("; break
        case "right-parenthesis": text = ")"; break
        case "percentage": text = "%"; break
        case "division": text = "/"; break
        case "times": text = "*"; break
        case "plus": text = "+"; break
        case "minus": text = "-"; break
        case "dot": text = "."; break
        case "equal": text = "="; break
        case "reset": clearInput(); break
    }
    input.textContent += text
    output.textContent += text
}

function clearInput() {
    const input = document.querySelector("#input")
    const output = document.querySelector("#output")
    input.textContent = ""
    output.textContent = ""
}

const container = document.querySelector(".container")
container.addEventListener("click", updateInput)
