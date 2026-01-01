let items = []

function startApp() {
    items = []
    setupButtons()
    drawQueue()
}

function drawQueue() {
    let box = document.getElementById('canvas-wrapper')
    if (!box) return

    box.innerHTML = ''
    let wrap = document.createElement('div')
    wrap.className = 'ds-container queue-container'

    items.forEach(x => {
        let one = document.createElement('div')
        one.className = 'ds-item'
        one.textContent = x
        wrap.appendChild(one)
    })

    box.appendChild(wrap)
}

function setupButtons() {
    let addBtn = document.getElementById('btn-op1')
    let removeBtn = document.getElementById('btn-op2')
    let clearBtn = document.getElementById('btn-clear')
    let inputBox = document.getElementById('ds-input')

    if (addBtn) addBtn.onclick = () => {
        let value = inputBox.value || Math.floor(Math.random() * 100)
        inputBox.value = ''

        if (items.length < 10) {
            items.push(value)
            drawQueue()
        } else {
            alert("Queue Full")
        }
    }

    if (removeBtn) removeBtn.onclick = () => {
        if (items.length > 0) {
            items.shift()
            drawQueue() 
        } else {
            alert("Queue Empty")
        }
    }

    if (clearBtn) clearBtn.onclick = () => {
        items = []
        drawQueue()
    }
}

document.addEventListener('DOMContentLoaded', startApp)

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
        console.log(item + " added to queue");
    }

    dequeue() {
        if (this.items.length === 0) {
            console.log("Queue is empty");
            return;
        }

        return this.items.shift();
    }

    peek() {
        if (this.items.length === 0) {
            console.log("Queue is empty");
            return;
        }

        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    print() {
        console.log(this.items);
    }
}

writeCodeModal(Queue)