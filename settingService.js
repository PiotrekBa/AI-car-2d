class SettingService {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        push();
        translate(this.x, this.y);
        line(0,0,0,this.h);
        pop();
    }
}

/*czym sterować:
- liczba neuronów
- rodzaj skrętu
- rodzaj gazu
- widoczność auta
- sposób mutacji
- start/stop
*/