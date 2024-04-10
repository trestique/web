class SimplyProduct {
  constructor() {
    this.init();
  }
  productInit = () => {
    if ($(".simply-product").length > 0) {
      $(document).on(
        "click",
        ".simply-product .swatch-wrap .swatch-element",
        function () {
          $(this).siblings().removeClass("active");
          $(this).addClass("active");
          let parent = $(this).closest(".simply-product");
          $('input[name="id"]', parent).val($(this).attr("data-id"));
          $(".current-variant-info", parent).html($(this).attr("data-info"));
          let available = Boolean($(this).attr("data-available"));
          let btn = $("button", parent);
          let price = $(this).attr("data-price");
          if (available) {
            btn.html(`Add to cart ${price}`);
            btn.removeAttr("disabled");
          } else {
            btn.html(Soldout);
            btn.attr("disabled", true);
          }
          var new_img = $(this).attr("data-img");
          if (!cn(new_img)) {
            parent.addClass("disabled");
            var image = new Image();
            image.onload = function () {
            let current_img = $('img',parent);
              current_img.attr("src", new_img).attr("srcset", new_img);
            };
            image.src = new_img;
          }
        }
      );
    }
  };

  init = () => {
    this.productInit();
  };
}
$(document).ready(function () {
  new SimplyProduct();
});
