class PKUI extends game.BaseContainer_wx4{
    private static _instance:PKUI;
    public static getInstance():PKUI {
        if (!this._instance)
            this._instance = new PKUI();
        return this._instance;
    }


    private con: eui.Group;
    private bg: eui.Image;
    private roleCon: eui.Group;
    private bulletCon: eui.Group;
    private ctrlGroup: eui.Group;
    private ctrlBG: eui.Image;
    private ctrlMC: eui.Image;





    public playerItem = new PlayerItem()
    public monsterArr = [];
    public sortArr = [];
    public touchID

    public constructor() {
        super();
        this.skinName = "PKUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.roleCon.addChild(this.playerItem)
        this.playerItem.data = PKC.playerData;
        PKC.playerData.relateItem = this.playerItem;


        this.ctrlGroup.touchEnabled = true
        this.ctrlGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }

    private onTouchBegin(e: egret.TouchEvent) {
        if (!this.touchID) {
            var p = this.ctrlGroup.localToGlobal(160,160)
            this.touchID = {
                id: e.touchPointID,
                x1: p.x,
                y1: p.y,
                x2: e.stageX,
                y2: e.stageY,
            }
            this.resetTouchingShow();
        }
    }

    private onTouchMove(e) {
        if (this.touchID && e.touchPointID == this.touchID.id) {
            this.touchID.x2 = e.stageX
            this.touchID.y2 = e.stageY
            this.resetTouchingShow();
        }
    }

    private resetTouchingShow(){
        var touchR = 160;
        var r = MyTool.getDistance(this.touchID.x1, this.touchID.y1 ,this.touchID.x2, this.touchID.y2)
        if (r > 75)
            r = 75;
        var angle = Math.atan2(this.touchID.y2 - this.touchID.y1, this.touchID.x2 - this.touchID.x1)
        this.ctrlMC.x = Math.cos(angle) * r + touchR
        this.ctrlMC.y = Math.sin(angle) * r + touchR
        this.ctrlBG.rotation = angle/Math.PI*180+90
    }

    public onTouchEnd(e?) {
        if (!e || (this.touchID && e.touchPointID == this.touchID.id)) {
            this.touchID = null;
            this.resetTouchGroup();
        }
    }

    private resetTouchGroup() {
        var touchR = 160
        this.ctrlMC.x = touchR
        this.ctrlMC.y = touchR
    }

    public renewConY(){
        this.con.y = (GameManager_wx4.uiHeight - 320)/2 - this.playerItem.y;
        this.con.x = 320 - this.playerItem.x
    }

    public onShow(){
        this.resetTouchGroup()
        this.con.width = this.bg.width = PKC.mapW
        this.con.height = this.bg.height = PKC.mapH
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


        this.playerItem.onE()
        if (this.touchID) {
            this.playerItem.move(this.touchID)
            this.renewConY();
        }


 /*       this.addMonster();*/


        var len = this.monsterArr.length;
        for(var i=0;i<len;i++)
        {
             var mItem = this.monsterArr[i];
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