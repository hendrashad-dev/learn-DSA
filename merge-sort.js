function startApp() {
    makeArray()
    let playButton = document.getElementById('btn-play')
    let resetButton = document.getElementById('btn-reset')


    if (playButton) playButton.onclick = runMerge

    if (resetButton) resetButton.onclick = () => {
        isSorting = false
        if (stopControl) stopControl.abort()
            if (stop)
        makeArray()
    }
}

async function runMerge() {
    if (isSorting) return
    isSorting = true
    stopControl = new AbortController()
    let stopSignal = stopControl.signal

    try {
        await mergePart(currentArray, 0, currentArray.length - 1, stopSignal)
        drawArray([], [...Array(currentArray.length).keys()])
        
    } catch (err) {
        console.log("stopped")
    } finally {
        isSorting = false
    }
}

async function mergePart(list, left, right, stopSignal) {
    if (left >= right) return
    if (stopSignal.aborted) return

    let mid = Math.floor((left + right) / 2)

    await mergePart(list, left, mid, stopSignal)
    await mergePart(list, mid + 1, right, stopSignal)

    await mergeLists(list, left, mid, right, stopSignal)
}

async function mergeLists(list, left, mid, right, stopSignal) {
    let speedInput = document.getElementById('speed-slider')

    let leftList = []
    let rightList = []

    for (let a = left; a <= mid; a++) leftList.push(list[a])
    for (let b = mid + 1; b <= right; b++) rightList.push(list[b])

    let i = 0
    let j = 0
    let k = left

    while (i < leftList.length && j < rightList.length) {

        if (stopSignal.aborted) throw new Error("stop")
        
        drawArray([k], [], mid)
        let waitTime = 101 - (speedInput ? speedInput.value : 50)
        await wait(waitTime * 5)

        if (leftList[i] <= rightList[j]) {

            list[k] = leftList[i]
            i++
        } else {
            list[k] = rightList[j]
            j++
        }
        k++
    }

    while (i < leftList.length) {
        if (stopSignal.aborted) throw new Error("stop")
        list[k] = leftList[i]
        i++
        k++

        drawArray([k - 1], [], mid)
        let waitTime = 101 - (speedInput ? speedInput.value : 50)
        await wait(waitTime * 5)
    }

    while (j < rightList.length) {
        if (stopSignal.aborted) throw new Error("stop")
        list[k] = rightList[j]
        j++
        k++

        drawArray([k - 1], [], mid)
        let waitTime = 101 - (speedInput ? speedInput.value : 50)
        await wait(waitTime * 5)
    }
}

document.addEventListener('DOMContentLoaded', startApp)
