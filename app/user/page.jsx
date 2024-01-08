'use client';
import React, { useState } from 'react';
import Layout from '@/components/layout/page';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './device.css'; // Import the external CSS file
import UsersModal from '@/components/modal/usersModal';
import EditUsersModal from '@/components/modal/editUser';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from '@/utils/axios';
import { PiNotePencil, PiTrashLight } from 'react-icons/pi';
import { BsArrowLeftSquareFill, BsPlusSquareFill } from 'react-icons/bs';
function Page() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [resultId, setResultId] = useState({});
  const [idRole, setIdRole] = useState(0);

  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page');
  const [skip, setSkip] = useState(pageParams ? Number((pageParams - 1) * 10) : 0);
  const limit = 10;
  const router = useRouter();
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (pageParams) {
      setPage(Number(pageParams));
    }

    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    if (resultId && resultId.id) setOpenEdit(true);
  }, [resultId]);

  const getData = async () => {
    try {
      const userLogin = JSON.parse(localStorage.getItem('data'));
      const { id, id_role } = userLogin;

      const result = await axios.get(`/users?$limit=${limit}&$skip=${skip}&$sort[created_at]=-1${id_role == 1 ? '' : `&id=${id}`}`);
      const { data } = result;
      setTotal(data.total);
      setUsers(data.data);
      setIdRole(id_role);
    } catch (error) {
      console.log(error);
    }
  };

  const getById = async (id) => {
    const result = await axios.get(`/users/${id}`);
    setResultId(result.data);
  };

  const createData = async (data) => {
    try {
      await axios.post('/users', data);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.message);
    }
  };

  const patchData = async (data) => {
    try {
      await axios.patch(`/users/${resultId.id}`, data);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.message);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handlePage = (e, v) => {
    setPage(v);
    setSkip((v - 1) * limit);
    router.push(`location?page=${v}`);
  };

  return (
    <Layout selected={'user'}>
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        <UsersModal open={open} setOpen={setOpen} createData={createData} />
        {
          resultId && resultId.id && openEdit
            ? <EditUsersModal open={openEdit} setOpen={setOpenEdit} patchData={patchData} data={resultId} />
            : ''
        }
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '13px' }}>
          <div>
            <BsArrowLeftSquareFill style={{ marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold' }}>Dashboard</span>
          </div>
          {
            idRole == 1
              ? <div style={{ cursor: 'pointer' }} onClick={() => handleOpen()}>
                <BsPlusSquareFill style={{ marginRight: '5px' }} />
                <span style={{ fontWeight: 'bold' }}>New User</span>
              </div>
              : ''
          }
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <table style={{ width: '98%', margin: '0px' }}>
            <thead style={{ backgroundColor: 'rgb(196, 196, 196)' }}>
              <tr>
                <th style={{ width: '100px' }}>ID</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Role</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.role.name}</td>
                  <td>
                    <PiNotePencil size={20} cursor={'pointer'} onClick={() => { getById(item.id); }} />
                    {
                      idRole == 1
                        ? <PiTrashLight color='red' size={20} cursor={'pointer'} onClick={() => { deleteData(item.id); }} />
                        : ''
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <Pagination count={Math.round(total / limit)} variant="outlined" shape="rounded" page={page} onChange={handlePage} />
          </Stack>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
