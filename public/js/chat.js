const socket = io()
const button = document.getElementById('button')
const locationButton = document.getElementById('send-location')
const input = document.getElementById('formGroupExampleInput')
const form = document.getElementById('message-form')

socket.on('message', (message) => {
    console.log(message);
})

button.addEventListener('click', (e) => {
    const message = input.value
    socket.emit('sendMessage', message)
})

locationButton.addEventListener('click', (e) => {

    if (!navigator.geolocation) {
        return alert('Geo location is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((pos) => {
        // console.log(pos);

        socket.emit('sendLocation', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        })
    })
})