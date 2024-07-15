import { dbContext } from "../db/DbContext.js"



class TrackedBugsService {
    async createTrackedBugs(bugData) {
        const trackedBug = await dbContext.TrackedBugs.create(bugData)
        await trackedBug.populate('tracker')
        await trackedBug.populate('bug')
        return trackedBug
    }
    async getUsersTrackingABug(bugId) {
        const foundBugs = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker', '-email')
        return foundBugs
    }
    async getBugsImTracking(accountId) {
        const foundBugs = await dbContext.TrackedBugs.find({ accountId: accountId }).populate('tracker').populate('bug')
        return foundBugs
    }
}

export const trackedBugsService = new TrackedBugsService()