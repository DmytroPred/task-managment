import { State } from "./state.type";
import { AssignedUser } from "./user.interface";

export interface Task extends AssignedTask {
  assignedUser?: AssignedUser;
}

export interface AssignedTask {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  modificationDate: Date;
  state: State;
}