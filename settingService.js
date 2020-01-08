class SettingService {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.populationSlid;
    }

    draw() {
        push();
        translate(this.x, this.y);
        textSize(20);
        text('Population', 10, 30);
        text(this.populationSlid.value(), 230,30);
        line(0, 0, 0, this.h);
        pop();
    }

    getInputs() {
        this.populationSlid = createSlider(10, 200, 50, 10);
        this.populationSlid.position(this.x + 120, this.y + 10);
        this.populationSlid.style('width', '100px');
    }
}

/*czym sterować:
- liczba neuronów
- rodzaj skrętu
- rodzaj gazu
- widoczność auta
- sposób mutacji
- start/stop
- precyzyjna mutacja po dojechaniu do mety
-
*/