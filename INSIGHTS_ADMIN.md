# ASMAN Trade Connect - Insights Admin System

## Overview

This project includes a complete Insights (blog) management system with:

- **Admin Dashboard**: Secure login and post management
- **Post Editor**: Create, edit, and delete posts with rich content
- **Insights Page**: Public-facing blog listing with published posts
- **Article Pages**: Individual article views with SEO optimization
- **Mobile-Friendly Admin**: Full functionality accessible from phones

## Setup Instructions

### 1. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/asman_blog
ADMIN_EMAIL=admin@asmanprimehub.com
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your_jwt_secret_key_here
SITE_URL=https://asmanprimehub.com
```

### 2. Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### 3. Installation

```bash
npm install
npm run dev
```

## Usage

### Admin Dashboard

1. **Access**: Navigate to `https://asmanprimehub.com/admin/login`
2. **Login**: Use your admin email and password
3. **Dashboard**: View all posts, create new, edit, or delete existing posts

### Creating a Post

1. Click "New Post" on the dashboard
2. Fill in:
   - **Title**: Main heading (auto-generates slug)
   - **Excerpt**: Short summary (120 characters)
   - **Content**: Full article text
   - **Featured Image**: URL to the image
   - **Status**: Draft or Published
3. Fill SEO section:
   - **SEO Title**: Under 60 characters
   - **SEO Description**: 150-160 characters
   - **OG Image**: For social sharing
   - **Canonical URL**: For duplicate prevention
4. Click "Create Post"

### Publishing Posts

- **Draft**: Post is saved but not visible
- **Published**: Post appears on `/insights` page
- Change status anytime by editing the post

### Mobile Admin

The admin panel is fully responsive:
- Access from your phone's browser
- Create posts on the go
- Edit and publish instantly
- All features work on mobile

## File Structure

```
src/
├── routes/
│   ├── admin.tsx                 # Admin redirect
│   ├── admin_.login.tsx          # Login page
│   ├── admin_dashboard.tsx       # Dashboard with post list
│   ├── admin_posts_new.tsx       # Create new post
│   ├── admin_posts_$id_edit.tsx  # Edit post
│   ├── admin_docs.tsx            # Admin documentation
│   ├── insights.tsx              # Public blog listing
│   └── insights_$slug.tsx        # Individual article
├── components/
│   └── admin/
│       └── PostEditor.tsx        # Post form component
├── api/
│   ├── admin/
│   │   ├── login.ts             # Authentication
│   │   ├── logout.ts            # Session cleanup
│   │   ├── posts.ts             # Post CRUD
│   │   └── posts.$id.ts         # Individual post operations
│   └── posts.ts                 # Public posts API
├── lib/
│   ├── auth.server.ts           # Authentication utilities
│   ├── db.server.ts             # Database client
│   └── utils.ts                 # Helper functions
server/
└── db/
    └── schema.ts                 # Database tables
public/
├── sitemap.xml                   # SEO sitemap
└── robots.txt                    # Robots directives
```

## API Endpoints

### Authentication
- `POST /api/admin/login` - Login with email/password
- `POST /api/admin/logout` - Logout and clear session

### Posts (Admin)
- `GET /api/admin/posts` - List all posts
- `POST /api/admin/posts` - Create new post
- `GET /api/admin/posts/:id` - Get single post
- `PUT /api/admin/posts/:id` - Update post
- `DELETE /api/admin/posts/:id` - Delete post

### Posts (Public)
- `GET /api/posts?status=published&limit=12` - Get published posts
- `GET /api/posts/:slug` - Get single post by slug
- `GET /api/posts/related/:id` - Get related articles

## SEO Features

✅ **Meta Tags**: Title, description, OG tags
✅ **Canonical URLs**: Prevent duplicate content
✅ **Structured Data**: JSON-LD article schema
✅ **Sitemap**: Auto-generated URLs
✅ **Robots.txt**: Search engine directives
✅ **Reading Time**: Auto-calculated and displayed
✅ **Image Alt Text**: Required for accessibility

## Features

