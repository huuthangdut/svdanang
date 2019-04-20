import { BlogPostTopic } from './blog-post-topic.model';
class BlogPost {
  id: number;
  title: string;
  shortContent: string;
  content: string;
  thumbnailImage: string;
  blogPostTopic: BlogPostTopic;
  blogPostTopicId: number;
  createdDate: number;
  updatedDate: number;
  createdBy: string;
  updatedBy: string;
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