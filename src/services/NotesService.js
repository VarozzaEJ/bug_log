import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class NotesService {
    async getnotesbybugid(bugId) {
        const bug = await dbContext.Notes.find({ bugId: bugId })
        return (bug)
    }


    getNotes() {
        const notes = dbContext.Notes.find()
        return notes
    }
    async createNote(NoteData) {
        const bug = await dbContext.Notes.create(NoteData)
        await bug.populate('creator')
        return (bug)
    }
    async destroyNote(NoteId, userId) {
        const noteToDestroy = await dbContext.Notes.findById(NoteId)
        if (userId != noteToDestroy.creatorId) throw new Forbidden('you cant delete the bug you didnt')
        await noteToDestroy.deleteOne()

        return `${noteToDestroy.body} has been eliminated`
    }

}
export const noteService = new NotesService