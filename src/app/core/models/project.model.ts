import { AuditInfo } from './audit-info.model';
import { Currency } from './currency.model';
import { ProjectTopic } from './project-topic.model';
class Project extends AuditInfo {
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
  currency: Currency;

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
    public projectTopicId: number,
    public currencyId: number
  ) { }
}

export { Project, ProjectModel }

