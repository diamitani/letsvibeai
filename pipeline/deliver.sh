#!/bin/bash
# deliver.sh <in.mp4> <out.mp4> : 2-pass H.264 sized to stay under ~28 MB (upload/transfer limit)
IN="$1"; OUT="$2"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
VB=$(python3 -c "print(int(min(6000, (28.0*8*1024*1024/$D - 160000)/1000)))")
LOG=/tmp/claude-0/p_$(basename "$OUT" .mp4)
ffmpeg -v error -y -i "$IN" -c:v libx264 -preset slow -tune animation -b:v ${VB}k -maxrate $((VB*2))k -bufsize $((VB*4))k -pass 1 -passlogfile "$LOG" -an -f null /dev/null && \
ffmpeg -v error -y -i "$IN" -c:v libx264 -preset slow -tune animation -b:v ${VB}k -maxrate $((VB*2))k -bufsize $((VB*4))k -pass 2 -passlogfile "$LOG" -pix_fmt yuv420p -profile:v high -c:a aac -b:a 160k -movflags +faststart "$OUT"
echo "$OUT ${VB}k $(du -m "$OUT" | cut -f1)MB"
