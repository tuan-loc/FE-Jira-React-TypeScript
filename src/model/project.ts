export interface Member {
  userId: number;
  name: string;
  avatar: string;
}
export interface creator {
  id: number;
  name: string;
}

export interface Project {
  members: Member;
  creator: creator;
  id: number | null | string;
  projectName: string;
  description: string;
  alias: string;
  deleted: boolean;
}
export interface ProjectState {
  project: Project[] | null;
}

interface projectCategory {
  id: 1;
  name: string;
}
export interface projects {
  id: any;
  projectName: string;
  description: string;
  categoryId: number | undefined;
  alias: string;
  projectCategory?: projectCategory;
  creator?: creator | any;
}
