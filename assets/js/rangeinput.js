const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 1000;

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[1].value = maxVal + priceGap;
      } else {
        rangeInput[0].value = minVal - priceGap;
      }
    } else {
      priceInput[1].value = minVal;
      priceInput[0].value = maxVal;
    //   range.style.left = 100 - (minVal / rangeInput[0].max) * 100 + "%";
    //   range.style.right = (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});