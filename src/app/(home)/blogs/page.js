import BlogListPage from "@/components/blog/BlogListPage";

export default async function BlogsPage() {
  return (
    <div>
      <section className="py-8 lg:py-20 bg-primary-midnightBlue">
        <div className="container mx-auto 2xl:px-32 px-8">
          <h1 className="text-white font-extrabold md:text-4xl text-2xl">
            Kirat Learning Blogs
          </h1>
        </div>
      </section>

      <BlogListPage />
    </div>
  );
}
