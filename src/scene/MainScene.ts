import { SD, SDST } from "./Static";
import { Frame, ItemPanel, Rectangle, Position, 
    Panel_Exp, Panel_Atk, Panel_Dmy, Panel_Get, SpinBox, Button } from "./Utility";

export class MainScene extends Phaser.Scene {
    //ステ振りパラメータ
    private FullStatusCount = 20;
    private Co_Status!:Phaser.GameObjects.Container;
    private Tx_St_Title!:Phaser.GameObjects.Text;
    private Tx_St_Remain!:Phaser.GameObjects.Text;
    private Sp_St:SpinBox[] = [];
    private Bu_St_OK!:Button;

    //メインパラメータ
    private Turn:integer = 0;
    private BeatCnt = 0;

    private Co_Main!:Phaser.GameObjects.Container;
    private Tx_Turn!:Phaser.GameObjects.Text;
    private Tx_Stat__HP!:Phaser.GameObjects.Text;
    private Tx_Stat_ATK!:Phaser.GameObjects.Text;
    private Tx_Stat_DEF!:Phaser.GameObjects.Text;

    private MainFrame:Frame[] = [];
    private SubFrame:Frame[] = [];
    private MainPanel:ItemPanel[] = [];
    private SubPanel:ItemPanel[] = [];

    constructor() {
        // シーンのkeyを指定
        super('MainScene');
    }

    preload() {
        
    }


    create(){        
        //パラメータイニシャライズ
        this.init();

        //各種ページを作成
        this.statusPageCreate(); 
        this.mainPageCreate();

        //ステ振り開始  
        this.statusview();     
    }

    update() {
        
    }

    init(){

    }

    statusview(){        
        this.Co_Status.setAlpha(1);
    }

    statusPageCreate(){
        this.Co_Status = this.add.container(0,0);
        this.Tx_St_Title = this.add.text(SDST.MainLabel.X,SDST.MainLabel.Y, SDST.MLText, 
            {fontSize:SDST.MLFontSize, fontFamily:"GameFont", color:"White"});

        this.Sp_St.push(new SpinBox(this, SDST.STRect[0],2,100,"STR", this.statuscountSet, 1, 100,1));
        this.Sp_St.push(new SpinBox(this, SDST.STRect[1],2,100,"VIT", this.statuscountSet, 1, 100,1));
        this.Sp_St.push(new SpinBox(this, SDST.STRect[2],2,100,"AGI", this.statuscountSet, 1, 100,1));
        this.Sp_St.push(new SpinBox(this, SDST.STRect[3],2,100,"LUK", this.statuscountSet, 1, 100,1));
        
        this.Tx_St_Remain = this.add.text(SDST.RemainLabel.X, SDST.RemainLabel.Y, SDST.RmText,
            {fontSize:SDST.RmFontSize, fontFamily:"GameFont", color:"White"});
        this.statuscountSet(this);

        this.Bu_St_OK = new Button(this, SDST.BuOKRect, 2, 100, SDST.BuOKFontsize, SDST.BuOKLabel, 
            (scene:MainScene)=>{
                let sum = 0;
                for(let i=0;i<scene.Sp_St.length;i++){
                    sum += scene.Sp_St[i].Value;
                }
                if(sum <= scene.FullStatusCount){
                    scene.Co_Status.setAlpha(0);
                    scene.mainview();
                }
            });


        this.Co_Status.add([
            this.Tx_St_Title,this.Tx_St_Remain,this.Bu_St_OK,
        ])
        for(let i=0;i<this.Sp_St.length;i++){
            this.Co_Status.add(this.Sp_St[i]);
        }

        this.Co_Status.setAlpha(0);
    }

    statuscountSet(scene:MainScene){
        let sum = 0;
        for(let i=0;i<scene.Sp_St.length;i++){
            sum += scene.Sp_St[i].Value;
        }

        scene.Tx_St_Remain.setText("ノコリ "+(scene.FullStatusCount - sum).toString());
    }


