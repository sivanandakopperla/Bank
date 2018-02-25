import pdb
import json
import sys
import subprocess
import os
from time import sleep

#django libraries
from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from .serializers import *
from .models import *

#REST libraries
from rest_framework import viewsets
# Create your views here.

def serialize(data):

    return json.dumps(data)

def deserialize(data):

    return json.loads(data)

def get_post_data(request, key="data"):
    data = deserialize(request.POST.get(key, "{}"))
    return data


class PageViews():
    def index_page(self, request):
        return render(request, "index_reg.html")
    def home_page(self, request):
        return render(request, "home_page.html")

class RegisterView(viewsets.ModelViewSet):

    @csrf_exempt
    def register(self, request):
        print("entering user view")
        pdb.set_trace()
        data = get_post_data(request)
        try:

            user = User.objects.get(username=data.get("userid"))
            db_serializer_obj = UserSerializer(user)
            db_serializer_obj1 = RegisterSerializer(user)

            data =  {"status": "User ID already Exist"}
            return HttpResponse(serialize(data))

        except User.DoesNotExist:
            user = User.objects.create_user(data.get("userid"),data.get("email"), data.get("passwd"))
            register = Register()
        user.first_name= data.get('fname', '')
        user.last_name = data.get('lname', '')
        user.is_staff = True
        user.is_active = True
        register.user = user
        register.mobile_no = data.get("mobile")
        register.hometown = data.get("home")
        register.save()
        # user.is_superuser = True
        user.save()

        data =  {"status": " Registration success! Please Log In"}
        return HttpResponse(serialize(data))


class AccountView(viewsets.ModelViewSet):

    @csrf_exempt
    def account_add(self, request):
        print("entering user view")
        data = get_post_data(request)
        account = Account()
        account.account_no= data.get('account', '')
        account.account_name = data.get('accountname', '')
        account.account_bank = data.get('accountbank', '')
        account.save()

        data =  {"status": " Payee Added Sucessfully!"}
        return HttpResponse(serialize(data))

class AccountDataView(viewsets.ModelViewSet):

    @csrf_exempt

    def account_data(self, request):
        queryset = Account.objects.all()
        serializer_class = AccountSerializer

    def list(self, request, *args, **kwargs):
        obj = Account.objects.all()
        serializer = AccountSerializer(obj,many=True)
        data = serializer.data
        result = {"status": "HTTP_200_OK","data":data}
        return HttpResponse(serialize(result))



class DeleteAccountDataView(viewsets.ModelViewSet):

    @csrf_exempt

    def delete_account_data(self, request):
        data = get_post_data(request)
        acc = Account.objects.filter(account_name=data.get("accountname1"))
        try:
            acc.delete()
        except:
            pass
        data =  {"status": " %s Account Delete"%data.get("accountname1")}
        return HttpResponse(serialize(data))

 

class UserDataView(viewsets.ModelViewSet):

    @csrf_exempt

    def user_data(self, request):
        queryset = User.objects.all()
        serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        id_ = self.kwargs['int']
        obj = User.objects.filter(id = id_)
        serializer = UserSerializer(obj,many=True)
        data = serializer.data

        obj1 = Register.objects.filter(user = id_)
        serializer1 = RegisterSerializer(obj1,many=True)
        data1 = serializer1.data
        result = {"status": "HTTP_200_OK","data":data,"data1":data1}
        return HttpResponse(serialize(result))

# class UserDataView(viewsets.ModelViewSet):

#     @csrf_exempt

#     def user_data(self, request):
#         data = self.get_post_data(request)
#         id_ = data.get('uid')
#         pdb.set_trace()
#         id_ = kwargs['pk']
#         obj = User.objects.filter(userid = id_)
#         serializer = UserSerializer(obj,many=True)
#         data = serializer.data

#         obj1 = Register.objects.filter(userid = id_)
#         serializer1 = RegisterSerializer(obj1,many=True)
#         data1 = serializer1.data

#         return Response(data,data1, status=status.HTTP_200_OK)

