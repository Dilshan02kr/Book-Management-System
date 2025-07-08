export const cleanApolloInput = (obj) => {
  const { __typename, id, ...rest } = obj;
  return rest;
};
