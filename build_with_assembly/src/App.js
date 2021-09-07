import React, { useState, useEffect } from "react";
import "./App.css";
import { Form, Card, Image, Icon, Grid, Segment } from "semantic-ui-react";

function App() {
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [userInput, setUserInput] = useState("");
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [repos, setRepos] = useState();
  const [avatar, setAvatar] = useState();
  const [error, setError] = useState();
  const [repoName, setRepoName] = useState();

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });

    fetch(`https://api.github.com/users/${userInput}/repos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setRepoName(data);
          setError(null);
        }
      });
  };

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  return (
    <div>
      <div className="navbar">Github Search</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Github user"
              name="Github user"
              onChange={handleSearch}
            />
            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {repos} Repos
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {following} Following
              </a>
            </Card.Content>
          </Card>
          <Grid>
            <table className="grid-display">
              {repoName ? (
                <thead>
                  <tr>
                    <th className="head-wrap">Repo name</th>
                    <th className="head-wrap">Primary langauge</th>
                    <th className="head-wrap">Number of stars</th>
                    <th className="head-wrap">Number of watchers</th>
                  </tr>
                </thead>
              ) : (
                <p className="msg-text">No repos found</p>
              )}

              {repoName ? (
                repoName.map((repo) => (
                  <tbody>
                    <tr>
                      <td className="row">{repo.name}</td>
                      <td className="row">
                        {repo.language ? repo.language : "-"}
                      </td>
                      <td className="row">{repo.stargazers_count}</td>
                      <td className="row">{repo.watchers_count}</td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <p className="msg-text">Please enter your repo username</p>
              )}
            </table>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default App;
