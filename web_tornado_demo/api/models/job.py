from models.base import *

class Job(BaseModel):
    _id = AutoField()
    id = CharField(max_length=32,null=True)
    title = CharField(max_length=255,null=True)
    proj = CharField(max_length=128,null=True)
    app = CharField(max_length=128,null=True)
    task = CharField(max_length=128,null=True)
    type = CharField(max_length=128,null=True)
    specification = JsonField()
    begin_time = DateTimeField(null=True)
    end_time = DateTimeField(null=True)
    rejection = JsonField()
    created_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")], null=True)
    updated_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")], null=True)
    status = IntegerField(constraints=[SQL("DEFAULT 0")], null=True)