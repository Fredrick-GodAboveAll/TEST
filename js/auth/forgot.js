document.getElementById("forgotPasswordLink").addEventListener("click", function() {
    // Show a confirmation dialog
    const userConfirmed = confirm("Are you sure you want to reset your password details?");

    // Check the user's choice
    if (userConfirmed) {
        // Open the IndexedDB
        const request = indexedDB.open('UserDataDB', 1);

        request.onerror = function (event)  {
            alert("IndexedDB error: " + event.target.errorCode);
        };

        request.onsuccess = function(event) {
            const db = event.target.result;

            // Open a transaction to access the database
            const transaction = db.transaction(['users'], 'readwrite');

            // Get the object store
            const objectStore = transaction.objectStore('users');

            // Clear all data in the object store
            const clearRequest = objectStore.clear();

            clearRequest.onsuccess = function() {
                alert("Password details have been reset.");
            };

            clearRequest.onerror = function() {
                alert("Failed to reset password details.");
            };
        };

        request.onerror = function(event) {
            alert("Failed to open the database.");
        };
    } else {
        // User dismissed the alert, you can perform other actions here.
    }
});