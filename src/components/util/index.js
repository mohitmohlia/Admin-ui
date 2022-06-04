import { EditFilled } from "@ant-design/icons";
export const getColumns = (cb) => {
  return [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => {
        return (
          <EditFilled onClick={() => cb(record)} className="edit-button" />
        );
      },
    },
  ];
};
