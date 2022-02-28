//Definitions of users' roles
const userRole =
{
    SUPER_ADMIN: 5,
    ADMIN: 4,
    COMPANY: 3,
    USER: 2,
    UN_CONNECTED: 1
}

const userInscriptionOptions = {
    STAGE: 1,
    ACCOMPANIED: 2,
    FOCUS: 4
}

//expiration token and cookie
const maxAge = 1000 * 60 * 60 //1 hour

module.exports = {
    userRole,
    userInscriptionOptions,
    maxAge,
}