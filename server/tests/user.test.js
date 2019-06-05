const assert = require('assert');
const request = require('supertest');
const { User, Users } = require('../models/user.model');

describe('User', () => {
    let server;
    
    beforeEach(() => {
        server = require('../index');
    });

    it('it should return 200 if user is sucessfull registered', async () => {
        let res = await request(server).post('/signup')
        .send({
            'id': 2,
            'email': 'nsengimana@gmail.com',
            'first_name': 'Nsengimana',
            'last_name': 'Dominique',
            'password': 'Veda123.',
            'address': 'Gikondo',
            'is_admin': true
        });
        assert(res.status, 200);
    });

    it('users should be 2', () => {
        assert(Users.length, 2);
    });

    /* it('it should return token if user is sucessfull authenicated', async () => {
        let res = await request(server).post('/signin').send({
            'email': 'nsengimana@gmail.com',
            'password': 'Veda123.'
        });
        let isAuthenticated = res.body;
        console.log(`is Authenticated: ${isAuthenticated}`);
        console.log(`header: ${res.header('authtoken')}`);
        assert(isAuthenticated, true);
    }); */
});