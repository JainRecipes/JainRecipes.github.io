# JainRecipes

Compilation of recipes - Jain Family &lt;3

Created by Rahul & Rishabh Jain

## Recipe post addition process
* Create a new post under `_posts` folder called `YYYY-MM-DD-name-of-post.markdown`
* Fill out the layout, title, date, image, tags, categories fields.
  * tags and categories fields can be lists like [a, b, c] or just single items
  * Ensure the tags and categories fields are lowercase + spelled correctly
  * **IMPORTANT:** If creating a new category, make sure there is a landing page when searching by category
* For the list of ingredients, make a table using the following generator:
  * https://www.tablesgenerator.com/markdown_tables

### Template Links
* https://github.com/artemsheludko/flexton
* https://flexton.netlify.app/

### Issues encountered + fixes

#### Dependency updates under Gemfile.lock
* ffi (1.9.23) -> ffi (1.12.2)
* jekyll (3.7.3) -> jekyll (3.7.4)

#### Category Page Generator
* Jekyll plugin intended to create pages for categories automatically is not supported by Github pages
* https://stackoverflow.com/questions/26218697/jekyll-plugin-to-handle-categories-doesnt-work-on-github
* Solution: Created subdirectory pages manually under `_posts/category/` folder. Have to specify category like: "{% for post in site.categories['books'] %}"

#### Configured the related posts to be based on tags
* Originally it just showed the four most recent posts
* Now it shows posts that are related by tag (have 1 in common) and if there are not enough it will pick posts arbitrarily
* https://blog.webjeda.com/jekyll-related-posts/
