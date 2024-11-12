// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
//const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
test('Testing the /musicians endpoint', async () => {
    const response = await request(app).get('/musicians');
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.length).toBe(3);
})
test(' Testing the /musicians/:id endpoint', async () => {
    const response = await request(app).get('/musicians/1');
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.id).toBe(1);
})
test(' Testing the /musicians POST endpoint', async () => {
    const response = await request(app)
    .post('/musicians')
    .send({
        name: 'Calvin',
        instrument: 'Guitar'
    });
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.name).toBe('Calvin');
    expect(responseData.instrument).toBe('Guitar');
})
test(' Testing the /musicians PUT endpoint', async () => {
    const response = await request(app)
    .put('/musicians/1')
    .send({
        name: 'Calvin',
        instrument: 'Guitar'
    });
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.name).toBe('Calvin');
    expect(responseData.instrument).toBe('Guitar');
})
test(' Testing the /musicians DELETE endpoint', async () => {
    const response = await request(app).delete('/musicians/1');
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.message).toBe('Musician 1 deleted');
})



    
})
