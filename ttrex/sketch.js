var trex, trex_running, edges, ground, ivg, cloudImage;
var groundImage;
var obs1Image;
var obs2Image;
var obs3Image, obs4Image, obs5Image, obs6Iimage;
var score = 0;
var cloudGroup;
var obsGroup;
var gs, ob7;
var trex_stop;
var restart, gameOver;
var restartImage, gameOImage;
var cheakpoint;
var jump,die;
var obsvel = -6;
localStorage["HighestScore"] = 0;





const PLAY = "play";
const END = "end";

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_stop = loadAnimation("stop.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obs1Image = loadImage("obs1.png")
  obs2Image = loadImage("obs2.png")
  obs3Image = loadImage("obs3.png")
  obs4Image = loadImage("obs4.png")
  obs5Image = loadImage("obs5.png")
  obs6Image = loadImage("obs6.png")
  restartImage = loadImage("restart.png");
  gameOImage = loadImage("game over.png");
  jump = loadSound("jump.mp3");
  cheakpoint = loadSound("cheakpoint.mp3")
  die = loadSound("die.mp3");
  

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop", trex_stop);
  edges = createEdgeSprites();
  ground = createSprite(50, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ivg = createSprite(50, 190, 400, 20);
  ivg.visible = false;
  trex.scale = 0.5;
  trex.x = 50
  ground.velocityX = -5;
  //trex.debug = true;
  //trex.setCollider("circle", 0, 0, 40);


  gs = PLAY

  cloudGroup = new Group();
  obsGroup = createGroup();

  gameOver = createSprite(300, 70, 10, 10);
  gameOver.addImage(gameOImage);
  gameOver.scale = 2
  gameOver.visible = false;


  restart = createSprite(300, 100, 10, 10);
  restart.addImage(restartImage);
  restart.scale = 0.3
  restart.visible = false;



}


function draw() {

  background(180);


  trex.collide(ivg);

  drawSprites();



  text("SCORE  "+ score, 500, 20)
  text("HIGH SCORE  "+localStorage["HighestScore"],40,20);

  //console.log(trex.y);


  if (gs == PLAY) {
    if(score%100==0&&score>0){
      cheakpoint.play();
      ground.velocityX = ground.velocityX -2;
      obsvel = obsvel -2;
    }
    
    if (ground.x < 4) {
      ground.x = 200
      
    }
    createCloud();

    createObs();

   //console.log(getFrameRate())

    score = score + Math.round(getFrameRate() / 60)
    if (score > localStorage["HighestScore"] ){
      localStorage["HighestScore"] = score;
      
    }
   console.log(Math.round(0.29)) 

    if (keyDown("space") && trex.y > 156) {
      trex.velocityY = -12;
      jump.play();
    }

    trex.velocityY = trex.velocityY + 0.5;
    if (trex.isTouching(obsGroup)) {
      die.play();
      gs = END
    }

  } else if (gs == END) {
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0)
    obsGroup.setVelocityXEach(0)
    trex.velocityY = 0;
    trex.changeAnimation("stop", trex_stop);
    gameOver.visible = true;
    restart.visible = true;
    

    cloudGroup.setLifetimeEach(-1)
    obsGroup.setLifetimeEach(-1)
    
    if (mousePressedOver(restart)){
      reset();
      
    }
  }
}

function createCloud() {
  if (frameCount % 60 == 0) {
    var rand = Math.round(random(1, 100))
    var cloud = createSprite(580, 50, 5, 5)
    cloud.velocityX = -3
    cloud.y = rand;
    cloud.addImage(cloudImage);
    cloud.scale = 0.6
    cloud.depth = trex.depth;
    trex.depth++
    cloud.lifetime = 200
    cloudGroup.add(cloud);
  }

}

function createObs() {
  if (frameCount % 80 == 0) {
    var rand = Math.round(random(1, 6))
    var obs = createSprite(580, 160, 20, 20);
    obs.velocityX = obsvel;
    obs.scale = 0.7
    //obs.debug = true;
    obsGroup.add(obs)
    obs.lifetime = 100
    switch (rand) {
      case 1:
        obs.addImage(obs1Image)
        break;
      case 2:
        obs.addImage(obs2Image)
        break;
      case 3:
        obs.addImage(obs3Image)
        break;
      case 4:
        obs.addImage(obs4Image)
        break;
      case 5:
        obs.addImage(obs5Image)
        break;
      case 6:
        obs.addImage(obs6Image)
        break;
      default:
        break;
    }
  }
}


function reset(){
  gs = PLAY
  score = 0;
  restart.visible = false;
  gameOver.visible = false;
  obsGroup.destroyEach();
  cloudGroup.destroyEach();
  ground.velocityX = -5;
  trex.changeAnimation("running", trex_running);
  obsvel = -6;
}



