function updateCounter() {
  const counter = document.getElementById('counter');
  const count = document.getElementsByClassName('snowflake').length;
  const text = document.createTextNode(count.toLocaleString());

  counter.firstChild && counter.removeChild(counter.firstChild);
  counter.appendChild(text);
}

function remove(snowflake) {
  snowflake.classList.add('drop');
}

function animate() {
  const winHeights = window.innerHeight;
  const col = document.querySelectorAll('.snowflake');
  const calculatedData = [].slice
    .call(col)
    .map(function (item) {
      const rect = item.getBoundingClientRect();

      return {
        div: item,
        steady: item.classList.contains('steady'),
        rect: {
          left: rect.left,
          top: rect.top,
          bottom: rect.bottom,
        },
      };
    })
    .map(function (item) {
      item.rect.top = item.rect.top + item.div.stepY;
      item.rect.left = item.rect.left + Math.sin((item.div.x += item.div.stepX));

      if (item.rect.bottom > winHeights) {
        item.mustStop = true;
      }

      return item;
    });

  calculatedData.forEach(function (item) {
    if (item.mustStop) {
      if (!item.steady) {
        item.div.classList.add('steady');
        addToScene(generateSnowflake(), true);
        setTimeout(remove.bind(null, item.div), 1000);
      }
    } else {
      item.div.style.top = item.rect.top + 'px';
      item.div.style.left = item.rect.left + 'px';
    }
  });

  calculatedData
    .filter(function (item) {
      return item.div.classList.contains('drop');
    })
    .forEach(function (item) {
      item.div.parentNode.removeChild(item.div);
    });

  updateCounter();

  setTimeout(animate, 0);
}
