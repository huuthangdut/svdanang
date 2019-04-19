import { TINY_MCE_SETTINGS } from './../../../shared/settings/editor.setting';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { BlogPost, BlogPostModel } from './../../../core/models/blog-post.model';
import { BlogPostService } from './../../../core/services/blog-post.service';
import { BlogPostFormService } from './../../../core/services/forms/blog-post-form.service';


@Component({
  selector: 'app-blog-post-form',
  templateUrl: './blog-post-form.component.html',
  styleUrls: ['./blog-post-form.component.scss']
})
export class BlogPostFormComponent implements OnInit {
  @ViewChild("editor") editor: ElementRef;

  title = 'Tạo mới bài đăng';
  topics = [];

  postId: number;
  post: BlogPost;
  isEdit: boolean = false;

  blogPostForm: FormGroup;

  formErrors: any;

  submitting: boolean;

  tinyMCE = TINY_MCE_SETTINGS;

  constructor(
    private blogPostService: BlogPostService,
    private blogPostFormService: BlogPostFormService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    let param = +this.route.snapshot.paramMap.get('id');
    param = !isNaN(param) ? param : null;
    if (param) {
      this.postId = param;
      this.isEdit = true;
      this.title = 'Chỉnh sửa bài đăng';
    }
  }

  ngOnInit() {
    this.formErrors = this.blogPostFormService.formErrors;

    this.loadBlogPostTopics();

    this.buildForm();
  }

  loadBlogPostTopics() {
    this.topics = [
      { id: 1, name: 'Topic 1' },
      { id: 2, name: 'Topic 2' },
      { id: 3, name: 'Topic 3' },
      { id: 4, name: 'Topic 4' },
    ]
  }

  buildForm() {
    this.blogPostForm = this.formBuilder.group({
      title: [null, Validators.required],
      topicId: [null, Validators.required],
      shortDescription: null,
      content: [null, Validators.required]
    });

    if (this.isEdit) {
      this.getBlogPostAndPopulateForm(this.postId);
    }

    this.blogPostForm.valueChanges.subscribe(data => this.onValueChanged());

  }

  onValueChanged(): void {
    if (!this.blogPostForm) { return; }

    this.blogPostFormService.logValidationErrors(this.blogPostForm);

    this.formErrors = this.blogPostFormService.formErrors;

    console.log(this.formErrors);
  }

  getBlogPostAndPopulateForm(postId: number) {
    this.blogPostService.getPost(postId).subscribe(response => {
      if (response.success) {
        this.post = response.data;

        this.setFormValue(this.post);
        this.blogPostFormService.markDirty(this.blogPostForm);
        this.blogPostForm.updateValueAndValidity();
      }
    });
  }

  setFormValue(post: BlogPost) {
    this.blogPostForm.patchValue({
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      topicId: post.topic.id
    })
  }


  getSubmitModel() {
    const formValue = Object.assign({}, this.blogPostForm.value);

    return new BlogPostModel(
      this.post ? this.post.id : null,
      formValue.title,
      formValue.shortDescription,
      formValue.content,
      formValue.topicId,
      formValue.thumbnailImage
    );
  }

  onSubmit() {
    this.submitting = true;
    if (this.blogPostForm.valid) {
      const blogPost = this.getSubmitModel();
      console.log(blogPost);

      if (this.isEdit) {
        this.blogPostService.updatePost(blogPost.id, event).subscribe(
          response => this.handleSubmitSuccess(response),
          error => this.handleSubmitError(error)
        );
      } else {
        this.blogPostService.createPost(blogPost)
          .subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          );
      }
    }
  }

  handleSubmitSuccess(response) {
    this.submitting = false;
    const message = this.isEdit ? "Cập nhật bài đăng thành công" : "Thêm bài đăng thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  handleSubmitError(error) {
    this.submitting = false;
    console.log(error);

    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000,
    });
  }


}