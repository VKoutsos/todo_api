export interface Subtask{
  id:number;
  task_id:number;
  title:string;
  description:string;
  status:'pending'|'completed';
  created_at?:string;
  editing?:boolean;
  tempTitle?:string;
}
