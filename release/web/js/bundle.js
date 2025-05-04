"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/table/schema.ts
  var _achieve = class _achieve {
    constructor(_json_) {
      if (_json_.id === void 0) {
        throw new Error();
      }
      this.id = _json_.id;
      if (_json_.type === void 0) {
        throw new Error();
      }
      this.type = _json_.type;
      if (_json_.target != void 0) {
        this.target = _json_.target;
      } else {
        this.target = void 0;
      }
      if (_json_.count === void 0) {
        throw new Error();
      }
      this.count = _json_.count;
      if (_json_.description === void 0) {
        throw new Error();
      }
      this.description = _json_.description;
      if (_json_.reward_type === void 0) {
        throw new Error();
      }
      this.rewardType = _json_.reward_type;
      if (_json_.reward_str === void 0) {
        throw new Error();
      }
      this.rewardStr = _json_.reward_str;
    }
    resolve(tables) {
    }
  };
  __name(_achieve, "achieve");
  var achieve = _achieve;
  var _lang = class _lang {
    constructor(_json_) {
      if (_json_.key === void 0) {
        throw new Error();
      }
      this.key = _json_.key;
      if (_json_.CHS === void 0) {
        throw new Error();
      }
      this.CHS = _json_.CHS;
      if (_json_.EN === void 0) {
        throw new Error();
      }
      this.EN = _json_.EN;
      if (_json_.CHT === void 0) {
        throw new Error();
      }
      this.CHT = _json_.CHT;
      if (_json_.JP === void 0) {
        throw new Error();
      }
      this.JP = _json_.JP;
      if (_json_.KR === void 0) {
        throw new Error();
      }
      this.KR = _json_.KR;
      if (_json_.VN === void 0) {
        throw new Error();
      }
      this.VN = _json_.VN;
    }
    resolve(tables) {
    }
  };
  __name(_lang, "lang");
  var lang = _lang;
  var _map_level = class _map_level {
    constructor(_json_) {
      if (_json_.id === void 0) {
        throw new Error();
      }
      this.id = _json_.id;
      if (_json_.level_min === void 0) {
        throw new Error();
      }
      this.levelMin = _json_.level_min;
      if (_json_.level_max === void 0) {
        throw new Error();
      }
      this.levelMax = _json_.level_max;
      if (_json_.health_rate === void 0) {
        throw new Error();
      }
      this.healthRate = _json_.health_rate;
      if (_json_.defence_rate === void 0) {
        throw new Error();
      }
      this.defenceRate = _json_.defence_rate;
      if (_json_.attack_rate === void 0) {
        throw new Error();
      }
      this.attackRate = _json_.attack_rate;
      if (_json_.monsters === void 0) {
        throw new Error();
      }
      this.monsters = new MonsterProbability(_json_.monsters);
    }
    resolve(tables) {
      var _a;
      (_a = this.monsters) == null ? void 0 : _a.resolve(tables);
    }
  };
  __name(_map_level, "map_level");
  var map_level = _map_level;
  var _MonsterProbability = class _MonsterProbability {
    constructor(_json_) {
      if (_json_.h1 != void 0) {
        this.h1 = _json_.h1;
      } else {
        this.h1 = void 0;
      }
      if (_json_.h2 != void 0) {
        this.h2 = _json_.h2;
      } else {
        this.h2 = void 0;
      }
      if (_json_.h13 != void 0) {
        this.h13 = _json_.h13;
      } else {
        this.h13 = void 0;
      }
      if (_json_.h14 != void 0) {
        this.h14 = _json_.h14;
      } else {
        this.h14 = void 0;
      }
      if (_json_.h36 != void 0) {
        this.h36 = _json_.h36;
      } else {
        this.h36 = void 0;
      }
      if (_json_.h137 != void 0) {
        this.h137 = _json_.h137;
      } else {
        this.h137 = void 0;
      }
      if (_json_.h3 != void 0) {
        this.h3 = _json_.h3;
      } else {
        this.h3 = void 0;
      }
      if (_json_.h15 != void 0) {
        this.h15 = _json_.h15;
      } else {
        this.h15 = void 0;
      }
      if (_json_.h28 != void 0) {
        this.h28 = _json_.h28;
      } else {
        this.h28 = void 0;
      }
      if (_json_.h37 != void 0) {
        this.h37 = _json_.h37;
      } else {
        this.h37 = void 0;
      }
      if (_json_.h45 != void 0) {
        this.h45 = _json_.h45;
      } else {
        this.h45 = void 0;
      }
      if (_json_.h55 != void 0) {
        this.h55 = _json_.h55;
      } else {
        this.h55 = void 0;
      }
      if (_json_.h72 != void 0) {
        this.h72 = _json_.h72;
      } else {
        this.h72 = void 0;
      }
      if (_json_.h82 != void 0) {
        this.h82 = _json_.h82;
      } else {
        this.h82 = void 0;
      }
      if (_json_.h90 != void 0) {
        this.h90 = _json_.h90;
      } else {
        this.h90 = void 0;
      }
      if (_json_.h96 != void 0) {
        this.h96 = _json_.h96;
      } else {
        this.h96 = void 0;
      }
      if (_json_.h104 != void 0) {
        this.h104 = _json_.h104;
      } else {
        this.h104 = void 0;
      }
      if (_json_.h108 != void 0) {
        this.h108 = _json_.h108;
      } else {
        this.h108 = void 0;
      }
      if (_json_.h121 != void 0) {
        this.h121 = _json_.h121;
      } else {
        this.h121 = void 0;
      }
      if (_json_.h129 != void 0) {
        this.h129 = _json_.h129;
      } else {
        this.h129 = void 0;
      }
      if (_json_.h138 != void 0) {
        this.h138 = _json_.h138;
      } else {
        this.h138 = void 0;
      }
      if (_json_.h4 != void 0) {
        this.h4 = _json_.h4;
      } else {
        this.h4 = void 0;
      }
      if (_json_.h16 != void 0) {
        this.h16 = _json_.h16;
      } else {
        this.h16 = void 0;
      }
      if (_json_.h17 != void 0) {
        this.h17 = _json_.h17;
      } else {
        this.h17 = void 0;
      }
      if (_json_.h29 != void 0) {
        this.h29 = _json_.h29;
      } else {
        this.h29 = void 0;
      }
      if (_json_.h38 != void 0) {
        this.h38 = _json_.h38;
      } else {
        this.h38 = void 0;
      }
      if (_json_.h46 != void 0) {
        this.h46 = _json_.h46;
      } else {
        this.h46 = void 0;
      }
      if (_json_.h53 != void 0) {
        this.h53 = _json_.h53;
      } else {
        this.h53 = void 0;
      }
      if (_json_.h56 != void 0) {
        this.h56 = _json_.h56;
      } else {
        this.h56 = void 0;
      }
      if (_json_.h62 != void 0) {
        this.h62 = _json_.h62;
      } else {
        this.h62 = void 0;
      }
      if (_json_.h73 != void 0) {
        this.h73 = _json_.h73;
      } else {
        this.h73 = void 0;
      }
      if (_json_.h83 != void 0) {
        this.h83 = _json_.h83;
      } else {
        this.h83 = void 0;
      }
      if (_json_.h91 != void 0) {
        this.h91 = _json_.h91;
      } else {
        this.h91 = void 0;
      }
      if (_json_.h97 != void 0) {
        this.h97 = _json_.h97;
      } else {
        this.h97 = void 0;
      }
      if (_json_.h105 != void 0) {
        this.h105 = _json_.h105;
      } else {
        this.h105 = void 0;
      }
      if (_json_.h109 != void 0) {
        this.h109 = _json_.h109;
      } else {
        this.h109 = void 0;
      }
      if (_json_.h116 != void 0) {
        this.h116 = _json_.h116;
      } else {
        this.h116 = void 0;
      }
      if (_json_.h122 != void 0) {
        this.h122 = _json_.h122;
      } else {
        this.h122 = void 0;
      }
      if (_json_.h126 != void 0) {
        this.h126 = _json_.h126;
      } else {
        this.h126 = void 0;
      }
      if (_json_.h130 != void 0) {
        this.h130 = _json_.h130;
      } else {
        this.h130 = void 0;
      }
      if (_json_.h135 != void 0) {
        this.h135 = _json_.h135;
      } else {
        this.h135 = void 0;
      }
      if (_json_.h139 != void 0) {
        this.h139 = _json_.h139;
      } else {
        this.h139 = void 0;
      }
      if (_json_.h5 != void 0) {
        this.h5 = _json_.h5;
      } else {
        this.h5 = void 0;
      }
      if (_json_.h18 != void 0) {
        this.h18 = _json_.h18;
      } else {
        this.h18 = void 0;
      }
      if (_json_.h30 != void 0) {
        this.h30 = _json_.h30;
      } else {
        this.h30 = void 0;
      }
      if (_json_.h39 != void 0) {
        this.h39 = _json_.h39;
      } else {
        this.h39 = void 0;
      }
      if (_json_.h47 != void 0) {
        this.h47 = _json_.h47;
      } else {
        this.h47 = void 0;
      }
      if (_json_.h57 != void 0) {
        this.h57 = _json_.h57;
      } else {
        this.h57 = void 0;
      }
      if (_json_.h63 != void 0) {
        this.h63 = _json_.h63;
      } else {
        this.h63 = void 0;
      }
      if (_json_.h74 != void 0) {
        this.h74 = _json_.h74;
      } else {
        this.h74 = void 0;
      }
      if (_json_.h84 != void 0) {
        this.h84 = _json_.h84;
      } else {
        this.h84 = void 0;
      }
      if (_json_.h88 != void 0) {
        this.h88 = _json_.h88;
      } else {
        this.h88 = void 0;
      }
      if (_json_.h92 != void 0) {
        this.h92 = _json_.h92;
      } else {
        this.h92 = void 0;
      }
      if (_json_.h98 != void 0) {
        this.h98 = _json_.h98;
      } else {
        this.h98 = void 0;
      }
      if (_json_.h106 != void 0) {
        this.h106 = _json_.h106;
      } else {
        this.h106 = void 0;
      }
      if (_json_.h110 != void 0) {
        this.h110 = _json_.h110;
      } else {
        this.h110 = void 0;
      }
      if (_json_.h117 != void 0) {
        this.h117 = _json_.h117;
      } else {
        this.h117 = void 0;
      }
      if (_json_.h123 != void 0) {
        this.h123 = _json_.h123;
      } else {
        this.h123 = void 0;
      }
      if (_json_.h127 != void 0) {
        this.h127 = _json_.h127;
      } else {
        this.h127 = void 0;
      }
      if (_json_.h131 != void 0) {
        this.h131 = _json_.h131;
      } else {
        this.h131 = void 0;
      }
      if (_json_.h140 != void 0) {
        this.h140 = _json_.h140;
      } else {
        this.h140 = void 0;
      }
      if (_json_.h6 != void 0) {
        this.h6 = _json_.h6;
      } else {
        this.h6 = void 0;
      }
      if (_json_.h19 != void 0) {
        this.h19 = _json_.h19;
      } else {
        this.h19 = void 0;
      }
      if (_json_.h20 != void 0) {
        this.h20 = _json_.h20;
      } else {
        this.h20 = void 0;
      }
      if (_json_.h31 != void 0) {
        this.h31 = _json_.h31;
      } else {
        this.h31 = void 0;
      }
      if (_json_.h40 != void 0) {
        this.h40 = _json_.h40;
      } else {
        this.h40 = void 0;
      }
      if (_json_.h48 != void 0) {
        this.h48 = _json_.h48;
      } else {
        this.h48 = void 0;
      }
      if (_json_.h54 != void 0) {
        this.h54 = _json_.h54;
      } else {
        this.h54 = void 0;
      }
      if (_json_.h58 != void 0) {
        this.h58 = _json_.h58;
      } else {
        this.h58 = void 0;
      }
      if (_json_.h64 != void 0) {
        this.h64 = _json_.h64;
      } else {
        this.h64 = void 0;
      }
      if (_json_.h75 != void 0) {
        this.h75 = _json_.h75;
      } else {
        this.h75 = void 0;
      }
      if (_json_.h85 != void 0) {
        this.h85 = _json_.h85;
      } else {
        this.h85 = void 0;
      }
      if (_json_.h93 != void 0) {
        this.h93 = _json_.h93;
      } else {
        this.h93 = void 0;
      }
      if (_json_.h99 != void 0) {
        this.h99 = _json_.h99;
      } else {
        this.h99 = void 0;
      }
      if (_json_.h107 != void 0) {
        this.h107 = _json_.h107;
      } else {
        this.h107 = void 0;
      }
      if (_json_.h111 != void 0) {
        this.h111 = _json_.h111;
      } else {
        this.h111 = void 0;
      }
      if (_json_.h118 != void 0) {
        this.h118 = _json_.h118;
      } else {
        this.h118 = void 0;
      }
      if (_json_.h124 != void 0) {
        this.h124 = _json_.h124;
      } else {
        this.h124 = void 0;
      }
      if (_json_.h128 != void 0) {
        this.h128 = _json_.h128;
      } else {
        this.h128 = void 0;
      }
      if (_json_.h132 != void 0) {
        this.h132 = _json_.h132;
      } else {
        this.h132 = void 0;
      }
      if (_json_.h7 != void 0) {
        this.h7 = _json_.h7;
      } else {
        this.h7 = void 0;
      }
      if (_json_.h21 != void 0) {
        this.h21 = _json_.h21;
      } else {
        this.h21 = void 0;
      }
      if (_json_.h22 != void 0) {
        this.h22 = _json_.h22;
      } else {
        this.h22 = void 0;
      }
      if (_json_.h23 != void 0) {
        this.h23 = _json_.h23;
      } else {
        this.h23 = void 0;
      }
      if (_json_.h32 != void 0) {
        this.h32 = _json_.h32;
      } else {
        this.h32 = void 0;
      }
      if (_json_.h41 != void 0) {
        this.h41 = _json_.h41;
      } else {
        this.h41 = void 0;
      }
      if (_json_.h49 != void 0) {
        this.h49 = _json_.h49;
      } else {
        this.h49 = void 0;
      }
      if (_json_.h59 != void 0) {
        this.h59 = _json_.h59;
      } else {
        this.h59 = void 0;
      }
      if (_json_.h65 != void 0) {
        this.h65 = _json_.h65;
      } else {
        this.h65 = void 0;
      }
      if (_json_.h76 != void 0) {
        this.h76 = _json_.h76;
      } else {
        this.h76 = void 0;
      }
      if (_json_.h86 != void 0) {
        this.h86 = _json_.h86;
      } else {
        this.h86 = void 0;
      }
      if (_json_.h89 != void 0) {
        this.h89 = _json_.h89;
      } else {
        this.h89 = void 0;
      }
      if (_json_.h94 != void 0) {
        this.h94 = _json_.h94;
      } else {
        this.h94 = void 0;
      }
      if (_json_.h100 != void 0) {
        this.h100 = _json_.h100;
      } else {
        this.h100 = void 0;
      }
      if (_json_.h112 != void 0) {
        this.h112 = _json_.h112;
      } else {
        this.h112 = void 0;
      }
      if (_json_.h119 != void 0) {
        this.h119 = _json_.h119;
      } else {
        this.h119 = void 0;
      }
      if (_json_.h125 != void 0) {
        this.h125 = _json_.h125;
      } else {
        this.h125 = void 0;
      }
      if (_json_.h133 != void 0) {
        this.h133 = _json_.h133;
      } else {
        this.h133 = void 0;
      }
      if (_json_.h136 != void 0) {
        this.h136 = _json_.h136;
      } else {
        this.h136 = void 0;
      }
      if (_json_.h8 != void 0) {
        this.h8 = _json_.h8;
      } else {
        this.h8 = void 0;
      }
      if (_json_.h9 != void 0) {
        this.h9 = _json_.h9;
      } else {
        this.h9 = void 0;
      }
      if (_json_.h24 != void 0) {
        this.h24 = _json_.h24;
      } else {
        this.h24 = void 0;
      }
      if (_json_.h25 != void 0) {
        this.h25 = _json_.h25;
      } else {
        this.h25 = void 0;
      }
      if (_json_.h33 != void 0) {
        this.h33 = _json_.h33;
      } else {
        this.h33 = void 0;
      }
      if (_json_.h42 != void 0) {
        this.h42 = _json_.h42;
      } else {
        this.h42 = void 0;
      }
      if (_json_.h50 != void 0) {
        this.h50 = _json_.h50;
      } else {
        this.h50 = void 0;
      }
      if (_json_.h60 != void 0) {
        this.h60 = _json_.h60;
      } else {
        this.h60 = void 0;
      }
      if (_json_.h66 != void 0) {
        this.h66 = _json_.h66;
      } else {
        this.h66 = void 0;
      }
      if (_json_.h68 != void 0) {
        this.h68 = _json_.h68;
      } else {
        this.h68 = void 0;
      }
      if (_json_.h77 != void 0) {
        this.h77 = _json_.h77;
      } else {
        this.h77 = void 0;
      }
      if (_json_.h87 != void 0) {
        this.h87 = _json_.h87;
      } else {
        this.h87 = void 0;
      }
      if (_json_.h95 != void 0) {
        this.h95 = _json_.h95;
      } else {
        this.h95 = void 0;
      }
      if (_json_.h101 != void 0) {
        this.h101 = _json_.h101;
      } else {
        this.h101 = void 0;
      }
      if (_json_.h102 != void 0) {
        this.h102 = _json_.h102;
      } else {
        this.h102 = void 0;
      }
      if (_json_.h113 != void 0) {
        this.h113 = _json_.h113;
      } else {
        this.h113 = void 0;
      }
      if (_json_.h120 != void 0) {
        this.h120 = _json_.h120;
      } else {
        this.h120 = void 0;
      }
      if (_json_.h134 != void 0) {
        this.h134 = _json_.h134;
      } else {
        this.h134 = void 0;
      }
      if (_json_.h10 != void 0) {
        this.h10 = _json_.h10;
      } else {
        this.h10 = void 0;
      }
      if (_json_.h26 != void 0) {
        this.h26 = _json_.h26;
      } else {
        this.h26 = void 0;
      }
      if (_json_.h34 != void 0) {
        this.h34 = _json_.h34;
      } else {
        this.h34 = void 0;
      }
      if (_json_.h43 != void 0) {
        this.h43 = _json_.h43;
      } else {
        this.h43 = void 0;
      }
      if (_json_.h51 != void 0) {
        this.h51 = _json_.h51;
      } else {
        this.h51 = void 0;
      }
      if (_json_.h61 != void 0) {
        this.h61 = _json_.h61;
      } else {
        this.h61 = void 0;
      }
      if (_json_.h67 != void 0) {
        this.h67 = _json_.h67;
      } else {
        this.h67 = void 0;
      }
      if (_json_.h69 != void 0) {
        this.h69 = _json_.h69;
      } else {
        this.h69 = void 0;
      }
      if (_json_.h70 != void 0) {
        this.h70 = _json_.h70;
      } else {
        this.h70 = void 0;
      }
      if (_json_.h71 != void 0) {
        this.h71 = _json_.h71;
      } else {
        this.h71 = void 0;
      }
      if (_json_.h78 != void 0) {
        this.h78 = _json_.h78;
      } else {
        this.h78 = void 0;
      }
      if (_json_.h79 != void 0) {
        this.h79 = _json_.h79;
      } else {
        this.h79 = void 0;
      }
      if (_json_.h80 != void 0) {
        this.h80 = _json_.h80;
      } else {
        this.h80 = void 0;
      }
      if (_json_.h81 != void 0) {
        this.h81 = _json_.h81;
      } else {
        this.h81 = void 0;
      }
      if (_json_.h103 != void 0) {
        this.h103 = _json_.h103;
      } else {
        this.h103 = void 0;
      }
      if (_json_.h114 != void 0) {
        this.h114 = _json_.h114;
      } else {
        this.h114 = void 0;
      }
      if (_json_.h11 != void 0) {
        this.h11 = _json_.h11;
      } else {
        this.h11 = void 0;
      }
      if (_json_.h12 != void 0) {
        this.h12 = _json_.h12;
      } else {
        this.h12 = void 0;
      }
      if (_json_.h27 != void 0) {
        this.h27 = _json_.h27;
      } else {
        this.h27 = void 0;
      }
      if (_json_.h35 != void 0) {
        this.h35 = _json_.h35;
      } else {
        this.h35 = void 0;
      }
      if (_json_.h44 != void 0) {
        this.h44 = _json_.h44;
      } else {
        this.h44 = void 0;
      }
      if (_json_.h52 != void 0) {
        this.h52 = _json_.h52;
      } else {
        this.h52 = void 0;
      }
      if (_json_.h115 != void 0) {
        this.h115 = _json_.h115;
      } else {
        this.h115 = void 0;
      }
    }
    resolve(tables) {
    }
  };
  __name(_MonsterProbability, "MonsterProbability");
  var MonsterProbability = _MonsterProbability;
  var _rebirth = class _rebirth {
    constructor(_json_) {
      if (_json_.id === void 0) {
        throw new Error();
      }
      this.id = _json_.id;
      if (_json_.need === void 0) {
        throw new Error();
      }
      this.need = _json_.need;
      if (_json_.health === void 0) {
        throw new Error();
      }
      this.health = _json_.health;
      if (_json_.attack === void 0) {
        throw new Error();
      }
      this.attack = _json_.attack;
      if (_json_.defence === void 0) {
        throw new Error();
      }
      this.defence = _json_.defence;
    }
    resolve(tables) {
    }
  };
  __name(_rebirth, "rebirth");
  var rebirth = _rebirth;
  var _role = class _role {
    constructor(_json_) {
      if (_json_.id === void 0) {
        throw new Error();
      }
      this.id = _json_.id;
      if (_json_.name === void 0) {
        throw new Error();
      }
      this.name = _json_.name;
      if (_json_.rare === void 0) {
        throw new Error();
      }
      this.rare = _json_.rare;
      if (_json_.quality_type === void 0) {
        throw new Error();
      }
      this.qualityType = _json_.quality_type;
      if (_json_.quality === void 0) {
        throw new Error();
      }
      this.quality = _json_.quality;
      if (_json_.race === void 0) {
        throw new Error();
      }
      this.race = _json_.race;
      if (_json_.remain === void 0) {
        throw new Error();
      }
      this.remain = _json_.remain;
      if (_json_.exp_need === void 0) {
        throw new Error();
      }
      this.expNeed = _json_.exp_need;
      if (_json_.exp_dead === void 0) {
        throw new Error();
      }
      this.expDead = _json_.exp_dead;
      if (_json_.attack_rate === void 0) {
        throw new Error();
      }
      this.attackRate = _json_.attack_rate;
      if (_json_.defence_rate === void 0) {
        throw new Error();
      }
      this.defenceRate = _json_.defence_rate;
      if (_json_.health_rate === void 0) {
        throw new Error();
      }
      this.healthRate = _json_.health_rate;
      if (_json_.attack_add === void 0) {
        throw new Error();
      }
      this.attackAdd = _json_.attack_add;
      if (_json_.defence_add === void 0) {
        throw new Error();
      }
      this.defenceAdd = _json_.defence_add;
      if (_json_.health_add === void 0) {
        throw new Error();
      }
      this.healthAdd = _json_.health_add;
      if (_json_.relations === void 0) {
        throw new Error();
      }
      this.relations = new RoleRelation(_json_.relations);
      if (_json_.skills === void 0) {
        throw new Error();
      }
      {
        this.skills = [];
        for (let _ele0 of _json_.skills) {
          let _e0;
          _e0 = _ele0;
          this.skills.push(_e0);
        }
      }
    }
    resolve(tables) {
      var _a;
      (_a = this.relations) == null ? void 0 : _a.resolve(tables);
    }
  };
  __name(_role, "role");
  var role = _role;
  var _role_level = class _role_level {
    constructor(_json_) {
      if (_json_.id === void 0) {
        throw new Error();
      }
      this.id = _json_.id;
      if (_json_.need === void 0) {
        throw new Error();
      }
      this.need = _json_.need;
      if (_json_.exp === void 0) {
        throw new Error();
      }
      this.exp = _json_.exp;
      if (_json_.attack === void 0) {
        throw new Error();
      }
      this.attack = _json_.attack;
      if (_json_.defence === void 0) {
        throw new Error();
      }
      this.defence = _json_.defence;
      if (_json_.health === void 0) {
        throw new Error();
      }
      this.health = _json_.health;
    }
    resolve(tables) {
    }
  };
  __name(_role_level, "role_level");
  var role_level = _role_level;
  var _RoleRelation = class _RoleRelation {
    constructor(_json_) {
      if (_json_.chi != void 0) {
        this.chi = _json_.chi;
      } else {
        this.chi = void 0;
      }
      if (_json_.hui != void 0) {
        this.hui = _json_.hui;
      } else {
        this.hui = void 0;
      }
      if (_json_.lin != void 0) {
        this.lin = _json_.lin;
      } else {
        this.lin = void 0;
      }
      if (_json_.mao != void 0) {
        this.mao = _json_.mao;
      } else {
        this.mao = void 0;
      }
      if (_json_.jia != void 0) {
        this.jia = _json_.jia;
      } else {
        this.jia = void 0;
      }
      if (_json_.luo != void 0) {
        this.luo = _json_.luo;
      } else {
        this.luo = void 0;
      }
      if (_json_.yu != void 0) {
        this.yu = _json_.yu;
      } else {
        this.yu = void 0;
      }
      if (_json_.zhao != void 0) {
        this.zhao = _json_.zhao;
      } else {
        this.zhao = void 0;
      }
      if (_json_.ti != void 0) {
        this.ti = _json_.ti;
      } else {
        this.ti = void 0;
      }
      if (_json_.jiao != void 0) {
        this.jiao = _json_.jiao;
      } else {
        this.jiao = void 0;
      }
      if (_json_.zhi != void 0) {
        this.zhi = _json_.zhi;
      } else {
        this.zhi = void 0;
      }
    }
    resolve(tables) {
    }
  };
  __name(_RoleRelation, "RoleRelation");
  var RoleRelation = _RoleRelation;
  var _skill = class _skill {
    constructor(_json_) {
      if (_json_.id === void 0) {
        throw new Error();
      }
      this.id = _json_.id;
      if (_json_.name === void 0) {
        throw new Error();
      }
      this.name = _json_.name;
      if (_json_.effect_str === void 0) {
        throw new Error();
      }
      this.effectStr = _json_.effect_str;
      if (_json_.description === void 0) {
        throw new Error();
      }
      this.description = _json_.description;
      if (_json_.rarity === void 0) {
        throw new Error();
      }
      this.rarity = _json_.rarity;
      if (_json_.type === void 0) {
        throw new Error();
      }
      this.type = _json_.type;
      if (_json_.target === void 0) {
        throw new Error();
      }
      this.target = _json_.target;
      if (_json_.trigger === void 0) {
        throw new Error();
      }
      this.trigger = _json_.trigger;
      if (_json_.condition === void 0) {
        throw new Error();
      }
      this.condition = /* @__PURE__ */ new Map();
      for (var _entry0_ of _json_.condition) {
        let _k0;
        _k0 = _entry0_[0];
        let _v0;
        _v0 = _entry0_[1];
        this.condition.set(_k0, _v0);
      }
      if (_json_.buff_round != void 0) {
        this.buffRound = _json_.buff_round;
      } else {
        this.buffRound = void 0;
      }
      if (_json_.rate === void 0) {
        throw new Error();
      }
      this.rate = _json_.rate;
      if (_json_.values === void 0) {
        throw new Error();
      }
      this.values = /* @__PURE__ */ new Map();
      for (var _entry0_ of _json_.values) {
        let _k0;
        _k0 = _entry0_[0];
        let _v0;
        _v0 = _entry0_[1];
        this.values.set(_k0, _v0);
      }
    }
    resolve(tables) {
    }
  };
  __name(_skill, "skill");
  var skill = _skill;
  var _Tbachieve = class _Tbachieve {
    constructor(_json_) {
      this._dataMap = /* @__PURE__ */ new Map();
      this._dataList = [];
      for (var _json2_ of _json_) {
        let _v;
        _v = new achieve(_json2_);
        this._dataList.push(_v);
        this._dataMap.set(_v.id, _v);
      }
    }
    getDataMap() {
      return this._dataMap;
    }
    getDataList() {
      return this._dataList;
    }
    get(key) {
      return this._dataMap.get(key);
    }
    resolve(tables) {
      for (let data of this._dataList) {
        data.resolve(tables);
      }
    }
  };
  __name(_Tbachieve, "Tbachieve");
  var Tbachieve = _Tbachieve;
  var _Tblang = class _Tblang {
    constructor(_json_) {
      this._dataMap = /* @__PURE__ */ new Map();
      this._dataList = [];
      for (var _json2_ of _json_) {
        let _v;
        _v = new lang(_json2_);
        this._dataList.push(_v);
        this._dataMap.set(_v.key, _v);
      }
    }
    getDataMap() {
      return this._dataMap;
    }
    getDataList() {
      return this._dataList;
    }
    get(key) {
      return this._dataMap.get(key);
    }
    resolve(tables) {
      for (let data of this._dataList) {
        data.resolve(tables);
      }
    }
  };
  __name(_Tblang, "Tblang");
  var Tblang = _Tblang;
  var _Tbmap_level = class _Tbmap_level {
    constructor(_json_) {
      this._dataMap = /* @__PURE__ */ new Map();
      this._dataList = [];
      for (var _json2_ of _json_) {
        let _v;
        _v = new map_level(_json2_);
        this._dataList.push(_v);
        this._dataMap.set(_v.id, _v);
      }
    }
    getDataMap() {
      return this._dataMap;
    }
    getDataList() {
      return this._dataList;
    }
    get(key) {
      return this._dataMap.get(key);
    }
    resolve(tables) {
      for (let data of this._dataList) {
        data.resolve(tables);
      }
    }
  };
  __name(_Tbmap_level, "Tbmap_level");
  var Tbmap_level = _Tbmap_level;
  var _Tbrebirth = class _Tbrebirth {
    constructor(_json_) {
      this._dataMap = /* @__PURE__ */ new Map();
      this._dataList = [];
      for (var _json2_ of _json_) {
        let _v;
        _v = new rebirth(_json2_);
        this._dataList.push(_v);
        this._dataMap.set(_v.id, _v);
      }
    }
    getDataMap() {
      return this._dataMap;
    }
    getDataList() {
      return this._dataList;
    }
    get(key) {
      return this._dataMap.get(key);
    }
    resolve(tables) {
      for (let data of this._dataList) {
        data.resolve(tables);
      }
    }
  };
  __name(_Tbrebirth, "Tbrebirth");
  var Tbrebirth = _Tbrebirth;
  var _Tbrole = class _Tbrole {
    constructor(_json_) {
      this._dataMap = /* @__PURE__ */ new Map();
      this._dataList = [];
      for (var _json2_ of _json_) {
        let _v;
        _v = new role(_json2_);
        this._dataList.push(_v);
        this._dataMap.set(_v.id, _v);
      }
    }
    getDataMap() {
      return this._dataMap;
    }
    getDataList() {
      return this._dataList;
    }
    get(key) {
      return this._dataMap.get(key);
    }
    resolve(tables) {
      for (let data of this._dataList) {
        data.resolve(tables);
      }
    }
  };
  __name(_Tbrole, "Tbrole");
  var Tbrole = _Tbrole;
  var _Tbrole_level = class _Tbrole_level {
    constructor(_json_) {
      this._dataMap = /* @__PURE__ */ new Map();
      this._dataList = [];
      for (var _json2_ of _json_) {
        let _v;
        _v = new role_level(_json2_);
        this._dataList.push(_v);
        this._dataMap.set(_v.id, _v);
      }
    }
    getDataMap() {
      return this._dataMap;
    }
    getDataList() {
      return this._dataList;
    }
    get(key) {
      return this._dataMap.get(key);
    }
    resolve(tables) {
      for (let data of this._dataList) {
        data.resolve(tables);
      }
    }
  };
  __name(_Tbrole_level, "Tbrole_level");
  var Tbrole_level = _Tbrole_level;
  var _Tbskill = class _Tbskill {
    constructor(_json_) {
      this._dataMap = /* @__PURE__ */ new Map();
      this._dataList = [];
      for (var _json2_ of _json_) {
        let _v;
        _v = new skill(_json2_);
        this._dataList.push(_v);
        this._dataMap.set(_v.id, _v);
      }
    }
    getDataMap() {
      return this._dataMap;
    }
    getDataList() {
      return this._dataList;
    }
    get(key) {
      return this._dataMap.get(key);
    }
    resolve(tables) {
      for (let data of this._dataList) {
        data.resolve(tables);
      }
    }
  };
  __name(_Tbskill, "Tbskill");
  var Tbskill = _Tbskill;
  var _Tables = class _Tables {
    get Tbachieve() {
      return this._Tbachieve;
    }
    get Tblang() {
      return this._Tblang;
    }
    get Tbmap_level() {
      return this._Tbmap_level;
    }
    get Tbrebirth() {
      return this._Tbrebirth;
    }
    get Tbrole() {
      return this._Tbrole;
    }
    get Tbrole_level() {
      return this._Tbrole_level;
    }
    get Tbskill() {
      return this._Tbskill;
    }
    constructor(loader) {
      this._Tbachieve = new Tbachieve(loader("tbachieve"));
      this._Tblang = new Tblang(loader("tblang"));
      this._Tbmap_level = new Tbmap_level(loader("tbmap_level"));
      this._Tbrebirth = new Tbrebirth(loader("tbrebirth"));
      this._Tbrole = new Tbrole(loader("tbrole"));
      this._Tbrole_level = new Tbrole_level(loader("tbrole_level"));
      this._Tbskill = new Tbskill(loader("tbskill"));
      this._Tbachieve.resolve(this);
      this._Tblang.resolve(this);
      this._Tbmap_level.resolve(this);
      this._Tbrebirth.resolve(this);
      this._Tbrole.resolve(this);
      this._Tbrole_level.resolve(this);
      this._Tbskill.resolve(this);
    }
  };
  __name(_Tables, "Tables");
  var Tables = _Tables;

  // src/core/config.ts
  var _Config = class _Config {
    /**
     * 异步加载所有JSON配置表
     * 加载顺序按照数组定义顺序执行
     */
    static load_config() {
      return __async(this, null, function* () {
        const jsonArr = [
          "resources/json/tbachieve.json",
          "resources/json/tblang.json",
          "resources/json/tbmap_level.json",
          "resources/json/tbrebirth.json",
          "resources/json/tbrole.json",
          "resources/json/tbrole_level.json",
          "resources/json/tbskill.json"
        ];
        yield Laya.loader.load(jsonArr, Laya.Loader.JSON).then((json) => {
          let index = 0;
          _Config.table = new Tables(() => {
            return json[index++].data;
          });
          console.log("加载配置表成功！");
        }).catch((err) => {
          console.error("加载配置表失败", err);
        });
        jsonArr.forEach((res) => {
          Laya.loader.clearRes(res);
        });
      });
    }
    // 初始化加载声音资源
    static load_sound() {
      return __async(this, null, function* () {
        this.sounds.set("bgm", "resources/sound/bgm.mp3");
        this.sounds.set("ui_anniu", "resources/sound/ui_anniu.mp3");
        this.sounds.set("ui_anniu2", "resources/sound/ui_anniu2.mp3");
        this.sounds.set("die", "resources/sound/die.mp3");
        this.sounds.set("upgrade", "resources/sound/upgrade.mp3");
        this.sounds.set("win", "resources/sound/win.mp3");
        this.sounds.set("battle_bgm", "resources/sound/battle_bgm.mp3");
        this.sounds.set("att0", "resources/sound/att0.mp3");
        this.sounds.set("def0", "resources/sound/def0.mp3");
        this.sounds.set("att1", "resources/sound/att1.mp3");
        this.sounds.set("def1", "resources/sound/def1.mp3");
        this.sounds.set("att2", "resources/sound/att2.mp3");
        this.sounds.set("def2", "resources/sound/def2.mp3");
        yield Laya.loader.load(Array.from(this.sounds.values()));
      });
    }
    static load_prefab() {
      return __async(this, null, function* () {
        this.prefabs.set("PopUp", "resources/prefab/PopUp.lh");
        yield Laya.loader.load(Array.from(this.prefabs.values()));
      });
    }
  };
  __name(_Config, "Config");
  _Config.sounds = /* @__PURE__ */ new Map();
  _Config.prefabs = /* @__PURE__ */ new Map();
  var Config = _Config;
  var skill_rate = 0.2;
  var bossData = {
    attackRate: 1.2,
    // boss攻击倍数
    defenceRate: 1.2,
    // boss防御倍数
    healthRate: 2
    // boss血量倍数
  };
  var shift_config = {
    role_shift: 1.05,
    // 角色数值修正量
    power_shift: 10,
    // 战斗力数值修正量（为了好看）
    zhongzu_shift: 0.1
    // 种族数值修正量
  };
  var killCount = [100, 150, 200];
  var jinhua_need = [10, 20, 30, 40, 45, 50, 55, 60, 65];
  var color_config = {
    xinximoban: {
      shanghai: "#ff0200",
      huixue: "#5aff00",
      player: "#e1ffd5",
      enemy: "#ffe8e4",
      skill: "#fffe00"
    },
    pinzhi: {
      none: "#bfbfbf",
      ling: "#00b0f0",
      xian: "#ffff00",
      shen: "#ff0000"
    },
    name: {
      hui: "#bfbfbf",
      dian: "#bfbfbf",
      0: "#bfbfbf",
      1: "#ffffff",
      2: "#90ee90",
      3: "#06b400",
      4: "#8ea9db",
      5: "#00b0f0",
      6: "#7030a0",
      7: "#ffff00",
      8: "#ffc000",
      9: "#ff0000"
    }
  };
  var xinximoban = {
    zhandou: {
      kaishi: "----------开始战斗----------",
      jineng1: `<font color='{p}'>你使用了技能·<font color='{s}'>*</font>,&</font>`,
      jineng2: `<font color='{e}'>^使用了技能·<font color='{s}'>*</font>,&</font>`,
      shanbi1: `<font color='{p}'>你闪避了!</font>`,
      shanbi2: `<font color='{e}'>*闪避了!</font>`,
      gedang1: `<font color='{p}'>你格挡了!</font>`,
      gedang2: `<font color='{e}'>*格挡了!</font>`,
      huihe1: `<font color='{p}'>你对*发动了攻击,造成了<font color='{s}'>&</font>点伤害.</font>`,
      huihe2: `<font color='{e}'>*对你发动了攻击,造成了<font color='{s}'>&</font>点伤害.</font>`,
      huifu1: `<font color='{p}'>你恢复了<font color='{s}'>&</font>点生命.</font>`,
      huifu2: `<font color='{e}'>*恢复了<font color='{s}'>&</font>点生命.</font>`,
      siwang1: `你吞噬了*.`,
      siwang2: `*吞噬了你.`,
      jieshu: "----------战斗结束----------",
      taopao: `你逃出生天!`
    },
    jinhua: {
      chenggong: `<font color='^'>拟态成功</font>,拟态为*`,
      shibai1: `<font color='^'>拟态失败</font>,肉身崩坏死亡！`,
      shibai2: `<font color='^'>拟态失败</font>,损失等级10级。`
    },
    qianjin: "你遇到了{0},{1},{2}!",
    zhandouli: `当前战斗力为:<font color='#ff8c00'>*</font>`,
    shenru: "你来到第*层.",
    shengji: "你的等级为:*.",
    zhuansheng: `<font color='^'>转生成功</font>,属性成长提升`,
    cuilian: `<font color='^'>淬炼成功</font>,属性向拟态生物靠拢`,
    tunshi: `你吞噬了*,解析成功获得技能·<font color='^'>&</font>`,
    buzu: "<font color='#FF0000'>等级不足</font>"
  };
  var shuxing_config = {
    "chi": "齿",
    "hui": "喙",
    "lin": "鳞",
    "mao": "毛",
    "jia": "甲",
    "luo": "蠃",
    "yu": "羽",
    "zhao": "爪",
    "ti": "蹄",
    "jiao": "角",
    "zhi": "智"
  };
  var tishi = [
    "拟态失败有可能死亡，拟态需谨慎",
    "转生3次后，史莱姆会获得专属技能“解析”",
    "拟态时，属性匹配度越高、属性值越高成功率越高",
    "自动战斗可不一定是什么好事",
    "偷偷说一下，人族非常厉害",
    "淬炼可以让属性变得更纯粹",
    "拟态只会拟态成灵属性最高或无属性的生物",
    "已解锁的图鉴会给史莱姆提供属性加成",
    "等级超过99级后升级获得的属性会大幅下降",
    "所有生物20%概率吞噬敌人获得新的技能",
    "转生超过99次、199次后转生获得的属性会大幅下降"
  ];

  // src/core/i18n.ts
  String.prototype.toStr = function() {
    if (!this)
      return this;
    let data = Config.table.Tblang.get(this);
    if (data)
      return data[Language.key];
    console.log(`未找到语言：${this}`);
    return this;
  };
  var _Language = class _Language {
    static init() {
      _Language.key = Laya.LocalStorage.getItem("language") || "CHS";
    }
    static setLanguage(language) {
      _Language.key = language;
      Laya.LocalStorage.setItem("language", language);
    }
  };
  __name(_Language, "Language");
  var Language = _Language;

  // src/core/utils.ts
  var _GameLog = class _GameLog {
    constructor(maxLength = 1e3) {
      this.maxLength = maxLength;
      this.logs = [];
      this.maxLength = maxLength;
    }
    add(log) {
      if (this.logs.length >= this.maxLength) {
        this.logs.shift();
      }
      this.logs.push(log);
      if (this.callback)
        this.callback();
    }
    /**
     * 记录日志并输出到控制台
     * @param message 需要记录的日志信息
     */
    static log(message, isTranslate = true) {
      if (isTranslate)
        message = message.toStr();
      if (!this.instance)
        this.instance = new _GameLog();
      this.instance.add(message);
      console.log(`[LOG]: ${message}`);
    }
    static get() {
      return this.instance.logs;
    }
    static clear() {
      this.instance.logs.length = 0;
    }
  };
  __name(_GameLog, "GameLog");
  var GameLog = _GameLog;
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  __name(delay, "delay");
  function toInt(value) {
    return Math.floor(value);
  }
  __name(toInt, "toInt");
  function toPerStr(value) {
    const percentage = Math.floor(value * 1e3) / 10;
    return `${percentage}%`;
  }
  __name(toPerStr, "toPerStr");
  function getValueStr(num) {
    let list;
    let units;
    if (Language.key === "CHS")
      list = ["万", "亿", "兆"];
    if (Language.key === "CHT")
      list = ["萬", "億", "兆"];
    if (Language.key === "JP")
      list = ["万", "億", "兆"];
    if (Language.key === "KR")
      list = ["만", "억", "조"];
    if (list) {
      units = [
        { value: 1e12, symbol: list[2] },
        { value: 1e8, symbol: list[1] },
        { value: 1e4, symbol: list[0] }
      ];
    } else {
      units = [
        { value: 1e12, symbol: "T" },
        { value: 1e9, symbol: "B" },
        { value: 1e6, symbol: "M" },
        { value: 1e3, symbol: "K" }
      ];
    }
    for (const unit of units) {
      if (num >= unit.value) {
        const formatted = (num / unit.value).toFixed(2);
        return formatted.replace(/\.?0+$/, "") + unit.symbol;
      }
    }
    return num.toString();
  }
  __name(getValueStr, "getValueStr");
  function numberToChinese(num) {
    return num.toString();
    if (Language.key === "enUS")
      return num.toString();
    let chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    return num.toString().split("").map((n) => chineseNumbers[parseInt(n)]).join("");
  }
  __name(numberToChinese, "numberToChinese");
  function getMaxKey(data) {
    if (data.ling === data.xian && data.ling === data.shen)
      return "none";
    let maxKey = "none";
    let maxValue = 0;
    for (const key in data) {
      if (key === "none")
        continue;
      if (data[key] > maxValue) {
        maxValue = data[key];
        maxKey = key;
      }
    }
    return maxKey;
  }
  __name(getMaxKey, "getMaxKey");

  // src/ui/MessageBox.ts
  var _MessageBox = class _MessageBox {
    static tip(msg, isTranslate = true) {
      if (!msg)
        return;
      if (isTranslate)
        msg = msg.toStr();
      var offsetY = this.tipsQueue.length * 50;
      GameLog.log(msg, false);
      var message = new Laya.Label();
      message.text = msg;
      message.fontSize = 36;
      message.color = "#ffffff";
      message.pos(Laya.stage.width / 2, Laya.stage.height / 2 + offsetY);
      message.alpha = 1;
      message.align = "center";
      message.valign = "middle";
      message.anchorX = 0.5;
      message.anchorY = 0.5;
      message.width = 540;
      message.wordWrap = true;
      message.html = true;
      Laya.stage.addChild(message);
      Laya.Tween.to(
        message,
        { scaleX: 1.5, scaleY: 1.5 },
        // 放大
        200,
        Laya.Ease.quadIn,
        Laya.Handler.create(message, function() {
          Laya.Tween.to(
            message,
            { scaleX: 1, scaleY: 1 },
            // 目标位置和透明度
            200,
            Laya.Ease.quadOut
          );
          Laya.Tween.to(
            message,
            { y: Laya.stage.height / 2 - 100 + offsetY, alpha: 0 },
            // 目标位置和透明度
            1e3,
            Laya.Ease.linearNone,
            // 缓动函数
            Laya.Handler.create(message, function() {
              message.removeSelf();
              _MessageBox.tipsQueue.shift();
            })
          );
        })
      );
      _MessageBox.tipsQueue.push(message);
    }
    static show(msg, ok_callback, no_callback, isOk = true, isClose = true) {
      let message = Laya.loader.getRes(Config.prefabs.get("PopUp")).create();
      Laya.stage.addChild(message);
      message.Label.text = msg;
      message.open();
      if (!isOk) {
        message.ok.visible = false;
        message.no.x = 285;
        message.no.title.text = "确认".toStr();
        GameLog.log(msg, false);
      } else {
        message.ok.visible = true;
        message.no.x = 420;
      }
      message.ok.onClick = () => {
        if (isClose)
          message.close(() => {
            message.destroy();
          });
        if (ok_callback)
          ok_callback();
      };
      message.no.onClick = () => {
        if (isClose)
          message.close(() => {
            message.destroy();
          });
        if (no_callback)
          no_callback();
      };
      return message;
    }
  };
  __name(_MessageBox, "MessageBox");
  _MessageBox.tipsQueue = [];
  var MessageBox = _MessageBox;

  // src/core/level.ts
  function getRoleLevelAttributes(id) {
    if (id < 1) {
      console.error("Level ID must be at least 1");
      id = 1;
    }
    let need;
    let exp;
    let attack;
    let defence;
    let health2;
    if (id <= 99) {
      need = 50 * (id - 1) + 100;
      exp = 5 * (id - 1) + 50;
      attack = Math.round(1e3 * Math.pow(1.1, id - 1));
      defence = Math.round(500 * Math.pow(1.1, id - 1));
      health2 = Math.round(5e3 * Math.pow(1.1, id - 1));
    } else {
      let baseNeed = 5e3;
      let baseExp = 540;
      let baseAttack = 11387094;
      let baseDefence = 5702813;
      let baseHealth = 56947219;
      need = Math.round(baseNeed * Math.pow(1.05, id - 99));
      exp = Math.round(baseExp * Math.pow(1.05, id - 99));
      attack = Math.round(baseAttack * Math.pow(1.01, id - 99));
      defence = Math.round(baseDefence * Math.pow(1.01, id - 99));
      health2 = Math.round(baseHealth * Math.pow(1.01, id - 99));
    }
    return { id, need, exp, attack, defence, health: health2 };
  }
  __name(getRoleLevelAttributes, "getRoleLevelAttributes");

  // src/ui/Jinhua.ts
  var { regClass } = Laya;
  var Jinhua = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.isAd = false;
    }
    // 广告奖励
    onAwake() {
      Jinhua.instance = this;
      this.dingxiang = this.owner.getChildByName("dingxiang");
      this.dingxiang.visible = false;
      this.owner.no.onClick = () => {
        this.owner.close();
        this.isAd = false;
      };
      this.owner.ok.onClick = () => {
        this.dingxiang.visible = true;
      };
      this.ad = this.owner.getChildByName("ad");
      if (isAndroid())
        this.ad.tip.text = `看广告 +5%`.toStr();
      this.ad.onClick = () => {
        console.log("广告时刻");
        if (isAndroid()) {
          this.ad.active = false;
          playAd(2);
        } else {
          this.isAd = true;
          this.show(false);
        }
      };
    }
    ad_load() {
      this.ad.active = true;
    }
    ad_success() {
      this.isAd = true;
      this.show(false);
    }
    show(isOpen = true) {
      var _a, _b;
      if (isOpen)
        this.owner.open();
      if (!isAndroid()) {
        this.ad.active = !this.isAd && Save.data.player.mimicry > 0;
        this.ad.tip.text = `+5% 次数:`.toStr() + (!this.isAd ? `${Save.data.player.mimicry}` : 0);
      } else
        this.ad.active = !this.isAd;
      this.owner.ok.active = Save.data.game.rebirth > 1;
      let roles = this.list_jinhua();
      let list_role = this.owner.getChildByName("list_role");
      (_a = list_role.renderHandler) == null ? void 0 : _a.clear();
      list_role.array = roles[0];
      list_role.array.length = Math.min(roles[0].length, 6);
      list_role.renderHandler = Laya.Handler.create(this, (item, index) => {
        let data = roles[0][index];
        item.title.text = Main.getRoleName(Config.table.Tbrole.get(data[0])) + `
<font color='#ffffff' size=24>${"成功率:".toStr()}${toPerStr(data[1])}</font>`;
        item.onClick = () => {
          this.onClick(data[0], data[1]);
        };
      }, null, false);
      let list_dingxiang = this.dingxiang.getChildByName("list_dingxiang");
      list_dingxiang.scrollBar.autoHide = true;
      (_b = list_dingxiang.renderHandler) == null ? void 0 : _b.clear();
      list_dingxiang.array = roles[1];
      list_dingxiang.renderHandler = Laya.Handler.create(this, (item, index) => {
        let data = roles[1][index];
        item.getChildByName("Title").text = Main.getRoleName(Config.table.Tbrole.get(data[0]));
        item.tip.text = `<font color='#ffffff' size=24>${"成功率:".toStr()}${toPerStr(data[1])}</font>`;
        item.onClick = () => {
          this.onClick(data[0], data[1]);
        };
      }, null, false);
    }
    onClick(id, rate) {
      let playerData = Save.data.player;
      if (!isAndroid() && this.isAd) {
        this.isAd = false;
        playerData.mimicry = 0;
      } else
        this.isAd = false;
      if (Math.random() < rate) {
        this.owner.close();
        let old = Jinhua.getPower();
        Jinhua.mimicry(id);
        let power = Jinhua.getPower() - old;
        let str = "";
        if (power < 0)
          str = `<font color=red>-${getValueStr(Math.abs(power))}</font>`;
        else
          str = `<font color=green>+${getValueStr(power)}</font>`;
        MessageBox.show("战力：".toStr() + `${str}`, null, null, false);
        Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
      } else {
        const siwang = 0.15;
        if (Math.random() < siwang) {
          Main.instance.player_dead();
          MessageBox.tip(xinximoban.jinhua.shibai1.toStr().replace("^", color_config.xinximoban.shanghai), false);
          this.owner.close();
        } else {
          playerData.level = Math.max(1, playerData.level - 10);
          MessageBox.tip(xinximoban.jinhua.shibai2.toStr().replace("^", color_config.xinximoban.shanghai), false);
          this.show(false);
          if (playerData.level <= 10) {
            this.owner.close();
          }
        }
      }
      Main.instance.update_player();
      Main.instance.update_skill();
      Save.saveGame();
    }
    static getPower() {
      let playerData = Save.data.player;
      let roleData = Config.table.Tbrole.get(playerData.id);
      let levelData = getRoleLevelAttributes(playerData.level);
      let rebirthData = Config.table.Tbrebirth.get(Save.data.game.rebirth);
      let addition = Main.getAddition();
      let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
      let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
      let health2 = Main.getHealth(roleData, levelData, rebirthData, addition);
      return Main.getPower(attack, defence, health2);
    }
    static mimicry(id) {
      const relation = 1.2;
      const noRelation = 0.8;
      let playerData = Save.data.player;
      var roleData = Config.table.Tbrole.get(id);
      var cr = roleData.relations;
      var sr = playerData.relation;
      var keys = Object.keys(sr);
      keys.forEach((key) => {
        if (cr[key])
          sr[key] = Math.floor(sr[key] * relation);
        else
          sr[key] = Math.floor(sr[key] * noRelation);
      });
      playerData.id = id;
      playerData.forget = 0;
      playerData.revive = 3;
      playerData.mimicry = 1;
      if (!Save.data.game.roles[id]) {
        Main.unlockRole(id);
      }
      MessageBox.tip(xinximoban.jinhua.chenggong.toStr().replace("*", Main.getRoleName(roleData)).replace("^", color_config.xinximoban.huixue), false);
    }
    list_jinhua() {
      let playerData = Save.data.player;
      var rare = Config.table.Tbrole.get(playerData.id).rare;
      var quality_type = getMaxKey(playerData.quality);
      var list = Config.table.Tbrole.getDataList();
      var sr = playerData.relation;
      var keys = Object.keys(sr);
      var all2 = 0;
      keys.forEach((key) => {
        all2 += sr[key];
      });
      var map = /* @__PURE__ */ new Map();
      var map2 = /* @__PURE__ */ new Map();
      list.forEach((roleData) => {
        if (Main.isBoss(roleData) && Save.data.game.rewards["boss"] !== 2)
          return;
        if (roleData.rare <= rare)
          return;
        var num = 1;
        var cr = roleData.relations;
        keys.forEach((key) => {
          if (cr[key] && cr[key] > 0) {
            var v = sr[key] / (cr[key] * roleData.race);
            if (v > 1.2)
              v = 1.2;
            if (v < 0.3)
              v = 0.3;
            num *= v;
          }
        });
        keys.forEach((key) => {
          if (cr[key] && cr[key] > 0 && all2 > 0) {
            var v = sr[key] / all2 / cr[key];
            if (v > 1)
              v = 1;
            num *= v;
          }
        });
        if (this.isAd)
          num += Jinhua.ad_rate;
        if (roleData.qualityType === quality_type)
          map.set(roleData.id, Math.min(num, 1));
        if (Save.data.game.roles[roleData.id])
          map2.set(roleData.id, Math.min(num + 0.05, 1));
      });
      let array = [];
      array.push(Array.from(map).sort((a, b) => b[1] - a[1]));
      array.push(Array.from(map2).sort((a, b) => b[1] - a[1]));
      return array;
    }
  };
  __name(Jinhua, "Jinhua");
  Jinhua.ad_rate = 0.05;
  Jinhua = __decorateClass([
    regClass("uU6pGiYKQOmXZ5kV8H6eUQ")
  ], Jinhua);

  // src/mod/endless/save.ts
  function newData() {
    return {
      id: "h1",
      level: 1,
      skills: [],
      curScene: 0,
      refresh: 3,
      revive: 3,
      roles: {},
      isNew: true
    };
  }
  __name(newData, "newData");
  function saveGame(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      Laya.LocalStorage.setItem(key, jsonData);
      GameLog.log("存档保存成功!");
    } catch (error) {
      console.error("Failed to save game:", error);
    }
  }
  __name(saveGame, "saveGame");
  function loadGame(key) {
    try {
      const jsonData = Laya.LocalStorage.getItem(key);
      if (jsonData) {
        GameLog.log("存档加载成功!");
        return JSON.parse(jsonData);
      }
      console.log("No saved found.");
    } catch (error) {
      console.error("Failed to load game:", error);
    }
    return null;
  }
  __name(loadGame, "loadGame");
  function deleteSave(key) {
    Laya.LocalStorage.removeItem(key);
    console.log("Save deleted successfully!");
  }
  __name(deleteSave, "deleteSave");

  // src/ui/Login.ts
  var { regClass: regClass2, property } = Laya;
  var Login = class extends Laya.Script {
    onDestroy() {
      Login.instance = null;
    }
    showLogin(flag) {
      if (flag) {
        this.Login.visible = true;
        this.TapTap.visible = false;
      } else {
        this.Login.visible = false;
        this.TapTap.visible = true;
      }
    }
    onAwake() {
      Login.instance = this;
      this.Login = this.owner.getChildByName("Login");
      this.TapTap = this.owner.getChildByName("TapTap");
      this.TapTap.onClick = () => {
        login();
      };
      if (!isAndroid())
        this.showLogin(true);
      else
        this.showLogin(Login.isLogin);
      const list = ["CHS", "EN", "CHT", "JP", "KR", "VN"];
      this.ComboBox.dataSource = ["简体中文", "English", "繁體中文", "日本語", "한국어", "Tiếng Việt"];
      this.ComboBox.selectedIndex = list.indexOf(Language.key);
      this.ComboBox.visibleNum = list.length;
      this.Delete.onClick = () => {
        MessageBox.show("是否删除存档？", () => {
          Save.data = Save.newGame();
          Save.data.player.forget = 0;
          Save.data.player.revive = 3;
          Save.data.player.mimicry = 1;
          Save.saveGame();
        });
      };
      this.Scene1.onClick = () => {
        Laya.Scene.open("Scene.ls");
      };
      this.settings.onClick = () => {
        this.settingsPanel.open();
      };
      this.no.onClick = () => {
        this.settingsPanel.close();
      };
      this.ok.onClick = () => {
        let key = list[this.ComboBox.selectedIndex];
        Language.setLanguage(key);
        Save.data.setting.music = this.musicBar.value / 100;
        Save.data.setting.sound = this.soundBar.value / 100;
        Laya.SoundManager.setMusicVolume(Save.data.setting.music);
        Laya.SoundManager.setSoundVolume(Save.data.setting.sound);
        Laya.SoundManager.soundMuted = Save.data.setting.sound === 0;
        Laya.SoundManager.musicMuted = Save.data.setting.music === 0;
        let font_style = this.sys_tog.selected ? "system" : "default";
        Laya.Config.defaultFont = font_style === "system" ? null : "AlimamaDaoLiTi";
        Laya.LocalStorage.setItem("font", font_style);
        Save.saveGame();
        Laya.Scene.open("Login.ls");
      };
      this.sys_tog.clickHandler = Laya.Handler.create(this, () => {
        this.sys_tog.selected = true;
        this.sel_tog.selected = false;
      }, null, false);
      this.sel_tog.clickHandler = Laya.Handler.create(this, () => {
        this.sys_tog.selected = false;
        this.sel_tog.selected = true;
      }, null, false);
      if (Laya.Config.defaultFont === null)
        this.sel_tog.selected = true;
      else
        this.sys_tog.selected = true;
      Laya.SoundManager.setMusicVolume(Save.data.setting.music);
      Laya.SoundManager.setSoundVolume(Save.data.setting.sound);
      Laya.SoundManager.playMusic(Config.sounds.get("bgm"));
      Laya.SoundManager.soundMuted = Save.data.setting.sound === 0;
      Laya.SoundManager.musicMuted = Save.data.setting.music === 0;
      this.musicBar.value = Save.data.setting.music * 100;
      this.soundBar.value = Save.data.setting.sound * 100;
      let font = Laya.LocalStorage.getItem("font");
      if (font)
        this.sys_tog.selected = font === "system";
      else
        this.sys_tog.selected = false;
      this.sel_tog.selected = !this.sys_tog.selected;
      let func = /* @__PURE__ */ __name((d) => {
        EndlessScene.data = d;
        Laya.Scene.open("Scene2.ls");
      }, "func");
      this.Scene2.onClick = () => {
        let data = loadGame("endless");
        if (data) {
          let box = MessageBox.show("发现存档，是否继续游戏进度？", () => {
            func(newData());
          }, () => {
            func(data);
          });
          box.ok.title.text = "重新开始".toStr();
          box.no.title.text = "继续".toStr();
        } else {
          func(newData());
        }
      };
    }
  };
  __name(Login, "Login");
  __decorateClass([
    property({ type: Laya.Sprite })
  ], Login.prototype, "Scene1", 2);
  __decorateClass([
    property({ type: Laya.Sprite })
  ], Login.prototype, "Scene2", 2);
  __decorateClass([
    property({ type: Laya.Sprite })
  ], Login.prototype, "Delete", 2);
  __decorateClass([
    property({ type: Laya.Sprite })
  ], Login.prototype, "settings", 2);
  __decorateClass([
    property({ type: Laya.ComboBox })
  ], Login.prototype, "ComboBox", 2);
  __decorateClass([
    property({ type: Laya.Sprite })
  ], Login.prototype, "settingsPanel", 2);
  __decorateClass([
    property({ type: Laya.Sprite })
  ], Login.prototype, "ok", 2);
  __decorateClass([
    property({ type: Laya.Sprite })
  ], Login.prototype, "no", 2);
  __decorateClass([
    property({ type: Laya.HSlider })
  ], Login.prototype, "musicBar", 2);
  __decorateClass([
    property({ type: Laya.HSlider })
  ], Login.prototype, "soundBar", 2);
  __decorateClass([
    property({ type: Laya.Radio })
  ], Login.prototype, "sys_tog", 2);
  __decorateClass([
    property({ type: Laya.Radio })
  ], Login.prototype, "sel_tog", 2);
  Login = __decorateClass([
    regClass2("TlP4VuJYRPGWMB0BrP_Qew")
  ], Login);

  // src/platform.ts
  function loadOldData() {
    window.Android.loadOldData();
  }
  __name(loadOldData, "loadOldData");
  function loaded() {
    window.Android.loaded();
  }
  __name(loaded, "loaded");
  function isAndroid() {
    return typeof window.Android !== "undefined";
  }
  __name(isAndroid, "isAndroid");
  function playAd(state) {
    window.Android.playAd(state);
  }
  __name(playAd, "playAd");
  function login() {
    window.Android.login();
  }
  __name(login, "login");
  window["onTapTapLogin"] = function(flag) {
    var _a;
    console.log("onTapTapLogin", flag);
    Login.isLogin = flag;
    (_a = Login.instance) == null ? void 0 : _a.showLogin(flag);
  };
  window["onAdLoaded"] = function(state) {
    var _a, _b;
    if (state == 1) {
      (_a = Main.instance) == null ? void 0 : _a.fuhuo_load();
    } else if (state == 2) {
      (_b = Jinhua.instance) == null ? void 0 : _b.ad_load();
    }
  };
  window["onAdRewarded"] = function(state) {
    var _a, _b;
    if (state == 1) {
      (_a = Main.instance) == null ? void 0 : _a.fuhuo_success();
    } else if (state == 2) {
      (_b = Jinhua.instance) == null ? void 0 : _b.ad_success();
    }
  };
  window["onAdNotReady"] = function(state) {
    let ui = MessageBox.show("广告未准备好!".toStr(), () => {
      playAd(state);
    });
    ui.ok.title.text = "再次发送".toStr();
  };
  window["changeData"] = function(old) {
    let data = Save.newGame();
    if (old) {
      let game = data.game;
      let player = data.player;
      player.id = old.name.indexOf("b") === 0 ? old.name : "h" + old.name;
      player.level = old.level;
      player.exp = old.jingyan;
      player.quality.ling = old.ling;
      player.quality.xian = old.xian;
      player.quality.shen = old.shen;
      player.relation.chi = old.chi;
      player.relation.hui = old.hui;
      player.relation.lin = old.lin;
      player.relation.mao = old.mao;
      player.relation.jia = old.jia;
      player.relation.luo = old.luo;
      player.relation.yu = old.yu;
      player.relation.zhao = old.zhao;
      player.relation.ti = old.ti;
      player.relation.jiao = old.jiao;
      player.relation.zhi = old.zhi;
      player.forget = old.yiwang;
      game.rebirth = old.lun - 1;
      player.curScene = Number(old.curScene.name.split("_")[1]);
      player.maxScene = Number(old.curScene.maxScene.split("_")[1]);
      for (const key in old.scenes) {
        const scene = old.scenes[key];
        let scene2 = data.player.scenes[key.split("_")[1]];
        if (scene2) {
          scene2.count = scene.count;
          scene2.pass = scene.islock === 1 ? 0 : 1;
          if (scene2.boss.indexOf("b") !== 0)
            scene2.boss = "h" + scene.boss;
          scene2.level = scene.level;
        }
      }
      for (const key in old.heroes) {
        if (key.indexOf("b") === 0)
          game.roles[key] = old.heroes[key];
        else
          game.roles["h" + key] = old.heroes[key];
      }
      for (const key in old.jisha) {
        if (key.indexOf("b") === 0)
          game.kills[key] = old.jisha[key];
        else
          game.kills["h" + key] = old.jisha[key];
      }
      old.skills.forEach((skill4) => {
        if (Config.table.Tbskill.get(skill4))
          player.skills.push(skill4);
      });
    }
    start(data);
  };
  window.onerror = function(message, source, lineno, colno, error) {
    console.error("JS Error:", message, "at", source, lineno + ":" + colno);
  };

  // src/Main.ts
  function main() {
    return __async(this, null, function* () {
      let label = Laya.stage.addChild(new Laya.Label());
      Language.init();
      yield Config.load_config();
      label.dataSource = { text: tishi[Math.floor(Math.random() * tishi.length)].toStr(), x: 60, width: Laya.stage.width - 120, height: Laya.stage.height, wordWrap: true, align: "center", valign: "middle", fontSize: 30, color: "#ffffff" };
      yield Config.load_sound();
      yield Config.load_prefab();
      GameLog.log("----------开局一只史莱姆----------");
      Save.init();
    });
  }
  __name(main, "main");
  function start(data) {
    Laya.stage.destroyChildren();
    if (data)
      Save.data = data;
    Laya.Scene.open("Login.ls", false, null, Laya.Handler.create(null, () => {
      if (isAndroid())
        loaded();
    }));
  }
  __name(start, "start");

  // src/core/save.ts
  var _Save = class _Save {
    static reset(id = "h1") {
      var _a, _b;
      let data = {
        id,
        quality: {
          none: 0
        },
        relation: {
          chi: 0,
          hui: 0,
          lin: 0,
          mao: 0,
          jia: 0,
          luo: 0,
          yu: 0,
          zhao: 0,
          ti: 0,
          jiao: 0,
          zhi: 0
        },
        exp: 0,
        level: 1,
        forget: 0,
        revive: 3,
        mimicry: 1,
        skills: [],
        curScene: 1,
        maxScene: 0,
        scenes: {}
      };
      Config.table.Tbmap_level.getDataList().forEach((scene) => {
        data.scenes[scene.id] = {
          count: 0,
          pass: 0,
          boss: Main.getBoss(scene),
          level: Main.getLevel(scene)
        };
      });
      if (((_a = this.data) == null ? void 0 : _a.game.rebirth) >= 3)
        data.skills.push("jiexi");
      if ((_b = this.data) == null ? void 0 : _b.player) {
        data.forget = this.data.player.forget;
        data.revive = this.data.player.revive;
        data.mimicry = this.data.player.mimicry;
      }
      return data;
    }
    static newGame() {
      const id = "h1";
      let data = {
        player: _Save.reset(id),
        game: {
          isNew: true,
          rebirth: 0,
          roles: {},
          kills: {},
          achieves: {},
          rewards: {
            "level": 0,
            "skill": 0,
            "boss": 0
          }
        },
        setting: {
          auto: false,
          mute: false,
          music: 0.5,
          sound: 0.5
        }
      };
      Config.table.Tbrole.getDataList().forEach((role2) => {
        data.game.roles[role2.id] = 0;
        data.game.kills[role2.id] = 0;
      });
      data.game.roles[data.player.id] = 1;
      Config.table.Tbachieve.getDataList().forEach((achieve2) => {
        data.game.achieves[achieve2.id] = 0;
      });
      return data;
    }
    static init() {
      let data = this.loadGame();
      if (!data) {
        if (isAndroid()) {
          loadOldData();
          return;
        } else
          data = this.newGame();
      }
      start(data);
    }
    // 保存游戏
    static saveGame() {
      try {
        const jsonData = JSON.stringify(this.data);
        Laya.LocalStorage.setItem(_Save.SAVE_KEY, jsonData);
        GameLog.log("存档保存成功!");
      } catch (error) {
        console.error("Failed to save game:", error);
      }
    }
    // 读取游戏
    static loadGame() {
      try {
        const jsonData = Laya.LocalStorage.getItem(_Save.SAVE_KEY);
        if (jsonData) {
          GameLog.log("存档加载成功!");
          return JSON.parse(jsonData);
        }
        console.log("No saved found.");
      } catch (error) {
        console.error("Failed to load game:", error);
      }
      return null;
    }
    // 删除存档
    static deleteSave() {
      Laya.LocalStorage.removeItem(_Save.SAVE_KEY);
      console.log("Save deleted successfully!");
    }
  };
  __name(_Save, "Save");
  _Save.SAVE_KEY = "game_save";
  var Save = _Save;

  // src/ui/Mingzi.ts
  var { regClass: regClass3 } = Laya;
  var Mingzi = class extends Laya.Script {
    onAwake() {
      this.owner.color = "#545454";
      this.owner.onClick = () => {
        Tujian.instance.show_role(this.data);
      };
    }
    show(data) {
      this.data = data;
      this.owner.title.text = Save.data.game.roles[this.data.id] ? Main.getRoleName(this.data) : `${Main.getQualityStr(this.data.qualityType).toStr()}·${this.data.name.toStr()}`;
    }
  };
  __name(Mingzi, "Mingzi");
  Mingzi = __decorateClass([
    regClass3("0iiTFqnPTyC5E64Nz3i2Fg")
  ], Mingzi);

  // src/ui/SkillTip.ts
  var { regClass: regClass4 } = Laya;
  var SkillTip = class extends Laya.Script {
    onAwake() {
      this.owner.ok.onClick = () => {
        let playerData = Save.data.player;
        let level = (playerData.forget + 1) * 5;
        if (playerData.level < level) {
          MessageBox.tip(xinximoban.buzu);
          return;
        }
        playerData.level -= level;
        playerData.forget += 1;
        MessageBox.tip("遗忘技能".toStr() + `·<font color='${color_config.xinximoban.skill}'>${this.data.name.toStr()}</font>`, false);
        playerData.skills.splice(playerData.skills.indexOf(this.data.id), 1);
        Main.instance.update_player();
        Main.instance.update_skill();
        this.owner.close();
        Save.saveGame();
      };
      this.owner.no.onClick = () => {
        this.owner.close();
      };
    }
    show(data, isOk) {
      if (!isOk) {
        this.owner.ok.visible = false;
        this.owner.no.x = 285;
      } else {
        this.owner.ok.visible = true;
        this.owner.no.x = 420;
      }
      this.owner.parent.setChildIndex(this.owner, this.owner.parent.numChildren - 1);
      this.data = data;
      let level = (Save.data.player.forget + 1) * 5;
      this.owner.ok.tip.text = "需要等级>".toStr() + level;
      this.owner.Label.text = `<font color='#ffe900' size=40>${data.name.toStr()}</font>

${data.description.toStr()}`;
      this.owner.open();
    }
  };
  __name(SkillTip, "SkillTip");
  SkillTip = __decorateClass([
    regClass4("TeBj67zKTwymfmLpcRf_Aw")
  ], SkillTip);

  // src/ui/SkillView.ts
  var { regClass: regClass5 } = Laya;
  var SkillView = class extends Laya.Script {
    onStart() {
      let btn = this.owner;
      btn.color = "#FF4900";
      btn.onClick = () => {
        if (!this.data)
          return;
        Main.instance.SkillTip.getComponent(SkillTip).show(this.data, this.isForget);
      };
    }
    show(id, isForget = false) {
      var _a, _b;
      this.isForget = isForget;
      this.data = Config.table.Tbskill.get(id);
      if (id && !this.data) {
        console.error(`技能${id}不存在!`);
        return;
      }
      this.owner.title.text = (_b = (_a = this.data) == null ? void 0 : _a.name.toStr()) != null ? _b : "";
    }
  };
  __name(SkillView, "SkillView");
  SkillView = __decorateClass([
    regClass5("vdLRBex-Roidhl5M9zhxuA")
  ], SkillView);

  // src/ui/Tujian.ts
  var { regClass: regClass6 } = Laya;
  var Tujian = class extends Laya.Script {
    onAwake() {
      Tujian.instance = this;
      this.owner.no.onClick = () => {
        Main.instance.update_skill();
        Main.instance.update_player();
        this.owner.close();
        Save.saveGame();
      };
      this.owner.ok.onClick = () => {
        let achieves = Config.table.Tbachieve.getDataList();
        achieves.forEach((data) => {
          if (Save.data.game.achieves[data.id] === 1) {
            Chengjiu.reward(data);
          }
        });
        Main.instance.Tujian.getComponent(Tujian).show(false);
      };
    }
    show(isOpen = true) {
      var _a, _b;
      if (isOpen)
        this.owner.open();
      let str = "";
      let count = 0;
      let achieves = Config.table.Tbachieve.getDataList();
      achieves.forEach((data) => {
        if (Save.data.game.achieves[data.id] > 0) {
          count++;
        }
      });
      str += "成就完成率:".toStr() + toPerStr(count / achieves.length);
      count = 0;
      let roles = Config.table.Tbrole.getDataList();
      roles.forEach((data) => {
        if (Save.data.game.roles[data.id])
          count++;
      });
      str += "\n" + "图鉴完成率:".toStr() + toPerStr(count / roles.length);
      this.owner.Label.text = str;
      let list_chengjiu = this.owner.getChildByName("list_chengjiu");
      list_chengjiu.scrollBar.autoHide = true;
      (_a = list_chengjiu.renderHandler) == null ? void 0 : _a.clear();
      list_chengjiu.array = achieves;
      list_chengjiu.renderHandler = Laya.Handler.create(this, (item, index) => {
        item.getComponent(Chengjiu).show(index + 1);
      }, null, false);
      let list_tujian = this.owner.getChildByName("list_tujian");
      list_tujian.scrollBar.autoHide = true;
      (_b = list_tujian.renderHandler) == null ? void 0 : _b.clear();
      list_tujian.array = roles;
      list_tujian.renderHandler = Laya.Handler.create(this, (item, index) => {
        item.getComponent(Mingzi).show(roles[index]);
      }, null, false);
      this.show_role(Config.table.Tbrole.get("h1"));
    }
    show_role(roleData) {
      var _a, _b;
      this.owner.getChildByName("Name").text = Main.getRoleName(roleData);
      let lock = !Save.data.game.roles[roleData.id];
      let str = "";
      if (roleData.rare < 4 && lock) {
        str = "击杀解锁".toStr() + `
(${Save.data.game.kills[roleData.id]}/${killCount[roleData.rare - 1]})`;
      }
      if (Main.isBoss(roleData) && Save.data.game.rewards["boss"] === 0) {
        str = "无法拟态需成就解锁".toStr();
      }
      this.owner.getChildByName("Lock").text = str;
      this.owner.getChildByName("Chengzhang").text = `${"攻击成长:".toStr()}<font color='#78D658'>${roleData.attackRate}</font>
${"防御成长:".toStr()}<font color='#78D658'>${roleData.defenceRate}</font>
${"血量成长:".toStr()}<font color='#78D658'>${roleData.healthRate}</font>`;
      this.owner.getChildByName("Jiacheng").text = `${"攻击:".toStr()}<font color='#ffffff'>${getValueStr(roleData.attackAdd)}</font>
${"防御:".toStr()}<font color='#ffffff'>${getValueStr(roleData.defenceAdd)}</font>
${"血量:".toStr()}<font color='#ffffff'>${getValueStr(roleData.healthAdd)}</font>`;
      let list_shuxing = this.owner.getChildByName("list_shuxing");
      var cr = roleData.relations;
      var r = roleData.race * roleData.remain * shift_config.zhongzu_shift;
      let relations = [];
      for (let key in roleData.relations) {
        var v = toInt(((_a = cr[key]) != null ? _a : 0) * r);
        const typedKey = key;
        if (v > 0)
          relations.push(`${shuxing_config[typedKey].toStr()}:<font color='#ffffff'>${lock ? "???" : getValueStr(v)}</font>`);
      }
      list_shuxing.dataSource = relations;
      let list_skill = this.owner.getChildByName("list_skill");
      list_skill.scrollBar.autoHide = true;
      (_b = list_skill.renderHandler) == null ? void 0 : _b.clear();
      list_skill.dataSource = roleData.skills;
      list_skill.renderHandler = Laya.Handler.create(this, (item, index) => {
        item.getComponent(SkillView).show(roleData.skills[index]);
      }, null, false);
    }
  };
  __name(Tujian, "Tujian");
  Tujian = __decorateClass([
    regClass6("qiBKDC1JT7uCFMZAu-ASTg")
  ], Tujian);

  // src/ui/Chengjiu.ts
  var { regClass: regClass7 } = Laya;
  var Chengjiu = class extends Laya.Script {
    onAwake() {
      this.owner.onClick = () => {
        Chengjiu.reward(this.data);
        Main.instance.Tujian.getComponent(Tujian).show(false);
      };
    }
    show(id) {
      let data = Config.table.Tbachieve.get(id);
      this.data = data;
      let frame = this.owner.getChildByName("Frame");
      let label = frame.getChildByName("Title");
      let tip = frame.getChildByName("Tip");
      let cur = Chengjiu.getCount(data);
      let max = data.count;
      let str;
      if (cur < max) {
        str = `(${cur}/${max})`;
        tip.color = "#6AB548";
      } else {
        str = "完成".toStr();
        tip.color = "#c58237";
      }
      tip.text = str;
      label.text = data.description.toStr();
      this.owner.tip.text = data.rewardStr.toStr();
      let state = Save.data.game.achieves[id];
      if (state === 1) {
        this.owner.title.text = "领取奖励".toStr();
        this.owner.active = true;
      } else {
        if (state === 2)
          this.owner.title.text = "已领取".toStr();
        else
          this.owner.title.text = "未完成".toStr();
        this.owner.active = false;
      }
    }
    static reward(data) {
      Save.data.game.achieves[data.id] = 2;
      if (data.rewardType === "random") {
        var lockList = Config.table.Tbrole.getDataList().filter((role3) => {
          return !Save.data.game.roles[role3.id];
        });
        if (lockList.length > 0) {
          var role2 = lockList[Math.floor(Math.random() * lockList.length)];
          Main.unlockRole(role2.id);
        } else {
          MessageBox.tip("所有图鉴已解锁");
        }
      } else {
        MessageBox.tip(data.rewardStr);
        Save.data.game.rewards[data.rewardType]++;
      }
    }
    static getCount(item) {
      if (item.type === "map") {
        return Save.data.player.maxScene;
      }
      if (item.type === "rebirth") {
        return Save.data.game.rebirth;
      }
      if (item.type === "kill") {
        return Save.data.game.kills[item.target];
      }
      return 0;
    }
    static addCount(type, target) {
      let achieves = Config.table.Tbachieve.getDataList();
      let achievesData = Save.data.game.achieves;
      if (target) {
        Save.data.game.kills[target]++;
        var role2 = Config.table.Tbrole.get(target);
        if (role2.rare < 4 && !Save.data.game.roles[target]) {
          if (Save.data.game.kills[target] >= killCount[role2.rare - 1]) {
            Main.unlockRole(target);
          }
        }
      }
      achieves.forEach((item) => {
        if (achievesData[item.id] > 0)
          return;
        if (item.type === type) {
          if (type === "map" && item.count <= Save.data.player.maxScene || (type === "rebirth" && item.count <= Save.data.game.rebirth || target && type === "kill" && item.target === target && item.count <= Save.data.game.kills[target])) {
            achievesData[item.id] = 1;
            MessageBox.show("达成：".toStr() + `${item.description.toStr()}`, null, null, false);
          }
        }
      });
    }
  };
  __name(Chengjiu, "Chengjiu");
  Chengjiu = __decorateClass([
    regClass7("3TX1KPIcRt2UJAt_EmF5Pg")
  ], Chengjiu);

  // src/ui/HPBar.ts
  var { regClass: regClass8, property: property2 } = Laya;
  var HPBar = class extends Laya.Script {
    onAwake() {
      if (!this.bg) {
        this.bg = this.owner.addChild(new Laya.Sprite());
        this.bar = this.bg.addChild(new Laya.Sprite());
        this.bg.size(160, 16);
        this.bg.pos(35, 88);
        this.bar.size(158, 14);
        this.bar.pos(1, 1);
        this.bg.graphics.drawRect(0, 0, 1, 1, "#313c3c", "#ffffff").percent = true;
        this.drawRect = this.bar.graphics.drawRect(0, 0, 1, 1, "#ff0000");
        this.drawRect.percent = true;
      }
      this.originalWidth = this.bar.width;
      this.setValue(0, false);
    }
    /**
     * 设置血量百分比
     * @param percent 0-1之间的数值
     * @param smooth 是否使用平滑动画
     */
    setValue(percent, smooth = true) {
      const targetWidth = this.originalWidth * Math.min(Math.max(percent, 0), 1);
      if (smooth) {
        Laya.Tween.to(this.bar, { width: targetWidth }, 200);
      } else {
        this.bar.width = targetWidth;
      }
    }
    /**
     * 设置血条颜色
     * @param color 十六进制颜色值（例如：#FF0000）
     */
    setColor(color) {
      if (this.drawRect)
        this.drawRect.fillColor = color;
    }
  };
  __name(HPBar, "HPBar");
  __decorateClass([
    property2({ type: Laya.Sprite })
  ], HPBar.prototype, "bg", 2);
  __decorateClass([
    property2({ type: Laya.Sprite })
  ], HPBar.prototype, "bar", 2);
  HPBar = __decorateClass([
    regClass8("uO32Pu0TShWyXIQxB9XMyw")
  ], HPBar);

  // src/core/buff.ts
  var _BuffMgr = class _BuffMgr {
    /**
     * 根据阵营获取对应的buff列表
     * @param camp 阵营标识（'player'/'enemy'）
     * @returns 对应的buff数组
     */
    static getList(camp) {
      return camp == "player" ? this.playerBuff : this.enemyBuff;
    }
    static getBuff(owner, data) {
      var _a;
      let list = this.getList(owner.camp);
      return (_a = list.find((buff) => buff.data.id === data.id)) != null ? _a : null;
    }
    /**
     * 创建buff实例并存入对应阵营列表
     * @param owner buff持有者
     * @param data buff配置数据
     * @returns 创建的buff实例
     */
    static createBuff(owner, data) {
      let buff;
      switch (data.type) {
        case 3 /* all */:
          buff = new all(data, owner);
          break;
        default:
          buff = new BaseBuff(data, owner);
          break;
      }
      this.getList(owner.camp).push(buff);
      return buff;
    }
    /**
     * 添加buff到对应的存储列表
     * @param role 作用目标角色
     * @param owner buff持有者
     * @param data buff配置数据
     */
    static addBuff(owner, data) {
      if (data.buffRound === void 0)
        return;
      let buff = this.getBuff(owner, data);
      if (buff) {
        if (buff.reapply())
          return;
      }
      buff = this.createBuff(owner, data);
      if (buff == null)
        return;
      buff.apply();
      if (data.buffRound === 0) {
        this.tempBuff.push(buff);
        return;
      } else if (data.buffRound === -1) {
        this.permanentBuff.push(buff);
        return;
      }
      let key = owner.camp + data.name;
      if (!this.buffs.has(key)) {
        this.buffs.set(key, buff);
      }
    }
    /**
     * 从指定阵营列表中移除特定buff
     * @param owner 持有者角色（用于确定阵营）
     * @param buff 要移除的buff实例
     */
    static removeBuffByOwner(owner, buff) {
      let list = this.getList(owner.camp);
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i] === buff) {
          list.splice(i, 1);
          break;
        }
      }
    }
    static is(owner, type) {
      var _a, _b;
      return (_b = (_a = this.getList(owner.camp)) == null ? void 0 : _a.some((buff) => buff.type === type)) != null ? _b : false;
    }
    static clearTemp() {
      if (this.tempBuff.length === 0)
        return;
      this.tempBuff.forEach((buff) => buff.remove());
      this.tempBuff.length = 0;
    }
    static clearByRevive(owner) {
      this.clearTemp();
      const keysToDelete = [];
      for (const [key, buff] of this.buffs) {
        if (buff.owner === owner) {
          buff.remove();
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach((key) => this.buffs.delete(key));
    }
    static clear() {
      this.playerBuff.length = 0;
      this.enemyBuff.length = 0;
      this.tempBuff.length = 0;
      this.permanentBuff.length = 0;
      this.buffs.clear();
    }
    static updateBuffs(key) {
      if (this.buffs.has(key)) {
        const currentBuff = this.buffs.get(key);
        currentBuff.updateBuffs();
      }
    }
    //   static updateBuffs(key: string) {
    //         if (this.buffs.has(key)) {
    //             for (let buff of this.buffs.get(key)) {
    //                 if (buff.updateBuffs()) this.buffs.set(key, this.buffs.get(key).filter(b => b !== buff));
    //             }
    //         }
    //     }
  };
  __name(_BuffMgr, "BuffMgr");
  /** 玩家阵营的buff列表 */
  _BuffMgr.playerBuff = [];
  /** 敌人阵营的buff列表 */
  _BuffMgr.enemyBuff = [];
  /** 临时buff列表（每回合结束时清空） */
  _BuffMgr.tempBuff = [];
  /** 永久生效的buff列表 */
  _BuffMgr.permanentBuff = [];
  /** 按触发条件分类的buff存储（键格式：阵营+技能名称） */
  _BuffMgr.buffs = /* @__PURE__ */ new Map();
  var BuffMgr = _BuffMgr;
  var _BaseBuff = class _BaseBuff {
    /**
     * 初始化基础属性
     * @param data 配置表数据
     * @param owner 持有者角色
     */
    constructor(data, owner) {
      this.data = data;
      this.owner = owner;
      this.name = data.name;
      this.duration = data.buffRound;
      this.type = data.type;
      console.log(`${this.name} created with duration: ${this.duration} `);
    }
    /** 应用buff效果（子类实现） */
    apply() {
    }
    /** 移除buff的通用逻辑 */
    remove() {
      console.log(`${this.name} removed from ${this.owner.camp} `);
      BuffMgr.removeBuffByOwner(this.owner, this);
      const key = this.owner.camp + this.name;
      if (BuffMgr.buffs.has(key) && BuffMgr.buffs.get(key) === this) {
        BuffMgr.buffs.delete(key);
      }
    }
    reapply() {
      this.duration = this.data.buffRound;
      return true;
    }
    /**
     * 更新buff状态
     * @returns 是否需要移除（true表示已过期）
     */
    updateBuffs() {
      this.duration--;
      console.log(`${this.name} remaining duration: ${this.duration} `);
      if (this.duration <= 0)
        this.remove();
    }
  };
  __name(_BaseBuff, "BaseBuff");
  var BaseBuff = _BaseBuff;
  var _all = class _all extends BaseBuff {
    constructor() {
      super(...arguments);
      /** 攻击力加成值 */
      this.attack = 0;
      /** 防御力加成值 */
      this.defence = 0;
    }
    /**
     * 应用百分比加成的属性效果
     */
    apply() {
      console.log(`Applying ${this.name} to ${this.owner.camp} `);
      if (this.data.values.has("1")) {
        let per = Number(this.data.values.get("1"));
        this.attack = toInt(per * this.owner.attack.value);
        console.log(`${this.owner.camp} gains + ${this.attack} attack.`);
        this.owner.attack.add(this.attack);
      }
      if (this.data.values.has("2")) {
        let per = Number(this.data.values.get("2"));
        this.defence = toInt(per * this.owner.defence.value);
        console.log(`${this.owner.camp} gains + ${this.defence} defence.`);
        this.owner.defence.add(this.defence);
      }
    }
    /**
     * 移除时还原属性加成
     */
    remove() {
      console.log(`Removing ${this.name} from ${this.owner.camp} `);
      if (this.attack != 0) {
        this.owner.attack.add(-this.attack);
        console.log(`${this.owner.camp} loses ${this.attack} attack.`);
      }
      if (this.defence != 0) {
        this.owner.defence.add(-this.defence);
        console.log(`${this.owner.camp} loses ${this.defence} defence.`);
      }
      super.remove();
    }
    reapply() {
      if (this.data.buffRound > 0)
        return false;
      super.reapply();
      if (this.data.values.has("1")) {
        let temp = this.attack;
        let per = Number(this.data.values.get("1"));
        this.attack = toInt(per * this.owner.attack.value) + temp;
        console.log(`${this.owner.camp} gains + ${this.attack} attack.`);
        this.owner.attack.add(-temp);
        this.owner.attack.add(this.attack);
      }
      if (this.data.values.has("2")) {
        let temp = this.defence;
        let per = Number(this.data.values.get("2"));
        this.defence = toInt(per * this.owner.defence.value) + temp;
        console.log(`${this.owner.camp} gains + ${this.defence} defence.`);
        this.owner.defence.add(-temp);
        this.owner.defence.add(this.defence);
      }
      return true;
    }
  };
  __name(_all, "all");
  var all = _all;

  // src/ui/RoleView.ts
  var { regClass: regClass9 } = Laya;
  var RoleView = class extends Laya.Script {
    onAwake() {
      this.animator = this.owner.getComponent(Laya.Animator2D);
      this.original_x = this.owner.x;
      this.original_y = this.owner.y;
      this.hpBar = this.owner.getComponent(HPBar);
      this.owner.onClick = () => {
        Main.instance.Enemy.getComponent(RoleView).show(this.data.id, this.level);
        Main.instance.show_battle(this.data.id, this.level, false);
      };
    }
    init(rate, id, level) {
      let roleData = Config.table.Tbrole.get(id);
      this.data = roleData;
      this.level = level;
      this.owner.title.text = Main.getRoleName(roleData);
      this.owner.image.getChildByName("Level").text = `Lv.${level}`;
      let levelData = getRoleLevelAttributes(level);
      let attack = toInt(levelData.attack * roleData.attackRate * rate);
      let defence = toInt(levelData.defence * roleData.defenceRate * rate);
      let health2 = toInt(levelData.health * roleData.healthRate * rate);
      let power = Main.getPower(attack, defence, health2);
      this.owner.image.getChildByName("Tip").text = "战力:".toStr() + `${getValueStr(power)}`;
    }
    show(id, level, power) {
      let roleData = Config.table.Tbrole.get(id);
      this.data = roleData;
      this.level = level;
      this.owner.title.text = Main.getRoleName(roleData);
      this.owner.image.getChildByName("Level").text = `Lv.${level}`;
      if (power)
        this.owner.image.getChildByName("Tip").text = "战力:".toStr() + `${getValueStr(power)}`;
    }
    show_skin(isBoss) {
      if (isBoss) {
        this.owner.image.skin = `resources/image/boss.png`;
        this.owner.image.color = "#9A1919";
      } else {
        this.owner.image.skin = `resources/image/enemy.png`;
        this.owner.image.color = "#666b6f";
      }
    }
    event_damage() {
      Laya.SoundManager.playSound(Config.sounds.get("att"));
      this.role.attackAction();
    }
    event_end() {
      BuffMgr.clearTemp();
      Main.instance.battle.round(this.role.target);
    }
    play_anim(name) {
      this.owner.parent.setChildIndex(this.owner, this.owner.parent.numChildren - 1);
      this.animator.play(name, 0, 0);
    }
  };
  __name(RoleView, "RoleView");
  RoleView = __decorateClass([
    regClass9("GkQGXdX0S-eACaQKWc1P0w")
  ], RoleView);

  // src/ui/DamagePool.ts
  var _DamagePool = class _DamagePool {
    static getDamageLabel() {
      let label = this.damageLabelPool.pop();
      if (!label) {
        label = new Laya.Label();
        label.bold = true;
        label.fontSize = 32;
        label.anchorX = 0.5;
        label.width = 300;
        label.align = "center";
      }
      label.visible = true;
      label.alpha = 1;
      label.scale(1, 1);
      Main.instance.Damages.addChild(label);
      return label;
    }
    static recycleDamageLabel(label) {
      label.removeSelf();
      label.visible = false;
      this.damageLabelPool.push(label);
    }
    static show(label) {
      const duration = 1e3;
      const y = label.y;
      label.alpha = 0;
      Laya.Tween.to(label, { alpha: 1 }, 200);
      Laya.Tween.to(label, { y: y - 50, scale: 1.5 }, duration / 2, null, Laya.Handler.create(this, () => {
        Laya.Tween.to(label, { y: y - 100, scale: 0.5, alpha: 0 }, duration / 2, null, Laya.Handler.create(this, () => {
          _DamagePool.recycleDamageLabel(label);
        }));
      }));
    }
    static showDamage(value, role2) {
      const label = this.getDamageLabel();
      label.text = `-${getValueStr(-value)}`;
      label.color = "#ee123d";
      label.pos(role2.original_x, role2.original_y - 80);
      this.show(label);
    }
    static showHeal(value, role2) {
      const label = this.getDamageLabel();
      label.text = `+${getValueStr(value)}`;
      label.color = "#12ee64";
      label.pos(role2.original_x, role2.original_y);
      const x = label.x;
      label.x = x + (Math.random() * 100 - 50);
      this.show(label);
    }
    static showDodge(role2) {
      const label = this.getDamageLabel();
      label.text = "闪避".toStr();
      label.color = "#12eee0";
      label.pos(role2.original_x, role2.original_y);
      const bounceHeight = 30;
      const duration = 600;
      const x = label.x;
      const y = label.y;
      label.x = x + (Math.random() * 100 - 50);
      label.y = y;
      label.alpha = 0;
      Laya.Tween.to(label, { alpha: 1 }, 200, null, null, 0);
      Laya.Tween.to(label, { alpha: 0.8 }, 100, null, null, 200);
      Laya.Tween.to(label, { alpha: 1 }, 100, null, null, 300);
      Laya.Tween.to(label, {
        y: y - bounceHeight,
        scale: 1.2
      }, duration / 4, null, Laya.Handler.create(
        this,
        () => {
          Laya.Tween.to(label, {
            y: y - bounceHeight / 2,
            scale: 1
          }, duration / 4, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(label, {
              y: y - 10,
              scale: 0.8,
              alpha: 0
            }, duration / 2, null, Laya.Handler.create(this, () => {
              _DamagePool.recycleDamageLabel(label);
            }));
          }));
        }
      ), 400);
    }
    static showBlock(role2) {
      const label = this.getDamageLabel();
      label.text = "格挡".toStr();
      label.color = "#eee712";
      label.pos(role2.original_x, role2.original_y);
      const duration = 1e3;
      const x = label.x;
      const y = label.y;
      label.x = x + (Math.random() * 100 - 50);
      label.y = y;
      label.alpha = 0;
      Laya.Tween.to(label, { alpha: 1 }, 300);
      Laya.Tween.to(label, {
        y: y - 80,
        scale: 1.2
      }, duration / 2, null, Laya.Handler.create(this, () => {
        Laya.Tween.to(label, {
          y: y - 100,
          scale: 1,
          alpha: 0
        }, duration / 2, null, Laya.Handler.create(this, () => {
          _DamagePool.recycleDamageLabel(label);
        }));
      }));
    }
  };
  __name(_DamagePool, "DamagePool");
  _DamagePool.damageLabelPool = [];
  var DamagePool = _DamagePool;

  // src/core/event.ts
  var ITEM_LAYOUT = 4;
  var _Delegate = class _Delegate {
    constructor() {
      this._flag = 0;
      // 处理状态标记（0=空闲，1=正在触发，2=需要清理）
      this._items = [];
    }
    // 监听项存储数组
    /**
     * 添加持久事件监听
     * @param callback 回调函数
     * @param target 回调目标对象（用于上下文绑定）
     * @param args 预置参数（将在事件触发时追加到动态参数前）
     */
    add(callback, target, args) {
      const arr = this._items;
      const index = arr.findIndex((value, i) => value === callback && arr[i + 1] === target);
      if (index !== -1) {
        arr[index + 2] = args;
        arr[index + 3] = 1;
      } else {
        arr.push(callback, target, args, 1);
      }
    }
    /**
     * 添加一次性事件监听
     * @param callback 回调函数（触发后自动移除）
     * @param target 回调目标对象
     * @param args 预置参数
     */
    once(callback, target, args) {
      const arr = this._items;
      const index = arr.findIndex((value, i) => value === callback && arr[i + 1] === target);
      if (index !== -1) {
        arr[index + 2] = args;
        arr[index + 3] = 2;
      } else {
        arr.push(callback, target, args, 2);
      }
    }
    /**
     * 移除指定监听
     * @param callback 要移除的回调函数
     * @param target 要移除的目标对象
     */
    remove(callback, target) {
      const arr = this._items;
      const index = arr.findIndex((value, i) => value === callback && arr[i + 1] === target);
      if (index !== -1) {
        if (this._flag !== 0) {
          arr[index + 3] = 0;
          this._flag = 2;
        } else {
          arr.splice(index, ITEM_LAYOUT);
        }
      }
    }
    /**
     * 清空所有监听（延迟执行模式）
     */
    clear() {
      if (this._flag !== 0) {
        for (let i = 3; i < this._items.length; i += ITEM_LAYOUT) {
          this._items[i] = 0;
        }
        this._flag = 2;
      } else {
        this._items.length = 0;
      }
    }
    /**
     * 清除特定目标的所有监听
     * @param target 要清除的目标对象
     */
    clearForTarget(target) {
      if (!target)
        return;
      const arr = this._items;
      if (this._flag !== 0) {
        for (let i = 1; i < arr.length; i += ITEM_LAYOUT) {
          if (arr[i] === target)
            arr[i + 3] = 0;
        }
        this._flag = 2;
      } else {
        for (let i = arr.length - ITEM_LAYOUT; i >= 0; i -= ITEM_LAYOUT) {
          if (arr[i + 1] === target)
            arr.splice(i, ITEM_LAYOUT);
        }
      }
    }
    /** 当前监听数量 */
    get count() {
      return this._items.length / ITEM_LAYOUT;
    }
    /**
     * 异步触发事件监听
     * @param args 动态参数（将在预置参数后追加）
     * @returns 等待所有异步回调完成的Promise
     */
    invokeAsync(...args) {
      return __async(this, null, function* () {
        if (this._flag !== 0)
          return;
        this._flag = 1;
        const arr = this._items;
        const promises = [];
        for (let i = 0; i < arr.length; i += ITEM_LAYOUT) {
          if (arr[i + 3] === 0)
            continue;
          const callback = arr[i];
          const target = arr[i + 1];
          const fixedArgs = arr[i + 2];
          try {
            const result = fixedArgs ? callback.call(target, ...fixedArgs, ...args) : callback.call(target, ...args);
            if (result instanceof Promise) {
              promises.push(result);
            }
          } catch (error) {
            console.error(error);
          }
          if (arr[i + 3] === 2) {
            arr[i + 3] = 0;
            this._flag = 2;
          }
        }
        if (promises.length > 0) {
          yield Promise.all(promises);
        }
        if (this._flag === 2) {
          for (let i = 0; i < arr.length; ) {
            if (arr[i + 3] === 0) {
              arr.splice(i, ITEM_LAYOUT);
            } else {
              i += ITEM_LAYOUT;
            }
          }
        }
        this._flag = 0;
      });
    }
  };
  __name(_Delegate, "Delegate");
  var Delegate = _Delegate;
  var _EventDispatcher = class _EventDispatcher {
    constructor() {
      this._events = {};
    }
    // 事件类型到委托的映射
    /** 判断指定事件类型是否有监听 */
    hasListener(type) {
      const listeners = this._events[type];
      return !!listeners && listeners.count > 0;
    }
    /**
     * 注册事件监听
     * @param type 事件类型
     * @param caller 调用方标识（用于精准移除监听）
     * @param listener 监听函数
     * @param args 预置参数
     */
    on(type, caller, listener, args) {
      if (!this._events[type]) {
        this._events[type] = new Delegate();
      }
      this._events[type].add(listener, caller, args);
    }
    /**
     * 注册一次性事件监听
     * @param type 事件类型
     * @param caller 调用方标识
     * @param listener 监听函数
     * @param args 预置参数
     */
    once(type, caller, listener, args) {
      if (!this._events[type]) {
        this._events[type] = new Delegate();
      }
      this._events[type].once(listener, caller, args);
    }
    /**
     * 移除事件监听
     * @param type 事件类型
     * @param caller 调用方标识
     * @param listener 监听函数
     */
    off(type, caller, listener) {
      const listeners = this._events[type];
      if (listeners) {
        listeners.remove(listener, caller);
      }
    }
    /**
     * 移除全部监听
     * @param type 可选事件类型（不传则清空所有类型）
     */
    offAll(type) {
      if (type) {
        delete this._events[type];
      } else {
        this._events = {};
      }
    }
    /**
     * 异步派发事件
     * @param type 事件类型 
     * @param data 动态参数
     * @returns 当所有异步回调完成时resolve的Promise
     */
    dispatchAsync(type, ...data) {
      return __async(this, null, function* () {
        const listeners = this._events[type];
        if (listeners) {
          yield listeners.invokeAsync(...data);
        }
      });
    }
  };
  __name(_EventDispatcher, "EventDispatcher");
  var EventDispatcher = _EventDispatcher;

  // src/core/skill.ts
  function createCondition(data) {
    if (data.condition && data.condition.has("hp"))
      return new HealthCondition(data);
    return new ProbabilityCondition(data);
  }
  __name(createCondition, "createCondition");
  var _ProbabilityCondition = class _ProbabilityCondition {
    constructor(data) {
      this.data = data;
    }
    check(_role2) {
      let random = Math.random();
      return random <= this.data.rate;
    }
  };
  __name(_ProbabilityCondition, "ProbabilityCondition");
  var ProbabilityCondition = _ProbabilityCondition;
  var _HealthCondition = class _HealthCondition extends ProbabilityCondition {
    check(role2) {
      if (this.data.condition) {
        if (this.data.condition.has("hp")) {
          if (role2.health.per <= this.data.condition.get("hp"))
            return super.check(role2);
        }
      } else {
        return super.check(role2);
      }
      return false;
    }
  };
  __name(_HealthCondition, "HealthCondition");
  var HealthCondition = _HealthCondition;
  var _SkillMgr = class _SkillMgr {
    /**
     * 获取对应阵营的技能列表
     * @param camp 阵营标识 ('player'/'enemy')
     */
    static getList(camp) {
      return camp == "player" ? this.playerSkills : this.enemySkills;
    }
    /**
     *  创建技能
     *  根据技能类型创建技能
     *  @param owner 技能的拥有者
     *  @param data 技能的数据
     *  @returns 技能实例
     */
    static createSkill(owner, data) {
      let skill4;
      switch (data.type) {
        case 1 /* health */:
          skill4 = new health(data, owner);
          break;
        case 2 /* revive */:
          skill4 = new revive(data, owner);
          break;
        case 4 /* change */:
          skill4 = new change(data, owner);
          break;
        case 5 /* damage */:
          skill4 = new damage(data, owner);
          break;
        case 12 /* skill */:
          skill4 = new GetSkill(data, owner);
          break;
        case 10 /* ban */:
          skill4 = new ban(data, owner);
          break;
        case 13 /* learn */:
          skill4 = new learn(data, owner);
          break;
        default:
          skill4 = new BaseSkill(data, owner);
          break;
      }
      this.getList(owner.camp).push(skill4);
      return skill4;
    }
    static clear() {
      this.playerSkills.length = 0;
      this.enemySkills.length = 0;
    }
    // static triggerSkill(owner: BaseRole, type: SkillTrigger) {
    //     this.getList(owner.camp).forEach(skill => {
    //         if (skill.data.trigger === type) {
    //             skill.onTrigger();
    //         }
    //     });
    // }
  };
  __name(_SkillMgr, "SkillMgr");
  /** 玩家技能列表 */
  _SkillMgr.playerSkills = [];
  /** 敌人技能列表 */
  _SkillMgr.enemySkills = [];
  var SkillMgr = _SkillMgr;
  var _BaseSkill = class _BaseSkill {
    /**
     *  构造函数
     *  @param data 技能的数据
     *  @param owner 技能的拥有者
     *  @returns 技能实例
     */
    constructor(data, owner) {
      this.data = data;
      this.owner = owner;
      this.name = data.name;
      this.condition = createCondition(data);
      owner.on(data.trigger.toString(), this, this.onTrigger);
    }
    onTrigger() {
      BuffMgr.updateBuffs(this.getTarget().camp + this.data.name);
      if (this.checkCondition())
        this.trigger();
    }
    /**
     *  触发技能
     *  技能的触发条件由角色触发，技能的效果由技能实例执行
     */
    trigger() {
      if (this.data.buffRound === void 0)
        return;
      BuffMgr.addBuff(this.getTarget(), this.data);
    }
    checkCondition() {
      if (this.condition.check(this.owner)) {
        let str;
        if (this.owner.camp === "player")
          str = xinximoban.zhandou.jineng1.toStr().replace("{p}", color_config.xinximoban.player).replace("{s}", color_config.xinximoban.skill);
        else {
          str = xinximoban.zhandou.jineng2.toStr().replace("{e}", color_config.xinximoban.enemy).replace("{s}", color_config.xinximoban.skill);
          str = str.replace("^", Main.getRoleName(this.owner.view.data));
        }
        str = str.replace("*", this.data.name.toStr());
        str = str.replace("&", this.data.effectStr.toStr());
        GameLog.log(str, false);
        return true;
      }
      return false;
    }
    /**
     * 
     *  获取目标
     *  根据目标类型获取目标
     *  @returns 目标角色
     */
    getTarget() {
      return this.data.target == 0 /* self */ ? this.owner : this.owner.target;
    }
    // 移除技能触发器，状态提示
    ban() {
      GameLog.log(`${Main.getRoleName(this.owner.view.data)} 禁用技能: ${this.name}`);
      this.owner.off(this.data.trigger.toString(), this, this.onTrigger);
    }
  };
  __name(_BaseSkill, "BaseSkill");
  var BaseSkill = _BaseSkill;
  var _health = class _health extends BaseSkill {
    trigger() {
      let value = 0;
      let target = this.getTarget();
      if (this.data.values.has("1")) {
        let per = Number(this.data.values.get("1"));
        value = toInt(per * this.owner.attack.value);
        console.log(`${target.camp} health + ${value}`);
        target.takeDamage(this.owner, target, value);
      }
      if (this.data.values.has("2")) {
        let per = Number(this.data.values.get("2"));
        value = toInt(per * this.owner.damage);
        console.log(`${target.camp} health + ${value}`);
        target.takeDamage(this.owner, target, value);
      }
    }
  };
  __name(_health, "health");
  var health = _health;
  var _revive = class _revive extends BaseSkill {
    constructor(data, owner) {
      super(data, owner);
      this.count = 0;
      if (data.values.has("1")) {
        this.count = Number(data.values.get("1"));
      }
    }
    trigger() {
      if (this.count < 1) {
        GameLog.log(`可惜，复活次数已用尽！`);
        return;
      }
      this.count--;
      let target = this.getTarget();
      target.health.reset();
      BuffMgr.clearByRevive(target);
      console.log(`${target.camp} revive!`);
    }
  };
  __name(_revive, "revive");
  var revive = _revive;
  var _change = class _change extends BaseSkill {
    trigger() {
      let target = this.getTarget();
      let temp = target.attack.value;
      target.attack.init(target.defence.value);
      target.defence.init(temp);
    }
  };
  __name(_change, "change");
  var change = _change;
  var _damage = class _damage extends BaseSkill {
    trigger() {
      let value = 0;
      let target = this.getTarget();
      if (this.data.values.has("1")) {
        value = Number(this.data.values.get("1"));
        target.hurt += value;
        console.log(`${target.camp} hurt + ${value}`);
      }
      if (this.data.values.has("2")) {
        value = Number(this.data.values.get("2"));
        target.bear += value;
        console.log(`${target.camp} bear + ${value}`);
      }
    }
  };
  __name(_damage, "damage");
  var damage = _damage;
  var _ban = class _ban extends BaseSkill {
    /**
     * 执行技能禁用逻辑：
     * 1. 随机选择指定数量技能
     * 2. 移除事件监听
     * 3. 从技能列表移除
     */
    trigger() {
      let value = 0;
      let target = this.getTarget();
      if (this.data.values.has("1")) {
        value = toInt(this.data.values.get("1"));
        let skills = SkillMgr.getList(target.camp);
        const selected = this.getRandomSkills(skills, value);
        selected.forEach((skill4) => {
          skill4.ban();
          skills.splice(skills.indexOf(skill4), 1);
        });
      }
    }
    /** 从数组随机获取n个不重复元素 */
    getRandomSkills(arr, n) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(n, shuffled.length));
    }
  };
  __name(_ban, "ban");
  var ban = _ban;
  var _GetSkill = class _GetSkill extends BaseSkill {
    /**
     * 技能触发逻辑：
     * 1. 获取全部可用技能
     * 2. 过滤已拥有技能
     * 3. 随机选择指定数量
     * 4. 创建新技能实例
     */
    trigger() {
      let value = 0;
      let target = this.getTarget();
      if (this.data.values.has("1")) {
        value = Number(this.data.values.get("1"));
        let allSkills = Config.table.Tbskill.getDataList();
        let ownedSkills = SkillMgr.getList(target.camp);
        const newSkills = _GetSkill.getNewSkills(allSkills, ownedSkills, value);
        newSkills.forEach((skillData) => {
          SkillMgr.createSkill(target, skillData);
          GameLog.log(`${Main.getRoleName(this.owner.view.data)} 获得技能: ${skillData.name}`);
        });
      }
    }
    /** 从全部技能中筛选未拥有的 */
    static getNewSkills(all2, owned, count) {
      const ownedIds = new Set(owned.map((s) => s.data.id));
      const available = all2.filter((s) => !ownedIds.has(s.id));
      return this.getRandomSkills(available, count);
    }
    /** 从数组随机获取n个不重复元素 */
    static getRandomSkills(arr, n) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(n, shuffled.length));
    }
  };
  __name(_GetSkill, "GetSkill");
  var GetSkill = _GetSkill;
  var _learn = class _learn extends BaseSkill {
    /**
     * 特殊学习逻辑：
     * - 仅对敌方生效
     * - 根据层数进度解锁更多技能
     */
    trigger() {
      let value = 0;
      let target = this.getTarget();
      if (target.camp === "player")
        return;
      if (this.data.values.has("1")) {
        value = Number(this.data.values.get("1"));
        let allSkills = Config.table.Tbskill.getDataList();
        let ownedSkills = SkillMgr.getList(target.camp);
        const newSkills = GetSkill.getNewSkills(allSkills, ownedSkills, value);
        newSkills.forEach((skillData) => {
          SkillMgr.createSkill(target, skillData);
          GameLog.log(`${Main.getRoleName(this.owner.view.data)} 获得技能: ${skillData.name}`);
        });
      }
      if (this.data.values.has("2")) {
        let level = Save.data.player.curScene;
        console.log(`当前层数: ${level}`);
        value = level - 100;
        value = Math.max(1, value);
        let allSkills = Config.table.Tbskill.getDataList();
        let ownedSkills = SkillMgr.getList(target.camp);
        const newSkills = GetSkill.getNewSkills(allSkills, ownedSkills, value);
        newSkills.forEach((skillData) => {
          SkillMgr.createSkill(target, skillData);
          GameLog.log(`${Main.getRoleName(this.owner.view.data)} 获得技能: ${skillData.name}`);
        });
      }
    }
  };
  __name(_learn, "learn");
  var learn = _learn;

  // src/core/role.ts
  var _BaseRole = class _BaseRole extends EventDispatcher {
    constructor(camp, view) {
      super();
      this.view = view;
      this.hurt = 0;
      // 造成伤害的倍率
      this.bear = 0;
      // 承受伤害的倍率
      this.isBoss = false;
      // 是否是boss
      this.damage = 0;
      this.camp = camp;
      this.view.role = this;
      this.health = new Health((cur, per) => {
        var _a, _b;
        console.log(this.camp, " health remain:", cur, per);
        (_a = view.hpBar) == null ? void 0 : _a.setValue(per);
        if (this.isBoss)
          (_b = Main.instance.battle.bossHp) == null ? void 0 : _b.setValue(per);
        GameLog.log(`${Main.getRoleName(this.view.data)} 当前生命值:${getValueStr(cur)}`);
      });
      this.attack = new Attribute((cur, max) => {
        GameLog.log(`${Main.getRoleName(this.view.data)} 当前攻击力:${getValueStr(cur)}`);
      });
      this.defence = new Attribute((cur, max) => {
        GameLog.log(`${Main.getRoleName(this.view.data)} 当前防御力:${getValueStr(cur)}`);
      });
    }
    clear() {
      this.offAll();
    }
    init(attack, defence, health2, skills, isBoss = false) {
      this.isBoss = isBoss;
      this.attack.init(attack);
      this.defence.init(defence);
      this.health.init(health2);
      for (let skill4 of skills) {
        let skillData = Config.table.Tbskill.get(skill4);
        if (skillData) {
          console.log(`Skill ${skillData.name} created!`);
          SkillMgr.createSkill(this, skillData);
        } else {
          console.log(`Skill ${skill4} not found!`);
        }
      }
    }
    round() {
      return __async(this, null, function* () {
        if (BuffMgr.is(this, 9 /* skip */)) {
          Main.instance.battle.round(this.target);
          return;
        }
        this.hurt = 0;
        this.damage = 0;
        this.target.bear = 0;
        yield this.dispatchAsync(3 /* round */.toString());
        yield this.dispatchAsync(4 /* attack */.toString());
        yield this.target.dispatchAsync(7 /* hit */.toString());
        yield this.dispatchAsync(5 /* attacking */.toString());
        yield this.target.dispatchAsync(8 /* hitting */.toString());
        if (BuffMgr.is(this, 8 /* abandon */))
          Main.instance.battle.round(this.target);
        else
          this.view.play_anim(this.camp);
      });
    }
    // async attackAnimation(func: Function): Promise<void> {
    //     let owner = this.view.owner;
    //     owner.parent.setChildIndex(owner, owner.parent.numChildren - 1);
    //     await tweenTo(
    //         owner,
    //         { x: this.target.view.original_x, y: this.target.view.original_y },
    //         200,
    //         Laya.Ease.strongIn,
    //     );
    //     func();
    //     await tweenTo(
    //         owner,
    //         { x: this.view.original_x, y: this.view.original_y },
    //         200,
    //         Laya.Ease.strongOut
    //     );
    // }
    attackAction() {
      Laya.SoundManager.playSound(Config.sounds.get("att" + toInt(Math.random() * 3)));
      let target = this.target;
      let miss = false;
      if (BuffMgr.is(target, 6 /* miss */)) {
        console.log(`${target.camp} miss!`);
        if (BuffMgr.is(this, 7 /* hit */))
          console.log(`${this.camp} hit!`);
        else
          miss = true;
      }
      if (BuffMgr.is(this, 11 /* replace */)) {
        console.log(`${this.camp} replace!`);
        target = target.target;
      }
      this.damage = toInt(target.getDamage(this.attack.value) * (1 + this.hurt) * (1 + target.bear));
      this.damage = Math.max(0, this.damage);
      if (miss || this.damage === 0) {
        Laya.SoundManager.playSound(Config.sounds.get("def" + toInt(Math.random() * 3)));
        if (miss) {
          DamagePool.showDodge(target.view);
          let str;
          if (target.camp === "player")
            str = xinximoban.zhandou.shanbi1.toStr().replace("{p}", color_config.xinximoban.player);
          else {
            str = xinximoban.zhandou.shanbi2.toStr().replace("{e}", color_config.xinximoban.enemy);
            str = str.replace("*", Main.getRoleName(target.view.data));
          }
          GameLog.log(str, false);
        } else {
          DamagePool.showBlock(target.view);
          let str;
          if (target.camp === "player")
            str = xinximoban.zhandou.gedang1.toStr().replace("{p}", color_config.xinximoban.player);
          else {
            str = xinximoban.zhandou.gedang2.toStr().replace("{e}", color_config.xinximoban.enemy);
            str = str.replace("*", Main.getRoleName(target.view.data));
          }
          GameLog.log(str, false);
        }
      } else {
        console.log(`${this.camp} attacks ${target.camp}! damage: ${this.damage}`);
        target.takeDamage(this, target, -this.damage);
      }
      this.dispatchAsync(6 /* attacked */.toString());
      if (!miss)
        target.dispatchAsync(9 /* hitted */.toString());
    }
    // damage_action() {
    //     Battle.damage = toInt(target.getDamage(this.attack.value) * (1 + this.hurt) * (1 + target.bear));
    //     GameLog.log(`${this.camp} attacks ${target.camp}! damage: ${Battle.damage}`);
    //     target.takeDamage(Battle.damage);
    // }
    getDamage(damage2) {
      return Math.max(0, damage2 - this.defence.value);
    }
    takeDamage(owner, target, damage2) {
      if (damage2 === 0)
        return;
      if (damage2 > 0) {
        DamagePool.showHeal(damage2, this.view);
        let str;
        if (owner.camp === "player")
          str = xinximoban.zhandou.huifu1.toStr().replace("{p}", color_config.xinximoban.player).replace("{s}", color_config.xinximoban.huixue);
        else {
          str = xinximoban.zhandou.huifu2.toStr().replace("{e}", color_config.xinximoban.enemy).replace("{s}", color_config.xinximoban.huixue);
          str = str.replace("*", Main.getRoleName(owner.view.data));
        }
        str = str.replace("&", getValueStr(damage2));
        GameLog.log(str, false);
      }
      if (damage2 < 0) {
        DamagePool.showDamage(damage2, this.view);
        let str;
        if (owner.camp === "player") {
          str = xinximoban.zhandou.huihe1.toStr().replace("{p}", color_config.xinximoban.player).replace("{s}", color_config.xinximoban.shanghai);
          str = str.replace("*", Main.getRoleName(target.view.data));
        } else {
          str = xinximoban.zhandou.huihe2.toStr().replace("{e}", color_config.xinximoban.enemy).replace("{s}", color_config.xinximoban.shanghai);
          str = str.replace("*", Main.getRoleName(owner.view.data));
        }
        str = str.replace("&", getValueStr(Math.abs(damage2)));
        GameLog.log(str, false);
      }
      this.health.add(damage2);
    }
    isAlive() {
      return this.health.value > 0;
    }
  };
  __name(_BaseRole, "BaseRole");
  var BaseRole = _BaseRole;
  var _Attribute = class _Attribute {
    constructor(callback) {
      this.cur = 0;
      this.max = 0;
      this.callback = callback;
    }
    reset() {
      this.value = this.max;
    }
    init(v) {
      this.max = v;
      this.reset();
    }
    set value(v) {
      this.cur = v;
      if (this.callback)
        this.callback(this.cur, this.max);
    }
    get value() {
      return this.cur;
    }
    add(v) {
      this.value += v;
    }
    getMax() {
      return this.max;
    }
  };
  __name(_Attribute, "Attribute");
  var Attribute = _Attribute;
  var _Health = class _Health extends Attribute {
    set value(v) {
      this.cur = v;
      if (this.cur < 0)
        this.cur = 0;
      if (this.cur > this.max)
        this.cur = this.max;
      if (this.callback)
        this.callback(this.cur, this.per = this.cur / this.max);
    }
    get value() {
      return this.cur;
    }
    get original() {
      return this.max;
    }
    addMax(v) {
      this.max += v;
      this.value += v;
    }
  };
  __name(_Health, "Health");
  var Health = _Health;

  // src/core/battle.ts
  var _Battle = class _Battle {
    // 是否平局
    constructor() {
      this.round_count = 0;
      this.bossHp = Main.instance.Battle.getComponent(HPBar);
      this.player = new BaseRole("player", Main.instance.Player.getComponent(RoleView));
      this.enemy = new BaseRole("enemy", Main.instance.Enemy.getComponent(RoleView));
      this.player.target = this.enemy;
      this.enemy.target = this.player;
    }
    init(id, level, isBoss) {
      let playerData = Save.data.player;
      let roleData = Config.table.Tbrole.get(playerData.id);
      let levelData = getRoleLevelAttributes(playerData.level);
      let rebirthData = Config.table.Tbrebirth.get(Save.data.game.rebirth);
      let addition = Main.getAddition();
      let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
      let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
      let health2 = Main.getHealth(roleData, levelData, rebirthData, addition);
      this.player.init(attack, defence, health2, roleData.skills.concat(playerData.skills));
      let sceneData = Config.table.Tbmap_level.get(playerData.curScene);
      roleData = Config.table.Tbrole.get(id);
      levelData = getRoleLevelAttributes(level);
      attack = toInt(levelData.attack * roleData.attackRate * sceneData.attackRate);
      defence = toInt(levelData.defence * roleData.defenceRate * sceneData.defenceRate);
      health2 = toInt(levelData.health * roleData.healthRate * sceneData.healthRate);
      if (isBoss) {
        attack = toInt(attack * bossData.attackRate);
        defence = toInt(defence * bossData.defenceRate);
        health2 = toInt(health2 * bossData.healthRate);
      }
      Main.instance.Enemy.getComponent(RoleView).show_skin(isBoss);
      this.bossHp.bg.visible = isBoss;
      this.enemy.init(attack, defence, health2, roleData.skills, isBoss);
    }
    start() {
      return __async(this, null, function* () {
        GameLog.log(xinximoban.zhandou.kaishi);
        let music = Config.sounds.get("battle_bgm");
        if (Laya.SoundManager._bgMusic !== music)
          Laya.SoundManager.playMusic(music);
        this.player.health.reset();
        this.enemy.health.reset();
        this.escape = false;
        this.draw = false;
        this.round_count = 0;
        let role2 = this.player;
        let target = this.enemy;
        role2.dispatchAsync(1 /* ready */.toString());
        target.dispatchAsync(1 /* ready */.toString());
        role2.dispatchAsync(2 /* start */.toString());
        target.dispatchAsync(2 /* start */.toString());
        yield delay(200);
        this.round(role2);
      });
    }
    round(role2) {
      return __async(this, null, function* () {
        if (role2.camp === "player") {
          this.round_count++;
          GameLog.log(`第${this.round_count}回合`);
          if (this.round_count > 100) {
            this.round_count = 0;
            this.draw = true;
          }
        }
        if (!this.escape && !this.draw && (role2.isAlive() && role2.target.isAlive())) {
          yield role2.round();
          return;
        }
        SkillMgr.clear();
        BuffMgr.clear();
        this.player.clear();
        this.enemy.clear();
        Main.instance.deal_battle_result();
      });
    }
    victory() {
      let roleData = this.enemy.view.data;
      let level = this.enemy.view.level;
      let isBoss = this.enemy.isBoss;
      Chengjiu.addCount("kill", roleData.id);
      let playerData = Save.data.player;
      playerData.scenes[playerData.curScene].count++;
      let levelData = getRoleLevelAttributes(level);
      Main.addExp(levelData.exp * roleData.expDead);
      Main.addValue(roleData);
      Main.instance.learn(roleData);
      if (isBoss) {
        MessageBox.tip("闯关成功！");
        playerData.scenes[playerData.curScene].pass = 1;
        playerData.maxScene = playerData.curScene;
        Chengjiu.addCount("map");
        Main.instance.update_map();
      }
      Main.instance.update_player();
    }
  };
  __name(_Battle, "Battle");
  var Battle = _Battle;

  // src/ui/Cuilian.ts
  var { regClass: regClass10 } = Laya;
  var Cuilian = class extends Laya.Script {
    show() {
      let playerData = Save.data.player;
      this.refined = this.refining();
      this.owner.getChildByName("list_shuxing").dataSource = Object.keys(playerData.relation).map((key) => {
        const typedKey = key;
        let value = this.refined[key] - playerData.relation[key];
        let str = "";
        if (value > 0)
          str = `<font color=green>+${getValueStr(value)}</font>`;
        else if (value < 0)
          str = `<font size=18 color=red>-${getValueStr(Math.abs(value))}</font>`;
        return `${shuxing_config[typedKey].toStr()}:<font color='#AFAFAF'>${getValueStr(playerData.relation[key])}</font> ${str}`;
      });
      this.owner.open();
    }
    onAwake() {
      this.owner.Label.text = "是否消耗*级进行淬炼，淬炼后生物属性向当前物种靠拢。".toStr().replace("*", Cuilian.level.toString());
      this.owner.ok.onClick = () => {
        let playerData = Save.data.player;
        playerData.level -= Cuilian.level;
        playerData.relation = this.refined;
        Main.instance.update_player();
        this.owner.close();
        MessageBox.tip(xinximoban.cuilian.toStr().replace("^", color_config.xinximoban.huixue), false);
        Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
        Save.saveGame();
      };
      this.owner.no.onClick = () => {
        this.owner.close();
      };
    }
    refining() {
      let playerData = Save.data.player;
      let roleData = Config.table.Tbrole.get(playerData.id);
      var sr = playerData.relation;
      var cr = roleData.relations;
      var keys = Object.keys(sr);
      var all2 = 0;
      keys.forEach((key) => {
        all2 += sr[key];
      });
      var relation = {};
      keys.forEach((key) => {
        var _a;
        var v1 = 0, v2 = 0, v3 = 0;
        var s = sr[key];
        var c = (_a = cr[key]) != null ? _a : 0;
        if (s / all2 - c * 3 > 0) {
          v1 = -0.1;
        }
        if (s / all2 - c * 0.9 < 0) {
          v1 = 0.1;
        }
        if (s - c * roleData.race * 2 < 0) {
          v2 = 0.1;
        }
        if (c == 0) {
          v3 = -0.1;
        }
        relation[key] = toInt((v1 + v2 + v3) * s) + s;
      });
      return relation;
    }
  };
  __name(Cuilian, "Cuilian");
  Cuilian.level = 10;
  Cuilian = __decorateClass([
    regClass10("LOdO6nxVSaW9LKPr5KibAQ")
  ], Cuilian);

  // src/ui/Main.generated.ts
  var _MainBase = class _MainBase extends Laya.Scene {
  };
  __name(_MainBase, "MainBase");
  var MainBase = _MainBase;

  // src/ui/Main.ts
  var { regClass: regClass11 } = Laya;
  var Main = class extends MainBase {
    show() {
      this.getChildByName("Top").visible = true;
      this.getChildByName("Middle").visible = true;
      this.getChildByName("Bottom").visible = true;
    }
    onAwake() {
      Main.instance = this;
      this.battle = new Battle();
      this.list_guyou.scrollBar.autoHide = true;
      this.list_xuexi.scrollBar.autoHide = true;
      this.show_map();
      this.update_player();
      this.update_skill();
      this.btn_login.onClick = () => {
        Laya.Scene.open("Login.ls");
      };
      this.btn_jineng.onClick = () => {
        this.img_jineng.visible = true;
        this.img_shuxing.visible = false;
      };
      this.btn_shuxing.onClick = () => {
        this.img_jineng.visible = false;
        this.img_shuxing.visible = true;
      };
      this.btn_sousuo.onClick = () => {
        this.update_map();
      };
      this.btn_boss.onClick = () => {
        let scene = Save.data.player.scenes[Save.data.player.curScene];
        this.Enemy.getComponent(RoleView).show(scene.boss, scene.level);
        this.show_battle(scene.boss, scene.level, true);
      };
      this.btn_shenru.onClick = () => {
        if (Save.data.player.curScene > Save.data.player.maxScene)
          return;
        Save.data.player.curScene++;
        GameLog.log(xinximoban.shenru.toStr().replace("*", numberToChinese(Save.data.player.curScene)), false);
        this.update_map();
        Save.saveGame();
      };
      GameLog.log(xinximoban.shenru.toStr().replace("*", numberToChinese(Save.data.player.curScene)), false);
      this.btn_fanhui.onClick = () => {
        Save.data.player.curScene = Math.max(Save.data.player.curScene - 1, 1);
        GameLog.log(xinximoban.shenru.toStr().replace("*", numberToChinese(Save.data.player.curScene)), false);
        this.update_map();
        Save.saveGame();
      };
      this.btn_taopao.onClick = () => {
        let flag = Save.data.setting.auto;
        this.battle.escape = true;
        Save.data.setting.auto = false;
        this.update_auto();
        if (flag)
          Save.saveGame();
      };
      this.btn_tujian.onClick = () => {
        this.Tujian.getComponent(Tujian).show();
      };
      this.btn_jinhua.onClick = () => {
        let playerData = Save.data.player;
        let roleData = Config.table.Tbrole.get(playerData.id);
        let level = jinhua_need[Math.min(jinhua_need.length - 1, roleData.rare)];
        if (Save.data.player.level > level) {
          this.Jinhua.getComponent(Jinhua).show();
        } else {
          MessageBox.tip(xinximoban.buzu);
        }
      };
      this.btn_cuilian.onClick = () => {
        if (Save.data.player.level > Cuilian.level) {
          this.Cuilian.getComponent(Cuilian).show();
        } else {
          MessageBox.tip(xinximoban.buzu);
        }
      };
      this.btn_zhuansheng.onClick = () => {
        let rebirth2 = Save.data.game.rebirth;
        if (rebirth2 > 999) {
          MessageBox.tip(`<font color='#FF0000'>已达到最大转生数</font>`);
          return;
        }
        let rebirthData = Config.table.Tbrebirth.get(rebirth2 === 0 ? 1 : rebirth2);
        if (Save.data.player.level <= rebirthData.need) {
          MessageBox.tip(xinximoban.buzu);
          return;
        }
        let per = 10;
        if (rebirth2 > 99)
          per = 1;
        if (rebirth2 > 199)
          per = 0.1;
        MessageBox.show("是否进行转生，等级、种族重置为初始状态，全属性永久额外增加".toStr() + `${per}%`, () => {
          Save.data.game.rebirth++;
          if (Save.data.game.rebirth == 1)
            MessageBox.show("解锁：自动战斗".toStr(), null, null, false);
          if (Save.data.game.rebirth == 2)
            MessageBox.show("解锁：定向拟态".toStr(), null, null, false);
          if (Save.data.game.rebirth == 3) {
            var skill4 = Config.table.Tbskill.get("jiexi");
            MessageBox.show("习得：".toStr() + `${skill4.name.toStr()}`, null, null, false);
          }
          Save.data.player = Save.reset();
          Save.data.player.forget = 0;
          Save.data.player.revive = 3;
          Save.data.player.mimicry = 1;
          MessageBox.tip(xinximoban.zhuansheng.toStr().replace("^", color_config.xinximoban.huixue), false);
          Chengjiu.addCount("rebirth");
          Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
          this.show_map();
          this.update_player();
          this.update_skill();
          Save.saveGame();
        });
      };
      this.List.array = GameLog.get();
      GameLog.instance.callback = () => {
        this.List.refresh();
        this.List.scrollTo(this.List.array.length - 1);
      };
      this.List.scrollBar.autoHide = true;
      this.btn_zidong.onClick = () => {
        Save.data.setting.auto = !Save.data.setting.auto;
        if (Save.data.setting.auto)
          this.auto_fight();
        else
          this.battle.escape = true;
        this.update_auto();
      };
      this.update_auto();
    }
    update_auto() {
      this.btn_zidong.title.text = (Save.data.setting.auto ? "停止" : "自动战斗").toStr();
    }
    auto_fight() {
      let sceneData = Config.table.Tbmap_level.get(Save.data.player.curScene);
      let id = Main.getMonsterByScene(sceneData);
      let level = Main.getLevel(sceneData);
      this.Enemy.getComponent(RoleView).show(id, level);
      this.show_battle(id, level, false);
    }
    show_map() {
      this.Map.visible = true;
      this.Battle.visible = false;
      this.update_map();
    }
    show_battle(id, level, isBoss) {
      this.Map.visible = false;
      this.Battle.visible = true;
      this.battle.init(id, level, isBoss);
      this.battle.start();
    }
    update_player() {
      var _a, _b, _c;
      let playerData = Save.data.player;
      let roleData = Config.table.Tbrole.get(playerData.id);
      let levelData = getRoleLevelAttributes(playerData.level);
      let rebirthData = Config.table.Tbrebirth.get(Save.data.game.rebirth);
      let addition = Main.getAddition();
      let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
      let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
      let health2 = Main.getHealth(roleData, levelData, rebirthData, addition);
      let power = Main.getPower(attack, defence, health2);
      let curExp = playerData.exp;
      let maxExp = roleData.expNeed * levelData.need;
      let roleName = Main.getRoleName(roleData);
      this.label_1.text = "种族:".toStr() + `${roleName}
${"战力:".toStr()}${getValueStr(power)}
${"等级:".toStr()}${playerData.level}(${toPerStr(curExp / maxExp)})
${"转生:".toStr()}${Save.data.game.rebirth}
<font color='#6FD368'>${"灵气:".toStr()}${getValueStr((_a = playerData.quality["ling"]) != null ? _a : 0)}</font>
<font color='#D7AC5E'>${"仙气:".toStr()}${getValueStr((_b = playerData.quality["xian"]) != null ? _b : 0)}</font>
<font color='#C26060'>${"神韵:".toStr()}${getValueStr((_c = playerData.quality["shen"]) != null ? _c : 0)}</font>`;
      this.label_2.text = `${"攻击:".toStr()}<font color='#DCDCDC'>${getValueStr(attack)}</font>	${"防御:".toStr()}<font color='#DCDCDC'>${getValueStr(defence)}</font>
${"血量:".toStr()}<font color='#DCDCDC'>${getValueStr(health2)}</font>`;
      this.list_shuxing.dataSource = Object.keys(playerData.relation).map((key) => {
        const typedKey = key;
        return `${shuxing_config[typedKey].toStr()}:<font color='#AFAFAF'>${getValueStr(playerData.relation[key])}</font>`;
      });
      this.player0.getComponent(RoleView).show(playerData.id, playerData.level, power);
      this.Player.getComponent(RoleView).show(playerData.id, playerData.level);
      this.btn_zidong.active = Save.data.game.rebirth > 0;
      this.btn_cuilian.tip.text = "需要等级>".toStr() + Cuilian.level;
      this.btn_zhuansheng.tip.text = "需要等级>".toStr() + rebirthData.need;
      this.btn_jinhua.tip.text = "需要等级>".toStr() + jinhua_need[Math.min(jinhua_need.length - 1, roleData.rare)];
      GameLog.log(xinximoban.zhandouli.toStr().replace("*", getValueStr(power)), false);
    }
    update_skill() {
      var _a, _b;
      let playerData = Save.data.player;
      let roleData = Config.table.Tbrole.get(playerData.id);
      (_a = this.list_guyou.renderHandler) == null ? void 0 : _a.clear();
      (_b = this.list_xuexi.renderHandler) == null ? void 0 : _b.clear();
      this.list_guyou.array = roleData.skills;
      this.list_guyou.renderHandler = Laya.Handler.create(this, (item, index) => {
        item.getComponent(SkillView).show(roleData.skills[index]);
      }, null, false);
      let list = playerData.skills.concat(new Array(this.getSkillMax() - playerData.skills.length).fill(""));
      this.list_xuexi.array = list;
      this.list_xuexi.renderHandler = Laya.Handler.create(this, (item, index) => {
        item.getComponent(SkillView).show(list[index], true);
      }, null, false);
    }
    update_map() {
      let mapLevel = Save.data.player.curScene;
      let max = Config.table.Tbmap_level.getDataList().length;
      if (mapLevel > max)
        return;
      this.label_titile.text = "第*层".toStr().replace("*", numberToChinese(mapLevel));
      let sceneData = Config.table.Tbmap_level.get(mapLevel);
      let flag = true;
      let curSceneData = Save.data.player.scenes[mapLevel];
      if (curSceneData.count >= 3) {
        this.btn_sousuo.tip.text = "";
        this.btn_shenru.active = true;
        this.btn_boss.visible = !curSceneData.pass;
        flag = curSceneData.pass > 0;
      } else {
        this.btn_sousuo.tip.text = "击败怪物:".toStr() + `${curSceneData.count}/3`;
        this.btn_shenru.active = false;
        this.btn_boss.visible = false;
      }
      this.btn_shenru.visible = flag;
      if (mapLevel == 1) {
        this.btn_fanhui.active = false;
      } else {
        this.btn_fanhui.active = true;
        if (mapLevel >= 105)
          this.btn_shenru.active = false;
      }
      var list = Main.getMonsterListByScene(sceneData);
      this.monster0.getComponent(RoleView).init(sceneData.attackRate, list[0], Main.getLevel(sceneData));
      this.monster1.getComponent(RoleView).init(sceneData.attackRate, list[1], Main.getLevel(sceneData));
      this.monster2.getComponent(RoleView).init(sceneData.attackRate, list[2], Main.getLevel(sceneData));
      let str = xinximoban.qianjin.toStr();
      list.forEach((id, index) => {
        str = str.replace(`{${index}}`, Main.getRoleName(Config.table.Tbrole.get(id)));
      });
      GameLog.log(str, false);
    }
    deal_battle_result() {
      if (this.battle.escape) {
        console.log("player escapes the battle!");
        GameLog.log(xinximoban.zhandou.taopao);
      } else if (this.battle.draw) {
        console.log("the battle is a draw!");
        MessageBox.tip("大战100回合，精疲力尽了！");
        if (Save.data.setting.auto) {
          this.auto_fight();
          return;
        }
      } else {
        if (this.battle.player.isAlive()) {
          GameLog.log(xinximoban.zhandou.siwang1.toStr().replace("*", Main.getRoleName(this.battle.enemy.view.data)), false);
          this.battle.victory();
          if (Save.data.setting.auto) {
            this.auto_fight();
            return;
          }
          Laya.SoundManager.playSound(Config.sounds.get("win"));
          Save.saveGame();
        } else {
          GameLog.log(xinximoban.zhandou.siwang2.toStr().replace("*", Main.getRoleName(this.battle.enemy.view.data)), false);
          this.player_dead();
        }
      }
      GameLog.log(xinximoban.zhandou.jieshu);
      Laya.SoundManager.playMusic(Config.sounds.get("bgm"));
      this.show_map();
    }
    player_dead() {
      console.log("广告时刻");
      this.curPlayerData = JSON.parse(JSON.stringify(Save.data.player));
      Save.data.player = Save.reset();
      Laya.SoundManager.playSound(Config.sounds.get("die"));
      Save.data.setting.auto = false;
      this.update_auto();
      Save.saveGame();
      let tip = MessageBox.show(`<font color='^'>你死了</font>等级将降为1级`.toStr().replace("^", color_config.xinximoban.shanghai), () => {
        this.fuhuo_tip.ok.active = false;
        if (isAndroid())
          playAd(1);
        else {
          this.curPlayerData.revive--;
          this.fuhuo_success();
        }
      }, () => {
        this.fuhuo_fail();
      }, true, false);
      this.fuhuo_tip = tip;
      tip.ok.title.text = "复活".toStr();
      if (isAndroid()) {
        tip.ok.tip.text = "看广告".toStr();
      } else {
        if (this.curPlayerData.revive <= 0) {
          tip.ok.active = false;
        } else {
          tip.ok.active = true;
          tip.ok.tip.text = "剩余次数:".toStr() + `${this.curPlayerData.revive}`;
        }
      }
    }
    fuhuo_success() {
      Save.data.player = this.curPlayerData;
      this.update_map();
      MessageBox.tip(`<font color='^'>你复活了</font>`.toStr().replace("^", color_config.xinximoban.huixue), false);
      Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
      Save.saveGame();
      if (this.fuhuo_tip) {
        this.fuhuo_tip.close(() => {
          this.fuhuo_tip.destroy();
          this.fuhuo_tip = null;
        });
      }
    }
    fuhuo_load() {
      if (this.fuhuo_tip) {
        this.fuhuo_tip.ok.active = true;
      }
    }
    fuhuo_fail() {
      MessageBox.tip(`<font color='^'>你死了</font>,等级降为1级`.toStr().replace("^", color_config.xinximoban.shanghai), false);
      this.show_map();
      this.update_player();
      this.update_skill();
      Save.saveGame();
      if (this.fuhuo_tip) {
        this.fuhuo_tip.close(() => {
          this.fuhuo_tip.destroy();
          this.fuhuo_tip = null;
        });
      }
    }
    static getRoleName(role2) {
      let color = color_config.pinzhi[role2.qualityType];
      let rank = color_config.name[role2.rare];
      return `<font color=${color}>${this.getQualityStr(role2.qualityType).toStr()}</font><font color=${color_config.name.dian}>·</font><font color=${rank}>${role2.name.toStr()}</font>`;
    }
    static getQualityStr(key) {
      if (key === "ling")
        return "灵";
      if (key === "xian")
        return "仙";
      if (key == "shen")
        return "神";
      return "凡";
    }
    getSkillMax() {
      let playerData = Save.data.player;
      let roleData = Config.table.Tbrole.get(playerData.id);
      let num = 1;
      let list = roleData.skills.concat(playerData.skills);
      list.forEach((skillId) => {
        let skillData = Config.table.Tbskill.get(skillId);
        if (skillData.type === 13 /* learn */) {
          num += skillData.values.get("1");
        }
      });
      num += Save.data.game.rewards["skill"];
      return num;
    }
    // 当前最大99+90，少一个成就。
    static getLevelMax() {
      return 99 + Save.data.game.rewards["level"] * 10;
    }
    static addExp(num) {
      let playerData = Save.data.player;
      let curExp = toInt(playerData.exp + num);
      let levelData = getRoleLevelAttributes(playerData.level);
      let roleData = Config.table.Tbrole.get(playerData.id);
      while (true) {
        const maxExp = levelData.need * roleData.expNeed;
        if (curExp >= maxExp) {
          curExp -= maxExp;
          this.addLevel();
        } else {
          break;
        }
      }
      playerData.exp = curExp;
    }
    static addLevel() {
      let playerData = Save.data.player;
      if (playerData.level >= this.getLevelMax()) {
        MessageBox.tip("已达到最高等级！");
        return;
      }
      Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
      playerData.level++;
      MessageBox.tip("等级+1");
      GameLog.log(xinximoban.shengji.toStr().replace("*", playerData.level.toString()), false);
    }
    static addValue(role2) {
      var _a, _b;
      let playerData = Save.data.player;
      var qualityValue = toInt(role2.quality * shift_config.zhongzu_shift);
      playerData.quality[role2.qualityType] = ((_a = playerData.quality[role2.qualityType]) != null ? _a : 0) + qualityValue;
      var sr = playerData.relation;
      var cr = role2.relations;
      var keys = Object.keys(sr);
      var r = role2.race * role2.remain * shift_config.zhongzu_shift;
      var des = "";
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        var v = toInt(((_b = cr[key]) != null ? _b : 0) * r);
        sr[key] += v;
        if (v > 0) {
          const typedKey = key;
          des += `${shuxing_config[typedKey].toStr()}:+${v}，		`;
        }
      }
      if (des.length > 0)
        des = des.substring(0, des.lastIndexOf("，		"));
      MessageBox.tip(des, false);
    }
    static unlockRole(id) {
      let roleData = Config.table.Tbrole.get(id);
      MessageBox.tip("解锁图鉴：".toStr() + `${this.getRoleName(roleData)}`, false);
      Save.data.game.roles[id] = 1;
    }
    learn(targetData) {
      if (Math.random() > skill_rate)
        return;
      let max = this.getSkillMax();
      let playerData = Save.data.player;
      let roleData = Config.table.Tbrole.get(playerData.id);
      let owner = roleData.skills.concat(playerData.skills);
      if (playerData.skills.length >= max) {
        MessageBox.tip("技能已满！");
        return;
      }
      const ownedIds = new Set(owner);
      const available = targetData.skills.filter((s) => !ownedIds.has(s));
      const shuffled = [...available].sort(() => 0.5 - Math.random());
      const newSkills = shuffled.slice(0, Math.min(1, shuffled.length));
      if (newSkills.length > 0) {
        const skillId = newSkills[0];
        const skillData = Config.table.Tbskill.get(skillId);
        if (skillData) {
          playerData.skills.push(skillId);
          MessageBox.tip(xinximoban.tunshi.toStr().replace("*", Main.getRoleName(targetData)).replace("&", skillData.name.toStr()).replace("^", color_config.xinximoban.skill), false);
          this.update_skill();
        }
      }
    }
    static getAddition(locks = Save.data.game.roles) {
      let addition = { attack: 0, defence: 0, health: 0 };
      let roles = Config.table.Tbrole.getDataList();
      roles.forEach((role2) => {
        if (!locks[role2.id])
          return;
        addition.attack += role2.attackAdd;
        addition.defence += role2.defenceAdd;
        addition.health += role2.healthAdd;
      });
      return addition;
    }
    /**
     * 实际攻击力=（当前角色当前等级攻击力*（1+转生附加））+图鉴附加
     */
    static getAttack(roleData, levelData, rebirthData, addition) {
      let value;
      value = levelData.attack * roleData.attackRate * (1 + rebirthData.attack);
      value += addition.attack;
      return toInt(value * shift_config.role_shift);
    }
    /**
     * 实际防御力=（当前角色当前等级防御力*（1+转生附加））+图鉴附加
     */
    static getDefence(roleData, levelData, rebirthData, addition) {
      let value;
      value = levelData.defence * roleData.defenceRate * (1 + rebirthData.defence);
      value += addition.defence;
      return toInt(value * shift_config.role_shift);
    }
    /**
     * 实际血量=（当前角色当前等级血量*（1+转生附加））+图鉴附加
     */
    static getHealth(roleData, levelData, rebirthData, addition) {
      let value;
      value = levelData.health * roleData.healthRate * (1 + rebirthData.health);
      value += addition.health;
      return toInt(value * shift_config.role_shift);
    }
    static getPower(attack, defence, health2) {
      return toInt((attack + defence) * shift_config.power_shift + health2);
    }
    static isBoss(roleData) {
      return roleData.id.indexOf("b") === 0;
    }
    static getBoss(sceneData) {
      if (sceneData.id > 100)
        return `b${sceneData.id - 100}`;
      return this.getMonsterByScene(sceneData);
    }
    static getMonsterByScene(sceneData) {
      var _a, _b;
      var monsters = sceneData.monsters;
      var sum = 0;
      for (var i in monsters) {
        sum += (_a = monsters[i]) != null ? _a : 0;
      }
      let random = toInt(Math.random() * sum);
      let rate = 0;
      for (let i2 in monsters) {
        rate += (_b = monsters[i2]) != null ? _b : 0;
        if (random < rate) {
          return i2;
        }
      }
      return null;
    }
    static getMonsterListByScene(sceneData) {
      const maxCount = 3;
      const maxAttempts = 1e3;
      var monsters = sceneData.monsters;
      const monsterEntries = Object.keys(monsters).map((key) => ({ key, value: monsters[key] }));
      if (monsterEntries.length === 0)
        return [];
      for (let i = monsterEntries.length - 1; i > 0; i--) {
        const randomIndex = toInt(Math.random() * (i + 1));
        [monsterEntries[i], monsterEntries[randomIndex]] = [monsterEntries[randomIndex], monsterEntries[i]];
      }
      const sum = monsterEntries.reduce((acc, item) => {
        var _a;
        return acc + ((_a = item.value) != null ? _a : 0);
      }, 0);
      if (sum <= 0)
        return [];
      const selected = /* @__PURE__ */ new Set();
      let attempts = 0;
      while (selected.size < maxCount && attempts < maxAttempts) {
        attempts++;
        let random = Math.random() * sum;
        let cumulativeRate = 0;
        for (const { key, value } of monsterEntries) {
          cumulativeRate += value != null ? value : 0;
          if (random < cumulativeRate) {
            selected.add(key);
            break;
          }
        }
      }
      if (attempts >= maxAttempts) {
        console.warn("Exceeded max attempts to select monsters. Ensure probabilities are set correctly.");
      }
      return Array.from(selected);
    }
    static getLevel(scene) {
      return Math.round(Math.random() * (scene.levelMax - scene.levelMin)) + scene.levelMin;
    }
  };
  __name(Main, "Main");
  Main = __decorateClass([
    regClass11("gFM8IGO1T4aKS_u8PMeg9g")
  ], Main);

  // src/mod/endless/gacha.ts
  var rewardTypeRates = [
    { type: "skill", rate: 0.35 },
    { type: "level", rate: 0.35 },
    { type: "role", rate: 0.1 },
    { type: "refresh", rate: 0.2 }
  ];
  function drawRewardType() {
    const rand = Math.random();
    let acc = 0;
    for (const item of rewardTypeRates) {
      acc += item.rate;
      if (rand < acc)
        return item.type;
    }
    return "skill";
  }
  __name(drawRewardType, "drawRewardType");
  function drawGacha(data) {
    const results = [];
    const ownedSkills = new Set(data.skills.concat(Config.table.Tbrole.get(data.id).skills));
    const ownedRoles = new Set(Object.keys(data.roles));
    while (results.length < 3) {
      const rewardType = drawRewardType();
      if (rewardType === "skill") {
        const pool = Config.table.Tbskill.getDataList().filter((s) => !ownedSkills.has(s.id));
        if (pool.length === 0) {
          continue;
        }
        const rarity = drawRarity();
        const filtered = pool.filter((s) => s.rarity === rarity);
        if (filtered.length === 0) {
          continue;
        }
        const idx = Math.floor(Math.random() * filtered.length);
        results.push({ type: "skill", value: filtered[idx] });
      } else if (rewardType === "role") {
        const pool = Config.table.Tbrole.getDataList().filter((r) => !ownedRoles.has(r.id));
        if (pool.length === 0) {
          continue;
        }
        const rare = drawRoleRarity();
        const filtered = pool.filter((r) => r.rare === rare);
        if (filtered.length === 0) {
          continue;
        }
        const idx = Math.floor(Math.random() * filtered.length);
        results.push({ type: "role", value: filtered[idx] });
      } else if (rewardType === "refresh") {
        results.push({ type: "refresh", value: drawRefreshCount() });
      } else {
        results.push({ type: "level", value: drawLevelCount() });
      }
    }
    return results;
  }
  __name(drawGacha, "drawGacha");
  var refreshCountRates = [
    { type: 1, rate: 0.5 },
    { type: 2, rate: 0.2 },
    { type: 3, rate: 0.15 },
    { type: 4, rate: 0.07 },
    { type: 5, rate: 0.05 },
    { type: 6, rate: 0.02 },
    { type: 7, rate: 0.01 }
  ];
  function drawRefreshCount() {
    const rand = Math.random();
    let acc = 0;
    for (const item of refreshCountRates) {
      acc += item.rate;
      if (rand < acc)
        return item.type;
    }
    return 1;
  }
  __name(drawRefreshCount, "drawRefreshCount");
  var levelCountRates = [
    { type: 1, rate: 0.8 },
    { type: 2, rate: 0.15 },
    { type: 3, rate: 0.05 }
  ];
  function drawLevelCount() {
    const rand = Math.random();
    let acc = 0;
    for (const item of levelCountRates) {
      acc += item.rate;
      if (rand < acc)
        return item.type;
    }
    return 1;
  }
  __name(drawLevelCount, "drawLevelCount");
  var rarityRates = [
    { rarity: 1, rate: 0.5 },
    { rarity: 2, rate: 0.3 },
    { rarity: 3, rate: 0.15 },
    { rarity: 4, rate: 0.04 },
    { rarity: 5, rate: 0.01 }
  ];
  function drawRarity() {
    const rand = Math.random();
    let acc = 0;
    for (const item of rarityRates) {
      acc += item.rate;
      if (rand < acc)
        return item.rarity;
    }
    return rarityRates[rarityRates.length - 1].rarity;
  }
  __name(drawRarity, "drawRarity");
  var roleRarityRates = [
    { rare: 1, rate: 0.3 },
    { rare: 2, rate: 0.18 },
    { rare: 3, rate: 0.15 },
    { rare: 4, rate: 0.12 },
    { rare: 5, rate: 0.1 },
    { rare: 6, rate: 0.08 },
    { rare: 7, rate: 0.04 },
    { rare: 8, rate: 0.02 },
    { rare: 9, rate: 0.01 }
  ];
  function drawRoleRarity() {
    const rand = Math.random();
    let acc = 0;
    for (const item of roleRarityRates) {
      acc += item.rate;
      if (rand < acc)
        return item.rare;
    }
    return roleRarityRates[roleRarityRates.length - 1].rare;
  }
  __name(drawRoleRarity, "drawRoleRarity");
  function getDynamicRarityWeights(level) {
    const minRare = 1, maxRare = 9;
    const weights = [];
    for (let rare = minRare; rare <= maxRare; rare++) {
      let appear = 0, full = 0;
      if (rare === 1) {
        appear = 1;
        full = 50;
      } else if (rare === 2) {
        appear = 1;
        full = 60;
      } else if (rare === 3) {
        appear = 10;
        full = 20;
      } else if (rare === 4) {
        appear = 20;
        full = 35;
      } else if (rare === 5) {
        appear = 35;
        full = 50;
      } else if (rare === 6) {
        appear = 50;
        full = 65;
      } else if (rare === 7) {
        appear = 65;
        full = 80;
      } else if (rare === 8) {
        appear = 80;
        full = 95;
      } else if (rare === 9) {
        appear = 95;
        full = 110;
      }
      if (level < appear) {
        weights.push(0);
        continue;
      }
      let openRate = 1;
      if (level < full) {
        openRate = (level - appear) / (full - appear);
      }
      let reduceLow = 1;
      if (rare === 1 && level > 80) {
        reduceLow = Math.max(0, 1 - (level - 80) / 40);
      }
      if (rare === 2 && level > 100) {
        reduceLow = Math.max(0, 1 - (level - 100) / 40);
      }
      const base = Math.max(0, 10 - rare);
      const growth = Math.pow(level / 100, rare * 0.8);
      weights.push((base * (1 - growth) + growth * rare * 2) * openRate * reduceLow);
    }
    return weights;
  }
  __name(getDynamicRarityWeights, "getDynamicRarityWeights");
  function drawDynamicRarity(level) {
    const weights = getDynamicRarityWeights(level);
    const total = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
      rand -= weights[i];
      if (rand <= 0)
        return i + 1;
    }
    return 9;
  }
  __name(drawDynamicRarity, "drawDynamicRarity");
  function spawnMonsters(level) {
    if (level < 1) {
      throw new Error("Level must be at least 1");
    }
    const selectedRoles = [];
    const availableRoles = [...Config.table.Tbrole.getDataList()];
    for (let i = 0; i < 3; i++) {
      if (availableRoles.length === 0)
        break;
      const rare = drawDynamicRarity(level);
      const pool = availableRoles.filter((r) => r.rare === rare);
      if (pool.length === 0)
        continue;
      const idx = Math.floor(Math.random() * pool.length);
      const selected = pool[idx];
      selectedRoles.push(selected.id);
      const index = availableRoles.findIndex((role2) => role2.id === selected.id);
      availableRoles.splice(index, 1);
    }
    return selectedRoles;
  }
  __name(spawnMonsters, "spawnMonsters");

  // src/mod/endless/EndlessScene.ts
  var { regClass: regClass12 } = Laya;
  var EndlessScene = class extends Main {
    constructor() {
      super(...arguments);
      this.labels = [];
    }
    onAwake() {
      Main.instance = this;
      this.battle = new Battle();
      this.list_guyou.scrollBar.autoHide = true;
      this.list_xuexi.scrollBar.autoHide = true;
      this.show_map();
      this.update_player();
      this.update_skill();
      this.btn_tujian.onClick = () => {
        this.Tujian.getComponent(Tujian).show();
      };
      this.btn_zhuansheng.onClick = () => {
        Laya.Scene.open("Login.ls");
      };
      this.List.array = GameLog.get();
      GameLog.instance.callback = () => {
        this.List.refresh();
        this.List.scrollTo(this.List.array.length - 1);
      };
      this.List.scrollBar.autoHide = true;
      this.Reward = this.getChildByName("Reward");
      this.Reward.ok.onClick = () => {
        EndlessScene.data.refresh--;
        this.show_rewards();
      };
      this.Reward.no.onClick = () => {
        this.Des.visible = !this.Des.visible;
        this.Reward.no.title.text = this.Des.visible ? "关闭".toStr() : "详情".toStr();
      };
      this.Des = this.Reward.getChildByName("Des");
      let vbox = this.Des.getChildByName("VBox");
      for (let i = 1; i < 4; i++) {
        let label = vbox.getChildByName(`Label${i}`);
        this.labels.push(label);
      }
      this.Reward.getChildByName("back").onClick = () => {
        this.Reward.close();
        this.battle_end();
      };
    }
    show_first() {
      this.Reward.open();
      this.Reward.ok.visible = false;
      this.Reward.no.visible = false;
      var list = spawnMonsters(1);
      list.forEach((data, key) => {
        let btn = this.Reward.getChildByName(`${key}`);
        let roleData = Config.table.Tbrole.get(data);
        let roleName = Main.getRoleName(roleData);
        btn.title.text = roleName.replace("·", "\n·\n");
        btn.onClick = () => {
          this.Reward.close();
          EndlessScene.data.id = roleData.id;
          EndlessScene.data.roles[roleData.id] = 1;
          MessageBox.tip("获得".toStr() + `:${roleName}`, false);
          this.update_player();
          this.update_skill();
          this.battle_end();
        };
      });
    }
    show_rewards() {
      this.Reward.open();
      this.Reward.ok.visible = true;
      this.Reward.no.visible = true;
      this.Reward.ok.tip.text = EndlessScene.data.refresh > 0 ? "剩余次数:".toStr() + `${EndlessScene.data.refresh}` : "";
      this.Reward.ok.active = EndlessScene.data.refresh > 0;
      this.Reward.no.title.text = this.Des.visible ? "关闭".toStr() : "详情".toStr();
      drawGacha(EndlessScene.data).forEach((data, key) => {
        let btn = this.Reward.getChildByName(`${key}`);
        this.labels[key].text = "";
        if (data.type === "skill") {
          let skillData = data.value;
          btn.title.text = "技能".toStr() + "\n\n" + skillData.name;
          btn.onClick = () => {
            this.Reward.close();
            EndlessScene.data.skills.push(skillData.id);
            MessageBox.tip("习得：".toStr() + `${skillData.name.toStr()}`, false);
            this.update_skill();
            this.battle_end();
          };
          this.labels[key].text = `<font color='#ffe900' size=40>${skillData.name.toStr()}</font>：${skillData.description.toStr()}`;
        } else if (data.type === "role") {
          let roleName = Main.getRoleName(data.value);
          btn.title.text = roleName.replace("·", "\n·\n");
          btn.onClick = () => {
            this.Reward.close();
            EndlessScene.data.id = data.value.id;
            EndlessScene.data.roles[data.value.id] = 1;
            MessageBox.tip("获得".toStr() + `:${roleName}`, false);
            this.update_player();
            this.update_skill();
            this.battle_end();
          };
        } else if (data.type === "level") {
          btn.title.text = "等级".toStr() + ` +${data.value}`;
          btn.onClick = () => {
            this.Reward.close();
            EndlessScene.data.level += data.value;
            MessageBox.tip(btn.title.text, false);
            this.update_player();
            this.battle_end();
          };
        } else if (data.type === "refresh") {
          btn.title.text = "刷新".toStr() + ` +${data.value}`;
          btn.onClick = () => {
            this.Reward.close();
            EndlessScene.data.refresh += data.value;
            MessageBox.tip(btn.title.text, false);
            this.battle_end();
          };
        }
      });
    }
    update_player() {
      let playerData = EndlessScene.data;
      let roleData = Config.table.Tbrole.get(playerData.id);
      let levelData = getRoleLevelAttributes(playerData.level);
      let rebirthData = Config.table.Tbrebirth.get(0);
      let addition = Main.getAddition(playerData.roles);
      let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
      let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
      let health2 = Main.getHealth(roleData, levelData, rebirthData, addition);
      let power = Main.getPower(attack, defence, health2);
      let roleName = Main.getRoleName(roleData);
      this.label_1.text = "种族:".toStr() + `${roleName}
${"战力:".toStr()}${getValueStr(power)}
${"等级:".toStr()}${playerData.level}
${"攻击:".toStr()}<font color='#DCDCDC'>${getValueStr(attack)}</font>
${"防御:".toStr()}<font color='#DCDCDC'>${getValueStr(defence)}</font>
${"血量:".toStr()}<font color='#DCDCDC'>${getValueStr(health2)}</font>`;
      this.player0.getComponent(RoleView).show(playerData.id, playerData.level, power);
      this.Player.getComponent(RoleView).show(playerData.id, playerData.level);
      GameLog.log(xinximoban.zhandouli.toStr().replace("*", getValueStr(power)), false);
    }
    update_skill() {
      var _a, _b;
      let playerData = EndlessScene.data;
      let roleData = Config.table.Tbrole.get(playerData.id);
      (_a = this.list_guyou.renderHandler) == null ? void 0 : _a.clear();
      (_b = this.list_xuexi.renderHandler) == null ? void 0 : _b.clear();
      this.list_guyou.array = roleData.skills;
      this.list_guyou.renderHandler = Laya.Handler.create(this, (item, index) => {
        item.getComponent(SkillView).show(roleData.skills[index]);
      }, null, false);
      let list = playerData.skills;
      this.list_xuexi.array = list;
      this.list_xuexi.renderHandler = Laya.Handler.create(this, (item, index) => {
        item.getComponent(SkillView).show(list[index]);
      }, null, false);
    }
    getLevelScale(level) {
      return 1 + Math.pow(Math.max(0, level - 1), 1.2) * 0.03;
    }
    update_map() {
      let mapLevel = ++EndlessScene.data.curScene;
      const scale = this.getLevelScale(mapLevel);
      this.label_titile.text = "第*层".toStr().replace("*", numberToChinese(mapLevel));
      GameLog.log(xinximoban.shenru.toStr().replace("*", numberToChinese(mapLevel)), false);
      var list = spawnMonsters(mapLevel);
      this.monster0.getComponent(RoleView).init(scale, list[0], mapLevel);
      this.monster1.getComponent(RoleView).init(scale, list[1], mapLevel);
      this.monster2.getComponent(RoleView).init(scale, list[2], mapLevel);
      let str = xinximoban.qianjin.toStr();
      list.forEach((id, index) => {
        str = str.replace(`{${index}}`, Main.getRoleName(Config.table.Tbrole.get(id)));
      });
      GameLog.log(str, false);
      if (EndlessScene.data.isNew) {
        EndlessScene.data.isNew = false;
        EndlessScene.data.curScene = 0;
        this.show_first();
      }
    }
    show_battle(id, level, isBoss) {
      this.Map.visible = false;
      this.Battle.visible = true;
      this.init_battle(id, level, true);
      this.battle.start();
    }
    init_battle(id, level, isBoss) {
      let playerData = EndlessScene.data;
      let roleData = Config.table.Tbrole.get(playerData.id);
      let levelData = getRoleLevelAttributes(playerData.level);
      let rebirthData = Config.table.Tbrebirth.get(0);
      let addition = Main.getAddition(playerData.roles);
      let attack = Main.getAttack(roleData, levelData, rebirthData, addition);
      let defence = Main.getDefence(roleData, levelData, rebirthData, addition);
      let health2 = Main.getHealth(roleData, levelData, rebirthData, addition);
      this.battle.player.init(attack, defence, health2, roleData.skills.concat(playerData.skills));
      const scale = this.getLevelScale(playerData.curScene);
      roleData = Config.table.Tbrole.get(id);
      levelData = getRoleLevelAttributes(level);
      attack = toInt(levelData.attack * roleData.attackRate * scale);
      defence = toInt(levelData.defence * roleData.defenceRate * scale);
      health2 = toInt(levelData.health * roleData.healthRate * scale);
      this.Enemy.getComponent(RoleView).show_skin(isBoss);
      this.battle.bossHp.bg.visible = isBoss;
      this.battle.enemy.init(attack, defence, health2, roleData.skills, isBoss);
    }
    deal_battle_result() {
      if (this.battle.draw) {
        console.log("the battle is a draw!");
        MessageBox.tip("大战100回合，精疲力尽了！");
        EndlessScene.data.curScene--;
        this.battle_end();
      } else {
        if (this.battle.player.isAlive()) {
          Laya.SoundManager.playSound(Config.sounds.get("win"));
          this.show_rewards();
        } else {
          this.curEndlessData = JSON.parse(JSON.stringify(EndlessScene.data));
          let tip = MessageBox.show(`你失败了！`.toStr(), () => {
            this.fuhuo_tip.ok.active = false;
            if (this.curEndlessData.revive <= 0) {
              if (isAndroid())
                playAd(1);
              return;
            }
            this.curEndlessData.revive--;
            this.fuhuo_success();
          }, () => {
            this.fuhuo_fail();
          }, true, false);
          this.fuhuo_tip = tip;
          tip.ok.title.text = "复活".toStr();
          if (this.curEndlessData.revive <= 0) {
            if (isAndroid())
              tip.ok.title.text = "观看广告".toStr();
            else
              tip.ok.active = false;
          } else {
            tip.ok.active = true;
            tip.ok.tip.text = "剩余次数:".toStr() + `${this.curEndlessData.revive}`;
          }
          deleteSave("endless");
          Laya.SoundManager.playSound(Config.sounds.get("die"));
        }
      }
      Laya.SoundManager.playMusic(Config.sounds.get("bgm"));
    }
    fuhuo_success() {
      EndlessScene.data = this.curEndlessData;
      MessageBox.tip(`<font color='^'>你复活了</font>`.toStr().replace("^", color_config.xinximoban.huixue), false);
      Laya.SoundManager.playSound(Config.sounds.get("upgrade"));
      EndlessScene.data.curScene--;
      this.battle_end();
      if (this.fuhuo_tip) {
        this.fuhuo_tip.close(() => {
          this.fuhuo_tip.destroy();
          this.fuhuo_tip = null;
        });
      }
    }
    fuhuo_fail() {
      if (this.fuhuo_tip) {
        this.fuhuo_tip.close(() => {
          this.fuhuo_tip.destroy();
          this.fuhuo_tip = null;
        });
      }
      Laya.Scene.open("Login.ls");
    }
    battle_end() {
      GameLog.log(xinximoban.zhandou.jieshu);
      this.show_map();
      saveGame("endless", EndlessScene.data);
    }
  };
  __name(EndlessScene, "EndlessScene");
  EndlessScene = __decorateClass([
    regClass12("WWvzZBhOS9ijx1BtSV18UA")
  ], EndlessScene);

  // src/ui/I18nText.ts
  var { regClass: regClass13 } = Laya;
  var I18nText = class extends Laya.Script {
    onAwake() {
      this.owner.text = this.owner.text.toStr();
    }
  };
  __name(I18nText, "I18nText");
  I18nText = __decorateClass([
    regClass13("lyjYBkxSTa2FXWv6tWLNKQ")
  ], I18nText);

  // src/ui/MyButton.generated.ts
  var _MyButtonBase = class _MyButtonBase extends Laya.Sprite {
  };
  __name(_MyButtonBase, "MyButtonBase");
  var MyButtonBase = _MyButtonBase;

  // src/ui/MyButton.ts
  var { regClass: regClass14 } = Laya;
  var MyButton = class extends MyButtonBase {
    constructor() {
      super(...arguments);
      // 新增点击事件回调
      this.isPressed = false;
      this.color = "#FF2929";
    }
    // 新增按压状态标记
    onAwake() {
      this.image = this.getChildByName("Image");
      this.title = this.image.getChildByName("Title");
      this.tip = this.getChildByName("Tip");
      this.image.on(Laya.Event.MOUSE_DOWN, this, this.onPress);
      this.image.on(Laya.Event.MOUSE_UP, this, this.onRelease);
      this.image.on(Laya.Event.MOUSE_OUT, this, this.onRelease);
      this.originalColor = this.image.color;
    }
    onDestroy() {
      this.image.off(Laya.Event.MOUSE_DOWN, this, this.onPress);
      this.image.off(Laya.Event.MOUSE_UP, this, this.onRelease);
      this.image.off(Laya.Event.MOUSE_OUT, this, this.onRelease);
    }
    onEnable() {
      this.image.disabled = false;
    }
    onDisable() {
      this.image.disabled = true;
    }
    // 记录原始颜色
    onPress() {
      this.isPressed = true;
      this.image.color = this.color;
      Laya.Tween.to(this.image, { scaleX: 0.9, scaleY: 0.9 }, 100, Laya.Ease.quadIn);
      Laya.SoundManager.playSound(Config.sounds.get("ui_anniu"));
    }
    onRelease() {
      this.image.color = this.originalColor;
      if (this.isPressed) {
        this.isPressed = false;
        if (this.image.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY)) {
          Laya.SoundManager.playSound(Config.sounds.get("ui_anniu2"));
          Laya.Tween.to(this.image, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadOut, Laya.Handler.create(this, () => {
            if (this.onClick)
              this.onClick();
          }));
          return;
        }
      }
      Laya.Tween.to(this.image, { scaleX: 1, scaleY: 1 }, 100);
    }
  };
  __name(MyButton, "MyButton");
  MyButton = __decorateClass([
    regClass14("mk3vMNXVSGieSd9t6-NHxg")
  ], MyButton);

  // src/ui/PopUp.generated.ts
  var _PopUpBase = class _PopUpBase extends Laya.Box {
  };
  __name(_PopUpBase, "PopUpBase");
  var PopUpBase = _PopUpBase;

  // src/ui/PopUp.ts
  var { regClass: regClass15 } = Laya;
  var PopUp = class extends PopUpBase {
    open() {
      this.visible = true;
      this.scale(0, 0);
      this.alpha = 0;
      Laya.Tween.to(
        this,
        { scaleX: 1, scaleY: 1, alpha: 1 },
        300,
        Laya.Ease.backOut
      );
    }
    close(func) {
      Laya.Tween.to(
        this,
        { scaleX: 0, scaleY: 0, alpha: 0 },
        300,
        Laya.Ease.backOut,
        Laya.Handler.create(this, () => {
          if (func)
            func();
          else
            this.visible = false;
        })
      );
    }
  };
  __name(PopUp, "PopUp");
  PopUp = __decorateClass([
    regClass15("NpR6WP_JT4u_-iaEnCk4lA")
  ], PopUp);

  // INDEX:bundle.js
  window.$_main_ = main;
})();
