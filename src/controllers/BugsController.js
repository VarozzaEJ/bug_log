import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { noteService } from "../services/NotesService.js";


export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBug)
            .get('', this.getBugs)
            .get('/:bugId', this.getBugbyID)
            .put('/:bugId', this.updateBug)
            .delete('/:bugId', this.destroyBugs)
            .get('/:bugId/notes', this.getNotesByBugId)
    }
    async updateBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bugupdatedata = request.body
            const user = request.userInfo
            const bug = await bugsService.updateBug(bugId, user.id, bugupdatedata)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
    async getBugbyID(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bug = await bugsService.getbugbyId(bugId)
            response.send(bug)
        } catch (error) {
            next(error)

        }
    }

    async createBug(request, response, next) {
        try {
            const userId = request.userInfo.id
            const bugData = request.body
            bugData.creatorId = userId
            const newBug = await bugsService.createBug(bugData)
            response.send(newBug)
        } catch (error) {
            next(error)
        }
    }

    async getBugs(request, response, next) {
        try {
            const bugs = await bugsService.getBugs()
            response.send(bugs)
        } catch (error) {

        }
    }

    async destroyBugs(request, response, next) {
        try {
            const bugId = request.params.bugId
            const user = request.userInfo
            const destroybug = await bugsService.destroybugs(bugId, user.id)
            response.send(destroybug)
        } catch (error) {
            next(error)
        }
    }

    async getNotesByBugId(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bug = await noteService.getnotesbybugid(bugId)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
}