import { baseService } from "./baseService";

export class TaskService extends baseService {
  // eslint-disable-next-line
  constructor() {
    super();
  }
  getProjectDetail = (id: undefined | string) => {
    console.log(id);
    return this.get(`api/Project/getProjectDetail?id=${id}`);
  };
  getTaskDetail = (id: undefined | string) => {
    return this.get(`/api/Project/getProjectDetail?taskId=${id}`);
  };

  createTask = (data: any) => {
    return this.post(`/api/Project/createTask`, data);
  };
  updateTask = (data: any) => {
    return this.post(`/api/Project/updateTask`, data);
  };
  getAllstatus = () => {
    return this.get(`/api/Status/getAll`);
  };
  getAllTaskType = () => {
    return this.get(`/api/TaskType/getAll`);
  };
  getAllPriority = () => {
    return this.get(`/api/Priority/getAll`);
  };
}
export const task = new TaskService();
