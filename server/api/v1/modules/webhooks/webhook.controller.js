const async = require('async');
const extractTool = require('url');
const jwt = require('jsonwebtoken');
const config = require('../common/config');
const path = require('path');
const communityController = require('../../modules/communitytools/communitytools.controller');
const transformEventData = require('./transformEventData');

function verifyToolToken(token, done) {
    console.log('3.inside verify token');
    jwt.verify(token, config.appConstants.secret, (err, tokenClaims) => {
        if (err) {
            console.log('error is ', err);
            return done(err, 'unauhtorized');
        }
        console.log('token is', tokenClaims);
        done(null, tokenClaims);
    });
}

function extractEventData(eventPayload, tokenClaims, done) {
    console.log('3.inside extract event datat');
    let obj;
    transformEventData.extractEventData(eventPayload, tokenClaims, (err, extractedData) => {
        if (err) {
            return done(err, 'unable to extract data');
        }
        else {
         obj={ extractedData, tokenClaims };
        //  console.log('obj is ..',obj);
        done(null, obj);
        }
    });
}

function sendToCommunityService(payload,obj,done) {

    // tokenClaims will have { domainName, toolId, username }
    // console.log('6.inside token claim',obj.tokenClaims);
    communityController.postTool(obj.tokenClaims.domainName,obj.extractedData, (err, result) => {

        if (err) {
            return done(err, 'Unable to POST Tool in Community');
        }
        return done(null, 'Successfully Sent');
    });
}

function handleToolEvent(token, eventPayload, done) {

    token = jwt.sign({
        "domainName": "digital",
        "toolId": "discourse",
        "username": "ceanstackdev@gmal.com"
    }, config.appConstants.secret, { expiresIn: config.appConstants.expiryTime });

    console.log('2.getting inside handle tool event');
    async.waterfall([
        verifyToolToken.bind(null, token),
        extractEventData.bind(null, eventPayload),
        sendToCommunityService.bind(null, eventPayload)
    ],
        (err, result) => {
            if (err) {
                done(err, 'Internal Error');
            }
            done(null, 'successfully sent');
        });
}

module.exports = {
    handleToolEvent
}