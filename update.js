import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async(event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'itemId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      itemId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content, expires = :expires",
    ExpressionAttributeValues: {
      ":content": data.content.content || null,
      ":expires": data.content.content2 || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);
  console.log(params);

  return { status: true };
});
