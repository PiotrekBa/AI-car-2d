class SettingService {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.populationSlid;
        this.turnCheckbox;
        this.turnCheckboxVal = true;
        this.hiddenLayer1Slid;
        this.hiddenLayer2Slid;
    }

    draw() {
        push();
        translate(this.x, this.y);
        textSize(16);
        text('Population', 10, 30);
        text(this.populationSlid.value(), 230, 30);
        text('1 Hidden layer', 10, 100);
        text(this.hiddenLayer1Slid.value(), 230, 100);
        text('2 Hidden layer', 10, 140);
        text(this.hiddenLayer2Slid.value(), 230, 140);
        line(0, 0, 0, this.h);
        pop();
    }

    getInputs() {
        this.populationSlid = createSlider(10, 200, 50, 10);
        this.populationSlid.position(this.x + 120, this.y + 10);
        this.populationSlid.style('width', '100px');

        this.turnCheckbox = createCheckbox('Dichotomous turn', true);
        this.turnCheckbox.position(this.x + 10, this.y + 50);
        this.turnCheckbox.style('width', '200px');
        this.turnCheckbox.changed(this.turnChecked);

        this.hiddenLayer1Slid = createSlider(2, 12, 6, 1);
        this.hiddenLayer1Slid.position(this.x + 120, this.y + 80);
        this.hiddenLayer1Slid.style('width', '100px');

        this.hiddenLayer2Slid = createSlider(2, 12, 4, 1);
        this.hiddenLayer2Slid.position(this.x + 120, this.y + 120);
        this.hiddenLayer2Slid.style('width', '100px');
    }

    turnChecked() {
        this.turnCheckboxVal = this.checked();
    }

    getSettings() {
        return {
            population: this.populationSlid.value(),
            dichTurn: this.turnCheckboxVal,
            hidden1: this.hiddenLayer1Slid.value(),
            hidden2: this.hiddenLayer2Slid.value()
        }
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