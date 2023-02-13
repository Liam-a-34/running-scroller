const scroller = document.querySelector("#scroller")
const runner = document.querySelector("#runner")
const mainBox = document.querySelector("#main-box")
const deathPlaque = document.querySelector("#deathPlaque")
const yourScore = document.querySelector("#yourScore")
const highScoreDis = document.querySelector("#highScoreDis")


const scrollBtn = document.querySelector("#aniButton")
const jumper = document.querySelector("#jumpButton")


let xPos = 0;
let yPos = 0
const tubeHeight = 50
const tubeWidth = 50
const billHeight = 40
const runWidth = 40
const runHeight = 50
let alive = true;
let timer = 0;
let left = 50;
let direction = 0;
var deathSound = document.querySelector("#deathSound")
let deadPos = 0;
let deadCount = 0;
let score = 0;

function storeScore(){

    if(localStorage.getItem("score") == null){

        localStorage.setItem("score", Math.floor(score/100))

            deathPlaque.style.display = "block"

            yourScore.innerHTML = `Your score: ${Math.floor(score/100)}`

            highScoreDis.innerHTML = `Highscore: ${Math.floor(score/100)}`

    } else {

        if(score/100 > parseInt(localStorage.getItem("score"))){

            localStorage.setItem("score", Math.floor(score/100))

            deathPlaque.style.display = "block"

            yourScore.innerHTML = `Your score: ${Math.floor(score/100)}`

            highScoreDis.innerHTML = `Highscore: ${Math.floor(score/100)}`

            
        } else if(score/100 < parseInt(localStorage.getItem("score"))) {

            deathPlaque.style.display = "block"

            yourScore.innerHTML = `Your score: ${Math.floor(score/100)}`

            highScoreDis.innerHTML = `Highscore: ${parseInt(localStorage.getItem("score"))}`

        }

    }

}


function count(){
    timer += 1
    console.log(timer)
}

function interval(){
    return countUp = setInterval(count, 1000)
}

function dead2(){

    const deadDown = setInterval(() => {

        deadPos += 10
        runner.style.transform = `translate3d(0, ${deadPos}px, 0)`

        ++deadCount
        
        if(deadCount == 100){
            clearInterval(deadDown);
            deadCount = 0;
            storeScore()
            return;
        }

    }, 10)

}

function dead(){

    document.querySelector("#runner").src = "./mario_dead.png";
    setTimeout(() => {
        const deadUp = setInterval(() => {

            deadPos -= 10
            runner.style.transform = `translate3d(0, ${deadPos}px, 0)`

            ++deadCount
            
            if(deadCount == 30){
                clearInterval(deadUp);
                deadCount = 0;
                dead2();
            }
        }, 10)

    
}, 500)
   
}

function animate(){

    scrollBtn.disabled = true

    if(timer < 20){
    xPos -= 5;
    } else if (timer >= 20 && timer < 30){
        xPos -=7
    } else if (timer >= 30 && timer < 45){
        xPos -=10
    } else if (timer >= 45 && timer < 60){
        xPos -= 12
    } else if (timer >= 60) {
        xPos -=15
    }

    scroller.style.transform = `translate3d(${xPos}px, 0, 0)`;

    for(let i = 0; i < 31; i++){
        let bill = document.querySelector(`#bill${i}`)

        var a = runner.getBoundingClientRect()
        var b = bill.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + billHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate);
        deathSound.play();
        dead();
        alive = false;
        clearInterval(countUp);
        timer = 0;
        return;
    }
    }

    for(let i = 0; i < 31; i++){
        let goomba = document.querySelector(`#goomba${i}`)

        var a = runner.getBoundingClientRect()
        var b = goomba.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate);
        deathSound.play();
        dead();
        alive = false;
        clearInterval(countUp);
        timer = 0;
        return;
    }
    }

    for(let i = 0; i < 75; i++){

        let tube = document.querySelector(`#tube${i}`)

    var a = runner.getBoundingClientRect()
    var b = tube.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate);
        deathSound.play();
        dead();
        alive = false;
        clearInterval(countUp);
        timer = 0;
        return;
    }
}

    if (Math.abs(xPos) <= -500){
        xPos = 1000
    }

for(let i = 0; i < 75; i++){

    let tube = document.querySelector(`#tube${i}`)

    var a = runner.getBoundingClientRect()
    var b = tube.getBoundingClientRect()

    if(a.x + runWidth > b.x + tubeWidth){
        ++score
        console.log(score/100)
    }
}

for(let i = 0; i < 31; i++){

    let goomba = document.querySelector(`#goomba${i}`)

    var a = runner.getBoundingClientRect()
    var b = goomba.getBoundingClientRect()

    if(a.x + runWidth > b.x + tubeWidth){
        ++score
        console.log(score/100)
    }

}

