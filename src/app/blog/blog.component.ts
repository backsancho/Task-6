import { Component, OnInit } from '@angular/core';
import { IAuthor, IPost } from '../shared/interfaces/blog.interfaces';
import { BlogserviseService } from '../shared/servises/blogservise.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public headerBtn = true;
  public userName!: string;
  public authorArray: Array<IAuthor> = [];
  public postArray: Array<IPost> = [];
  public showSignIn = false;
  public showSignUp = false;
  public showAddPost = false;
  public idPost!: number;
  public btnPost = true;
  public border = true;
  public addEdit = true;
  public email!: string;
  public pass!: string;

  public post = {
    title: '',
    text: '',
  };
  public author = {
    name: '',
    email: '',
    pass: '',
  };
  public regExp = {
    name: /^\w{4,16}$/i,
    pass: /^[a-z|0-9|\.|_|-]{4,16}$/i,
    email: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,5}/,
  };

  constructor(private BlogserviseService: BlogserviseService) {}
  
  ngOnInit(): void {
    this.getAuthor();
    this.getPost();
  }
  getAuthor(): void {
    this.authorArray = this.BlogserviseService.getAuthor();
  }
  getPost(): void {
    this.postArray = this.BlogserviseService.getPost();
  }

  signIn(): void{
    this.showSignIn = true;
  }

  singUp(): void {
    this.showSignUp = true;
  }

  addPost(): void {
    this.showAddPost = true;
  }

  submitIn(): void {
    for (let val of this.authorArray) {
      if (val.email === this.email && val.pass === this.pass) {
        this.userName = val.name;
        this.headerBtn = false;
        this.modalHide();
      } else {
        this.border = false;
      }
    }
  }

  submitUp(): void {
    let unique = this.authorArray.some(
      (user) => user.email === this.author.email||user.name === this.author.name);
    if ( this.regExp.name.test(this.author.name) &&
         this.regExp.email.test(this.author.email) &&
         this.regExp.pass.test(this.author.pass) && !unique
    ) {
      const newUser = {
        id: 1,
        name: this.author.name,
        email: this.author.email,
        pass: this.author.pass,
      };
      if (this.authorArray.length > 0) {
        const iDUser = this.postArray.slice(-1)[0].id;
        newUser.id = iDUser + 1;
      }
      this.BlogserviseService.addUsers(newUser);
      this.userName = this.author.name;
      this.modalHide();
      this.headerBtn = false;
    } else {
      this.border = false;
      return;
    }
    this.headerBtn = false;
  }

  addEditPost(): void {
    if (!this.post.title || !this.post.text) {
      this.border = false;
    } else {
      const newPost = {
        id: 1,
        name: this.post.title,
        author: this.userName,
        content: this.post.text,
        time: new Date(),
      };
      if (this.postArray.length > 0) {
        const iDPost = this.postArray.slice(-1)[0].id;
        newPost.id = iDPost + 1;
      }
      this.BlogserviseService.addPost(newPost);
      this.modalHide();
    }
  }

  editPost(posT: IPost): void {
    this.post.title = posT.name;
    this.post.text = posT.content;
    this.idPost = posT.id;
    this.showAddPost = true;
    this.addEdit = false;
  }

  uppdatePost(): void {
    const uppPost = {
      id: this.idPost,
      name: this.post.title,
      author: this.userName,
      content: this.post.text,
      time: new Date(),
    };
    this.BlogserviseService.updatePost(uppPost, this.idPost);
    this.modalHide();
  }

  deletePost(posT: IPost): void {
    this.BlogserviseService.deletePost(posT.id);
  }

  singOut(): void {
    this.headerBtn = true;
  }

  close(): void {
    this.modalHide();
  }

  modalHide(): void {
    this.showAddPost = false;
    this.showSignIn = false;
    this.showSignUp = false;
    this.addEdit = true;
    this.post.text = '';
    this.post.title = '';
    this.border = true;
    this.author.name = '';
    this.author.email = '';
    this.author.pass = '';
    this.pass = '';
    this.email = '';
  }


  
}
