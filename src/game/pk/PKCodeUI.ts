class PKCodeUI extends game.BaseContainer_wx4{
    private static _instance:PKCodeUI;
    public static getInstance():PKCodeUI {
        if (!this._instance)
            this._instance = new PKCodeUI();
        return this._instance;
    }


    private con: eui.Group;
    private bg: eui.Image;
    public bottomCon: eui.Group;
    public roleCon: eui.Group;
    public bulletCon: eui.Group;









    public playerItem = new PlayerItem()
    public monsterArr = [];
    public bulletArr = [];
    public bombArr = [];
    public trapArr = [];


    public constructor() {
        super();
        this.skinName = "PKCodeUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.roleCon.addChild(this.playerItem)
        this.playerItem.data = PKC.playerData;
        PKC.playerData.relateItem = this.playerItem;

    }

    public renewConY(){
        this.con.y = (GameManager_wx4.uiHeight - 320)/2 - this.playerItem.y;
        this.con.x = 320 - this.playerItem.x
    }

    public onShow(){
        while(this.monsterArr.length)
        {
            PKMonsterItem_wx3.freeItem(this.monsterArr.pop())
        }
        while(this.bulletArr.length)
        {
            PKBulletItem.freeItem(this.bulletArr.pop())
        }
        while(this.bombArr.length)
        {
            BombItem.freeItem(this.bombArr.pop())
        }
        while(this.trapArr.length)
        {
            TrapItem.freeItem(this.trapArr.pop())
        }


        this.con.width = this.bg.width = PKC.mapW
        this.con.height = this.bg.height = PKC.mapH
        PKC.playerData.initData();
        this.playerItem.resetXY(this.con.width/2,this.con.height/2)
        this.renewConY();
        this.height = GameManager_wx4.uiHeight
    }

    public sortY(){
        var num = this.roleCon.numChildren;
        for(var i=1;i<num;i++)
        {
            var lastItem = this.roleCon.getChildAt(i-1)
            var currentItem = this.roleCon.getChildAt(i)
            if(currentItem.y < lastItem.y)//深度不对，调整
            {
                var index = i-1;
                for(var j = index - 1;j>=0;j--)
                {
                    var lastItem = this.roleCon.getChildAt(j)
                    if(currentItem.y > lastItem.y)
                    {
                        index = j+1;
                        break;
                    }
                }
                this.roleCon.setChildIndex(currentItem,index)
            }
        }
    }

    public onE(){
        PKC.onStep();
        var actionStep = PKC.actionStep;


        PKC.playerData.onStep()
        this.playerItem.onE()
 /*       this.addMonster();*/

        var len = this.bulletArr.length;
        for(var i=0;i<len;i++)
        {
            var bItem = this.bulletArr[i];
            if(bItem.endTime < actionStep)
            {
                PKBulletItem.freeItem(bItem);
                this.bulletArr.splice(i,1)
                len--;
                i--;
                continue;
            }
            bItem.onE();
        }



        var len = this.monsterArr.length;
        for(var i=0;i<len;i++)
        {
             var mItem = this.monsterArr[i];
            if(mItem.data.isDie == 2)
            {
                PKMonsterItem_wx3.freeItem(mItem);
                this.monsterArr.splice(i,1)
                len--;
                i--;

                var index = PKC.monsterList.indexOf(mItem.data)
                if(index != -1)
                    PKC.monsterList.splice(index,1);
                continue;
            }
            mItem.onE();
        }

        for(var i=0;i<this.bombArr.length;i++)
        {
            var bombItem = this.bombArr[i];
            if(bombItem.isDie == 2)
            {
                BombItem.freeItem(bombItem);
                this.bombArr.splice(i,1)
                i--;
                continue;
            }
            bombItem.testHit();
        }

        for(var i=0;i<this.trapArr.length;i++)
        {
            var trapItem = this.trapArr[i];
            if(trapItem.isDie)
            {
                TrapItem.freeItem(trapItem);
                this.trapArr.splice(i,1)
                i--;
                continue;
            }
            trapItem.testHit();
        }

        this.sortY();
    }

    public addMonster(mid,x,y){
       var newItem = PKMonsterItem_wx3.createItem();
        this.monsterArr.push(newItem);
        this.roleCon.addChild(newItem);
        newItem.data = MBase.getItem(mid);
        newItem.resetXY(x,y)
        return newItem.data;
    }

    public shoot(owner,rota,fromXY?){
        var bullet = PKBulletItem.createItem();
        this.bulletArr.push(bullet);
        this.bulletCon.addChild(bullet);
        var x = fromXY?fromXY.x:owner.x
        var y = fromXY?fromXY.y:owner.y
        bullet.data = {
            owner:owner,
            rota:rota,
            x:x,
            y:y
        }
        return bullet;
    }

    public addBomb(monsterItem,hurt,hurtDis){
        var item = BombItem.createItem();
        this.bombArr.push(item);
        this.roleCon.addChild(item)


        item.dataChanged();
        item.decHp = hurt;
        item.hurtDis = hurtDis;
        item.x = monsterItem.x
        item.y = monsterItem.y
    }

    public addTrap(data){
        var item = TrapItem.createItem();
        this.trapArr.push(item);
        this.roleCon.addChild(item)

        item.data = data
        item.x = PKC.playerData.x
        item.y = PKC.playerData.y
    }


}