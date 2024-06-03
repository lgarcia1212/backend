import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    const token = jwt.sign({ user }, "coder", { expiresIn: '12h' })
    return token
}

console.log(generateToken({
    "_id": "65fb7dbb4c863f6027e6da4b",
    "first_name": "Lucas",
    "last_name": "Garcia",
    "password": "$2b$12$tdojC3W4n5vLWcqV0qJaEuIwAyFZdmAMWjmZwvvxLzaUwm/5idTNG",
    "age": 30,
    "email": "lng@lng.com",
    "rol": "Admin",
    "__v": 0
}))