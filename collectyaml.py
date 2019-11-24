#!/usr/bin/env python3

import csv
import re
import yaml
from collections import OrderedDict
from pathlib import Path

basic_rules = {}
with open('src/improvgrammar/basic.csv') as f:
  rows = list(csv.reader(f))
  columns = []
  for (i, header) in enumerate(rows[0]):
    basic_rules[header] = {
      'groups': [{
        'tags': [],
        'phrases': [row[i] for row in rows[1:] if row[i]],
      }],
    }

with open('src/improvgrammar/basic.yaml', 'w') as f:
  yaml.dump(basic_rules, f, indent=2)

paths = []
# datas = []

root = Path('src/improvgrammar')
for p in root.glob('*.yaml'):
  if p.stem == 'basic':
    continue
  paths.append(p)
paths.append(root / 'basic.yaml')
print(paths)

with open('src/improvgrammar/all.js', 'w') as f:
  text = """
{requires}

export default Object.assign({{}}, {assignments})
""".strip().format(
    requires='\n'.join([
      "import {stem} from './{stem}.yaml';".format(stem=p.stem)
      for p in paths
    ]),
    assignments=', '.join([
      p.stem for p in paths
    ]),
  )
  print(text)
  f.write(text)
