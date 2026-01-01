
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


function writeCodeModal(fullCode) {
    let modal = document.getElementById('code-modal')
    let showMorebtn = document.getElementById('btn-show-more')
    let btnCloseModal = document.getElementById('btn-close-modal')
    let modalCodeDisplay = document.getElementById('modal-code-display')

    let codeString = fullCode.toString()
    codeString = codeString
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")

    const placeholders = [];
    const addPlaceholder = (content, type) => {
        const id = `___PLACEHOLDER_${placeholders.length}___`
        placeholders.push({ id, content, type })
        return id
    }

    codeString = codeString.replace(/('.*?'|".*?"|`[\s\S]*?`)/g, (match) => addPlaceholder(match, 'string'))

    codeString = codeString.replace(/(\/\/.*)/g, (match) => addPlaceholder(match, 'comment'))
    codeString = codeString.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => addPlaceholder(match, 'comment'))
    codeString = codeString.replace(/\b(class|constructor|function|async|await|return|if|else|while|for|let|const|var|this|new|throw|try|catch|finally)\b/g, '<span class="keyword">$1</span>')
    codeString = codeString.replace(/\b(true|false|null|undefined)\b/g, '<span class="keyword">$1</span>')
    codeString = codeString.replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
    codeString = codeString.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, '<span class="function">$1</span>')

    placeholders.forEach(({ id, content, type }) => {
        codeString = codeString.replace(id, () => `<span class="${type}">${content}</span>`)
    });

    showMorebtn.addEventListener('click', () => {
        modalCodeDisplay.innerHTML = codeString
        modal.classList.add('active')
    })

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            modal.classList.remove('active')
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active')
            }
        });
    }


}