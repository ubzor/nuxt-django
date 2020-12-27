from django.contrib import admin

from .models import Category, Todo

class CategoryAdmin(admin.ModelAdmin):
    pass

class TodoAdmin(admin.ModelAdmin):
    pass

admin.site.register(Category, CategoryAdmin)
admin.site.register(Todo, TodoAdmin)
