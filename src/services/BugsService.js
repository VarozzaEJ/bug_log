import { dbContext } from "../db/DbContext.js"


class BugsService {
    async createBug(bugData,) {
        const bug = await dbContext.Bugs.create(bugData)
        await bug.populate('creator')
        return (bug)
    }
    async getBugs() {
        const bug = await dbContext.Bugs.find()
        return bug
    }

}

export const bugsService = new BugsService()