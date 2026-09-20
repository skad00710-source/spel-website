import zipfile, re, shutil, sys
src=sys.argv[1]; tmp=src+'.tmp'
zin=zipfile.ZipFile(src); zout=zipfile.ZipFile(tmp,'w',zipfile.ZIP_DEFLATED)
for item in zin.infolist():
    data=zin.read(item.filename)
    if re.search(r'ppt/(slides/slide\d+|slideLayouts/slideLayout\d+|slideMasters/slideMaster\d+)\.xml$', item.filename):
        x=data.decode('utf-8')
        n=0
        def rep(m):
            global n
            if 'type=' in m.group(0): return m.group(0)
            n+=1
            return m.group(0).replace('<p:ph','<p:ph type="pic"',1)
        x=re.sub(r'<p:ph\b[^>]*idx="10[0-3]"[^>]*/?>', rep, x, flags=re.S)
        print(item.filename, 'patched', n)
        data=x.encode('utf-8')
    zout.writestr(item, data)
zin.close(); zout.close(); shutil.move(tmp, src)
