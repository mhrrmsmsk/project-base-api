const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const config = require('../config');
const Users = require('../db/models/Users');
const UserRoles = require('../db/models/UserRoles');

module.exports = function () {
    let strategy = Strategy({
        secretOrKey: config.JWT.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {


        try {
            let user = await Users.findOne({ _id: payload.id });
            if (user) {
                let userRoles = await UserRoles.find({ _id: payload.id });
                let rolePrivilages = await rolePrivilages.find({ role_id: { $in: userRoles.map(ur => ur.role_id) } });

                done(null, {
                    id: user._id,
                    roles: rolePrivilages,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    exp: parseInt(Date.now() / 1000) * config.JWT.EXPIRE_TIME
                });
            } else {
                done(new Error('User not found'), null);
            }
        } catch (error) {
            done(error, null);
        }
    });

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', { session: false});
        }
    }
};