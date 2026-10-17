import json, sys, subprocess
from PIL import Image
for slug in sys.argv[1:]:
    L = json.loads(open(f'build/{slug}/data.js').read()[len('window.LESSON = '):-1])
    ims = []
    for sc in L['scenes']:
        t = 9.4 + sc['start'] + 0.7 * sc['dur']
        subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',f'out/{slug}.mp4','-frames:v','1','-vf','scale=480:-1','/tmp/claude-0/f.png'])
        ims.append(Image.open('/tmp/claude-0/f.png').copy())
    S = Image.new('RGB', (480*4, 270*((len(ims)+3)//4)))
    for i, im in enumerate(ims): S.paste(im, ((i%4)*480, (i//4)*270))
    S.save(f'build/{slug}/final_qa.png')
