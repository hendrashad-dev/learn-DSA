let items = []

function startApp() {
    items = []
    setupButtons()
    drawStack()
}

function drawStack() {
    let box = document.getElementById('canvas-wrapper')
    if (!box) return

    box.innerHTML = ''
    let wrap = document.createElement('div')
    wrap.className = 'ds-container stack-container'

    items.forEach(x => {
        let one = document.createElement('div')
        one.className = 'ds-item'
        one.textContent = x
        wrap.appendChild(one)
    })

    box.appendChild(wrap)
}

function setupButtons() {
    let pushBtn = document.getElementById('btn-op1')
    let popBtn = document.getElementById('btn-op2')
    let clearBtn = document.getElementById('btn-clear')
    let inputBox = document.getElementById('ds-input')

    if (pushBtn) pushBtn.onclick = () => {
        let value = inputBox.value || Math.floor(Math.random() * 100)
        inputBox.value = ''

        if (items.length < 10) {
            items.push(value)
            drawStack()
        } else {
            alert("Stack Full")
        }
    }

    if (popBtn) popBtn.onclick = () => {
        if (items.length > 0) {
            items.pop()
            drawStack()
        } else {
            alert("Stack Empty")
        }
    }

    if (clearBtn) clearBtn.onclick = () => {
        items = []
        drawStack()
    }
}

document.addEventListener('DOMContentLoaded', startApp)

class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
        console.log(item + " pushed to stack");
    }

    pop() {
        if (this.items.length === 0) {
            console.log("Stack is empty");
            return;
        }

        return this.items.pop();
    }
    peek() {
        if (this.items.length === 0) {
            console.log("Stack is empty");
            return;
        }

        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    print() {
        console.log(this.items);
    }
}

writeCodeModal(Stack)