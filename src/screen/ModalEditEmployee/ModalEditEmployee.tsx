import { Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import './ModalEditEmployee.css';
import { Employee } from '../../types/Employee';

interface EditEmployeeProps {
  open: boolean;
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  updateData: (data: Employee) => void;
  dataEmployee: Employee;
}

const ModalEditEmployee: React.FC<EditEmployeeProps> = (props) => {
  const {
    confirmLoading,
    open,
    handleCancel,
    handleOk,
    dataEmployee,
    updateData,
  } = props;

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    setFirstName(dataEmployee.firstname);
    setLastName(dataEmployee.lastname);
    setEmail(dataEmployee.email);
  }, [dataEmployee]);

  const createNewData = () => {
    const updatedData: Employee = {
      id: dataEmployee.id,
      firstname: firstName,
      lastname: lastName,
      email: email,
    };
    updateData(updatedData);
  };

  const resetValue = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <Modal
      title='Edit Employee Datas'
      style={{ top: 180 }}
      open={open}
      onOk={() => {
        handleOk();
        console.log('create', createNewData());
        resetValue();
      }}
      confirmLoading={confirmLoading}
      onCancel={() => {
        handleCancel();
        resetValue();
      }}
    >
      <div className='add-modal-wrapper'>
        <div className='add-modal-input'>
          <label htmlFor='firstName'>
            <span>First name</span>
          </label>
          <Input
            id='firstName'
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div className='add-modal-input'>
          <label htmlFor='lastName'>
            <span>Last name</span>
          </label>
          <Input
            id='lastName'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className='add-modal-input'>
          <label htmlFor='email'>
            <span>Email</span>
          </label>
          <Input
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditEmployee;
