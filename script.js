const playableArea = document.querySelector('.grid-container')

const create = (function(){
    for (let i = 0; i < 9; i++){
        const box = document.createElement('div')
        box.classList.add(`box`)
        box.classList.add(`${i}`)
        playableArea.appendChild(box)
    }
})()


const newPlayer = function(){

}