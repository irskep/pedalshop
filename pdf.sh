#!/usr/bin/env zsh

/Volumes/Macintosh\ HD/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless \
  --print-to-pdf="test.pdf" \
  --no-margins \
  --run-all-compositor-stages-before-draw \
  http://localhost:1238/\#seed\=1574054517389