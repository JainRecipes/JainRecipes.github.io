# JainRecipes

Compilation of recipes - Jain Family &lt;3
Created by Rahul & Rishabh Jain

### Template Link
https://github.com/artemsheludko/flexton
https://flexton.netlify.app/

### Issues encountered + fixes

#### Dependency updates under Gemfile.lock
* ffi (1.9.23) -> ffi (1.12.2)
* jekyll (3.7.3) -> jekyll (3.7.4)

#### Category Tag Page Generator
* Jekyll plugin intended to create pages for categories automatically is not supported by Github pages
* https://stackoverflow.com/questions/26218697/jekyll-plugin-to-handle-categories-doesnt-work-on-github
* Solution: Created subdirectory pages manually under category folder. Have to specify category like: "{% for post in site.categories['books'] %}"
