# act-crawler-results-to-s3
Apify act to upload results from crawler to S3.

## INPUT
[S3 params](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property)
[Apify execution results params](https://www.apifier.com/api-reference#/reference/results/execution-results/get-execution-results)
```javascript
{
  // Crawler execution ID
  "_id": String,

  // Crawler ID
  "actId": String,

  // Finish webhook data, see below
  "data": String
}
```

### Finish webhookdata

#### Example
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

#### Parameters:
**`awsS3Params`**
Overwrites [S3 params](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property)
accessKeyId, secretAccessKey, params.Bucket are required

**`executionResultsParams`**
Overwrites [apify execution results params](https://www.apifier.com/api-reference#/reference/results/execution-results/get-execution-results)

**`itemsPerFile`**
Number of items, which are saved in one bucket file.