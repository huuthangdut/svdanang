import { DialogService } from './../../../shared/services/dialog.service';
import { ProjectTopicService } from './../../../core/services/project-topic.service';
import { BlogPostTopicService } from './../../../core/services/blog-post-topic.service';
import { EventTopicService } from './../../../core/services/event-topic.service';
import { TopicFormComponent } from './../topic-form/topic-form.component';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ACTION } from '../../../shared/constants/action.constant';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  isLoadingEvent = false;
  isLoadingProject = false;
  isLoadingBlog = false;

  displayedColumns = ['name', 'description', 'actions'];

  blogDataSource = new MatTableDataSource();
  projectDataSource = new MatTableDataSource();
  eventDataSource = new MatTableDataSource();

  ACTION = ACTION;

  constructor(
    private dialog: MatDialog,
    private eventTopicService: EventTopicService,
    private blogTopicService: BlogPostTopicService,
    private projectTopicService: ProjectTopicService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadBlogPostTopics();
    this.loadEventTopics();
    this.loadProjectTopics();
  }

  loadEventTopics() {
    this.isLoadingEvent = true;
    this.eventTopicService.getAll().subscribe(response => {
      if (response.success) {
        this.eventDataSource = new MatTableDataSource(response.data);
        this.isLoadingEvent = false;
      }
    });
  }

  loadProjectTopics() {
    this.isLoadingProject = true;
    this.projectTopicService.getAll().subscribe(response => {
      if (response.success) {
        this.projectDataSource = new MatTableDataSource(response.data);
        this.isLoadingProject = false;
      }
    });
  }

  loadBlogPostTopics() {
    this.isLoadingBlog = true;
    this.blogTopicService.getAll().subscribe(response => {
      if (response.success) {
        this.blogDataSource = new MatTableDataSource(response.data.content);
        this.isLoadingBlog = false;
      }
    });
  }

  onAdd(type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { type: type };
    dialogConfig.width = "450px";
    dialogConfig.position = { top: '15vh' };
    const dialogRef = this.dialog.open(TopicFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTopicByType(type);
      }
    });
  }

  onEdit(type: string, id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { type: type, topicId: id };
    dialogConfig.width = "450px";
    dialogConfig.position = { top: '15vh' };
    const dialogRef = this.dialog.open(TopicFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTopicByType(type);
      }
    });
  }

  loadTopicByType(type) {
    switch (type) {
      case 'event':
        this.loadEventTopics();
        break;
      case 'project':
        this.loadProjectTopics();
        break;
      case 'blog':
        this.loadBlogPostTopics();
        break;
    }
  }

  onDelete(type: string, id: number) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá chủ đề',
      message: 'Bạn có chắc chắn muốn xoá chủ đề này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        switch (type) {
          case 'event':
            this.eventTopicService.deleteTopic(id).subscribe(
              (response) => this.handleDeleteSuccess(type),
              (error) => this.handleDeleteError(error)
            )
            break;
          case 'project':
            this.projectTopicService.deleteTopic(id).subscribe(
              (response) => this.handleDeleteSuccess(type),
              (error) => this.handleDeleteError(error)
            )
            break;
          case 'blog':
            this.blogTopicService.deleteTopic(id).subscribe(
              (response) => this.handleDeleteSuccess(type),
              (error) => this.handleDeleteError(error)
            )
            break;
        }
      }
    });

  }

  handleDeleteSuccess(type): void {
    this.snackBar.open('Xoá chủ đề thành công.', '', {
      duration: 2000
    });
    this.loadTopicByType(type);
  }

  handleDeleteError(error: any): void {
    this.snackBar.open('Có lỗi xảy ra. Vui lòng thử lại', '', {
      duration: 2000
    });
  }

}
