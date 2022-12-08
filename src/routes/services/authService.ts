import { DocumentDefinition } from 'mongoose';
import { I_UserDocument, UserModel } from '../models/userModel';
import * as crypto from 'crypto';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface LoginRequest {
    username: string;
    password: string;
}

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
            throw new Error('User not found')
        }
        let testPassword = crypto.pbkdf2Sync(user.password, foundUser.salt,
            1000, 64, `sha512`).toString(`hex`)

        if (testPassword === foundUser.password) {
            const SECRET_KEY: Secret = 'your-secret-key-here';
            const token = jwt.sign({ username: foundUser.username, isAdmin: foundUser.isAdmin }, SECRET_KEY, {
                expiresIn: '1 hours',
            });

            return { username: foundUser.username, token: token };
        } else {
            throw new Error('Password is not correct');
        }

    } catch (error) {
        throw error;
    }
}