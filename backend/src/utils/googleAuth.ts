import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { config } from 'dotenv';
import { User } from '../models/users';
import UserInterface from './userInterface';

config();

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        (_accessToken:any, _refreshToken:any, profile:any, done:any) => {
            // console.log(profile);
            // const email = profile.emails[0].value;
            // User.findOne({ email }, async (err: Error, doc: UserInterface) => {
            //     if (err) {
            //         console.log('Error finding user: ', err);
            //         return done(err);
            //     }
            //     if (doc) {
            //         return done(null, doc);
            //     }
            //     const newUser = new User({
            //         email,
            //         displayName: profile.displayName,
            //         firstName: profile.name.givenName,
            //         lastName: profile.name.familyName,
            //         role: 'user',
            //         vpoints: 1,
            //     });
            //     try {
            //         await newUser.save();
            //         return done(null, newUser);
            //     } catch (err) {
            //         console.log('Error creating user: ', err);
            //         return done(err);
            //     }
            // });
            done(undefined, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});