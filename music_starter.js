let canvasCentreX = canvasWidth / 2; // Centre of canvas (x coordinates)
let canvasCentreY = canvasHeight / 2; // Centre of canvas (y coordinates)
let firstRun = true; // Checks whether run has been run already
let lineThickness = 1.5; // Thickness of drawn lines

let stars = []; // Array of stars to be drawn
let starAmount = 400; // Number of stars to be drawn

let vocalHistory = []; // Array of vocal's value history
let drumHistory = []; // Array of drum's value history
let bassHistory = []; // Array of bass' value history
let otherHistory = []; // Array of other's value history

let nebulaBrightness = 0; // Nebula's stroke brightness
let nebulaRadius; // Nebula's radius
let nebulaAngle; // Nebula vertex's current angle around circle (polar coordinates)

let sunRaysBrightness = 0; // Sun rays' stroke brightness
let sunRaysRadius; // Sun rays' radius
let sunRaysAngle; // Sun ray vertex's current angle around circle (polar coordinates)
let sunRaysLength = -40; // Length of sun rays' lines

let ringSize = 800; // Size of solar system rings

let sunGrowing = true; // Checks whether the sun is growing or shrinking
let sunSize = 140; // Size of sun
let sunColourH = 10; // Sun's hue (starts at yellow)
let sunColourS = 0; // Sun's saturation
let sunColourB = 100; // Sun's brightness

let planetSize1 = 2500; // Size of intro planet
let planetSize2 = 0; // Size of outro planet
let planetsY = [-160, 240, -320, 400]; // Planets y coordinates
let rotationAngle = [0, 0, 0, 0, 0]; // Array of rotation speeds for the planets and the spaceship
let angleIncrement = []; // Array of icrement amounts for each planet's rotation speed

let spaceshipX = -419 // Spaceship x coordinates
let spaceshipY = -50 // Spaceship y coordinates
let spaceshipBrightness = 255; // Spaceship's stroke brightness

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // Appearance
  colorMode(HSB, 100); // HSB instead of RGB values for colour
  background(0); // Black
  fill(0); // Black
  stroke(255); // White
  strokeWeight(lineThickness);

  // Drawn elements
  if(counter > 0) { // Prevents elements from being drawn until song is run
    drawStars(counter); // Draws the stars
    drawNebula(counter, vocal); // Draws the nebula
    drawSunRays(words, vocal, drum, bass, other, counter); // Draws the sun rays
    drawExtraRings(other, counter); // Draws extra rings when the counter is between 2530 and 5100, controlled by 'other' volume channel
    drawSolarSystem(counter); // Draws the solar system
    drawPlanets(words, vocal, drum, bass, other, counter); // Draws the planets
    planetRotation(words, vocal, drum, bass, other); // Rotates the planets
    drawSpaceship(counter); // Draws the spaceship
    drawSun(counter); // Draws the Sun
    drawPlanetTransition(counter); // Draws the planet intro and outro transitions
  }
}

