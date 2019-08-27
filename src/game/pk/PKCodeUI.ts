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




}