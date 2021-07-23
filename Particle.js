class Particle {
    constructor(x, y,r) {

        var options ={
            restitution:0.4
        }
        this.r=r;
      
        this.body = Bodies.circle(x, y, this.r,options);       
        this.color=color(random(0, 255), random(0, 255), random(0, 255));
        this.scored = true;
        World.add(world, this.body);

    }
    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        if( this.scored && pos.y > 550){
            score += showScores[floor(pos.x/80)];
            this.scored = false;
        }

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        //imageMode(CENTER);
        noStroke();
        fill(this.color)
        ellipseMode(RADIUS);
        ellipse(0, 0, this.r,this.r);
        pop();
    }

};