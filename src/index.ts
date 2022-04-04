
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { getClients } from './lib/dynamoDb';
import * as dbConfig from '../jest-dynalite-config';

type User = {
  userId: string
  firstName: string
  lastName: string
  email: string
}

export async function getUser(id: string): Promise<User | undefined> {
  const {docClient: client} = getClients();
  const command = new GetCommand({
    TableName: dbConfig.default.tables[0].TableName,
    Key: {
      'PK': '001'
    }
  });
  const response = await client.send(command);
  return response.Item as User | undefined;
}