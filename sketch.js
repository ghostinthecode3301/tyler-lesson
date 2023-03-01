let repeats = 2000
let huePoints = []
let satPoints = []
let brPoints = []
let teal = [180, 41, 50]
let milk = [180, 40, 100]
let white = [0, 0, 100]
let berry = [337, 100, 50]
let hues = [teal, milk, white, berry]
let sats = [40, 60, 80, 100]
let brights = [40, 60, 80, 100]



function setup() {
    colorMode(HSB)
    createCanvas(1000, 500)

    //random color-picking for points
    for (let i = 0; i < 50; i++) {  //so we have array of hue points
        let colorIndex = Math.floor(random(4))
        let huePoint = new HuePoint(random(width), random(height), hues[colorIndex][0])
        huePoints.push(huePoint)
    }
    for (let i = 0; i < 10; i++) {  //so we have array of saturation points
        let colorIndex = Math.floor(random(4))
        let satPoint = new SatPoint(random(width), random(height), sats[colorIndex])
        satPoints.push(satPoint)
    }
    for (let i = 0; i < 10; i++) {  //so we have array of brightness points
        let colorIndex = Math.floor(random(4))
        let brPoint = new BrPoint(random(width), random(height), brights[colorIndex])
        brPoints.push(brPoint)
    }

    for (let i = 0; i < repeats; i++) {
        let x = random(width)
        let y = random(height)
        let sideX = random(50)
        let sideY = random(250)
        let d = random(2)

        let hue = closestPoint(x, y, huePoints)
        let saturation = closestPoint(x, y, satPoints)
        let brightness = closestPoint(x, y, brPoints)

        quadrilateral(x, y, sideX, sideY, d, hue, saturation, brightness)
    }

}

function quadrilateral(x, y, sideX, sideY, d, hue, saturation, brightness) {
    colorMode(HSB)
    let angle = random(360)
    for (let i = x; i < x + sideX; i += 2) {
        for (let j = y; j < y + sideY; j += 2) {

            let chance = random(0, 1.0)
            if (chance > 0.3) {
                stroke(hue, saturation, brightness)
                fill(hue, saturation, brightness)
                push()
                translate(i, j)
                rotate(radians(angle))
                ellipse(0, 0, random(d), random(2))
                pop()

            } else {
                console.log('fat mom')
            }
        }
    }
}

function closestPoint(x, y, points) {
    let index
    let distances = []
    let closeDistances = []

    for (let p = 0; p < points.length; p++) {
        let distance = dist(x, y, points[p].xAxis, points[p].yAxis)
        distances.push(distance)
    }
    distances.sort(compareNumbers)

    for (let i = 0; i < 5; i++) {
        closeDistances.push(distances[i])
    }
    index = Math.abs(Math.floor(normalD(-5, 5)))

    return closeDistances[index]
}

class HuePoint {
    constructor(x, y, hue) {
    this.xAxis = x;
    this.yAxis = y;
    this.hue = hue
    }
    draw() {
        stroke(255, 0, 0)
        point(this.xAxis, this.yAxis)
    }
}
class SatPoint {
    constructor(x, y, saturation) {
        this.xAxis = x;
        this.yAxis = y;
        this.saturation = saturation
    }
    draw() {
        stroke(0, 255, 0)
        point(this.xAxis, this.yAxis)
    }
}
class BrPoint {
    constructor(x, y, brightness) {
        this.xAxis = x;
        this.yAxis = y;
        this.brightness = brightness
    }
    draw() {
        stroke(0, 0, 255)
        point(this.xAxis, this.yAxis)
    }
}

function normalD (min, max, skew = 1) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) {
        num = normalD(min, max, skew) // resample between 0 and 1 if out of range
    } else {
        num = Math.pow(num, skew) // Skew
        num *= max - min // Stretch to fill range
        num += min // offset to min
    }
    return num
}

function compareNumbers(a, b) {
    let c = a - b
    return c;
}