import mongoose from 'mongoose';
import * as crypto from 'crypto';
export interface I_UserDocument extends mongoose.Document {
    username: string;
    password: string;
    salt: string;
    registerDate: Date;
    lastLogin: Date;
    isAdmin: boolean;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
    username: { type: String, index: true, unique: true },
    password: { type: String },
    salt: { type: String },
    registerDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false }
});

UserSchema.pre('save', async function (next) {
    const user = this;
    console.log(user);

    if (user.isModified('password')) {
        let salt = crypto.randomBytes(16).toString('hex')
        let hashPassword = crypto.pbkdf2Sync(user.password, salt,
            1000, 64, `sha512`).toString(`hex`);
        user.password = hashPassword;
        user.salt = salt;
    }
    next();
});


export const UserModel = mongoose.model<I_UserDocument>('User', UserSchema);
