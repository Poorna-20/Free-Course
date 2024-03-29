const request = require('supertest');
const app = require('../app');
const db = require('../models/index');
const PORT = process.env.PORT || 3000;

let server,agent;

describe('Add Course Route', () => {
    beforeAll(async() => {
      await db.sequelize.sync({force:true})
      // Start the server
      server = app.listen(PORT, () => {  });
      agent = request.agent(server);
    });
    afterAll(async() => {
      // Close the server
      await db.sequelize.close();
      server.close();
    });
    test('should add a new course and redirect to admin dashboard', async () => {

      // Simulate authentication as an admin
    const agent = request.agent(app);
    await agent.post('/login').send({ email: 'admin@example.com', password: 'adminpassword' });


      const courseData = {
        title: 'New Course',
        description: 'Description of the new course',
        contentText: 'Content text',
        contentUrl: 'https://example.com/content'
      };

      const res = await agent
        .post('/add-course')
        .send(courseData);
      expect(res.status).toBe(302);
      expect(res.header.location).toBe('/admin-dashboard');
    });
  });
  
