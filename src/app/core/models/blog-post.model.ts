import { AuditInfo } from './audit-info.model';
import { BlogPostTopic } from './blog-post-topic.model';
class BlogPost extends AuditInfo {
  id: number;
  title: string;
  shortContent: string;
  content: string;
  thumbnailImage: string;
  blogPostTopic: BlogPostTopic;
}

class BlogPostModel {
  constructor(
    public id: number,
    public title: string,
    public shortContent: string,
    public content: string,
    public blogPostTopicId: number,
    public thumbnailImage: string
  ) {

  }
}

export { BlogPost, BlogPostModel }