"""bank URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token



users = views.PageViews()
reg=views.RegisterView()
acc=views.AccountView()
delacc=views.DeleteAccountDataView()
urlpatterns = [
    
    path(r'', users.index_page),
    path('register/', reg.register),
    path('api-token-auth/', obtain_jwt_token),
    path('homepage/', users.home_page),
    path('userd/<int>/', views.UserDataView.as_view({'get': 'list'})),
    path('createAcc/', acc.account_add),
    path('getAccount/', views.AccountDataView.as_view({'get': 'list'})),
    path('deleteAcc/', delacc.delete_account_data),
]
