export interface User{
  id:number;
  username:string;
  email:string;
  password:string;
  role:'user'|'admin';
  created_at:Date;
}
