const bcrypt = require('bcrypt');

module.exports = {
    encryptPassword: async (password) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
    },
    decryptPassword: (password, hashedPassword) => {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) throw err;
            return result
        })
    }
}

