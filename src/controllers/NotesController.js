import { Auth0Provider } from "@bcwdev/auth0provider";
import { noteService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {
    constructor() {
        super('api/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createNote)
            .get('', this.getNotes)
            .delete('/:noteId', this.destroyNote)
    }
    async getNotes(request, response, next) {
        try {
            const bugs = await noteService.getNotes()
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }
    async createNote(request, response, next) {
        try {
            const NoteData = request.body
            const userId = request.userInfo.id
            NoteData.creatorId = userId
            const newNote = await noteService.createNote(NoteData)
            response.send(newNote)
        } catch (error) {
            next(error)
        }
    }

    async destroyNote(request, response, next) {
        try {
            const NoteId = request.params.noteId
            const user = request.userInfo
            const destroyedNote = await noteService.destroyNote(NoteId, user.id)
            response.send(destroyedNote)
        } catch (error) {
            next(error)
        }
    }

}