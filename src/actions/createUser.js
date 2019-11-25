export function createUser() {
    const URL = 
}

fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
        user: {
            username: 'test',
            password: 'testpw'
        }
    })
})
.then(r => r.json())
.then(j => console.log(j))