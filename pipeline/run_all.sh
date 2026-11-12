#!/bin/bash
cd /home/claude/lvai
for s in "$@"; do
  python3 prep.py $s 2>&1 | grep total
  python3 render.py $s video 2 2>&1 | grep -v "^\s*$" | tail -1
  wait   # finish previous assembly before starting a new one
  (python3 assemble.py $s > build/asm_$s.log 2>&1; echo "DONE $s $(du -m out/$s.mp4 | cut -f1)MB") &
done
wait
echo ALLDONE
