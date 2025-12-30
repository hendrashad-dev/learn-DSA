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
