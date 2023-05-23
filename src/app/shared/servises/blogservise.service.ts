import { Injectable } from '@angular/core';
import { IAuthor, IPost } from '../interfaces/blog.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BlogserviseService {
  private posts: Array<IPost> = [
    {
      id: 1,
      name: 'First post',
      author: 'admin',
      content: 'Sing up to create you account and start to use Angular Blog',
      time: new Date(2020, 4, 22, 10, 0),
    },
  ];
  private users: Array<IAuthor> = [
    {
      id: 1,
      name: 'admin',
      email: 'admin@gmail.com',
      pass: '12345',
    },
  ];

  constructor() {}
  getPost(): Array<IPost> {
    return this.posts;
  }
  getAuthor(): Array<IAuthor> {
    return this.users;
  }
  addPost(post: IPost): void {
    this.posts.push(post);
  }
  updatePost(post: IPost, id: number): void {
    const index = this.posts.findIndex((post) => post.id === id);
    this.posts.splice(index, 1, post);
  }
  deletePost(id: number): void {
    const index = this.posts.findIndex((post) => post.id === id);
    this.posts.splice(index, 1);
  }
  addUsers(user: IAuthor): void {
    this.users.push(user);
  }
}