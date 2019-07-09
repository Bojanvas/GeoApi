$(document).ready(() => {

    //Ajax call for query results
    getAllResults();

    /*
    * Search results by country
    */
    $(document).on('click', '#result-search-by-country-submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('#result-search-by-country-input');
        getResultsByCountry(input.value);
    });

    /*
    * Search results by user name
    */
    $(document).on('click', '#result-search-by-name-submit', (e) => {
      e.preventDefault();
      const input = document.querySelector('#result-search-by-name-input');
      getResultsByName(input.value);
    });

    /*
    * Click listener for opening modal for delete result
    */
    $(document).on('click','.delete-result', () => {
        var id = $(this).closest('tr').data('result-id');
        context = this;
        console.log("id " + id);
        $('#delete-result-modal').modal('show');
        $('#delete-result-modal').find('.remove-value-js').val(id);
    });

    /*
    * Click listener for closing modal for delete result
    */
    $(document).on('click','#cancel-delete-result-js' , () => {
        $(this).siblings('.remove-value-js').val('');
        context = '';
    });

    /*
    * Click listener for delete result
    */
    $(document).on('click', '#delete-result-js', () => {
        var id = $(this).siblings('.remove-value-js').val();
        deleteResult(id);
        $('#delete-result-modal').modal('hide');
        $(context).closest('tr').remove();
    });
});


function getAllResults(){
    $.ajax({
      url: '/results',
      type: 'GET',
      success: (response) => {
        console.log(response);
        addResultsToList(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  function getResultsByUser(userId){
    $.ajax({
      url: '/results/userid',
      type: 'GET',
      data: { user: userId },
      success: (response) => {
        console.log(response);
        // addResultsToList(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  function getResultsByCountry(country){
    $.ajax({
      url: '/results?country=' + country,
      type: 'GET',
      success: (response) => {
        console.log(response);
        // addResultsToList(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  function deleteResult(id){
    $.ajax({
        url: '/results',
        type: 'DELETE',
        headers:{
            'id': id,
        },
        success: function (response){
            console.log(response);
            alertMessage('Result deleted', 'alert-warning', 3000);
        },
        error: function (err) {
            console.log(err);
            alertMessage('Result not deleted', 'alert-warning', 3000);
        }
    });
  }

  function addResultsToList(results){
    //Getting reference from the table body
    const tbody = document.querySelector('#table-results');
    //Creating new table row and appending results data
    for(let i = 0; i < results.length; i++){
  
        const tr = document.createElement('tr');
        tr.setAttribute('data-result-id', results[i]._id);
  
        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = i;
  
        const tdName = document.createElement('td');
        tdName.innerText = results[i].user.name;
  
        const tdCountry = document.createElement('td');
        tdCountry.innerText = results[i].user.country;
  
        const tdDate = document.createElement('td');
        tdDate.innerText = results[i].date;
  
        const tdScore = document.createElement('td');
        tdScore.innerText = results[i].score;
  
        const tdDel = document.createElement('td');
        const spanDel = document.createElement('span');
        spanDel.classList = 'delete-result';
        spanDel.style = 'color: inherit'
        const imgDel = document.createElement('i');
        imgDel.classList = "far fa-times-circle fa-2x";
  
        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdCountry);
        tr.appendChild(tdDate);
        tr.appendChild(tdScore);
  
        spanDel.appendChild(imgDel);
        tdDel.appendChild(spanDel);
        tr.appendChild(tdDel);
        tbody.appendChild(tr);
    }
  }