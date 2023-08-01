const playableArea = document.querySelector('.grid-container')
const startModal = document.querySelector('#start-modal')
const startButton = document.querySelector('#start-button')
const createStyleAfter = document.createElement('style')

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

const pickNames = function (event) {
    event.preventDefault();

    console.log(event.target)
    startModal.classList.add('hidden')
    playableArea.classList.remove('hidden')
    const myFormData = new FormData(document.querySelector('#startForm'));
    const myFormObj = {}
    myFormData.forEach((value, key) => myFormObj[key] = value)

    const playerOne = Player(myFormObj.p1, myFormObj.s1)
    const playerTwo = Player(myFormObj.p2, myFormObj.s2)
    console.log(playerOne)

    playGame(playerOne, playerTwo)
    return
}

let decider = 0;
// Going to store user Info     TO DO 
const Player = function (name, symbol) {
    const title = name ? name[0].toUpperCase() + name.substr(1).toLowerCase() : decider === 0 ? 'X' : 'O'
    const marker = symbol ? symbol[0].toUpperCase() : decider === 0 ? 'X' : 'O'
    decider++

    return {
        title,
        marker
    }
}
startButton.addEventListener('click', pickNames)

const playGame = function (playerOne, playerTwo) {
    const addTileContent = (() => {
        createStyleAfter.innerHTML =
            `.firstMark::after {
       content: '${playerOne.marker}' 
   }
   .secondMark::after {
        content: '${playerTwo.marker}'
   }`
        document.head.appendChild(createStyleAfter)
        return
    })()

    // gets value's from Starting form - stores into an object
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
                const winner = marker === 'firstMark' ? playerOne.title : playerTwo.title
                console.log(winner + ' wins')
                return won = true
            }
        })
        // WHEN THERE'S A TIE
        if (won === false && document.querySelectorAll('.firstMark').length + document.querySelectorAll('.secondMark').length === 9) return console.log('tie')
    };

    // turnChooser should select what element is going to be placed
    const addEvents = (function () {
        const test = counter()

        const alternate = function () {
            if (won === true) return
            let thing = test.check()
            if (Array.from(this.classList).includes('secondMark') || Array.from(this.classList).includes("firstMark")) return
            thing ? this.classList.add('secondMark') : this.classList.add('firstMark')
            test.addOne()


            checkWin(thing ? 'secondMark' : 'firstMark')
            return
        }

        const addEventListen = (function () {
            const { allButtons } = squares
            allButtons.forEach(button => button.addEventListener('click', alternate))
        })()

    })()


}


/*
8. Add a restart button
    clear the board
    clear refresh functions
8.5 Create a winning screen that shows with restart button
9. Add sounds for game
10. Create an option to select player or Bot
11. Add animations for the Game
*/