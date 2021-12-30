from models.base import *

class Recipe(BaseModel):
    _id = AutoField()
    app = CharField(null=True)
    class_ = CharField(column_name='class', null=True)
    handle = CharField(null=True)
    key_feild = CharField(null=True)
    memo = TextField(null=True)
    mode = CharField(null=True)
    proj = CharField(null=True)
    signature = JsonField(null=True)  # json
    status = IntegerField(constraints=[SQL("DEFAULT 1")], null=True)
    step = IntegerField(null=True)
    task = CharField(null=True)
    type = CharField(null=True)
    version = CharField(null=True)
    worker = CharField(null=True)

    class Meta:
        table_name = 'recipe'
        indexes = (
            (('proj', 'app', 'task'), True),
        )