import { Router } from "express";
import auth from '../controllers/auth';
import passport from "passport";

export const authRouter = Router();

authRouter.post('/register', auth.register);

authRouter.post('/login', auth.login);

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt : "select_account",
})
);

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }), auth.googleLogin
);

authRouter.get('/logout', auth.logout);