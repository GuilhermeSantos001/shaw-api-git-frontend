import * as React from 'react';
import * as DateFns from 'date-fns';
import { useParams } from "react-router-dom";
import Sugar from 'sugar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import OpenInBrowser from '@mui/icons-material/OpenInBrowser';

import Layout from '../../components/layout';

import { GithubContext } from '../../contexts/github.context';
import { GithubService } from "../../services/github.service";

import { Users } from '../../entities/users.entity';
import { Repos } from '../../entities/repos.entity';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
];

export default function DetailsUser() {
  const [user, setUser] = React.useState<Users>();
  const [repos, setRepos] = React.useState<Repos[]>([]);
  const [nextPage, setNextPage] = React.useState<number>(0);
  const [prevPage, setPrevPage] = React.useState<number>(0);
  const [lastPage, setLastPage] = React.useState<number>(0);
  const [actualPage, setActualPage] = React.useState<number>(1);

  const { username } = useParams();
  const { githubAPI } = GithubService();

  const handleNextPage = () => {
    setActualPage(nextPage);
  },
    handlePrevPage = () => {
      setActualPage(prevPage);
      if (prevPage === 1) setPrevPage(0);
    };

  React.useEffect(() => {
    githubAPI.users.details(username as string)
      .then(data => {
        if (data) setUser(data);
      })
  }, [username]);

  React.useEffect(() => {
    if (username) {
      githubAPI.users.repos(username, actualPage)
        .then(data => {
          if (data) {
            const
              next = data.pagination.find(pagination => pagination.type === 'next'),
              prev = data.pagination.find(pagination => pagination.type === 'prev'),
              last = data.pagination.find(pagination => pagination.type === 'last');

            if (next) setNextPage(parseInt(next.page));
            if (prev) setPrevPage(parseInt(prev.page));
            if (last) setLastPage(parseInt(last.page));

            setRepos(data.repos);
          }
        })
    }
  }, [username, actualPage]);

  return (
    <Layout>
      <Card className="w-full h-[100vh]" sx={{ backgroundColor: "ghostwhite" }}>
        <p className='text-lg text-center my-2 underline'>
          Github User
        </p>
        <CardHeader
          avatar={
            <>
              {user?.avatar_url &&
                <Avatar
                  alt="Remy Sharp"
                  src={user.avatar_url}
                  sx={{ width: 182, height: 182 }}
                  className={`
                  m-2
                `} />
              }
            </>
          }
          action={
            <IconButton aria-label="settings" onClick={() => window.open(user?.html_url, '_blank')}>
              <OpenInBrowser />
            </IconButton>
          }
          title={Sugar.String.capitalize(username || "")}
          subheader={user?.created_at ? `Account created ${DateFns.formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}` : "???"}
        />
        <CardContent>
          <GithubContext.Provider value={{ users: [], repos }}>
            <p className='text-lg text-center my-2 underline'>
              User Repos
            </p>
            {repos.length > 0 ?
              <div className='h-[330px] w-full'>
                <DataGrid
                  rows={repos.filter(repo => !repo.private).map(repo => {
                    return { id: repo.id, name: repo.name };
                  })}
                  hideFooter
                  checkboxSelection
                  columns={columns}
                  pageSize={30}
                  rowsPerPageOptions={[30]}
                  onSelectionModelChange={(reposIds) => {
                    const repoId = reposIds[0] as number;
                    window.open(repos.find(repo => repo.id === repoId)?.html_url, '_blank');
                  }}
                  selectionModel={[]}
                />
              </div>
              :
              <p className="text-center">
                The user has no repositories.
              </p>
            }
            <div className={`
              my-2
              w-full
              flex
              items-center
              justify-end
            `}>
              <ButtonGroup variant="contained" aria-label="action table buttons">
                {
                  prevPage > 0 &&
                  <Button
                    className="p-2 font-bold"
                    sx={{ backgroundColor: "dodgerblue", ":hover": { backgroundColor: "lightsteelblue" } }}
                    onClick={handlePrevPage}
                  >
                    Voltar
                  </Button>
                }
                {
                  nextPage > 0 &&
                  <Button
                    className=" p-2 font-bold"
                    sx={{
                      backgroundColor: "dodgerblue",
                      ":hover": { backgroundColor: "lightsteelblue" }
                    }}
                    onClick={handleNextPage}
                    disabled={actualPage === lastPage ? true : false}
                  >
                    Avançar
                  </Button>
                }
              </ButtonGroup>
            </div>
          </GithubContext.Provider>
        </CardContent>
      </Card>
    </Layout >
  );
}
