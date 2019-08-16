class PlayerItem extends game.BaseItem{
    public constructor() {
        super();
        this.skinName = "PlayerItemSkin";
    }

    private roleCon: eui.Group;
    private body: eui.Image;
    private leftCon: eui.Group;
    private leftHendMC: eui.Image;
    private leftKnifeMC: eui.Image;
    private rightCon: eui.Group;
    private rightHendMC: eui.Image;
    private rightKnifeMC: eui.Image;
    private hpBar: HPBar;




    private lastHpStep = -1;
    private mvKey = ''

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 40
        this.anchorOffsetY = 40
    }

    public dataChanged():void {
        var gunVO = GunVO.getObject(this.data.knife)
        this.leftKnifeMC.source = 'knife_'+this.data.knife+'_png'
        this.rightKnifeMC.source = 'knife_'+this.data.knife+'_png'
        this.leftKnifeMC.anchorOffsetX = this.rightKnifeMC.anchorOffsetX = gunVO.anx
        this.leftKnifeMC.anchorOffsetY = this.rightKnifeMC.anchorOffsetY = gunVO.any
            this.renewHp();
    }

    public renewHp(){
        this.hpBar.data = this.data;
        var hpStep = Math.ceil(8*this.data.hp/this.data.maxHp)
        if(this.lastHpStep != hpStep)
        {
            this.lastHpStep = hpStep
            this.body.source = 'role_'+hpStep+'_png'
            this.leftHendMC.source = 'role_'+hpStep+'_png'
            this.rightHendMC.source = 'role_'+hpStep+'_png'
        }

    }

    public resetXY(x,y){
        this.x = x;
        this.y = y;
        this.data.x = x
        this.data.y = y
    }

    public move(touchID){
        var r = 40;
        var speed = this.data.speed;
        var angle = Math.atan2(touchID.y2-touchID.y1,touchID.x2-touchID.x1)
        var x = Math.cos(angle)*speed
        var y = Math.sin(angle)*speed

        var targetX = this.x + x
        var targetY = this.y+y
        if(targetX < r)
            targetX = r;
        else if(targetX > PKC.mapW - r)
            targetX = PKC.mapW - r;

        if(targetY < r)
            targetY = r
        else if(targetY > PKC.mapH - r)
            targetY = PKC.mapH - r

        this.resetXY(targetX,targetY)

        if(!this.data.hitEnemy)
        {
            this.roleCon.rotation = angle/Math.PI*180+90
            this.showWalkMV();
        }
    }

    public showWalkMV(){
        this.mvKey = 'walk'
    }

    public showStandMV(){
        this.mvKey = 'stand'
    }

    public atk(){

    }

}