import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DeleteFilled } from "@ant-design/icons";

import { Table as AntDTable, Modal } from "antd";
import Pagination from "../Pagination/index";

import { getColumns } from "../util/index";
import { DATA_URL, DATA_PER_PAGE } from "../constants";

import "./styles.scss";
import "antd/dist/antd.css";

function Table() {
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const pagesVisited = DATA_PER_PAGE * pageNumber;
  const pageCount = Math.ceil(tableData.length / DATA_PER_PAGE);
  const inputRef = useRef();

  const data = tableData.slice(pagesVisited, pagesVisited + DATA_PER_PAGE);

  // modal inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function fetchTableData() {
    setLoading(true);
    axios
      .get(DATA_URL)
      .then((response) => {
        const { data = [] } = response;
        const datawithKeys = data.map((data, i) => {
          return { ...data, key: data.id };
        });
        setTableData(datawithKeys);
        setOriginalData(datawithKeys);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  function handleEdit(record) {
    setName(record.name);
    setEmail(record.email);
    setRole(record.role);
    setId(record.id);
    setModalOpen(true);
  }

  const columns = getColumns((record) => handleEdit(record));

  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage);
  };

  const handleModalSubmit = () => {
    const editedData = originalData.map((item) => {
      if (item.id === id) {
        return { ...item, name, email, role };
      } else return item;
    });
    setTableData(editedData);
    setOriginalData(editedData);
    setModalOpen(false);
  };

  const handleSearch = (event) => {
    const text = event.target.value.toLowerCase();
    setTableData(originalData);
    setPageNumber(0);
    const filteredResults = originalData.filter((item) => {
      if (text === "") return true;
      return (
        item.name.toLowerCase().includes(text) ||
        item.email.toLowerCase().includes(text) ||
        item.role.toLowerCase().includes(text)
      );
    });
    setTableData(filteredResults);
  };

  const handleDelete = () => {
    const newList = originalData
      .map((item, index) => {
        return (originalData[index] = selectedRowKeys.includes(item.id)
          ? undefined
          : originalData[index]);
      })
      .filter((i) => i);
    setTableData(newList);
    setOriginalData(newList);
    setSelectedRowKeys([]);
  };

  return (
    <div className="admin-ui-container">
      <input
        className="search-input"
        onChange={handleSearch}
        placeholder="Search..."
        ref={inputRef}
        type="text"
      />
      <AntDTable
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        rowSelection={rowSelection}
      />
      <div className="admin-ui-pagination-container">
        {selectedRowKeys.length >= 1 && (
          <DeleteFilled onClick={handleDelete} className="delete-button" />
        )}
        <Pagination
          onPageChange={handlePageChange}
          pageCount={pageCount}
          pageNumber={pageNumber}
        />
      </div>
      <Modal
        onCancel={() => setModalOpen(false)}
        onOk={handleModalSubmit}
        title="Edit Row"
        visible={isModalOpen}
      >
        <form className="form-edit-container">
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            value={name}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
          />
          <input
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            value={role}
          />
        </form>
      </Modal>
    </div>
  );
}

export default Table;
