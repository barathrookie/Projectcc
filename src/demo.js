import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import "./App.css"
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Student() {
  const paperStyle = { padding: '50px 40px', width: 600, margin: '20px auto'};
  const paperStyle2={color: 'green'}
  const [date, setdate] = useState('');
  const [feed, setfeed] = useState('');
  const [blog, setblog] = useState([]);
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    const Feed = { date,feed  };
    console.log(Feed);
    fetch('http://localhost:8080/feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Feed),
    })
      .then(() => {
        console.log('New Student added');
      });
  };
  const handleUpdate = (id) => {
    const Feed = blog.find((s) => s.id === id);
    const updatedName = prompt('Enter updated date:', Feed.date);
    const updatedAddress = prompt('Enter updated feed:', Feed.feed);
    const updatedStudent = {
      id: Feed.id,
      date: updatedName,
      feed: updatedAddress,
    };
    fetch('http://localhost:8080/feed', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent),
    })

  };
  

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/feed/${id}`, {
      method: 'DELETE',
    })
  };
  

  useEffect(() => {
    fetch('http://localhost:8080/feed')
      .then((res) => res.json())
      .then((result) => {
        setblog(result);
      });
  });

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1><u>Add Your Feed</u></h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Date"
            variant="outlined"
            fullWidth
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Your Feed"
            variant="outlined"
            fullWidth
            value={feed}
            onChange={(e) => setfeed(e.target.value)}
          />
          <Button variant="contained" color="secondory" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Paper>
      <h1>Your Blog</h1>
      {blog.map((blog) => (
        <Paper elevation={3} style={paperStyle} key={blog.id}>
          <div className="output">
            <div style={{ paddingRight: 50 }}>
              Id:
              {blog.id}
              <br />
              Date:
              {blog.date}
              <br />
              {blog.feed}
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: 25, marginLeft: 200 }}
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </Button>
              <br/>
              <Button
  variant="contained"
  color="secondary"
  style={{ marginTop: 25, marginLeft: 200 }}
  onClick={() => handleUpdate(blog.id)}
>
  Update
</Button>

            </div>
          </div>
        </Paper>
      ))}
    </Container>
  )
      }