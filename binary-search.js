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
    let left = 0
    let right = numbers.length - 1

    clearStyle()
    text.textContent = 'Searching for ' + value

    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        let midBox = document.getElementById('idx-' + mid)

        for (let i = 0; i < numbers.length; i++) {
            let one = document.getElementById('idx-' + i)
            if (i < left || i > right) {
                one.classList.add('dimmed')
            } else {
                one.classList.remove('dimmed')
            }
        }

        midBox.classList.add('active')
        await wait(1000)

        if (numbers[mid] === value) {
            midBox.classList.remove('active')
            midBox.classList.add('found')
            text.textContent = 'Found ' + value + ' at index ' + mid
            return
        }

        if (numbers[mid] < value) {
            text.textContent = numbers[mid] + ' is smaller, go right'
            left = mid + 1
        } else {
            text.textContent = numbers[mid] + ' is bigger, go left'
            right = mid - 1
        }

        midBox.classList.remove('active')
        await wait(1000)
    }

    text.textContent = value + ' not found'
    document.querySelectorAll('.array-element').forEach(x => x.classList.add('dimmed'))
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
