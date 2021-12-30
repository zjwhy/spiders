#coding=UTF-8
# from models.baseModel import database
from tornado.log import access_log
import json,os,time,uuid,hashlib,re,traceback
from peewee import fn,JOIN
from config import limit_config
from models.job import Job
from models.task import Task
from peewee import IntegrityError
from datetime import datetime
import traceback

class LogicBaseModel(object):

    def query(self,*args,keys_dict={},Model=None,limit=None):
        database = Model._meta.database
        if database.is_closed():
            database.connection()
        try:
            if limit:
                result = Model.select(*args).where(*keys_dict['data']).limit(limit).dicts()
            else:
                result = Model.select(*args).where(*keys_dict['data']).dicts()
            if result:
                result = list(result)

            else:
                result = []
            return result
        except Exception as e:
            pass

        finally:
            if not database.is_closed():
                database.close()

    def insert(self,_data_insert={},Model=None,task=[]):
        database = Model._meta.database
        table_name =Model._meta.table_name
        if database.is_closed():database.connection()
        try:
            with database.manual_commit() :
                try:
                    if task:
                        for t in task:
                            _data_insert['task'] = t
                            insert = Model.insert(_data_insert).execute()
                    else:
                        insert = Model.insert(_data_insert).execute()

                    database.commit()
                    print("pool insert 提交完成")
                    result = ( True,'insert ok')
                except IntegrityError as e:
                    id_re = re.search(r"Duplicate entry \'(.+?)\' ",e.args[1])
                    id_ = id_re.group(1) if id_re else ""
                    result = (False,f"{table_name} id({id_}) error ")
                    access_log.error("主键重复问题：%s;插入数据：%s"%(id_,json.dumps(_data_insert,ensure_ascii=False)),
                                     stack_info=True)
                except Exception as e:
                    database.rollback()

                    access_log.error("数据库插入问题：%s;插入数据：%s"%(e,json.dumps(_data_insert,ensure_ascii=False)),
                                     stack_info=True)
                    result = ( False,'sql error')

        finally:
            if not database.is_closed():database.close()

        return result
    def task_update(self,body_json=None,Model=None,Order=None):
        database = Model._meta.database
        try:
            if database.is_closed(): database.connection()
            proj = body_json['proj']
            app = body_json['app']
            task = body_json['task']
            handle = body_json['handle']
            job_id = body_json['job_id']
            user = body_json['vendor']
            limit = body_json['limit']
            del body_json['handle']
            del body_json['limit']
            del body_json['vendor']
            del body_json['job_id']
            stamp = int(time.time() * 1000)
            uuid_str = uuid.uuid4()
            pid = os.getpid()
            with database.manual_commit():
                database.begin()
                try:
                    order_id = hashlib.new('md5','{}{}{}{}'.format(user,stamp,uuid_str,pid).encode()).hexdigest()

                    if handle !="html" and handle!="mobile":

                        limit = limit_config[handle]
                    if limit:
                        limit = int(limit)
                    # update = Model.update({Model.vendor: user,Model.stage:-1,Model.order_id:order_id}).where(Model.vendor ==None,Model.stage==1,Model.proj==proj,Model.app==app,Model.task==task,Model.job_id==job_id).order_by(Model.created_at).limit(limit).execute()
                    update = Model.update({Model.vendor: user,Model.stage:-1,Model.order_id:order_id}).where(Model.vendor ==None , Model.stage==1 ,Model.status==0, Model.proj==proj , Model.app==app , Model.task==task , Model.job_id==job_id,Model.handle==handle,).order_by(Model.created_at).limit(limit)

                    access_log.info(f"debug_order_sql:{update}")

                    update.execute()

                    # to_order_data = []
                    # if order_by_result:
                    #     to_order_data = list(order_by_result)
                    # result = to_order_data
                    # if to_order_data:
                    #
                    #     result = order_id
                    #     insert_data = body_json
                    #     insert_data['id'] = order_id
                    #     insert_data['data'] = to_order_data
                    #     insert_data['worker'] = to_order_data[0]['worker']
                    #     insert_data['handle'] = handle
                    #     insert_data['vendor'] = user
                    #     insert =Order.insert(insert_data).execute()
                    #     Model.update({Model.stage:2}).where(Model.order_id==order_id,Model.stage==-1).execute()

                    database.commit()
                    print('提交完成')
                except Exception as e:
                    # print(e)
                    # txn.rollback()
                    database.rollback()
                    result =  False
                    trace_text = traceback.format_exc()
                    access_log.error("数据库插入问题：%s;插入数据：%s" % (e, user, ))
                    print('rollback')
                    return result
            # order_by_result = Model.select(Model.id, Model.map_sign, Model.data, Model.extra, Model.worker).where(
            #     Model.vendor == user, Model.stage == -1, Model.proj == proj, Model.app == app, Model.task == task,
            #     Model.handle == handle, Model.job_id == job_id).order_by(Model.created_at).limit(limit).dicts()
            access_log.info(f"debug_order:{order_id}")
            order_by_result = Model.select(Model.id, Model.map_sign, Model.data, Model.extra, Model.worker).where(Model.order_id == order_id).dicts()
            # access_log.info(f"查询结果：{order_by_result}")
            order_by_result = list(order_by_result)
            if order_by_result:
                result = order_id
                insert_data = body_json
                insert_data['id'] = order_id
                insert_data['data'] = order_by_result
                insert_data['worker'] = order_by_result[0]['worker']
                insert_data['handle'] = handle
                insert_data['vendor'] = user
                with database.manual_commit():
                    database.begin()
                    try:
                        insert_order = Order.insert(insert_data)
                        access_log.info(f'order_inser_test:{insert_order}')
                        insert_order.execute()

                        task_update_ = Model.update({Model.stage: 2}).where(Model.order_id == order_id, Model.stage == -1)
                        access_log.info(f'task_update_test:{task_update_}')
                        task_update_.execute()

                        database.commit()
                        print(f'订单生成成功:{order_id}')
                        access_log.info(f'订单生成成功:{order_id}')
                        return result
                    except Exception as e:
                        # print(e)
                        # txn.rollback()
                        database.rollback()
                        result = False
                        trace_text = traceback.format_exc()

                        access_log.error(f"数据库插入问题：{e};{order_id}进行rollback;trace_text:{trace_text}")
                        print('rollback')
                        with database.manual_commit():
                            database.begin()
                            try:
                                Model.update({Model.vendor: None,Model.stage:1, Model.order_id :None,}).where(Model.order_id == order_id).execute()
                                access_log.error(f"手动回滚task成功：{order_id}")

                            except Exception as e:
                                # print(e)
                                # txn.rollback()
                                database.rollback()
                                result = False
                                access_log.error("手动回滚task失败：%s;order_id：%s" % (e, order_id,))
                                print('rollback')
                        return result
                # insert =Order.insert(insert_data).execute()
                # Model.update({Model.stage:2}).where(Model.order_id==order_id,Model.stage==-1).execute()

        finally:
            if not database.is_closed(): database.close()
        return order_by_result

        # return result

    def group_query(self,select_set =(),where_list=[],sort=None,order_by=None,page=1,db_=None,redis_obj=None):
        database = db_
        Task.bind(database)
        Job.bind(database)
        start = page *10 -10
        offset = 10
            # if order_by == "task_count":
            #     order_by = fn.COUNT('*').alias('task_count')
            # else:
            #     order_by = getattr(Job,order_by)

        try:

            if database.is_closed(): database.connection()

            # result = Job.select(Job.proj, Job.app,Job.id.alias('job_id'), Job.task, fn.COUNT('*').alias('task_count'), Job.begin_time,
            #                                  Job.end_time).join(Task, on=(Task.job_id == Job.id,)).group_by(Job.id).where(*where_list).order_by(order_by).offset(start).limit(offset)

            result = Task.select(Task.proj, Task.app, Task.job_id, Task.task, fn.COUNT('*').alias('task_count')).group_by(Task.job_id).where(
                *where_list).order_by(None).offset(start).limit(offset)

            # print(result)
            access_log.info(f"test_debug_sql:{result}")

            result = result.dicts()
            if result:
                result = list(result)
            else:
                result = []
            for obj in result:
                access_log.error(f"{obj['job_id']}_cache")
                obj["begin_time"] = redis_obj.hget(obj['job_id'],"begin_time").decode()
                obj["end_time"] = redis_obj.hget(obj['job_id'],"end_time").decode()
            if result:
                reverse_flag = False
                if sort.lower() == 'desc':
                    reverse_flag = True
                access_log.warning(f"{order_by}_{sort}排序开始时间：{datetime.now()}")
                result_sort = sorted(result,key=lambda result:result[order_by],reverse=reverse_flag)
                access_log.warning(f"{order_by}_{sort}排序结束时间：{datetime.now()}")

                # access_log.error(f"test_debug_list:{result_sort}")
                return result_sort
            return result
        except Exception as e:
            access_log.error("task list获取,logicModel错误;错误信息：%s"%e)

            return "group分组失败，请上报"

        finally:
            if not database.is_closed(): database.close()


    def update(self,Model=None,where_list=[],update_dict={},result_list=[],push_fail=False):
        database = Model._meta.database
        if database.is_closed(): database.connection()


        try:
            for i in range(3):

                with database.atomic():
                    try:
                        if result_list:
                            for result in result_list:
                                task_id = result['id']
                                Model.update({'result':result,"stage":3,"status":1}).where(Model.id==task_id).execute()
                        else:
                            update_status = Model.update(update_dict).where(*where_list).execute()
                        print('提交完成')
                        result_ =  (True,1)
                        if not update_status:
                            result_ = (False,1)
                        break
                    except Exception as e:
                        database.rollback()
                        traceback_text = traceback.format_exc()
                        access_log.error(f"上报修改错误:{e},trace_text:{traceback_text}")
                        result_ =  (False,'上报失败')

                        print('rollback')
                time.sleep(10)
        finally:
            if not database.is_closed(): database.close()
        return result_



