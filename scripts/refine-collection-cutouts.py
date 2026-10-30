"""Original RGB + authored silhouette refined only within a narrow edge band.
Requires Pillow, NumPy, OpenCV. No generative processing or RGB repainting.
Run build-collection-cutouts.mjs first. Backups remain untouched.
"""
import json, sys, hashlib
from pathlib import Path
import numpy as np
import cv2
from PIL import Image
root=Path(__file__).resolve().parent.parent
spec=json.loads((root/'scripts/collection-cutout-masks.json').read_text())
out=root/'src/assets/images/collection/cutouts'; out.mkdir(exist_ok=True)
report_path=root/'scripts/collection-cutout-verification.json'
report=json.loads(report_path.read_text()) if sys.argv[1:] and report_path.exists() else []
cv2.setNumThreads(4)
for name in (sys.argv[1:] or spec):
    im=Image.open(root/f'src/assets/images/collection/{name}.webp').convert('RGB')
    rgb=np.array(im); h,w=rgb.shape[:2]
    guide=np.array(Image.open(root/f'scripts/collection-masks/{name}-guide.png'))
    detail=np.array(Image.open(root/f'scripts/collection-masks/{name}-detail.png'))
    # Narrow uncertainty strip: interiors are fixed foreground, distant background fixed transparent.
    radius=max(2,round(w/spec[name]['viewBox'][0]*3))
    binary=(guide>127).astype('uint8')
    kernel=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*radius+1,2*radius+1))
    inner=cv2.erode(binary,kernel); outer=cv2.dilate(binary,kernel)
    labels=np.zeros((h,w),np.uint8)
    labels[outer>0]=cv2.GC_PR_BGD; labels[binary>0]=cv2.GC_PR_FGD; labels[inner>0]=cv2.GC_FGD
    cv2.setRNGSeed(42)
    cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),labels,None,np.zeros((1,65)),np.zeros((1,65)),2,cv2.GC_INIT_WITH_MASK)
    silhouette=np.isin(labels,[cv2.GC_FGD,cv2.GC_PR_FGD]).astype('uint8')*255
    # Subpixel edge only. Preserve disconnected original accessories and fine authored cords.
    alpha=cv2.GaussianBlur(silhouette,(3,3),.48)
    alpha=np.maximum(alpha,detail)
    ys,xs=np.where(alpha>0)
    left=max(0,int(xs.min())-8); top=max(0,int(ys.min())-8)
    right=min(w,int(xs.max())+9); bottom=min(h,int(ys.max())+9)
    rgba=np.dstack([rgb,alpha])[top:bottom,left:right]
    dest=out/f'{name}.webp'
    Image.fromarray(rgba).save(dest,lossless=True,quality=100,method=6,exact=True)
    decoded=np.array(Image.open(dest).convert('RGBA'))
    assert np.array_equal(decoded,rgba), f'RGBA changed: {name}'
    Image.fromarray(alpha).save(root/f'scripts/collection-masks/{name}-alpha.png')
    report=[entry for entry in report if entry['name'] != name]
    report.append({'name':name,'sourceSize':[w,h],'crop':[left,top,right,bottom], 'outputSize':[right-left,bottom-top], 'sourcePixelVerification':'PASS: every cropped RGB sample unchanged; alpha only', 'encodedPixelVerification':'PASS: lossless WebP RGBA exact', 'bytes':dest.stat().st_size})
    print(name,report[-1]['outputSize'],'verified',flush=True)
(root/'scripts/collection-cutout-verification.json').write_text(json.dumps(report,indent=2)+'\n')
