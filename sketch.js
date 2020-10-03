var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, ObstaclesGroup;
var score;
var survivalTime=0 ;
var ground;

function preload()
{
monkey_running =       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}

function setup() 
{
  
createCanvas(600,600);  
// creating monkey 
  
monkey=createSprite(80,315,20,20);  
monkey.addAnimation("running",monkey_running); 
monkey.scale=0.1;
  
// creating ground   
ground=createSprite(400,350,900,10);  
ground.velocityX=-4;  
ground.x=ground.width/2;
console.log(ground.x);

// creating food group and obstacles group 
FoodGroup=new Group();  
ObstaclesGroup=new Group();
score=0;  

}

function draw() 
{
  background("white");
    if(ground.x<0)
    {  
    ground.x=ground.width/2;
    }  
      
//jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 156.5 )
    {
    monkey.velocityY = -12;    
    }  

//add gravity
monkey.velocityY = monkey.velocityY + 0.8
    
//spawn food group  
spawnFood();
// spawn obstacles group   
spawnObstacles();  
 
//stop monkey from falling down
monkey.collide(ground);
  
//score
stroke("white");
textSize(20); 
fill("white");
text("Score: "+score,500,50);

   if(ObstaclesGroup.isTouching(monkey))  
    {
    ground.velocityX=0; 
    monkey.velocityY=0; 
    ObstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);  
    }
   
stroke("black");  
textSize(20);  
fill("black");  
survivalTime=Math.ceil(frameCount/frameRate());  
text("SurvivalTime : "+survivalTime,100,50);
 
drawSprites();  
  
}

function spawnFood()
{
   if (frameCount % 80 === 0) 
   {
   banana=createSprite(600,300,40,20);
   banana.y = random(120,200);
   banana.addImage(bananaImage);
   banana.scale = 0.10;
   banana.velocityX = -3;
   
//assign lifetime to the banana
banana.lifetime = 200;
  
//adding cloud to the group
FoodGroup.add(banana);  
  
   }
}

function spawnObstacles()
{
   if (frameCount % 200 === 0)
   {
   obstacle=createSprite(800,320,10,30);
   obstacle.addImage(obstacleImage);    
   obstacle.velocityX = -6;
     
//assign scale and lifetime to the obstacle           
obstacle.scale = 0.15;
obstacle.lifetime = 100; 
  
//add each obstacle to the group
ObstaclesGroup.add(obstacle);
   } 
}