var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
var divisions = [];
 
var particles = [];
var plinkos = [];
var scoresArray = [1,1];
var mousepos;

var divisionHeight=300;
var score = 0;

var gameState = "play";
var remainingTurns = 20;

var showScores = [];
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     var wall = new Divisions(k, height-divisionHeight/2, 10, divisionHeight)
     divisions.push(wall);
   }
   divisions.push(new Divisions(0,400,10,800));
   divisions.push(new Divisions(800,400,10,800));
   
   for(var a = 0; a < (floor(width/40)+1); a++){
    var tempScores = [1];
      for(var b = 0; b < a - 2; b++){
        tempScores.push(scoresArray[b]+scoresArray[b+1]);
      }
      tempScores.push(1);
      scoresArray = tempScores;
  }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  if(gameState === "play"){
  Engine.update(engine);

  if(mouseX > 0 && mouseX < 800){
    mousepos = mouseX;
  } else if(mouseX < 0){
    mousepos = 0;
  } else {
    mousepos = 800;
  }

  if(remainingTurns === 0){
    gameState = "end";
  }

  var mouseSection = floor(mousepos/80);
  var firstScore = 10-mouseSection;
  showScores.push(floor(scoresArray[firstScore]/10000));

  showScores = [];
  for(var c = firstScore; c < firstScore+10; c++){
    showScores.push(100-(floor(scoresArray[c]/1000)));
  }
  
  for(var d = 0; d < 10; d++){
    if(showScores[d]/showScores[d] != 1){
      text(0,d*80+20,600);
    }else{
      text(showScores[d],d*80+20,600);
    }
  }

   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
  } else {
    stroke(255);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("You have " + score + " points! Press Enter to retry",400,300)
    if(keyIsDown(ENTER)){
      particles = [];
      score = 0;
      remainingTurns = 20;
      gameState = "play";
    }
  }
}


function mouseClicked() {
  particles.push(new Particle(mousepos, 10,10));
  remainingTurns--;
}