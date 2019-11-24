#!/usr/bin/env python3

import glob
import re
import subprocess
import yaml
from collections import Counter

RE_RULE = re.compile(r':[A-Za-z0-9]+\b')
assert RE_RULE.findall('[:asdf]') == [':asdf']

datas = []
for p in glob.glob('src/improvgrammar/*.yaml'):
  if 'subtitle' in p:
    continue
  if 'pedalWords' in p:
    continue
  with open(p, 'r') as f:
    datas.append(yaml.load(f))

edges = Counter()
uses = Counter()

nodes = []

for data in datas:
  for k, v in data.items():
    if k == 'desc2':
      continue
    nodes.append(k)
    for group in v['groups']:
      for phrase in group['phrases']:
        for prefixed_rule in RE_RULE.findall(phrase):
          rule = prefixed_rule[1:]
          uses[rule] += 1
          pair = '{k} -> {rule};'.format(k=k, rule=rule)
          edges[pair] += 1

text = """
  digraph grammar {{
    rankdir=LR;
    {nodes}
    {edges}
  }}
""".format(
  edges='\n'.join(list(edges.keys())),
  nodes='\n'.join([
    '{rule}[label="{rule} ({count})"];'.format(
      rule=rule,
      count=uses[rule])
    for rule in nodes
  ]))
print(text)

with open('analysis/graph.dot', 'w') as f:
  f.write(text)

subprocess.run(['dot', '-v', 'analysis/graph.dot', '-Tpdf', '-o', 'analysis/graph.pdf'])