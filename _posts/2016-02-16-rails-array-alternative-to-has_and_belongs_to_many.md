---
author: Alex Galushka
author-position: CEO / Tech lead and backend developer
background: rails-array-alternative-to-has_and_belongs_to_many-back
category: engineering
date: "2016-02-16"
description: Custom actions in rails controllers. How to Escape
layout: post
post-id: rails-array-alternative-to-has_and_belongs_to_many
title: Rails array alternative to has_and_belongs_to_many
time-to-read: 2 min
scripts: [post]
---

We have the `Post` model and Post model can have many categories. The classic way is to implement `has_and_belongs_to_many` association and two additional tables. If you need some advanced functionality then you should go with `has_many through` association. But if you need just to save several categories for the post we will do the alternative way: through one array column in `posts` table. Ok let us start.
Migration:

`add_column :posts, :category_ids, :text, array: true, default: []`

Very often we need to store some seed data. In our case we should store the list of categories and this data will never be updated. I prefer to use the localizations for that. Yaml files has [lists(https://en.wikipedia.org/wiki/YAML)
en.yml:

```yaml
en:
  posts:
		categories:
			- Tools
			- Services
			- Other
```

Now you can get the list of categories by calling `I18n.t('posts.categories')`. In our database we will save array with indexes of values.
Add next code to your form:

```slim
 I18n.t('posts.categories').each_with_index do |category, i|
    = checkbox_tag 'post[categories][]', i, f.object.categories.include?(i.to_s), id: "category_#{i}"
		= label_tag "category_#{index}", category
```
