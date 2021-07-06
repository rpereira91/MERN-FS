import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'

import {FETCH_POSTS_QUERY} from '../utils/GQL/queries'
const Home = () => {
    const [posts, setPosts] = useState(null)
    const { loading, data} = useQuery(FETCH_POSTS_QUERY);
    useEffect(() => {
        if (data) {
            setPosts(data.getPosts)
        }
    }, [data, posts])
    return (
        <Grid columns={3}>
            <h1>Home Page</h1>
            {
                (loading || posts === null) ? <h1>Posts are loading...</h1> : (
                    posts && (
                        <Grid.Row>
                            {
                            posts.map((post) => (
                                <Grid.Column>
                                    <Card key={post.id}>
                                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                                        <Card.Header> {post.body}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>User: {post.username}</span>
                                        </Card.Meta>
                                        <Card.Content extra>
                                            <span>
                                                <Icon name='thumbs up' />
                                                {post.likeCount}
                                            </span>
                                            <span>
                                                <Icon name="comment" />
                                                {post.likeCount}
                                            </span>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    )
                )
            }
        </Grid>
    )
}

export default Home
