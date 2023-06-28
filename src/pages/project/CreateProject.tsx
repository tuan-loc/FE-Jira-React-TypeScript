import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hookredux";
import {
  CreateProjectAsync,
  projectcatagoryAsync,
} from "redux/project/ProjectSlice";
import { projects } from "model";

interface Category {
  id: number;
  projectCategoryName: string;
}

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const editorRef = useRef<any>(null);

  useEffect(() => {
    dispatch(projectcatagoryAsync());
  }, []);
  const formik = useFormik<projects>({
    initialValues: {
      id: "",
      projectName: "",
      description: "",
      categoryId: undefined,
      alias: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await dispatch(CreateProjectAsync(values));
        // navigate("/projectmanager");
      } catch (error) {}
    },
  });

  const handleSelect = (name: keyof projects) => {
    return (value: any) => {
      formik.setFieldValue(name, value);
    };
  };
  const categorys = useAppSelector(
    (state) => state.ProjectSlice.ProjectCategory
  );
  console.log(categorys);
  return (
    categorys && (
      <div>
        <h1 className="text-2xl uppercase text-center items-center">
          Project Detail
        </h1>
        <Form
          onFinish={formik.handleSubmit}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <Form.Item label="Name">
            <Input name="projectName" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Alias" required={true}>
            <Input
              onChange={formik.handleChange}
              name="alias"
              placeholder="Alias"
            />
          </Form.Item>

          <Form.Item label="Description">
            <>
              <Editor
                onEditorChange={handleSelect("description")}
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 350,
                  menubar: false,
                  plugins: [
                    "a11ychecker",
                    "advlist",
                    "advcode",
                    "advtable",
                    "autolink",
                    "checklist",
                    "export",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "powerpaste",
                    "fullscreen",
                    "formatpainter",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | casechange blocks | bold italic backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </>
          </Form.Item>
          <Form.Item label="Project Category">
            <Select
              onChange={handleSelect("categoryId")}
              options={categorys.map((item: Category) => ({
                label: item.projectCategoryName,
                value: item.id,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item label="ACtion">
            <Button htmlType="submit" type="primary">
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
};

export default CreateProject;
