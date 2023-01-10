import { createRequire } from "module"
import { getSecret } from "./secretHandler.mjs"
import { getTickers } from "./dynamoHandler.mjs"

const require = createRequire(import.meta.url)
const axios = require("axios")

export const handler = async (event) => {
    const data = event.queryStringParameters
    const secret = await getSecret()
    const tickers = await getTickers(event)
    
    let client_response = {}

    for (const ticker of tickers) {
        const ax_response = await axios({ url: "https://finnhub.io/api/v1/quote?symbol=" + ticker + "&token=" + secret })
        client_response = Object.assign({ [ticker]: ax_response.data }, client_response)
    }
    
    const response = {
        body: JSON.stringify(client_response)
    }
    return response
}
