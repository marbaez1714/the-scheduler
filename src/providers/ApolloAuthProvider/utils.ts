import { Operation, NextLink } from '@apollo/client';
import { Kind, OperationTypeNode } from 'graphql';
import omitDeep from 'omit-deep-lodash';

export const removeTypenameFromMutation = (
  operation: Operation,
  forward: NextLink
) => {
  const definitionList = operation.query.definitions.filter(
    (def) => def.kind === Kind.OPERATION_DEFINITION
  );

  if (
    definitionList[0] &&
    definitionList[0].kind == Kind.OPERATION_DEFINITION &&
    definitionList[0].operation === OperationTypeNode.MUTATION
  ) {
    operation.variables = omitDeep(operation.variables, '__typename');

    return forward(operation);
  }

  return forward(operation);
};
