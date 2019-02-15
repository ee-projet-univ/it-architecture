module.exports.helloWorld = (event, context, callback) => {
    const data = JSON.parse(event.body);

    if (!data.name) {
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Invalid data : name is undefined',
        });
        return;
    }

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ result: 'Hello ' + data.name }),
    });
};