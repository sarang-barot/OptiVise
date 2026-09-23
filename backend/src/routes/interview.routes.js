const { Router } = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { generateInterviewReportController } = require("../controllers/interview.controller");

const interviewRouter = Router();

/**
 * @route POST /api/interview/
 * @desc Generate an interview report based on the provided resume, job description, and self-description
 * @access Private
 */
interviewRouter.post("/", authUser, generateInterviewReportController);

module.exports = interviewRouter;
