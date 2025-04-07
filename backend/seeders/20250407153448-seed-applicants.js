module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Applicants', [
      {
        candidate_name: 'Budi Santoso',
        candidate_email: 'budi@mail.com',
        applied_roles: 'Backend Developer',
        year_of_experience: 3,
        application_status: 'Pending',
        phone_number: '08123456789',
        location: 'Jakarta',
        resume_link: 'https://drive.google.com/budi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        candidate_name: 'Siti Aminah',
        candidate_email: 'siti@mail.com',
        applied_roles: 'Frontend Developer',
        year_of_experience: 2,
        application_status: 'Interviewed',
        phone_number: '08234567890',
        location: 'Bandung',
        resume_link: 'https://drive.google.com/siti',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Applicants', null, {});
  }
};
