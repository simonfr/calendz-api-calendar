const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')
const helper = require('../test.helper')

describe('./routes/week.route', () => {
  // ====================================================
  // == GET /v1/week
  // ====================================================
  describe('GET /v1/week - get current week', () => {
    // make sure route requires auth
    helper.testAuthentication('/v1/week')

    // make sure route gets user's firstname & lastname
    helper.testFirstnameAndLastname('/v1/week')

    it('should success (200) : ok', (done) => {
      request(app).get('/v1/week').set(helper.defaultSetsWithAuth).expect('Content-Type', /json/)
        .query({ firstname: 'Arthur', lastname: 'Dufour' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.property(res.body, 'week')
          done()
        })
    })
  })

  // ====================================================
  // == GET /v1/week/:date
  // ====================================================
  describe('GET /v1/week/:date - get by date', () => {
    // make sure route requires auth
    helper.testAuthentication('/v1/week/06-06-19')

    // make sure route gets user's firstname & lastname
    helper.testFirstnameAndLastname('/v1/week/06-06-19')

    // make sure date is valid
    helper.testDate('/v1/week/eazeazeaze')

    it.skip('should success (200) : ok', (done) => {
      request(app).get('/v1/week/06-06-19').set(helper.defaultSetsWithAuth).expect('Content-Type', /json/)
        .query({ firstname: 'Arthur', lastname: 'Dufour' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.property(res.body, 'week')
          done()
        })
    })
  })
})
