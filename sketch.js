var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, gra;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var re,ree, restart,sun,sunnn;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("groundsa.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadAnimation("retry_1[1].png","retry_2[1].png","retry_3[1].png","retry_4[1].png");
  ree = loadImage("restart.png");
  
  sunnn = loadImage("Sun (2).png");
  
}

function setup() {
  createCanvas(730,500);
  

  
  trex = createSprite(50,150,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(525,555,10000,40);
  ground.addImage("ground",groundImage);
  ground.scale = 0.5;
  
  sun = createSprite(50,50,100,100);
  sun.addImage("sun",sunnn);
  sun.scale = 0.4;
  

  
  restart = createSprite(325,140);
  restart.addAnimation("restart",restartImg);
  
  restart.scale = 0.15;

  restart.visible = false;
  
  restart.depth=2
  
  re = createSprite(325,140);
  re.addAnimation("re",ree);
  
  re.scale = 0.5;
  
  re.depth=1;

  re.visible = false;
  
  invisibleGround = createSprite(200,295,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  camera.position.x = 0;
 }

function draw() {
  ground.debug = true;
  background(0,255,255);
  
  textFont("Informal Roman");
  textSize(30);
  fill("");
  stroke("blue");
  strokeWeight(5)
  text("Press on trex to jump",150,40);

  
  if (gameState===PLAY){
      textSize(20);
  stroke("red");
  strokeWeight(5);
  fill("yellow")
  textFont("Algerian");
  text("S c o r e : "+ score, 500,50);
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(mousePressedOver(trex) && trex.y >= 260) {
      trex.velocityY = -13 ;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = 225;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    restart.visible = true;
    
    stroke(102,51,204);
    strokeWeight(7);
    textSize(50);
    fill(255,128,0);
    textFont("Blackadder ITC");
    text("Game Over",225,100);
    
      textSize(30);
  stroke("red");
  strokeWeight(5);
  fill("yellow");
  textFont("Brush Script MT");
  text("Score : "+ score, 250,200);
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
    ground.depth = obstaclesGroup.depth;
    obstaclesGroup.depth = obstaclesGroup.depth + 1;
  cloudsGroup.depth = obstaclesGroup.depth;
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1100,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 1500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1100,275,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  re.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}