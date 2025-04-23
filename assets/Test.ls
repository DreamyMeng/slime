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
      "label": {
        "_$ref": "6rnk1nkh"
      },
      "clip": null
    }
  ],
  "_$child": [
    {
      "_$id": "dy13jouu",
      "_$type": "Label",
      "name": "Label",
      "x": 31,
      "y": 768,
      "width": 360,
      "height": 170,
      "visible": false,
      "text": "<span>齿:<font color='#DCDCDC'>157.76万</font></span>\t\t<span>喙:<font color='#DCDCDC'>2.54万</font></span>\t\t<span>鳞:<font color='#DCDCDC'>125.25万</font></span>\t\t<br /><span>毛:<font color='#DCDCDC'>1241.41万</font></span>\t\t<span>甲:<font color='#DCDCDC'>1000兆</font></span>\t\t<span>蠃:<font color='#DCDCDC'>657.57万</font></span>\t\t<br /><span>羽:<font color='#DCDCDC'>2340</font></span>\t\t<span>爪:<font color='#DCDCDC'>570</font></span>\t\t<span>蹄:<font color='#DCDCDC'>0</font></span>\t\t<br /><span>角:<font color='#DCDCDC'>0</font></span>\t\t<span>智:<font color='#DCDCDC'>550</font></span>\t\t",
      "fontSize": 20,
      "color": "#FFFFFF",
      "html": true,
      "valign": "top",
      "padding": "0,0,0,0"
    },
    {
      "_$id": "6rnk1nkh",
      "_$type": "Text",
      "name": "Text",
      "x": 205,
      "y": 650,
      "width": 300,
      "height": 40,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "visible": false,
      "text": "Text",
      "fontSize": 40,
      "color": "#FFFFFF",
      "align": "center",
      "valign": "middle",
      "leading": 2
    },
    {
      "_$id": "rj47jpmj",
      "_$prefab": "73c2aaa8-aa1f-4e82-8d9e-5207973e870c",
      "name": "Sprite",
      "active": true,
      "x": 206,
      "y": 490,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "visible": false
    },
    {
      "_$id": "pfrrafuq",
      "_$type": "Sprite",
      "name": "Sprite(1)",
      "x": 228,
      "y": 414,
      "width": 200,
      "height": 100,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "visible": false,
      "_gcmds": [
        {
          "_$type": "DrawRoundRectCmd",
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "lt": 20,
          "rt": 20,
          "lb": 20,
          "rb": 20,
          "percent": true,
          "lineWidth": 1,
          "lineColor": "#000000",
          "fillColor": "#FFFFFF"
        }
      ],
      "_$comp": [
        {
          "_$type": "6f301182-9394-40cd-855a-48f40d15f989",
          "scriptPath": "../src/test/NewScript.ts"
        }
      ],
      "_$child": [
        {
          "_$id": "uafrlenr",
          "_$var": true,
          "_$type": "Label",
          "name": "Label",
          "x": 20,
          "y": 20,
          "width": 160,
          "height": 60,
          "left": 20,
          "right": 20,
          "top": 20,
          "bottom": 20,
          "text": "Label",
          "fontSize": 50,
          "color": "rgba(0, 0, 0, 1)",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "overflow": "shrink",
          "padding": "0,0,0,0"
        }
      ]
    },
    {
      "_$id": "43kz1a0i",
      "_$type": "Sprite",
      "name": "Sprite(2)",
      "x": 9,
      "y": 311,
      "width": 698.6514439220957,
      "height": 442.42511752854267,
      "visible": false,
      "_gcmds": [
        {
          "_$type": "DrawRectCmd",
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "percent": true,
          "lineWidth": 6,
          "lineColor": "rgba(45, 48, 48, 1)",
          "fillColor": "rgba(21, 34, 34, 0.6274509803921569)"
        }
      ]
    },
    {
      "_$id": "avompqv0",
      "_$type": "List",
      "name": "List",
      "x": 30,
      "y": 332,
      "width": 660,
      "height": 400,
      "visible": false,
      "_mouseState": 2,
      "itemTemplate": {
        "_$ref": "idwaxa1x",
        "_$tmpl": "itemRender"
      },
      "repeatX": 3,
      "repeatY": 2,
      "spaceX": 10,
      "spaceY": 10,
      "scrollType": 2,
      "vScrollBarSkin": "res://fc3bb457-8d97-4456-b6b6-304c6b064689",
      "selectEnable": true,
      "_$comp": [
        {
          "_$type": "dea3e41a-5a05-41e0-84f7-0865e68d813e",
          "scriptPath": "../src/test/TestList.ts"
        }
      ],
      "_$child": [
        {
          "_$id": "idwaxa1x",
          "_$type": "Sprite",
          "name": "Role",
          "width": 200,
          "height": 120,
          "_$child": [
            {
              "_$id": "pzt9yv8z",
              "_$type": "Image",
              "name": "Image",
              "x": 100,
              "y": 60,
              "width": 200,
              "height": 120,
              "anchorX": 0.5,
              "anchorY": 0.5,
              "skin": "res://119d48d2-a4c3-4add-a1b7-4850392aaf77",
              "sizeGrid": "17,24,18,21,0",
              "color": "#666b6f",
              "_$comp": [
                {
                  "_$type": "6f301182-9394-40cd-855a-48f40d15f989",
                  "scriptPath": "../src/test/NewScript.ts"
                }
              ],
              "_$child": [
                {
                  "_$id": "8kixlgqj",
                  "_$type": "Label",
                  "name": "Title",
                  "y": 19,
                  "width": 185,
                  "height": 97,
                  "text": "凡·史莱姆\n<font size=24>成功率:20%</font>",
                  "fontSize": 32,
                  "color": "rgba(255, 255, 255, 1)",
                  "bold": true,
                  "html": true,
                  "align": "center",
                  "valign": "middle",
                  "overflow": "shrink",
                  "leading": 16,
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "6hk03zi5",
                  "_$type": "Label",
                  "name": "Tip",
                  "x": 20,
                  "y": 85,
                  "width": 190,
                  "height": 25,
                  "visible": false,
                  "text": "战力：123456789",
                  "fontSize": 24,
                  "color": "rgba(247, 197, 141, 1)",
                  "valign": "middle",
                  "leading": 4,
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "2mfxesis",
                  "_$type": "Label",
                  "name": "Level",
                  "x": 20,
                  "y": 10,
                  "width": 190,
                  "height": 25,
                  "visible": false,
                  "text": "lv:1",
                  "fontSize": 20,
                  "color": "rgba(247, 197, 141, 1)",
                  "valign": "middle",
                  "leading": 4,
                  "padding": "0,0,0,0"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "_$id": "wvgqcmoy",
      "_$type": "ComboBox",
      "name": "ComboBox",
      "x": 344,
      "y": 405,
      "width": 128,
      "height": 64,
      "_mouseState": 2,
      "skin": "res://f64d4387-f2c7-4e48-bea1-a0dfd22a109d",
      "labels": "中文,English",
      "labelSize": 24,
      "itemSize": 18,
      "itemColors": "#5e95b6,#ffffff,#000000,#8fa4b1,#ffffff",
      "selectedLabel": "",
      "defaultLabel": ""
    }
  ]
}