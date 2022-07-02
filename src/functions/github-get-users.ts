import * as React from 'react';
import axios from 'axios';

import { GithubGetUsersResponseDto } from '../dto/github-get-users-response.dto';

export async function githubGetUsers(since: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  try {
    setLoading(true);

    return (await axios.get<GithubGetUsersResponseDto>(`${import.meta.env.VITE_APP_HOST}/api/users?since=${since}`)).data;
  } catch (error) {
    console.error(error as string);
    return null;
  } finally {
    setLoading(false);
  }
}
