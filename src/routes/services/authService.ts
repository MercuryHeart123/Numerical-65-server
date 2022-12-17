import { DocumentDefinition } from 'mongoose';
import { I_UserDocument, UserModel } from '../models/userModel';
import * as crypto from 'crypto';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../../utill/errUtill';

interface LoginRequest {
    username: string;
    password: string;
}

const SECRET_KEY: Secret = 'test!1234';

export async function register(user: DocumentDefinition<I_UserDocument>): Promise<void> {
    try {
        if (!user.username || !user.password) {
            throw new Error('Username and password are required');
        }
        await UserModel.create(user);

    } catch (error) {

        throw error;
    }
}

export async function login(user: LoginRequest) {
    try {
        const foundUser = await UserModel.findOne({ username: user.username });
        if (!foundUser) {
            throw new Error(`User not found (${user.username})`)
        }
        let testPassword = crypto.pbkdf2Sync(user.password, foundUser.salt,
            1000, 64, `sha512`).toString(`hex`)

        if (testPassword === foundUser.password) {
            const token = jwt.sign({ username: foundUser.username, isAdmin: foundUser.isAdmin }, SECRET_KEY, {
                expiresIn: '1 hours',
            });
            await UserModel.updateOne({ username: user.username }, { $set: { lastLogin: new Date() } });

            return { username: foundUser.username, isAdmin: foundUser.isAdmin, token: token };
        } else {
            throw new Error(`Password is not correct ${user.username}`);
        }

    } catch (error) {
        throw error;
    }
}

export const verifyToken = async (req: Request) => {
    try {
        var token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Please authenticate');
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw error;
    }
}

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let decoded = await verifyToken(req);
        if ((<any>decoded).isAdmin) {
            next();
        } else {
            throw new Error('You are not admin');
        }
    } catch (error) {
        res.status(401).send({ error: getErrorMessage(error) });
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let decoded = await verifyToken(req);
        if ((<any>decoded).username) {
            next();
        } else {
            throw new Error('You are not user');
        }
    } catch (error) {
        res.status(401).send({ error: getErrorMessage(error) });
    }
}