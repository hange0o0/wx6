class MBase {
    private static id = 1;
    public static getClass(id){
        switch (Math.floor(id)){
            case 1:return M1;
            case 2:return M2;
            case 3:return M3;
            case 4:return M4;
            case 5:return M5;
            case 6:return M6;
            case 7:return M7;
            case 9:return M9;
            case 10:return M10;
            case 11:return M11;
            case 13:return M13;
            case 14:return M14;
            case 15:return M15;
            case 16:return M16;
            case 17:return M17;
            case 18:return M18;;
            case 31:return M31;
            case 32:return M32;
            case 33:return M33;
            case 34:return M34;
            case 35:return M35;
            case 36:return M36;
            case 38:return M38;
            case 39:return M39;
            case 40:return M40;
            case 41:return M41;
            case 42:return M42;
            case 43:return M43;
            case 44:return M44;
            case 45:return M45;
            case 46:return M46;
            case 48:return M48;
            case 61:return M61;
            case 62:return M62;
            case 63:return M63;
            case 64:return M64;
            case 65:return M65;
            case 66:return M66;
            case 67:return M67;
            case 68:return M68;
            case 69:return M69;
            case 70:return M70;
            case 71:return M71;
            case 72:return M72;
            case 73:return M73;
            case 75:return M75;
            case 76:return M76;

        }
    }

    public static getItem(id){
        var cls = this.getClass(id);
        var item = new cls();
        item.mid = id;
        item.onlyID = this.id;
        item.initData();
        this.id++;
        return item;
    }


    public mid;
    public onlyID = 0;


    public size = 100//体积半径
    public hp = 100
    public maxHp = 100
    public atk = 10
    public atkDis = 100
    public speed = 2
    public atkSpeed = 60//帧
    public bulletSpeed = 10//子弹速度
    public skillDis = 500//技能距离

    public stopEnd = 0//这个时间前停止行动
    public atkEnd = 0//这个时间前停止行动
    public skillEnd = 0//这个时间前停止行动
    public nextSkillBeign = 0//下次技能开始时间
    public isFarAtk = true

    public relateItem//
    public buffList = [];

    public x;
    public y;
    public isDie

    public initData(){
        var vo = this.getVO();
        this.size = vo.width/2
        this.atkDis = vo.atkrage + 200
    }

    public getHitPos(){
          return {
              x:this.x,
              y:this.y - this.getVO().height*0.4
          }
    }

    public getVO(){
        return MonsterVO.getObject(this.mid)
    }

    public addHp(v){
        this.hp += v;
        if(this.hp > this.maxHp)
        {
            this.hp = this.maxHp
        }
        else if(this.hp <= 0)
        {
            this.hp = 0;
            this.isDie = 1;
            this.relateItem.die();
        }
        PKTool.showHpChange(this,v)
        this.relateItem.renewHp();
    }

    public canSkill(){
        return false;
    }

    public skillFun(){

    }


    public move(){

    }

    public atkFun(){

    }

    public onDie(){

    }
    public onStep(){

    }
}