(function () {

  $('.navbar-toggle').on('click', function () {
    $(this).toggleClass('active');
  });

})();

$(document).on('ready', function() {
  $('#success-alert').fadeTo(4000, 1000).slideUp(1000, function() {
    $('#success-alert').slideUp(500);
  });
});
