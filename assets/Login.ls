{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "width": 720,
  "height": 1280,
  "autoDestroyAtClosed": true,
  "_$child": [
    {
      "_$id": "21q8g90y",
      "_$type": "Image",
      "name": "Login",
      "x": 360,
      "y": 640,
      "width": 720,
      "height": 1280,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "_mouseState": 2,
      "centerX": 0,
      "centerY": 0,
      "skin": "res://8c5e69a3-e03b-4f58-9433-bbe775ba1f95",
      "color": "#ffffff",
      "_$comp": [
        {
          "_$type": "4e53f856-e258-44f1-9630-1d01acffd07b",
          "scriptPath": "../src/ui/Login.ts",
          "Scene1": {
            "_$ref": "5p1484pn"
          },
          "Scene2": {
            "_$ref": "z85ktl70"
          },
          "settings": {
            "_$ref": "oei8erhu"
          },
          "ComboBox": {
            "_$ref": "cx91sifl"
          },
          "settingsPanel": {
            "_$ref": "ce4zcwdd"
          },
          "ok": {
            "_$ref": [
              "ce4zcwdd",
              "jvphpq4p"
            ]
          },
          "no": {
            "_$ref": [
              "ce4zcwdd",
              "y6ek77jm"
            ]
          },
          "musicBar": {
            "_$ref": "bv5fj9f5"
          },
          "soundBar": {
            "_$ref": "x7ikd5yy"
          },
          "sys_tog": {
            "_$ref": "yk4rfdd1"
          },
          "sel_tog": {
            "_$ref": "h45k0njh"
          }
        }
      ],
      "_$child": [
        {
          "_$id": "8kkeq73v",
          "_$type": "Label",
          "name": "Label",
          "x": 60,
          "y": 210,
          "width": 600,
          "height": 120,
          "text": "开局一只史莱姆",
          "fontSize": 76,
          "color": "rgba(0, 151, 255, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "overflow": "shrink",
          "padding": "0,0,0,0",
          "_$comp": [
            {
              "_$type": "9728d806-4c52-4dad-855d-6bfab562cd29",
              "scriptPath": "../src/ui/I18nText.ts"
            }
          ]
        },
        {
          "_$id": "l1w01b6a",
          "_$type": "Label",
          "name": "Label(1)",
          "x": 420,
          "y": 320,
          "width": 250,
          "height": 100,
          "visible": false,
          "text": "-测试版",
          "fontSize": 56,
          "color": "rgba(210, 213, 210, 1)",
          "bold": true,
          "align": "right",
          "valign": "middle",
          "overflow": "shrink",
          "padding": "0,0,0,0",
          "_$comp": [
            {
              "_$type": "9728d806-4c52-4dad-855d-6bfab562cd29",
              "scriptPath": "../src/ui/I18nText.ts"
            }
          ]
        },
        {
          "_$id": "txjkvcet",
          "_$type": "Label",
          "name": "Label(2)",
          "x": 60,
          "y": 1100,
          "width": 600,
          "height": 100,
          "text": "抵制不良游戏 拒绝盗版游戏 注意自我保护\n谨防受骗上当 适度游戏益脑 沉迷游戏伤身\n合理安排时间 享受健康生活",
          "fontSize": 30,
          "color": "rgba(210, 213, 210, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "overflow": "shrink",
          "padding": "0,0,0,0",
          "_$comp": [
            {
              "_$type": "9728d806-4c52-4dad-855d-6bfab562cd29",
              "scriptPath": "../src/ui/I18nText.ts"
            }
          ]
        },
        {
          "_$id": "oei8erhu",
          "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
          "_$var": true,
          "name": "Sound",
          "active": true,
          "x": 580,
          "y": 60,
          "width": 80,
          "height": 80,
          "visible": true,
          "_$child": [
            {
              "_$override": "3mo5miu3",
              "sizeGrid": null,
              "skin": "res://c00bfabc-b373-4232-b86b-f38265b971a9",
              "width": 80,
              "height": 80,
              "x": 40,
              "y": 40,
              "color": "#d4c7a0"
            },
            {
              "_$override": "au8mtcie",
              "visible": false
            },
            {
              "_$override": "qnb9iybi",
              "visible": false
            }
          ]
        },
        {
          "_$id": "4jdme93h",
          "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
          "name": "TapTap",
          "active": true,
          "x": 225,
          "y": 885,
          "width": 270,
          "height": 50,
          "visible": true,
          "_$child": [
            {
              "_$override": "3mo5miu3",
              "width": 270,
              "height": 50,
              "y": 25,
              "skin": "res://382f7527-79e8-4e82-8710-2bb08f2e01a2",
              "sizeGrid": null,
              "color": "#ffffff",
              "x": 135
            }
          ]
        },
        {
          "_$id": "rzvuye0d",
          "_$type": "VBox",
          "name": "Login",
          "x": 360,
          "y": 800,
          "width": 720,
          "height": 100,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "visible": false,
          "left": 0,
          "right": 0,
          "centerY": 160,
          "space": 10,
          "align": "center",
          "_$child": [
            {
              "_$id": "5p1484pn",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "Button",
              "active": true,
              "x": 210,
              "y": 0,
              "width": 300,
              "height": 80,
              "visible": true,
              "_$child": [
                {
                  "_$override": "3mo5miu3",
                  "skin": "res://1f9bc5eb-2da6-40b7-9c01-8be9fd5cea58",
                  "width": 255.6336832434451,
                  "height": 64,
                  "x": 150,
                  "y": 40,
                  "sizeGrid": null,
                  "color": "#b61111"
                },
                {
                  "_$override": "au8mtcie",
                  "left": 0,
                  "right": 0,
                  "bottom": -3,
                  "top": 3,
                  "fontSize": 44,
                  "color": "rgba(0, 0, 0, 1)",
                  "text": "开始游戏",
                  "y": 3
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            },
            {
              "_$id": "z85ktl70",
              "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
              "_$var": true,
              "name": "Button2",
              "active": true,
              "x": 210,
              "y": 90,
              "width": 300,
              "height": 80,
              "visible": true,
              "_$child": [
                {
                  "_$override": "3mo5miu3",
                  "skin": "res://1f9bc5eb-2da6-40b7-9c01-8be9fd5cea58",
                  "width": 255.6336832434451,
                  "height": 64,
                  "x": 150,
                  "y": 40,
                  "sizeGrid": null,
                  "color": "#11b3b6"
                },
                {
                  "_$override": "au8mtcie",
                  "left": 0,
                  "right": 0,
                  "bottom": -3,
                  "top": 3,
                  "fontSize": 44,
                  "color": "rgba(0, 0, 0, 1)",
                  "text": "无尽挑战",
                  "y": 3
                },
                {
                  "_$override": "qnb9iybi",
                  "visible": false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "_$id": "ce4zcwdd",
      "_$prefab": "7ccb3cb4-0500-463b-9867-ef45865cfdeb",
      "_$var": true,
      "name": "PopUp",
      "active": true,
      "x": 360,
      "y": 640,
      "visible": false,
      "centerX": 0,
      "centerY": 0,
      "_$child": [
        {
          "_$override": "ecyn9419",
          "height": 600,
          "y": 600
        },
        {
          "_$override": "jvphpq4p",
          "y": 778
        },
        {
          "_$override": [
            "jvphpq4p",
            "3mo5miu3"
          ],
          "color": "#3d8283"
        },
        {
          "_$override": [
            "jvphpq4p",
            "au8mtcie"
          ],
          "text": "应用"
        },
        {
          "_$override": "y6ek77jm",
          "y": 778
        },
        {
          "_$id": "s61f5oj9",
          "_$index": 5,
          "_$type": "VBox",
          "name": "VBox",
          "x": 140,
          "y": 380,
          "width": 122,
          "height": 200,
          "space": 30,
          "align": "left",
          "_$child": [
            {
              "_$id": "83ct2jyl",
              "_$type": "Label",
              "name": "Label",
              "width": 120,
              "height": 60,
              "text": "语言",
              "fontSize": 50,
              "color": "#FFFFFF",
              "valign": "middle",
              "padding": "0,0,0,0",
              "_$comp": [
                {
                  "_$type": "9728d806-4c52-4dad-855d-6bfab562cd29",
                  "scriptPath": "../src/ui/I18nText.ts"
                }
              ]
            },
            {
              "_$id": "8qixklg7",
              "_$type": "Label",
              "name": "Label(1)",
              "y": 90,
              "width": 120,
              "height": 60,
              "text": "音乐",
              "fontSize": 50,
              "color": "#FFFFFF",
              "valign": "middle",
              "padding": "0,0,0,0",
              "_$comp": [
                {
                  "_$type": "9728d806-4c52-4dad-855d-6bfab562cd29",
                  "scriptPath": "../src/ui/I18nText.ts"
                }
              ]
            },
            {
              "_$id": "bwyujrk7",
              "_$type": "Label",
              "name": "Label(2)",
              "y": 180,
              "width": 120,
              "height": 60,
              "text": "音效",
              "fontSize": 50,
              "color": "#FFFFFF",
              "valign": "middle",
              "padding": "0,0,0,0",
              "_$comp": [
                {
                  "_$type": "9728d806-4c52-4dad-855d-6bfab562cd29",
                  "scriptPath": "../src/ui/I18nText.ts"
                }
              ]
            },
            {
              "_$id": "3u6owzbg",
              "_$type": "Label",
              "name": "Label(3)",
              "y": 270,
              "width": 120,
              "height": 60,
              "text": "字体",
              "fontSize": 50,
              "color": "#FFFFFF",
              "valign": "middle",
              "padding": "0,0,0,0",
              "_$comp": [
                {
                  "_$type": "9728d806-4c52-4dad-855d-6bfab562cd29",
                  "scriptPath": "../src/ui/I18nText.ts"
                }
              ]
            }
          ]
        },
        {
          "_$id": "cx91sifl",
          "_$index": 6,
          "_$type": "ComboBox",
          "name": "ComboBox",
          "x": 270,
          "y": 375,
          "width": 300,
          "height": 64,
          "_mouseState": 2,
          "skin": "res://5ceef2ed-3fc7-4852-9f42-676f82727445",
          "sizeGrid": "12,62,8,18,0",
          "labels": "中文,English",
          "labelSize": 24,
          "labelBold": true,
          "itemSize": 18,
          "itemColors": "#5e95b6,#ffffff,#000000,#8fa4b1,#ffffff",
          "selectedLabel": "",
          "defaultLabel": ""
        },
        {
          "_$id": "bv5fj9f5",
          "_$index": 7,
          "_$type": "HSlider",
          "name": "HSlider",
          "x": 270,
          "y": 480,
          "width": 300,
          "height": 100,
          "_mouseState": 2,
          "skin": "res://051feaa7-15db-4143-958c-161475961a6b"
        },
        {
          "_$id": "x7ikd5yy",
          "_$index": 8,
          "_$type": "HSlider",
          "name": "HSlider(1)",
          "x": 270,
          "y": 570,
          "width": 300,
          "height": 100,
          "_mouseState": 2,
          "skin": "res://051feaa7-15db-4143-958c-161475961a6b"
        },
        {
          "_$id": "yk4rfdd1",
          "_$index": 9,
          "_$type": "Radio",
          "name": "Radio",
          "x": 270,
          "y": 650,
          "width": 160,
          "height": 64,
          "_mouseState": 2,
          "skin": "res://41488331-0ed3-4c38-959b-6ecc4fdac7e6",
          "label": "系统",
          "labelSize": 40,
          "labelColors": "#ffffff,#f5131b,#32cc6b",
          "labelAlign": "center",
          "labelVAlign": "middle"
        },
        {
          "_$id": "h45k0njh",
          "_$type": "Radio",
          "name": "Radio(1)",
          "x": 450,
          "y": 650,
          "width": 160,
          "height": 64,
          "_mouseState": 2,
          "skin": "res://41488331-0ed3-4c38-959b-6ecc4fdac7e6",
          "label": "自带",
          "labelSize": 40,
          "labelColors": "#ffffff,#f5131b,#32cc6b",
          "labelAlign": "center",
          "labelVAlign": "middle"
        }
      ]
    }
  ]
}