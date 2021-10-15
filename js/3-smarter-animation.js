function updateCounter() {
  const counter = document.getElementById('counter');
  const count = document.getElementsByClassName('snowflake').length;
  const text = document.createTextNode(count.toLocaleString());

  counter.firstChild && counter.removeChild(counter.firstChild);
  counter.appendChild(text);
}

function animate() {
  const winHeights = window.innerHeight;
  const winWidth = window.innerWidth;
  const col = document.querySelectorAll('.snowflake');
  const snowflakes = [].slice.call(col).map((div) => {
    return {
      div,
      steady: false,
      drop: 0,
    };
  });

  function innerAnimate() {
    const now = Date.now();

    snowflakes
      .map((item) => {
        const { left, top, bottom } = item.div.getBoundingClientRect();

        if (bottom > winHeights) {
          if (!item.steady) {
            item.drop = now;
            item.steady = true;
          }
          if (item.drop > 0 && now - item.drop >= 1000) {
            item.drop = 0;
            item.mustDrop = true;
          }
        }

        item.rect = {
          left: left + Math.sin((item.div.x += item.div.stepX)),
          top: top + item.div.stepY,
        };

        return item;
      })
      .forEach((item) => {
        if (item.mustDrop) {
          item.div.y = 0;
          item.div.style.top = '0px';
          item.div.style.left = Math.random() * winWidth + 'px';

          item.steady = false;
          item.mustDrop = false;
        } else if (!item.steady) {
          item.div.style.top = item.rect.top + 'px';
          item.div.style.left = item.rect.left + 'px';
        }
      });

    requestAnimationFrame(innerAnimate);
  }

  updateCounter();

  innerAnimate();
}
