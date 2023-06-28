import { projects } from "model";
import { baseService } from "./baseService";

export class ProjectService extends baseService {
  // eslint-disable-next-line
  constructor() {
    super();
  }
  getAllproject = () => {
    return this.get(`/api/Project/getAllProject`);
  };

  getcategory = () => {
    return this.get(`/api/ProjectCategory`);
  };

  createproject = (data: projects) => {
    return this.post(`/api/Project/createProject`, data);
  };
  updateproject = (data: projects) => {
    console.log(data);
    return this.put(`/api/Project/updateProject?projectId=${data.id}`, data);
  };
  getprojectbyid = (id: string | undefined | number) => {
    return this.get(`/api/Project/getProjectDetail?id=${id}`);
  };
  getUserByProjectId = (id: string | undefined | number) => {
    return this.get(`api/Users/getUserByProjectId?idProject=${id}`);
  };
}
export const project = new ProjectService();
