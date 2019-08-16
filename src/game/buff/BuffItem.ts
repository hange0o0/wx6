class BuffItem extends game.BaseItem{
    private headMC: eui.Image;
    private nameText: eui.Label;

    public constructor() {
        super();
        this.skinName = "BuffItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            if(this.currentState == 'empty')
                BuffUI.getInstance().share()
        })
    }
    public dataChanged():void {
        var user = UM_wx4.shareUser[this.data]
        if(user)
        {
            this.currentState = 'normal'
            this.headMC.source = user.h || 'common_head_bg_jpg'
            this.nameText.text = user.n
        }
        else
        {
             this.currentState = 'empty'
        }
    }

}