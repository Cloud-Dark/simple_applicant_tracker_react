const { Op } = require('sequelize');
const { Applicant } = require('../models');

// GET ALL + FILTER
const getApplicants = async (req, res) => {
  try {
    const { location, role, status } = req.query;

    const where = {};

    if (location) where.location = { [Op.iLike]: `%${location}%` };
    if (role) where.applied_roles = { [Op.iLike]: `%${role}%` };
    if (status) where.application_status = { [Op.iLike]: `%${status}%` };

    const applicants = await Applicant.findAll({
      where,
      order: [['id', 'ASC']],
    });

    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
const getApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findByPk(id);
    if (!applicant) return res.status(404).json({ message: 'Not found' });

    res.json(applicant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
const createApplicant = async (req, res) => {
  try {
    const data = req.body;
    const applicant = await Applicant.create(data);
    res.status(201).json(applicant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const applicant = await Applicant.findByPk(id);
    if (!applicant) return res.status(404).json({ message: 'Not found' });

    await applicant.update(data);
    res.json(applicant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findByPk(id);
    if (!applicant) return res.status(404).json({ message: 'Not found' });

    await applicant.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUniqueLocations = async (req, res) => {
  try {
    const locations = await Applicant.findAll({
      attributes: ['location'],
      group: ['location'],
      order: [['location', 'ASC']],
      raw: true, // ini penting
    });
    res.json(locations.map(item => item.location));    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUniqueRoles = async (req, res) => {
  try {
    const roles = await Applicant.findAll({
      attributes: ['applied_roles'],
      group: ['applied_roles'],
      order: [['applied_roles', 'ASC']],
    });
    res.json(roles.map(item => item.applied_roles));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUniqueStatuses = async (req, res) => {
  try {
    const statuses = await Applicant.findAll({
      attributes: ['application_status'],
      group: ['application_status'],
      order: [['application_status', 'ASC']],
    });
    res.json(statuses.map(item => item.application_status));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant,
  getUniqueLocations,
  getUniqueRoles,
  getUniqueStatuses,
};
