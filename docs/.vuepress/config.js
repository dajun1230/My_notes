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
      nav : [
        {
          text: '首页',
          link: '/'
        }, {
        text: 'Vue',
        link: '/vue/'
        }, {
        text: 'React',
        link: '/react/'
        }, {
          text: 'Flutter',
          link: '/flutter/'
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
                'vue2x-1', // vue基础1
                'vue2x-2',  // vue基础2
                'install',  // vue2.0 3.0环境搭建
                'vuerouter', // vue router
                'vuex', // vuex
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
              'react',
              'install', // 安装
              'base', // 基础
              'learn', // 学习
              'demo', // 案例
              'rnative'
            ]
          }
        ],
        '/flutter/': [{
          title: 'Flutter',
          collapsable: false,
          children: [
            'basic1', // 基础1
            'basic2', // 基础2
            'basic3', // 基础3
            'basic4', // 基础4
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
        }],
        '/typescript/': [{
          title: 'TypeScript',
          collapsable: false,
          children: [
            'install', // typescript 安装
            'basic' // 基础
          ]
        }]
      }
    }
  }