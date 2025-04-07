module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applicants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      candidate_name: Sequelize.STRING,
      candidate_email: Sequelize.STRING,
      applied_roles: Sequelize.STRING,
      year_of_experience: Sequelize.INTEGER,
      application_status: Sequelize.STRING,
      phone_number: Sequelize.STRING,
      location: Sequelize.STRING,
      resume_link: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applicants');
  }
};
