module.exports = {
    title: '小杨--个人笔记',  // 设置网站标题
    description : '详情描述',
    dest: './dist',
    base : '/',
    repo: '', // 添加github链接
    head: [
      ['link', {
        rel: 'icon',
        href: '/iamges/favicons.ico'
      }]
    ],
    themeConfig : {
      nav : [{
        text: 'Vue',
        link: '/vue/'
        }, {
        text: 'React',
        link: '/react/'
        },{
        text: 'Dva',
        link: '/dva/'
        }, {
          text: 'Ps教程',
          link: '/ps/'
        }, {
          text: 'GitHub',
          link: 'https://github.com/dajun1230/My_notes'
        }
      ],
      sidebar: {
          '/vue/' : [{
              title: 'Vue',
              collapsable: false,
              children: [
                'one',
                'two'
              ]
            }
          ],
        '/react/': [{
            title: 'React',
            collapsable: false,
            children: [
              'one',
              'two'
            ]
          }
        ],
        '/ps/': [{
            title: 'PS',
            collapsable: false,
            children: [
              'one',
              'two'
            ]
          }
        ],
        '/dva/': [{
          title: 'DVA',
          collapsable: false,
          children: [
            'one'
          ]
        }]
      }
    }
  }