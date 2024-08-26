let gradientBrightness = 0 // Brightness of gradient
let sunSize = 800; // Size of sun (inner circle)
let lineThickness = 1.5 // Thickness of drawn lines
let canvasCentreX = canvasWidth / 2 // Centre of canvas (x coordinates)
let canvasCentreY = canvasHeight / 2 // Centre of canvas (y coordinates)
let rotationAngle = [0, 0, 0, 0] // Rotation amounts for each planet

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(0); // Black
  fill(0); // Black
  stroke(255); // White
  strokeWeight(lineThickness);

  // Solar system's sun and 4 rings
  for(let i = 0; i < 5; i++) {
    let circleSize = sunSize - (i * 160);
    ellipse(canvasCentreX, canvasCentreY, circleSize);
  }

  push(); 
  
  // Rotating Planets around solar system's rings
  translate(canvasCentreX, canvasCentreY);

  rotate(rotationAngle[0]);
  ellipse(0, -160, 50); // Planet 1
  rotationAngle[0] += 2; // Increments angle value
  
  rotate(rotationAngle[1]);
  ellipse(0, 240, 50); // Planet 2
  rotationAngle[1] += 0.1; // Increments angle value
  
  rotate(rotationAngle[2]);
  ellipse(0, -320, 50); // Planet 3
  rotationAngle[2] -= 3; // Increments angle value
  
  rotate(rotationAngle[3]);
  ellipse(0, 400, 50); // Planet 4
  rotationAngle[3] -= 0.5; // Increments angle value

  pop();

  gradientBrightness++;
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