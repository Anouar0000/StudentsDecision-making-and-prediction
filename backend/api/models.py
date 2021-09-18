from django.db import models

# Create your models here.

class Task(models.Model):

  firstname = models.CharField(max_length=200)
  lastname = models.TextField(max_length=100)
  email = models.CharField(max_length=200)
  password = models.TextField(max_length=100)
  conect = models.TextField(max_length=100)

  #title = models.CharField(max_length=200)
  #completed = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.firstname
    #return self.title

