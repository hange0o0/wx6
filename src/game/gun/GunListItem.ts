class GunListItem extends game.BaseItem{

    private mc: eui.Image;
    private mc2: eui.Image;
    private levelText: eui.Label;
    private lockGroup: eui.Group;
    private lockText: eui.Label;





    public constructor() {
        super();
        this.skinName = "GunListItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = false

    }

    public dataChanged():void {
        var GM = GunManager.getInstance();
        var lv = GM.getGunLevel(this.data);
        this.touchEnabled = true
        this.lockGroup.visible = false
        if(this.data < 100)
        {
            var vo = GunVO.getObject(this.data)
            this.mc.source = vo.getThumb()
            this.mc2.visible = false;
            if(!lv)
            {
                if(vo.open < UM_wx4.level)
                {
                    this.levelText.text = '可解锁'
                    this.levelText.textColor = 0x00ff00
                }
                else
                {
                    this.touchEnabled = false
                    this.levelText.text = ''
                    this.lockGroup.visible = true
                    this.lockText.text = '第'+vo.open+'关'
                }
            }
            else if(lv == GM.maxGunLevel)
            {
                this.levelText.text = 'MAX'
                this.levelText.textColor = 0xffff00
            }
            else
            {
                this.levelText.text = 'LV.' + lv;
                this.levelText.textColor = 0xffffFF
            }
        }
        else
        {
            var gun1 = Math.floor(this.data/100)
            var gun2 = this.data%100;
            var vo1 = GunVO.getObject(gun1)
            var vo2 = GunVO.getObject(gun2)


            this.mc.source = vo1.getThumb()
            this.mc2.source = vo2.getThumb()
            this.mc2.visible = true;

            this.levelText.text = 'LV.' + lv;
            this.levelText.textColor = 0xffffFF
        }
    }



}