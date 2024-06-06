import requests
import json

api_url = {
    "mongo" : "http://localhost:3001",
    "postgres" : "http://localhost:3002",
    "riak" : "http://localhost:3003",
    "neo4j" : "http://localhost:3004"
}

api_request = {
    "POST" : requests.post,
    "GET" : requests.get,
    "PUT" : requests.put,
    "DELETE" : requests.delete
}

def print_pretty_json(response):
    try:
        print(json.dumps(response.json(), indent=4))
    except json.JSONDecodeError:
        print(response.text)

def print_section(message):
    print(("#" * 10) + " " + message + " " + ("#" * 10))

def test_api(api, method, url, data=None):
    print_section("Request: " + method + " " + api_url[api] + url)

    response = api_request[method](api_url[api] + url, json=data)
    print_pretty_json(response)