class PKTool {
    private static txtPool = [];
    private static wordList = []
    public static showHpChange(item,hp){
        if(hp == 0)
            return;
        var y = item.isPlayer?-40:300 - item.getVO().height - 20;
        var txt = this.txtPool.shift() || new eui.BitmapLabel()
        txt.letterSpacing = -5
        if(hp < 0)
        {
            txt.font=item.isPlayer?"pk_word4_fnt":"pk_word1_fnt"
            txt.text = hp
        }
        else
        {
            txt.font="pk_word2_fnt"
            txt.text = '+' + hp
        }
        this.showWordMC(txt,item.relateItem,y)
    }

    public static removeWordList(mc){
        var index = this.wordList.indexOf(mc);
        if(index != -1)
            this.wordList.splice(index,1)

        MyTool.removeMC(mc);
        if(mc instanceof eui.BitmapLabel)
        {
            index = this.txtPool.indexOf(mc);
            if(index == -1)
                this.txtPool.push(mc);
        }
    }

    public static showWordMC(mc,target,y){
        mc.horizontalCenter = 0
        target.addChild(mc);
        mc.y = y
        egret.Tween.get(mc).to({y:mc.y - 30},500).call(()=>{
            this.removeWordList(mc)
        })
        return mc;
    }



    public static getStepByTime(t){
        return Math.round(t*30/1000)
    }

    public static getRota(from,to,is180?)
    {
        var angle = Math.atan2(to.y-from.y,to.x-from.x)
        if(is180)
            return angle/Math.PI*180;
        return angle;
    }

    public static resetAngle(r){
        while(r<0)
            r+=360
        while(r>=360)
            r-=360
        return r;
    }

    //分开的图片组成
    public static showMV1(){

    }
}


