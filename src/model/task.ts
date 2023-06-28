import { creator, Member } from "./project";

export interface priorityTask {
  priority: string;
  priorityId: number;
}

export interface taskTypeDetail {
  id: number | string;
  taskType: string;
}

export interface lstTaskDeTail {
  alias: string;
  assigness: any;
  description: string;
  lstComment: any;
  originalEstimate: number;
  priorityId: number;
  priorityTask: priorityTask;
  projectId: string;
  statusId: string;
  taskId: number | string;
  taskName: string;
  taskTypeDetail: taskTypeDetail;
  timeTrackingRemaining: number | string;
  timeTrackingSpent: number | string;
  typeId: number;
}

export interface lstTask {
  statusId: string;
  statusName: string;
  alias: string;
  lstTaskDeTail: lstTaskDeTail[] | null | undefined;
}

export interface projectCategory {
  id: number | string;
  name: string;
}

export interface TaskDetail {
  alias: string;
  creator: creator;
  description: string;
  id: string;
  lstTask?: lstTask[] | null | undefined;
  members: Member[] | null | undefined;
  projectCategory: projectCategory;
  projectName: string;
}

export interface Status {
  statusId: string;
  statusName: string;
  alias: string;
  deleted: boolean;
}

export interface TaskType {
  id: string;
  taskType: string;
}
export interface Priority {
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
}
