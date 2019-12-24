let width = window.innerWidth;
let height = window.innerHeight;
let asteroids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let mouseArr = [1];
let board = document.querySelector('.board');
let longestTime = document.querySelector('.longest-time span');
let currentTime = document.querySelector('.current-time span');
let collisions = document.querySelector('.collisions span');

let currentTimeCount;
let collisionCount = 0;
let mouseXLoc, mouseYLoc, xDist, yDist, collide;


// ASTEROIDS
d3.select('.svg')
  .selectAll('circle')
  .data(asteroids)
  .enter()
  .append('circle')
  .attr('cx', function() { return Math.random() * width; })
  .attr('cy', function() { return Math.random() * height; })
  .attr('r', 25);


// MOUSE
d3.select('.mouse svg')
  .selectAll('circle')
  .data(mouseArr)
  .enter()
  .append('circle')
  .attr('cx', function() { return Math.random() * width; })
  .attr('cy', function() { return Math.random() * height; })
  .attr('r', 25);

let mouse = document.querySelector('.mouse svg circle');
let mouseR = parseFloat(mouse.getAttribute('r'));


// DRAG BEHAVIOR
let startDrag = function() {
  d3.select(this)
    .attr('cx', this.x = d3.event.x)
    .attr('cy', this.y = d3.event.y);
};

d3.select('.mouse svg circle')
  .call(
    d3.behavior.drag()
      .on('drag', startDrag)
  );



// SETINTERVAL FOR CURRENT TIME
setInterval(function() {
  currentTimeCount = parseInt(currentTime.textContent);
  currentTimeCount++;
  currentTime.textContent = currentTimeCount.toString();
}, 1000);


// SETINTERVAL FOR ASTEROID MOVEMENT
setInterval(function() {
  d3.selectAll('.svg circle')
    .transition()
    .duration(1000)
    .call(moveAsteroids)
    .tween('transition', function() {
      let elem = this;
      return function () {
        mouseXLoc = parseFloat(mouse.getAttribute('cx'));
        mouseYLoc = parseFloat(mouse.getAttribute('cy'));

        xDist = Math.abs(mouseXLoc - parseFloat(elem.getAttribute('cx')));
        yDist = Math.abs(mouseYLoc - parseFloat(elem.getAttribute('cy')));
        collide = Math.sqrt((xDist * xDist) + (yDist * yDist));

        if (collide < (2 * mouseR)) {
          collision();
        }
      };
    });
}, 1000);


let moveAsteroids = function(transition) {
  transition
    .attr('cx', function() { return Math.random() * width; })
    .attr('cy', function() { return Math.random() * height; });
};


let collision = function() {
  if (parseInt(currentTime.textContent) > parseInt(longestTime.textContent)) {
    longestTime.textContent = currentTime.textContent;
  }
  currentTime.textContent = '0';

  collisionCount++;
  collisions.textContent = collisionCount.toString();

  board.classList.add('collision');
  setTimeout(function() {
    board.classList.remove('collision');
  }, 250);
};