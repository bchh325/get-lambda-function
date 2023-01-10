import { createRequire } from "module"

const require = createRequire(import.meta.url)
const { DynamoDB } = require("@aws-sdk/client-dynamodb")
const ddb = new DynamoDB({ apiVersion: "2012-08-10", region: "us-west-1" })
const { unmarshall } = require("@aws-sdk/util-dynamodb")

export async function getTickers(event) {
    const data = event.queryStringParameters

    const params = {
        TableName: "trading-site",
        Key: {
            "cognito_user_id": { S: data.username }
        },
        ProjectionExpression: 'tickers'
    }

    let tickers

    try {
        const get_response = await ddb.getItem(params)
        tickers = unmarshall(get_response.Item).tickers
    } catch (err) {
        console.log(err)
    }

    return tickers
}