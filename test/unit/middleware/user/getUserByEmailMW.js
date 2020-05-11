var chai = require("chai");
var spies = require("chai-spies");
chai.use(spies);
var expect = chai.expect;
var getUserByEmailMW = require("../../../../middleware/user/getUserByEmailMW.js");

describe("getUserByEmailMW middleware ", function () {
  it("should return user", async function () {
    const user = {
      name: "Bálint",
      email: "abc@cba.hu",
    };
    const userModelmock = {
      findOne: function (query) {
        if (query.email !== user.email) return null;
        return user;
      },
    };
    const objectrepomock = { userModel: userModelmock };
    const reqmock = {
      body: {
        email: user.email,
      },
    };
    const resmock = {
      locals: {},
    };
    const nextmock = chai.spy();

    const mw = getUserByEmailMW(objectrepomock);

    await mw(reqmock, resmock, nextmock);

    expect(resmock.locals.user).to.be.eql(user);
    expect(nextmock).to.have.been.called();
  });

  it("should not put out user",
    async function () {
      const objectrepomock = { userModel: {} };
      const reqmock = {
        body: {},
      };
      const resmock = {
        locals: {},
      };
      const nextmock = chai.spy();

      const mw = getUserByEmailMW(objectrepomock);

      await mw(reqmock, resmock, nextmock);

      expect(resmock.locals.user).to.be.eql(undefined);
      expect(nextmock).to.have.been.called();
    })
});
