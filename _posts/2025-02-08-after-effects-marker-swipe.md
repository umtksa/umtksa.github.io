---
layout: post
title: after effects swipe every marker 1080 px 
---

add this expression to position of the layer 
```
var startY = 0;
var stepPX = 1080;
var duration = 0.6;

var markers = thisLayer.marker;
var count = markers.numKeys;

var passedCount = 0;
var lastMarkerTime = -1; // ← -1 yaptık, marker gelmeden tetiklenmesin

for (var i = 1; i <= count; i++) {
    if (time >= markers.key(i).time) {
        passedCount = i;
        lastMarkerTime = markers.key(i).time;
    }
}

// Hiç marker geçilmediyse sabit dur
if (passedCount == 0) {
    [thisLayer.position[0], startY];
} else {
    var targetY = startY - (passedCount * stepPX);
    var prevY = startY - ((passedCount - 1) * stepPX);

    var t = (time - lastMarkerTime) / duration;
    t = Math.min(t, 1);

    var eased = 1 - Math.pow(1 - t, 3);
    var currentY = prevY + (targetY - prevY) * eased;

    [thisLayer.position[0], currentY];
}

```
