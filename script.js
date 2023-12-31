var canvas = document.getElementById('canvas');
//Selects Canvas
ctx = canvas.getContext('2d');
//Provides the 2D rendering context for the Canvas
var gm = true;
//GraphicsMagick
var puck_speed = 10;
var xspeed = 0;
var yspeed = 0;
var com_score = 0;
var player_score = 0;
var x_min=30;
var x_max=465;
var y_min=30;
var y_max=600;
//Makes sure the CPU doesn't go of screen

document.addEventListener("mousemove", mouseMoveHandler, false);
//Event is fired at the canvas when a mouse is moved while the cursor is inside it.

function player_mallet(x,y,r)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = "#2A2A72";
    ctx.fill();    
    ctx.closePath();
}

function cpu_mallet(x,y,r)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = "#BB0422";
    ctx.fill();    
    ctx.closePath();
}

function puck_game(x,y,r)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = "#000";
    ctx.fill();    
    ctx.closePath();
}


function draw_goal_crease(x,y,r,s)
{
    ctx.beginPath();
    ctx.lineWidth=4;
    if(s)
      ctx.arc(x, y, r, 0, Math.PI, false);
    else
      ctx.arc(x, y, r, Math.PI, 0, false);
    ctx.strokeStyle = "rgba(48, 79, 134, 0.25)";
    ctx.fillStyle = "rgba(48, 79, 134, 0.06)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //Goal Crease
}

function draw_circle(x,y,r,w)
{
    ctx.beginPath();
    ctx.lineWidth=w;
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.strokeStyle = "rgba(48, 79, 134, 0.25)";
    ctx.fillStyle = "rgba(48, 79, 134, 0.06)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //Center Circle
}

function draw_boundry(x,y,w,h,b)
{
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;  
    ctx.strokeRect(x,y,w,h);
    ctx.closePath();
    //Hitbox for the Hockey Puck
}  

function draw_rink()
//Draws the board
{
    draw_boundry(30,30,440,580,0);
    draw_goal_crease(250,30,70,1);
    draw_circle(250,330,40,4);
    draw_goal_crease(250,610,70,0);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(187, 4, 34, 0.25)";
    ctx.moveTo(30, 330);
    ctx.lineTo(470, 330);
    ctx.stroke();
    ctx.closePath();
    //Center Line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(187, 4, 34, 0.25)";
    ctx.moveTo(30, 200);
    ctx.lineTo(470, 200);
    ctx.stroke();
    ctx.closePath();
    //Red Line 1
    ctx.beginPath();
    ctx.strokeStyle = "rgba(187, 4, 34, 0.25)";
    ctx.moveTo(30, 460);
    ctx.lineTo(470, 460);
    ctx.stroke();
    ctx.closePath();
    //Red line 2
    ctx.beginPath();
    ctx.moveTo(180, 30);
    ctx.lineTo(320, 30);
    ctx.stroke();
    ctx.closePath();
    //CPU Goal 
    ctx.beginPath();
    ctx.moveTo(180, 610);
    ctx.lineTo(320, 610);
    ctx.stroke();
    ctx.closePath();
    //Player Goal
    document.getElementById("com_score").innerHTML = com_score;
    document.getElementById("player_score").innerHTML = player_score;
    //Scoreboard
}

function distance(x1,y1,x2,y2)
{
    var tempx = x2-x1;
    var tempy = y2-y1;
    tempx*=tempx;
    tempy*=tempy;
    return Math.sqrt(tempx+tempy);
}

var Mallet = function(x,y,r)
{
    this.x = x;
    this.y = y;
    this.radius = r
}

var pMallet = new Mallet(250,canvas.height-100,30);
var cMallet = new Mallet(250,100,30);
//Player and CPU starting location and radius

var puck = function (x,y,r) 
{
    this.x = x;
    this.y = y;
    this.radius = r;
}

var puck = new puck(canvas.width/2,canvas.height/2 + 7.5,15); 
//Hockey Puck starting location and radius

function mouseMoveHandler(e) 
{

var relativeX = e.clientX - canvas.offsetLeft;
var relativeY = e.clientY - canvas.offsetTop;

   if(relativeX > 60 && relativeX < canvas.width-60) {
        pMallet.x = relativeX;
    }
    //360
   if(relativeY > 0 && relativeY < 600){
        pMallet.y = relativeY;
    }   

}
//To Control the Player's Puck

