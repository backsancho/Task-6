export interface IPost{
  id:number;
  name:string;
  author:string;
  content:string;
  time: Date;
}

export interface IAuthor{
  id: number;
  name:string;
  email: string;
  pass: string;
}