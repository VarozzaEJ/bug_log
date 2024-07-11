import { Schema } from "mongoose";



export const BugSchema = new Schema({
    title: { type: String, required: true, minlength: 10, maxlength: 50, },
    description: { type: String, required: true, minlength: 10, maxlength: 500, },
    priority: { type: Number, required: true, min: 1, max: 5, },
    closed: { type: Boolean, default: false, required: true, },
    closedDate: { type: Date },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

BugSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})