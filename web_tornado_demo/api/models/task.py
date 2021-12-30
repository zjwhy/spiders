from models.base import *

class Task(BaseModel):
    _id = AutoField()
    id = CharField(max_length=32)
    app = CharField()
    count = IntegerField(null=True)
    job_id = CharField()
    created_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")], null=True)
    data = JsonField(null=True)  # json
    extra = JsonField(null=True)  # json
    handle = CharField(null=True)
    mode = CharField(null=True)
    order_id = CharField(null=True)
    pool_id = CharField()
    proj = CharField()
    result = JsonField(null=True)  # json
    stage = IntegerField(constraints=[SQL("DEFAULT 0")], null=True)
    status = IntegerField(constraints=[SQL("DEFAULT 0")], index=True, null=True)
    step = IntegerField(null=True)
    stub = CharField(null=True)
    task = CharField()
    type = CharField(null=True)
    updated_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")], null=True)
    vendor = CharField(null=True)
    worker = CharField(null=True)
    map_sign = CharField(max_length=32)

    class Meta:
        table_name = 'task'