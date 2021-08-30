require('chai').use(require('sinon-chai'));
require('chai').use(require('chai-as-promised'));

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const httpMocks = require('node-mocks-http');
const { expect } = require('chai');


describe('When testing getUserInfo', () => {
    const callAVSB2BVersionedStub = sinon.stub(); // stub function
    const getUserInfo = proxyquire('../../../user_1_2/sessions/getUserInfo', {
        '../../avs': {
            callAVSB2BVersioned: callAVSB2BVersionedStub
        }
    });
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
    });

    afterEach(() => {
        callAVSB2BVersionedStub.reset();  // reset stub to avoid any leftover stubs between tests
    })

    describe('When testing the execute function', () => {
        it('should call appropriate avs method with correct parameters, and set response properly when AVS give resultCode == OK', async () => {
            // Arrange
            mockRequest.params = { id: 2 };
            /**
             * mockRequest = { 
             *  method: 'GET',
             *  url: 'abc/123',
             *  params: {
             *   id: 467
             *  }
             * }
             */
            const mockAVSResults = { resultCode: 'OK', resultObj: { id: 8844, name: 'test name' }};
            callAVSB2BVersionedStub.resolves(mockAVSResults);

            // Action
            const results = await getUserInfo.execute(mockRequest, mockResponse);

            // Assert
            expect(results).to.deep.equal(mockAVSResults);
            expect(mockResponse).to.deep.include({ locals: { userinfo: { id: 8844, name: 'test name' }}});  // test the modified response
            expect(callAVSB2BVersionedStub).to.have.been.calledWith(2); // test the id params was being passed correctly when calling AVS
        });

        it('should not modify response if AVS call gives resultCode == KO', async () => {
            // Arrange
            const mockAVSResults = { resultCode: 'KO', resultObj: { id: 8844, name: 'test name' }};
            callAVSB2BVersionedStub.resolves(mockAVSResults);
            mockResponse.locals = {};

            // Action
            const results = await getUserInfo.execute(mockRequest, mockResponse);

            // Assert
            expect(results).to.deep.equal(mockAVSResults);
            expect(mockResponse.locals).to.be.eql({});
        })

        it('should throw error if AVS call returns error', async () => {
            // Arrange
            callAVSB2BVersionedStub.rejects('error reason');

            // Action + Assert
            await expect(getUserInfo.execute(mockRequest, mockResponse)).to.be.rejected.then((err) => {
                expect(err.message).to.equal('error reason');
            })

        });
    });
});