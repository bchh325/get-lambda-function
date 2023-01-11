# get-lambda-function

Lambda function that is used for the application in 
https://github.com/bchh325/trading-site

This function is responsible for gathering secrets, retreiving the user's data,
using the data to make calls to an external API, and returning the external API's response.

Currently uses a Lambda Layer for Axios, but will try to include<br> dependencies directly when uploading the function
in the future.

Lambda runtime: Node.js 18.x

Using [AWS SDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
