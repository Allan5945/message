var http = require('http');
var querystring = require('querystring');

var contents = querystring.stringify({
    json_data: {
        email: 'SASAS',
        pass: '1212'
    }
});

var options = {
    host: 'http://54.167.149.132:4007/',
    path: '/v1/login',
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': 'NQsyIRQ4ASU_NhZQcSsiAAQdZSYlLTJ-axDbgRXcezbhEBq7nOSsaKE3',
        'Cookie': '_gmessage_key=SFMyNTY.g3QAAAACbQAAAAtfY3NyZl90b2tlbm0AAAAYVHN2Q3NqWUZaTHQ4NGlTN2pSNlVEZndNbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiXxZVTA.nFiTAlYOx7iz9dBYOGYFJ0mR-bclYq67HVDv3Zwb4SI'
    },
};

var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log('data:', data); // Ò»¶Îhtml´úÂë
    });
});
req.write(contents);
req.end;
