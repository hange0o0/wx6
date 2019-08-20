class PKCodeUI extends game.BaseContainer_wx4{
    private static _instance:PKCodeUI;
    public static getInstance():PKCodeUI {
        if (!this._instance)
            this._instance = new PKCodeUI();
        return this._instance;
    }


    private con: eui.Group;
    private bg: eui.Image;
    private bottomCon: eui.Group;
    private roleCon: eui.Group;
    private bulletCon: eui.Group;









    public playerItem = new PlayerItem()
    public monsterArr = [];
    public sortArr = [];


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
        //this.sortArr.length = 0;
        //this.sortArr.push(this.playerItem)
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


        PKC.playerData.onStep()
        this.playerItem.onE()
 /*       this.addMonster();*/


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
        //
        ////插入到合适的位置
        //var b = false
        //for(var i=0;i<this.sortArr.length;i++)
        //{
        //    var item = this.sortArr[i];
        //    if(!item.parent)
        //        continue;
        //    if(item.y>y)
        //    {
        //        b = true;
        //        this.sortArr.splice(i,0,newItem)
        //        var index = item.parent.getChildIndex(item);
        //        item.parent.addChildAt(newItem,index);
        //        break;
        //    }
        //}
        //
        //if(!b)//插入不成功
        //{
            this.roleCon.addChild(newItem);
            this.sortArr.push(newItem)
        //}


        newItem.data = MBase.getItem(mid);
        newItem.resetXY(x,y)
        return newItem.data;
    }




}