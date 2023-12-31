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
document.getElementById('login').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values of username, password, and userID from the form
    const nameInput = document.getElementById('me').value;

    const IdInput = document.getElementById('Id').value;

    // Open the IndexedDB database

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
        window.location.href = 'index.html';
    }

});




