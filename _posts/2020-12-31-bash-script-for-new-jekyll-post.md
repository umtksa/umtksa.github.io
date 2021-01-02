---
layout: post
title: bash script for new jekyll post and git push
---
bash script for new jekyll post

asks for title and generates a markdown file in _posts folder with proper naming and opens with default markdown editor.
```
#!/bin/bash

echo "Post Title: "
read title


ptitle=${title// /-}
plc=`echo "$ptitle" | tr '[:upper:]' '[:lower:]'`
pdate=`date +%Y-%m-%d`
filename=location/_posts/$pdate-$plc.md
touch $filename

echo "---
layout: post
title: $title
---
post body" > $filename

open $filename
killall Terminal
```

commiting and pushing changes to github
```
cd /Users/mac/blog.github.io
git add .
git commit -m "new post"
git push
killall Terminal
```
