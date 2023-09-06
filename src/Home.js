import React from 'react'
import Feed from './Feed'

const Home = ({ posts }) => {
  return (
    <main className='Home'>
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>No posts yet!</p>
      )}
    </main>
  )
}

export default Home