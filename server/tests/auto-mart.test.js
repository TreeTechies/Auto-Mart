const { usersData } = require('../models/user.model');
const { Car } = require('../models/car.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const signup_data = {
    email: 'nsengimana@gmail.com',
    first_name: 'Nsengimana',
    last_name: 'Dominique',
    password: 'Veda123.',
    address: 'Gikondo',
    is_admin: true 
};

const signin_data = {
    'email': 'nsengimana@gmail.com',
    'password': 'Veda123.'
}

describe('Auto Mart', () => {
    
    let token;
    let user;
    let car;
   
    describe('Account', () => {

        it('it should return 200 if user is sucessfull registered', (done) => {
            chai.request(server).post('/api/v1/users/signup').send(signup_data).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it('it should return 200 and token if user is sucessfull logged in', (done) => {
            chai.request(server).post('/api/v1/users/signin').send(signin_data).end((err, res) => {
                res.should.have.status(200);
                                
                res.body.should.have.property('user_token'); 
              
                token = res.body.user_token;

                user = res.body.data;

                should.exist(token);
                should.exist(user);

                done();
            });
        });

    });

    describe('Cars', () => {

        it('it should return 200 and message if a car is sucessfull added', () => {
            
            var new_car = {
                'owner': user.id,
                'state': 'new',
                'price': 45500,
                'manufacturer': 'Tesla',
                'model': 'Roadstar',
                'body_type': 'B'
            };

            chai.request(server).post('/api/v1/cars/postCar')
            .set('content-type', 'application/json')
            .set('auth-token', token)
            .send(new_car)
            .end((err, res) => {

              res.should.have.status(200);
              expect(res.body.message).to.be.equal('Car post sucessfuly added');
              car = res.body.data;

            })
        });

        it('unsigned in users should be able to view list of available cars', () => {
            chai.request(server).get('/api/v1/cars').end((err, res) => {
              res.should.have.status(200);
              console.log(res.body.message)
              expect(res.body.message).to.be.equal('All available cars');
            })
        });

        it('it should return a specific car by id', () => {
            chai.request(server).get(`/api/v1/cars/${car.id}`).end((err, res) => {
              res.should.have.status(200);
              expect(res.body.data.id).to.be.equal(car.id);
            })
        });
    });

    describe('Order', () => {

        it('signed in users should be able to make a purchase order', () => {
            chai.request(server).post('/api/v1/order')
            .set('content-type', 'application/json')
            .set('auth-token', token)
            .send({'id': car.id})
            .end((err, res) => {
                
              res.should.have.status(200);
              expect(res.body.message).to.be.equal('Purchase order was done sucessfuly.');

            })
        });

        it('update car status', () => {
            chai.request(server).patch(`/api/v1/cars/markCarAsSold/${car.id}`)
            .set('content-type', 'application/json')
            .set('auth-token', token)
            .send({"status": "sold"})
            .end((err, res) => {
                
              res.should.have.status(200);
              expect(res.body.message).to.be.equal('Car status is updated sucessfuly.');

            })
        });
    });

    describe('Admin', () => {

        it('it should return 200 if user is sucessfull registered', () => {

        });

        it('it should return 200 if user is sucessfull logged in', () => {

        });
    });
});