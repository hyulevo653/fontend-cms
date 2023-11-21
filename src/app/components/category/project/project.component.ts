import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { ApiConstant } from 'src/app/shared/constants/api.constants';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { Project } from 'src/app/viewModels/project/project';
import { ResApi } from 'src/app/viewModels/res-api';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  public filterParrams : Paging;
  public lstProject: Array<Project>;
  public first = 0;
  public rows = 10;

  constructor(
    private readonly projectService: ProjectService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;

    this.lstProject = new Array<Project>();
  }

  ngOnInit() {
      this.getListProjectByPaging();
  }

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return true;//this.customers ? this.first === this.customers.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return true;//this.customers ? this.first === 0 : true;
  }

  getListProjectByPaging() {
    this.projectService.getListByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if(res.status == AppStatusCode.StatusCode200) {
        this.lstProject = res.data.elements;
      }
      else {
        this.lstProject = new Array<Project>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
      
    })
  }

  editProject(itemProject: Project) {

  }

  deleteProject(project: Project) {
    
  }
}
