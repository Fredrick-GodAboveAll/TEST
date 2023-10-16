document.getElementById('createAccount').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Open the IndexedDB database
    const request = indexedDB.open('UserDataDB', 1);

    request.onerror = function(event) {
        alert("IndexedDB error: " + event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        const db = event.target.result;

        // Create an object store to store user data
        const objectStore = db.createObjectStore('users', { keyPath: 'username' });

        // Create an index to quickly check if the username exists
        objectStore.createIndex('username', 'username', { unique: true });
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');

        // Check if the username already exists
        const getUserRequest = objectStore.get(username);

        getUserRequest.onsuccess = function(event) {
            const existingUser = event.target.result;

            if (existingUser) {
                if (existingUser.password === password) {
                    alert('User already exists, please log in.');
                    location.reload();
                } else {
                    alert('Password exists, please choose a different one.');
                }
            } else {
                // Register the user if the username is unique
                const newUser = { username, password };
                objectStore.add(newUser);

                alert('Registration successful! You can now log in.');    

                location.reload();
                db.close();
                
            }
        };

        transaction.oncomplete = function() {
            
        };
    };
});

