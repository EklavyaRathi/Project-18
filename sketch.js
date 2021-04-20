var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END = 0;
var GameState=PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.scale=1.1;
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height/2,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

  if(GameState===PLAY) {
   
    //code to reset the background
    if(path.y > height ){
      path.y = height/2;
    }
    boy.x = World.mouseX;

    if (cashG.isTouching(boy)) {
      treasureCollection= treasureCollection+50;
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      treasureCollection= treasureCollection+150;
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      treasureCollection= treasureCollection+100;
      jwelleryG.destroyEach();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        GameState=END;
    }
  }
  
  }else if(GameState===END) {
    boy.addAnimation("SahilRunning",endImg);
    boy.scale=1.1;
    boy.x=width/2;
    boy.y=height/2;
    path.velocityY=0;
    diamondsG.setVelocityYEach(0);
    diamondsG.destroyEach();
    
    jwelleryG.setVelocityYEach(0);
    jwelleryG.destroyEach();
    
    cashG.setVelocityYEach(0);
    cashG.destroyEach();
    
    swordGroup.setVelocityYEach(0);
    swordGroup.destroyEach();
    
  }
    
  drawSprites();
  textSize(20);
  fill("white");
  stroke("black")
  text("Treasure: "+ treasureCollection,220,35);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  
  }
}