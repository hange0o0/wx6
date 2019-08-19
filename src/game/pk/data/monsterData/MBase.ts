class MBase {
    private static id = 1;
    public static getClass(id){
        switch (Math.floor(id)){
            case 1:return M1;
            case 2:return M2;
            case 3:return M3;
            case 4:return M4;
            case 5:return M5;
        }
    }

    public static getItem(id){
        var cls = this.getClass(id);
        var item = new cls();
        item.mid = id;
        item.onlyID = this.id;
        this.id++;;
        return item;
    }


    public mid;
    public onlyID = 0;


    public hp = 100
    public maxHp = 100
    public atk = 50
    public atkDis = 100
    public speed = 10
    public atkSpeed = 30//帧

    public stopEnd = 0//这个时间前停止行动
    public atkEnd = 0//这个时间前停止行动

    public relateItem//
    public buffList = [];

    public x;
    public y;


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
        }
        PKTool.showHpChange(this,v)
    }


    public move(){

    }

    public atkFun(){

    }

    public onDie(){

    }
}