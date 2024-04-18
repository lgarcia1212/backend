import bcrypt from 'bcrypt'

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(15))

const passwordE = createHash("coderhouse")
console.log(passwordE)

export const validatePassword = (passwordSend, passwordBdd) => bcrypt.compareSync(passwordSend, passwordBdd)

console.log(validatePassword("coderhouse", passwordE))