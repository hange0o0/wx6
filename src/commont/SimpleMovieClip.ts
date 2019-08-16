class SimpleMovieClip extends egret.EventDispatcher{
    public icon: eui.Image;
    private list: Array<string>;
    public current: number = 0;
    private max: number;

    private sleepFrame:number = 0;//一个循环后停止多少帧播放下一次
    private currSleep:number;
    private playTimes:number;
    private loopIndex:number = 0;

    //private timeID: egret.Timer;

    public isPlaying = false

    //快速建立动画对象，number从1开始
    public static create(key:string, png:string, number:number,
                         icon: eui.Image, millisecond?:number, sleepFrame?:number){
        var a = [];
        for(var i = 1 ; i<= number ; i++)
            a.push(key + i + "_" + png)
        return new SimpleMovieClip(icon,a, millisecond);
    }

    /*
     * var bgMovie = new MovieSimpleMC(this.bg,["map_city_item1_png","map_city_item2_png"]);
     bgMovie.gotoAndPay(0);
     */
    public constructor(icon: eui.Image, data:Array<string>, millisecond?:number, sleepFrame?:number) {
        super();
        this.icon = icon;
        this.setList(data);
        this.sleepFrame = sleepFrame || 0;
        this.currSleep = 0;

        //this.timeID = new egret.Timer(millisecond || 42,0);//24帧每秒
        //this.timeID.addEventListener(egret.TimerEvent.TIMER,this.updateTime_4747,this);
        return this;
    }

    //public setTimer(v){
    //    if(this.timeID.delay != v)
    //        this.timeID.delay = v;
    //}

    public play(){
        if(this.list.length == 1){
            this.icon.source = this.list[0];
            this.stop();
            return;
        }
        this.currSleep = 0;
        this.isPlaying = true;
        return this;
    }

    public stop(){
        this.isPlaying = false;
    }

    //playTimes 播放次数，-1表示循环
    //loopIndex 循环播放的起始帧，默认是0
    public gotoAndPay(value:number=0, playTimes:number=-1,loopIndex=0){
        this.current = value;
        this.playTimes = playTimes;
        if(this.playTimes == -1)
        {
            this.loopIndex = loopIndex
        }
        this.icon.source = this.list[this.current];
        this.play();
    }
    public gotoAndPayOnce(value:number=0){
        this.current = value;
        this.playTimes = 1;
        this.icon.source = this.list[this.current];
        this.play();
    }
    public gotoAndStop(value:number=0){
        this.current = value;
        this.icon.source = this.list[this.current];
        this.isPlaying = false;
    }

    public setList(data:Array<string>){
        this.list = data;
        this.max = data.length;
    }

    private onE(){
        if(!this.isPlaying)
            return;
        if(this.sleepFrame != 0 && this.currSleep > 0){
            if(++this.currSleep == this.sleepFrame){
                this.currSleep = 0;
            }
            return;
        }
        this.icon.source = this.list[this.current];
        this.dispatchEventWith("changed")

        if(++this.current == this.max){
            this.currSleep = 1;
            this.current = 0;
            this.playTimes--;
            if(this.playTimes <0)
            {
                this.current = this.loopIndex
            }
            if(this.playTimes == 0)
            {
                this.stop();
                this.dispatchEventWith("complete")
            }
        }
    }

    public dispose(){
        this.stop();

    }

    public setAutoDispose(){
        this.icon.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.dispose,this);
    }
}