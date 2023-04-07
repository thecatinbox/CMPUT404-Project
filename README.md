# CMPUT404-Project

# Installation 
pip install virtualenv

virtualenv venv

venv\Scripts\activate

python -m pip install Django

# Run frontend
cd frontend

npm start

# Run backend (in new terminal)
cd backend

pip install -r requirements.txt

python manage.py runserver 

(might need to makemigrations and migrate first)


## Example inbox POST formate(post) ##
**POST**
```
{
"type": "post",
"sender":{
        "type": "author",
        "id": "https://fortest.com/88eg2289-eab3-4d65-9d64-361d4fa2we98",
        "url":"https://fortest.com/88eg2289-eab3-4d65-9d64-361d4fa2we98",
        "host": "https://fortest.com",
        "displayName":"test inbox post",
        "github": "",
        "profileImage": ""
},
"post":{
        "title": "test inbox post",
        "description": "test inbox post",
        "contentImage": "",
        "visibility": "PUBLIC",
        "contentType": "text/plain",
        "id": "https://fortest.com/88eg2289-eab3-4d65-9d64-361d4fa2we98/posts/af694gb3-6b36-45b3-a39c-e5fca3g2805b",
        "origin": "https://fortest.com/88eg2289-eab3-4d65-9d64-361d4fa2we98/posts/af694gb3-6b36-45b3-a39c-e5fca3g2805b",
        "author":{
                "type": "author",
                "id": "https://fortest.com/88eg2289-eab3-4d65-ae9c-e5fc4e82805b",
                "url":"https://fortest.com/88eg2289-eab3-4d65-ae9c-e5fc4e82805b",
                "host": "https://fortest.com",
                "displayName":"test inbox post2",
                "github": "",
                "profileImage": ""
        },
        "categories": "",
        "count": "2"
}
}
```
# Example inbox POST formate(follow request)
**POST**
```
{
"type": "follow",
"summary": "Sunny wants to follow Nevil Kandathil",
"actor": {
  "type": "author",
          "id": "https://p2psd.herokuapp.com/authors/b5d706ea-a7b3-414a-86b4-5e94d76f760a",
          "url": "https://p2psd.herokuapp.com/authors/b5d706ea-a7b3-414a-86b4-5e94d76f760a",
          "host": "https://p2psd.herokuapp.com/",
          "displayName": "Nevil KS",
          "github": "",
          "profileImage": ""
}
}
```

# Example inbox POST formate(like)
**POST**
```
{
"type":"like",
"p_or_c":"post",
"postId":"7057c24c-656e-4877-a35c-a750097b1a6e",
"author":{
            "type": "author",
            "id": "https://p2psd.herokuapp.com/authors/f949afac-6b2c-45bf-8a0e-325ed41d21d0",
            "url": "https://p2psd.herokuapp.com/authors/f949afac-6b2c-45bf-8a0e-325ed41d21d0",
            "host": "https://p2psd.herokuapp.com",
            "displayName": "Nevil test",
            "github": "",
            "profileImage": ""
        }
}
```
# Example inbox POST formate(comment)
**POST**
```
{
"type":"comment",
"comment":"test inbox comment",
"postId":"7057c24c-656e-4877-a35c-a750097b1a6e",
"contentType":"text/plain",
"author":{
            "type": "author",
            "id": "https://p2psd.herokuapp.com/authors/f949afac-6b2c-45bf-8a0e-325ed41d21d0",
            "url": "https://p2psd.herokuapp.com/authors/f949afac-6b2c-45bf-8a0e-325ed41d21d0",
            "host": "https://p2psd.herokuapp.com",
            "displayName": "Nevil test",
            "github": "",
            "profileImage": ""
        }
}
```

# Tool Usage 
- Miro design borad: https://miro.com/app/board/uXjVPoMnR4U=/#tpicker-content
- Github Project board: https://github.com/users/thecatinbox/projects/5 
- Github Issues / Pull Requests / Commmits 
- AJAX: consistent usage of async / await functions and React useStates hooks for update posts, likes, comments, inbox, and follow requests 

# Feedbacks 
1. No follower following functionality. Only posts. (Now follower following functionality is implemented) 
2. API documentation but no explanations of endpoints. (API documentation is now updated with explainations; All requests can be directly sent from the interface)
3. Test cases: available but non-comprehensive. (Updated test cases with Postman) 
4. Couldn't demonstrate any of the comment/like functionality working even with the API. (Comment/like now both functional with both the webpage and the API) 
5. The speed of the webpage loading is too slow. (Set time intervals for fetching new data, which significantly improved the preformance; Some fetch methods are updated with axios for better performance) 
