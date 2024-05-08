import path from 'path'
import axios from 'axios'

import posts from './posts.json'

export default {
  getRoutes: async () => {
    // use data destructuring to get data from the promise object
    // this is where the "posts" variable comes from
    // const { data: posts } = await axios.get(
    //   'https://jsonplaceholder.typicode.com/posts'
    // )

    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          template: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
