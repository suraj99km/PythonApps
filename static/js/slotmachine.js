(function () {

  "use strict";
  var slotMachineElement = document.getElementById("slot-machine");
  var brid = slotMachineElement.getAttribute("data-selected-string").split("");

  // Extract the name from the "name" element
  var nameElement = document.getElementById("name");
  var name = nameElement.getAttribute("data-selected-string");

  const nameContainer = document.getElementById("name-container");
  const slotsContainer = document.getElementById("slots");
  const doorElements = document.querySelectorAll('.door');

  console.log(brid);

  const alphas = ["G", "H", "E", "A", "G", "H", "E", "A","G", "H", "E", "A", "G", "H", "E", "A","G", "H", "E", "A"];
  const binaries = ["0", "1", "0", "1", "0", "1", "0", "1","0", "1", "0", "1", "0", "1", "0", "1","0", "1","0", "1"];
  const items = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9","0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const doors = document.querySelectorAll(".door");
  document.querySelector("#spinner").addEventListener("click", spin);
  document.querySelector("#reseter").addEventListener("click", function () {
    // Reload the page when the reset button is clicked
    window.location.reload();
  });
  
  async function spin() {

    init(false, 1, 4);
    for (const [idxdoor, door] of doors.entries()) {
      const boxes = door.querySelector(".boxes");
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = "translateY(0)";

      // const randomDelay = Math.floor(Math.random() * 500);
      // console.log(randomDelay);

      await new Promise((resolve) => setTimeout(resolve, (duration) * 100));

      // Check if the .box element exists
      const boxElement = door.querySelector(".box");
      if (boxElement) {
        // Set the text content to the corresponding element from the brid array
        boxElement.textContent = brid[idxdoor];

        if (boxElement.textContent === brid[idxdoor]) {
          door.querySelectorAll(".box").forEach((box) => {
            box.style.filter = "blur(1px)";
          });
        }
      }
    }

    // // Hide the spin button
    // const spinButton = document.getElementById("spinner");
    // spinButton.style.display = "none";
  
    // Show the reset button after the spinning is complete
    setTimeout(function() {
      const resetButton = document.getElementById("reseter");
      resetButton.style.display = "inline-block";
    }, 6000);

  // Add a 4-second delay before triggering confetti
  setTimeout(triggerConfetti, 4000);

  // Delay before displaying the name
  setTimeout(function () {
    var nameDisplayElement = document.getElementById("name-display");

    nameDisplayElement.textContent = "Winner: " + name;
    nameContainer.style.visibility = "visible"; // Make the name-container visible
  }, 4500);
  
// Delay before Text Animation
  setTimeout(function () {
  slotsContainer.classList.add("transition-effect");
  slotsContainer.style.transform = "scale(0.35) translateY(-50%)";

  // Adjust the name container and display element
  nameContainer.classList.add("transition-effect");
  // nameContainer.style.height = "100px";
  nameContainer.style.transform = "scale(1.6) translateY(-40%)";

  // Adjust margin between font and border of the door div
  doorElements.forEach(door => {
    const boxElement = door.querySelector(".box");
    if (boxElement) {
      boxElement.style.padding = "5px"; // Adjust the padding value
      boxElement.style.transform = "scale(1.6)"; // Adjust the desired scale
    }
  });

  var appContainer = document.getElementById("app");
  appContainer.style.width = "75%";
  appContainer.style.borderRadius = "20px";
  
  }, 6000);

  playBackgroundMusic();
  fadeInVideo();

  }



  const confetti = new JSConfetti();
// Function to trigger confetti
function triggerConfetti() {
  confetti
    .addConfetti({
      emojis: ["⚽️"],
      emojiSize: 100,
      confettiNumber: 200,
    });
}

function playBackgroundMusic() {
  const audioElement = document.getElementById("backgroundMusic");
  audioElement.play();
}

function fadeInVideo() {
  const videoContainer = document.getElementById('background-video');
  const appcontainer = document.getElementById('app');
  let opacity = 0;
  let opacity2 = 1;

  const fadeInterval = setInterval(() => {
      if (opacity >= 1) {
          clearInterval(fadeInterval); // Stop increasing opacity
      } else {
          opacity += 0.02; // Adjust the increment as needed
          opacity2 -= 0.003;
          videoContainer.style.opacity = opacity;
          appcontainer.style.opacity = opacity2;
          doorElements.forEach(door => {
            door.style.opacity = 1;
          });
      }
  }, 50); // Adjust the interval as needed
}


function init(firstInit = true, groups = 1, duration = 1) {
  for (const [idxdoor, door] of doors.entries()) {
    if (firstInit) {
      door.dataset.spinned = "0";
    } else if (door.dataset.spinned === "1") {
      return;
    }

    const boxes = door.querySelector(".boxes");
    const boxesClone = boxes.cloneNode(false);

    var pool = ["?"];
    
    // Determine the pool based on the door index
    if (door.classList.contains("alpha-box")) {
      pool.push(...shuffle(alphas));
    } else if (door.classList.contains("binary-box")) {
      pool.push(...shuffle(binaries));
    } else {
      pool.push(...shuffle(items));
    }

    if (!firstInit) {
      boxesClone.addEventListener(
        "transitionstart",
        function () {
          door.dataset.spinned = "1";
          door.querySelectorAll(".box").forEach((box) => {
            box.style.filter = "blur(.8px)";
          });
        },
        { once: true }
      );

      boxesClone.addEventListener(
        "transitionend",
        function () {
          door.querySelectorAll(".box").forEach((box, index) => {
            box.style.filter = "blur(0)";
            if (index > 0) this.removeChild(box);
          });
        },
        { once: true }
      );
    }

    for (let i = pool.length - 1; i >= 0; i--) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = door.clientWidth + "px";
      box.style.height = door.clientHeight + "px";
      box.textContent = pool[i];

      boxesClone.appendChild(box);
    }
    boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
    boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
    door.replaceChild(boxesClone, boxes);
  }
}

function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

init();

})();
