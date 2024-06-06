from tests import *

if __name__ == "__main__":
    print("%" * 20 + " Testing MongoDB API " + "%" * 20)
    test_mongodb()
    
    print("%" * 20 + " Testing RiakKV API " + "%" * 20)
    test_riakkv()

    print("%" * 20 + " Testing PostgreSQL API " + "%" * 20)
    test_postgresql()
    
    print("%" * 20 + " Testing Neo4J API " + "%" * 20)
    test_neo4j()