import {Subtask} from './subtask.model';

export interface Task{
  id:number;
  title:string;
  description:string;
  status:'pending'|'completed';
  created_at?:string;
  subtasks?:Subtask[];
  showDetails?:boolean;
}
