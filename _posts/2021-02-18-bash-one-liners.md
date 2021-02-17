---
layout: post
title: bash one liners
---

WIFI name

```
WIFINAME=$(/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk '/ SSID/ {prist substr($0, index($0, $2))}') | echo "WIFI: $WIFINAME"
```
