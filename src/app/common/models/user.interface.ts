import { AssignedTask } from "./task.interface";

export interface User extends AssignedUser {
  assignedTask?: AssignedTask;
}

export interface AssignedUser {
  id: string;
  name: string;
}