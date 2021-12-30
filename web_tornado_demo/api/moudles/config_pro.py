from datetime import timedelta

mysql = {
    'host': 'rm-2zet559663ri285kjno.mysql.rds.aliyuncs.com',
    'user': 'dever',
    'password': '123qwe',
    'charset': 'utf8mb4',
    'database': 'domino',
    'port': 3306

}
redis = {
    'host': 'r-2zevktd47sacpig5k6pd.redis.rds.aliyuncs.com',
    'port': 6379,
    'password': '&890uioP',
    'db': 11
}
redlock = {
    'host': 'r-2zevktd47sacpig5k6pd.redis.rds.aliyuncs.com',
    'port': 6379,
    'password': '&890uioP',
    'db': 12
}

enable_utc = False
timezone = 'Asia/Shanghai'

broker_url = 'amqp://celery:as()zxOP@172.17.188.12:5672//'
result_backend = 'mongodb://172.17.188.34:6996/'

mongodb_backend_settings = {
    'database': 'domino',
    'taskmeta_collection': 'broker',
}
imports = ['broker.tasks']
worker_concurrency = 6

task_routes = {
    'broker.tasks.assign_pool': {
        'queue': 'broker.assign_pool',
        'routing_key': 'broker.assign_pool'
    },
    'broker.tasks.unfreeze_pool': {
        'queue': 'broker.unfreeze_pool',
        'routing_key': 'broker.unfreeze_pool'
    },
    'broker.tasks.invalidate_pool': {
        'queue': 'broker.invalidate_pool',
        'routing_key': 'broker.invalidate_pool'
    },
    'broker.tasks.assign_task': {
        'queue': 'broker.assign_task',
        'routing_key': 'broker.assign_task'
    },
    'broker.tasks.invalidate_order': {
        'queue': 'broker.invalidate_order',
        'routing_key': 'broker.invalidate_order'
    },
    'broker.tasks.rollback_order': {
        'queue': 'broker.rollback_order',
        'routing_key': 'broker.rollback_order'
    }

}

task_queues = {
    "broker.assign_pool": {
        "exchange": "domino",
        'exchange_type': 'direct',
        'routing_key': 'broker.assign_pool'
    },
    "broker.unfreeze_pool": {
        "exchange": "domino",
        'exchange_type': 'direct',
        'routing_key': 'broker.unfreeze_pool'
    },
    "broker.invalidate_pool": {
        "exchange": "domino",
        'exchange_type': 'direct',
        'routing_key': 'broker.invalidate_pool'
    },
    "broker.assign_task": {
        "exchange": "domino",
        'exchange_type': 'direct',
        'routing_key': 'broker.assign_task'
    },
    "broker.invalidate_order": {
        "exchange": "domino",
        'exchange_type': 'direct',
        'routing_key': 'broker.invalidate_order'
    },
    "broker.rollback_order": {
        "exchange": "domino",
        'exchange_type': 'direct',
        'routing_key': 'broker.rollback_order'
    }
}

beat_schedule = {
    'assign_pool': {
        'task': 'broker.tasks.assign_pool',
        'schedule': timedelta(minutes=15),
    },
    'unfreeze_pool': {
        'task': 'broker.tasks.unfreeze_pool',
        'schedule': timedelta(minutes=5),
    },
    'invalidate_pool': {
        'task': 'broker.tasks.invalidate_pool',
        'schedule': timedelta(minutes=5),
    },
    'invalidate_order': {
        'task': 'broker.tasks.invalidate_order',
        'schedule': timedelta(minutes=5),
    },
    'rollback_order': {
        'task': 'broker.tasks.rollback_order',
        'schedule': timedelta(minutes=5),
    },
}
task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
