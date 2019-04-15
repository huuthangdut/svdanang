import { BlogPostTopic } from './blog-post-topic.model';
class BlogPost {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  thumbnailImage: string;
  topic: BlogPostTopic;
  createdDate: number;
  updatedDate: number;
  createdBy: string;
  updatedBy: string;
}

class BlogPostModel {
  constructor(
    public id: number,
    public title: string,
    public shortDescription: string,
    public content: string,
    public topicId: number,
    public thumbnailImage: string
  ) {

  }
}

export { BlogPost, BlogPostModel }