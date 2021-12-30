from models.base import *

class Order(BaseModel):
    app = CharField(null=True)
    created_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")], null=True)
    data = JsonField(null=True)  # json
    id = CharField(primary_key=True)
    proj = CharField(null=True)
    status = IntegerField(constraints=[SQL("DEFAULT 0")], null=True)
    task = CharField(null=True)
    updated_at = DateTimeField(constraints=[SQL("DEFAULT CURRENT_TIMESTAMP")], null=True)
    vendor = CharField(null=True)
    worker = CharField(null=True)
    handle = CharField(null=True)
    class Meta:
        table_name = 'order'