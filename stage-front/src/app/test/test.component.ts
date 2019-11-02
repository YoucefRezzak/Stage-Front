import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostConService } from '../services/con.service';
import {PostListComponent} from '../post-list/post-list.component';
import { post } from 'selenium-webdriver/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(public postService: PostConService) { }
  sendIt(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('nsseyi!');
    this.postService.insertPost(form.value.tit, form.value.desc);
    form.resetForm();
  }
  ngOnInit() {
    console.log('jou sui la');
  }

}
