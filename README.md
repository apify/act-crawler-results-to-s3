# act-crawler-results-to-s3
Apify act to upload results from crawler to S3.
## INPUT
```javascript
{
  // Crawler execution ID
  "_id": String,

  // Crawler ID
  "actId": String,

  // Data
  "data": {

    // [Params of S3](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property)
    // accessKeyId and secretAccessKey is required
    "awsS3Params": {
      "accessKeyId": String,
      "secretAccessKey": String
    },

    // [Params of Apify execution results](https://www.apifier.com/api-reference#/reference/results/execution-results/get-execution-results)
    "executionResultsParams": {
      "format": String
    },

    // Bucket name
    "awsS3Bucket": String,

    // Nuber of items in one file, default is 1000
    "fileItemCounts": Number
  }
}
```
