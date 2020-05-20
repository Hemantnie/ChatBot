const socket = io()
const button = document.getElementById('button')
const input = document.getElementById('formGroupExampleInput')
const form = document.getElementById('message-form')

socket.on('message', (message) => {
    console.log(message);
})

// button.addEventListener('click', (e) => {
//     const message = input.value
//     socket.emit('sendMessage', message)
// })

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value
    socket.emit('sendMessage', message)
})