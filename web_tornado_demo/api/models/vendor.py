from models.base import *


class Vendor(BaseModel):
    id = AutoField()
    account = CharField(null=True)
    constraint = JsonField(null=True)  # json
    handle = CharField(null=True)
    name = CharField(null=True)
    status = IntegerField(constraints=[SQL("DEFAULT 0")],null=True)

    class Meta:
        table_name = 'vendor'
