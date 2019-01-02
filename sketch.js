let JUMP = 0.005;
let TS = 0.01;
let TP = 1;
let group = [];
let total = 200;
let pad = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);
    noStroke();
    for (let i = 0; i < total; i++) {
        group.push(new Firefly());
    }
}

function draw() {
    background(0, 0, 10);
    for (let f of group) {
        f.display();
        f.updateStatus();
        f.updateMotion();
    }
}

function fphi(phi) {
    let C = 1 - exp(-1);
    return C * (1 - exp(-1 * phi));
}


class Firefly {
    constructor() {
        this.pos = createVector(randomGaussian(width / 2, 200), randomGaussian(height / 2, 100));
        this.phase = random(1);
        this.nowFired = false;
        this.speed = 0.4;
    }

    updateStatus() {
        let num = 0

        for (let f of group) {
            if (f.nowFired) {
                num++;
            }
        }
        // console.log(num);

        if (this.nowFired) {
            this.phase += num * JUMP + TS;
        } else {
            this.phase += TS;
        }

        if (this.phase > TP) {
            this.phase = 0;
            this.nowFired = true;
        } else {
            this.nowFired = false;
        }
    }

    updateMotion() {
        let scl = map(noise(this.pos.x / 1000, this.pos.y / 1000), 0, 1, 0, TWO_PI) * 1000;
        let vel = createVector(cos(scl), sin(scl)).mult(this.speed);
        this.pos.add(vel);

        if (this.pos.x > 0.85 * width || this.pos.x < 0.15 * width || this.pos.y < 0.1 * height || this.pos.y > 0.9 * height) {
            this.pos = createVector(randomGaussian(width / 2, 200), randomGaussian(height / 2, 100));
        }
    }

    display() {
        let alpha = map(fphi(this.phase), 0.4, 1, 255, 0);
        let r = map(this.phase, 0, 1, 10, 0);
        fill(255, 255, 0, alpha);
        ellipse(this.pos.x, this.pos.y, r, r);
    }

    status() {
        if (this.phase > 0.9 || this.phase < 0.1) {
            return true;
        }
    }
}