var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var zombie,zombieImg;
var zombieGroup;
var bullet = 70;
var gameState = "fight";
var score = 0;
var life = 5;
var lose, winning, explosionSound;


function preload(){
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  zombieImg = loadImage("assets/zombie.png");
  lose = loadSound("assets/lose.mp3");
  winning = loadSound("assets/win.mp3");
  explosionSound = loadSound("assets/explosion.mp3");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(displayWidth/2-20, displayHeight/2-40, 20, 20);
 bg.addImage(bgImg);
  bg.scale = 1.1;

//creating the player sprite
 player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
 player.scale = 0.3;

 player.debug = true;
 player.setCollider("rectangle",0,0,300,300);

 heart1 = createSprite(displayWidth-150,40,20,20);
 heart1.visible = false
 heart1.addImage("heart1",heart1Img);
 heart1.scale = 0.4;

 heart2 = createSprite(displayWidth-100,40,20,20);
 heart2.visible = true
 heart2.addImage("heart2",heart2Img);
 heart2.scale = 0.4;

 heart3 = createSprite(displayWidth-300,40,20,20);
 heart3.visible = true
 heart3.addImage("heart3",heart3Img);
 heart3.scale = 0.4;

 zombieGroup = new Group();
 bulletGroup = new Group();
}

function draw() {
  background(0); 
    
 if(gameState === "fight"){

  if(life === 3){
    heart3.visible = true;
    heart2.visible = false;
    heart1.visible = false;
  }

  if(life === 2){
    heart3.visible = false;
    heart2.visible = true;
    heart1.visible = false;
  }

  if(life === 1){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }

  if(life === 0){
    gameState = "lost";
    lose.play();
  }

  if(score == 100){
    gameState = "won";
    winning.play();
  }
  //moving the player up and down and making the game mobile compatible using touches
 if(keyDown("UP_ARROW") || touches.length > 0 ){
  player.y = player.y-30; 
 }
 if(keyDown("DOWN_ARROW") || touches.length > 0 ){
  player.y = player.y+30; 
 }
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10);
  bullet.velocityX = 20;

  bulletGroup.add(bullet);
  player.depth = bullet.depth;
  player.depth = player.depth + 2;
  player.addImage(shooter_shooting)
  bullet = bullet - 1;
  explosionSound.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

 if(bullet == 0){
  gameState = "bullet";
  lose.play();
 }

 if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
    }
  }
 }


if(zombieGroup.isTouching(player)){
  for(var i = 0; i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
    }
  }
}

enemy();
 }
drawSprites();

if(gameState == "lost"){
  textSize(100);
  fill("red");
  text("You Lost",400,400);
  zombieGroup.destroyEach();
  player.destroy(); 
}

else if(gameState == "won"){
  textSize(100);
  fill("yellow");
  text("You Won",400,400);
  zombieGroup.destroyEach();
  player.destroy();
}

else if(gameState == "bullet"){
  textSize(50);
  fill("green");
  text("You Ran Out of Bullets",470,410);
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}



}

function enemy(){
  if(frameCount % 50 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,400,400);
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }
}