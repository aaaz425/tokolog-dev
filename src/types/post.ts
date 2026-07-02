export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  summary: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
}
