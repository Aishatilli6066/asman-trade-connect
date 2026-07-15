import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GoldButton } from "@/components/site/primitives";

export const Route = createFileRoute("/admin/docs")({});

function AdminDocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-x py-16 md:py-24 max-w-4xl">
        <h1 className="font-display text-4xl mb-8">Admin Documentation</h1>

        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl mb-4">Getting Started</h2>
            <p className="mb-4 text-lg text-[var(--color-ink)]/70">Welcome to the ASMAN Prime Hub Insights Admin Panel. This guide will help you manage blog posts.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Login</h2>
            <ol className="list-decimal list-inside space-y-2 text-lg text-[var(--color-ink)]/70">
              <li>Visit <code className="bg-gray-100 px-2 py-1 rounded">https://asmanprimehub.com/admin/login</code></li>
              <li>Enter your email and password</li>
              <li>Click "Sign In"</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Creating a New Post</h2>
            <ol className="list-decimal list-inside space-y-2 text-lg text-[var(--color-ink)]/70">
              <li>Click "New Post" button on the dashboard</li>
              <li>Fill in the post details (title, excerpt, content)</li>
              <li>Upload or link to your featured image</li>
              <li>Fill in SEO information (title, description, canonical URL)</li>
              <li>Choose status: Draft or Published</li>
              <li>Click "Create Post"</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Editing a Post</h2>
            <ol className="list-decimal list-inside space-y-2 text-lg text-[var(--color-ink)]/70">
              <li>From the dashboard, find the post you want to edit</li>
              <li>Click the "Edit" button</li>
              <li>Make your changes</li>
              <li>Click "Update Post"</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Publishing Posts</h2>
            <div className="text-lg text-[var(--color-ink)]/70 space-y-2">
              <p><strong>Draft:</strong> Post is saved but not visible to the public</p>
              <p><strong>Published:</strong> Post is live and visible on the Insights page</p>
              <p>You can change the status at any time by editing the post.</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Deleting Posts</h2>
            <ol className="list-decimal list-inside space-y-2 text-lg text-[var(--color-ink)]/70">
              <li>From the dashboard, find the post you want to delete</li>
              <li>Click the "Delete" button</li>
              <li>Confirm the deletion</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">SEO Best Practices</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-[var(--color-ink)]/70">
              <li>SEO Title: Keep under 60 characters</li>
              <li>SEO Description: 150-160 characters for optimal display</li>
              <li>Include keywords naturally in your content</li>
              <li>Use descriptive alt text for images</li>
              <li>Set canonical URL to prevent duplicate content issues</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Content Guidelines</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-[var(--color-ink)]/70">
              <li>Keep titles clear and descriptive</li>
              <li>Write engaging excerpts (1-2 sentences)</li>
              <li>Use proper formatting in the content</li>
              <li>Include high-quality featured images</li>
              <li>Provide alt text for all images</li>
              <li>Content should be relevant to global trade and sourcing</li>
            </ul>
          </section>

          <section>
            <div className="bg-[var(--color-burgundy)] text-white rounded-lg p-8">
              <h3 className="font-display text-2xl mb-4">Need Help?</h3>
              <p className="mb-6">For technical support or questions, contact ASMAN Prime Hub support.</p>
              <Link to="/contact">
                <GoldButton>Contact Support <ArrowRight size={14} /></GoldButton>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

Route.component = AdminDocsPage;
