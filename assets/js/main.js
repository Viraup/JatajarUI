// start verify resend code
var minutes = 0;
var seconds = 60;

var x = setInterval(function () {
  if (seconds != 0) {
    seconds--;
  } else if (seconds == 0) {
    minutes--;
    seconds = 59;
  }

  document.getElementById("verify-code").innerHTML =
    "ارسال مجدد کد بعد از " + "ثانیه " + seconds;
  if (seconds == 0 && minutes == 0) {
    clearInterval(x);
    document.getElementById("block-verify-code").innerHTML =
      "<a href='#'>ارسال مجدد</a>";
  }
}, 1000);
// end verify resend code
// start accordion faq
const accordionHeader = document.querySelectorAll(".accordion-header");
accordionHeader.forEach((header) => {
  header.addEventListener("click", function () {
    const accordionContent =
      header.parentElement.querySelector(".accordion-content");
    let accordionMaxHeight = accordionContent.style.maxHeight;

    // Condition handling
    if (accordionMaxHeight == "0px" || accordionMaxHeight.length == 0) {
      accordionContent.style.maxHeight = `${
        accordionContent.scrollHeight + 32
      }px`;
      header.querySelector(".fas").classList.remove("fa-plus");
      header.querySelector(".fas").classList.add("fa-minus");
      header.parentElement.classList.add("bg-indigo-50");
    } else {
      accordionContent.style.maxHeight = `0px`;
      header.querySelector(".fas").classList.add("fa-plus");
      header.querySelector(".fas").classList.remove("fa-minus");
      header.parentElement.classList.remove("bg-indigo-50");
    }
  });
});
// end accordion faq
// start add counter
jQuery(
  '<button class="quantity-nav quantity-button quantity-down inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button"><span class="sr-only">Quantity button</span><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/></svg></button>'
).insertAfter(".quantity input");
jQuery(
  '<button class="quantity-nav quantity-button quantity-up inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button"><span class="sr-only">Quantity button</span><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/></svg></button>'
).insertBefore(".quantity input");
jQuery(".quantity").each(function () {
  var spinner = jQuery(this),
    btnUp = spinner.find(".quantity-up"),
    input = spinner.find('input[type="number"]'),
    btnDown = spinner.find(".quantity-down"),
    min = input.attr("min"),
    max = input.attr("max");

  btnUp.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue >= max) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

  btnDown.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue <= min) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });
});
// end add counter

// start god and bad product comment
$(document).ready(function () {
  var inputs = $("#advantage-input, #disadvantage-input");
  var inputChangeCallback = function () {
    var self = $(this);
    if (self.val().trim().length > 0) {
      self.siblings(".js-icon-form-add").show();
    } else {
      self.siblings(".js-icon-form-add").hide();
    }
  };
  inputs.each(function () {
    inputChangeCallback.bind(this)();
    $(this).on("change keyup", inputChangeCallback.bind(this));
  });
  $("#advantages")
    .delegate(".js-icon-form-add", "click", function (e) {
      var parent = $(".js-advantages-list");
      if (parent.find(".js-advantage-item").length >= 5) {
        return;
      }
      var advantageInput = $("#advantage-input");
      if (advantageInput.val().trim().length > 0) {
        parent.append(
          '<div class="ui-dynamic-label ui-dynamic-label--positive js-advantage-item">\n' +
            advantageInput.val() +
            '<button type="button" class="ui-dynamic-label-remove js-icon-form-remove"></button>\n' +
            '<input type="hidden" name="comment[advantages][]" value="' +
            advantageInput.val() +
            '">\n' +
            "</div>"
        );
        advantageInput.val("").change();
        advantageInput.focus();
      }
    })
    .delegate(".js-icon-form-remove", "click", function (e) {
      $(this).parent(".js-advantage-item").remove();
    });
  $("#disadvantages")
    .delegate(".js-icon-form-add", "click", function (e) {
      var parent = $(".js-disadvantages-list");
      if (parent.find(".js-disadvantage-item").length >= 5) {
        return;
      }
      var disadvantageInput = $("#disadvantage-input");
      if (disadvantageInput.val().trim().length > 0) {
        parent.append(
          '<div class="ui-dynamic-label ui-dynamic-label--negative js-disadvantage-item">\n' +
            disadvantageInput.val() +
            '<button type="button" class="ui-dynamic-label-remove js-icon-form-remove"></button>\n' +
            '<input type="hidden" name="comment[disadvantages][]" value="' +
            disadvantageInput.val() +
            '">\n' +
            "</div>"
        );
        disadvantageInput.val("").change();
        disadvantageInput.focus();
      }
    })
    .delegate(".js-icon-form-remove", "click", function (e) {
      $(this).parent(".js-disadvantage-item").remove();
    });
});

// end god and bad product comment


