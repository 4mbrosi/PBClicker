/**
 * @author Ambrosi Marco
 * @author Mehdi Ouassou
 * @version 1.0 22-05-04
 */
 const W = 1600, H = 900;
 var clickInc = 1;
 var autoInc = 1;
 var points = 0;
 var lastHit;
 var lastTime = Date.now();
 var chinesePunch = 20000;
 var timer = new Date();
 var flagHit = true;
 
 
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
     constructor(x, y, width, height, text) { // ECMAscript doesn't allow constructor overloading.
         this.x = x;
         this.y = y;
         this.height = height;
         this.width = width;
         this.text = text;
     }

     draw(color){
         fill(color);
         rect(this.x, this.y, this.width, this.height);
         fill("black");
         if (typeof this.text == "string") { // || text instanceof String) Check if it's undefined or a typo
            textSize(30);
            text(this.text, this.x + 5, this.y + 40); //need a variable padding + auto center here
         }
     }
 }
 var wRectangle = 250;
 var hRectangle = 500;
 var hitBox = new Rectangle(W/2 - wRectangle/2, H/2 - hRectangle/2, wRectangle, hRectangle);
 
 //var buttons = new Array(3);
 
 //for (let i; i > buttons.length; i++) {
 //    buttons.push(new Rectangle(W - wButton, i * 70, wButton, hButton));
 //}
 
 var wButton = 200;
 var hButton = 70;
 var Button1 = new Rectangle(W-wButton, 0, wButton, hButton, "Double Punch");
 var Button2 = new Rectangle(W-wButton, 70, wButton, hButton, "Multiply Auto");
 var Button3 = new Rectangle(W-wButton, 140, wButton, hButton, "Kung Fu Kick");
 
 function overlaps(mouseX, mouseY, Rectangle){
     return mouseX > Rectangle.x && mouseX < Rectangle.x + Rectangle.width && mouseY > Rectangle.y && mouseY < Rectangle.y + Rectangle.height; //thanks libGDX!
 }
 
 function kungFuEvent(){
     //camminata
     points += chinesePunch;
     //suono pugno
 }
 
 var costs = [100, 1000, 10000];
 
function punchAnimation() {
    if (Date.now() - lastHit > 100 && flagHit == false){
        hitBox.x -= 4;
        hitBox.y += 4;
        hitBox.width += 10;
        hitBox.height += 10;
        console.log("brah");
        flagHit = true;  
    }
}

 function mouseClicked(){
     if(overlaps(mouseX, mouseY, hitBox)){//click sul rettangolo 
        if (flagHit) {
            points += clickInc;
            hitBox.x += 4;
            hitBox.y -= 4;
            hitBox.width -= 10;
            hitBox.height -= 10;
            lastHit = Date.now();
            flagHit = false;
        }
    }
     else if(overlaps(mouseX, mouseY, Button1)){//bottone 1
         if(points >= costs[0]){

            points -= costs[0];
            costs[0] *= 2;
            clickInc *= 2;
        }  
     }else if(overlaps(mouseX, mouseY, Button2)){//bottone 2
         if(points >= costs[1]){
            points -= costs[1];
            costs[1] *= 2;
            autoInc *= 3;
        }      
    }else if(overlaps(mouseX, mouseY, Button3)){//bottone 3
         if(points >= costs[2]){
            points -= costs[2];
            costs[2] *= 2;
            kungFuEvent()
            chinesePunch *= 2;
        } 
    }
 }
 
 function addPunches(){
     if(Date.now() - lastTime > 1000 && autoInc > 1){
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
    punchAnimation();
 }