### Admin Panel
- ✅ Secure login with email/password
- ✅ Create posts with rich text
- ✅ Draft and published statuses
- ✅ Edit existing posts
- ✅ Delete posts with confirmation
- ✅ SEO optimization fields
- ✅ Featured image management
- ✅ Auto-generated slugs and reading time
- ✅ Mobile-responsive interface
- ✅ Logout functionality

### Public Insights Page
- ✅ Grid layout of published posts
- ✅ Featured images with lazy loading
- ✅ Publication date and reading time
- ✅ Post excerpts with "Read More" links
- ✅ Responsive design (mobile, tablet, desktop)

### Individual Article Pages
- ✅ Full article content
- ✅ Featured image hero section
- ✅ Publication metadata
- ✅ Reading time indicator
- ✅ Social sharing buttons (Twitter, Facebook, LinkedIn, Copy Link)
- ✅ Related articles section
- ✅ Call-to-action for consultations
- ✅ Full SEO optimization
- ✅ Previous/Next navigation (ready to implement)

### Design
- ✅ Consistent with ASMAN Prime Hub branding
- ✅ Gold and burgundy color scheme
- ✅ Responsive on all devices
- ✅ Accessibility-first approach
- ✅ Fast loading and performance-optimized

## From Your Phone

### On Mobile/Tablet

1. **Access Admin**: Open browser and go to `https://asmanprimehub.com/admin/login`
2. **Login**: Enter credentials
3. **Create Post**:
   - Tap "New Post"
   - Fill form (works on mobile keyboard)
   - Use image URLs or upload from your device
4. **Edit Post**:
   - Find post in list
   - Tap "Edit"
   - Make changes
   - Tap "Update"
5. **Delete Post**:
   - Find post
   - Tap "Delete"
   - Confirm

### Best Practices for Mobile

- Use clear, descriptive titles
- Keep excerpts concise
- Use existing image URLs or upload via mobile
- Test preview on desktop before publishing
- Use landscape mode for comfortable editing

## Deployment on Vercel

1. **Push to GitHub**: All changes automatically sync
2. **Vercel Auto-Deploy**: Triggered on push to main
3. **Environment Variables**: Set in Vercel dashboard
4. **Database**: Configure DATABASE_URL in Vercel
5. **Cron Jobs**: Set up RSS feed generation if needed

## Database (PostgreSQL)

### Tables

**posts**
- id, slug (unique), title, excerpt, content
- featuredImage, featuredImageAlt, status, publishedAt
- seoTitle, seoDescription, ogImage, canonicalUrl
- readingTimeMinutes, views
- createdAt, updatedAt

**admin_users**
- id, email (unique), passwordHash, isActive
- createdAt

**admin_sessions**
- id (primary), userId, expiresAt, createdAt

## Contact Form Integration

The existing contact form remains unchanged. Consultation modal continues to work on article pages.

## Performance

- ✅ Image optimization with lazy loading
- ✅ Post listing pagination-ready
- ✅ Efficient database queries
- ✅ SEO-friendly URL structure
- ✅ Mobile-first responsive design

## Security

- ✅ Password hashing (SHA-256)
- ✅ Session management
- ✅ CSRF protection ready
- ✅ SQL injection prevention (Drizzle ORM)
- ✅ Admin routes protected

## Maintenance

### Regular Tasks
- Update sitemap.xml monthly
- Monitor post performance in analytics
- Backup database regularly
- Update robots.txt as needed

### Monitoring
- Check post views
- Track comment engagement
- Monitor SEO rankings
- Test mobile responsiveness

## Support

For issues or questions:
1. Check admin documentation at `/admin/docs`
2. Review error messages in browser console
3. Contact ASMAN Prime Hub support

## Next Steps

1. ✅ Database configuration
2. ✅ Set admin credentials
3. ✅ Deploy to Vercel
4. ✅ Create first test post
5. ✅ Share login credentials with team
6. ✅ Start publishing content

---

**Version**: 1.0.0  
**Last Updated**: 2026-07-15  
**Status**: Production Ready
