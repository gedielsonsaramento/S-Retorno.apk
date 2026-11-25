'use strict';

// Add a verified capture without discarding the previously supported build.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const [targetDir, incomingDir] = process.argv.slice(2);
if (!targetDir || !incomingDir) throw new Error('Usage: node merge-profile.cjs EXISTING_PROFILE NEW_PROFILE');
const read = directory => {
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'manifest.json'), 'utf8'));
  if (manifest.schema !== 1 || manifest.minChrome !== 44 || manifest.maxChrome !== 86 ||
      !Array.isArray(manifest.resources) || manifest.resources.length < 2 || manifest.resources.length > 4)
    throw new Error('Unsupported profile');
  const names = new Set();
  for (const resource of manifest.resources) {
    if (!/^main\.[A-Za-z0-9]+\.(js|css)$/.test(resource.name) || names.has(resource.name) ||
        !/^html-compat\/[A-Za-z0-9._-]+$/.test(resource.asset) || resource.asset.includes('..') ||
        !/^[a-f0-9]{64}$/.test(resource.sourceSha256) ||
        !['application/javascript', 'text/css'].includes(resource.mime)) throw new Error('Invalid resource');
    names.add(resource.name);
    const bytes = fs.readFileSync(path.join(directory, path.basename(resource.asset)));
    if (sha(bytes) !== resource.assetSha256) throw new Error('Asset hash mismatch: ' + resource.name);
  }
  return manifest;
};
const target = read(targetDir), incoming = read(incomingDir), additions = [];
for (const resource of incoming.resources) {
  const previous = target.resources.find(r => r.name === resource.name);
  if (previous) {
    if (previous.sourceSha256 !== resource.sourceSha256 || previous.assetSha256 !== resource.assetSha256 ||
        previous.mime !== resource.mime) throw new Error('Conflicting known resource: ' + resource.name);
    continue;
  }
  const extension = path.extname(resource.name);
  const basename = 'spresenter-' + resource.name.slice(0, -extension.length) + '-legacy' + extension;
  const bytes = fs.readFileSync(path.join(incomingDir, path.basename(resource.asset)));
  const destination = path.join(targetDir, basename);
  if (fs.existsSync(destination) && sha(fs.readFileSync(destination)) !== resource.assetSha256)
    throw new Error('Would overwrite a different asset');
  additions.push({resource: {...resource, asset: 'html-compat/' + basename}, bytes, destination});
}
if (target.resources.length + additions.length > 4) throw new Error('Android registry supports at most four resources');
if (fs.readFileSync(path.join(targetDir, 'NOTICE.txt'), 'utf8') !==
    fs.readFileSync(path.join(incomingDir, 'NOTICE.txt'), 'utf8')) throw new Error('Review changed license notices');
for (const addition of additions) {
  fs.writeFileSync(addition.destination, addition.bytes);
  target.resources.push(addition.resource);
}
target.profile = 'capturas-es5-' + target.resources.filter(r => r.mime === 'application/javascript')
  .map(r => r.name.split('.')[1]).join('-');
fs.writeFileSync(path.join(targetDir, 'manifest.json'), JSON.stringify(target, null, 2) + '\n');
console.log(JSON.stringify({added: additions.map(a => a.resource.name), resources: target.resources}, null, 2));
