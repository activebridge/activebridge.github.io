[![Deploy Jekyll site to Pages](https://github.com/katatsu12/live_blog/actions/workflows/jekyll.yml/badge.svg)](https://github.com/katatsu12/live_blog/actions/workflows/jekyll.yml)

# live_blog
Live blog URL: https://den.activebridge.org/

## Installation
  * Clone the repository.
  * Install bundler and gems: `gem install bundler && bundle install`.
  * Run the development server: `bundle exec jekyll serve`.

## Publishing
  To publish a new post, create it as described below, and then push the changes to the main branch.

## Blogging on Jekyll

### Adding a New Post
To add a new post to your blog:
  * Create a file in the **_posts** directory. The file name should follow the format: **YEAR-MONTH-DAY-title.md**.
  * Add a background image for the post in the **assets/images/blog/posts/<post.category-name>** directory in the format: **title.webp**. Use only the **webp** format for images to improve page load speed and efficiency.

### Post settings
  Each post begins with Front Matter, which is YAML code enclosed between triple-dashed lines. Here’s an example:

  ```
  ---
  author: Author Name
  author-position: CEO / Tech lead and backend developer
  background: simple-way-to-create-public-pages-back
  category: engineering
  date: "2024-01-01"
  description: Post short description
  layout: post
  post-id: unobtrusive-scripting-adapter-file-uploader
  title: Post title
  time-to-read: 2 min
  scripts: [post]
  ---

  Content
  ```

#### Details About Post Settings:
* `background`: Specify the background image's name without its format, located in the `assets/images/blog/posts/<post.category-name>` directory.
* `category`: Choose one of the predefined categories, such as `engineering`, `business_growth`, `pm_team_management`, or `inside_ab`.
* `post-id`: Assign a unique identifier to your post, formatted as shown in the example.
* `layout`: It's crucial to use the exact layout specified for blog posts. Always use `layout: post` for blog posts to ensure your post is displayed correctly within the site's theme.
* `scripts`: By default, use `[post]`. If your post requires additional specific JavaScript files, list them here without the `.js` extension. These files should be located in the `assets/js` directory. For example, to include a script named `example.js`, add it to the array like so: `scripts: [post, example]`. Follow the format shown in the example for proper script loading.
