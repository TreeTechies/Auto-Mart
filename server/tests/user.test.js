const assert = require('assert');
const { usersData } = require('../models/user.model');

describe('Auto Mart', () => {
    let server;
    
    beforeEach(() => {
        server = require('../index');
    });

    describe('Account', () => {

        const user = {
            'id': 2,
            'email': 'nsengimana@gmail.com',
            'first_name': 'Nsengimana',
            'last_name': 'Dominique',
            'password': 'Veda123.',
            'address': 'Gikondo',
            'is_admin': true
        };

        it('it should return 200 if user is sucessfull registered', () => {

        });

        it('it should return 200 if user is sucessfull logged in', () => {

        });

        it('it should return user token', () => {

        });

        it('it should return user email from token', () => {

        });
    });

    describe('Cars', () => {

        const user = {
            'id': 2,
            'email': 'nsengimana@gmail.com',
            'first_name': 'Nsengimana',
            'last_name': 'Dominique',
            'password': 'Veda123.',
            'address': 'Gikondo',
            'is_admin': true
        };

        it('it should return 200 if user is sucessfull registered', () => {

        });

        it('it should return 200 if user is sucessfull logged in', () => {

        });
    });

    describe('Order', () => {

        const user = {
            'id': 2,
            'email': 'nsengimana@gmail.com',
            'first_name': 'Nsengimana',
            'last_name': 'Dominique',
            'password': 'Veda123.',
            'address': 'Gikondo',
            'is_admin': true
        };

        it('it should return 200 if user is sucessfull registered', () => {

        });

        it('it should return 200 if user is sucessfull logged in', () => {

        });
    });

    describe('Admin', () => {

        const user = {
            'id': 2,
            'email': 'nsengimana@gmail.com',
            'first_name': 'Nsengimana',
            'last_name': 'Dominique',
            'password': 'Veda123.',
            'address': 'Gikondo',
            'is_admin': true
        };

        it('it should return 200 if user is sucessfull registered', () => {

        });

        it('it should return 200 if user is sucessfull logged in', () => {

        });
    });
});