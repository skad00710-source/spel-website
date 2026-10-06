#!/usr/bin/env bash
# Extracts the real-footage clips into JPEG frame sequences that index.html plays back
# frame-exactly (no browser codec dependency). Re-run after changing a clip or a crop.
#   FFMPEG=/path/to/ffmpeg ./prepare-clips.sh          (K=2 by default)
#   K=3 ./prepare-clips.sh                              (for a 4K render)
set -euo pipefail
cd "$(dirname "$0")"
FF="${FFMPEG:-ffmpeg}"
# K = supersampling factor: frames are extracted at K x the panel's CSS size so they stay sharp when the
# page is rendered at deviceScaleFactor 1.5 (1080p) or 2 (1440p). Lanczos resampling, near-lossless JPEG.
K="${K:-2}"
m() { echo $(( $1 * K )); }
x() { local name=$1; shift; rm -rf "clips/$name"; mkdir -p "clips/$name"; "$FF" -y -loglevel error "$@" -q:v 2 "clips/$name/f%04d.jpg"; echo "$name: $(ls clips/$name | wc -l) frames"; }

# s1 · CLCE strip stretched by hand, red <-> green (portrait cover crop). Starts after the title card.
x stretch     -ss 3.0 -t 11.1 -i clips/src/adma2023-stretch.mp4  -vf "fps=10,scale=-2:$(m 498):flags=lanczos,crop=$(m 392):$(m 498):(iw-$(m 392))/2:0"

# s2 · 3x3 multi-pixel array, experimental part (portrait cover crop; the burned-in caption falls below the crop)
x pixels-exp  -ss 3   -t 26  -i clips/src/adma2023-pixels.mp4    -vf "fps=10,scale=-2:$(m 610):flags=lanczos,crop=$(m 392):$(m 498):(iw-$(m 392))/2:0"

# s3 · chameleon photonic skin, invisible -> visible (portrait cover crop)
x chameleon   -ss 4   -t 26  -i clips/src/adma2023-chameleon.mp4 -vf "fps=10,scale=-2:$(m 570):flags=lanczos,crop=$(m 392):$(m 498):(iw-$(m 392))/2:$(m 20)"

# s4 left · same 3x3 array, FEM part. Crop to the white plot area only (drops the black letterbox and
# the burned-in English caption below y=400 of the 720x480 source).
x pixels-fem  -ss 35  -t 23  -i clips/src/adma2023-pixels.mp4    -vf "fps=10,crop=482:320:104:79,scale=$(m 600):$(m 400):flags=lanczos"

# s4 right · colour -> strain read-out validation (MATLAB window, 1550x870). The full window is unreadable
# on a projector, so it is recomposed on white: [input colour video | true strain map | estimated map]
# on top and the 'Mean strain trend' (true vs estimated) plot below. index.html overlays Korean labels.
rm -rf clips/readout; mkdir -p clips/readout
"$FF" -y -loglevel error -ss 0 -t 6.6 -i clips/src/readout-validation.mp4 -filter_complex "\
[0]fps=15,split=4[a][b][c][d];\
[a]crop=434:251:62:109,scale=-2:$(m 108):flags=lanczos[in];\
[b]crop=360:200:600:136,scale=-2:$(m 108):flags=lanczos[gt];\
[c]crop=360:200:1096:136,scale=-2:$(m 108):flags=lanczos[es];\
[d]crop=668:338:70:482,scale=-2:$(m 214):flags=lanczos[tr];\
color=c=white:s=$(m 600)x$(m 400):r=15[bg];\
[bg][in]overlay=$(m 6):$(m 24):shortest=1[o1];[o1][gt]overlay=$(m 198):$(m 24)[o2];\
[o2][es]overlay=$(m 399):$(m 24)[o3];[o3][tr]overlay=(W-w)/2:$(m 146)" -q:v 2 clips/readout/f%04d.jpg
echo "readout: $(ls clips/readout | wc -l) frames"

# s5 left · MATLAB colour tracking on CIE 1931 (figure window only). Trimmed to the clean part: no
# ROI-selection screen at the start, no blank/NaN frames at the end. index.html plays it ping-pong.
x tracking    -ss 5.9 -t 3.5 -i clips/src/clce-tracking.mp4      -vf "fps=10,crop=700:470:700:190,scale=$(m 560):$(m 376):flags=lanczos"

# s5 middle · wearable dual-mode (colour + resistance) fibre sensor on a finger, full 30 fps.
# Source: Zhao et al., ACS Appl. Mater. Interfaces 15, 16063 (2023), supporting video.
x wearable    -ss 0   -t 15.1 -i clips/src/wearable-joint.mp4  -vf "fps=30,scale=$(m 300):-2:flags=lanczos,crop=$(m 300):$(m 498):0:$(m 20)"
