document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crud-form');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const userList = document.getElementById('user-list');
  
    // Load users from Local Storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Display existing users
    displayUsers();
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const name = nameInput.value;
      const email = emailInput.value;
  
      if (name && email) {
        // Create new user object
        const user = {
          id: Date.now(),
          name: name,
          email: email
        };
  
        // Add new user to the users array
        users.push(user);
  
        // Save updated users array to Local Storage
        localStorage.setItem('users', JSON.stringify(users));
  
        // Clear form inputs
        nameInput.value = '';
        emailInput.value = '';
  
        // Display users
        displayUsers();
      }
    });
  
    function displayUsers() {
      // Clear user list
      userList.innerHTML = '';
  
      // Loop through users and create list items
      users.forEach(function(user) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Name:</strong> ${user.name} | <strong>Email:</strong> ${user.email} | <button class="delete-btn" data-id="${user.id}">Delete</button>`;
        userList.appendChild(listItem);
      });
  
      // Attach event listener to delete buttons
      const deleteButtons = document.getElementsByClassName('delete-btn');
      for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', deleteUser);
      }
    }
  
    function deleteUser(e) {
      const userId = parseInt(e.target.getAttribute('data-id'));
  
      // Remove user from the users array
      users = users.filter(function(user) {
        return user.id !== userId;
      });
  
      // Save updated users array to Local Storage
      localStorage.setItem('users', JSON.stringify(users));
  
      // Display users
      displayUsers();
    }
  });