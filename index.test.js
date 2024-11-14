

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const syncSeed = require('./seed.js');
const router = require('./routes/musicians');





beforeAll(async () => {

    //await db.sync({ force: true });
    await syncSeed();

});


describe('Testing the /musicians endpoint', () => {
test('Testing the /musicians endpoint with seeded data', async () => {
    const response = await request(app).get('/musicians');
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.length).toBeGreaterThan(0);
});
test('Testing the /musicians/:id endpoint with seeded data', async () => {
    const response = await request(app).get('/musicians/1');
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.id).toBe(1);
});

test('Testing the /musicians POST endpoint', async () => {
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
});
test('Testing the /musicians POST endpoint with missing name', async () => {
    const response = await request(app)
        .post('/musicians')
        .send({
            instrument: 'Guitar'
        });
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(400);
    expect(responseData.errors[0].msg).toBe('Name is required');
});
test('Testing the /musicians POST endpoint with missing instrument', async () => {
    const response = await request(app)
        .post('/musicians')
        .send({
            name: 'Calvin'
        });
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(400);
    expect(responseData.errors[0].msg).toBe('Instrument is required');
});

test('Testing the /musicians PUT endpoint', async () => {
    const response = await request(app)
        .put('/musicians/1')
        .send({
            name: 'Adrian',
            instrument: 'Piano'
        });
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.name).toBe('Adrian');
    expect(responseData.instrument).toBe('Piano');
});

test('Testing the /musicians DELETE endpoint', async () => {
    const response = await request(app).delete('/musicians/1');
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(responseData.message).toBe('Musician 1 deleted');
});

    
afterAll(async () => {
    await db.close();
});
    
})
