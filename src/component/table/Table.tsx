import { PlusOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './Table.css';
import ModalAddEmployee from '../../screen/ModalAddEmployee/ModalAddEmployee';
import { Employee } from './../../types/Employee';

export interface TableColumn<T = any> {
  title: string;
  dataIndex?: keyof T;
  render?: (data: T) => void;
}

interface TableProps {
  data: any[];
  columns: TableColumn[];
  newData: (data: Employee) => void;
}

const Table: React.FC<TableProps> = (props) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      Modal.success({
        content: 'New Employee has been added',
        centered: true,
      });
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const takeNewData = (data: Employee) => {
    props.newData(data);
  };

  const search = (searchText: string) => {
    const newDatas = props.data.map((data) => JSON.stringify(data));
    const filteredDatas = newDatas.filter((data) => data.includes(searchText));
    const normalizeDatas = filteredDatas.map((data) => JSON.parse(data));
    if (normalizeDatas.length === 0) {
      setTableData([]);
      return Modal.warning({
        content: 'No employee found with the given search term',
        centered: true,
      });
    }
    setTableData(normalizeDatas);
  };

  useEffect(() => {
    setTableData(props.data);
  }, [props.data]);

  return (
    <>
      <ModalAddEmployee
        open={open}
        confirmLoading={confirmLoading}
        handleCancel={() => handleCancel()}
        handleOk={() => handleOk()}
        newData={takeNewData}
      />
      <div className='table-component-container'>
        <div className='table-search-field-wrapper'>
          <div className='add-employee-btn' onClick={() => showModal()}>
            <PlusOutlined />
            <span>Add Employee</span>
          </div>
          <div className='search-employee-btn'>
            <Input
              placeholder='Type keywords to search Employee'
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div>
        <div className='table-component-wrapper'>
          <table className='table-component'>
            <thead className='table-head'>
              <tr className='tr-table-head'>
                {props.columns.map((column) => {
                  return <td className='td-table-head'>{column.title}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {tableData.map((d) => {
                return (
                  <tr className='tr-table-body'>
                    {props.columns.map((column) => {
                      let renderedContent = column.dataIndex
                        ? d[column.dataIndex]
                        : null;
                      if (column.render) {
                        renderedContent = column.render(d);
                      }
                      return (
                        <td className='td-table-body'>
                          <p>{renderedContent}</p>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