function bounce()
{
if(puck.x + xspeed > canvas.width-puck.radius-30 || puck.x + xspeed < puck.radius + 30) {
    xspeed *= -1;
}
//Makes the Puck bounce the puck off the left and right walls
       
if(puck.x>190 && puck.x<330){
    if(puck.y + yspeed > canvas.height+puck.radius-30){
        puck.x = canvas.width/2;
        puck.y = canvas.height/2+100;
        xspeed = 0;
        yspeed = 0 ;
        com_score = com_score + 1;
    }
    //Goal rules for when the CPU scores
    else if(puck.y + yspeed < 30-puck.radius ){
        puck.x = canvas.width/2;
        puck.y = canvas.height/2-100;
        xspeed = 0;
        yspeed = 0;
        player_score = player_score + 1; 
    }
    //Goal rules for when the Player scores
}
//Goal Rules

else{
    if(puck.y + yspeed > canvas.height-puck.radius-30  || puck.y + yspeed  < 30+puck.radius){
        yspeed *= -1;
    }
}
//Makes puck bounce of top and bottom walls when it doesnt hit the goal
}

function play() 
{

ctx.clearRect(0, 0, canvas.width, canvas.height);
draw_rink();
player_mallet(pMallet.x,pMallet.y,pMallet.radius);   
cpu_mallet(cMallet.x,cMallet.y,cMallet.radius,2);   
puck_game(puck.x,puck.y,puck.radius,0);
//Draws Everything

bounce();
setInterval(bounce,10);   
        
var ed = false; 
var er = 1;
//Makes it so the CPU doesn't just hit it down all the time.
var p2s;
//CPU's side to side
if(ed){er=3;}
//Difficulty

if((Math.abs(xspeed)+Math.abs(yspeed))<10 && puck.y<=canvas.height/2){
    if(puck.y-20>cMallet.y){
        cMallet.y+=2;
    }
    else{
        cMallet.y-=2;
    }
}
else if(cMallet.y>100){
    cMallet.y-=2;
}
else if(cMallet.y<100){
    cMallet.y+=2;
}
//Makes it so the CPU can move up and down only for it's part of the rink, and makes it move when the puck moves


if(cMallet.x<x_min)
  {cMallet.x=x_min+30;}
if(cMallet.x>x_max)
  {cMallet.x=x_max+30;}
if(cMallet.y<y_min)
  {cMallet.y=y_min+60;}
if(cMallet.y>y_max)
  {cMallet.y=y_max;}
//Set's the Boundries

if(!ed){p2s = 5;}
else{p2s=3;}
//Sets the CPU's velocity based on the difficulty


if(puck.y<cMallet.y&&puck.x>cMallet.x-30&&puck.x<cMallet.x+30){p2s = -2;}
//The CPU moves out of the way if the puck is not in front it to prevent own goals
if(cMallet.x<puck.x+er){cMallet.x+=p2s;}if(cMallet.x>puck.x-er){cMallet.x-=p2s;}
//Makes the CPU move towards the Puck's x coordinate
       
var pDist = distance(pMallet.x,pMallet.y,puck.x,puck.y);
var cDist = distance(cMallet.x,cMallet.y,puck.x,puck.y);          
      
if(pDist<55){
    var dx = puck.x - pMallet.x;
    var dy = puck.y - pMallet.y;
    dx/=30;
    dy/=30;
    xspeed = dx*puck_speed;
    yspeed = dy*puck_speed;
}
//Makes the Puck move when the Player hits it

else if(cDist<45){
    var cdx = puck.x - cMallet.x;
    var cdy = puck.y- cMallet.y;
    cdx/=45;
    cdy/=45;
    //The Puck's speed is less when the CPU hits it as to make the game easier
    xspeed = cdx*puck_speed;
    yspeed = cdy*puck_speed;
}
//Makes the Puck move when the CPU hits it

puck.x += xspeed;
puck.y += yspeed;
xspeed *=0.985;
yspeed *=0.985;
// Adjustments in the x and y coordianate of the puck

}
    
setInterval(play,10);   
//Calls the Function play every 10 milliseconds
