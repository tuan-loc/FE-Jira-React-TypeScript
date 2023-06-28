import React, { useEffect, useState } from "react";
import { Button, Drawer, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "redux/hookredux";
import { projectAsync } from "redux/project/ProjectSlice";
import { NavLink } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

import UpdateProject from "./UpdateProject";

const Project: React.FC = () => {
  const { ALlproject } = useAppSelector((state) => state.ProjectSlice);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | any>(null);
  const showDrawer = (userId: number) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(projectAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data: any = ALlproject;

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const columns: ColumnsType<any> = [
    {
      title: "Project ID",
      dataIndex: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortDirections: ["descend"],
      render: (text: string, record: any) => {
        return (
          <NavLink to={`/projectmanager/detail/${record.id}`}>{text}</NavLink>
        );
      },
    },
    {
      title: "Creator",
      dataIndex: "ProjectID",
      defaultSortOrder: "descend",
      render: (text: string, listproject: any) => {
        return <span> {listproject.creator.name}</span>;
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
    },
    {
      title: "Actions",
      dataIndex: "",
      defaultSortOrder: "descend",
      render: (text, listproject, index) => {
        return (
          <p>
            <Button
              onClick={() => {
                showDrawer(listproject.id);
              }}
              type="primary"
              className="text-xl cursor-pointer "
            >
              <EditOutlined />
            </Button>
          </p>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey="id"
      />
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <UpdateProject selectedUserId={selectedUserId} />
      </Drawer>
    </div>
  );
};

export default Project;
