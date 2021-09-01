var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sanitizer,germs,peolpe,lives,ground,invisibleGround;
var germsGroup,germs1,germs2,germs3,music1,music2,music3;
var people,people_walking,people_collided;
var groundImg,snitzrImg,snitzrGroup,germsImg,edges,peopleImg,livesImg;

var score = 0;

var gameOver,restart;

function preload() {
  people_walking = loadAnimation("people1.png","people2.png","people3.png","people4.png","people5.png","people6.png","people7.png","people8.png");
  people_collided = loadAnimation("people_collided.png")
  groundImg2 = loadImage("background2.jpg");
  music1 = loadSound("music1.mp3");
  music2 = loadSound("music2.mp3")
  lives = loadImage("lives.png");
  snitzr1 = loadAnimation("sanitizer1.png");
  snitzr2 = loadAnimation("sanitizer2.png");
  germs1 = loadImage("germs1.png");
  germs2 = loadImage("germs2.png");
  germs3 = loadImage("germs3.png");
  gameOverImg = loadImage("gameOver2.png");
}
function setup() {
  createCanvas(800,600);

  //ground = createSprite(0,0,800,600);
  //ground.addImage("ground",groundImg2);
  //ground.x = ground.width /2;
  //ground.velocityX = -(6 + 3*score/100);
  //ground.scale = 2.5;

  people = createSprite(30,540,20,50);
  people.addAnimation("walking",people_walking);
  people.addAnimation("collided",people_collided);
  people.scale = 0.4;
  people.debug = true;
  people.setCollider("rectangle",0,0,50,250)

  edges = createEdgeSprites();

  snitzr3 = createSprite(50,100);
  snitzr3.addAnimation("st1",snitzr1);
  snitzr3.addAnimation("st2",snitzr2);
  snitzr3.scale = 0.10;

  gameOver = createSprite(400,200);
  gameOver.addImage(gameOverImg);
  
  gameOver.scale = 0.5;

  gameOver.visible = false;
  
  invisibleGround = createSprite(700,700,50,10);
  invisibleGround.visible = false;
  invisibleGround.debug = true;

  germsGroup = new Group();
  snitzrGroup = new Group();
}

function draw() {
  background(255);
  image(groundImg2,0,0,width,height);
  fill("green");
  textSize(30);
  text("Score: "+ score, 600,50);
  
  music1.playMode('restart' );
  
  if (gameState===PLAY){
    //score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6);

   
  
  
    //people.velocityY = people.velocityY + 0.8
  
    //if (ground.x < 0){
    //  ground.x = ground.width/2;
    //}
    people.changeAnimation("walking",people_walking);

   

    people.bounceOff(edges);

    snitzr3.changeAnimation("st1",snitzr1);

    snitzr3.x = people.x+20;
    snitzr3.y = people.y-10;

    if(keyDown("right")){
      people.x += 4;
      people.y += 0;
    }

    if(keyDown("left")){
      people.x += -4;
      people.y += 0;
    }

    if(keyDown("down")){
      people.x += 0;
      people.y += 4;
    }

    if(keyDown("up")){
      people.x += 0;
      people.y += -4;
    }

    if(keyDown("space")){
      snitzr3.changeAnimation("st2",snitzr2);
      music2.play();
    }
  
    people.collide(invisibleGround);
    spawnGerms();

    if(germsGroup.isTouching(snitzr3) && keyDown("space")){
      germsGroup.destroyEach();
      score = score+5;
    }
  
    if(germsGroup.isTouching(people)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    //ground.velocityX = 0;
    
    germsGroup.setVelocityXEach(0);
    
    people.changeAnimation("collided",people_collided);
    
    germsGroup.setLifetimeEach(-1);
    
    if(keyDown("R")) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnGerms() {
  if(frameCount % 120 === 0) {
    var germ = createSprite(800,350,10,40);
    germ.velocityX = -(6 + 3*score/100);

    germ.y = Math.round(random(50,500))
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: germ.addImage(germs1);
              break;
      case 2: germ.addImage(germs2);
              break;
      case 3: germ.addImage(germs3);
              break;
      default: break;
    }

    //germ.debug = true;
    germ.setCollider("circle",0,0,20)

    germ.rotation = 10;

    germ.rotation = germ.rotation+5;
               
    germ.scale = 0.4;
    germ.lifetime = 300;
    germsGroup.add(germ);
  }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  germsGroup.destroyEach();
  
  people.changeAnimation("walking",people_walking);
  
  score = 0;
  
}

