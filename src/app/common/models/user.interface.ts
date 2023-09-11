import { Task } from "./task.interface";

export interface User {
  id: string;
  name: string;
  isAssigned?: boolean;
  assignedTask?: Task;
}