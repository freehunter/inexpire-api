import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";


export const main = handler(async(event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      itemId: uuid.v1(),
      content: data.content,
      expires: data.expires,
      createdAt: Date.now()
    }
  };

  await dynamoDB.put(params);
  console.log("made it to create");
  console.log(params);

  return params.Item;
});
