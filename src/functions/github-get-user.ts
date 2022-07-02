import * as React from 'react';
import axios from 'axios';

import { Users } from '../entities/users.entity';

export async function githubGetUser(username: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  try {
    setLoading(true);

    return (await axios.get<Users>(`${import.meta.env.VITE_APP_HOST}/api/users/${username}/details`)).data;
  } catch (error) {
    console.error(error as string);
    return null;
  } finally {
    setLoading(false);
  }
}
