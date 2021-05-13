function collisionDetection(myCar, obstacles) {
    let aRect = myCar.getBoundingClientRect();
    let bRect = obstacles.getBoundingClientRect();

    return !((aRect.top > bRect.bottom)
        || (aRect.bottom < bRect.top)
        || (aRect.right < bRect.left)
        || (aRect.left > bRect.right))
}