(function () {
  "use strict";

  // *** Variables ***

  const gameArr = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
    12,
  ];

  let currentImgNumbers = [];
  let currentClickedBoxes = [];
  let score = 0;

  // *** HTML elements ***

  const boxElementsArr = Array.from(document.querySelectorAll(".box"));

  // *** Functions ***

  function sortArrRandomly(arr) {
    arr.sort(function () {
      return Math.random() - 0.5;
    });

    return arr;
  }

  function onWin() {
    setTimeout(function () {
      alert("You did it!");
      if (confirm("Do you want to play again?")) {
        location.reload();
      }
    }, 1 * 1000);
  }

  function onBoxClick() {
    const clickedBox = this;

    // This code is written to prevent a bug from happening
    if (getComputedStyle(clickedBox.firstElementChild).display !== "none") {
      return;
    }

    // If this condition was not written then you could click on the same box twice consecutively and it will be counted
    if (clickedBox !== currentClickedBoxes[0]) {
      clickedBox.firstElementChild.style.display = "block";

      // finding the number of image (as in game array) through the clicked box and then pushing it into currentImgNumbers array

      currentImgNumbers.push(gameArr[boxElementsArr.indexOf(clickedBox)]);

      currentClickedBoxes.push(clickedBox);
    }

    if (currentImgNumbers.length === 2) {
      // checking if the images matches
      if (currentImgNumbers[0] === currentImgNumbers[1]) {
        score++;
        // if images matches then removing click event listener from those boxes who contains these images
        currentClickedBoxes.forEach(function (box) {
          box.removeEventListener("click", onBoxClick);
          box.style.backgroundColor = "#4ffc4f";

          setTimeout(function () {
            box.style.backgroundColor = "#fff";
          }, 0.8 * 1000);
        });

        if (score === 12) onWin();
      } else {
        currentClickedBoxes.forEach(function (box) {
          box.style.backgroundColor = "#e24d4d";
          setTimeout(function () {
            box.firstElementChild.style.display = "none";
            box.style.backgroundColor = "#fff";
          }, 0.8 * 1000);
        });
      }

      currentClickedBoxes = [];
      currentImgNumbers = [];
    }
  }

  // *** Event Listeners ***

  window.addEventListener("load", function () {
    sortArrRandomly(gameArr);

    boxElementsArr.forEach(function (box, i) {
      box.innerHTML =
        "<img src='./assets/images/" + gameArr[i] + ".png' alt=''>";
      box.addEventListener("click", onBoxClick);
    });
  });

  //
})();
