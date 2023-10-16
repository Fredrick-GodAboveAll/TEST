// This code handles user login and validation

async function fetchData() {
    try {
        const response = await fetch('helpers/fred.json');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error:',error);
        return [];
    }

}

// When the login form is submitted
document.getElementById('login').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values of username, password, and userID from the form
    const nameInput = document.getElementById('me').value;
    const password = document.getElementById('you').value;
    const IdInput = document.getElementById('Id').value;

    // Open the IndexedDB database
    const request = indexedDB.open('UserDataDB', 1);

    request.onerror = function (event)  {
        alert("IndexedDB error: " + event.target.errorCode);
    };

    request.onsuccess = function (event)  {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');

        // Check if the entered credentials match any user in UserDataDB
        const getUserRequest = objectStore.get(nameInput);

        getUserRequest.onsuccess = async (event) =>  {
            const storedUser = event.target.result;

            if (storedUser && storedUser.password == password) {
                // If username and password match, proceed
                // Check if the entered user ID matches the stored user ID
                
                const data = await fetchData();
                const match = data.find(person => person.Name === nameInput && person.Id == IdInput);
                if (match) {
                    const userId = match.Id;
                    localStorage.setItem('loggedInUserId', userId)
                    // If the userID matches, it's a successful login
                    alert('Login successful!');
                    window.location.href = 'test.html';
                } else {
                    // If the userID doesn't match, show an alert
                    alert('User does not exist.');
                    window.location.reload();
                }
            } else {
                // If no user with matching credentials is found, show an alert
                alert('Invalid username or password. Please try again.');
                // Redirect to gittin.html or perform other actions as needed
                window.location.reload();
            }

        };

        transaction.oncomplete = function() {
            db.close();
        };

    };

});




