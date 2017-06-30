import psycopg2


def request_data(query):
    try:
        connect_str = "dbname='markorkenyi' user='markorkenyi' host='localhost' password='shadow123'"
        conn = psycopg2.connect(connect_str)
        conn.autocommit = True
    except:
        print("I am unable to connect to the database")
    cursor = conn.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results


def send_data(query):
    try:
        connect_str = "dbname='markorkenyi' user='markorkenyi' host='localhost' password='shadow123'"
        conn = psycopg2.connect(connect_str)
        conn.autocommit = True
    except:
        print("I am unable to connect to the database")
    cursor = conn.cursor()
    cursor.execute(query)
    conn.close()
    return None


def login(username, password):
    login_query = '''SELECT
                    "user".username,
                    "user".password
                    FROM
                    public."user" WHERE "user".username = '{}';'''.format(username)
    user_data = request_data(login_query)
    return user_data[0][1]


def register(username, password):
    registration_query = '''INSERT INTO public."user"
                    (username, password)
                    VALUES ('{}','{}');'''.format(username, password)
    send_data(registration_query)
    return None
