# JainRecipes.github.io
Compilation of recipes - Jain Family &lt;3

# Installing MySQL + Initializing a Database
Follow tutorial [here](https://www.guru99.com/introduction-to-mysql-workbench.html)
Installation page: https://dev.mysql.com/downloads/mysql/
Had issues with connecting the MySQL server. Need to do the following for server installation:
C:\Users\jainr3\Downloads\mysql-8.0.18-winx64\mysql-8.0.18-winx64\bin>mysqld --install
C:\Users\jainr3\Downloads\mysql-8.0.18-winx64\mysql-8.0.18-winx64\bin>mysqladmin -u root shutdown
C:\Users\jainr3\Downloads\mysql-8.0.18-winx64\mysql-8.0.18-winx64\bin>mysqld --initialize
Also under Windows services make sure 'MySQL' is started (have to do manually).
Follow instructions [here](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html) if need to reset root password.
  - Helpful command: mysqld --init-file=C:\\mysql-init.txt --console
Will need to create a my.ini file and insert into install directory: C:\Program Files\MySQL\MySQL Workbench 8.0 CE
  - For contents of file see [here](http://www.comeausoftware.com/2019/01/basic-mysql-installation-windows/)
Some debugging commands:
C:\Users\jainr3\Downloads\mysql-8.0.18-winx64\mysql-8.0.18-winx64\bin>sc query mysql
- Enable telnet client: C:\Users\jainr3\Downloads\mysql-8.0.18-winx64\mysql-8.0.18-winx64\bin>dism /online /Enable-Feature /FeatureName:TelnetClient
  - To test connection: C:\Users\jainr3\Downloads\mysql-8.0.18-winx64\mysql-8.0.18-winx64\bin>telnet localhost 3306

# Original template Copyright (c) 2013 Mark Otto.
- <https://github.com/mdo>
- <https://twitter.com/mdo>

# Hyde

Hyde is a brazen two-column [Jekyll](http://jekyllrb.com) theme that pairs a prominent sidebar with uncomplicated content. It's based on [Poole](http://getpoole.com), the Jekyll butler.

![Hyde screenshot](https://f.cloud.github.com/assets/98681/1831228/42af6c6a-7384-11e3-98fb-e0b923ee0468.png)


## Contents

- [Usage](#usage)
- [Options](#options)
  - [Sidebar menu](#sidebar-menu)
  - [Sticky sidebar content](#sticky-sidebar-content)
  - [Themes](#themes)
  - [Reverse layout](#reverse-layout)
- [Development](#development)
- [Author](#author)
- [License](#license)


## Usage

Hyde is a theme built on top of [Poole](https://github.com/poole/poole), which provides a fully furnished Jekyll setup—just download and start the Jekyll server. See [the Poole usage guidelines](https://github.com/poole/poole#usage) for how to install and use Jekyll.


## Options

Hyde includes some customizable options, typically applied via classes on the `<body>` element.


### Sidebar menu

Create a list of nav links in the sidebar by assigning each Jekyll page the correct layout in the page's [front-matter](http://jekyllrb.com/docs/frontmatter/).

```
---
layout: page
title: About
---
```

**Why require a specific layout?** Jekyll will return *all* pages, including the `atom.xml`, and with an alphabetical sort order. To ensure the first link is *Home*, we exclude the `index.html` page from this list by specifying the `page` layout.


### Sticky sidebar content

By default Hyde ships with a sidebar that affixes it's content to the bottom of the sidebar. You can optionally disable this by removing the `.sidebar-sticky` class from the sidebar's `.container`. Sidebar content will then normally flow from top to bottom.

```html
<!-- Default sidebar -->
<div class="sidebar">
  <div class="container sidebar-sticky">
    ...
  </div>
</div>

<!-- Modified sidebar -->
<div class="sidebar">
  <div class="container">
    ...
  </div>
</div>
```


### Themes

Hyde ships with eight optional themes based on the [base16 color scheme](https://github.com/chriskempson/base16). Apply a theme to change the color scheme (mostly applies to sidebar and links).

![Hyde in red](https://f.cloud.github.com/assets/98681/1831229/42b0b354-7384-11e3-8462-31b8df193fe5.png)

There are eight themes available at this time.

![Hyde theme classes](https://f.cloud.github.com/assets/98681/1817044/e5b0ec06-6f68-11e3-83d7-acd1942797a1.png)

To use a theme, add anyone of the available theme classes to the `<body>` element in the `default.html` layout, like so:

```html
<body class="theme-base-08">
  ...
</body>
```

To create your own theme, look to the Themes section of [included CSS file](https://github.com/poole/hyde/blob/master/public/css/hyde.css). Copy any existing theme (they're only a few lines of CSS), rename it, and change the provided colors.

### Reverse layout

![Hyde with reverse layout](https://f.cloud.github.com/assets/98681/1831230/42b0d3ac-7384-11e3-8d54-2065afd03f9e.png)

Hyde's page orientation can be reversed with a single class.

```html
<body class="layout-reverse">
  ...
</body>
```


## Development

Hyde has two branches, but only one is used for active development.

- `master` for development.  **All pull requests should be submitted against `master`.**
- `gh-pages` for our hosted site, which includes our analytics tracking code. **Please avoid using this branch.**


## Author

**Mark Otto**
- <https://github.com/mdo>
- <https://twitter.com/mdo>


## License

Open sourced under the [MIT license](LICENSE.md).

<3
