function startApp() {
    makeArray()
    let playButton = document.getElementById('btn-play')
    let resetButton = document.getElementById('btn-reset')

    if (playButton) playButton.onclick = runQuick
    if (resetButton) resetButton.onclick = () => {
        isSorting = false
        if (stopControl) stopControl.abort()
        makeArray()
    }
}

async function runQuick() {
    if (isSorting) return
    isSorting = true
    stopControl = new AbortController()
    let stopSignal = stopControl.signal

    try {
        await quickPart(currentArray, 0, currentArray.length - 1, stopSignal)
        drawArray([], [...Array(currentArray.length).keys()])
    } catch (err) {
        console.log("stopped")
    } finally {
        isSorting = false
    }
}

async function quickPart(list, left, right, stopSignal) {
    if (left < right) {
        if (stopSignal.aborted) return
        let middle = await split(list, left, right, stopSignal)

        await quickPart(list, left, middle - 1, stopSignal)
        await quickPart(list, middle + 1, right, stopSignal)
    }
}

async function split(list, left, right, stopSignal) {
    let speedInput = document.getElementById('speed-slider')
    let main = list[right]
    let small = left - 1

    for (let x = left; x <= right - 1; x++) {
        if (stopSignal.aborted) throw new Error("stop")

        drawArray([x, small + 1], [], right)
        let waitTime = 101 - (speedInput ? speedInput.value : 50)
        await wait(waitTime * 5)

        if (list[x] < main) {
            small++
            let temp = list[small]
            list[small] = list[x]
            list[x] = temp

            drawArray([x, small], [], right)
            await wait(waitTime * 5)
        }
    }

    let temp = list[small + 1]
    list[small + 1] = list[right]
    list[right] = temp

    drawArray([], [], small + 1)
    return small + 1
}

document.addEventListener('DOMContentLoaded', startApp)
