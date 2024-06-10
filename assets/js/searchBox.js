// start destination
const selectBtn = document.querySelector(".select-btn"),
  items = document.querySelectorAll(".item");
selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});
items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked");
    let checked = document.querySelectorAll(".checked"),
      btnText = document.querySelector(".btn-text");
    if (checked && checked.length > 0) {
      btnText.innerText = `${checked.length} انتخاب`;
    } else {
      btnText.innerText = "مقصد";
    }
  });
});

const selectBtnType = document.querySelector(".select-btn_type"),
  itemsType = document.querySelectorAll(".item_type");
selectBtnType.addEventListener("click", () => {
  selectBtnType.classList.toggle("open_type");
});
itemsType.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked_type");
    let checked = document.querySelectorAll(".checked_type"),
      btnText = document.querySelector(".btn-text_type");
    if (checked && checked.length > 0) {
      btnText.innerText = `${checked.length} انتخاب`;
    } else {
      btnText.innerText = "نوع اقامتگاه";
    }
  });
});
// end destination
