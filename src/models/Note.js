import { Schema } from "mongoose";

export const NoteSchema = new Schema({
    body: { type: String, required: true, minlength: 5, maxlength: 500, },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' },
}, { toJSON: { virtuals: true } }
)

NoteSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
NoteSchema.virtual('creator', {
    localField: 'bugId',
    ref: 'Bug',
    foreignField: '_id',
    justOne: true
})