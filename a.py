import json

import yaml

f = open("case-studies-frontmatter.json", "r")
data = json.load(f)

for k, v in data.items():
    with open(f"content/case-studies/{k[5:]}.mdx", "w") as f:
        f.write(
            f"""---
{yaml.dump(v, sort_keys=False)}
---
"""
        )
