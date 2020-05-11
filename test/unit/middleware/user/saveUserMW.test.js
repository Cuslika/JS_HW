var chai = require("chai");
var spies = require("chai-spies");
chai.use(spies);
var expect = chai.expect;
var saveUserMW = require("../../../../middleware/user/saveUserMW.js");

describe("getUserByEmailMW middleware ", function () {
    it("should not save user", async function () {
      const objectrepomock = { userModel: {} };
      const reqmock = {
        body: {},
      };
      const resmock = {
        locals: {},
      };
      const nextmock = chai.spy();

      const mw = saveUserMW(objectrepomock);

      await mw(reqmock, resmock, nextmock);

      expect(resmock.locals.user).to.be.eql(undefined);
      expect(nextmock).to.have.been.called();
    }); 
    it("should save user", async function () {
        const savemock = chai.spy();
        class UserModelmock {
            save() {
                savemock();
            }
          };
        const objectrepomock = { userModel: UserModelmock };
        const reqmock = {
          body: {
            name: "asd",
            password: "asd"},
        };
        const redirectmock = chai.spy();
        const resmock = {
            redirect: redirectmock,
            locals: {},
        };
        
        const nextmock = chai.spy();

        const mw = saveUserMW(objectrepomock);
  
        await mw(reqmock, resmock, nextmock);
  
        expect(savemock).to.have.been.called();
        expect(redirectmock).to.have.been.called.with.exactly("/");
        expect(nextmock).to.not.have.been.called();
      });
});