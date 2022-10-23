import { useQuery } from '@apollo/client';
import { UserDocument } from './getUser.graphql';

export function User() {
  const { data, loading, error } = useQuery(UserDocument);
  if(loading) return <span>Loading...</span>
  return <div>{data?.getUser?.name}</div>;
}
