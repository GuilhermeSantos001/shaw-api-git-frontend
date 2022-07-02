import * as React from 'react';
import axios from 'axios';

import { GithubGetUserReposResponseDto } from '../dto/github-get-user-repos-response.dto';

export async function githubGetUserRepos(
  username: string,
  page: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setLoading(true);

    return (await axios.get<GithubGetUserReposResponseDto>(`${import.meta.env.VITE_APP_HOST}/api/users/${username}/repos?page=${page}`)).data;
  } catch (error) {
    console.error(error as string);
    return null;
  } finally {
    setLoading(false);
  }
}
