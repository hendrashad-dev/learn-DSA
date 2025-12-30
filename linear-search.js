let box = document.getElementById('array-container')
let inputBox = document.getElementById('target-input')
let searchBtn = document.getElementById('btn-search')
let resetBtn = document.getElementById('btn-reset')
let text = document.getElementById('status-message')

let numbers = []
let size = 15

function makeArray() {
    numbers = []
    let start = Math.floor(Math.random() * 10)

    for (let i = 0; i < size; i++) {
        start += Math.floor(Math.random() * 10) + 1
        numbers.push(start)
    }

    drawArray()
    text.textContent = 'Enter a number to search'
    clearStyle()
}

function drawArray() {
    box.innerHTML = ''

    numbers.forEach((num, i) => {
        let item = document.createElement('div')
        item.className = 'array-element'
        item.textContent = num
        item.id = 'idx-' + i
        box.appendChild(item)
    })
}

function clearStyle() {
    let all = document.querySelectorAll('.array-element')
    all.forEach(x => {
        x.className = 'array-element'
    })
}

async function runSearch(value) {
    clearStyle()
    text.textContent = 'Searching for ' + value

    for (let i = 0; i < numbers.length; i++) {
        let currentBox = document.getElementById('idx-' + i)

        document.querySelectorAll('.array-element').forEach((el, idx) => {
            if (idx !== i){
                 el.classList.add('dimmed')
            } else { 
                el.classList.remove('dimmed')
            }
        })

        currentBox.classList.add('active')
        await wait(1000)

        if (numbers[i] === value) {
            currentBox.classList.remove('active')
            currentBox.classList.add('found')
            text.textContent = 'Found ' + value + ' at index ' + i
            return
        }

        currentBox.classList.remove('active')
        await wait(500)
    }

    text.textContent = value + ' not found'
    document.querySelectorAll('.array-element').forEach(x =>
        x.classList.add('dimmed')
    )
}


function wait(time) {
    return new Promise(done => setTimeout(done, time))
}

searchBtn.onclick = () => {
    let value = parseInt(inputBox.value)
    if (isNaN(value)) {
        text.textContent = 'Enter a number'
        return
    }
    runSearch(value)
}

resetBtn.onclick = makeArray

makeArray()
