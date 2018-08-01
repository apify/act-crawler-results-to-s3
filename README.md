# act-crawler-results-to-s3
Apify actor to upload results from Apify crawler to AWS S3.
It is designed to run from [crawler finish webhook](https://www.apify.com/docs#crawler-finishWebhookUrl).

## Usage

For a specific crawler set the following parameters:

### Finish webhook URL (`finishWebhookUrl`)
```
https://api.apify.com/v2/acts/wLuJuoFw3g3YPgqHf/runs?token=APIFY_API_TOKEN
```

You can find your API token on [your Apify account page](https://my.apify.com/account#/integrations).

### Finish webhook data (`finishWebhookData`)
```json
{
  "awsS3Params": {
    "params": {
      "Bucket": "my-bucket"
    },
    "accessKeyId": "JighjGHklkfjh79dfds80",
    "secretAccessKey": "DA4dgweds56hdasdasd",
    "region": "us-west-2"
  },
  "executionResultsParams": {
    "format": "json",
    "simplified": 1
  },
  "itemsPerFile": 1000
}
```
Note: AWS user must have access to S3 bucket.

**Parameters:**

**`awsS3Params`** - Specifies [AWS SDK's S3 constructor parameters](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property) used for the upload. Note that `AccessKeyId`, `secretAccessKey` and `params.Bucket` are required.

**`executionResultsParams`** - Overwrites [Apify crawler execution results API call parameters](https://www.apify.com/docs/api-v1#/reference/results/execution-results/get-execution-results).

**`itemsPerFile`** - Number of web pages to store per file in S3. By default it is 1000.

## Files on AWS S3
The actor saves files to a specific Bucket with file name:
executionId_fileNumber.resultsFormat (e.g: `gjGZ6hdj6ZHhs_000000001.json`)
