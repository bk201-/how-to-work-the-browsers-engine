function remove(item) {
  item.parentNode.removeChild(item);
}

function updateCounter() {
  const counter = document.getElementById('counter');
  const count = document.getElementsByClassName('snowflake').length;
  const text = document.createTextNode(count.toLocaleString());

  counter.firstChild && counter.removeChild(counter.firstChild);
  counter.appendChild(text);
}

function step() {
  const col = document.querySelectorAll('.snowflake:not(.steady)');

  for (let i = 0, l = col.length; i < l; i++) {
    const item = col[i];
    // Set new position
    item.style.top = item.getBoundingClientRect().top + item.stepY + 'px';
    item.style.left = item.getBoundingClientRect().left + Math.sin((item.x += item.stepX)) + 'px';
  }
}

function check() {
  const col = document.querySelectorAll('.snowflake:not(.steady)');

  for (let i = 0, l = col.length; i < l; i++) {
    const item = col[i];
    const rect = item.getBoundingClientRect();

    // If snowflake reaches the Earth let allow it lay some period
    if (rect.bottom > window.innerHeight) {
      item.classList.add('steady');
      // Add new snowflake
      addToScene(generateSnowflake());
      // Remove current after timer
      setTimeout(remove.bind(null, item), 1000);
    }
  }
}

function animate() {
  updateCounter();
  step();
  check();
  setTimeout(animate, 0);
}
