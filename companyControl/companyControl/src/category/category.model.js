import { Schema, model } from 'mongoose';

const categorySchema = Schema({
    category: {
        type: String,
        uppercase: true,
        enum: ['EDUCACION', 'ALIMENTACION','DEPORTE','TRANSPORTE','ARTE'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    versionKey: false
})

export default model('Category', categorySchema)