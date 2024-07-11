import { Schema } from "mongoose";

export const NoteSchema = new Schema({
    body: { type: String, required: true, minlength: 5, maxlength: 500, },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' },
}, { toJSON: { virtuals: true } }
)