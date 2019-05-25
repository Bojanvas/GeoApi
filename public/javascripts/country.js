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

        tbody.appendChild(tr);
        tbody.appendChild(th);
        tbody.appendChild(tdName);
        tbody.appendChild(tdCapital);
        tbody.appendChild(tdPoints);

        tdFlag.appendChild(imgFlag);
        tbody.appendChild(tdFlag);

        tdCountryImg.appendChild(imgCountryImg);
        tbody.appendChild(tdCountryImg);
    }
}