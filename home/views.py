from django.shortcuts import redirect, render
from django.core.paginator import Paginator
from .models import Music

from pydub import AudioSegment
from pydub.playback import play
from pathlib import Path


from .forms import MusicForm
from django.core.files import File


def index(request):
    musics = Music.objects.all()
    context = {"Music": musics}
    return render(request, "home/index.html", context)

# def user_music(request):
#     songs = User_Music.objects.all()
#     context = {"User_Music": songs}
#     return render(request, "home/index.html", context)

def overlay_music(request): 
    if request.method == "POST":
        AudioSegment.converter = r"C:\\Users\\Svitlana\\Downloads\\musicapp\\ffmpeg\\bin\\ffmpeg.exe"
        get_file = Music.objects.values_list('audio_file')
        name_music = []
        for i in get_file:
            get_link = str(i)[2:-3]
            name_music.append(get_link)
            for m in name_music:
            #get_link = str(get_file)[13:-5]
                path = "C:\\Users\\Svitlana\\Downloads\\musicapp\\musicapp\\home\\music\\music\\wav\\"
                my_file = Path(path + get_link)
    
                audio1 = AudioSegment.from_wav(my_file) 
        # audio2 = AudioSegment.from_wav(my_file2) 
        mixed2 = audio1.overlay(audio1)         
        f = mixed2.export("C:\\Users\\Svitlana\\Downloads\\musicapp\\musicapp\\home\\music\\music\\wav\\try10.wav", format='wav')
        print(f)

    return redirect("home")
















