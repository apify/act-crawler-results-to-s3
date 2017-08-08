# act-crawler-results-to-s3
Apify act to upload results from crawler to S3.
It designed to run from Apify crawler finish webhook.

## Usage

For specific crawler set:

### Finish webhook URL (`finishWebhookUrl`)
https://api.apifier.com/v2/acts/vRrWzZg7LH29horY8/runs?token=APIFIER_API_TOKEN
You can find Apifier API token(Manage Acts token) on [your Apifier account page](https://www.apifier.com/account#api-integrations).

### Finish webhook data(`finishWebhookData`)
**Example:**
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
**`awsS3Params`**
Overwrites [S3 params](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property)
accessKeyId, secretAccessKey, params.Bucket are required

**`executionResultsParams`**
Overwrites [apify execution results params](https://www.apifier.com/api-reference#/reference/results/execution-results/get-execution-results)

**`itemsPerFile`**
Number of items, which are saved in one bucket file.