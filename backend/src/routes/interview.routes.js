const { Router } = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController } = require("../controllers/interview.controller");
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

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @desc generate resume pdf on the basis of user self description, resume content and job description.
 * @access Private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController);

module.exports = interviewRouter;