for(let i = 0; i < 31; i++){

    let bill = document.querySelector(`#bill${i}`)

    var a = runner.getBoundingClientRect()
    var b = bill.getBoundingClientRect()

    if(a.x + runWidth > b.x + tubeWidth){
        ++score
        console.log(score/100)
    }

}

    let lastTube = document.querySelector("#tube75")

        let c = runner.getBoundingClientRect()
        let d = lastTube.getBoundingClientRect()

        if(c.x + runWidth > d.x + tubeWidth){
            cancelAnimationFrame(animate);
            deathSound.play();
            dead();
            alive = false;
            clearInterval(countUp);
            timer = 0;
            return;
        }

    requestAnimationFrame(animate)
}

let counter = 0

function jump(){

    document.querySelector("#runner").src = "./mario_jump.png"
    runner.style.width = "50px"

    var jumpSound = document.querySelector("#audio")
    jumpSound.volume = 0.3
    jumpSound.play()

    yPos -= 10

    ++counter

    runner.style.transform = `translate3d(0, ${yPos}px, 0)`

    for(let i = 0; i < 31; i++){
        let bill = document.querySelector(`#bill${i}`)

        var a = runner.getBoundingClientRect()
        var b = bill.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + billHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate);
        cancelAnimationFrame(jump);
        deathSound.play();
        dead();
        runner.style.width = "40px";
        alive = false;
        clearInterval(countUp);
        timer = 0;
        return;
    }
    }

    for(let i = 0; i < 31; i++){
        let goomba = document.querySelector(`#goomba${i}`)

        var a = runner.getBoundingClientRect()
        var b = goomba.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate);
        cancelAnimationFrame(jump);
        deathSound.play();
        dead();
        runner.style.width = "40px";
        alive = false;
        clearInterval(countUp);
        timer = 0;
        return;
    }
    }

    for(let i = 0; i < 75; i++){
        let tube = document.querySelector(`#tube${i}`)

        var a = runner.getBoundingClientRect()
        var b = tube.getBoundingClientRect()
    
        if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
            cancelAnimationFrame(animate);
            cancelAnimationFrame(jump);
            deathSound.play();
            dead();
            document.querySelector("#runner").src = "./mario_run.png";
            runner.style.width = "40px";
            alive = false;
            clearInterval(countUp);
            timer = 0;
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

    for(let i = 0; i < 31; i++){
        let bill = document.querySelector(`#bill${i}`)

        var a = runner.getBoundingClientRect()
        var b = bill.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + billHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate);
        cancelAnimationFrame(fall);
        deathSound.play();
        dead();
        runner.style.width = "40px";
        alive = false;
        clearInterval(countUp);
        timer = 0;
        return;
    }
    }

    for(let i = 0; i < 31; i++){
        let goomba = document.querySelector(`#goomba${i}`)

        var a = runner.getBoundingClientRect()
        var b = goomba.getBoundingClientRect()

    if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
        cancelAnimationFrame(animate);
        cancelAnimationFrame(fall);
        deathSound.play();
        dead();
        runner.style.width = "40px";
        alive = false;
        clearInterval(countUp);
        timer = 0;
        return;
    }
    }

    for(let i = 0; i < 75; i++){
        let tube = document.querySelector(`#tube${i}`)


        var a = runner.getBoundingClientRect()
        var b = tube.getBoundingClientRect()
    
        if((a.x < b.x + tubeWidth && a.x + runWidth > b.x) && (a.y < b.y + tubeHeight && a.y + runHeight > b.y)){
            cancelAnimationFrame(animate);
            cancelAnimationFrame(fall);
            deathSound.play();
            dead();
            document.querySelector("#runner").src = "./mario_run.png";
            runner.style.width = "40px";
            alive = false;
            clearInterval(countUp);
            timer = 0;
            return;
        }
    }

    if(counter == 20){
        cancelAnimationFrame(fall)
        counter = 0
        document.querySelector("#runner").src = "./mario_run.png"
        runner.style.width = "40px"
        
        return;
    }
requestAnimationFrame(fall)
}


scrollBtn.addEventListener("click", () => {
    animate();
    interval()
})

document.querySelector("#restartBtn").addEventListener("click", () => {

    scrollBtn.disabled = false
    window.location.replace("/running-scroller/")

})

document.addEventListener("keydown", (event) => {

    if(event.code == "Space"){
        if(yPos == 0){
        jump()
        }
    }

})


document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    direction = -5;
  } else if (event.key === 'd') {
    direction = 5;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'a' || event.key === 'd') {
    direction = 0;
  }
});

setInterval(() => {

    if(alive === true){
  left += direction;
  runner.style.left = left + 'px';
    } 
}, 10);
