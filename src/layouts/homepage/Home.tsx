import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import Navbar from '../../component/navbar/Navbar';
import Table, { TableColumn } from '../../component/table/Table';
import ModalEditEmployee from '../../screen/ModalEditEmployee/ModalEditEmployee';
import { Employee, dummyEmployee } from '../../types/Employee';
import './Home.css';

const Home: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>(dummyEmployee);
  const [dataToEdit, setDataToEdit] = useState({} as Employee);

  const confirm = (data: Employee) => {
    Modal.confirm({
      title: 'Warning',
      content: 'Are you sure want to delete this data?',
      centered: true,
      onOk() {
        deleteEmployee(data);
        Modal.success({
          centered: true,
          content: 'Employee has been removed',
        });
      },
    });
  };

  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Are you sure want to update this data?',
      centered: true,
      onOk() {
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          Modal.success({
            centered: true,
            content: 'Employee has been updated',
          });
        }, 2000);
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const addNewEmployee = (data: Employee) => {
    setEmployeeData([...employeeData, data]);
  };

  const deleteEmployee = (data: Employee) => {
    const index = employeeData.indexOf(data);
    const tempDatas = [...employeeData];

    tempDatas.splice(index, 1);
    setEmployeeData(tempDatas);
  };

  const updateData = (data: Employee) => {
    const filteredData = employeeData.filter((e) => e.id === data.id)[0];
    const indexOfDataToUpdate = employeeData.indexOf(filteredData);
    const tempDatas = [...employeeData];

    tempDatas[indexOfDataToUpdate] = data;

    setEmployeeData(tempDatas);
  };

  const employeeColumn: TableColumn<Employee>[] = [
    {
      title: 'Employee Id',
      dataIndex: 'id',
    },
    {
      title: 'Full name',
      render: (data) => {
        const firstName = data.firstname;
        const lastName = data.lastname;
        const fullname = `${firstName} ${lastName}`;

        return fullname;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      render: (data) => {
        return (
          <>
            <ModalEditEmployee
              open={open}
              confirmLoading={confirmLoading}
              handleCancel={() => handleCancel()}
              handleOk={() => handleOk()}
              dataEmployee={dataToEdit}
              updateData={updateData}
            />
            <div className='action-wrapper'>
              <div className='action-btn danger' onClick={() => confirm(data)}>
                <DeleteOutlined />
              </div>
              <div
                className='action-btn warning'
                onClick={() => {
                  setDataToEdit(data);
                  showModal();
                }}
              >
                <EditOutlined />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className='home-layout'>
      <Navbar />
      <main className='home-main-container'>
        <Table
          data={employeeData}
          columns={employeeColumn}
          newData={addNewEmployee}
        />
      </main>
    </div>
  );
};

export default Home;
