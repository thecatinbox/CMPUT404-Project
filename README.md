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


# Example inbox POST formate(post)
'''
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
'''
# Example inbox POST formate(follow request)
'''
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
'''

# Example inbox POST formate(like)
'''
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
'''
# Example inbox POST formate(comment)
'''
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
'''
