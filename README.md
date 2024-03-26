[![Deploy Jekyll site to Pages](https://github.com/katatsu12/live_blog/actions/workflows/jekyll.yml/badge.svg)](https://github.com/katatsu12/live_blog/actions/workflows/jekyll.yml)

# live_blog
Live blog URL: https://activebridge.org/

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

### Important
  When adding text values to your post settings, especially if those texts include symbols, always enclose the text in quotation marks `""`. This practice ensures that the YAML parser correctly interprets the text as a single string value, preventing any parsing errors or unintended behavior.

### Post settings
  Each post begins with Front Matter, which is YAML code enclosed between triple-dashed lines. Here’s an example:

  ```
  ---
  author: Author Name
  author-position: CEO / Tech lead and backend developer
  background: simple-way-to-create-public-pages-back
  category: engineering
  date: "2024-01-01"
  description: This is an example description of a blog post
  layout: post
  post-id: unobtrusive-scripting-adapter-file-uploader
  title: Example Blog Post Title
  post-title: Post title
  time-to-read: 2 min
  scripts: [post]
  popular: true
  hidden: true
  ---

  Content
  ```

#### Details About Post Settings:
* `background`: Specify the background image's name without its format, located in the `assets/images/blog/posts/<post.category-name>` directory. It will be used as the background image for the post card and for the SEO cover-image meta tag.
* `category`: Choose one of the predefined categories, such as `engineering`, `business_growth`, `pm_team_management`, or `inside_ab`.
* `post-id`: Assign a unique identifier to your post, formatted as shown in the example.
* `time-to-read`: An estimate of how long it will take to read the blog post, usually given in minutes.
* `date`: The publication date of the blog post. It's important for sorting posts and should match the date in the post's filename.
* `description`: A short description of the blog post, used for SEO purposes to provide a meta description tag.
* `title`: This title will be used as the meta title tag for SEO.
* `post-title`: The title of the blog post. This will be used for the H1 heading on the post page.
* `layout`: It's crucial to use the exact layout specified for blog posts. Always use `layout: post` for blog posts to ensure your post is displayed correctly within the site's theme.
* `scripts`: By default, use `[post]`. If your post requires additional specific JavaScript files, list them here without the `.js` extension. These files should be located in the `assets/js` directory. For example, to include a script named `example.js`, add it to the array like so: `scripts: [post, example]`. Follow the format shown in the example for proper script loading.
* `popular`: An optional boolean value. If set to true, the post will be added to a "Popular Post" section on the website. If not needed, this setting can be omitted.
* `hidden`: An optional boolean value. If set to true, the post will not show. If not needed, this setting can be omitted.


### SEO

#### To incorporate JSON-LD for SEO enhancement on each page:

  * Create a JSON-LD file within the **_data/seo directory**, naming it appropriately, e.g., **file-name.json**.
  * Reference this file in your page's Front Matter by adding its name (excluding the .json extension) to a json-ld field. For instance, for a homepage file named **home.html**, integrate it as follows

  ```
  ---
  # Other development settings

  json-ld: home
  ---
  ```

#### To incorporate JSON-LD for SEO enhancement on each post:
  * Add variables related to SEO in each post after the main settings. These will enhance your post's SEO by providing structured data.

  ```
  ---
  ....
  scripts: [post]
  popular: true

  # Only for SEO
  author-url: "https://www.linkedin.com/in/author"
  date-modified: "2024-01-10"
  article-body: This is the some main elements of the blog post
  ---
  ```

  These variables will be used in the main post SEO partial, located in **_includes/post_seo.html**, to dynamically generate JSON-LD structured data for each post.
