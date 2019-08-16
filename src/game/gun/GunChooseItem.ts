class GunChooseItem extends game.BaseItem{

    private bg2: eui.Image;
    private bg: eui.Image;
    private mc: eui.Image;
    private mc2: eui.Image;
    private levelText: eui.Label;
    private usingGroup: eui.Group;
    private usingText: eui.Label;
    private skillText: eui.Label;
    private btn: eui.Button;







    public constructor() {
        super();
        this.skinName = "GunChooseItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            if(!this.data)
            {
                GunListUI.getInstance().show(GunManager.getInstance().getUnlockGun());
                return;
            }
            GunInfoUI.getInstance().show(this.data)
        })

        this.addBtnEvent(this.btn,(e)=>{
            e.stopImmediatePropagation();
            if(!this.data)
            {
                GunListUI.getInstance().show(GunManager.getInstance().getUnlockGun());
                return;
            }

            var pos = GunManager.getInstance().getPosByGun(this.data)
            if(pos == GunChooseUI.getInstance().index)
                GunManager.getInstance().removeGun(this.data)
            else
                GunManager.getInstance().addGun(this.data,GunChooseUI.getInstance().index)
            GunChooseUI.getInstance().hide();
        })

        MyTool.addLongTouch(this,()=>{
            if(!this.data)
            {
                return;
            }
           GunListUI.getInstance().show(this.data)
        },this)
    }

    public dataChanged():void {

        //if(!this.data)
        //{
        //    this.currentState = 's2'
        //    this.btn.label = '解锁'
        //    this.btn.skinName = 'Btn2Skin'
        //    return;
        //}
        //var GM = GunManager.getInstance();
        //this.currentState = 's1'
        //var pos =GM .getPosByGun(this.data)
        //if(pos)
        //{
        //    this.usingGroup.visible = true;
        //    this.usingText.text =  pos + '号位';
        //    if(pos == GunChooseUI.getInstance().index)
        //        this.usingText.textColor = 0x66ff66
        //    else
        //        this.usingText.textColor = 0xffffff
        //}
        //else
        //{
        //    this.usingGroup.visible = false;
        //}
        //
        //this.btn.skinName = 'Btn1Skin'
        //if(pos == GunChooseUI.getInstance().index)
        //{
        //    this.btn.label = '卸下'
        //    this.btn.skinName = 'Btn2Skin'
        //}
        //else if(pos && GunManager.getInstance().getGunByPos(GunChooseUI.getInstance().index))
        //{
        //    this.btn.label = '交换'
        //}
        //else
        //{
        //    this.btn.label = '装备'
        //}
        //
        //
        //
        //
        //
        //var lv = GM.getGunLevel(this.data)
        //var vos = GM.getVOs(this.data);
        //
        ////this.roleBG.source = 'role_bg_'+(lv%8 || 8)+'_png'
        //this.bg.source = 'role_'+(lv%8 || 8)+'_png'
        //this.bg2.visible = lv > 8
        //if(this.bg2.visible)
        //    this.bg2.source = 'role_'+Math.floor(lv/8)+'_png'
        //
        //
        //this.mc.source = vos.vo1.getThumb()
        //this.mc2.visible = vos.vo2 != null
        //if(this.mc2.visible)
        //    this.mc2.source = vos.vo2.getThumb()
        //
        //this.skillText.text = GM.getGunTitle(this.data)
        //var atk = Math.floor(GM.getGunAtk(this.data)/GM.getGunSpeed(this.data))
        //this.levelText.text =  atk + ' /秒'
    }


}