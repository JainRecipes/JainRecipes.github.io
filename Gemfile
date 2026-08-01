source "https://rubygems.org"

# Security-focused gem version constraints
gem 'github-pages', group: :jekyll_plugins
gem 'jemoji', group: :jekyll_plugins

# Address security vulnerabilities from dependabot:
# - REXML ReDoS vulnerability (addressable, rexml)
# - Addressable ReDoS vulnerability
# - Concurrent Ruby threading issues
# - Float::NAN livelocks in concurrent-ruby
# Set conservative version bounds that include security fixes
gem 'jekyll', '>= 4.0.0', '< 5.0.0', group: :jekyll_plugins
gem 'jekyll-sass-converter', '>= 7.0', '< 8.0', group: :jekyll_plugins
gem 'listen', '>= 3.7', '< 4.0', group: :jekyll_plugins

