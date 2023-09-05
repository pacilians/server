from pymongo import MongoClient
# from core.schemas.user import User
# Get the database using the method we defined in pymongo_test_insert file

from pymongo import MongoClient
def get_database():
   CONNECTION_STRING = "mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT"
   client = MongoClient(CONNECTION_STRING)
   return client['main']
  

db = get_database()

collection_name = db["user"]

# user = User()
# user.email = "A"
# user.name = "B"

# print(collection_name, 'OK', db)

# item_1 = {
#   "id" : "U1IT00001",
#   "item_name" : "Blender",
#   "max_discount" : "10%",
#   "batch_number" : "RR450020FRG",
#   "price" : 340,
#   "category" : "kitchen appliance"
# }

# item_2 = {
#   "id" : "U1IT00002",
#   "item_name" : "Egg",
#   "category" : "food",
#   "quantity" : 12,
#   "price" : 36,
#   "item_description" : "brown country eggs"
# }
# collection_name.insert_many([item_1,item_2])

# print(user)