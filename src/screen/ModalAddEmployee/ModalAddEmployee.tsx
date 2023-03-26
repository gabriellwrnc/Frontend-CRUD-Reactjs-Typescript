import { Modal, Input } from 'antd';
import React, { useState } from 'react';
import './ModalAddEmployee.css';
import { Employee } from './../../types/Employee';

interface AddEmployeeProps {
  open: boolean;
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  newData: (data: Employee) => void;
}

const ModalAddEmployee: React.FC<AddEmployeeProps> = (props) => {
  const { confirmLoading, open, handleCancel, handleOk, newData } = props;
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const createNewData = () => {
    const data: Employee = {
      id: Math.random().toString(36).substring(2),
      firstname: firstName,
      lastname: lastName,
      email: email,
    };
    newData(data);
  };

  const resetValue = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <Modal
      title='Input New Employee Datas'
      style={{ top: 180 }}
      open={open}
      onOk={() => {
        setTimeout(() => {
          createNewData();
        }, 2000);
        resetValue();
        handleOk();
      }}
      confirmLoading={confirmLoading}
      onCancel={() => handleCancel()}
    >
      <div className='add-modal-wrapper'>
        <div className='add-modal-input'>
          <label htmlFor='firstName'>
            <span>First name</span>
          </label>
          <Input
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Input First Name'
          />
        </div>
        <div className='add-modal-input'>
          <label htmlFor='lastName'>
            <span>Last name</span>
          </label>
          <Input
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Input Last Name'
          />
        </div>
        <div className='add-modal-input'>
          <label htmlFor='email'>
            <span>Email</span>
          </label>
          <Input
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Input Email'
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddEmployee;
