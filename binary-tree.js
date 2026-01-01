let box = document.getElementById('tree-container') 
let numberInput = document.getElementById('node-input') 
let addBtn = document.getElementById('btn-insert') 
let findBtn = document.getElementById('btn-search') 
let deleteBtn = document.getElementById('btn-delete') 
let showBtn = document.getElementById('btn-traverse') 
let clearBtn = document.getElementById('btn-clear') 
let statusText = document.getElementById('status-message') 


class Bubble {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
        this.x = 0
        this.y = 0 

        this.id = 'node-' + Math.random().toString(36).slice(2, 11) 
    }
}

class TheTree {
    constructor() {
        this.root = null
    }

    async putIn(val) {

        if (this.root == null) {

            this.root = new Bubble(val) 
            this.render()
            await this.flash(this.root, 'found') 
            await wait(500)

            this.unflash(this.root, 'found') 
            return 
        }

        let current = this.root 
        
        while (true) {
            await this.flash(current, 'visiting')
            await wait(400) 
            this.unflash(current, 'visiting') 

            if (val < current.val) {

                if (current.left == null) {
                    current.left = new Bubble(val) 
                    this.render() 
                    await this.flash(current.left, 'found') 
                    await wait(500) 
                    this.unflash(current.left, 'found') 
                    break
                }
                current = current.left 

            } else if (val > current.val) {

                if (current.right == null) {
                    current.right = new Bubble(val) 
                    this.render() 
                    await this.flash(current.right, 'found') 
                    await wait(500) 
                    this.unflash(current.right, 'found') 
                    break
                }
                current = current.right 
            } else {
            
                statusText.innerText = "that number is already there" 
                await this.flash(current, 'highlight') 
                await wait(500) 
                this.unflash(current, 'highlight') 
                break 
            }
        }
    }

    async lookFor(val) {
        let current = this.root 
        let gotIt = false 

        while (current) {
            await this.flash(current, 'visiting') 
            await wait(400) 

            if (val === current.val) {
                gotIt = true 
                this.unflash(current, 'visiting') 
                await this.flash(current, 'found') 
                statusText.innerText = `Yay found ${val}!` 
                await wait(1000) 
                this.unflash(current, 'found') 
                break 
            } else if (val < current.val) {
                this.unflash(current, 'visiting') 
                current = current.left 
            } else {
                this.unflash(current, 'visiting') 
                current = current.right
            }
        }

        if (gotIt == false) {
            statusText.innerText = `${val} is not found.` 
        }
    }

    remove(val) {
        this.root = this.helperDelete(this.root, val) 
        this.render() 
    }

    helperDelete(node, val) {
        if (node == null) return null 

        if (val < node.val) {
            node.left = this.helperDelete(node.left, val) 
            return node 
        } else if (val > node.val) {
            node.right = this.helperDelete(node.right, val) 
            return node 
        } else {
            if (!node.left && !node.right) {
                return null 
            }

            if (!node.left) return node.right 
            if (!node.right) return node.left 

            let temp = this.findSmallest(node.right) 
            node.val = temp.val 
            node.right = this.helperDelete(node.right, temp.val) 
            return node 
        }
    }

    findSmallest(node) {
        while (node.left) node = node.left 
        return node 
    }

    render() {
        if (!this.root) {
            box.innerHTML = '' 
            return 
        }

        let w = box.clientWidth 
        this.doMath(this.root, w / 2, 40, w / 4) 
        
        this.drawIt() 
    }

    doMath(node, x, y, offset) {
        if (!node) return 
        node.x = x 
        node.y = y 

        this.doMath(node.left, x - offset, y + 60, offset / 2) 
        this.doMath(node.right, x + offset, y + 60, offset / 2) 
    }

    drawIt() {
        box.innerHTML = '' 

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg") 
        svg.id = "tree-svg" 
        box.appendChild(svg) 
        this.drawLines(this.root, svg) 

        this.drawBubbles(this.root) 
    }

    drawLines(node, svg) {
        if (!node) return 
        if (node.left) {
            this.makeLine(node, node.left, svg) 
            this.drawLines(node.left, svg) 
        }
        if (node.right) {
            this.makeLine(node, node.right, svg) 
            this.drawLines(node.right, svg) 
        }
    }

    makeLine(parent, kid, svg) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line") 
        line.setAttribute("x1", parent.x) 
        line.setAttribute("y1", parent.y) 
        line.setAttribute("x2", kid.x) 
        line.setAttribute("y2", kid.y) 
        line.classList.add("edge") 
        svg.appendChild(line) 
    }

    drawBubbles(node) {
        if (!node) return 

        let div = document.createElement('div') 
        div.className = 'tree-node'
        div.id = node.id
        div.innerText = node.val
        div.style.left = (node.x - 22.5) + 'px'
        div.style.top = (node.y - 22.5) + 'px'

        box.appendChild(div)

        this.drawBubbles(node.left) 
        this.drawBubbles(node.right) 
    }

    async flash(node, className) {
        let el = document.getElementById(node.id) 
        if (el) el.classList.add(className) 
    }

    unflash(node, className) {
        let el = document.getElementById(node.id) 
        if (el) el.classList.remove(className) 
    }
}

let myTree = new TheTree() 

async function startUp() {
    let starters = [50, 30, 70, 20, 40, 60, 80] 
    
    for (let num of starters) {

        if(!myTree.root) myTree.root = new Bubble(num) 

        else {
            let current = myTree.root 
            while(true) {
                if(num < current.val) {
                    if(!current.left) { 
                            current.left = new Bubble(num)
                            break
                        }

                    current = current.left
                } else {
                    if(!current.right) {
                        current.right = new Bubble(num)
                        break 
                    }
                    current = current.right
                }
            }
        }
    }
    myTree.render()
}
startUp()

addBtn.onclick = async () => {
    let val = parseInt(numberInput.value) 
    if (isNaN(val)) {
        alert("type a number first") 
        return 
    }
    statusText.innerText = `Adding ${val}...` 
    await myTree.putIn(val) 
    
    statusText.innerText = `Added ${val}`
    numberInput.value = '' 
} 

findBtn.onclick = async () => {
    let val = parseInt(numberInput.value) 
    if (isNaN(val)) return 
    statusText.innerText = `Looking for ${val}...` 
    await myTree.lookFor(val) 
} 

deleteBtn.onclick = () => {
    let val = parseInt(numberInput.value)

    if (isNaN(val)) return 
    statusText.innerText = `deleteing ${val}...` 
    myTree.remove(val) 
    statusText.innerText = `Deleted ${val}` 
    numberInput.value = '' 
} 

clearBtn.onclick = () => {
    myTree.root = null 
    myTree.render() 
    statusText.innerText = "Tree is gone" 
} 

showBtn.onclick = async () => {
    statusText.innerText = "Checking everything: " 
    
    const traverse = async (node) => {
        if (!node) return 
        await traverse(node.left) 

        await myTree.flash(node, 'visiting')
        statusText.innerText += `${node.val} - ` 
        await wait(500) 
        myTree.unflash(node, 'visiting') 

        await traverse(node.right) 
    } 

    await traverse(myTree.root)
    statusText.innerText += " (Done)" 
} 