function drawStars(counter) {
  push();
  strokeWeight(4);

  // Randomises x and y coordinates for each star in the stars array
  if(firstRun) {
    for (let i = 0; i < starAmount; i++) { // Create a number of stars equal to starAmount variable
      let starX = random(0, canvasWidth); // Randomise x coordinate
      let starY = random(0, canvasHeight); // Randomise y coordinate
      stars.push({ x: starX, y: starY, brightness: 0 }); // Codiumate-assisted code, applies values to stars array
    }
    firstRun = false; // Update firstRun so that this code only runs once
  }

  // Draws each of the stars (which fade in at the beginning of the song, and fade out towards the end of the song)
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

function addToHistory(history, d) {
  history.push(d);
  if(history.length >= (width-1)/4) {
    history.shift();
  }
}

function drawNebula(counter, vocal) {
  if (counter > 0 && counter < 7000) {
    push();
    translate(canvasCentreX, canvasCentreY);
    rotate(90); // Nebula starts being drawn at the bottom of the canvas (to hide where the nebula shape begins/ends)
    angleMode(RADIANS); // Sets angle calculations to radians to allow nebula to be drawn using polar coordinates
    stroke(nebulaBrightness);
    noFill(); 

    addToHistory(vocalHistory, vocal); // music_history code to allow the nebula shape to be drawn according to 'vocal' values
   
    for (let nebulaSize = 700; nebulaSize < 1100; nebulaSize += 100) { // Draws nebula 4 times, increasing in size by 100 for each iteration
      beginShape();

      // Code written with the help of The Coding Train's "3.4 Polar Coordinates - The Nature of Code" video (https://www.youtube.com/watch?v=O5wjXoFrau4&t=884s)
      for (let i = 0; i <= 100; i++) { // Draws each of the nebula's vertices
        let historyValue = vocalHistory[vocalHistory.length - i]; // length of nebula's vertices
        nebulaRadius = map(historyValue, 0, 100, nebulaSize, nebulaSize + 300); // Changes nebula's radius depending on 'vocal' values
        nebulaAngle = map(i, 0, 100, 0, PI * 2); // Maps nebula's angle to current i value (so that the vertexes are drawn evenly in a circle)
        let x = nebulaRadius * cos(nebulaAngle); // Converts polar coordinates to cartesian coordinates
        let y = nebulaRadius * sin(nebulaAngle); // Converts polar coordinates to cartesian coordinates
        vertex(x, y); // Draws each vertex of the nebula
      }

      endShape();
    }

    // Fades Nebula in up to a brightness of 50 (grey)
    if (counter < 6700 && nebulaBrightness < 50) {
      nebulaBrightness += 0.1; // Increments brightness
    }

    // Fades Nebula to black
    else if (counter > 6700) {
      nebulaBrightness -= 0.5; // Decrements brightness
    }

    pop();
    angleMode(DEGREES); // Resets angle calculations back to degrees
  }  
}

function drawSunRays(words, vocal, drum, bass, other, counter) {
  if (counter > 6900) {
    push();
    translate(canvasCentreX, canvasCentreY);
    rotate(90); // Sun rays start being drawn at the bottom of the canvas (to hide where the sun rays begin/end)
    angleMode(RADIANS); // Sets angle calculations to radians to allow nebula to be drawn using polar coordinates
    stroke(sunRaysBrightness);

    // Music_history code to allow the sun rays to be drawn according to volume channel values
    addToHistory(vocalHistory, vocal);
    addToHistory(drumHistory, drum);
    addToHistory(bassHistory, bass);
    addToHistory(otherHistory, other);

    // Sun rays controlled by 'vocal'
    for (let i = 0; i <= 12; i++) {
      let historyValue = vocalHistory[vocalHistory.length - i]; // Draws each of the sun rays' vertices
      sunRaysRadius = map(historyValue, 0, 40, 5, 10); // Changes sun rays' radius depending on volume channel values
      sunRaysAngle = map(i, 0, 10, 0, PI * 2); // Maps sun rays' angle to current i value (so that the vertexes are drawn evenly in a circle)
      let x = sunRaysRadius * cos(sunRaysAngle); // Converts polar coordinates to cartesian coordinates
      let y = sunRaysRadius * sin(sunRaysAngle); // Converts polar coordinates to cartesian coordinates
      line(x * sunRaysLength, y * sunRaysLength, x, y); // Draws lines
      ellipse(x * sunRaysLength, y * sunRaysLength, 5, 5);
    }

    // Sun rays controlled by 'drum'
    for (let i = 0; i <= 50; i++) {
      let historyValue = drumHistory[drumHistory.length - i];
      sunRaysRadius = map(historyValue, 0, 60, 9, 5);
      sunRaysAngle = map(i, 0, 50, 0, PI * 2);
      let x = sunRaysRadius * cos(sunRaysAngle);
      let y = sunRaysRadius * sin(sunRaysAngle);
      line(x * sunRaysLength, y * sunRaysLength, x, y);
      ellipse(x * sunRaysLength, y * sunRaysLength, 3, 3);
    }    

    // Sun rays controlled by 'bass'
    for (let i = 0; i <= 30; i++) {
      let historyValue = bassHistory[bassHistory.length - i];
      sunRaysRadius = map(historyValue, 0, 40, 5, 20);
      sunRaysAngle = map(i, 0, 30, 0, PI * 2);
      let x = sunRaysRadius * cos(sunRaysAngle);
      let y = sunRaysRadius * sin(sunRaysAngle);
      line(x * sunRaysLength, y * sunRaysLength, x, y);
      ellipse(x * sunRaysLength, y * sunRaysLength, 10, 10);
    }  

    // Sun rays controlled by 'other'
    for (let i = 0; i <= 20; i++) {
      let historyValue = otherHistory[otherHistory.length - i];
      sunRaysRadius = map(historyValue, 50, 100, 5, 15);
      sunRaysAngle = map(i, 0, 20, 0, PI * 2);
      let x = sunRaysRadius * cos(sunRaysAngle);
      let y = sunRaysRadius * sin(sunRaysAngle);
      line(x * sunRaysLength, y * sunRaysLength, x, y);
      ellipse(x * sunRaysLength, y * sunRaysLength, 8, 8);
    }

    // Fades sun rays in
    if (counter > 7000 && sunRaysBrightness < 255) {
      sunRaysBrightness += 0.5; // Increments brightness
    }

    pop();
    angleMode(DEGREES); // Resets angle calculations back to degrees
  }    
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

function drawSolarSystem(counter) {
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
}

function drawPlanets(words, vocal, drum, bass, other, counter) {
  // Draws planets
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

  // Transition that shrinks planets
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
}

function planetRotation(words, vocal, drum, bass, other) {
  // Sets increment values for planet rotation animation
  angleIncrement[0] = map(other, 0, 100, 0.3, 1.7);
  angleIncrement[1] = map(bass, 0, 100, 1, 2.4);
  angleIncrement[2] = map(vocal, 0, 100, 0.7, 2.1);
  angleIncrement[3] = map(drum, 0, 100, 0.1, 1.5);
  angleIncrement[4] = 1;

  // Increments angle values to animate planet and spaceship rotations
  for (let i = 0; i < rotationAngle.length; i++) {
    rotationAngle[i] += angleIncrement[i];
  }
}

function drawSpaceship(counter) {
  if (spaceshipX < 0 && counter < 6900) {
    push(); 
    translate(canvasCentreX, canvasCentreY);
    rotate(rotationAngle[4]);

    // Transition that shrinks spacehsip
    if (counter > 6700) {
      spaceshipX += 7; // Decrements size of spaceship to make it slowly disappear behind sun
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

function drawSun(counter) {
  // Sun
  push();
  stroke(sunColourH, sunColourS, sunColourB);
  ellipse(canvasCentreX, canvasCentreY, sunSize);
  pop();

  if (counter > 2000 && counter < 5000 && sunColourS < 100) {
    sunColourS += 0.1; // Increments sun's saturation to go from white to yellow
  }
  else if (counter >= 5000 && counter < 6500 & sunColourH > 0) {
    sunColourH -= 0.01; // Decrements sun's hue to go from yellow to red
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

function drawPlanetTransition(counter) {
  // Planet intro that will only play once music begins
  if(planetSize1 > 0 && counter > 0) {
    ellipse(canvasCentreX, canvasCentreY, planetSize1);
    planetSize1 -= 20;
  }

    // Planet outro that will play once music ends
    if(counter > 8200) {
      ellipse(canvasCentreX, canvasCentreY, planetSize2);
      planetSize2 += 20;
    }

}