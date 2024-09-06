let canvasCentreX = canvasWidth / 2; // Centre of canvas (x coordinates)
let canvasCentreY = canvasHeight / 2; // Centre of canvas (y coordinates)
let sunGrowing = true; // Checks whether the sun is growing or shrinking
let firstRun = true; // Checks whether run has been run already
let stars = []; // Array of stars to be drawn
let starAmount = 400; // Number of stars to be drawn
let lineThickness = 1.5; // Thickness of drawn lines
let ringSize = 800; // Size of solar system rings
let sunSize = 140; // Size of sun
let sunColourH = 10; // Sun's Hue (starts at yellow)
let sunColourS = 0; // Sun's Saturation
let planetSize = 2500; // Size of initial planet
let planetsY = [-160, 240, -320, 400]; // Planets y coordinates
let rotationAngle = [0, 0, 0, 0, 0]; // Array of rotation speeds for each planet
let angleIncrement = []; // Array of icrement amounts for each planet's rotation speed
let spaceshipX = -419 // Spaceship x coordinates
let spaceshipY = -50 // Spaceship y coordinates
let spaceshipBrightness = 255; // Spaceship's stroke brightness

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  colorMode(HSB, 100); // HSB instead of RGB values for colour
  background(0); // Black
  fill(0); // Black
  stroke(255); // White
  strokeWeight(lineThickness);

  drawStars(counter); // Draws the stars
  drawExtraRings(other, counter); // Draws extra rings when the counter is between 2530 and 5100, controlled by 'other' volume channel

  // Draws solar system's 4 rings
  for(let i = 0; i < 4; i++) {
    let circleSize = ringSize - (i * 160);
    push();
    noFill();
    ellipse(canvasCentreX, canvasCentreY, circleSize);
    pop();
  }

  // Shrinks solar system
  if (counter > 6700) {
    ringSize -= 12; // Decrements size of solar system to make it slowly disappear behind sun
  }

  drawPlanets(words, vocal, drum, bass, other, counter); // Draws the planets
  drawSpaceship(counter); // Draws the spaceship
  planetRotation(words, vocal, drum, bass, other); // Rotates the planets
  drawSun(counter); // Draws the Sun

  // Planet transition that will only play once music begins
  if(planetSize > 0 && counter > 0) {
    ellipse(canvasCentreX, canvasCentreY, planetSize);
    planetSize -= 20;
  }

  displayCounter(counter); // Allows you to track counter value as music is playing 
}

function drawSun(counter) {
  // Sun
  push();
  stroke(sunColourH, sunColourS, 100);
  ellipse(canvasCentreX, canvasCentreY, sunSize);
  pop();

  if (counter > 2000 && counter < 5000 && sunColourS < 100) {
    sunColourS += 0.1; // Increments sun's saturation to go from white to yellow
  }
  else if (counter >= 5000 && counter < 6500 & sunColourH > 0) {
    sunColourH -= 0.01; // Increments sun's hue to go from yellow to red
  }
  else if (counter >= 6500 && sunColourH < 50) {
    sunColourH += 0.4; // Increments sun's hue to go from red to blue
  }

  // Sun pulsing
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
}

function drawStars(counter) {
  push();
  strokeWeight(4); // Stars appearance

  // Randomises x and y coordinates for each star in the stars array
  if(firstRun) {
    for (let i = 0; i < starAmount; i++) { // Create a number of stars equal to starAmount variable
      let starX = random(0, canvasWidth); // Randomise x coordinate
      let starY = random(0, canvasHeight); // Randomise y coordinate
      stars.push({ x: starX, y: starY, brightness: 0 }); // Codiumate-assisted code, applies values to stars array
    }
    firstRun = false; // Update firstRun so that this code only runs once
  }

  for (let i = 0; i < starAmount; i++) {
    if(counter < 3000 && counter > i * (2500 / starAmount) && stars[i].brightness < 255) {
      stars[i].brightness += 0.2; // Codiumate-assisted code (array syntax), increments brightness of the stroke
    }
    else if(counter > 4000 + i * (1800 / starAmount) && stars[i].brightness > 0) {
      stars[i].brightness -= 0.2; // Decrements brightness of the star's stroke to fade it out
    }
    stroke(stars[i].brightness); // Sets brightness of stroke
    point(stars[i].x, stars[i].y); // Codiumate-assisted code (array syntax), draws star
  }

  pop();
}

