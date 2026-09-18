#!/usr/bin/env bash
# Extracts the real-footage clips into JPEG frame sequences that index.html plays back
# frame-exactly (no browser codec dependency). Re-run after changing a clip or a crop.
#   FFMPEG=/path/to/ffmpeg ./prepare-clips.sh
set -euo pipefail
cd "$(dirname "$0")"
FF="${FFMPEG:-ffmpeg}"
x() { local name=$1; shift; rm -rf "clips/$name"; mkdir -p "clips/$name"; "$FF" -y -loglevel error "$@" -q:v 3 "clips/$name/f%04d.jpg"; echo "$name: $(ls clips/$name | wc -l) frames"; }
# 3x3 multi-pixel array, experimental part (portrait cover crop)            -> scene: multi-pixel
x pixels-exp  -ss 3   -t 26  -i clips/src/adma2023-pixels.mp4    -vf "fps=10,scale=-2:570,crop=392:498:(iw-392)/2:0"
# same clip, FEM analysis part (landscape)                                   -> scene: simulation
x pixels-fem  -ss 35  -t 23  -i clips/src/adma2023-pixels.mp4    -vf "fps=10,scale=600:400"
# chameleon photonic skin, invisible -> visible (portrait cover crop)        -> scene: encryption / camouflage
x chameleon   -ss 4   -t 26  -i clips/src/adma2023-chameleon.mp4 -vf "fps=10,scale=-2:570,crop=392:498:(iw-392)/2:20"
# MATLAB colour tracking on CIE 1931 (crop to the figure window)             -> scene: biosensor
x tracking    -ss 5.5 -t 4.2 -i clips/src/clce-tracking.mp4      -vf "fps=10,crop=700:470:700:190,scale=560:376"
# colour -> strain readout validation (synthetic ground truth)               -> scene: simulation
x readout     -ss 0   -t 6.6 -i clips/src/readout-validation.mp4 -vf "fps=15,scale=620:348"
# Wearable dual-mode (colour + resistance) fibre sensor on a finger (portrait phone clip)  -> scene: biosensor
# Source: ACS Appl. Mater. Interfaces 15, 16063 (2023), Supporting Video S3
x wearable    -ss 0   -t 15.1 -i clips/src/wearable-joint.mp4  -vf "fps=10,scale=300:-2,crop=300:498:0:20"
