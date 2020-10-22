const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const {User} = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUB_KEY,
  algorithms: ['HS256']
};

module.exports = (passport) => {

  passport.use(new JwtStrategy(options, async function (jwt_payload, done) {
      try {
        const user = await User.findOne({where: {id: jwt_payload.sub, emailIsVerified: true}});

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log(err)
        done(err, false)
      }
    })
  );
}


