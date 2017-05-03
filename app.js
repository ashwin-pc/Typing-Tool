var typeTool = new TypingTool({
    container: "typeContainer"
});

var textEle = document.getElementById("textField");
var speedEle = document.getElementById("speedField");
var delayEle = document.getElementById("delayField");

document.getElementById("typeButton").addEventListener("click", function () {
    typeTool.type(textEle.value, {
        speed: parseInt(speedEle.value),
        delay: parseInt(delayEle.value)
    })
})

document.getElementById("eraseButton").addEventListener("click", function () {
    typeTool.erase(null, {
        speed: parseInt(speedEle.value),
        delay: parseInt(delayEle.value)
    })
})

document.getElementById("eraseTypeButton").addEventListener("click", function () {
    typeTool.eraseAndType(textEle.value, {
        speed: parseInt(speedEle.value),
        delay: parseInt(delayEle.value)
    })
})
