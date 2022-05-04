/**
 * @author Ambrosi Marco
 * @author Mehdi Ouassou
 * @version 1.0 22-05-04
 */
const W = 1600, H = 900;
var clickInc = 1;
var autoInc = 0;
var points = 0;
var today = new Date();
var lastTime = Date.now();

/**images = ['ball']
image = [];

function onload(){
    for(i = 0; i < images.length; i++){
        name = images[i];
        filename = './images/' + name + '.png';
        image[name] = loadImage(filename);
    }
}*/

function setup(){
    createCanvas(W, H);
}

class Rectangle { // hitbox e bottoni
    constructor(x, y,width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    draw(color){
        fill(color);
        rect(this.x, this.y, this.width, this.height);
    }
}
var wRectangle = 250;
var hRectangle = 500;
var hitBox = new Rectangle(W/2 - wRectangle/2, H/2 - hRectangle/2, wRectangle, hRectangle);

var wButton = 200;
var hButton = 70;

//var buttons = new Array(3);

//for (let i; i > buttons.length; i++) {
//    buttons.push(new Rectangle(W - wButton, i * 70, wButton, hButton));
//}

var Button1 = new Rectangle(W-wButton, 0, wButton, hButton);
var Button2 = new Rectangle(W-wButton, 70, wButton, hButton);
var Button3 = new Rectangle(W-wButton, 140, wButton, hButton);

function overlaps(mouseX, mouseY, Rectangle){
    return mouseX > Rectangle.x && mouseX < Rectangle.x + Rectangle.width && mouseY > Rectangle.y && mouseY < Rectangle.y + Rectangle.height;
}
function mouseClicked(){
    if(overlaps(mouseX, mouseY, hitBox)){//collisione con rettangolo 
        points += clickInc;
        fill('black');
        text(points, 10, 30);
    }else if(overlaps(mouseX, mouseY, Button1)){
        if(points >= 10){
            points -= 10;
            autoInc += 1;
        }
    }else if(overlaps(mouseX, mouseY, Button2)){
        if(points >= 100){
            points -= 100;
            clickInc *= 2;
        }        
    }else if(overlaps(mouseX, mouseY, Button3)){
        //fa qualcosa
    }
}

function addPunches(){
    if(Date.now() - lastTime > 1000){
        points += autoInc;
        lastTime = Date.now();
    }
}

function draw(){
    background(250,218,221);
    Button1.draw('brown');//upgrade 1
    Button2.draw('brown');
    Button3.draw('brown');
    hitBox.draw('red');
    fill('black');
    textSize(50);
    text(points, 10, 50);
    addPunches();
}
