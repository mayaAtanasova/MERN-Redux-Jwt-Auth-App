import { Router } from "express";
import auth from '../controllers/auth';
import passport from "passport";

export const authRouter = Router();

authRouter.post('/register', auth.register);

authRouter.post('/login', auth.login);

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})
);

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }), auth.googleLogin
    // (req, res) => {
    //     res.redirect('/');
    // }
    );