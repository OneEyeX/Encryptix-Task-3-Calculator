const resultToDisplay = document.querySelector(".screen span");
const buttons = document.querySelectorAll(".btn");

function evaluateExpression(expression) {
    try {
        const safeExpression = expression.replace(/[^-()\d/*+.]/g, '');
        return new Function(`return ${safeExpression}`)();
    } catch {
        throw new Error("Invalid expression");
    }
}

function handleButtonClick(buttonId) {
    switch (buttonId) {
        case "c":
            resultToDisplay.innerText = "";
            break;
        case "delete":
            resultToDisplay.innerText = resultToDisplay.innerText.slice(0, -1);
            break;
        case "=":
            if (resultToDisplay.innerText) {
                try {
                    resultToDisplay.innerText = evaluateExpression(resultToDisplay.innerText);
                } catch {
                    resultToDisplay.innerText = "Error";
                    setTimeout(() => (resultToDisplay.innerText = ''), 2000);
                }
            } else {
                resultToDisplay.innerText = 'Empty!';
                setTimeout(() => (resultToDisplay.innerText = ''), 2000);
            }
            break;
        default:
            resultToDisplay.innerText += buttonId;
            break;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.id));
});