    mainview(){        
        this.Co_Main.setAlpha(1);
    }


    mainPageCreate(){
        this.Co_Main = this.add.container(0,0);

        //this.MySig = this.add.text(SD.BaseMargin,0, "0", {fontSize:SD.TurnFontSize, fontFamily:"GameFont", color:"White"});
        //this.YoSig = this.add.text(50,0, "0", {fontSize:SD.TurnFontSize, fontFamily:"GameFont", color:"Gray"});

        this.Tx_Turn = this.add.text(SD.Display.Width - SD.TurnWidth, 0, "Turn:"+this.Turn.toString().padStart(3,"0"),
        {fontSize:SD.TurnFontSize,fontFamily:"GameFont"});
        for(let i=0;i<3;i++){
            this.MainFrame.push(new Frame(this, SD.MainPnl3[i], 1));
            this.MainFrame[i].setOnOffAlpha(0.8,0.2);
            this.MainFrame[i].setSelectChange(true);    
            this.Co_Main.add(this.MainFrame[i]);
        }

        for(let i=0;i<SD.SubPnl.length;i++){
            this.SubFrame.push(new Frame(this, SD.SubPnl[i], 1));
            this.SubFrame[i].setOnOffAlpha(0.8,0.2);
            this.SubFrame[i].setSelectChange(true);
            this.Co_Main.add(this.SubFrame[i]);
        }

        this.SubPanel.push(new Panel_Get(this, 0, SD.SubPnlDep, this.Pnldragend));  //Getパネルは最初から持ってる
        for(let i=1;i<10;i++){
            this.SubPanel.push(new Panel_Dmy(this, i, SD.SubPnlDep, this.Pnldragend));
            this.Co_Main.add(this.SubPanel[i]);
        }

        for(let i=0;i<3;i++){
            this.MainPanel.push(new Panel_Dmy(this, i, SD.SubPnlDep, this.Pnldragend));
            this.Co_Main.add(this.MainPanel[i]);
        }



        /*
        this.SubPanel[3] = new Panel_Exp(this, 3, SD.SubPnlDep, this.Pnldragend);
        this.SubPanel[5] = new Panel_Atk(this, 5, SD.SubPnlDep, this.Pnldragend);
        this.SubPanel[7] = new Panel_Exp(this, 7, SD.SubPnlDep, this.Pnldragend);
        */
       
        this.Tx_Stat__HP = this.add.text(SD.Stat_Txt[0].X,SD.Stat_Txt[0].Y, "HP  :0", {fontSize:SD.Stat_Fontsize, fontFamily:"GameFont", color:"White"});
        this.Tx_Stat_ATK = this.add.text(SD.Stat_Txt[1].X,SD.Stat_Txt[1].Y, "ATK :0", {fontSize:SD.Stat_Fontsize, fontFamily:"GameFont", color:"White"});
        this.Tx_Stat_DEF = this.add.text(SD.Stat_Txt[2].X,SD.Stat_Txt[2].Y, "DEF :0", {fontSize:SD.Stat_Fontsize, fontFamily:"GameFont", color:"White"});

        this.Co_Main.add([this.Tx_Turn,this.Tx_Stat_ATK,this.Tx_Stat_DEF,this.Tx_Stat__HP]);
        
        this.Co_Main.setAlpha(0);
    }

    CreateRectangle(R:Rectangle){

        this.add.rectangle(R.Pos.X, R.Pos.Y, R.Size.Width, R.Size.Height, 0xFFFFFF).setOrigin(0,0);

        this.RectangelOut(R);
    }
   
    RectangelOut(R:Rectangle){
        console.log("XY("+R.Pos.X.toString()+","+R.Pos.Y.toString()+") WH("+
            R.Size.Width.toString()+","+R.Size.Height.toString()+")");
    }

