let canvasCentreX = canvasWidth / 2; // Centre of canvas (x coordinates)
let canvasCentreY = canvasHeight / 2; // Centre of canvas (y coordinates)
let sunGrowing = true; // Checks whether the sun is growing or shrinking
let firstRun = true; // Checks whether run has been run already

let stars = []; // Array of stars to be drawn
let starAmount = 400; // Number of stars to be drawn

let lineThickness = 1.5; // Thickness of drawn lines
let ringSize = 800; // Size of solar system rings
let sunSize = 140; // Size of sun
let planetSize = 2500; // Size of initial planet
let rotationAngle = [0, 0, 0, 0]; // Rotation amounts for each planet

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(0); // Black

  // Solar system appearance
  fill(0); // Black
  stroke(255); // White
  strokeWeight(lineThickness);

  // Solar system's 4 rings
  for(let i = 0; i < 4; i++) {
    let circleSize = ringSize - (i * 160);
    ellipse(canvasCentreX, canvasCentreY, circleSize);
  }  

  strokeWeight(4); // Stars appearance

  // Randomises x and y coordinates for each star in the stars array
  if(firstRun) {
    for (let i = 0; i < starAmount; i++) { // Create a number of stars equal to starAmount variable
      let starX = random(0, canvasWidth); // Randomise x coordinate
      let starY = random(0, canvasHeight); // Randomise y coordinate
      stars.push({ x: starX, y: starY, brightness: 0 }); // apply values to stars array
    }
    firstRun = false; // Update firstRun so that this code only runs once
  }

  // Draws each star from the array at 125 counter intervals
  for (let i = 0; i < starAmount; i++) {
    if (counter > i * (2500 / starAmount)) {
      stroke(stars[i].brightness);
      point(stars[i].x, stars[i].y); // draws star
      stars[i].brightness += 0.2; // Increments star brightness  
    }
  }

  // Solar system appearance
  fill(0); // Black
  stroke(255); // White
  strokeWeight(lineThickness);

  // Sun pulsing
  ellipse(canvasCentreX, canvasCentreY, sunSize);

  if(sunSize >= 160) {
    sunGrowing = false;
  }
  else if(sunSize <= 140) {
    sunGrowing = true;
  }

  if(sunGrowing) {
    sunSize += 0.2;
  }
  else {
    sunSize -= 0.2;
  }

  // Rotating Planet 1 around rings
  push(); 
  translate(canvasCentreX, canvasCentreY);
  rotate(rotationAngle[0]);
  let otherSize = map(other, 80, 90, 60, 80); // Change size of planet using the 'other' volume channel
  ellipse(0, -160, otherSize); // Planet 1
  pop();

  // Rotating Planet 2 around rings
  push(); 
  translate(canvasCentreX, canvasCentreY);
  rotate(rotationAngle[1]);
  let bassSize = map(bass, 70, 80, 60, 80); // Change size of planet using the 'bass' volume channel
  ellipse(0, 240, bassSize); // Planet 2
  pop();

  // Rotating Planet 3 around rings
  push(); 
  translate(canvasCentreX, canvasCentreY);
  rotate(rotationAngle[2]);
  let vocalSize = map(vocal, 20, 30, 60, 80); // Change size of planet using the 'vocal' volume channel
  ellipse(0, -320, vocalSize); // Planet 3
  pop();

  // Rotating Planet 4 around rings
  push(); 
  translate(canvasCentreX, canvasCentreY);
  rotate(rotationAngle[3]);
  let drumSize = map(drum, 30, 50, 60, 80); // Change size of planet using the 'drum' volume channel
  ellipse(0, 400, drumSize); // Planet 4
  pop();
  
  // Increments angle values
  rotationAngle[0]++; // Planet 1
  rotationAngle[1] += 2; // Planet 2
  rotationAngle[2] += 1.3; // Planet 3
  rotationAngle[3] += 0.5; // Planet 4

  // Planet transition that will only play once music begins
  if(planetSize > 0 && counter > 0) {
    ellipse(canvasCentreX, canvasCentreY, planetSize);
    planetSize -= 20;
  }

  // Allows you to track counter value as music is playing 
  let seconds = counter
  
  if(seconds > 0) {
    textSize(60);
    text(nf(seconds, 3, 2), 20, height-20);
  }
}















// ORIGINAL CODE BELOW

// textFont('Verdana'); // please use CSS safe fonts
// rectMode(CENTER)
// textSize(24);

  //  let bar_spacing = height / 10;
  //  let bar_height = width / 12;
  //  let bar_pos_x = width / 2;
 

  //  // vocal bar is red
  //  fill(200, 0, 0);
  //  rect(bar_pos_x, height / 2 + 1 * bar_spacing, 4 * vocal, bar_height);
  //  fill(0);
  //  text("vocals", bar_pos_x, height / 2 + 1 * bar_spacing + 8);
 
  //  // drum bar is green
  //  fill(0, 200, 0);
  //  rect(bar_pos_x, height / 2 + 2 * bar_spacing, 4 * drum, bar_height);
  //  fill(0);
  //  text("drums", bar_pos_x, height / 2 + 2 * bar_spacing + 8);
 
  //  // bass bar is blue
  //  fill(50, 50, 240);
  //  rect(bar_pos_x, height / 2 + 3 * bar_spacing, 4 * bass, bar_height);
  //  fill(0);
  //  text("bass", bar_pos_x, height / 2 + 3 * bar_spacing + 8);
 
  //  // other bar is white
  //  fill(200, 200, 200);
  //  rect(bar_pos_x, height / 2 + 4 * bar_spacing, 4 * other, bar_height);
  //  fill(0);
  //  text("other", bar_pos_x, height / 2 + 4 * bar_spacing + 8);
  //  fill(255, 255, 0);
 
  //  // display "words"
  //  textAlign(CENTER);
  //  textSize(vocal);
  //  text(words, width/2, height/3);