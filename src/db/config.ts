import mongoose from 'mongoose';

export async function CRUD() {
    try {
        const URL = 'mongodb://localhost:27017/ecommerce'

        let response = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Conectado a MongoDB')
    } catch (e) {
        console.log(e)
    }
}