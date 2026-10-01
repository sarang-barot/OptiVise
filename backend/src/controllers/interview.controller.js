const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

/**
 * @desc Controller to generate an interview report based on the provided resume, job description, and self-description
*/
const generateInterviewReportController = async (req, res) => {
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;
    
    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });
};

/**
 * @desc Controller to get an interview report by interviewId
*/
const getInterviewReportByIdController = async (req, res) => {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

    if (!interviewReport) {
        return res.status(400).json({
            message: "Interview report not found"
        });
    }

    return res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    });
};

/**
 * @desc Controller to get all interview reports of loggein user.
*/
const getAllInterviewReportsController = async (req, res) => {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -_v -preparationPlan -skillGaps -behavioralQuestions -technicalQuestions -matchScore -");
    
    return res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    });
};

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
};