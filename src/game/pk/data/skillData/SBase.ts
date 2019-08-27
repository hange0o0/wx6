class SBase {

    //13	闪电链	向最近的怪物释放闪电，造成#1点伤害，最多可打击#1个敌人
    //14	叉状闪电	向最近的#1个怪物释放闪电，造成#2点伤害
    //15	地雷	埋下一个地雷，被触发后对#1范围内的怪物造成#2点伤害
    //16	飞刀陷阱	布置一个飞刀陷阱，对经过的怪物造成#1%的伤害，陷阱持续#2秒
    //17	毒液陷阱	布置一个毒液陷阱，使经过的怪物中毒（每秒造成#1点伤害），陷阱持续#2秒
    //18	火焰陷阱	布置一个火焰陷阱，点燃经过的怪物（每秒造成#1点伤害，持续#3秒），陷阱持续#2秒
    //19	雷电陷阱	布置一个雷电陷阱，对#1范围内最多3个怪物造成#3点伤害，陷阱持续#2秒
    //20	能量护盾	在身上释放一个能量护盾，可抵挡#1点伤害，持续#2秒
    //21	无敌	无敌中不受任何伤害，持续#1秒
    //22	冲击波	使前方#1范围内的怪物受到#2点伤害
    //23	抗拒光环	退开#1范围内的怪物#2点距离
    //24	气爆	退开前方#1范围内的怪物#2点距离，并造成#3点伤害
    //25	引燃	引燃所有被点燃的怪物，使其受到#1点伤害
    //26	治疗结界	释放一个治疗结界，当玩家处于治疗结界中时，会每秒回复#1点生命，结界持续#2秒
    //27	相位空间	玩家进入相位空间，在此其间不会受到任何伤害，直到玩家移动位置或达到#1秒
    //28	空间锚点	在玩家下设置一个空间锚点，玩家将在10秒后直接回到锚点位置
    //29	刺杀	随机传送到一个远程单位身碰
    //30	暴走	进入暴走状态，全属性提高#1%,但受到伤害增加#2%，持续#3秒
    //31	吸血	每消灭一个敌人可回复#1点生命
    //32	暴率加成	提高玩家#1%暴击率
    //33	暴伤提高	提高玩家#1%暴击伤害
    //34	闪避提升	增加玩家#1%的闪避率
    //35	移动提升	增加玩家#1%的移动速度
    //36	攻程提升	增加玩家#1的攻击距离
    //37	攻速提升	增加玩家#1的攻击速度
    //38	伤害提升	增加玩家#1的攻击力
    //39	打退提升	增加玩家#1的打退距离
    //40	厚血	增加玩家#1的血量
    //41	自愈	每#1秒自动回复玩家#2点生命
    //42	复活	死后有一次复活机会，回复#1点生命
    //43	涂毒	攻击会使怪物中毒，每秒造成#1点伤害
    //44	火焰刀	攻击会点燃怪物，每秒造成#1点伤害，持续#2秒
    //45	死亡爆裂	砍死怪物后会使怪物尸体爆炸，对#1范围内的怪物造成#2点伤害
    //46	重击	攻击时有#1%的机率使怪物陷入晕眩，持续#2秒
    //47	刃甲	会使攻击玩家的怪物受到其攻击力#1%的反弹伤害
    //48	金币加成	增加#1%的结算金币获得
    //49	腐蚀光环	会使#1范围内的怪物每秒受到#2点伤害
    //50	刀蛊	在怪物体内中入刀蛊，当怪物死亡时，会向随机方向射出#1把飞刀，每把飞刀造成#2%伤害


    public static getClass(id){
        switch (Math.floor(id)){
            case 1:return S1;
            case 2:return S2;
            case 3:return S3;
            case 4:return S4;
            case 5:return S5;
            case 6:return S6;
            case 7:return S7;
            case 8:return S8;
            case 9:return S9;
            case 10:return S10;
            case 11:return S11;
            case 12:return S12;
            case 13:return S13;
            case 14:return S14;
            case 15:return S15;
            case 16:return S16;
            case 17:return S17;
            case 18:return S18;
            case 19:return S19;
            case 20:return S20;
            case 21:return S21;
            case 22:return S22;
            case 23:return S23;
            case 24:return S24;
            case 25:return S25;
            case 26:return S26;
            case 27:return S27;
            case 28:return S28;
            case 29:return S29;
            case 30:return S30;
            case 31:return S31;
            case 32:return S32;
            case 33:return S33;
            case 34:return S34;
            case 35:return S35;
            case 36:return S36;
            case 37:return S37;
            case 38:return S38;
            case 39:return S39;
            case 40:return S40;
            case 41:return S41;
            case 42:return S42;
            case 43:return S43;
            case 44:return S44;
            case 45:return S45;
            case 46:return S46;
            case 47:return S47;
            case 48:return S48;
            case 49:return S49;
            case 50:return S50;
        }
    }

    public static getItem(id):SBase{
        var cls = this.getClass(id);
        var item = new cls();
        item.sid = id;
        return item;
    }


    public sid;




    public onMove(){

    }

    public onAtk(){

    }

    public onDie(){

    }

    public onHit(){

    }

    public onBeHit(){

    }

    public onKill(){

    }

    public onUse(){

    }

    public onCreate(){

    }

    public onStep(){

    }
}