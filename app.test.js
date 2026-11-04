const request = require('supertest');
const app = require('./app');

describe('Express Routing Tests', () => {
    test('GET / returns the root welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to the EC2 Deployment Homepage!');
    });

    test('GET /:name returns the dynamic welcome message', async () => {
        const response = await request(app).get('/Jenkins');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome Jenkins');
    });
});
