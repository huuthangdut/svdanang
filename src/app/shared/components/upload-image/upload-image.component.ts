import { UploadService } from './../../../core/services/upload.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Output('upload') upload: EventEmitter<string> = new EventEmitter<string>();

  constructor(private uploadSevice: UploadService) { }

  ngOnInit() {
  }

  fileSelectMsg: string = '';
  disabled: boolean = false;

  selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
  }

  uploadEvent(file: File): void {
    this.fileSelectMsg = 'Đang tải lên';
    this.uploadSevice.uploadFile(file).subscribe((response: any) => {
      this.fileSelectMsg = file.name;
      this.upload.emit(response.fileDownloadUri);
    });
  }

  cancelEvent(): void {
    this.fileSelectMsg = '';
  }


}
