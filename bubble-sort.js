function startApp() {
    makeArray()
    let playButton = document.getElementById('btn-play')
    let resetButton = document.getElementById('btn-reset')

    if (playButton) playButton.onclick = runSort
    
    if (resetButton) resetButton.onclick = () => {
        isSorting = false
        if (stopControl) stopControl.abort()
        makeArray()
    }
}

async function runSort() {
    if (isSorting) return

    isSorting = true
    stopControl = new AbortController()

    let stopSignal = stopControl.signal
    let speedInput = document.getElementById('speed-slider')

    let size = currentArray.length
    let done = []

    try {
        for (let a = 0; a < size - 1; a++) {
            for (let b = 0; b < size - a - 1; b++) {
                if (stopSignal.aborted) return

                drawArray([b, b + 1], done)
                let waitTime = 101 - (speedInput ? speedInput.value : 50)
                await wait(waitTime * 5)

                if (currentArray[b] > currentArray[b + 1]) {
                    let box = currentArray[b]
                    currentArray[b] = currentArray[b + 1]
                    currentArray[b + 1] = box

                    drawArray([b, b + 1], done)
                    await wait(waitTime * 5)
                }
            }
            done.push(size - a - 1)
        }
        done.push(0)
        drawArray([], [...Array(size).keys()])
    } catch (err) {
        console.log("stopped", err)
    } finally {
        isSorting = false
    }
}

document.addEventListener('DOMContentLoaded', startApp)
