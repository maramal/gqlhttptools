import GQLHTTPTools from '../index';
import GQLSchema from '../gqlschema';

const testTypeDef1 = `type Query {
    tests: [Test]
    test(id: Int): Test
}
type Mutation {
    createTest(name: String): Test
}
type Test {
    id: ID
    name: String
}
`;

const testTypeDef2 = `type Query {
    moreTests: [Test2]
    findTest(id: Int): Test2
}
type Mutation {
    createAnotherTest(name: String): Test2
}
type Test2 {
    id: ID
    name: String
}
`;

const testSchema1 = GQLHTTPTools.buildSchema(testTypeDef1);
const testSchema2 = GQLHTTPTools.buildSchema(testTypeDef2);

const regex = /type (.*) {\n((.+\n)+).*}/gm;

test('create schema from single type definition', () => {
    expect(GQLHTTPTools.createSchema(testSchema1 as GQLSchema))
        .toMatch(regex);
});

test('create schema from multiple type definitions', () => {
    expect(GQLHTTPTools.createSchema([testSchema1 as GQLSchema, testTypeDef1 as GQLSchema]))
});