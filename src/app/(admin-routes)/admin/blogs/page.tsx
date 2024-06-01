import { BlogsPage } from '@/pages/blogs/blogs';
import { blogService } from '@/services/blog.service';

export default async function Blogs() {
  const blogs = await blogService.getBlogs();

  return <BlogsPage initialData={blogs || []} />;
}
