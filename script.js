// Background color change logic
const colors = [
  '#b0e0e6', // Powder Blue
  '#f0e68c', // Khaki
  '#ffdab9', // Peach Puff
  '#d8bfd8', // Thistle
  '#e6e6fa', // Lavender
];
let currentColorIndex = 0;

function changeBackgroundColor() {
  document.body.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  setTimeout(changeBackgroundColor, 4000); // Change color every 4 seconds
}

// Start the background color change loop
changeBackgroundColor();

// Show message and trigger animations on button click
document.getElementById('heart').onclick = function () {
  document.getElementById('message').style.display = 'block'; // Show the message

  // Trigger confetti effect
  confetti({
      particleCount: 300,
      spread: 90,
      origin: { x: 1, y: 0.9 },
  });
  confetti({
      particleCount: 300,
      spread: 90,
      origin: { x: 0, y: 0.9 },
  });

  // Trigger mo.js animation
  const scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
  const el = document.querySelector('.button');
  const timeline = new mojs.Timeline();

  // Burst animation 1
  const tween1 = new mojs.Burst({
      parent: el,
      radius: { 0: 100 },
      angle: { 0: 45 },
      y: -10,
      count: 10,
      radius: 100,
      children: {
          shape: 'circle',
          radius: 30,
          fill: ['red', 'white'],
          strokeWidth: 15,
          duration: 500,
      },
  });

  // Scale animation
  const tween2 = new mojs.Tween({
      duration: 900,
      onUpdate: function (progress) {
          const scaleProgress = scaleCurve(progress);
          el.style.transform = `scale3d(${scaleProgress}, ${scaleProgress}, 1)`;
      },
  });

  // Burst animation 2
  const tween3 = new mojs.Burst({
      parent: el,
      radius: { 0: 100 },
      angle: { 0: -45 },
      y: -10,
      count: 10,
      radius: 125,
      children: {
          shape: 'circle',
          radius: 30,
          fill: ['white', 'red'],
          strokeWidth: 15,
          duration: 400,
      },
  });

  // Add tweens to the timeline
  timeline.add(tween1, tween2, tween3);

  // Play the timeline
  timeline.play();
};

