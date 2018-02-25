from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Register(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mobile_no = models.IntegerField()
    hometown = models.CharField(max_length=255)

class Account(models.Model):
    account_no = models.IntegerField()
    account_name = models.CharField(max_length=255)
    account_bank = models.CharField(max_length=255)

    class Meta:
        db_table = 'tbl_cccount_info'
