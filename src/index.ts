import GQLSchema from './gqlschema';
import GQLHTTPToolsError from './gqlhttptoolserror';

export default class GQLHTTPTools {
  private regex: RegExp = /type (.*) {\n((.+\n)+).*}/gm;

  static buildSchema(typeDef: string): GQLSchema | GQLHTTPToolsError {
    const tools = new GQLHTTPTools();
    const schema = new GQLSchema(0, 0, {});

    try {
      const matches = [...typeDef.matchAll(tools.regex)];
      if (matches.length < 1) throw new Error('Invalid Type Definition');

      matches.forEach((typeMatch: any) => {
        if (!Array.isArray(typeMatch) || typeMatch.length < 4) throw new Error('Invalid Type Definition');

        const type: string = typeMatch[1].trim();
        const props: string = typeMatch[2].trim();

        switch (type) {
          case 'Query':
            if (schema.types?.Query) schema.types.Query.concat(props);
            else schema.types.Query = props + '\n';
            break;
          case 'Mutation':
            if (schema.types?.Mutation) schema.types.Mutation.concat(props);
            else schema.types.Mutation = props + '\n';
            break;
          // Custom types
          default:
            if (schema.types.Custom) schema.types.Custom.push({ [type]: props });
            else schema.types.Custom = [{ [type]: props + '\n' }];
        }
      });

      return schema;
    } catch (err) {
      return new GQLHTTPToolsError(err.message, err, err.status);
    }
  }

  static createSchema(typeDefs: GQLSchema | GQLSchema[]): string {
    let schema = '';

    if (Array.isArray(typeDefs)) {
      typeDefs.forEach((typeDef) => {
        schema += GQLHTTPTools.addSchema(typeDef);
      });
    } else {
      schema = GQLHTTPTools.addSchema(typeDefs);
    }

    return schema;
  }

  private static addSchema(typeDef: GQLSchema): string {
    const { types } = typeDef;
    let schema = '';

    if (types.Query !== undefined) {
      schema += `type Query {\n\t${types.Query}\n}\n`;
      delete types.Query;
    }
    if (types.Mutation !== undefined) {
      schema += `type Mutation {\n\t${types.Mutation}\n}\n`;
      delete types.Mutation;
    }
    if (types.Custom !== undefined) {
      schema += types.Custom.map((type) => {
        const key = Object.keys(type)[0];
        const val = Object.values(type)[0];
        return `type ${key} {\n\t${val}\n}`;
      });
    }

    return schema;
  }
}
