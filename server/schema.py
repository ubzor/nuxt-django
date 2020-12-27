import graphene

import server.todo.schema
import server.auth_app.schema

class Query(
    server.todo.schema.Query,
    server.auth_app.schema.Query,
    graphene.ObjectType,
):
    pass

class Mutation(
    server.todo.schema.Mutation,
    server.auth_app.schema.Mutation,
    graphene.ObjectType,
):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
