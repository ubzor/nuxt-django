from django.db import models
from django.utils import timezone

from datetime import timedelta

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

def get_due_date():
    """ На выполнение задачи по-умолчанию даётся один день """
    return timezone.now() + timedelta(days=1)

class Todo(models.Model):
    title = models.CharField(max_length=250)
    text = models.TextField(blank=True)
    created_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(default=get_due_date)
    category = models.ForeignKey(Category, related_name='todo_list', on_delete=models.PROTECT)
    done = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'

    def __str__(self):
        return self.title
