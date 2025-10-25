import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-ssrdwpl-shard-00-00.xuujcnj.mongodb.net:27017,ac-ssrdwpl-shard-00-01.xuujcnj.mongodb.net:27017,ac-ssrdwpl-shard-00-02.xuujcnj.mongodb.net:27017/?ssl=true&replicaSet=atlas-caz7ga-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blogsy`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;