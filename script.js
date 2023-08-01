const playableArea = document.querySelector('.grid-container')
const startModal = document.querySelector('#start-modal')
const startButton = document.querySelector('#start-button')
const createStyleAfter = document.createElement('style')
const results = document.querySelector('#results-modal')
const resultsText = document.querySelector('.winner')
const reloadButton = document.querySelector('.reload')

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

const reload = function () {
    sounds.playStart()
    return window.open('./index.html', "_self")
};

const pickNames = function (event) {
    event.preventDefault();

    sounds.playStart()
    startModal.classList.add('hidden')
    playableArea.classList.remove('hidden')
    const myFormData = new FormData(document.querySelector('#startForm'));
    const myFormObj = {}
    myFormData.forEach((value, key) => myFormObj[key] = value)

    const playerOne = Player(myFormObj.p1, myFormObj.s1)
    const playerTwo = Player(myFormObj.p2, myFormObj.s2)

    playGame(playerOne, playerTwo)
    return
}

let decider = 0;
const Player = function (name, symbol) {
    const title = name ? name[0].toUpperCase() + name.substr(1).toLowerCase() : decider === 0 ? 'X' : 'O'
    const marker = symbol ? symbol[0].toUpperCase() : decider === 0 ? 'X' : 'O'
    decider++

    return {
        title,
        marker
    }
}

reloadButton.addEventListener('click', reload)
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

        winning.forEach(set => {
            if (set.every(r => selectedTiles.includes(r))) {
                const winner = marker === 'firstMark' ? playerOne.title : playerTwo.title
                playableArea.classList.add('hidden')
                resultsText.textContent = `${winner} wins!`
                results.classList.remove('hidden')

                return won = true
            }
        })
        if (won === false && document.querySelectorAll('.firstMark').length + document.querySelectorAll('.secondMark').length === 9) {
            playableArea.classList.add('hidden')
            resultsText.textContent = `Tie... No Winner.`
            results.classList.remove('hidden')
        }
    };

    const addEvents = (function () {
        const test = counter()

        const alternate = function () {
            if (won === true) return
            let thing = test.check()
            if (Array.from(this.classList).includes('secondMark') || Array.from(this.classList).includes("firstMark")) return
            thing ? this.classList.add('secondMark') : this.classList.add('firstMark')
            thing ? sounds.playSound2() : sounds.playSound1()
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
const sounds = (function () {
    const startSound = new Audio('sounds/arcade-start.wav')
    const placeMarker1 = new Audio('sounds/place1.mp3')
    const placeMarker2 = new Audio('sounds/place2.mp3')

    placeMarker1.volume = 0.3
    placeMarker2.volume = 0.3
    startSound.volume = 0.38

    placeMarker1.mozPreservesPitch = true;
    placeMarker2.mozPreservesPitch = true;

    placeMarker1.playbackRate = 2
    placeMarker2.playbackRate = 2

    const playSound1 = () => {
        placeMarker1.load()
        placeMarker1.play()
        return
    }
    const playSound2 = () => {
        placeMarker2.load()
        placeMarker2.play()
        return
    }
    const playStart = () => {
        startSound.load()
        startSound.play()
        return
    }
    return {
        playSound1,
        playSound2,
        playStart
    }
})()

/*
10. Create an option to select player or Bot
    - Difficulties from Random Selection to MinMax
11. Add animations for the Game
*/