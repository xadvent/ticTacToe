const playableArea = document.querySelector('.grid-container')

const squares = (function () {
    let squares = []
    for (let i = 1; i <= 9; i++) {
        const tile = document.createElement('button')
        tile.classList.add(`tile`)
        tile.classList.add(`${i}`)
        squares.push(i)
        playableArea.appendChild(tile)
    }
    const allButtons = document.querySelectorAll('.tile')
    return { allButtons }
})()
// Makes the Grid

const counter = function () {
    let _count = 1;

    const check = () => {
        return _count % 2 === 0
    }

    const addOne = () => _count++

    const symbol = () => {

    }

    return {
        addOne,
        check
    }
}

// turnChooser should select what element is going to be placed
const addEvents = function () {
    const test = counter()

    const alternate = function () {
        let thing = test.check()
        if (Array.from(this.classList).includes('X') || Array.from(this.classList).includes('O')) return
        thing ? this.classList.add('O') : this.classList.add('X')
        test.addOne()
        return
    }

    const addEventListen = (function () {
        const { allButtons } = squares
        allButtons.forEach(button => button.addEventListener('click', alternate))
    })()

    return {
        alternate
    }
}; addEvents()

const Player = function (marker) {
    const { check } = counter()
    const placeMarker = function () {

    }

    return {
        placeMarker
    }
}




/*
2. Decide who goes first
    Put person functions inside 
3. add event listeners depending on the counter
4. Add markder to corresponding div
5. Change event listener
6. Write down potential winning lines
7. Check for win on each turn
*/