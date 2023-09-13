import { Task } from "./task.interface";

export interface User {
  id: string;
  name: string;
  assignedTask?: Task | null;
}
