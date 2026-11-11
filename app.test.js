const request = require('supertest');
const app = require('./app');

describe('Express Routing Tests', () => {
    test('GET /hobby returns the HTML form', async () => {
        const response = await request(app).get('/hobby');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('<form'); // Verifies form exists
    });

    test('POST /hobby processes form data correctly', async () => {
        const response = await request(app)
            .post('/hobby')
            .type('form')
            .send({ userName: 'Selva', userHobby: 'Cooking' });
        
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hey Selva your hobby is Cooking!!');
    });
});
