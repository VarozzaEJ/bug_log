import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";


export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .post('', this.createBug)
    }

    async createBug(request, response, next) {
        try {
            const user = request.userInfo
            const bugData = request.body
            bugData.creatorId = user.id
            const bug = await bugsService.createBug(bugData, user)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
}