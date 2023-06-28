import {
  Avatar,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  SelectProps,
  Slider,
} from "antd";

import { useAppDispatch, useAppSelector } from "redux/hookredux";
import { useEffect, useState } from "react";
import { getuserbyprojects, projectAsync } from "redux/project/ProjectSlice";
import { Option } from "antd/es/mentions";
import {
  getAllPriority,
  getAllstatuss,
  getAllTaskTypes,
} from "redux/task/TaskSlice";
import { BsCheckSquareFill, BsExclamationSquareFill } from "react-icons/bs";
import clsx from "clsx";
const { TextArea } = Input;
const CreateTask = ({ project }: any) => {
  const [projectId, setProjectId] = useState<number>(project?.id || -1);
  const [form] = Form.useForm();
  const [timeTracking, setTimeTracking] = useState<{
    timeSpent: number;
    timeRemains: number;
  }>({
    timeSpent: 0,
    timeRemains: 0,
  });

  const handleProjectChange = (value: string) => {
    setProjectId(Number(value));
  };

  let sliderRemaingText = (
    <>
      <span className="time-text">
        {Number(form.getFieldValue("timeTrackingRemaining"))}
      </span>
      <span>h remaining</span>
    </>
  );

  let sliderMax = () => {
    if (
      Number(form.getFieldValue("originalEstimate")) > 0 &&
      Number(form.getFieldValue("timeTrackingRemaining")) === 0
    ) {
      sliderRemaingText = (
        <>
          <span className="time-text">
            {Number(form.getFieldValue("originalEstimate"))}
          </span>
          <span>h esitmated</span>
        </>
      );
      return form.getFieldValue("originalEstimate");
    }
    return timeTracking.timeRemains + timeTracking.timeSpent;
  };

  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  let assigneesOptions: SelectProps["options"] = [];
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const projectList = useAppSelector((state) => state.ProjectSlice.ALlproject);
  const test = useAppSelector((state) => state);
  const taskStatusList = useAppSelector(
    (state) => state.TaskSlice.getAllStatus
  );
  const taskPriorityList = useAppSelector(
    (state) => state.TaskSlice.getPriority
  );
  const taskTypeList = useAppSelector((state) => state.TaskSlice.getTaskType);
  console.log(test);

  useEffect(() => {
    dispatch(projectAsync());
    dispatch(getAllTaskTypes());
    dispatch(getAllstatuss());
    dispatch(getAllPriority());
  }, []);

  if (!project && projectList && projectList.length > 0 && projectId === -1) {
    setProjectId(projectList[0].id);
  }

  useEffect(() => {
    if (projectId > -1) {
      dispatch(getuserbyprojects(projectId));
    }
  }, [projectId]);
  const taskUserList = useAppSelector(
    (state) => state.ProjectSlice.getuserbyproject
  );

  if (taskUserList !== null) {
    assigneesOptions = taskUserList?.map((user: any, idx: number) => {
      let label = (
        <div className={clsx(`user-${user.name}`, "flex items-center gap-3")}>
          <div className="avatar">
            <Avatar
              size={30}
              src={user.avatar}
              key={(Math.floor(Math.random() * 100) + 1).toString() + idx}
            />
          </div>
          <p className="text mb-0">{user.name}</p>
        </div>
      );
      return { label: label, value: user.userId };
    });
  }

  console.log(projectId);
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="taskName"
          rules={[
            {
              required: true,
              message: "Please do not leave ${name} empty",
            },
            { max: 80, message: "Project name can't extend 80 characters." },
          ]}
          label={"name"}
        >
          <Input
            placeholder="My task..."
            className="py-2 px-5 rounded-md"
            name="taskNameInput"
          />
        </Form.Item>
        <Form.Item name="projectId" label={"project name"}>
          <Select
            className="select-project rounded-md"
            onChange={handleProjectChange}
          >
            {projectList?.map((project: any, idx: number) => (
              <Option key={project.id} value={project.id}>
                {project.projectName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="statusId" label={"Status Type"}>
          <Select className="select-task-status">
            {taskStatusList?.map((taskStatus, idx: number) => (
              <Option
                key={taskStatus.statusId.toString() + idx}
                value={taskStatus.statusId}
              >
                {taskStatus.statusName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="form-row flex items-center gap-5">
          <div className="form-item-wrapper w-1/2">
            <Form.Item name="priorityId" label={"priority"}>
              <Select className="select-task-priority">
                {taskPriorityList?.map((taskPriority: any, idx: number) => {
                  return (
                    <Option
                      key={taskPriority.priorityId.toString() + idx}
                      value={taskPriority.priorityId}
                    >
                      <div className="option-label-item capitalize flex items-center gap-4">
                        <span
                          role="img"
                          aria-label={taskPriority.priority}
                        ></span>
                        {taskPriority.priority}
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="form-item-wrapper w-1/2">
            <Form.Item name="typeId" label={"Issue Type"}>
              <Select className="select-task-type">
                {taskTypeList?.map((taskType: any, idx: number) => {
                  return (
                    <Option
                      key={taskType.id.toString() + idx}
                      value={taskType.id}
                    >
                      <div className="option-label-item capitalize flex items-center gap-4">
                        <span className="icon">
                          {taskType.taskType.toLowerCase() === "new task" ? (
                            <BsCheckSquareFill />
                          ) : (
                            <BsExclamationSquareFill />
                          )}
                        </span>
                        <span className="txt">{taskType.taskType}</span>
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="form-row flex items-center gap-5">
          <div className="form-item-wrapper w-1/2">
            <Form.Item name="listUserAsign" label={"assignees"}>
              <Select
                className="select-listUserAsign"
                mode="multiple"
                optionFilterProp="label"
                placeholder="Select assignees"
                options={assigneesOptions}
              />
            </Form.Item>
          </div>

          <div className="form-item-wrapper time-tracking-input-wrapper w-1/2">
            <Form.Item name="timeTracking" label={"time tracking"}>
              <Slider
                disabled={true}
                tooltip={{ open: false }}
                trackStyle={{
                  backgroundColor: "#0052cc",
                  height: "7px",
                  borderRadius: "4px",
                }}
                handleStyle={{ display: "none" }}
                className="timeTrackingSlider"
              />
              <div className="time-logged flex items-center justify-between">
                <div className="time-spent-logged font-bold">
                  <span className="time-text">
                    {/* {Number(form.getFieldValue("timeTrackingSpent"))} */}
                  </span>
                  <span>h logged</span>
                </div>
                <div className="time-remain-logged font-bold">
                  {sliderRemaingText}
                </div>
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="form-row flex items-center gap-5">
          <div className="form-item-wrapper w-1/2">
            <Form.Item name="originalEstimate" label={"original estimate"}>
              <Input
                placeholder="0"
                className="py-2 px-5 rounded-md"
                name="originalEstimateInput"
              />
            </Form.Item>
          </div>

          <div className="form-inner-wrapper flex items-center gap-3 w-1/2">
            <div className="form-item-wrapper w-1/2">
              <Form.Item
                name="timeTrackingSpent"
                label={"time spent (hours"}
                rules={[{ type: "number", min: 0 }]}
              >
                <InputNumber
                  placeholder="0"
                  className="rounded-md"
                  name="timeTrackingSpentInput"
                  min={0}
                />
              </Form.Item>
            </div>

            <div className="form-item-wrapper w-1/2">
              <Form.Item
                name="timeTrackingRemaining"
                label={"time remaining (hours)"}
              >
                <InputNumber
                  placeholder="0"
                  className="rounded-md"
                  name="timeTrackingRemainingInput"
                  min={0}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <Form.Item name="description" label={"description"}>
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
        </Form.Item>
        <Form.Item className="form-btn-group">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-login bg-science-blue-500 text-white border-none rounded-[4px] hover:bg-[#0065ff] font-semibold text-base capitalize transition-all duration-[400ms] order-2"
          >
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTask;
