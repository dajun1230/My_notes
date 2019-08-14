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
        text: '其他',
        link: '/other/'
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
                'install',  // vue2.0 3.0环境搭建
                'basic', // vue基本写法
                'important', // vue
                'mpvue' // mpvue 微信小程序
              ]
            }
          ],
        '/react/': [{
            title: 'React',
            collapsable: false,
            children: [
              'install', // 安装
              'base', // 基础
              'demo', // 案例
              'rnative'
            ]
          }
        ],
        '/ps/': [{
            title: 'PS',
            collapsable: false,
            children: [
              'shortcut', // 快捷键
              'basic', // 基础键介绍
              'stageone' // 知识点
            ]
          }
        ],
        '/other/': [{
          title: '其他',
          collapsable: false,
          children: [
            'environment', // 前端环境配置
            'git', // git
            'es6', // ES6
            'dva', // dva开发
            'wepy' // wepy 小程序开发
          ]
        }]
      }
    }
  }