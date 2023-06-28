import TaskCard from "./component/TaskCard";
import { DragDropContext } from "react-beautiful-dnd";
import { useAppDispatch } from "redux/hookredux";
import ProjectTaskStatusCol from "./ProjectTaskStatusCol";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Drawer } from "antd";
import EditTask from "./EditTask";
import { lstTask, lstTaskDeTail, TaskDetail } from "model";

interface destination {
  droppableId: string;
  index: number;
}

interface draggableId {
  combine: null;
  destination: destination;
  draggableId: string;
  mode: string;
  reason: string;
  source: destination;
  type: string;
}

const DetailIssueBoard = ({ project }: TaskDetail | any) => {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | any>(null);
  const showDrawer = () => {
    // setSelectedUserId();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  let dispatch = useAppDispatch();

  const handleEditTask = (task: any) => {
    showDrawer();
  };
  const handleDragEnd = async (result: draggableId | any) => {
    console.log(result);
    let { destination: dest, source, draggableId }: any = result;

    let taskDragged: any = JSON.parse(draggableId);
    if (!dest) {
      return;
    }
    if (
      dest.index === source.index &&
      dest.droppableId === source.droppableId
    ) {
      return;
    }
  };
  const renderProjectCard = (lstTaskDeTail: lstTaskDeTail[]) => {
    if (lstTaskDeTail.length) {
      return lstTaskDeTail.map((taskDetail: lstTaskDeTail, idx: number) => {
        return (
          <div>
            {" "}
            <TaskCard
              key={taskDetail.taskId.toString() + idx}
              taskDetail={taskDetail}
              idx={idx}
              handleEditTask={handleEditTask}
            />
            <Drawer
              width={640}
              placement="right"
              closable={false}
              onClose={onClose}
              open={open}
            >
              <EditTask />
            </Drawer>
          </div>
        );
      });
    }
  };
  const renderProjectStatusCol = (project: TaskDetail[] | any) => {
    console.log(project);
    return project?.lstTask.map((taskDetailList: lstTask, idx: number) => {
      console.log(taskDetailList);
      return (
        <ProjectTaskStatusCol
          idx={idx}
          key={taskDetailList.statusId.toString() + idx}
          taskDetailList={taskDetailList}
          renderProjectCard={renderProjectCard}
        />
      );
    });
  };
  const renderProjectBoard = (project: TaskDetail | null) => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="wrapper project__board flex items-stretch gap-5">
          {renderProjectStatusCol(project)}
        </div>
      </DragDropContext>
    );
  };
  return (
    <>
      <div>{renderProjectBoard(project)}</div>
    </>
  );
};
export default DetailIssueBoard;
