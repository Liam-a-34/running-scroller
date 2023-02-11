const scroller = document.querySelector("#scroller")
const runner = document.querySelector("#runner")


const scrollBtn = document.querySelector("#aniButton")
const jumper = document.querySelector("#jumpButton")


let xPos = 0;
let yPos = 0
const tubeHeight = 50
const tubeWidth = 50
const billHeight = 40
const runWidth = 40
const runHeight = 50

document.addEventListener("keydown", (event) => {

    if(event.repeat){ return; }

    if(event.key == "a"){
        cancelAnimationFrame(strafeRight)
            strafeLeft()
        }

    if(event.key == "d"){
        cancelAnimationFrame(strafeLeft)
        strafeRight()
    }

})

function animate(){

    scrollBtn.disabled = true

    xPos -= 10;

    scroller.style.transform = `translate3d(${xPos}px, 0, 0)`;

    for(let i = 0; i < 7; i++){
        let bill = document.querySelector(`#bill${i}`)

        var a = runner.getBoundingClientRect()
        var b = bill.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + billHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate)
        scrollBtn.disabled = false
        return;
    }
    }

    for(let i = 0; i < 7; i++){
        let goomba = document.querySelector(`#goomba${i}`)

        var a = runner.getBoundingClientRect()
        var b = goomba.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate)
        scrollBtn.disabled = false
        return;
    }
    }

    for(let i = 0; i < 35; i++){

        let tube = document.querySelector(`#tube${i}`)

    var a = runner.getBoundingClientRect()
    var b = tube.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate)
        scrollBtn.disabled = false
        return;
    }
}

    if (Math.abs(xPos) <= -500){
        xPos = 1000
    }

    requestAnimationFrame(animate)
}

let counter = 0

function jump(){

    document.querySelector("#runner").src = "mario_jump.png"
    runner.style.width = "50px"

    var audio = document.querySelector("#audio")
    audio.volume = 0.5
    audio.play()

    yPos -= 10

    ++counter

    runner.style.transform = `translate3d(0, ${yPos}px, 0)`

    for(let i = 0; i < 7; i++){
        let bill = document.querySelector(`#bill${i}`)

        var a = runner.getBoundingClientRect()
        var b = bill.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + billHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate)
        scrollBtn.disabled = false
        return;
    }
    }

    for(let i = 0; i < 7; i++){
        let goomba = document.querySelector(`#goomba${i}`)

        var a = runner.getBoundingClientRect()
        var b = goomba.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate)
        scrollBtn.disabled = false
        return;
    }
    }

    for(let i = 0; i < 35; i++){
        let tube = document.querySelector(`#tube${i}`)

        var a = runner.getBoundingClientRect()
        var b = tube.getBoundingClientRect()
    
        if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
            cancelAnimationFrame(animate)
            document.querySelector("#runner").src = "mario_run.png"
            runner.style.width = "40px"
            scrollBtn.disabled = false
            return;
        }
    }

    if(counter == 20){
        cancelAnimationFrame(jump)
        counter = 0
        fall()
        return;
    }
requestAnimationFrame(jump)
}

function fall(){


    yPos += 10

    ++counter

    runner.style.transform = `translate3d(0, ${yPos}px, 0)`

    for(let i = 0; i < 7; i++){
        let bill = document.querySelector(`#bill${i}`)

        var a = runner.getBoundingClientRect()
        var b = bill.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + billHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate)
        scrollBtn.disabled = false
        return;
    }
    }

    for(let i = 0; i < 7; i++){
        let goomba = document.querySelector(`#goomba${i}`)

        var a = runner.getBoundingClientRect()
        var b = goomba.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate)
        scrollBtn.disabled = false
        return;
    }
    }

    for(let i = 0; i < 35; i++){
        let tube = document.querySelector(`#tube${i}`)


        var a = runner.getBoundingClientRect()
        var b = tube.getBoundingClientRect()
    
        if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
            cancelAnimationFrame(animate)
            document.querySelector("#runner").src = "mario_run.png"
            runner.style.width = "40px"
            scrollBtn.disabled = false
            return;
        }
    }

    if(counter == 20){
        cancelAnimationFrame(fall)
        counter = 0
        document.querySelector("#runner").src = "mario_run.png"
        runner.style.width = "40px"
        scrollBtn.disabled = false
        return;
    }
requestAnimationFrame(fall)
}


scrollBtn.addEventListener("click", animate, false)

document.addEventListener("keydown", (event) => {

    if(event.code == "Space"){
        if(yPos == 0){
        jump()
        }
    }

})
