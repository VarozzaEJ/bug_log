import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import BaseController from "../utils/BaseController.js";


export class TrackedBugsController extends BaseController {
    constructor() {
        super('api/trackedBugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTrackedBugs)
    }

    async createTrackedBugs(request, response, next) {
        try {
            const bugData = request.body
            const userId = request.userInfo.id
            bugData.accountId = userId
            const trackedBug = await trackedBugsService.createTrackedBugs(bugData)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }
}