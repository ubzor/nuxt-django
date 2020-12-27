import graphene

from server.todo.schema import Query, Mutation

schema = graphene.Schema(query=Query, mutation=Mutation)
