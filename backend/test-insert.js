const { Applicant } = require('./models');

(async () => {
  try {
    await Applicant.bulkCreate([
      {
        candidate_name: 'John Doe',
        candidate_email: 'john@example.com',
        applied_roles: 'Backend Developer',
        year_of_experience: 4,
        application_status: 'Pending',
        phone_number: '1234567890',
        location: 'Jakarta',
        resume_link: 'https://example.com/resume-john'
      },
      {
        candidate_name: 'Jane Smith',
        candidate_email: 'jane@example.com',
        applied_roles: 'Frontend Developer',
        year_of_experience: 3,
        application_status: 'Interview',
        phone_number: '0987654321',
        location: 'Bandung',
        resume_link: 'https://example.com/resume-jane'
      },
      {
        candidate_name: 'Michael Johnson',
        candidate_email: 'michael@example.com',
        applied_roles: 'UI/UX Designer',
        year_of_experience: 5,
        application_status: 'Accepted',
        phone_number: '081234567890',
        location: 'Surabaya',
        resume_link: 'https://example.com/resume-michael'
      },
      {
        candidate_name: 'Emily Davis',
        candidate_email: 'emily@example.com',
        applied_roles: 'Data Analyst',
        year_of_experience: 2,
        application_status: 'Rejected',
        phone_number: '082345678901',
        location: 'Medan',
        resume_link: 'https://example.com/resume-emily'
      },
      {
        candidate_name: 'Daniel Wilson',
        candidate_email: 'daniel@example.com',
        applied_roles: 'DevOps Engineer',
        year_of_experience: 6,
        application_status: 'Pending',
        phone_number: '083456789012',
        location: 'Yogyakarta',
        resume_link: 'https://example.com/resume-daniel'
      },
      {
        candidate_name: 'Olivia Martinez',
        candidate_email: 'olivia@example.com',
        applied_roles: 'Project Manager',
        year_of_experience: 7,
        application_status: 'Interview',
        phone_number: '084567890123',
        location: 'Semarang',
        resume_link: 'https://example.com/resume-olivia'
      },
      {
        candidate_name: 'William Anderson',
        candidate_email: 'william@example.com',
        applied_roles: 'QA Engineer',
        year_of_experience: 4,
        application_status: 'Accepted',
        phone_number: '085678901234',
        location: 'Bali',
        resume_link: 'https://example.com/resume-william'
      },
      {
        candidate_name: 'Sophia Thomas',
        candidate_email: 'sophia@example.com',
        applied_roles: 'HR Specialist',
        year_of_experience: 3,
        application_status: 'Pending',
        phone_number: '086789012345',
        location: 'Malang',
        resume_link: 'https://example.com/resume-sophia'
      },
      {
        candidate_name: 'James Taylor',
        candidate_email: 'james@example.com',
        applied_roles: 'Product Owner',
        year_of_experience: 8,
        application_status: 'Rejected',
        phone_number: '087890123456',
        location: 'Depok',
        resume_link: 'https://example.com/resume-james'
      },
      {
        candidate_name: 'Isabella Moore',
        candidate_email: 'isabella@example.com',
        applied_roles: 'Scrum Master',
        year_of_experience: 5,
        application_status: 'Interview',
        phone_number: '088901234567',
        location: 'Tangerang',
        resume_link: 'https://example.com/resume-isabella'
      }
    ]);

    console.log('Insert 10 data sukses!');
  } catch (err) {
    console.error('Insert gagal:', err);
  }
})();
