class MBase {
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
        return item;
    }


    public mid;
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




    public move(){

    }

    public atkFun(){

    }

    public onDie(){

    }
}