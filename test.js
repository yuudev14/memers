const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./server");

chai.use(chaiHttp);
chai.should();

describe("endpoints", () => {
    let request;
    before(() => {
        // chai.request(app)
        // .post("/auth/sign-in")

    })
    after(() => {

    })
    beforeEach(() => {
        request = chai.request(app);
    });
    afterEach(() => {
        request.close();
    });

    it("should not accept people who hasnt signed in yet", async(done) => {
        try {
            const response = await chai.request(app).post("/auth/sign-in").send({ usernameOrEmail: "adasds", password: "adadasd" });
            expect(response).to.have.status(403);
            console.log(response);
            done()
        } catch (error) {
            done(error)

        }

    })
})