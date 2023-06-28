import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "redux/hookredux";
import {
  getprojectbyid,
  projectcatagoryAsync,
  UpdateProjectAsync,
} from "redux/project/ProjectSlice";

import TextArea from "antd/es/input/TextArea";

interface UpdateProjectProps {
  selectedUserId: number | string | undefined;
}
const UpdateProject: React.FC<UpdateProjectProps> = ({ selectedUserId }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getprojectbyid(selectedUserId));
  }, [selectedUserId, dispatch]);
  useEffect(() => {
    dispatch(projectcatagoryAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const categorys = useAppSelector(
    (state) => state.ProjectSlice.ProjectCategory
  );
  const catego = useAppSelector((state) => state.ProjectSlice.project);

  const onFinish = async (values: any) => {
    const data = {
      id: values.id,
      projectName: values.projectName,
      description: values.description,
      categoryId: values.categoryId,
      creator: catego?.creator,
    };
    console.log(data);
    await dispatch(UpdateProjectAsync(data));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  console.log(catego);
  return (
    catego &&
    categorys && (
      <div>
        <h1 className="text-2xl uppercase">Project Detail</h1>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Project ID" name="id" initialValue={catego?.id}>
            <Input
              disabled={true}
              //   value={formik.values.id}
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="projectName"
            initialValue={catego?.projectName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="DesCripstion"
            initialValue={catego?.description}
            name="description"
          >
            <TextArea rows={4} placeholder="" maxLength={6} />
          </Form.Item>
          <Form.Item
            label="Project Category"
            name="categoryId"
            initialValue={catego?.projectCategory?.id}
          >
            <Select
              options={categorys.map((item) => ({
                label: item.projectCategoryName,
                value: item.id,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit" type="primary">
              Edit Project
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
};

export default UpdateProject;
