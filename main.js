const Apify = require('apify');
const AWS = require('aws-sdk');
const leftPad = require('left-pad');
const typeCheck = require('type-check').typeCheck;


// Definition of the input
const INPUT_TYPE = `{
    _id: Maybe String,
    actId: Maybe String,
    data: Maybe Object,
}`;

const DEFAULT_STATE = {
    offset: 0,
    storeCount: 0,
};


Apify.main(async () => {
    // Get input of your act
    const input = await Apify.getValue('INPUT');

    // Check input params
    if (!typeCheck(INPUT_TYPE, input)) {
        console.log('Expected input:');
        console.log(INPUT_TYPE);
        console.log('Received input:');
        console.dir(input);
        throw new Error("Received invalid input");
    }

    let state = await Apify.getValue('STATE') || DEFAULT_STATE;

    // Set default values
    const fileItemCounts = input.data.fileItemCounts || 1000;
    const executionResultsParams = input.data.executionResultsParams || {};
    const awsS3Params = input.data.awsS3Params || {};

    // Downloa data and save them to s3
    const s3 = new AWS.S3(awsS3Params);
    let lastCount = 0;
    while (true) {
        const executionResultsList = await Apify.client.crawlers.getExecutionResults(Object.assign(executionResultsParams, { executionId: input._id, limit: fileItemCounts, offset: state.offset }));
        lastCount = parseInt(executionResultsList.count);

        if (lastCount === 0) break;

        const rawResults = (executionResultsParams.format && executionResultsParams.format !== 'json') ? executionResultsList.items : JSON.stringify(executionResultsList.items);
        const file = Buffer.from(rawResults);
        const fileName = `${input._id}_${leftPad(state.storeCount+1, 9, '0')}.${executionResultsParams.format || 'json'}`;
        await s3.putObject({
            Bucket: input.data.awsS3Bucket,
            Key: fileName,
            Body: file
        }).promise();

        // Update Act state
        state.offset += lastCount;
        state.storeCount++;
        await Apify.setValue('STATE', state);
        console.log(`Saved ${lastCount} to file ${input.data.awsS3Bucket}/${fileName}`);
    }

    console.log('Act finished');
});
