import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager"

const secret_name = "finnhub_stock_api"
const client = new SecretsManagerClient({
  region: "us-west-1",
})

export async function getSecret() {
    let secret_response;

    try {
        secret_response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT"
          })
        )
      } catch (error) {
        throw error
      }

    return JSON.parse(secret_response.SecretString).fhApiKey
}