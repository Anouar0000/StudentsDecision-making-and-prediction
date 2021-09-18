from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task
import ftb
# Create your views here.


@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/task-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/task-create/',
		'Update':'/task-update/<str:pk>/',
		'Delete':'/task-delete/<str:pk>/',
		'Login':'/login/<str:pk>/',
		'CheckConnect': '/checkConnect/<str:pk>/',
		'Mylogout': '/mylogout/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def taskList(request):
	tasks = Task.objects.all().order_by('-id')
	serializer = TaskSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
	tasks = Task.objects.get(id=pk)
	serializer = TaskSerializer(tasks, many=False)
	return Response(serializer.data)


@api_view(['POST','GET'])
def taskCreate(request):
	try:
		serializer = TaskSerializer(data=request.data)
		tasks = Task.objects.all().order_by('-id')
		#print("azezaeaze2",serializer.data)
		print("azezaeaze",request.data)
		for i in tasks.values():
			if i["email"]==request.data["email"]:
				raise ArithmeticError

		print(serializer.is_valid())
		serializer.save()

		return Response(serializer.data)
	except:
		return Response("email already used")

@api_view(['POST'])
def taskUpdate(request, pk):
	task = Task.objects.get(id=pk)
	serializer = TaskSerializer(instance=task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
	task = Task.objects.get(id=pk)
	task.delete()
	return Response('Item succsesfully delete!')

@api_view(['GET','POST'])
def mylogin(request):
	data=request.data
	try:
		tasks = Task.objects.filter(email=data['email'])
		if list(tasks.values_list())[0][4] == data['password']:
			tasks.update(conect="yes")
			return Response(tasks.values())
		else:
			return Response("password incorrect")
	except:
		return Response("user doesnt exist")


@api_view(['GET'])
def checkConnect(request):

	tasks = Task.objects.all().order_by('-id')
	myvar=[]
	for i in tasks.values():
		if i["conect"]=="yes":
				myvar=i
	try:
		if myvar:
			return Response(myvar)
		else:
			raise ArithmeticError
	except :
		return Response("nope")


@api_view(['POST','GET'])
def mylogout(request):
	data=request.data
	tasks = Task.objects.filter(email=data['email'])
	tasks.update(conect="no")
	return Response("desconnected")


@api_view(['GET','POST'])
def makePredection(request):
	data=request.data

	dataList=[]
	m1,m2=0,0
	spec=""
	for i,j in data.items():
		if i =="moys1":
			m1=float(j)
		if i =="moys2":
			m2=float(j)
		if i == "spec":
			spec=j
			break
		dataList.append(float(j))
	dataList.append((m1+m2)/2)
	return Response(str(round(ftb.makepred(dataList, spec)[0][0], 2)))