    private TurnMethod(){
        
        for(let i = 0;i<this.MainPanel.length;i++){
            if(this.MainPanel[i].IsDummy) continue;
            switch(this.MainPanel[i].Type){
                case "Panel_Dmy":   //ここは来ない   
                    break;
                case "Panel_Get":   
                    break;
                case "Panel_Atk":   
                    break;
                case "Panel_Def":   
                    break;
                case "Panel_Exp":   
                    break;
                case "Panel_Pnt":   
                    break;
            }
        }
        
    }

    private Beat(){
        this.BeatCnt++;
        if(this.BeatCnt==SD.BeetTurn){
            this.TurnMethod();
            this.BeatCnt = 0;
        } 


        this.MainFrame.forEach(element => {
            element.setSelectChange(false);
        });
        if(this.BeatCnt<this.MainFrame.length){
            //this.MainFrame[this.Cnt].setSelectChange(true);
        }

        //次の呼び出し
        this.time.delayedCall(SD.BeetSpeed, ()=>  
        {  
            this.Beat();
        },[], this);  
    }


    Pnldragend(IP:ItemPanel, MC:MainScene){
        //console.log("XY("+pos_x.toString()+","+pos_y.toString()+")");
        IP.setAlpha(1);

        let MainRect:Rectangle[];
        if(MC.MainFrame.length == 3){
            MainRect = SD.MainPnl3;
        }
        else{
            MainRect = SD.MainPnl4;
        }

        let subidx = MC.SubPanel.indexOf(IP);
        
        for(let i=0;i<MC.MainFrame.length;i++){
            
            if(MainScene.IsRectRectColision(MainRect[i],new Rectangle(IP.x, IP.y, IP.width, IP.height))){
                //IP.setSelectChange(true);
                //IP.setPosition(MainRect[i].Pos);
                IP.setMainPChange(i);

                //メインパネルとサブパネル入れ替え
                MC.SubPanel[subidx] = MC.MainPanel[i];
                MC.MainPanel[i] = IP;    

                if(!MC.SubPanel[subidx].IsDummy)
                    MC.SubPanel[subidx].setSubPChange(subidx);
                return;
            }
        }

        IP.setSelectChange(false);
        IP.setPosition(SD.SubPnl[IP.SubPosition].Pos.X, SD.SubPnl[IP.SubPosition].Pos.Y);       
    }

    static Image2Rect(Img:Phaser.GameObjects.Image):Rectangle{
        //console.log("Orig:"+Img.originX);
        if(Img.originX == 0)
            return new Rectangle(Img.x, Img.y, Img.width*Img.scaleX, Img.height*Img.scaleY);
        else
            return new Rectangle(Img.x - Img.width/2, Img.y - Img.height/2, Img.width*Img.scaleX, Img.height*Img.scaleY);
    }
    static Rect2CenterPos(R:Rectangle):Position{
        //console.log("RectToPos("+R.Pos.X+","+R.Pos.Y+","+R.Size.Width+","+R.Size.Height+")");
        return new Position(R.Pos.X + R.Size.Width/2, R.Pos.Y + R.Size.Height/2);
    }

    static IsRectangleImageColision(R:Rectangle,Img:Phaser.GameObjects.Image):boolean{
        return this.IsRectangleColision(R, this.Rect2CenterPos(this.Image2Rect(Img)));
    }

    static IsRectRectColision(R:Rectangle, R2:Rectangle){
        return this.IsRectangleColision(R, this.Rect2CenterPos(R2));
    }

    static IsRectangleColision(R:Rectangle, P:Position):boolean{
        //console.log("Rect:("+R.Pos.X+","+R.Pos.Y+","+R.Size.Width+","+R.Size.Height+")");
        //console.log("Img:("+P.X+","+P.Y+")");
        return R.Pos.X<=P.X && P.X <= R.Pos.X+R.Size.Width && R.Pos.Y <= P.Y && P.Y <= R.Pos.Y + R.Size.Height; 
    }
}
