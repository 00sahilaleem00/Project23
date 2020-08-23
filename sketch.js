const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var helicopterIMG, helicopterSprite;
var packageBody, packageSprite, packageIMG;
var groundBody, groundSprite;
var zombieSprite1, zombieSprite2, zombieSprite3, zombieSprite4, zombieIMG;
var dropzoneSprite1, dropzoneSprite2, dropzoneSprite3;
var win;

function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	zombieIMG = loadImage("zombies.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	//Creating the Package
	packageSprite=createSprite(0, 100, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	//Creating the Helicopter
	helicopterSprite=createSprite(0, 100, 10,10);
	helicopterSprite.velocityX = 3;
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	//Creating Ground
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(200,0,0);

	//Creating the Zombies
	zombieSprite1 = createSprite(100,605,1,1);
	zombieSprite1.addImage(zombieIMG);
	zombieSprite2 = createSprite(200,605,1,1);
	zombieSprite2.addImage(zombieIMG);
	zombieSprite3 = createSprite(600,605,1,1);
	zombieSprite3.addImage(zombieIMG);
	zombieSprite4 = createSprite(700,605,1,1);
	zombieSprite4.addImage(zombieIMG);

	//Creating the Drop Zone
	dropzoneSprite1 = createSprite(400, 650, 200, 20);
	dropzoneSprite1.shapeColor = "green";
	dropzoneSprite2 = createSprite(310, 590, 20, 100);
	dropzoneSprite2.shapeColor = "green";
	dropzoneSprite3 = createSprite(490, 590, 20, 100);
	dropzoneSprite3.shapeColor = "green";


	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

	//Creating the Bodies
	packageBody = Bodies.circle(0, 100, 5, {restitution:0.6, isStatic:true});
	World.add(world, packageBody);
	groundBody = Bodies.rectangle(width/2, 650, width, 10, {isStatic:true} );
 	World.add(world, groundBody);
	
	textSize(30);
}


function draw() {
  rectMode(CENTER);
  background(0);

  //Package Sprite is alligned with the Body
  packageSprite.x= packageBody.position.x;
  packageSprite.y= packageBody.position.y;

  //Colliding PackageSprite
  packageSprite.collide(dropzoneSprite1);
  packageSprite.collide(dropzoneSprite2);
  packageSprite.collide(dropzoneSprite3);

  //Package Moves with Helicopter
  if(packageBody.isStatic == true){
	Body.setPosition(packageBody,{x:helicopterSprite.x,y:helicopterSprite.y});
  }

  //If you drop the package in the safe zone, you win
  if(packageSprite.x>315&&packageSprite.x<485&&packageSprite.y>540&&packageSprite.y<640){
	win=1;
  }
  else if(packageSprite.collide(groundSprite)){
	win = 0;
  } 

  //Various Texts
  if(win == 1){
	text("MISSION SUCCEEDED",300,200);
  }
  else if(win == 0){
	text("MISSION FAILED, RELOAD PAGE",130,200);
  } 
  else{
	text("LAND THE PACKAGE IN THE SAFE ZONE",130,200);
	text("PRESS [DOWN] TO RELEASE",200,250);
  }

  text(mouseX+","+mouseY, mouseX, mouseY);

  drawSprites();
 
}

//If the down arrow is pressed, package is released
function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    Body.setStatic(packageBody,false);
  }
}