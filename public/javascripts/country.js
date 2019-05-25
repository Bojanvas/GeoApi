$(document).ready(function(){
    $('#add-country').submit(function(e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        var name = $('#country_name').val();
        var capital = $('#country_capital').val();
        addCountryAjax(formData);
    })
});

function addCountryAjax(formData){
    $.ajax({
        url: '/questions',
        type: 'POST',
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (response) {
          console.log(response);
        }
    });
}