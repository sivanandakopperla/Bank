###################################################################
# Library: serializers.py
# serializers
#
# (C) 2017 Cisco Systems, Inc.
# Sivananda Reddy Kopperla (skopperl)
###################################################################

from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
import pdb



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name','email')


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Register
        fields = ('hometown','mobile_no','user')


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('account_no','account_name','account_bank')
