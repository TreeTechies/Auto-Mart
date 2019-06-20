const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index');
const should = chai.should;
const expect = chai.expect;
const faker = require('faker');


chai.use(chaiHttp);


describe('Auto Mart', () => {

    let token;
    let token_admin;
    let car;

    const email = faker.internet.email();

    const signup_data = {
        email: `${email}`,
        first_name: 'Nsengimana',
        last_name: 'Dominique',
        password: 'Do123456',
        address: 'Gikondo'
    };

    const signin_data = {
        'email': `${email}`,
        'password': 'Do123456'
    }

    const signin_data_admin = {
        'email': `admin@automart.com`,
        'password': '123456789'
    }

    const signin_data_invalid = {
        'email': `${email}`,
        'password': 'sifedisudsduhu'
    }

    describe('ACCOUNT', () => {
        it('it should create account.', (done) => {
            chai.request(server).post('/api/v1/auth/signup').send(signup_data).end((err, res) => {
                expect(res.status).to.be.eq(201);
                done();
            });
        });

        it('it should return 409 if email exist.', (done) => {
            chai.request(server).post('/api/v1/auth/signup').send(signup_data).end((err, res) => {
                expect(res.status).to.be.eq(409);
                done();
            });
        });
    
        it('it should signin.', (done) => {
            chai.request(server).post('/api/v1/auth/signin').send(signin_data).end((err, res) => {
                expect(res.status).to.be.eq(200);
                user = res.body.data;
                token = res.body.user_token;
                done();
            });
        });

        it('it should signin as admin.', (done) => {
            chai.request(server).post('/api/v1/auth/signin').send(signin_data_admin).end((err, res) => {
                expect(res.status).to.be.eq(200);
                admin = res.body.data;
                token_admin = res.body.user_token;
                done();
            });
        });

        it('it should return 400 if password is invalid.', (done) => {
            chai.request(server).post('/api/v1/auth/signin').send(signin_data_invalid).end((err, res) => {
                expect(res.status).to.be.eq(400);
                done();
            });
        });

        it('it should return 401 if email is not exist.', (done) => {
            chai.request(server).post('/api/v1/auth/signin').send({'email': 'ndjf@gmail.com', 'password': 'jksdkjdkjjd'}).end((err, res) => {
                expect(res.status).to.be.eq(401);
                done();
            });
        });
    })

    describe('CARS', () => {
        it('it should post a new car', (done) => {
            var new_car = {
                'state': 'new',
                'price': 45500,
                'manufacturer': 'Tesla',
                'model': 'Roadstar',
                'body_type': 'B'
            };
            chai.request(server).post('/api/v1/car').set('content-type', 'application/json')
            .set('auth-token', token).send(new_car).end((err, res) => {
                expect(res.status).to.be.eq(201);
                car = res.body.data;
                done();
            });
        });

        it('unsigned in users should be able to view a list of available cars', () => {
            chai.request(server).get('/api/v1/car').end((err, res) => {
                expect(res.status).to.be.eq(200);
            })
        });

        it('it should return a specific car by id', (done) => {
            chai.request(server).get(`/api/v1/car/${car.id}`).end((err, res) => {
                expect(res.status).to.be.eq(200);
                expect(res.body.data.id).to.be.equal(car.id);
                done();
            })
        });
    });

    describe('ORDERS', () => {

        it('signed in users should be able to make a purchase order', () => {
            chai.request(server).post('/api/v1/order').set('content-type', 'application/json')
            .set('auth-token', token).send({'id': car.id}).end((err, res) => {
                expect(res.status).to.be.equal(200);
            })
        });

        it('return 404 if car id a given id is not found', () => {
            chai.request(server).post('/api/v1/order').set('content-type', 'application/json')
            .set('auth-token', token).send({'id': 2222}).end((err, res) => {
                expect(res.status).to.be.equal(404);
            })
        });

        it('return 404 if user is not signed in', () => {
            chai.request(server).post('/api/v1/order').send({'id': car.id}).end((err, res) => {
                expect(res.status).to.be.equal(401);
            })
        });

        it('update car status', (done) => {
            chai.request(server).patch(`/api/v1/car/${car.id}/status`).set('content-type', 'application/json').set('auth-token', token)
            .send({"status": "sold"}).end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.message).to.be.equal('Car status was updated sucessfuly.');
                done();
            })
        });

        it('update car status, return 401 if is not signed in', (done) => {
            chai.request(server).patch(`/api/v1/car/${car.id}/status`)
            .send({"status": "sold"}).end((err, res) => {
                expect(res.status).to.be.equal(401);
                done();
            })
        });

        it('return 401', (done) => {
            chai.request(server).patch(`/api/v1/car/${car.id}/status`).set('content-type', 'application/json').set('auth-token', token)
            .send({"status": "sold"}).end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.message).to.be.equal('Car status was updated sucessfuly.');
                done();
            })
        });
    });

    describe('FLAG', () => {
        it('it should flag a car', () => {
            chai.request(server).post('/api/v1/flag').set('content-type', 'application/json')
            .set('auth-token', token).send({
                'car_id': car.id,
                'reason': 'test reason',
                'description': 'this is a test reason description',
            }).end((err, res) => {
                expect(res.status).to.be.equal(201);
            });
        });
    })

    describe('Admin', () => {

        it('it should return all cars when user is admin', () => {
            chai.request(server).get('/api/v1/car').set('content-type', 'application/json')
            .set('auth-token', token_admin).end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.message).to.be.equal('All cars sold and unsold');
                expect(res.body.data[0].body_type).to.be.equal('B');
            })
        });

        it('it should return 200 if admin delete', () => {
            chai.request(server).delete(`/api/v1/car/${car.id}`).set('content-type', 'application/json')
            .set('auth-token', token_admin).end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.message).to.be.equal('Car Ad successfully deleted');
            })
        });
    });
});