// passport-jwt

import passportJWT from 'passport-jwt';
import * as AdminUserService from '../services/admin-user-service.js';
import * as UserService from '../services/user-service.js';

function initPassport(passport) {
  const JWTStrategy = passportJWT.Strategy;
  const ExtractJWT = passportJWT.ExtractJwt;

  const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('Authorization'), // 'Authorization' is the header key where the token is stored
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    'admin-jwt',
    new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const adminUser = await AdminUserService.getAdminUserById(jwtPayload.id);
        if (adminUser) {
          return done(null, adminUser);
        } else {
          return done(null, false, { message: 'Admin User not found' });
        }
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    'user-jwt',
    new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await UserService.getUserById(jwtPayload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'User not found' });
        }
      } catch (error) {
        return done(error);
      }
    })
  );
}

export { initPassport };
