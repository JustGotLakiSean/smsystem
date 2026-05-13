// get Form from DOM first
const form = document.getElementById('loginForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    // get the value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if(username === "" || password === "") {
        console.log("Missing Field required")
        return
    }

    fetch('/api/auth/student-login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json()) // parse response before accessing token
    .then(data => {
        if(data.token) {
            localStorage.setItem('token', data.token) // access token
            window.location.href = '/dashboard'
        } else {
            console.log('Login failed', data.message)
        }
    })
    .catch(error => console.log('Error: ', error))
})