import {USERS} from './users'

export const POSTS = [
    {
        imageUrl:'https://wx3.sinaimg.cn/mw2000/b10c1bc2ly1h0pve85jx8j208c08b74d.jpg',
        user:USERS[0].user,
        likes:7870,
        caption:'Train Ride to Hogwarts.',
        profile_picture:USERS[0].image,
        comments:[
            {
                user:'Peter',
                comments:'Wow,a nice photo'
            },
            {
                user:'Lily',
                comments:'Hello.'
            },
        ]
    },
    {
        imageUrl:'https://wx4.sinaimg.cn/mw2000/007exBySly1gzrf1e07pcj30u0140tap.jpg',
        user:USERS[1].user,
        likes:7870,
        caption:'A beautiful picture taken',
        profile_picture:USERS[1].image,
        comments:[
            {
                user:'David',
                comments:'Pretty Good!'
            },
            {
                user:'Ben',
                comments:'Brilliant!'
            },
        ]
    },
    {
        imageUrl:'https://wx4.sinaimg.cn/mw2000/007exBySly1gzm2gtm6smj30c00aw3zm.jpg',
        user:USERS[2].user,
        likes:7870,
        caption:'Have a very bad day.',
        profile_picture:USERS[2].image,
        comments:[
            {
                user:'Lily',
                comments:'What a pity!'
            },
            {
                user:'Jon',
                comments:'Come on,bro!'
            },
        ]
    },
    {
        imageUrl:'https://wx4.sinaimg.cn/mw2000/007exBySly1gz63f7aclfj30u013zju7.jpg',
        user:USERS[2].user,
        likes:7870,
        caption:'Snow!',
        profile_picture:USERS[2].image,
        comments:[
            {
                user:'Peter',
                comments:'Wow,a nice photo'
            },
            {
                user:'Olivia',
                comments:'I like it.'
            },
        ]
    },
]
