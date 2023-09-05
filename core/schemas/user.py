from pydantic import BaseModel, Field


class User(BaseModel):
    id: str
    email: str
    name: str
    role: str
    
