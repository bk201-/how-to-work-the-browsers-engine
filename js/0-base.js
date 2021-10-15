// Generate new snowflake
function generateSnowflake() {
  const div = document.createElement('div');
  div.className = 'snowflake';
  div.appendChild(document.createTextNode('\u2744'));

  // Randomize speed
  div.stepY = 2 + Math.random() * 3;
  div.stepX = 0.1 + Math.random() * 0.1;

  // Start from the sky
  div.x = 0;
  div.y = 0;
  return div;
}

// Add snowflake to the air
function addToScene(snowflake, fromTop) {
  document.body.appendChild(snowflake);

  // Randomize position
  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  snowflake.style.top = fromTop ? 0 : Math.random() * window.innerHeight + 'px';
}

function letItSnow(n) {
  while (n-- > 0) {
    addToScene(generateSnowflake());
  }

  animate();
}
