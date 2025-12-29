
let currentArray = []
let isSorting = false
let abortController = null

function wait(ms) {
    return new Promise(function (resolve) {

        setTimeout(function () {
            resolve()
        }, ms)
    })
}


function makeArray(size = 30) {
    currentArray = []
    for (let i = 0; i < size; i++) {
        currentArray.push(Math.floor(Math.random() * 80) + 10)
    }
    drawArray()
}

function drawArray(activeIndices = [], sortedIndices = [], pivotIndex = -1) {
    const canvasWrapper = document.getElementById('canvas-wrapper')
    if (!canvasWrapper) return

    canvasWrapper.innerHTML = ''
    canvasWrapper.className = ''

    currentArray.forEach((value, index) => {
        const bar = document.createElement('div')

        bar.className = 'bar'
        bar.style.height = `${value * 6}px`

        if (activeIndices.includes(index)) {
            bar.classList.add('active')
        }
        if (sortedIndices.includes(index)) {
            bar.classList.add('sorted')
        }

        if (index === pivotIndex) {
            bar.style.backgroundColor = '#ef4444'
        }

        canvasWrapper.appendChild(bar)
    })
}