function drawSpaceship(counter) {
  if (spaceshipX < 0 && counter < 6900) {
    push(); 
    translate(canvasCentreX, canvasCentreY);
    rotate(rotationAngle[4]);
  
    if (counter > 6700) {
      spaceshipX += 7; // Decrements size of solar system to make it slowly disappear behind sun
      stroke(spaceshipBrightness);
      spaceshipBrightness -= 4; // Decrements ship's stroke brightness to create a fade effect
    }
  
    // Spaceship Body
    ellipse(spaceshipX + 25, spaceshipY, 50, 50);
    rect(spaceshipX, spaceshipY, 50, 60);
    quad(spaceshipX + 10, spaceshipY + 60, spaceshipX + 40, spaceshipY + 60, spaceshipX + 35, spaceshipY + 80, spaceshipX + 15, spaceshipY + 80);
    ellipse(spaceshipX + 25, spaceshipY + 30, 20, 20);
    line(spaceshipX + 20, spaceshipY + 60, spaceshipX + 20, spaceshipY + 80);
    line(spaceshipX + 30, spaceshipY + 60, spaceshipX + 30, spaceshipY + 80);
  
    // Spaceship Exhaust Trail
    ellipse(spaceshipX + 25, spaceshipY + 105, 25, 25);
    beginShape();
    vertex(spaceshipX + 12.5, spaceshipY + 105);
    vertex(spaceshipX + 20, spaceshipY + 140);
    vertex(spaceshipX + 25, spaceshipY + 120);
    vertex(spaceshipX + 30, spaceshipY + 133);
    vertex(spaceshipX + 37.5, spaceshipY + 105);
    endShape();
  
    pop();  
  }
}

function drawPlanets(words, vocal, drum, bass, other, counter) {
  if (counter > 6700 && planetsY[0] < 0) {
    planetsY[0] += 7;
  }
  if (counter > 6700 && planetsY[1] > 0) {
    planetsY[1] -= 7;
  }
  if (counter > 6700 && planetsY[2] < 0) {
    planetsY[2] += 7;
  }
  if (counter > 6700 && planetsY[3] > 0) {
    planetsY[3] -= 7;
  }

  if (counter < 6900) {
    // Rotating Planet 1 around rings
    push(); 
    translate(canvasCentreX, canvasCentreY);
    rotate(rotationAngle[0]);
    let otherSize = map(other, 80, 90, 60, 80); // Change size of planet using the 'other' volume channel
    ellipse(0, planetsY[0], otherSize); // Planet 1
    pop();

    // Rotating Planet 2 around rings
    push(); 
    translate(canvasCentreX, canvasCentreY);
    rotate(rotationAngle[1]);
    let bassSize = map(bass, 70, 80, 60, 80); // Change size of planet using the 'bass' volume channel
    ellipse(0, planetsY[1], bassSize); // Planet 2
    pop();

    // Rotating Planet 3 around rings
    push(); 
    translate(canvasCentreX, canvasCentreY);
    rotate(rotationAngle[2]);
    let vocalSize = map(vocal, 20, 30, 60, 80); // Change size of planet using the 'vocal' volume channel
    ellipse(0, planetsY[2], vocalSize); // Planet 3
    pop();

    // Rotating Planet 4 around rings
    push(); 
    translate(canvasCentreX, canvasCentreY);
    rotate(rotationAngle[3]);
    let drumSize = map(drum, 30, 50, 60, 80); // Change size of planet using the 'drum' volume channel
    ellipse(0, planetsY[3], drumSize); // Planet 4
    pop();    
  }
}

function displayCounter(counter) {
  let seconds = counter
  
  if(seconds > 0) {
    textSize(60);
    text(nf(seconds, 3, 2), 20, height-20);
  }
}

function planetRotation(words, vocal, drum, bass, other) {
  // Sets increment values for planet rotation animation
  angleIncrement[0] = map(other, 0, 100, 0.3, 1.7);
  angleIncrement[1] = map(bass, 0, 100, 1, 2.4);
  angleIncrement[2] = map(vocal, 0, 100, 0.7, 2.1);
  angleIncrement[3] = map(drum, 0, 100, 0.1, 1.5);
  
  // Increments angle values to animate planet rotation
  rotationAngle[0] += angleIncrement[0]; // Planet 1
  rotationAngle[1] += angleIncrement[1]; // Planet 2
  rotationAngle[2] += angleIncrement[2]; // Planet 3
  rotationAngle[3] += angleIncrement[3]; // Planet 4
  rotationAngle[4]++; // Spaceship
}

function drawExtraRings(other, counter) {
  if (counter > 2530 && counter < 5100) {
    let ringCount = map(other, 70, 100, 0, 4.5, true); // Maps amount of rings to bass value
    ringCount = pow(ringCount, 4); // Exponentially fades the extra rings in

    // Fades the extra rings out
    if (counter > 5000) {
      let ringScaler = map(counter, 5000, 5100, 1, 0);
      ringCount *= ringScaler;
    }

    // Draws each of the rings (controlled by 'other' value)
    for(let i = 0; i < ringCount; i++) {
      let colourRingSize = ringSize + (i * 30);
      push();
      noFill();
      let colourH = random(0, 20); // Randomises ring colour's hue between yellow and red
      let colourS = random(0, 255); // Randomises ring colour's staturation
      stroke(colourH, colourS, 255);
      ellipse(canvasCentreX, canvasCentreY, colourRingSize);
      pop();
    }
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