function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomLane(possibleLaneForObstacles) {
    return possibleLaneForObstacles[Math.floor(Math.random() * possibleLaneForObstacles.length)];
}

function generateRandomObstacles(possibleObstacles) {
    return possibleObstacles[Math.floor(Math.random() * possibleObstacles.length)];
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

/**
 * @param {String} selector
 * @returns {NodeList}
 *
 */

function _(selector) {
    return document.querySelectorAll(selector);
}

/**
 * @param {String} selector
 * @returns {HTMLElement}
 *
 */

function __(selector) {
    return document.querySelector(selector);
}
