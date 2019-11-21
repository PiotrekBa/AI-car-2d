class CollisionService {

    static linelineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        const tCounter = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);

        const uCounter = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3);

        if (denominator == 0) {
            return false;
        }

        const t = tCounter / denominator;
        const u = -uCounter / denominator;

        return new IntersectionParameters(t, u);
        
    }

    static vectorVectorIntersection(v1, v2) {
        return this.linelineIntersection(v1.x1, v1.y1, v2.x2, v2.y2);
    }

    static checkIntersection(params) {
        const t = params.t;
        const u = params.u;
        return (t >= 0 && t <= 1 && u >= 0 && u <= 1);
    }

    static isLinesIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        const tu = this.linelineIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
        return this.checkIntersection(tu);
    }
}


class IntersectionParameters {
    constructor(t, u) {
        this.t = t;
        this.u = u;
    }
}