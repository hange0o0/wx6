class MainGunItem extends game.BaseItem{

    private gunItem: GunItem;
    private indexText: eui.Label;
    private desText: eui.Label;
    private coinText: eui.Label;



    public stopDrag = false
    public stopMove = true
    public constructor() {
        super();
        this.skinName = "MainGunItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 60
        this.anchorOffsetY = 60
        this.gunItem.scaleX = this.gunItem.scaleY = 1.1

        this.addBtnEvent(this,()=>{
            if(this.currentState == 'lock')
            {
                var cost = GunManager.getInstance().getPosCost();
                MyWindow.Confirm('确定花费'+this.createHtml(NumberUtil_wx4.addNumSeparator(cost),0xFFFF00)+'金币\n解锁该位置吗？',(b)=>{
                    if(b==1)
                    {
                        if(!UM_wx4.checkCoin(cost))
                            return;
                        GunManager.getInstance().unlockPos();
                    }
                });
                return;
            }
            GunChooseUI.getInstance().show(this.data)
        })
        //this.scaleX = this.scaleY = 0.7


        MyTool.addLongTouch(this,()=>{
            if(this.currentState != 'normal')
                return
            GunListUI.getInstance().show(GunManager.getInstance().getGunByPos(this.data))
        },this)

        DragManager.getInstance().setDrag(this)
    }

    public setChoose(b){
        this.alpha = b?0.5:1
    }

    public showDragState(b){
        this.indexText.strokeColor = b?0xffff00:0

    }

    public dataChanged():void {
       //this.indexText.text = this.data + ' 号位'
       // this.stopDrag = true
       // if(this.data <= UM_wx4.gunPosNum)
       // {
       //     var gun = GunManager.getInstance().getGunByPos(this.data);
       //     if(gun)
       //     {
       //         this.currentState = 'normal'
       //         this.gunItem.data = gun;
       //
       //         var atk = Math.floor(GunManager.getInstance().getGunAtk(gun)/GunManager.getInstance().getGunSpeed(gun))
       //         this.setHtml(this.desText, GunManager.getInstance().getGunTitle(gun) + '\n' + this.createHtml(atk + ' /秒',0xA6FF89))
       //         this.stopDrag = false
       //     }
       //     else
       //     {
       //         this.currentState = 'empty'
       //     }
       // }
       // else
       // {
       //     this.currentState = 'lock'
       //     this.coinText.text = NumberUtil_wx4.addNumSeparator(GunManager.getInstance().getPosCost())
       // }
    }

    public onE(){
        if(this.currentState == 'normal')
            this.gunItem.move2();
    }
}