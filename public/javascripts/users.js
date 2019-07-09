$(document).ready(() => {
  
    //Ajax call for query users
    getAllUsers();
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