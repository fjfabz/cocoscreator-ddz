(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/WaitingRoom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a9a2d9UCxFHuLyIG/uSBiwQ', 'WaitingRoom', __filename);
// Script/WaitingRoom.js

"use strict";

var _net = require("net");

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        roomNumber: cc.Label,
        leftName: cc.Label,
        rightName: cc.Label,
        playerName: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //获取房间信息
        this.roomNumber.string = "房间号：" + Global.roomNum;
        var self = this;
        self.playerName.string = Global.playerName;
        if (Global.roomWaitType == 'join') {
            Network.socket.emit("getRoomData", Global.roomNum);
        }

        Network.socket.on("getRoomDataBack" + Global.roomNum, function (data) {
            console.log(data);
            var playerIndex = 0;
            for (var index = 0; index < data.length; index++) {
                var player = data[index];
                if (player.name == Global.playerName) {
                    playerIndex = index;
                    Global.roomIndex = playerIndex;
                }
            }
            if (data.length == 2) {
                if (playerIndex == 0) {
                    self.leftName.string = "等待加入";
                    self.rightName.string = data[1].name ? data[1].name : "等待加入";
                } else if (playerIndex == 1) {
                    self.leftName.string = data[0].name ? data[0].name : "等待加入";
                    self.rightName.string = "等待加入";
                }
            } else {
                if (playerIndex == 0) {
                    self.leftName.string = data[2].name ? data[2].name : "等待加入";
                    self.rightName.string = data[1].name ? data[1].name : "等待加入";
                } else if (playerIndex == 1) {
                    self.leftName.string = data[0].name ? data[0].name : "等待加入";
                    self.rightName.string = data[2].name ? data[2].name : "等待加入";
                } else {
                    self.leftName.string = data[1].name ? data[1].name : "等待加入";
                    self.rightName.string = data[0].name ? data[0].name : "等待加入";
                }
            }

            if (data.length == 3) {
                cc.director.loadScene('game');
            }
        });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=WaitingRoom.js.map
        