# -*- coding: utf-8 -*-
"""
Created on Wed Aug 18 16:58:26 2021

@author: DEX
"""
import tensorflow as tf
import numpy as np
import pandas as pd
import os
from tensorflow.keras.models import load_model

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

Bgl=round(20+20+20+20,2)
Bdsen=round(20+20+20+20*2+20,2)
Bssir=round(20+20+20,2)
Bdev_w_m=round(20+20+20,2)

spec= {"gl":0,"dsen":1,"ssir":2,"dev_w_m":3}

def Score(data, i):
    if spec[i] ==0:
        return round((data[5]+data[6]+data[16]+data[19])/Bgl,2)
    if spec[i] ==1:
        return round((data[0]+data[5]+data[9]+data[12]*2+data[17])/Bdsen,2)
    if spec[i] == 2:
        return round((data[5]+data[16]+data[20])/Bssir,2)
    else:
        return round((data[0]+data[4]+data[14])/Bdev_w_m,2)

# Recreate the exact same model, including its weights and the optimizer
#model = tf.keras.models.load_model('ModelRscore94.h5')
model = load_model('Models/ModelRscore41.h5', compile = False)
def makepred(liste,speciality):
    liste.append(Score(liste,speciality))
    liste=np.array(liste,dtype=float)
    liste=liste.reshape(1,26)
    return model.predict(liste)


#lst_moy = [17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 17.2, 15]
#choice = 'dsen'
#an = makepred(list(map(float, lst_moy)), choice) 

#print(an)