from django.db import models
from django.urls import reverse 

# Create your models here.

class Music(models.Model):
    title = models.TextField()
    artist= models.TextField()
    image = models.ImageField()
    audio_file = models.FileField(blank=True, null=True)
    audio_link = models.CharField(max_length=200, blank=True, null=True)
    duration = models.CharField(max_length=20)
    paginate_by = 2
    
        
    def __str__(self):
        return self.title


# class User_Music(models.Model):
#     name = models.TextField()
#     music_file = models.FileField(blank=True, null=True)
#     paginate_by = 1
    
        
#     def __str__(self):
#         return self.name