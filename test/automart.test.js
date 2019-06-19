const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index');
const should = chai.should();
const expect = chai.expect;
const { Database } = require('../server/helpers/db/auto_mart.db');

const db = new Database();

chai.use(chaiHttp);

const signup_data = {
    email: 'nsengimanavedadom@gmail.com',
    first_name: 'Nsengimana',
    last_name: 'Dominique',
    password: 'Veda123.',
    address: 'Gikondo'
};

const signin_data = {
    'email': 'nsengimanavedadom@gmail.com',
    'password': 'Veda123.'
}

describe('Auto Mart', () => {

    let token;
    let user;
    let car;

    /* before((done) => {
        db.deleteIfExist('users', 'email', signin_data.email);
        done();
    }); */

    /* describe('Sign up', () => {

        it('it should create account.', (done) => {
            chai.request(server).post('/api/v1/auth/signup').send(signup_data).end((err, res) => {
                res.should.have.status(200);
            });
            done();
        });
    }); */

    describe('Sign in', () => {

        it('it should signin.', async (done) => {
            chai.request(server).post('/api/v1/auth/signin').send(signin_data).end((err, res) => {
                //res.should.have.status(200);
                expect(res.status).to.be.equal(200);
            });
            done();
        });

    });

    /* describe('Cars', () => {

        it('it should post a new car', () => {

            var new_car = {
                'owner': user.id,
                'state': 'new',
                'price': 45500,
                'manufacturer': 'Tesla',
                'model': 'Roadstar',
                'body_type': 'B'
            };

            chai.request(server).post('/api/v1/car')
                .set('content-type', 'application/json')
                .set('auth-token', token)
                .send(new_car)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.message).to.be.equal('Car post sucessfuly added');
                    car = res.body.data;

                });
        });

        it('unsigned in users should be able to view list of available cars', () => {
            chai.request(server).get('/api/v1/car').end((err, res) => {
                res.should.have.status(200);
                expect(res.body.message).to.be.equal('All available cars');
            })
        });

        it('it should return a specific car by id', () => {
            chai.request(server).get(`/api/v1/car/${car.id}`).end((err, res) => {
                res.should.have.status(200);
                expect(res.body.data.id).to.be.equal(car.id);
            })
        });
    }); */

    /*describe('Order', () => {

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
            chai.request(server).patch(`/api/v1/car/${car.id}/status`)
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

        it('it should return all cars when user is admin', () => {
            chai.request(server).get('/api/v1/car')
            .set('content-type', 'application/json')
            .set('auth-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.message).to.be.equal('All cars sold and unsold');
                expect(res.body.data[0].body_type).to.be.equal('BB');
            })
        });

        it('it should return 200 if user is sucessfull logged in', () => {

        });
    }); */
});