'use strict';

module.exports = (sequelize, DataTypes) => { 
  const Applicant = sequelize.define('Applicant', {
    candidate_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    candidate_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    applied_roles: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year_of_experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    application_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    resume_link: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'applicants'
  });

  return Applicant;
};
