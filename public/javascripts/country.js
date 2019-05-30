$(document).ready(function(){
    var context;
    getAllCountries();
    $('#add-country').submit(function(e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        $('.spinner-border').removeClass('d-none').addClass('d-block');
        addCountryAjax(formData);
    });

    $(document).on('click','.delete-country', function (){
        var id = $(this).closest('tr').data('country-id');
        context = this;
        $('#delete-country-modal').modal('show');
        $('#delete-country-modal').find('.remove-value-js').val(id);
    });

    $(document).on('click','#cancel-delete-country-js' , function(){
        $(this).siblings('.remove-value-js').val('');
        context = '';
    });

    $(document).on('click', '#delete-country-js', function() {
        var id = $(this).siblings('.remove-value-js').val();
        deleteCountry(id);
        $('#delete-country-modal').modal('hide');
        $(context).closest('tr').remove();
    });
});

function addCountryAjax(formData){
    $.ajax({
        url: '/questions',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);
            addAllCountriesToList([response]);
            //Dismiss modal
            $('#add-country-modal').modal('toggle');
            $('.spinner-border').removeClass('d-block').addClass('d-none');
            alertMessage('Country added', 'alert-success', 3000);
        },
        error: function (err){
            console.log(err);
            $('.spinner-border').removeClass('d-block').addClass('d-none');
            alertMessage('Country not added', 'alert-warning', 3000);
        }
    });
}

function deleteCountry(id){
    $.ajax({
        url: '/questions',
        type: 'DELETE',
        headers:{
            'id': id,
        },
        success: function (response){
            console.log(response);
            alertMessage('Country deleted', 'alert-warning', 3000);
        },
        error: function (err) {
            console.log(err);
            alertMessage('Country not deleted', 'alert-warning', 3000);
        }
    });
}

function getAllCountries(){
    $.ajax({
        url: '/questions',
        type: 'GET',
        success: function (response) {
            console.log(response);
            addAllCountriesToList(response);
        }
    });
}

function addAllCountriesToList(countries){
    //Getting reference from the table body
    const tbody = document.querySelector('#table-countries');
    //Creating new table row and appending country data
    for(let i = 0; i < countries.length; i++){

        const tr = document.createElement('tr');
        tr.setAttribute('data-country-id', countries[i]._id);

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = i;

        const tdName = document.createElement('td');
        tdName.innerText = countries[i].name;

        const tdCapital = document.createElement('td');
        tdCapital.innerText = countries[i].capital;

        const tdPoints = document.createElement('td');
        tdPoints.innerText = countries[i].points;

        const tdFlag = document.createElement('td');
        const imgFlag = document.createElement('img');
        imgFlag.src = countries[i].flag_file_path;
        imgFlag.height = '20';
        imgFlag.width = '20';

        const tdCountryImg = document.createElement('td');
        const imgCountryImg = document.createElement('img');
        imgCountryImg.src = countries[i].country_file_path;
        imgCountryImg.height = '20';
        imgCountryImg.width = '20';

        const tdDel = document.createElement('td');
        const spanDel = document.createElement('span');
        spanDel.classList = 'delete-country';
        spanDel.style = 'color: inherit'
        const imgDel = document.createElement('i');
        imgDel.classList = "far fa-times-circle fa-2x";

        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdCapital);
        tr.appendChild(tdPoints);

        tdFlag.appendChild(imgFlag);
        tr.appendChild(tdFlag);

        tdCountryImg.appendChild(imgCountryImg);
        tr.appendChild(tdCountryImg);

        spanDel.appendChild(imgDel);
        tdDel.appendChild(spanDel);
        tr.appendChild(tdDel);
        tbody.appendChild(tr);
    }
}

/* Creates new alert message */
function alertMessage(message, type, timeInMills){
    const alert = document.querySelector('.alert');
    alert.classList.add(type);
    alert.textContent = message;
    alert.style.display='block';
    setTimeout(() => { 
        alert.classList.remove(type);
        alert.textContent = '';
        alert.style.display='none';
    }, timeInMills);
}