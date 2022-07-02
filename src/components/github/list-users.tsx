import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { GithubContext } from '../../contexts/github.context';
import { GithubService } from '../../services/github.service';
import { Users } from '../../entities/users.entity';

import { DialogDetailsUser } from './dialog-details-user';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'login', headerName: 'Username', flex: 1 },
];

export default function GithubTableUsers() {
  const [users, setUsers] = React.useState<Users[]>([]);
  const [nextPage, setNextPage] = React.useState<number>(0);
  const [prevPage, setPrevPage] = React.useState<number>(0);
  const [prevPages, setPrevPages] = React.useState<number[]>([]);
  const [sinceActual, setSinceActual] = React.useState<number>(1);
  const [prevSelectUser, setPrevSelectUser] = React.useState<number>(0);
  const [prevSelectionUser, setSelectionUser] = React.useState<number[]>([]);

  const [openDialogDetailsUser, setOpenDialogDetailsUser] = React.useState<boolean>(false);

  const { githubAPI } = GithubService();

  let navigate = useNavigate();

  const handleNextPage = () => {
    setPrevPages((prevState) => [...prevState, sinceActual]);
    setPrevPage(sinceActual);
    setSinceActual(nextPage);
  },
    handlePrevPage = () => {
      if (prevPage <= 1) {
        setPrevPage(0);
        setPrevPages([]);
      }

      if (prevPage !== sinceActual) {
        setSinceActual(prevPage);
      } else {
        const page = prevPages[prevPages.length - 2];

        if (page > 1) {
          setSinceActual(page);
          setPrevPages((prevState) => prevState.slice(0, prevPages.length - 2));
        } else {
          setSinceActual(page);
          setPrevPage(0);
          setPrevPages([]);
        }
      }
    },
    handleSelectUserDialogDetailsUser = () => {
      navigate(`/${users.find(user => user.id === prevSelectUser ? true : null)?.login || "???"}/details`, { replace: true });
    },
    handleCloseDialogDetailsUser = () => {
      setOpenDialogDetailsUser(false);
      setPrevSelectUser(0);
      setSelectionUser([]);
    };

  React.useEffect(() => {
    githubAPI.users.list(sinceActual)
      .then(data => {
        if (data) {
          const next = data.pagination.find(pagination => pagination.type === 'next');

          if (next) setNextPage(parseInt(next.page));

          setUsers(data.users);
        }
      })
  }, [sinceActual]);

  React.useEffect(() => {
    if (!openDialogDetailsUser && prevSelectUser > 0) setOpenDialogDetailsUser(true);
  }, [prevSelectUser]);

  return (
    <GithubContext.Provider value={{ users, repos: [] }}>
      <div>
        <DialogDetailsUser
          open={openDialogDetailsUser}
          username={users.find(user => user.id === prevSelectUser ? true : null)?.login || "???"}
          handleClose={handleCloseDialogDetailsUser}
          handleSelectUser={handleSelectUserDialogDetailsUser}
        />
        <p className='text-lg text-center my-2 underline'>
          Github Users
        </p>
        {users.length > 0 ?
          <div className='h-[380px] w-full'>
            <DataGrid
              rows={users.map(user => {
                return { id: user.id, login: user.login };
              })}
              hideFooter
              checkboxSelection
              columns={columns}
              pageSize={30}
              rowsPerPageOptions={[30]}
              onSelectionModelChange={(usersIds) => {
                const userId = usersIds[0] as number;

                setPrevSelectUser(userId);
                setSelectionUser((prevState) => [...prevState, userId]);
              }}
              selectionModel={prevSelectionUser}
            />
          </div>
          :
          <p className="text-center">
            No Github user has been found.
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
                sx={{ backgroundColor: "dodgerblue", ":hover": { backgroundColor: "lightsteelblue" } }}
                onClick={handleNextPage}
              >
                Avançar
              </Button>
            }
          </ButtonGroup>
        </div>
      </div>
    </GithubContext.Provider>
  );
}
