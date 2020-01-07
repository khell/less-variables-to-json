const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const lessVariablesToJson = require('../src');

chai.use(chaiAsPromised);
const should = chai.should();

describe('less-variables-to-json', function() {
    it('should return JSON with no properties if given no arguments', function() {
        return lessVariablesToJson().should.eventually.deep.equal({});
    });

    it('should return JSON with correctly mapped properties, given correctly formed LESS variables', function() {
        let lessStr = "@myvar: 1234; @mycolor: #fff;";
        let expectedJSON = {
            "@myvar": "1234",
            "@mycolor": "#fff"
        };

        return lessVariablesToJson(lessStr).should.eventually.deep.equal(expectedJSON);
    });

    it('should return JSON with mutated names, as directed by the projection function', function() {
        let lessStr = "@myvar: 1234; @mycolor: #fff;";
        let expectedJSON = {
            "MYVAR": "1234",
            "MYCOLOR": "#fff"
        };
        let nameProjectionFunc = (str) => str.substr(1).toUpperCase();

        return lessVariablesToJson(lessStr, { nameProjectionFunc }).should.eventually.deep.equal(expectedJSON);
    });

    it('should return JSON with correctly mapped properties and LESS selectors removed', function() {
        let lessStr = "@myvar: 1234; @mycolor: #fff; .myclass { color: #000; }";
        let expectedJSON = {
            "@myvar": "1234",
            "@mycolor": "#fff"
        };

        return lessVariablesToJson(lessStr).should.eventually.deep.equal(expectedJSON);
    });

    it('should return JSON with only valid LESS transformed and invalid LESS stripped', function() {
        let lessStr = "@myvar???:xsas 1234 mycolor.#fff; @validvar: 60;";
        let expectedJSON = {
            "@validvar": "60"
        };

        return lessVariablesToJson(lessStr).should.eventually.deep.equal(expectedJSON);
    });
    
    it('should error if given undefined variable', function() {
        let lessStr = "@myvar: 1234; .myclass { color: @mycolor }";
        return lessVariablesToJson(lessStr).should.eventually.be.rejected;
    });

    it('should error if given malformed LESS with no terminating semicolon', function() {
        let lessStr = "@myvar: 1234; @mycolor: #fff";
        return lessVariablesToJson(lessStr).should.eventually.be.rejected;
    });
})