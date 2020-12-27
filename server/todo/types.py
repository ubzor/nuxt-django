from graphene_django.types import DjangoObjectType

from .models import Todo, Category

# С помощью graphene_django привязываем типы к моделям,
# что позволит ходить по всей вложенности базы данных как угодно,
# прямо из интерфейса GraphiQL.
# Однако будьте осторожны, связывание таблиц практически напрямую
# с фронтом может быть чревато при росте проекта. Думаю такой способ
# подходит преимущественно для небольших CRUD приложений.
class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category

class TodoNode(DjangoObjectType):
    class Meta:
        model = Todo
