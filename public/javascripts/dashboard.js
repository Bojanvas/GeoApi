$(document).ready(() => {
  getAllResults();

  $(document).on('click','.delete-result', () => {
    var id = $(this).closest('tr').data('result-id');
    context = this;
    $('#delete-result-modal').modal('show');
    $('#delete-result-modal').find('.remove-value-js').val(id);
});

  $(document).on('click','#cancel-delete-result-js' , () => {
      $(this).siblings('.remove-value-js').val('');
      context = '';
  });

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
      addAllResultsToList(response);
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

function addAllResultsToList(results){
  //Getting reference from the table body
  const tbody = document.querySelector('#table-results');
  //Creating new table row and appending country data
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