require('chai').use(require('sinon-chai'));
require('chai').use(require('chai-as-promised'));

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const httpMocks = require('node-mocks-http');
const { expect } = require('chai');

describe('When testing index', () => {
    const executeStub = sinon.stub();
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
    })

    it('calls getUserInfo and setting locals properly if response is successful', async () => {

    });
});