import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "lucasn.12.cabj@gmail.com",
        pass: ""
    }
})

export const sendEmailChangePassword = async(email, linkChangePassword) => {
    const mailOption = {
        from: "lucasn.12.cabj@gmail.com",
        to: email,
        subject: "Recuperación de contraseña",

        html: 
        `
        <p> Click aquí: </p> <button><a href=${linkChangePassword}>Cambiar contraseña</a></button>
        `   
    }
    transporter.sendMail(mailOption, (error, info) => {
        if(error) {
            console.log("Error al intentar enviar correo de recuperacion")
        } else {
            console.log("Correo enviado con exito", info.response)
        }
    })
}