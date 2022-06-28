from django import forms 
from .models import Music

class MusicForm(forms.ModelForm):
    class Meta:
        model = Music
        fields = ("title", "artist", "image", "audio_file", "audio_link", "duration")
        
#         error_messages = {
#             "name":{
#                 "required": "Tohle je povinne"
#             }
#         }

# class User_MusicForm(forms.ModelForm):
#     class Meta:
#         model = User_Music
#         fields = ("name", "music_file")
