import { ProjectTopic } from './project-topic.model';
import { AuditUser } from './audit-user.model';
class Project {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  startTime: number;
  endTime: number;
  raised: number;
  goal: number;
  image: string;
  projectTopic: ProjectTopic;

  createdAt: number;
  updatedAt: number;
  createBy: AuditUser;
  updatedBy: AuditUser;

}

class ProjectModel {
  constructor(
    public id: number,
    public name: string,
    public shortDescription: string,
    public description: string,
    public startTime: number,
    public endTime: number,
    public goal: number,
    public image: string,
    public projectTopicId: number
  ) { }
}

export { Project, ProjectModel }

