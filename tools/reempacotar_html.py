#!/usr/bin/env python3
"""Update only compatibility assets in an existing APK; output is UNSIGNED.

Usage: python reempacotar_html.py BASE.apk ASSETS_HTML_COMPAT OUTPUT_UNSIGNED.apk
Sign the output with the existing app key, then verify it using apksigner.
No application code, version, resources or native libraries are recompiled.
"""
import copy
import hashlib
import json
from pathlib import Path
import re
import struct
import sys
import zipfile

base, asset_dir, destination = map(Path, sys.argv[1:])
if base.resolve() == destination.resolve():
    raise SystemExit('Use a separate output APK')
manifest_path = asset_dir / 'manifest.json'
manifest = json.loads(manifest_path.read_text())
resources = manifest['resources']
assert manifest['schema'] == 1 and manifest['minChrome'] == 44 and manifest['maxChrome'] == 86
assert 2 <= len(resources) <= 4
assert len({r['name'] for r in resources}) == len(resources)
replacements = {'assets/html-compat/manifest.json': manifest_path.read_bytes()}
for resource in resources:
    assert re.fullmatch(r'main\.[A-Za-z0-9]+\.(js|css)', resource['name'])
    assert re.fullmatch(r'html-compat/[A-Za-z0-9._-]+', resource['asset']) and '..' not in resource['asset']
    content = (asset_dir / Path(resource['asset']).name).read_bytes()
    assert len(content) <= 2 * 1024 * 1024
    assert hashlib.sha256(content).hexdigest() == resource['assetSha256']
    replacements['assets/' + resource['asset']] = content

def signature(name):
    return re.fullmatch(r'META-INF/(MANIFEST\.MF|[^/]+\.(SF|RSA|DSA|EC))', name, re.I) is not None

def write_aligned(output, info, data):
    info = copy.copy(info)
    if info.compress_type == zipfile.ZIP_STORED:
        alignment = 16384 if info.filename.startswith('lib/') and info.filename.endswith('.so') else 4
        name_bytes = info.filename.encode('utf-8' if info.flag_bits & 0x800 else 'ascii')
        offset = output.fp.tell() + 30 + len(name_bytes) + len(info.extra)
        padding = (-offset) % alignment
        if padding:
            if padding < 4:
                padding += alignment
            info.extra += struct.pack('<HH', 0xffff, padding - 4) + bytes(padding - 4)
        assert len(info.extra) <= 65535
    output.writestr(info, data)

destination.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(base) as previous, zipfile.ZipFile(destination, 'w') as output:
    assert previous.testzip() is None
    assert len(previous.namelist()) == len(set(previous.namelist()))
    for info in previous.infolist():
        if not signature(info.filename):
            write_aligned(output, info, replacements.pop(info.filename, previous.read(info)))
    for name, data in sorted(replacements.items()):
        info = zipfile.ZipInfo(name, date_time=(2026, 11, 8, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        write_aligned(output, info, data)
with zipfile.ZipFile(destination) as result:
    assert result.testzip() is None
    with destination.open('rb') as stream:
        for info in result.infolist():
            if info.compress_type == zipfile.ZIP_STORED:
                stream.seek(info.header_offset + 26)
                filename_length, extra_length = struct.unpack('<HH', stream.read(4))
                offset = info.header_offset + 30 + filename_length + extra_length
                alignment = 16384 if info.filename.startswith('lib/') and info.filename.endswith('.so') else 4
                assert offset % alignment == 0, info.filename
print(json.dumps({'output': str(destination), 'signed': False, 'bytes': destination.stat().st_size}))
