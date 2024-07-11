import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class BugsService {
    async destroybugs(bugId, userId) {
        const bugtodestroy = await this.getbugbyId(bugId)
        if (userId != bugtodestroy.creatorId) throw new Forbidden('you cant delete the bug you didnt')
        await bugtodestroy.deleteOne()

        return `${bugtodestroy.description} has been eliminated`
    }
    async updateBug(bugId, userId, bugupdatedata) {
        const originalBug = await this.getbugbyId(bugId)
        originalBug.description = bugupdatedata.description || originalBug.description
        originalBug.title = bugupdatedata.title || originalBug.title
        originalBug.closed = bugupdatedata.closed ?? originalBug.closed
        await originalBug.save()
        return originalBug
    }
    async getbugbyId(bugId) {
        const bug = (await dbContext.Bugs.findById(bugId)).populate('creator', 'email name picture')
        return bug
    }
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