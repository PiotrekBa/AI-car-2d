function setup() {
    createCanvas(800, 800);
  }
  
    let posX = 200;
    let posY = 200;
    let velX = 0;
    let velY = 0;
    let drag = 0.4;
    let angle = 0;
    let angVel = 0;
    let angDrag = 0.4;
    let power =1000;
    let turnSpeed = 0.2;

    const dt = 0.17;

  function draw() {
    background(220);
    
    posX += velX*dt;
    posY += velY*dt;
  
    
    velX *= drag * dt;
    velY *= drag * dt;
    
    angle += angVel * dt;
    angVel *= angDrag * dt;
    
    if(keyIsDown(UP_ARROW)) {
      velX += sin(angle) * power * dt;
      velY += cos(angle) * power * dt;
    }
    
    if(keyIsDown(LEFT_ARROW)) {
       angVel -= turnSpeed * dt;
    }
    
    if(keyIsDown(RIGHT_ARROW)) {
       angVel += turnSpeed * dt;
    }


    
    console.log(angle);
    translate(posX ,posY);
    
    rotate(-angle);
    rect(-10, -25, 20, 50);
    ellipse(0,0,4);
    line(0, 0, 0, 50);
  }