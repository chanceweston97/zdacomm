import BlogDetailsWithSidebar from '@/components/BlogDetailsWithSidebar';
import { getPost } from '@/sanity/sanity-blog-utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Details Page | ZDA Communications',
  description: 'This is Blog Details Page for ZDA Communications Template',
  // other metadata
};

const BlogDetailsWithSidebarPage = async () => {
  const slug = 'cooking-masterclass-creating-delicious-italian-pasta';

  const blogData = await getPost(slug);

  return (
    <main>
      <BlogDetailsWithSidebar blogData={blogData} />
    </main>
  );
};

export default BlogDetailsWithSidebarPage;
