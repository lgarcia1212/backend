const socket = io()

const chatkBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')

Swal.fire({
    title: "Inicio de Sesion",
    input: "text",
    text: "Ingrese nombre de usuario",
    inputValidator: (valor) => {
        retunr !valor && 'Ingrese un nombre valido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

chatBox.addEventListener('change', (e) => {
        if(chatBox.value.trim().length > 0) {
            socket.emit('mensaje', {usuario: user, mensaje: chatBox.value, hora: new Date().toLocaleString() })
            chatBox.value = ""
        }
    })

socket.on('mensajeLogs', info => {
    messageLogs.innerHTML = ""
    info.forEach(mensaje => {
        messageLogs.innerHTML += `<p>${mensaje.hora} ${mensaje.usuario} dice: ${mensaje.mensaje}</p>`
    })
})