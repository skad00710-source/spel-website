"""Post-process the generated PPTX:
 - mark the photo placeholders as picture placeholders (type="pic") so PowerPoint shows the click-to-insert icon
 - give every picture rounded corners (roundRect) like the HTML flyer
"""
import zipfile, re, shutil, sys
src=sys.argv[1]; tmp=src+'.tmp'
zin=zipfile.ZipFile(src); zout=zipfile.ZipFile(tmp,'w',zipfile.ZIP_DEFLATED)
for item in zin.infolist():
    data=zin.read(item.filename)
    if re.search(r'ppt/(slides/slide\d+|slideLayouts/slideLayout\d+|slideMasters/slideMaster\d+)\.xml$', item.filename):
        x=data.decode('utf-8'); n=0
        def rep(m):
            global n
            if 'type=' in m.group(0): return m.group(0)
            n+=1; return m.group(0).replace('<p:ph','<p:ph type="pic"',1)
        x=re.sub(r'<p:ph\b[^>]*idx="10[0-9]"[^>]*/?>', rep, x, flags=re.S)
        r=0
        if item.filename.startswith('ppt/slides/'):
            def round_pic(m):
                global r
                pic=m.group(0)
                if 'motif' in pic or 'wash' in pic: return pic   # decorative PNGs stay as they are
                cx=int(re.search(r'<a:ext cx="(\d+)"', pic).group(1)); cy=int(re.search(r'<a:ext cx="\d+" cy="(\d+)"', pic).group(1))
                short=min(cx,cy); radius_emu=int(0.08*914400)  # ~2 mm
                adj=min(50000, int(radius_emu/short*100000))
                r+=1
                return re.sub(r'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>', f'<a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val {adj}"/></a:avLst></a:prstGeom>', pic)
            x=re.sub(r'<p:pic>.*?</p:pic>', round_pic, x, flags=re.S)
        print(item.filename, 'ph patched', n, 'rounded pics', r)
        data=x.encode('utf-8')
    zout.writestr(item, data)
zin.close(); zout.close(); shutil.move(tmp, src)
