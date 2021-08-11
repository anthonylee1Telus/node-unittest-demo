require('chai').use(require('sinon-chai'));
require('chai').use(require('chai-as-promised'));

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const httpMocks = require('node-mocks-http');
const { expect } = require('chai');

describe('When testing index', () => {
    const executeStub = sinon.stub();
    const nextSpy = sinon.spy();
    let mockRequest;
    let mockResponse;

    const index = proxyquire('../../../user_1_2/sessions/index', {
        './getUserInfo': {
            execute: executeStub
        }
    })

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
    });

    afterEach(() => {
        executeStub.reset();
        nextSpy.resetHistory();
    })

    // Data driven tests sample
    const tests = 
    [
        { resultCode: 'OK', userInfoCheck: 'Y'},
        { resultCode: 'KO', userInfoCheck: 'N'}
    ];
    tests.forEach((params) => {
        it(`is setting locals properly if response from getUserInfo is ${params.resultCode}`, async () => {
            // Arrange
            executeStub.resolves({
                resultCode: params.resultCode,
                resultObj: {
                    userId: 1,
                    firstname: 'mockFirst',
                    lastname: 'mockLast'
                }
            });
    
            // Action
            await index.run(mockRequest, mockResponse, nextSpy);
    
            // Assert
            expect(mockResponse.locals.userInfoCheck).to.eql(params.userInfoCheck);
        });
    });

    it('returns next with error if there is error calling getUserInfo', async () => {
        // Arrange
        executeStub.rejects('some error occurred');

        // Action
        await index.run(mockRequest, mockResponse, nextSpy);

        // Assert
        expect(nextSpy).to.be.calledWith(sinon.match.instanceOf(Error));

    });
});