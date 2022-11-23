var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boulder
var rock

var rocksGroup, rockImage;
var backgroundImg
var score=0;

var gameOver, restart;
var gameOverImg,restartImg

function preload(){
  
  backgroundImg = loadImage("Jungle.png")
  

  
  
   rock= loadImage("Rock_obs-removebg-preview.png");
  
  boulder = loadImage("Boulder.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rocksGroup.add(rocks)
  
  boulder = createSprite(50,height-70,20,50);
  boulder.setCollider('circle',0,0,350)
  boulder.scale = 0.5;
  
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  rocksGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    rocksGroup.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && boulder.y  >= height-120) {
      boulder.velocityY = -10;
       touches = [];
    }
    
    boulder.velocityY = boulder.velocityY + 0.8
  
    
  
    
    spawnRocks();
  
    if(rocksGroup.isTouching(boulder)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    boulder.velocityY = 0;
    rocksGroup.setVelocityXEach(0);
    
    //change the trex animation
    
    //set lifetime of the game objects so that they are never destroyed
    rocksGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}

function spawnRocks() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var rock = createSprite(width+20,height-300,40,10);
    rock.scale = 0.5;
    rock.velocityX = 3;
    
     //assign lifetime to the variable
    rock.lifetime = 300;
    
    //adjust the depth
    rock.depth = trex.depth;
    boulder.depth = boulder.depth+1;
    
    //add each cloud to the group
    rocksGroup.add(rock);
  }
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  rocksGroup.destroyEach();
  
  score = 0;
  
}
