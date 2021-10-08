function updateCounter() {
  const counter = document.getElementById('counter');
  const count = document.getElementsByClassName('snowflake').length;
  const text = document.createTextNode(count.toLocaleString());

  counter.firstChild && counter.removeChild(counter.firstChild);
  counter.appendChild(text);
}

function animate() {
  const winHeights = window.innerHeight;
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
        const { top, bottom } = item.div.getBoundingClientRect();

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
          left: Math.sin((item.div.x += item.div.stepX)) * 10,
          top: top + item.div.stepY,
        };

        return item;
      })
      .forEach((item) => {
        if (item.mustDrop) {
          item.div.style.top = '0px';
          item.div.style.transform = '';

          item.steady = false;
          item.mustDrop = false;
        } else if (!item.steady) {
          item.div.style.top = '0px';
          item.div.style.transform = 'translate3d(' + item.rect.left + 'px,' + item.rect.top + 'px, 0)';
        }
      });

    requestAnimationFrame(innerAnimate);
  }

  updateCounter();

  innerAnimate();
}
