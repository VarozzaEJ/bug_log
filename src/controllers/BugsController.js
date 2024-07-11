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
            const bugData = request.body
            const user = request.userInfo
            bugData.creatorId = user.id
            console.log(bugData);
            const bug = await bugsService.createBug(bugData)
            console.log(bug);
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
}