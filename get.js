import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'itemId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      itemId: event.pathParameters.id
    }
  };
  console.log("made it to inexpire/get");
  const result = await dynamoDb.get(params);
  if ( ! result.Item) {
    console.log("item not found");
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});