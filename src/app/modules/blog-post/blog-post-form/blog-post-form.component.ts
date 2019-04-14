import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blog-post-form',
  templateUrl: './blog-post-form.component.html',
  styleUrls: ['./blog-post-form.component.scss']
})
export class BlogPostFormComponent implements OnInit {

  public Editor = ClassicEditor;

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

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

}
