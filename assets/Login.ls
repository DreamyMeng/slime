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
          "scriptPath": "../src/ui/Login.ts"
        }
      ],
      "_$child": [
        {
          "_$id": "8kkeq73v",
          "_$type": "Label",
          "name": "Label",
          "x": 60,
          "y": 180,
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
          "y": 290,
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
          "_$id": "5p1484pn",
          "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
          "_$var": true,
          "name": "Button",
          "active": true,
          "x": 210,
          "y": 640,
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
          "x": 592,
          "y": 64,
          "width": 64,
          "height": 64,
          "visible": true,
          "_$child": [
            {
              "_$override": "3mo5miu3",
              "sizeGrid": null,
              "skin": "res://50ca7c52-df25-4dd1-8534-1f99d126c041",
              "width": 64,
              "height": 64,
              "x": 32,
              "y": 32,
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
          "_$id": "cx91sifl",
          "_$type": "ComboBox",
          "name": "ComboBox",
          "x": 64,
          "y": 64,
          "width": 128,
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
          "_$id": "z85ktl70",
          "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
          "_$var": true,
          "name": "Button2",
          "active": true,
          "x": 210,
          "y": 740,
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
        },
        {
          "_$id": "4jdme93h",
          "_$prefab": "5b9529ed-07c7-4674-b485-7620907dbe49",
          "name": "Login",
          "active": true,
          "x": 225,
          "y": 885,
          "width": 270,
          "height": 50,
          "visible": false,
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
        }
      ]
    }
  ]
}