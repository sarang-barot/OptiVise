const { Router } = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController } = require("../controllers/interview.controller");
const upload = require('../middlewares/file.middleware');

const interviewRouter = Router();

/**
 * @route POST /api/interview/
 * @desc Generate an interview report based on the provided resume, job description, and self-description
 * @access Private
 */
interviewRouter.post("/", authUser, upload.single('resume'), generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Fetch an interview report by interviewId.
 * @access Private
 */
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportByIdController);

/**
 * @route GET /api/interview/
 * @desc Get all interview reports of logged in user.
 * @access Private
 */
interviewRouter.get("/", authUser, getAllInterviewReportsController);

module.exports = interviewRouter;
