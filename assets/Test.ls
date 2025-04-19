{
  "_$ver": 1,
  "_$id": "no15eeod",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "width": 720,
  "height": 1280,
  "_$comp": [
    {
      "_$type": "b75c494c-f951-41c2-9beb-2fb3a02202b5",
      "scriptPath": "../src/Test.ts",
      "btn": {
        "_$ref": "gdkh6iqp"
      },
      "animator": {
        "_$ref": "4duu9782",
        "_$type": "Animator2D"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "4duu9782",
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
      "_$id": "gdkh6iqp",
      "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
      "name": "Button",
      "active": true,
      "x": 180,
      "y": 550,
      "visible": true
    },
    {
      "_$id": "dy13jouu",
      "_$type": "Label",
      "name": "Label",
      "x": 31,
      "y": 768,
      "width": 360,
      "height": 170,
      "text": "<span>齿:<font color='#DCDCDC'>157.76万</font></span>\t\t<span>喙:<font color='#DCDCDC'>2.54万</font></span>\t\t<span>鳞:<font color='#DCDCDC'>125.25万</font></span>\t\t<br /><span>毛:<font color='#DCDCDC'>1241.41万</font></span>\t\t<span>甲:<font color='#DCDCDC'>1000兆</font></span>\t\t<span>蠃:<font color='#DCDCDC'>657.57万</font></span>\t\t<br /><span>羽:<font color='#DCDCDC'>2340</font></span>\t\t<span>爪:<font color='#DCDCDC'>570</font></span>\t\t<span>蹄:<font color='#DCDCDC'>0</font></span>\t\t<br /><span>角:<font color='#DCDCDC'>0</font></span>\t\t<span>智:<font color='#DCDCDC'>550</font></span>\t\t",
      "fontSize": 20,
      "color": "#FFFFFF",
      "html": true,
      "valign": "top",
      "padding": "0,0,0,0"
    },
    {
      "_$id": "gr035arm",
      "_$prefab": "7ccb3cb4-0500-463b-9867-ef45865cfdeb",
      "_$var": true,
      "name": "Jinhua",
      "active": true,
      "x": 360,
      "y": 640,
      "visible": true,
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
          "_$id": "5ubmstth",
          "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
          "_$var": true,
          "_$index": 4,
          "name": "ad",
          "active": true,
          "x": 285,
          "y": 485,
          "height": 60,
          "visible": true,
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
          "_$id": "phyao7w1",
          "_$index": 5,
          "_$type": "List",
          "name": "list_role",
          "x": 51,
          "y": 205,
          "width": 637,
          "height": 262,
          "_mouseState": 2,
          "itemTemplate": {
            "_$ref": "q4krdfpn",
            "_$tmpl": "itemRender"
          },
          "repeatX": 3,
          "repeatY": 1,
          "elasticEnabled": true,
          "spaceX": 10,
          "spaceY": 10,
          "scrollType": 2,
          "_$child": [
            {
              "_$id": "q4krdfpn",
              "_$prefab": "819108f6-545f-4a86-a92f-245f6129bbb9",
              "name": "Role",
              "active": true,
              "x": 0,
              "y": 0,
              "width": 200,
              "_$child": [
                {
                  "_$override": "v99g4abc",
                  "width": 200,
                  "x": 100,
                  "sizeGrid": "17,24,18,21,0"
                },
                {
                  "_$override": "rouixso9",
                  "left": null,
                  "right": null,
                  "top": null,
                  "bottom": null,
                  "text": "凡·史莱姆\n<font size=24>成功率:20%</font>",
                  "leading": 16,
                  "fontSize": 32,
                  "height": 97,
                  "y": 19,
                  "x": 0,
                  "width": 185
                },
                {
                  "_$override": "4p57p0ot",
                  "visible": false
                },
                {
                  "_$override": "rquzrpb6",
                  "visible": false
                }
              ]
            }
          ]
        },
        {
          "_$id": "mnvm3p4s",
          "_$type": "Sprite",
          "name": "dingxiang",
          "width": 100,
          "height": 100,
          "_mouseState": 2,
          "_$child": [
            {
              "_$id": "ke1crokd",
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
              "_$id": "a9ely7lz",
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
              "_$id": "uza611so",
              "_$type": "List",
              "name": "list_dingxiang",
              "x": 55,
              "y": 621,
              "width": 624,
              "height": 360,
              "_mouseState": 2,
              "itemTemplate": {
                "_$ref": "nvkqtfxh",
                "_$tmpl": "itemRender"
              },
              "repeatX": 1,
              "repeatY": 8,
              "elasticEnabled": true,
              "spaceY": 10,
              "scrollType": 2,
              "vScrollBarSkin": "res://fc3bb457-8d97-4456-b6b6-304c6b064689",
              "_$child": [
                {
                  "_$id": "nvkqtfxh",
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
                      "_$id": "cyi9sg5n",
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
                      "sizeGrid": "20,20,20,20,0",
                      "color": "#545454"
                    },
                    {
                      "_$id": "u285mlh7",
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
                      "color": "rgba(151, 181, 72, 1)",
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