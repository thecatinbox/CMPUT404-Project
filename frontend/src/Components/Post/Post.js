import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Post.css"; 

function Post({post}) { 
  return (
    <div className='post'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {post.author}
          </Typography>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {post.date}
          </Typography>
          <Typography variant="body2">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Comment</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;