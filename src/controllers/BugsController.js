import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";


export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBug)
            .get('', this.getBugs)
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
}