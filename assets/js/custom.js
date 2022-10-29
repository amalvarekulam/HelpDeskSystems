

  $(document).on("click", ".dropdown", function () {
    $(this).toggleClass("dropdown-open");
  });



  $('#click_advance').click(function () {
    $("span", this).toggleClass("mdi-window-close");
  });