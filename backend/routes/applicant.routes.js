const express = require('express');
const router = express.Router();
const {
  getApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant,
  getUniqueLocations,
  getUniqueRoles,
  getUniqueStatuses,
} = require('../controllers/applicant.controller');


/**
 * @swagger
 * /applicants/location:
 *   get:
 *     summary: Get all unique locations
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/location', getUniqueLocations);

/**
 * @swagger
 * /applicants/role:
 *   get:
 *     summary: Get all unique roles
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/role', getUniqueRoles);

/**
 * @swagger
 * /applicants/status:
 *   get:
 *     summary: Get all unique application statuses
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/status', getUniqueStatuses);

/**
 * @swagger
 * /applicants:
 *   get:
 *     summary: Get all applicants (with optional filters)
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by applied role
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by application status
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/', getApplicants);

/**
 * @swagger
 * /applicants/{id}:
 *   get:
 *     summary: Get applicant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Applicant ID
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Applicant not found
 */
router.get('/:id', getApplicantById);

/**
 * @swagger
 * /applicants:
 *   post:
 *     summary: Create new applicant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               candidate_name:
 *                 type: string
 *               candidate_email:
 *                 type: string
 *               applied_roles:
 *                 type: string
 *               year_of_experience:
 *                 type: integer
 *               application_status:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               location:
 *                 type: string
 *               resume_link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Applicant created
 */
router.post('/', createApplicant);

/**
 * @swagger
 * /applicants/{id}:
 *   put:
 *     summary: Update applicant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Applicant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Applicant updated
 *       404:
 *         description: Applicant not found
 */
router.put('/:id', updateApplicant);

/**
 * @swagger
 * /applicants/{id}:
 *   delete:
 *     summary: Delete applicant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Applicant ID
 *     responses:
 *       200:
 *         description: Applicant deleted
 *       404:
 *         description: Applicant not found
 */
router.delete('/:id', deleteApplicant);
module.exports = router;
