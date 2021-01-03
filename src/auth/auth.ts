import { Router, Request, Response } from 'express';
import { config } from '../config/config';
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';

const router: Router = Router();

// AUG
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    // return next();
    // Making sure that authorization header was included 
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ message: 'No authorization headers.' });
    }

    // Bearer X4YZA89UIS4UQJKX4YZA89UIS4UQJK
    // Splitting in the ' ' and verifying if there is part one and two and only it
    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2){
        return res.status(401).send({ message: 'Malformed token.' });
    }

    const token = token_bearer[1];

    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
      }
      return next();
    });
}

router.get('/', async (req: Request, res: Response) => {
    res.send('auth')
});

export const AuthRouter: Router = router;

