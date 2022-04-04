import { startDb, stopDb, createTables, deleteTables } from 'jest-dynalite';
import * as dbConfig from '../testing/jest-dynalite-config';
import * as lib from './index';
import { getClients } from './lib/dynamoDb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

beforeAll(startDb);

beforeEach(createTables);
afterEach(deleteTables);

afterAll(stopDb);

jest.mock('./lib/dynamoDb', () => {
  const client = jest.requireActual('./lib/dynamoDb');
  return {
    getClients: jest.fn((yourConfig?: DynamoDBClientConfig) => client.getClients({
      ...yourConfig,
      ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        basePort: dbConfig.default.basePort,
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: 'local',
        credentials:{
          accessKeyId: 'local',
          secretAccessKey: 'local'
        }
      }),
    }))
  };
});

const tableName = dbConfig.default.tables[0].TableName;

describe('getUser', () => {
  it('should get a user if one is entered', async () => {
    const user = {
      PK: '001',
      userId: '001',
      firstName: 'Julian',
      lastName: 'Pittas',
      email: 'julian.pitas@gmail.com'
    };
    const {docClient: dynamoClient} = getClients();
    const command = new PutCommand({
      TableName: tableName,
      Item: user
    });
    await dynamoClient.send(command);

    const result = await lib.getUser('001');
    expect(result).toMatchObject(user);
    await dynamoClient.destroy();
  });

  it('should return no user', async () => {
    const result = await lib.getUser('001');
    expect(result).toBeUndefined();
  });
});