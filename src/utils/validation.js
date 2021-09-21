const bcrypt = require('bcrypt');
const { Strategy } = require('passport-local');
const { getUserByUsername, getUserById } = require('../repository/user');


async function encryptPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}


async function decryptPassword(password, hashedPassword) {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}

function authenticate(passport) {
    passport.use(
        new Strategy(
            async (username, password, done) => {
                user = await getUserByUsername(username);
                if (!user.length) {
                    return done(null, false, {
                        message: `No registered with Username ${username}`
                    });
                }
                // decrypt password
                const isMatch = await decryptPassword(password, user[0].password);
                if (isMatch) {
                    return done(null, user[0], {
                        message: 'User Found'
                    });

                } else {
                    return done(null, false, {
                        message: 'Password incorrect'
                    });
                }
            }
        )
    );

    // implement below methods else you below
    // Error: Failed to serialize user into session
    passport.serializeUser((user, done) => {
        // serialise only user id 
        // stores only the id in the session
        done(null, user.id)

    })

    passport.deserializeUser(async (id, done) => {
        // uses the data serialised data to retrieve data from DB
        console.log(id)
        const user = await getUserById(id);
        done(null, user[0])

    })
}


module.exports = {
    encryptPassword,
    decryptPassword,
    authenticate
}