import * as React from 'react';

import { Users } from '../entities/users.entity';
import { Repos } from '../entities/repos.entity';

export interface GithubContextInterface {
  users: Users[];
  repos: Repos[];
}

export const GithubContext = React.createContext<GithubContextInterface>({
  users: [],
  repos: [],
});
