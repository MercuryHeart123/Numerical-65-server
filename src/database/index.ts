import { connect, connection, set } from 'mongoose';

export const dbConnect = () => {


    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    set('strictQuery', false)
    connect(uri, (err) => {
        if (!err) console.log('MongoDB has failed to connect.');
    });
    connection.on('connect', function () {
        console.error('MongoDB has connected successfully');
    });
}