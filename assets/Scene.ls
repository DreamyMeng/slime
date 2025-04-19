{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$runtime": "res://80533c20-63b5-4f86-8a4b-fbbc3cc7a0f6",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "width": 720,
  "height": 1280,
  "_$child": [
    {
      "_$id": "z4xf602w",
      "_$prefab": "7ccb3cb4-0500-463b-9867-ef45865cfdeb",
      "_$var": true,
      "name": "SkillTip",
      "active": true,
      "x": 360,
      "y": 640,
      "visible": false,
      "centerX": 0,
      "centerY": 0,
      "_$comp": [
        {
          "_$type": "4de063eb-bcca-4f0c-a67e-62e97117ff03",
          "scriptPath": "../src/ui/SkillTip.ts"
        }
      ],
      "_$child": [
        {
          "_$override": "ecyn9419",
          "color": "#78243d",
          "skin": "res://10b83ef7-2d89-4e63-9679-ed75a12c0ca0"
        },
        {
          "_$override": "3ny13ib3",
          "html": true,
          "color": "rgba(233, 234, 196, 1)"
        },
        {
          "_$override": [
            "jvphpq4p",
            "3mo5miu3"
          ],
          "color": "#c228bf"
        },
        {
          "_$override": [
            "jvphpq4p",
            "au8mtcie"
          ],
          "color": "rgba(0, 0, 0, 1)",
          "text": "遗忘"
        },
        {
          "_$override": [
            "y6ek77jm",
            "3mo5miu3"
          ],
          "color": "#28c2c1"
        },
        {
          "_$override": [
            "y6ek77jm",
            "au8mtcie"
          ],
          "color": "rgba(0, 0, 0, 1)",
          "text": "返回"
        }
      ]
    },
    {
      "_$id": "8dbojyiq",
      "_$type": "Image",
      "name": "BG",
      "x": 360,
      "y": 640,
      "width": 720,
      "height": 1280,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "centerX": 0,
      "centerY": 0,
      "skin": "res://8c5e69a3-e03b-4f58-9433-bbe775ba1f95",
      "color": "#bababa"
    },
    {
      "_$id": "isjxyys8",
      "_$type": "Image",
      "name": "Top",
      "x": 360,
      "y": 235,
      "width": 700,
      "height": 450,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "_mouseState": 2,
      "centerX": 0,
      "centerY": -405,
      "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
      "color": "#4b4b4b",
      "_$child": [
        {
          "_$id": "ssgdxgr7",
          "_$var": true,
          "_$type": "Label",
          "name": "label_1",
          "x": 25,
          "y": 30,
          "width": 120,
          "height": 28,
          "left": 25,
          "top": 30,
          "text": "种族:凡·史莱姆\n战力：123456\n等级：2（12%）\n转生：1\n灵气：5\n仙气：4\n神韵：0",
          "fontSize": 30,
          "color": "rgba(194, 182, 167, 1)",
          "html": true,
          "valign": "top",
          "leading": 13,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "rqqyyonl",
          "_$var": true,
          "_$type": "Image",
          "name": "img_shuxing",
          "x": 285,
          "y": 20,
          "width": 400,
          "height": 410,
          "_mouseState": 2,
          "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
          "color": "#503737",
          "_$child": [
            {
              "_$id": "u4tjvs3p",
              "_$type": "Label",
              "name": "Label",
              "x": 20,
              "y": 20,
              "width": 160,
              "height": 40,
              "text": "角色属性",
              "fontSize": 40,
              "color": "rgba(194, 182, 167, 1)",
              "bold": true,
              "valign": "top",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "ncqw0h5c",
              "_$var": true,
              "_$type": "Label",
              "name": "label_2",
              "x": 25,
              "y": 86,
              "width": 350,
              "height": 66,
              "text": "攻击：9999\\t\\t防御：9999\\n血量：9999",
              "fontSize": 28,
              "color": "rgba(247, 197, 141, 1)",
              "html": true,
              "valign": "top",
              "overflow": "shrink",
              "leading": 4,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "j45ttant",
              "_$type": "Image",
              "name": "Image",
              "x": 50,
              "y": 160,
              "width": 300,
              "height": 8,
              "skin": "res://1b854b5e-4eb7-4df5-9449-96e0ba3df2be",
              "color": "#5e4b40"
            },
            {
              "_$id": "qlclxpsi",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_cuilian",
              "active": true,
              "x": 223,
              "y": 310,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "淬炼"
                }
              ]
            },
            {
              "_$id": "ao75ff3y",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_jineng",
              "active": true,
              "x": 234,
              "y": 15,
              "width": 150,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "3mo5miu3",
                  "width": 130,
                  "height": 50
                },
                {
                  "_$override": "au8mtcie",
                  "width": 130,
                  "height": 50,
                  "fontSize": 28,
                  "text": "查看技能"
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            },
            {
              "_$id": "44aexdi4",
              "_$var": true,
              "_$type": "List",
              "name": "list_shuxing",
              "x": 20,
              "y": 180,
              "width": 360,
              "height": 126,
              "_mouseState": 1,
              "itemTemplate": {
                "_$ref": "213iflp9",
                "_$tmpl": "itemRender"
              },
              "repeatX": 3,
              "repeatY": 4,
              "elasticEnabled": true,
              "spaceX": 10,
              "_$child": [
                {
                  "_$id": "213iflp9",
                  "_$type": "Label",
                  "name": "Label",
                  "width": 115,
                  "height": 32,
                  "text": "齿：9999",
                  "fontSize": 20,
                  "color": "rgba(247, 197, 141, 1)",
                  "html": true,
                  "templateVars": true,
                  "valign": "middle",
                  "padding": "0,0,0,0"
                }
              ]
            }
          ]
        },
        {
          "_$id": "roksa9zm",
          "_$var": true,
          "_$type": "Image",
          "name": "img_jineng",
          "x": 285,
          "y": 20,
          "width": 400,
          "height": 410,
          "visible": false,
          "_mouseState": 2,
          "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
          "color": "#503737",
          "_$child": [
            {
              "_$id": "lvglprma",
              "_$type": "Label",
              "name": "Label",
              "x": 20,
              "y": 20,
              "width": 160,
              "height": 40,
              "text": "角色技能",
              "fontSize": 40,
              "color": "rgba(194, 182, 167, 1)",
              "bold": true,
              "valign": "top",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "484z02sw",
              "_$var": true,
              "_$type": "List",
              "name": "list_guyou",
              "x": 30,
              "y": 90,
              "width": 370,
              "height": 60,
              "_mouseState": 2,
              "itemTemplate": {
                "_$ref": "ix3eoj44",
                "_$tmpl": "itemRender"
              },
              "repeatX": 3,
              "repeatY": 1,
              "elasticEnabled": true,
              "spaceX": 3,
              "spaceY": 5,
              "scrollType": 2,
              "vScrollBarSkin": "res://f6e300da-8c8d-4960-90a6-2a654b26fd2c",
              "_$child": [
                {
                  "_$id": "ix3eoj44",
                  "_$prefab": "41d72ad2-e04a-4ec5-b9da-12a4ce8532cb",
                  "name": "Skill",
                  "active": true,
                  "x": 0,
                  "y": 0
                }
              ]
            },
            {
              "_$id": "nkg0u4es",
              "_$type": "Image",
              "name": "Image",
              "x": 50,
              "y": 170,
              "width": 300,
              "height": 8,
              "skin": "res://1b854b5e-4eb7-4df5-9449-96e0ba3df2be",
              "color": "#5e4b40"
            },
            {
              "_$id": "600cma1d",
              "_$var": true,
              "_$type": "List",
              "name": "list_xuexi",
              "x": 30,
              "y": 200,
              "width": 370,
              "height": 185,
              "_mouseState": 2,
              "itemTemplate": {
                "_$ref": "f1j2do2l",
                "_$tmpl": "itemRender"
              },
              "repeatX": 3,
              "repeatY": 10,
              "elasticEnabled": true,
              "spaceX": 3,
              "spaceY": 5,
              "scrollType": 2,
              "vScrollBarSkin": "res://f6e300da-8c8d-4960-90a6-2a654b26fd2c",
              "_$child": [
                {
                  "_$id": "f1j2do2l",
                  "_$prefab": "41d72ad2-e04a-4ec5-b9da-12a4ce8532cb",
                  "name": "Skill",
                  "active": true,
                  "x": 0,
                  "y": 0
                }
              ]
            },
            {
              "_$id": "wnx06y1z",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_shuxing",
              "active": true,
              "x": 234,
              "y": 15,
              "width": 150,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "3mo5miu3",
                  "width": 130,
                  "height": 50
                },
                {
                  "_$override": "au8mtcie",
                  "width": 130,
                  "height": 50,
                  "fontSize": 28,
                  "text": "查看属性"
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            }
          ]
        },
        {
          "_$id": "nd4uo85z",
          "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
          "_$var": true,
          "name": "btn_zhuansheng",
          "active": true,
          "x": 75,
          "y": 340,
          "height": 60,
          "visible": true,
          "_$child": [
            {
              "_$override": "au8mtcie",
              "text": "转生"
            }
          ]
        }
      ]
    },
    {
      "_$id": "e35xu1jk",
      "_$type": "Image",
      "name": "Middle",
      "x": 360,
      "y": 720,
      "width": 700,
      "height": 500,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "centerX": 0,
      "centerY": 80,
      "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
      "color": "#4b4b4b",
      "_$child": [
        {
          "_$id": "quefq60r",
          "_$var": true,
          "_$type": "Label",
          "name": "label_titile",
          "x": 250,
          "y": 20,
          "width": 200,
          "height": 30,
          "text": "第一零一层",
          "fontSize": 36,
          "color": "rgba(247, 197, 141, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        },
        {
          "_$id": "6b84s5ix",
          "_$var": true,
          "_$type": "Sprite",
          "name": "Map",
          "width": 700,
          "height": 500,
          "visible": false,
          "_$child": [
            {
              "_$id": "5ahs3y7w",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_tujian",
              "active": true,
              "x": 30,
              "y": 30,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "图鉴"
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            },
            {
              "_$id": "v2h6tsc3",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_jinhua",
              "active": true,
              "x": 30,
              "y": 100,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "拟态"
                }
              ]
            },
            {
              "_$id": "tzh16y16",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_fanhui",
              "active": true,
              "x": 75,
              "y": 425,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "返回"
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            },
            {
              "_$id": "0p122k2j",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_sousuo",
              "active": true,
              "x": 275,
              "y": 425,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "搜索"
                },
                {
                  "_$override": "qnb9iybi",
                  "text": "击败怪物0/3",
                  "y": -30
                }
              ]
            },
            {
              "_$id": "605g5ub4",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_shenru",
              "active": true,
              "x": 475,
              "y": 425,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "深入"
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            },
            {
              "_$id": "2pu4radu",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_boss",
              "active": true,
              "x": 475,
              "y": 425,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "挑战首领"
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            },
            {
              "_$id": "2m6t5xfo",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_zidong",
              "active": true,
              "x": 75,
              "y": 335,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "自动战斗"
                },
                {
                  "_$override": "qnb9iybi",
                  "text": "一转解锁"
                }
              ]
            },
            {
              "_$id": "7xhj00p3",
              "_$prefab": "819108f6-545f-4a86-a92f-245f6129bbb9",
              "_$var": true,
              "name": "monster0",
              "active": true,
              "x": 450,
              "y": 20,
              "visible": true
            },
            {
              "_$id": "kay9fiud",
              "_$prefab": "819108f6-545f-4a86-a92f-245f6129bbb9",
              "_$var": true,
              "name": "monster1",
              "active": true,
              "x": 450,
              "y": 150,
              "visible": true
            },
            {
              "_$id": "uc5c8do6",
              "_$prefab": "819108f6-545f-4a86-a92f-245f6129bbb9",
              "_$var": true,
              "name": "monster2",
              "active": true,
              "x": 450,
              "y": 280,
              "visible": true
            },
            {
              "_$id": "fedyq4yy",
              "_$prefab": "819108f6-545f-4a86-a92f-245f6129bbb9",
              "_$var": true,
              "name": "player0",
              "active": true,
              "x": 100,
              "y": 200,
              "visible": true,
              "_mouseState": 1
            }
          ]
        },
        {
          "_$id": "yq82u0k1",
          "_$var": true,
          "_$type": "Sprite",
          "name": "Battle",
          "width": 700,
          "height": 500,
          "visible": false,
          "_$comp": [
            {
              "_$type": "b8edf63e-ed13-4a15-b25c-843107d5cccb",
              "scriptPath": "../src/ui/HPBar.ts",
              "bg": {
                "_$ref": "0yg45i49"
              },
              "bar": {
                "_$ref": "d3t83vaf"
              }
            }
          ],
          "_$child": [
            {
              "_$id": "0yg45i49",
              "_$type": "Sprite",
              "name": "Hp",
              "x": 60,
              "y": 100,
              "width": 600,
              "height": 20,
              "visible": false,
              "_gcmds": [
                {
                  "_$type": "DrawRectCmd",
                  "x": 0,
                  "y": 0,
                  "width": 1,
                  "height": 1,
                  "percent": true,
                  "lineWidth": 1,
                  "lineColor": "rgba(255, 255, 255, 1)"
                }
              ],
              "_$child": [
                {
                  "_$id": "d3t83vaf",
                  "_$type": "Sprite",
                  "name": "Bar",
                  "x": 1,
                  "y": 1,
                  "width": 598,
                  "height": 18,
                  "_gcmds": [
                    {
                      "_$type": "DrawRectCmd",
                      "x": 0,
                      "y": 0,
                      "width": 1,
                      "height": 1,
                      "percent": true,
                      "lineWidth": 1,
                      "fillColor": "rgba(255, 0, 0, 1)"
                    }
                  ]
                }
              ]
            },
            {
              "_$id": "myide590",
              "_$prefab": "819108f6-545f-4a86-a92f-245f6129bbb9",
              "_$var": true,
              "name": "Player",
              "active": true,
              "x": 195,
              "y": 200,
              "anchorX": 0.5,
              "anchorY": 0,
              "visible": true,
              "_mouseState": 1,
              "_$comp": [
                {
                  "_$type": "b8edf63e-ed13-4a15-b25c-843107d5cccb",
                  "scriptPath": "../src/ui/HPBar.ts",
                  "bg": null,
                  "bar": null
                },
                {
                  "_$type": "Animator2D",
                  "controller": {
                    "_$uuid": "77cd7607-1fb0-4e17-9b75-4ef528e0288e",
                    "_$type": "AnimationController2D"
                  },
                  "controllerLayers": [
                    {
                      "_$type": "AnimatorControllerLayer2D",
                      "name": "Base Layer",
                      "states": [
                        {
                          "_$type": "AnimatorState2D",
                          "name": "player",
                          "clipStart": 0,
                          "clip": {
                            "_$uuid": "607760e0-83fc-4ed6-805d-028aaf9fb252",
                            "_$type": "AnimationClip2D"
                          },
                          "soloTransitions": []
                        }
                      ],
                      "defaultStateName": "player"
                    }
                  ]
                }
              ],
              "_$child": [
                {
                  "_$override": "4p57p0ot",
                  "visible": false
                }
              ]
            },
            {
              "_$id": "b3whlr2h",
              "_$prefab": "819108f6-545f-4a86-a92f-245f6129bbb9",
              "_$var": true,
              "name": "Enemy",
              "active": true,
              "x": 505,
              "y": 200,
              "anchorX": 0.5,
              "anchorY": 0,
              "visible": true,
              "_mouseState": 1,
              "_$comp": [
                {
                  "_$type": "b8edf63e-ed13-4a15-b25c-843107d5cccb",
                  "scriptPath": "../src/ui/HPBar.ts",
                  "bg": null,
                  "bar": null
                },
                {
                  "_$type": "Animator2D",
                  "controller": {
                    "_$uuid": "977ecfdc-17d6-4b34-8992-27d43bed54a8",
                    "_$type": "AnimationController2D"
                  },
                  "controllerLayers": [
                    {
                      "_$type": "AnimatorControllerLayer2D",
                      "name": "Base Layer",
                      "states": [
                        {
                          "_$type": "AnimatorState2D",
                          "name": "enemy",
                          "clipStart": 0,
                          "clip": {
                            "_$uuid": "06f94d89-b542-4e5b-bd30-31749c4cabb0",
                            "_$type": "AnimationClip2D"
                          },
                          "soloTransitions": []
                        }
                      ],
                      "defaultStateName": "enemy"
                    }
                  ]
                }
              ],
              "_$child": [
                {
                  "_$override": "4p57p0ot",
                  "visible": false
                }
              ]
            },
            {
              "_$id": "8h2lyixq",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "btn_taopao",
              "active": true,
              "x": 275,
              "y": 390,
              "height": 60,
              "visible": true,
              "_$child": [
                {
                  "_$override": "au8mtcie",
                  "text": "逃跑"
                },
                {
                  "_$override": "qnb9iybi",
                  "text": "击败怪物0/3",
                  "y": -30,
                  "visible": false
                }
              ]
            }
          ]
        },
        {
          "_$id": "w2ck8n6e",
          "_$var": true,
          "_$type": "Sprite",
          "name": "Damages",
          "width": 700,
          "height": 500
        }
      ]
    },
    {
      "_$id": "53220lgo",
      "_$type": "Image",
      "name": "Bottom",
      "x": 360,
      "y": 1120,
      "width": 700,
      "height": 280,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "_mouseState": 2,
      "centerX": 0,
      "centerY": 480,
      "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
      "color": "#4b4b4b",
      "_$child": [
        {
          "_$id": "483a2ava",
          "_$var": true,
          "_$type": "List",
          "name": "List",
          "x": 25,
          "y": 20,
          "width": 660,
          "height": 240,
          "_mouseState": 2,
          "itemTemplate": {
            "_$ref": "5253s4u5",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
          "repeatY": 10,
          "elasticEnabled": true,
          "spaceY": 5,
          "scrollType": 2,
          "vScrollBarSkin": "res://f6e300da-8c8d-4960-90a6-2a654b26fd2c",
          "_$child": [
            {
              "_$id": "5253s4u5",
              "_$type": "Label",
              "name": "Label",
              "width": 120,
              "height": 30,
              "text": "Label",
              "fontSize": 26,
              "color": "#FFFFFF",
              "html": true,
              "valign": "top",
              "padding": "0,0,0,0"
            }
          ]
        }
      ]
    },
    {
      "_$id": "v5cx4at6",
      "_$prefab": "7ccb3cb4-0500-463b-9867-ef45865cfdeb",
      "_$var": true,
      "name": "Cuilian",
      "active": true,
      "x": 360,
      "y": 640,
      "visible": false,
      "centerX": 0,
      "centerY": 0,
      "_$comp": [
        {
          "_$type": "2ce74eea-7c55-49a5-bd2c-a3ebe4a89b01",
          "scriptPath": "../src/ui/Cuilian.ts"
        }
      ],
      "_$child": [
        {
          "_$override": "ecyn9419",
          "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b"
        },
        {
          "_$override": [
            "jvphpq4p",
            "au8mtcie"
          ],
          "text": "确定"
        },
        {
          "_$id": "a2aojspn",
          "_$index": 4,
          "_$type": "Image",
          "name": "Image(1)",
          "x": 363,
          "y": 300,
          "width": 600,
          "height": 250,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "centerX": 3,
          "centerY": -340,
          "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
          "sizeGrid": "25,20,20,23,0",
          "color": "#4b4b4b"
        },
        {
          "_$id": "pea5y55t",
          "_$index": 5,
          "_$type": "Label",
          "name": "Label(1)",
          "x": 80,
          "y": 191,
          "width": 560,
          "height": 43,
          "centerX": 0,
          "centerY": -428,
          "text": "淬炼后属性",
          "fontSize": 40,
          "color": "rgba(194, 182, 167, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "wordWrap": true,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "2fg3tlzx",
          "_$index": 6,
          "_$type": "Image",
          "name": "Image(2)",
          "x": 200,
          "y": 245,
          "width": 300,
          "height": 8,
          "skin": "res://1b854b5e-4eb7-4df5-9449-96e0ba3df2be",
          "color": "#5e4b40"
        },
        {
          "_$override": [
            "y6ek77jm",
            "au8mtcie"
          ],
          "text": "取消"
        },
        {
          "_$id": "gn2p0i22",
          "_$type": "List",
          "name": "list_shuxing",
          "x": 84,
          "y": 268,
          "width": 560,
          "height": 135,
          "_mouseState": 2,
          "itemTemplate": {
            "_$ref": "zz9s8gq2",
            "_$tmpl": "itemRender"
          },
          "repeatX": 3,
          "repeatY": 4,
          "elasticEnabled": true,
          "spaceX": 10,
          "_$child": [
            {
              "_$id": "zz9s8gq2",
              "_$type": "Label",
              "name": "Label",
              "width": 180,
              "height": 32,
              "text": "齿：9999",
              "fontSize": 24,
              "color": "rgba(247, 197, 141, 1)",
              "html": true,
              "templateVars": true,
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        }
      ]
    },
    {
      "_$id": "elw7npk3",
      "_$prefab": "7ccb3cb4-0500-463b-9867-ef45865cfdeb",
      "_$var": true,
      "name": "Tujian",
      "active": true,
      "x": 360,
      "y": 640,
      "visible": false,
      "centerX": 0,
      "centerY": 0,
      "_$comp": [
        {
          "_$type": "aa204a0c-2d49-4fbb-8214-c640bbe0124e",
          "scriptPath": "../src/ui/Tujian.ts"
        }
      ],
      "_$child": [
        {
          "_$override": "ecyn9419",
          "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
          "width": 400,
          "height": 500,
          "x": 490,
          "y": 860,
          "centerX": null,
          "centerY": null
        },
        {
          "_$override": "3ny13ib3",
          "x": 60,
          "y": 110,
          "text": "成就完成率：100%\n图鉴完成率：100%",
          "align": "left",
          "valign": "middle",
          "height": 80,
          "width": 295,
          "color": "rgba(145, 145, 145, 1)",
          "centerX": null,
          "centerY": null
        },
        {
          "_$override": "jvphpq4p",
          "visible": true,
          "x": 350,
          "y": 120
        },
        {
          "_$override": [
            "jvphpq4p",
            "au8mtcie"
          ],
          "text": "全部领取",
          "fontSize": 28
        },
        {
          "_$id": "17w360fy",
          "_$index": 4,
          "_$type": "Image",
          "name": "Image(1)",
          "x": 160,
          "y": 860,
          "width": 240,
          "height": 500,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "_mouseState": 2,
          "centerX": -200,
          "centerY": 220,
          "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
          "sizeGrid": "25,20,20,23,0",
          "color": "#4b4b4b"
        },
        {
          "_$id": "qbrd9si7",
          "_$index": 5,
          "_$type": "Image",
          "name": "Image(2)",
          "x": 340,
          "y": 690,
          "width": 300,
          "height": 8,
          "skin": "res://1b854b5e-4eb7-4df5-9449-96e0ba3df2be",
          "color": "#5e4b40"
        },
        {
          "_$id": "uprolvw2",
          "_$index": 6,
          "_$type": "Image",
          "name": "Image(4)",
          "x": 340,
          "y": 890,
          "width": 300,
          "height": 8,
          "skin": "res://1b854b5e-4eb7-4df5-9449-96e0ba3df2be",
          "color": "#5e4b40"
        },
        {
          "_$id": "hgxm2etq",
          "_$index": 7,
          "_$type": "Image",
          "name": "Image(3)",
          "x": 365,
          "y": 400,
          "width": 650,
          "height": 400,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "centerX": 5,
          "centerY": -240,
          "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
          "sizeGrid": "25,20,20,23,0",
          "color": "#4b4b4b"
        },
        {
          "_$id": "08je250i",
          "_$index": 8,
          "_$type": "List",
          "name": "list_chengjiu",
          "x": 55,
          "y": 220,
          "width": 624,
          "height": 360,
          "_mouseState": 2,
          "itemTemplate": {
            "_$ref": "ord2d7e6",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
          "repeatY": 8,
          "elasticEnabled": true,
          "spaceY": 10,
          "scrollType": 2,
          "vScrollBarSkin": "res://f6e300da-8c8d-4960-90a6-2a654b26fd2c",
          "_$child": [
            {
              "_$id": "ord2d7e6",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "name": "Chengjiu",
              "active": true,
              "x": 0,
              "y": 0,
              "width": 600,
              "height": 60,
              "anchorX": 0,
              "anchorY": 0,
              "_$comp": [
                {
                  "_$type": "dd35f528-f21c-46dd-9424-0b7f1261793e",
                  "scriptPath": "../src/ui/Chengjiu.ts"
                }
              ],
              "_$child": [
                {
                  "_$id": "sxsy7tz2",
                  "_$index": 0,
                  "_$type": "Image",
                  "name": "Frame",
                  "x": 310,
                  "y": 30,
                  "width": 600,
                  "height": 60,
                  "anchorX": 0.5,
                  "anchorY": 0.5,
                  "_mouseState": 2,
                  "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
                  "color": "#545454",
                  "_$child": [
                    {
                      "_$id": "eko7am6h",
                      "_$type": "Label",
                      "name": "Title",
                      "x": 20,
                      "y": 10,
                      "width": 150,
                      "height": 40,
                      "text": "击杀灵兽九尾妖狐一次",
                      "fontSize": 32,
                      "color": "rgba(255, 255, 255, 1)",
                      "bold": true,
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "ib583gok",
                      "_$type": "Label",
                      "name": "Tip",
                      "x": 365,
                      "y": 24,
                      "width": 80,
                      "height": 24,
                      "text": "(99/100)",
                      "fontSize": 20,
                      "color": "rgba(106, 181, 72, 1)",
                      "align": "right",
                      "valign": "bottom",
                      "padding": "0,0,0,0"
                    }
                  ]
                },
                {
                  "_$override": "3mo5miu3",
                  "skin": "res://00af61db-93a9-4358-8d53-03f4729801c2",
                  "width": 120,
                  "x": 520,
                  "y": 30,
                  "height": 40,
                  "sizeGrid": null,
                  "scaleX": 1,
                  "scaleY": 1
                },
                {
                  "_$override": "au8mtcie",
                  "color": "rgba(252, 220, 170, 1)",
                  "text": "领取奖励",
                  "bold": true,
                  "html": false,
                  "valign": "middle",
                  "width": 120,
                  "height": 40,
                  "overflow": "shrink",
                  "x": 0,
                  "y": 3,
                  "fontSize": 24
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": true,
                  "x": 180,
                  "y": 50,
                  "text": "奖励：可获得技能数+1",
                  "color": "rgba(151, 181, 72, 1)",
                  "fontSize": 18,
                  "width": 250,
                  "height": 30,
                  "valign": "top"
                }
              ]
            }
          ]
        },
        {
          "_$id": "46wpflrr",
          "_$index": 9,
          "_$type": "List",
          "name": "list_tujian",
          "x": 40,
          "y": 630,
          "width": 240,
          "height": 458,
          "_mouseState": 2,
          "itemTemplate": {
            "_$ref": "zuwwycqk",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
          "repeatY": 12,
          "elasticEnabled": true,
          "spaceY": 10,
          "scrollType": 2,
          "vScrollBarSkin": "res://f6e300da-8c8d-4960-90a6-2a654b26fd2c",
          "disableStopScroll": true,
          "_$child": [
            {
              "_$id": "zuwwycqk",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "name": "Mingzi",
              "active": true,
              "x": 20,
              "y": 0,
              "width": 200,
              "height": 40,
              "_$comp": [
                {
                  "_$type": "d2289316-a9cf-4f20-b913-ae0dcf78b616",
                  "scriptPath": "../src/ui/Mingzi.ts"
                }
              ],
              "_$child": [
                {
                  "_$override": "3mo5miu3",
                  "width": 200,
                  "height": 40,
                  "skin": "res://759045a5-f943-44fb-befb-12186fee97a5",
                  "sizeGrid": null,
                  "color": "#545454",
                  "x": 100,
                  "y": 20
                },
                {
                  "_$override": "au8mtcie",
                  "width": 180,
                  "height": 40,
                  "overflow": "visible",
                  "text": "仙·金翅大鹏",
                  "y": 3,
                  "x": 10,
                  "fontSize": 24,
                  "color": "rgba(191, 191, 191, 1)",
                  "html": true
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            }
          ]
        },
        {
          "_$id": "xslr5ejy",
          "_$index": 10,
          "_$type": "Text",
          "name": "Text",
          "x": 10,
          "y": 1120,
          "width": 700,
          "height": 30,
          "text": "拟态时，属性匹配度越高、属性值越高成功率越高!",
          "fontSize": 30,
          "color": "rgba(255, 255, 255, 1)",
          "align": "center",
          "leading": 2
        },
        {
          "_$id": "qctbbfda",
          "_$index": 11,
          "_$type": "Text",
          "name": "Name",
          "x": 325,
          "y": 625,
          "width": 250,
          "height": 60,
          "text": "仙·金翅大鹏",
          "fontSize": 36,
          "color": "rgba(194, 182, 167, 1)",
          "bold": true,
          "html": true,
          "align": "center",
          "valign": "middle",
          "leading": 2
        },
        {
          "_$id": "tw8psatr",
          "_$index": 12,
          "_$type": "Text",
          "name": "Lock",
          "x": 580,
          "y": 640,
          "width": 100,
          "height": 50,
          "text": "击杀解锁\n(00/99)",
          "fontSize": 18,
          "color": "rgba(0, 255, 12, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "wordWrap": true,
          "leading": 2
        },
        {
          "_$id": "ady8kzwd",
          "_$index": 13,
          "_$type": "Text",
          "name": "Text(1)",
          "x": 328,
          "y": 720,
          "width": 95,
          "height": 30,
          "text": "成长:",
          "fontSize": 30,
          "color": "rgba(247, 197, 141, 1)",
          "leading": 2
        },
        {
          "_$id": "asqmn9ed",
          "_$index": 14,
          "_$type": "Text",
          "name": "Text(2)",
          "x": 504,
          "y": 720,
          "width": 95,
          "height": 30,
          "text": "技能:",
          "fontSize": 30,
          "color": "rgba(247, 197, 141, 1)",
          "leading": 2
        },
        {
          "_$id": "fo1zqvz9",
          "_$index": 15,
          "_$type": "Text",
          "name": "Chengzhang",
          "x": 323,
          "y": 763,
          "width": 167,
          "height": 102,
          "text": "攻击成长：1.1\n攻击成长：1.1\n攻击成长：1.1",
          "fontSize": 22,
          "color": "rgba(247, 197, 141, 1)",
          "html": true,
          "valign": "middle",
          "wordWrap": true,
          "leading": 10
        },
        {
          "_$id": "12c15hyl",
          "_$index": 16,
          "_$type": "Text",
          "name": "Text(3)",
          "x": 328,
          "y": 920,
          "width": 95,
          "height": 30,
          "text": "图鉴加成:",
          "fontSize": 30,
          "color": "rgba(247, 197, 141, 1)",
          "leading": 2
        },
        {
          "_$id": "qmiq35yk",
          "_$index": 17,
          "_$type": "Text",
          "name": "Text(4)",
          "x": 504,
          "y": 920,
          "width": 95,
          "height": 30,
          "text": "组成:",
          "fontSize": 30,
          "color": "rgba(247, 197, 141, 1)",
          "leading": 2
        },
        {
          "_$id": "qvr0diki",
          "_$index": 18,
          "_$type": "List",
          "name": "list_skill",
          "x": 505,
          "y": 763,
          "width": 140,
          "height": 100,
          "_mouseState": 2,
          "itemTemplate": {
            "_$ref": "q9723xrw",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
          "repeatY": 3,
          "elasticEnabled": true,
          "spaceY": 10,
          "scrollType": 2,
          "vScrollBarSkin": "res://f6e300da-8c8d-4960-90a6-2a654b26fd2c",
          "_$child": [
            {
              "_$id": "q9723xrw",
              "_$prefab": "41d72ad2-e04a-4ec5-b9da-12a4ce8532cb",
              "name": "Skill",
              "active": true,
              "x": 0,
              "y": 0
            }
          ]
        },
        {
          "_$id": "a4d6h6ds",
          "_$index": 19,
          "_$type": "Text",
          "name": "Jiacheng",
          "x": 323,
          "y": 960,
          "width": 146,
          "height": 120,
          "text": "攻击：9999\n攻击：9999\n攻击：9999",
          "fontSize": 24,
          "color": "rgba(247, 197, 141, 1)",
          "html": true,
          "valign": "middle",
          "overflow": "shrink",
          "wordWrap": true,
          "leading": 10
        },
        {
          "_$override": "y6ek77jm",
          "visible": true,
          "x": 526,
          "y": 120
        },
        {
          "_$override": [
            "y6ek77jm",
            "au8mtcie"
          ],
          "text": "返回",
          "y": 1
        },
        {
          "_$id": "fap27w0i",
          "_$type": "List",
          "name": "list_shuxing",
          "x": 500,
          "y": 973,
          "width": 180,
          "height": 98,
          "_mouseState": 1,
          "itemTemplate": {
            "_$ref": "ccevpyew",
            "_$tmpl": "itemRender"
          },
          "repeatX": 2,
          "repeatY": 3,
          "elasticEnabled": true,
          "spaceX": 10,
          "_$child": [
            {
              "_$id": "ccevpyew",
              "_$type": "Label",
              "name": "Label",
              "width": 80,
              "height": 32,
              "text": "齿：9999",
              "fontSize": 20,
              "color": "rgba(247, 197, 141, 1)",
              "html": true,
              "templateVars": true,
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        }
      ]
    },
    {
      "_$id": "46ze7463",
      "_$prefab": "7ccb3cb4-0500-463b-9867-ef45865cfdeb",
      "_$var": true,
      "name": "Jinhua",
      "active": true,
      "x": 360,
      "y": 640,
      "visible": false,
      "centerX": 0,
      "centerY": 0,
      "_$comp": [
        {
          "_$type": "b94ea91a-260a-40e9-9767-9915f07e9e51",
          "scriptPath": "../src/ui/Jinhua.ts"
        }
      ],
      "_$child": [
        {
          "_$override": "ecyn9419",
          "centerX": null,
          "centerY": null,
          "y": 390,
          "x": 360,
          "width": 650
        },
        {
          "_$override": "3ny13ib3",
          "text": "定向拟态成功率提升5%\n定向拟态只能拟态成已解锁图鉴的生物",
          "align": "left",
          "valign": "top",
          "x": 50,
          "y": 1020,
          "centerX": null,
          "centerY": null,
          "height": 80,
          "fontSize": 28,
          "visible": false
        },
        {
          "_$override": "jvphpq4p",
          "x": 90,
          "y": 485
        },
        {
          "_$override": [
            "jvphpq4p",
            "au8mtcie"
          ],
          "text": "定向拟态"
        },
        {
          "_$override": [
            "jvphpq4p",
            "qnb9iybi"
          ],
          "text": "2转解锁",
          "y": 60
        },
        {
          "_$id": "05oiydh1",
          "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
          "_$var": true,
          "_$index": 4,
          "name": "ad",
          "active": true,
          "x": 285,
          "y": 485,
          "height": 60,
          "visible": false,
          "_$child": [
            {
              "_$override": "3mo5miu3",
              "color": "#833d3d"
            },
            {
              "_$override": "au8mtcie",
              "text": "看广告",
              "color": "rgba(252, 220, 170, 1)"
            },
            {
              "_$override": "qnb9iybi",
              "visible": true,
              "text": "提升拟态成功率5%",
              "width": 207,
              "x": -25,
              "y": 60
            }
          ]
        },
        {
          "_$id": "0hf4g1ly",
          "_$index": 5,
          "_$type": "List",
          "name": "list_role",
          "x": 51,
          "y": 205,
          "width": 637,
          "height": 262,
          "_mouseState": 2,
          "itemTemplate": {
            "_$ref": "qp5ierpt",
            "_$tmpl": "itemRender"
          },
          "repeatX": 3,
          "repeatY": 2,
          "spaceX": 10,
          "spaceY": 10,
          "_$child": [
            {
              "_$id": "qp5ierpt",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "name": "Button",
              "active": true,
              "x": 0,
              "y": 0,
              "width": 200,
              "height": 120,
              "_$child": [
                {
                  "_$override": "3mo5miu3",
                  "x": 100,
                  "y": 60,
                  "width": 200,
                  "height": 120,
                  "skin": "res://119d48d2-a4c3-4add-a1b7-4850392aaf77",
                  "sizeGrid": "17,24,18,21,0",
                  "color": "#666b6f"
                },
                {
                  "_$override": "au8mtcie",
                  "y": 19,
                  "width": 185,
                  "height": 97,
                  "text": "凡·史莱姆\n<font size=24>成功率:20%</font>",
                  "html": true,
                  "overflow": "shrink",
                  "leading": 16
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            }
          ]
        },
        {
          "_$override": "y6ek77jm",
          "x": 480,
          "y": 485
        },
        {
          "_$override": [
            "y6ek77jm",
            "au8mtcie"
          ],
          "text": "返回"
        },
        {
          "_$id": "7qd5xzi0",
          "_$type": "Sprite",
          "name": "dingxiang",
          "width": 100,
          "height": 100,
          "_mouseState": 2,
          "_$child": [
            {
              "_$id": "5m4yfac2",
              "_$type": "Image",
              "name": "Image(1)",
              "x": 360,
              "y": 800,
              "width": 650,
              "height": 400,
              "anchorX": 0.5,
              "anchorY": 0.5,
              "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
              "sizeGrid": "25,20,20,23,0",
              "color": "#4b4b4b"
            },
            {
              "_$id": "pc06dh6f",
              "_$var": true,
              "_$type": "Label",
              "name": "Label(1)",
              "x": 50,
              "y": 1010,
              "width": 560,
              "height": 80,
              "text": "定向拟态成功率提升5%\n定向拟态只能拟态成已解锁图鉴的生物",
              "fontSize": 28,
              "color": "rgba(255, 255, 255, 1)",
              "valign": "top",
              "wordWrap": true,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "trpshhu6",
              "_$type": "List",
              "name": "list_dingxiang",
              "x": 55,
              "y": 621,
              "width": 624,
              "height": 360,
              "_mouseState": 2,
              "itemTemplate": {
                "_$ref": "gwwn9xe8",
                "_$tmpl": "itemRender"
              },
              "repeatX": 1,
              "repeatY": 8,
              "elasticEnabled": true,
              "spaceY": 10,
              "scrollType": 2,
              "vScrollBarSkin": "res://f6e300da-8c8d-4960-90a6-2a654b26fd2c",
              "_$child": [
                {
                  "_$id": "gwwn9xe8",
                  "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
                  "name": "Chengjiu",
                  "active": true,
                  "x": 0,
                  "y": 0,
                  "width": 600,
                  "height": 60,
                  "anchorX": 0,
                  "anchorY": 0,
                  "_$child": [
                    {
                      "_$id": "gx8xvgpb",
                      "_$index": 0,
                      "_$type": "Image",
                      "name": "Frame",
                      "x": 310,
                      "y": 30,
                      "width": 600,
                      "height": 60,
                      "anchorX": 0.5,
                      "anchorY": 0.5,
                      "_mouseState": 2,
                      "skin": "res://f70ad7f2-7a6b-48e1-9c8a-2ede6c3f385b",
                      "color": "#545454"
                    },
                    {
                      "_$id": "1bwswl46",
                      "_$index": 1,
                      "_$type": "Label",
                      "name": "Title",
                      "x": 40,
                      "y": 15,
                      "width": 150,
                      "height": 40,
                      "text": "灵·九尾妖狐",
                      "fontSize": 32,
                      "color": "rgba(255, 255, 255, 1)",
                      "bold": true,
                      "html": true,
                      "valign": "top",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$override": "3mo5miu3",
                      "skin": "res://00af61db-93a9-4358-8d53-03f4729801c2",
                      "width": 120,
                      "x": 520,
                      "y": 30,
                      "height": 40,
                      "sizeGrid": null,
                      "scaleX": 1,
                      "scaleY": 1
                    },
                    {
                      "_$override": "au8mtcie",
                      "color": "rgba(252, 220, 170, 1)",
                      "text": "拟态",
                      "bold": true,
                      "html": false,
                      "valign": "middle",
                      "width": 120,
                      "height": 40,
                      "overflow": "shrink",
                      "x": 0,
                      "y": 3,
                      "fontSize": 30
                    },
                    {
                      "_$override": "qnb9iybi",
                      "visible": true,
                      "x": 280,
                      "y": 20,
                      "text": "成功率:99%",
                      "color": "rgba(252, 220, 170, 1)",
                      "fontSize": 24,
                      "width": 164,
                      "height": 30,
                      "valign": "bottom",
                      "html": true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}