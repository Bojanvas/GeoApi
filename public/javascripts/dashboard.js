$(document).ready(() => {
  var context;

  //Ajax call for query results
  getAllResults();

  //Ajax call for query users
  getAllUsers();

  /*
  * Search results by country
  */
  $(document).on('click', '#result-search-submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#result-search-input');
    getResultsByCountry(input.value);
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
  * Click listener for deliting result
  */
  $(document).on('click', '#delete-result-js', () => {
      var id = $(this).siblings('.remove-value-js').val();
      deleteResult(id);
      $('#delete-result-modal').modal('hide');
      $(context).closest('tr').remove();
  });
});

function getAllUsers(){
  $.ajax({
    url: '/users',
    type: 'GET',
    success: (response) => {
      console.log(response);
      addUsersToList(response);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

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
    url: '/results/country',
    type: 'GET',
    data: { country: country },
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

function addUsersToList(users){
  //Getting reference from the table body
  const tbody = document.querySelector('#table-users');
  //Creating new table row and appending users data
  for(let i = 0; i < users.length; i++){

      const tr = document.createElement('tr');
      tr.setAttribute('data-user-id', users[i]._id);

      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = i;

      const tdName = document.createElement('td');
      tdName.innerText = users[i].name

      const tdCountry = document.createElement('td');
      tdCountry.innerText = users[i].country;

      const tdLastActive = document.createElement('td');
      tdLastActive.innerText = users[i].last_active;

      const tdIsPremium = document.createElement('td');
      tdIsPremium.innerText = users[i].is_premium;

      const tdIsGuest = document.createElement('td');
      tdIsGuest.innerText = users[i].is_guest;

      const tdExperience = document.createElement('td');
      tdExperience.innerText = users[i].experiance;

      tr.appendChild(th);
      tr.appendChild(tdName);
      tr.appendChild(tdCountry);
      tr.appendChild(tdLastActive);
      tr.appendChild(tdIsPremium);
      tr.appendChild(tdIsGuest);
      tr.appendChild(tdExperience);

      tbody.appendChild(tr);
  }
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
      tdName.innerText = results[i].userId;

      const tdCountry = document.createElement('td');
      tdCountry.innerText = 'not supported';

      const tdDate = document.createElement('td');
      tdDate.innerText = results[i].date;

      const tdPoints = document.createElement('td');
      tdPoints.innerText = results[i].points;

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
      tr.appendChild(tdPoints);

      spanDel.appendChild(imgDel);
      tdDel.appendChild(spanDel);
      tr.appendChild(tdDel);
      tbody.appendChild(tr);
  }
}