// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { GrpahqlApiClientProvider, UserFromLib } from '@aws-amplify-cdk/api';

import { User } from './graphql/User';

export function App() {
  return (
    <GrpahqlApiClientProvider>
      <NxWelcome title="todo" />
      <User />
      <UserFromLib />
    </GrpahqlApiClientProvider>
  );
}

export default App;
