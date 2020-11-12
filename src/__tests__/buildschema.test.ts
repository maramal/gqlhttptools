import GQLHTTPTools from '../index';
import GQLSchema from '../gqlschema';

const testSchema1 = `
    type Query {
        tests: Test
        test(id: Int)
    }

    type Mutation {
        createTest(name: String): Test
    }

    type Test {
        id: ID
        name: String
    }
`;

test('build schema', () => {
    expect(GQLHTTPTools.buildSchema(testSchema1))
        .toBeInstanceOf(GQLSchema);
});