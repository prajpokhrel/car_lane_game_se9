const score = __('.score');
const startScreen = __('.startScreen');
const gameArea = __('.gameArea');

startScreen.addEventListener('click', startGame);

// Getting high score if previously played
let highScore = localStorage.getItem('bestDistance') || 0;
__('.highScore').innerHTML = "Best Distance: " + highScore;

let player = {
    speed: 5,
    x: 240,
    bulletX: 280
}

let keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Enter: false
}

let actualScore;
let getBullet;
let bulletInterval;
let totalObstaclesAtOnce = 3;
let totalLanesAtOnce = 10;

// Setting different obstacles type
const obstacleTypes = [
    "car1", "car3", "car4", "car5", "car6"
]

// To bring obstacles to center of lane rather than in between lanes
const possibleLaneForObstacles = [40, 240, 440];

// Adding different key event listeners
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    keys[event.key] = true;

    if(keys.ArrowLeft && player.x > 40) {
        player.x -= 200;
        player.bulletX -=200;
    }

    if(keys.ArrowRight && player.x < 440) {
        player.x += 200;
        player.bulletX += 200;
    }

    if(keys.Enter) {
        fireBullet();
    }
});

document.addEventListener('keyup', (event) => {
    event.preventDefault();
    keys[event.key] = false;
});

// Game over condition
function gameOver() {
    if (actualScore > highScore) {
        highScore = actualScore;
        localStorage.setItem('bestDistance', highScore + 1);
    }
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML =
        "GAME OVER <br><br> " +
        "Your Current Distance is: " + player.score + "<br><br> " +
        "Click HERE to start a new game. " +
        "<br><br>" +
        "Best Distance: " + localStorage.getItem('bestDistance') + "";

    player.x = 240;
    player.bulletX = 280;
    clearInterval(bulletInterval);
}

// Animating road
function animateRoad() {
    let lines = _('.lines');
    lines.forEach((line) => {
        if (line.y >= 1000) {
            line.y -= 1050;
        }
        line.y += player.speed;
        line.style.top = line.y + "px";
    });
}

// Animating obstacles
function animateObstacles(car) {
    let obstacles = _('.enemy');
    obstacles.forEach((obstacle) => {
         if (collisionDetection(car, obstacle)) {
             gameOver();
         }

         if (obstacle.y >= 750) {
             obstacle.y = -350;
             obstacle.style.left = generateRandomLane(possibleLaneForObstacles) + "px";
         }

         obstacle.y += player.speed;
         obstacle.style.top = obstacle.y + "px";
    });
}

// Animating Bullets
function animateBullet(bullet) {

    let obs = _('.enemy');
    player.bulletY = bullet.offsetTop;

    obs.forEach((ob) => {
       if (collisionDetection(bullet, ob)) {
           ob.classList.add('hide');
           setTimeout(() => ob.classList.remove('hide'), 4000);
       }
    });

    player.bulletY -= 10;
    bullet.style.top = player.bulletY + "px";
}

function fireBullet() {
    let bullet = __('.bullet');
    getBullet = 0;
    bullet.style.top = null;
    console.log(bullet);
    bulletInterval = setInterval(() => {
        getBullet++;
    }, 2000);
}

// Game play
function gamePlay() {
    let car = __('.car');
    let bullet = __('.bullet');


    if (player.start) {
        animateRoad();
        animateObstacles(car);


        if (getBullet === 1) {
            bullet.classList.remove('hide');
            animateBullet(bullet);
        }

        car.style.left = player.x + "px";
        bullet.style.left = player.bulletX + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;
        actualScore = player.score - 1;
        score.innerHTML = 'Distance: ' + actualScore;
    }
}

// Creating lane lines
function createLaneLine(position) {
    for (let x = 0; x < totalLanesAtOnce; x++) {
        let laneLine = document.createElement('div');
        laneLine.setAttribute('class', 'lines');
        laneLine.y = (x * 150);
        laneLine.style.top = laneLine.y + "px";
        laneLine.style.marginLeft = position + "px";
        gameArea.appendChild(laneLine);
    }
}

// Creating player car
function createPlayerCar() {
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);
}

// Creating bullets
function createBullet() {
    let bullet = document.createElement('div');
    bullet.setAttribute('class', 'bullet');
    bullet.classList.add('hide');
    gameArea.appendChild(bullet);
}

// Creating obstacles
function createObstacles() {
    for (let x = 0; x < totalObstaclesAtOnce; x++) {
        let obstacleCar = document.createElement('div');
        obstacleCar.setAttribute('class', 'enemy');
        obstacleCar.y =((x + 1) * 450) * -1;
        obstacleCar.style.top = obstacleCar.y + "px";
        obstacleCar.style.backgroundImage = `url(images/${generateRandomObstacles(obstacleTypes)}.png)`;
        obstacleCar.style.left = generateRandomLane(possibleLaneForObstacles) + "px";
        gameArea.appendChild(obstacleCar);
    }
}

// Increasing speed over 20sec time
function increaseSpeed() {
    setInterval(() => {
        player.speed += 0.5;
    }, 20000);
}

// Starting the game
function startGame() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = " ";

    player.start = true;
    player.score = 0;
    getBullet = 0;
    player.speed = 5;

    increaseSpeed();

    window.requestAnimationFrame(gamePlay);

    createLaneLine(190);
    createLaneLine(380);
    createPlayerCar();
    createObstacles();
    createBullet();
}
