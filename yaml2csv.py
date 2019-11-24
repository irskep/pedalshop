#!/usr/bin/env python3

import csv
import glob
import re
import yaml
from collections import Counter
from itertools import zip_longest

RE_RULE = re.compile(r':[A-Za-z0-9]+\b')
assert RE_RULE.findall('[:asdf]') == [':asdf']

BLACKLIST = {
  'letter',
  'twoLetters',
}

datas = []
for p in glob.glob('src/improvgrammar/*.yaml'):
  if 'nameOfMusician' in p:
    continue
  if 'subtitle' in p:
    continue
  with open(p, 'r') as f:
    datas.append(yaml.load(f))

columns = []
for data in datas:
  for k, v in data.items():
    if k in BLACKLIST:
      continue
    if len(v['groups']) > 1:
      continue
    if 'dry' in v['groups']:
      continue
    recurses = False
    recursing_rules = [
      phrase for phrase in v['groups'][0]['phrases']
      if '[' in phrase
    ]
    if recursing_rules:
      continue
    columns.append([k] + v['groups'][0]['phrases'])

print(','.join([c[0] for c in columns]))
rows = list(zip_longest(*columns, fillvalue=''))

with open('src/improvgrammar/basic.csv', 'w') as f:
  writer = csv.writer(f)
  writer.writerows(rows)
