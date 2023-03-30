from django import forms
from allModels.models import Posts, Comments
from allModels.models import Followers
from django.db.models import Q


class post_form(forms.ModelForm):
    title = forms.CharField(label='title',
                            required=False,
                            widget=forms.Textarea(attrs={
                                'placeholder': 'Please enter your title',
                            })
                            )

    description = forms.CharField(label='description',
                                  required=False,
                                  widget=forms.Textarea(attrs={
                                      'placeholder': 'Please enter your description',
                                  })
                                  )
    content = forms.CharField(label='content',
                              required=False,
                              widget=forms.Textarea(attrs={
                                  'placeholder': 'If you want to type something',
                              })
                              )

    Categories = forms.CharField(label='categories',
                                 required=False,
                                 widget=forms.Textarea(attrs={
                                     'placeholder': "You can place your categories here.",
                                     'rows': 2,

                                 })
                                 )

    class Meta:
        model = Posts
        fields = ( 'title', 'id', 'source', 'description', 'contentType','contentImage',
                  'content', 'author', 'categories', 'count', 'origin', 'visibility')



class Comment_form(forms.ModelForm):
    comment = forms.CharField(label='comment',
                              widget=forms.Textarea(attrs={
                                  'placeholder': 'Type in your comment here...',

                              })
                              )

    class Meta:
        model = Comments
        fields = ('uuid', 'author','post', 'comment', 'contentType', 'id')
