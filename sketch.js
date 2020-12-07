var PLAY = 1;
var END = 0;
var gameState = 1;


var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground;
 
function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  var survivalTime = 0;
  
  monkey = createSprite(150,250,10,10);
  monkey.scale = 0.1;
  monkey.addAnimation("running",monkey_running);

  ground = createSprite(300,283,600,7);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(255);
  
   if(gameState === PLAY){
  //giving ground unlimited scrolling effect
  if(ground.x < 300){
    ground.x = ground.width/2
    }
    
    stroke("white");
  textSize(20);
  fill("white");
  text("score: "+ score , 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survialTime = Math.ceil(frameCount/frameRate())
  text("survival Time: " + survialTime , 100,50);
  
  
    
  //making monkey jump when space key pressed
  if(keyDown("space")){
    monkey.velocityY = -14;
  }
  
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //colliding monkey with ground
  monkey.collide(ground);
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
  }
   }
  else if(gameState === END){
    
        stroke("white");
  textSize(20);
  fill("white");
  text("score: "+ score , 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("survival Time: " + survialTime , 100,50);
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
   
  } 
    

  
  
  
  bananathrow();  
  SpawnObstacles();

  drawSprites();

}
function bananathrow(){
  
  if(frameCount%60===0){
    banana = createSprite(600,100,0,0);
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -4;
    banana.depth = monkey.depth - 1;
    
    //randomising y position of banana and giving it lifetime
    banana.y = Math.round(random(120,200));
    banana.lifetime = 150;
    
    //adding banana to bananaGroup
    bananaGroup.add(banana);
  }
}

function SpawnObstacles(){
  if(frameCount%170 === 0){
    obstacle = createSprite(600,245,10,10);
    obstacle.addImage(obstaceImage);
    
    obstacle.velocityX = -4;
    
    obstacle.scale = 0.2;
    
    obstacle.lifetime = 150;
    
    obstacle.setCollider("circle",-45,0,200);
    obstacle.debug = true;
    
    obstacleGroup.add(obstacle);
  } 
}