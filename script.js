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

const placeMarkers = (function () {

    const counter = function () {
        let _count = 1;
        const check = () => {
            return _count % 2 === 0
        }
        const addOne = () => _count++

        return {
            addOne,
            check
        }
    }

    let won = false

    const checkWin = function (marker) {
        if (won === true) return

        const getMarkerList = (function () {
            const markerList = document.querySelectorAll(`.${marker}`)
            const selectedTiles = []
            markerList.forEach(mark => {
                const classMark = mark.classList.value.split(' ')[1]
                selectedTiles.push(+classMark)
            });
            return { selectedTiles }
        })(); const selectedTiles = getMarkerList.selectedTiles.sort()

        const winning = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

        console.log(selectedTiles)

        winning.forEach(set => {
            if (set.every(r => selectedTiles.includes(r))) {
                console.log(marker + ' Wins')
                return won = true
            }
        })
        // WHEN THERE'S A TIE
        if (won === false && document.querySelectorAll('.X').length + document.querySelectorAll('.O').length === 9) return console.log('tie')
    };

    // turnChooser should select what element is going to be placed
    const addEvents = (function () {
        const test = counter()

        const alternate = function () {
            if (won === true) return
            let thing = test.check()
            if (Array.from(this.classList).includes('X') || Array.from(this.classList).includes('O')) return
            thing ? this.classList.add('O') : this.classList.add('X')
            test.addOne()

            checkWin(thing ? 'O' : 'X')
            return
        }

        const addEventListen = (function () {
            const { allButtons } = squares
            allButtons.forEach(button => button.addEventListener('click', alternate))
        })()

    })()

})()


/*
6. Write down potential winning lines
7. Check for win on each turn
8. Add a restart button
9. Create an option to select player or Bot
*/