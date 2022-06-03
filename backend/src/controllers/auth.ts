import { User } from '../models';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import UserInterface from '../utils/userInterface';
import { issueJwt } from '../utils/jwt';

const register = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName, role } = req.body; //voting points to be added later
    const displayName = firstName + ' ' + lastName;
    const hashedp = bcrypt.hashSync(password, 10);

    const newUser = new User({
        email,
        hashedp,
        displayName,
        firstName,
        lastName,
        role,
    });

    newUser.save((err: Error, user: UserInterface) => {
        if (err) {
            console.log('Error creating user: ', err);
            res.status(500).send(err);
        }
        const token = issueJwt(user._id, user.displayName, user.role, user.vpoints);
        res.status(200).send({
            token,
        });
    })
};

const login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body; //voting points to be added later

    User.findOne({ email }, (err: Error, user: UserInterface) => {
        if (err) {
            console.log('Error finding user: ', err);
            res.status(500).send(err);
            return;
        }
        if (!user) {
            res.status(401).send('User not found');
            return;
        }
        if (!bcrypt.compareSync(password, user.hashedp)) {
            res.status(401).send('Incorrect username/password combination');
            return;
        }
        const token = issueJwt(user._id, user.displayName, user.role, user.vpoints);
        res.status(200).send({
            token,
        });
    })
};

const googleLogin = (req: Request, res: Response) => {
    const profile:any = req.user;
    const email = profile.emails[0].value;
    User.findOne({ email }, async (err: Error, doc: UserInterface) => {
        if (err) {
            console.log('Error finding user: ', err);
            return;
        }
        if (!doc) {
            console.log('No such user');
            return;
        }
        const token = issueJwt(doc._id, doc.displayName, doc.role, doc.vpoints);
        res.status(200).send({
            token,
        });
    });
};

export default {
    register,
    login,
    googleLogin,
}