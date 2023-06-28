import { Button, Drawer, Modal, Row } from "antd";
import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hookredux";
import { getProjectDetails } from "redux/task/TaskSlice";
import CreateTask from "./component/CreateTask";

import DetailIssueBoard from "./DetailIssueBoard";

const ProjectDetails: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const data = useAppSelector((state) => state.TaskSlice.getProjectDetail);

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(data);

  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDragEnd = () => {};
  return (
    <div>
      {" "}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="mt-5">
          <Button
            className="my-2"
            type="primary"
            size="large"
            onClick={showDrawer}
          >
            Create Task
          </Button>
          <Row gutter={10}></Row>
        </div>
      </DragDropContext>
      <DetailIssueBoard project={data} />
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <CreateTask />
      </Drawer>
    </div>
  );
};

export default ProjectDetails;
