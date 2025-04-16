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
    }
  ]
}