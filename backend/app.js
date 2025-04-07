const express = require('express');
const app = express();
const applicantRoutes = require('./routes/applicant.routes');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

app.use(express.json());
app.use('/applicants', applicantRoutes);

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

