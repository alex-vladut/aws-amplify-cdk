import { useQuery } from '@apollo/client';
import { UserDocument } from './getUser.graphql';

export function UserFromLib() {
  const { data, loading, error } = useQuery(UserDocument);
  return <div>{data?.getUser?.name}</div>;
}
