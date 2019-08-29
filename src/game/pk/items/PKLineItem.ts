class PKLineItem extends game.BaseItem{

    private static pool = [];
    public static createItem():PKLineItem {
        var item:PKLineItem = this.pool.pop();
        if (!item) {
            item = new PKLineItem();
        }
        return item;
    }

    public static freeItem(item:PKLineItem) {
        if (!item)
            return;
        item.remove();
        if (this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }



    public constructor() {
        super();
    }

    public mc = new eui.Image();
    public len = 1000;

    public childrenCreated() {
        super.childrenCreated();

        this.addChild(this.mc)
    }

    public dataChanged(){

    }

    public remove(){
        MyTool.removeMC(this)
    }

    public onE(){

    }

    public checkHit()
    {
        var enemy = PKC.playerData
        if(MyTool.getDis(enemy,this)>this.len)
            return false;



        var angle = this.rotation-90
        angle = angle>360?angle-360:angle
        angle = angle<0?angle+360:angle
        if (angle==90 || angle==270) {
            if (angle == 90) {
                if (enemy.y+20 > this.y && Math.abs(enemy.x - this.x)<20) {
                    return true;
                }
            }
            else {
                if (enemy.y-40 < this.y && Math.abs(enemy.x - this.x)<20) {
                    return true;
                }
            }
        }
        else if (angle==0 || angle==180) {
            if (angle==0 ) {
                if (this.x < enemy.x+20)
                {
                    var dec = enemy.y - this.y
                    if(dec > 0 && dec<20 || dec<=0 && dec >-40)
                    {
                        return true;
                    }
                }
            }
            else {
                if (this.x > enemy.x-20)
                {
                    var dec = enemy.y - this.y
                    if(dec > 0 && dec<20 || dec<=0 && dec >-40)
                    {
                        return true;
                    }
                }
            }
        }else
        {
            var k = Math.tan(angle/180*Math.PI)
            var c = this.y - k*this.x
            var dis = Math.abs(k*enemy.x - enemy.y+c)/Math.sqrt((k*k+1))
            return dis < 40
        }
        return false;
    }

}