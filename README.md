# act-crawler-results-to-s3
Apify act to upload results from Apify crawler to AWS S3.
It is designed to run from [crawler finish webhook](https://www.apifier.com/docs#finishWebhookUrl).

## Usage

For a specific crawler set the following parameters:

### Finish webhook URL (`finishWebhookUrl`)
```
https://api.apifier.com/v2/acts/wLuJuoFw3g3YPgqHf/runs?token=APIFIER_API_TOKEN
```

You can find your API token on [your Apifier account page](https://www.apifier.com/account#api-integrations).

### Finish webhook data (`finishWebhookData`)
```json
{
  "awsS3Params": {
    "params": {
      "Bucket": "my-bucket"
    },
    "accessKeyId": "JighjGHklkfjh79dfds80",
    "secretAccessKey": "DA4dgweds56hdasdasd"
  },
  "executionResultsParams": {
    "format": "jsonl"
  },
  "itemsPerFile": 1000
}
```

**Parameters:**

**`awsS3Params`** - Specifies [AWS SDK's S3 constructor parameters](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property) used for the upload. Note that `AccessKeyId`, `secretAccessKey` and `params.Bucket` are required.

**`executionResultsParams`** - Overwrites [Apifier crawler execution results API call parameters](https://www.apifier.com/api-reference#/reference/results/execution-results/get-execution-results).

**`itemsPerFile`** - Number of web pages to store per file in S3. By default it is 1000.

## Files on AWS S3
Act saves files to a specific Bucket with file name:
executionId_fileNumber.resultsFormat (e.g: `gjGZ6hdj6ZHhs_000000001.json`)
