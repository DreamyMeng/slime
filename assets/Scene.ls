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
      "_gcmds": [],
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
          "skin": "res://260d7a45-b5ca-42fb-abf6-39b869308c6a"
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
      "skin": "res://46903ea6-2a2e-4539-b43a-c5bfa491de48",
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
      "skin": "res://cc301462-15dd-4f5b-bcd1-a9ef34fe4099",
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
          "skin": "res://cc301462-15dd-4f5b-bcd1-a9ef34fe4099",
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
              "y": 82,
              "width": 350,
              "height": 60,
              "text": "攻击：9999\\t\\t防御：9999\\n血量：9999",
              "fontSize": 28,
              "color": "rgba(247, 197, 141, 1)",
              "html": true,
              "valign": "top",
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
              "skin": "res://afb422d2-5f76-4c2f-b5ab-954fd908b645",
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
          "skin": "res://cc301462-15dd-4f5b-bcd1-a9ef34fe4099",
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
              "spaceX": 3,
              "spaceY": 5,
              "scrollType": 2,
              "vScrollBarSkin": "res://fc3bb457-8d97-4456-b6b6-304c6b064689",
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
              "skin": "res://afb422d2-5f76-4c2f-b5ab-954fd908b645",
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
              "vScrollBarSkin": "res://fc3bb457-8d97-4456-b6b6-304c6b064689",
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
      "skin": "res://cc301462-15dd-4f5b-bcd1-a9ef34fe4099",
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
              "name": "btn_nitai",
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
              "y": 260,
              "anchorX": 0.5,
              "anchorY": 0.5,
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
              "x": 350,
              "y": 260,
              "anchorX": 0.5,
              "anchorY": 0.5,
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
      "skin": "res://cc301462-15dd-4f5b-bcd1-a9ef34fe4099",
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
          "scrollType": 2,
          "vScrollBarSkin": "res://fc3bb457-8d97-4456-b6b6-304c6b064689",
          "_$child": [
            {
              "_$id": "5253s4u5",
              "_$type": "Label",
              "name": "Label",
              "width": 120,
              "height": 28,
              "text": "Label",
              "fontSize": 24,
              "color": "#FFFFFF",
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
      "_gcmds": [
        {
          "_$type": "DrawRectCmd",
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "percent": true,
          "lineWidth": 1,
          "fillColor": "rgba(20, 20, 20, 0.9019607843137255)"
        }
      ],
      "_$comp": [
        {
          "_$type": "2ce74eea-7c55-49a5-bd2c-a3ebe4a89b01",
          "scriptPath": "../src/ui/Cuilian.ts"
        }
      ],
      "_$child": [
        {
          "_$override": "ecyn9419",
          "skin": "res://cc301462-15dd-4f5b-bcd1-a9ef34fe4099"
        },
        {
          "_$override": [
            "jvphpq4p",
            "au8mtcie"
          ],
          "text": "确定"
        },
        {
          "_$override": [
            "y6ek77jm",
            "au8mtcie"
          ],
          "text": "取消"
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
          "skin": "res://cc301462-15dd-4f5b-bcd1-a9ef34fe4099",
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
          "skin": "res://afb422d2-5f76-4c2f-b5ab-954fd908b645",
          "color": "#5e4b40"
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
    }
  ]
}