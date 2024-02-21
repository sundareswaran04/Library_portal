


function entry_form() {
  document.getElementById("entry").style.display = "flex";
  document.getElementById("return").style.display = "none";
  document.getElementById("add_student").style.display = "none";
  document.getElementById("add_book").style.display = "none";
  document.getElementById("database").style.display = "none";
  document.getElementById("database-search").style.display = "none";
  document.getElementById("personal_info").style.display = "none";
  document.getElementById("Book-search").style.display = "none";

}
entry_form();
return_form = () => {
  document.getElementById("entry").style.display = "none";
  document.getElementById("return").style.display = "flex";
  document.getElementById("add_student").style.display = "none";
  document.getElementById("add_book").style.display = "none";
  document.getElementById("database").style.display = "none";
  document.getElementById("database-search").style.display = "none";
  document.getElementById("personal_info").style.display = "none";
  document.getElementById("popup").style.display = "flex";
  document.getElementById("Book-search").style.display = "none";
}
add_student_form = () => {
  document.getElementById("entry").style.display = "none";
  document.getElementById("return").style.display = "none";
  document.getElementById("add_student").style.display = "flex";
  document.getElementById("add_book").style.display = "none";
  document.getElementById("database").style.display = "none";
  document.getElementById("database-search").style.display = "none";
  document.getElementById("personal_info").style.display = "none";
  document.getElementById("popup").style.display = "flex";
  document.getElementById("Book-search").style.display = "none";




}
add_book_form = () => {
  document.getElementById("entry").style.display = "none";
  document.getElementById("return").style.display = "none";
  document.getElementById("add_student").style.display = "none";
  document.getElementById("add_book").style.display = "flex";
  document.getElementById("database").style.display = "none";
  document.getElementById("database-search").style.display = "none";
  document.getElementById("personal_info").style.display = "none";
  document.getElementById("popup").style.display = "flex";
  document.getElementById("Book-search").style.display = "none";
}
taken_data = () => {
  const tble = document.getElementById('table');
  tble.innerHTML = "";
  document.getElementById("entry").style.display = "none";
  document.getElementById("return").style.display = "none";
  document.getElementById("add_student").style.display = "none";
  document.getElementById("add_book").style.display = "none";
  document.getElementById("database").style.display = "flex";
  document.getElementById("database-search").style.display = "none";
  document.getElementById("personal_info").style.display = "none";
  // document.getElementById("popup").style.display="flex";
  document.getElementById("Book-search").style.display = "none";

  fetch('/taken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
    .then(res => res.json())
    .then(data => {
      for (var i in data) {

        const row = document.createElement('tr');

        row.innerHTML = `<td>${data[i].Rollno}</td><td>${data[i].Name}</td><td>${data[i].Bookid}</td><td>${data[i].BookName}</td><td>${data[i].Authorname}</td><td>${data[i].State}</td><td>${data[i].Date}</td>`;
        tble.appendChild(row);
      }
    })


}
return_data = () => {
  const tble = document.getElementById('table');
  tble.innerHTML = "";
  document.getElementById("entry").style.display = "none";
  document.getElementById("return").style.display = "none";
  document.getElementById("add_student").style.display = "none";
  document.getElementById("add_book").style.display = "none";
  document.getElementById("database-search").style.display = "none";
  document.getElementById("database").style.display = "flex";
  document.getElementById("personal_info").style.display = "none";
  document.getElementById("Book-search").style.display = "none";
  // document.getElementById("popup").style.display="flex";
  fetch('/returned', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
    .then(res => res.json())
    .then(data => {
      for (var i in data) {

        const row = document.createElement('tr');

        row.innerHTML = `<td>${data[i].Rollno}</td><td>${data[i].Name}</td><td>${data[i].Bookid}</td><td>${data[i].BookName}</td><td>${data[i].Authorname}</td><td>${data[i].State}</td><td>${data[i].Date}</td>`;
        tble.appendChild(row);
      }
    })


}

function search() {
  const filter = document.getElementById("filter").value;
  if (filter == 1) {
    const tble = document.getElementById('table');
    tble.innerHTML = "";
    document.getElementById("entry").style.display = "none";
    document.getElementById("return").style.display = "none";
    document.getElementById("add_student").style.display = "none";
    document.getElementById("add_book").style.display = "none";
    document.getElementById("database-search").style.display = "flex";
    document.getElementById("database").style.display = "none";
    document.getElementById("Book-search").style.display = "none";
    document.getElementById("personal_info").style.display = "none";
  }
  else {
    const tble = document.getElementById('table');
    tble.innerHTML = "";
    document.getElementById("entry").style.display = "none";
    document.getElementById("return").style.display = "none";
    document.getElementById("add_student").style.display = "none";
    document.getElementById("add_book").style.display = "none";
    document.getElementById("database-search").style.display = "none";
    document.getElementById("database").style.display = "none";
    document.getElementById("Book-search").style.display = "flex";
    document.getElementById("personal_info").style.display = "none";
  }

}
document.getElementById('addStudentForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get search value from the form
  const formData = new FormData(this);
  const rollno = formData.get('rollno');
  const st_name = formData.get('st_name');

  // Make an AJAX request to the server
  fetch('/add_student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rollno, st_name })

  }
    .then(res => res.json())
    .then(data => console.log(data))
  )
})
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get search value from the form
  const searchValue = document.querySelector('input[name="search_value"]').value;
  const Filter = document.querySelector('select[name="filter"]').value;

  // Make an AJAX request to the server
  fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ search_value: searchValue, filter: Filter })
  })
    .then(response => response.json())
    .then(data => {
      // Render search results
      renderSearchResults(data, Filter);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function renderSearchResults(results, Filter) {

  if (Filter == 1) {
    const container = document.getElementById('table-search');
    container.innerHTML = ''; // Clear previous results



    if (results.length === 0) {
      // Display message if no results found
      const message = document.createElement('p');
      message.textContent = 'No results found.';
      container.appendChild(message);
    } else {
      // Render each search result as list items
      for (var i in results) {
        const row = document.createElement('tr');


        row.innerHTML = `<td name="Rollno">${results[i].Rollno}</td><td name="Name">${results[i].Name}</td><td><button class="btn btn-primary">View</button></td>`;

        container.appendChild(row);
      }

    }
  }
  else if (Filter == 2) {
    const container = document.getElementById('book-search');
    container.innerHTML = '';  // Clear previous results

    // Create a list to display search results
   

    if (results.length === 0) {
      // Display message if no results found
      const message = document.createElement('p');
      message.textContent = 'No results found.';
      container.appendChild(message);
    } else {
      // Render each search result as list items
      for (var i in results) {
        const row = document.createElement('tr');


        row.innerHTML = `<td name="bookid">${results[i].bookid}</td><td name="bookName">${results[i].bookName}</td><td>${results[i].Authorname}</td><td>${results[i].avaiable}</td>`;

        container.appendChild(row);
      }
    }
    console.log(results);
  }
}
// Add an event listener to handle click events on search results
document.getElementById('table-search').addEventListener('click', function (event) {

  // Check if the clicked element is a button inside a search result row
  if (event.target.tagName === 'BUTTON') {
    // Get the parent row of the clicked button
    const row = event.target.closest('tr');
    // Extract the relevant values from the row
    const rollno = row.querySelector('[name="Rollno"]').textContent;
    const name = row.querySelector('[name="Name"]').textContent;

    // Send the values to the Node.js server using AJAX
    fetch('/retrieve-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rollno: rollno, name: name })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        if (data[0].Rollno != undefined) {

          // for display properties

          document.getElementById("entry").style.display = "none";
          document.getElementById("return").style.display = "none";
          document.getElementById("add_student").style.display = "none";
          document.getElementById("add_book").style.display = "none";
          document.getElementById("database").style.display = "none";
          document.getElementById("database-search").style.display = "none";
          document.getElementById("personal_info").style.display = "flex";
          document.getElementById("book-search").style.display = "none";
          document.getElementById("content_for_student_data").innerHTML = "";

          const table = document.getElementById('content_for_student_data');
          for (var i in data) {
            const Row = document.createElement("tr");
            Row.innerHTML = `<td>${data[i].Rollno}</td><td>${data[i].Name}</td><td>${data[i].Bookid}</td><td>${data[i].BookName}</td><td>${data[i].Authorname}</td><td>${data[i].State}</td><td>${data[i].Date}</td>`
            table.appendChild(Row);
          }

        }

        else {
          window.alert(data);
        }

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


});



document.getElementById('Userform').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get search value from the form
  const Passvalue = document.querySelector('input[name="Password"]').value;

  // Make an AJAX request to the server
  fetch('/User', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Password: Passvalue })
  })
    .then(response => response.json())
    .then(data => {
      // Render search results
      if (data) {
        document.getElementById("pass_field").value = "";
        document.getElementById("popup").style.display = "none";
      }
      else {
        window.alert("Password Is Incorrect");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
document.getElementById('ReturnForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get search value from the form
  const rollno = document.querySelector('input[name="rollno_return"]').value;
  const bookid = document.querySelector('input[name="bookid_return"]').value;

  // Make an AJAX request to the server
  fetch('/return', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rollno: rollno, bookid: bookid })
  })
    .then(response => response.json())
    .then(data => {
      window.alert(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

document.getElementById('add_book').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get search value from the form
  const bookid = document.querySelector('input[name="book_id"]').value;
  const bookName = document.querySelector('input[name="book_name"]').value;
  const authorname = document.querySelector('input[name="authorname"]').value;

  // Make an AJAX request to the server
  fetch('/return', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bookid: bookid, bookName: bookName, authorname: authorname })
  })
    .then(response => response.json())
    .then(data => {
      window.alert(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

