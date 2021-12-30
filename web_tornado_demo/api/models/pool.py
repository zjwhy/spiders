from models.base import *

class Pool(BaseModel):
    _id = AutoField()
    id = CharField(null=True)
    app = CharField()
    begin_time = DateTimeField(null=True)
    job_id = CharField(null=True)
    created_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")], null=True)
    data = JsonField(null=True)  # json
    end_time = DateTimeField(null=True)
    data_id = CharField(index=True)
    proj = CharField()
    status = IntegerField(constraints=[SQL("DEFAULT 1")], null=True)
    task = CharField()
    type = CharField()
    updated_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")], null=True)

    class Meta:
        table_name = 'pool'