import GQLType from './gqltype';

export default class GQLSchema {
  constructor(public totalTypes: number, public totalCustomTypes: number, public types: GQLType) {}
}
