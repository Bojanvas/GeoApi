$(document).ready(function(){
    getAllCountries();
    $('#add-country').submit(function(e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        addCountryAjax(formData);
    })
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
            //Dismiss modal
            $('#add-country-modal').modal('toggle');
            alertMessage('Country added', 'alert-success', 3000);
        },
        error: function (err){
            console.log(err);
            alertMessage('Country not added', 'alert-warning', 3000);
        }
    });
}

function deleteCountry(name){
    $.ajax({
        url: '/questions',
        type: 'DELETE',
        headers:{
            'name': name,
        },
        success: function (response){
            console.log(response);
            alertMessage('Country deleted', 'alert-warning', 3000);
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
        imgFlag.src = countries[i].flag;
        imgFlag.height = '20';
        imgFlag.width = '20';

        const tdCountryImg = document.createElement('td');
        const imgCountryImg = document.createElement('img');
        imgCountryImg.src = countries[i].country_img;
        imgCountryImg.height = '20';
        imgCountryImg.width = '20';

        const tdDel = document.createElement('td');
        const aDel = document.createElement('a');
        aDel.href = '';
        aDel.style = 'color: inherit'
        const imgDel = document.createElement('i');
        imgDel.classList = "far fa-times-circle fa-2x";

        tbody.appendChild(tr);
        tbody.appendChild(th);
        tbody.appendChild(tdName);
        tbody.appendChild(tdCapital);
        tbody.appendChild(tdPoints);

        tdFlag.appendChild(imgFlag);
        tbody.appendChild(tdFlag);

        tdCountryImg.appendChild(imgCountryImg);
        tbody.appendChild(tdCountryImg);

        aDel.appendChild(imgDel);
        tdDel.appendChild(aDel);
        tbody.appendChild(tdDel);
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