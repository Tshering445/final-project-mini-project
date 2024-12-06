document.getElementById('submitCode').onclick = function() {
    const userInput = document.getElementById('codeInput').value;

    // Define valid codes for roles
    const codes = {
        '111': 'Admin'
    };

    // Check if the entered code is valid
    if (codes[userInput]) {
        const role = codes[userInput];
        localStorage.setItem('userRole', role);
        document.getElementById('message').innerText = `Access granted as ${role}!`;
        // You can add logic to redirect to appropriate page based on role
        // For example:
        // if (role === 'Admin') {
        //     window.location.href = 'admin.html';
        // } else if (role === 'Mess Coordinator') {
        //     window.location.href = 'coordinator.html';
        // }
        setTimeout(function() {
            window.location.href = 'home2.html';
        }, 150)
    } else {
        document.getElementById('message').innerText = 'Access denied! Invalid code.';
    }
};