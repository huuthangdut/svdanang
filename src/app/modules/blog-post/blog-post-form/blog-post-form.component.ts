import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-post-form',
  templateUrl: './blog-post-form.component.html',
  styleUrls: ['./blog-post-form.component.scss']
})
export class BlogPostFormComponent implements OnInit {

  topics;

  options: any = {
    lineWrapping: true,
    toolbar: ["bold", "italic", "heading", "|", "quote", "ordered-list", "unordered-list", "table", "|", "link", "image", "|", "preview", "side-by-side", "fullscreen"],
    toolbarTips: true,
    status: true,
    placeholder: "Nhập nội dung bài đăng",
    spellCheck: false
  };

  constructor() { }

  ngOnInit() {
    this.topics = [
      { id: 1, name: 'Topic 1' },
      { id: 2, name: 'Topic 2' },
      { id: 3, name: 'Topic 3' },
      { id: 4, name: 'Topic 4' },
    ]
  }

}
