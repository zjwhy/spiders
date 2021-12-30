from datetime import datetime

from datetime import datetime
from uuid import uuid1

def sql_insert(s_sql=None,i_sql=None,conn=None,cur=None,item=None,spider=None,*args,**kwargs):

    # url = kwargs['url']
    sql = s_sql.format(item['tableName'])+" "+"where PrimaryClueAddress='{}'".format(item['url'])
    cur.execute(sql)
    all_x_f = cur.fetchall()
    time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    if not all_x_f:
        # item['PlantFormID'] = uuid1()

        cur.execute(i_sql.format(item['tableName'],item['url'],item['PlantFormID'], time,spider.app_name,item['TitleContent'],
                             item['AuthorContent'],item['NovelCategories'],item['Lntroduction'],2))

        conn.commit()
    # cur.execute(s_sql + item['abandoned']+' '+ "where Url='{}'".format(url))
    # all_f_f = cur.fetchall()
    # if not  all_f_f:
    #     cur.execute(s_sql + item['relevant']+' '+ "where Url='{}'".format(url))
    #     all_xi_f = cur.fetchall()
    #     if not all_xi_f:
    #         cur.execute('select ThreadUrl from ' + item['results']+ ' '+"where ThreadUrl='{}'".format(url))
    #         all_q_f = cur.fetchall()
    #         if not all_q_f:
    #             cur.execute(s_sql + item['dealwith']+ ' '+"where Url='{}'".format(url))
    #             all_z_f = cur.fetchall()
    #             if not all_z_f:
    #                 cur.execute(i_sql.format(item['dealwith'], url, item['PlantFormID'], time))
    #                 conn.commit()