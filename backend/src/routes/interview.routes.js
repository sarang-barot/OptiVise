const { Router } = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { generateInterviewReportController } = require("../controllers/interview.controller");
const upload = require('../middlewares/file.middleware');

const interviewRouter = Router();

/**
 * @route POST /api/interview/
 * @desc Generate an interview report based on the provided resume, job description, and self-description
 * @access Private
 */
interviewRouter.post("/", authUser, upload.single('resume'), generateInterviewReportController);

module.exports = interviewRouter;
